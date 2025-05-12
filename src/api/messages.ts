import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

export interface Message {
  id: string;
  senderId: string;
  senderName?: string;
  senderAvatar?: string;
  recipientId?: string;
  conversationId?: string;
  content: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Conversation {
  id: string;
  name?: string;
  createdBy?: string;
  isGroup: boolean;
  participants: {
    id: string;
    name: string;
    avatar?: string;
  }[];
  lastMessage?: {
    content: string;
    createdAt: string;
    senderId: string;
  };
  createdAt: string;
  updatedAt: string;
}

/**
 * Get all conversations for a user
 */
export const getUserConversations = async (userId: string) => {
  try {
    // First get all conversations the user is part of
    const { data: participantData, error: participantError } = await supabase
      .from("conversation_participants")
      .select("conversation_id")
      .eq("user_id", userId);

    if (participantError) throw participantError;

    if (!participantData || participantData.length === 0) {
      return { conversations: [] };
    }

    const conversationIds = participantData.map((p) => p.conversation_id);

    // Get the conversations with their participants
    const { data, error } = await supabase
      .from("conversations")
      .select(
        `
        *,
        participants:conversation_participants(user_id, users:user_id(id, full_name, avatar_url))
      `,
      )
      .in("id", conversationIds)
      .order("updated_at", { ascending: false });

    if (error) throw error;

    // Get the last message for each conversation
    const conversationsWithLastMessage = await Promise.all(
      data.map(async (conversation) => {
        const { data: messageData, error: messageError } = await supabase
          .from("messages")
          .select("*")
          .eq("conversation_id", conversation.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (messageError && messageError.code !== "PGRST116") {
          console.error("Error fetching last message:", messageError);
        }

        // Format participants
        const participants = conversation.participants.map((p: any) => ({
          id: p.user_id,
          name: p.users?.full_name || "Unknown User",
          avatar: p.users?.avatar_url,
        }));

        return {
          id: conversation.id,
          name: conversation.name,
          createdBy: conversation.created_by,
          isGroup: conversation.is_group,
          participants,
          lastMessage: messageData
            ? {
                content: messageData.content,
                createdAt: messageData.created_at,
                senderId: messageData.sender_id,
              }
            : undefined,
          createdAt: conversation.created_at,
          updatedAt: conversation.updated_at,
        };
      }),
    );

    return { conversations: conversationsWithLastMessage };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Get direct messages between two users or create a new conversation
 */
export const getOrCreateDirectConversation = async (
  userId1: string,
  userId2: string,
) => {
  try {
    // Create a consistent ID for the conversation between these two users
    const userIds = [userId1, userId2].sort();
    const conversationId = `direct_${userIds[0]}_${userIds[1]}`;

    // Check if the conversation already exists
    const { data: existingConversation, error: fetchError } = await supabase
      .from("conversations")
      .select("*")
      .eq("id", conversationId)
      .single();

    // If it doesn't exist, create it
    if (fetchError && fetchError.code === "PGRST116") {
      const { data: newConversation, error: createError } = await supabase
        .from("conversations")
        .insert([
          {
            id: conversationId,
            created_by: userId1,
            is_group: false,
          },
        ])
        .select()
        .single();

      if (createError) throw createError;

      // Add both users as participants
      const { error: participantsError } = await supabase
        .from("conversation_participants")
        .insert([
          { conversation_id: conversationId, user_id: userId1 },
          { conversation_id: conversationId, user_id: userId2 },
        ]);

      if (participantsError) throw participantsError;

      return { conversation: { ...newConversation, participants: [] } };
    } else if (fetchError) {
      throw fetchError;
    }

    // Get participants
    const { data: participants, error: participantsError } = await supabase
      .from("conversation_participants")
      .select("user_id, users:user_id(id, full_name, avatar_url)")
      .eq("conversation_id", conversationId);

    if (participantsError) throw participantsError;

    const formattedParticipants = participants.map((p) => ({
      id: p.user_id,
      name: p.users?.full_name || "Unknown User",
      avatar: p.users?.avatar_url,
    }));

    return {
      conversation: {
        ...existingConversation,
        participants: formattedParticipants,
      },
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Create a new group conversation
 */
export const createGroupConversation = async (
  name: string,
  createdBy: string,
  participantIds: string[],
) => {
  try {
    const conversationId = `group_${Date.now()}`;

    const { data, error } = await supabase
      .from("conversations")
      .insert([
        {
          id: conversationId,
          name,
          created_by: createdBy,
          is_group: true,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // Add participants
    const participants = participantIds.map((userId) => ({
      conversation_id: conversationId,
      user_id: userId,
    }));

    const { error: participantsError } = await supabase
      .from("conversation_participants")
      .insert(participants);

    if (participantsError) throw participantsError;

    return { conversation: data };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Get messages for a conversation
 */
export const getConversationMessages = async (
  conversationId: string,
  limit = 50,
  before?: string,
) => {
  try {
    let query = supabase
      .from("messages")
      .select(
        `
        *,
        sender:sender_id(id, full_name, avatar_url)
      `,
      )
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (before) {
      query = query.lt("created_at", before);
    }

    const { data, error } = await query;

    if (error) throw error;

    // Transform the data to match the frontend model
    const messages: Message[] = data.map((message) => ({
      id: message.id,
      senderId: message.sender_id,
      senderName: message.sender?.full_name,
      senderAvatar: message.sender?.avatar_url,
      recipientId: message.recipient_id,
      conversationId: message.conversation_id,
      content: message.content,
      read: message.read,
      createdAt: message.created_at,
      updatedAt: message.updated_at,
    }));

    return { messages };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Send a message
 */
export const sendMessage = async (
  senderId: string,
  content: string,
  conversationId: string,
  recipientId?: string,
) => {
  try {
    const { data, error } = await supabase
      .from("messages")
      .insert([
        {
          sender_id: senderId,
          recipient_id: recipientId,
          conversation_id: conversationId,
          content,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // Update the conversation's updated_at timestamp
    await supabase
      .from("conversations")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", conversationId);

    return {
      message: {
        id: data.id,
        senderId: data.sender_id,
        recipientId: data.recipient_id,
        conversationId: data.conversation_id,
        content: data.content,
        read: data.read,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      },
    };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Mark messages as read
 */
export const markMessagesAsRead = async (
  conversationId: string,
  userId: string,
) => {
  try {
    const { error } = await supabase
      .from("messages")
      .update({ read: true })
      .eq("conversation_id", conversationId)
      .neq("sender_id", userId)
      .eq("read", false);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    return handleSupabaseError(error);
  }
};

/**
 * Get unread message count for a user
 */
export const getUnreadMessageCount = async (userId: string) => {
  try {
    // Get all conversations the user is part of
    const { data: participantData, error: participantError } = await supabase
      .from("conversation_participants")
      .select("conversation_id")
      .eq("user_id", userId);

    if (participantError) throw participantError;

    if (!participantData || participantData.length === 0) {
      return { count: 0 };
    }

    const conversationIds = participantData.map((p) => p.conversation_id);

    // Count unread messages in those conversations
    const { count, error } = await supabase
      .from("messages")
      .select("*", { count: "exact", head: true })
      .in("conversation_id", conversationIds)
      .neq("sender_id", userId)
      .eq("read", false);

    if (error) throw error;

    return { count: count || 0 };
  } catch (error) {
    return handleSupabaseError(error);
  }
};
