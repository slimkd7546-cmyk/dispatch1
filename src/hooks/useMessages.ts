import { useState, useEffect, useCallback } from "react";
import {
  Message,
  Conversation,
  getUserConversations,
  getOrCreateDirectConversation,
  createGroupConversation,
  getConversationMessages,
  sendMessage as apiSendMessage,
  markMessagesAsRead,
  getUnreadMessageCount,
} from "@/api/messages";
import { db } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";

export function useMessages(userId: string) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  // Load conversations
  const loadConversations = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);
    try {
      const result = await getUserConversations(userId);
      if ("error" in result) {
        throw new Error(result.error.message);
      }
      setConversations(result.conversations);
    } catch (err: any) {
      console.error("Error loading conversations:", err);
      setError(err.message || "Failed to load conversations");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Load unread count
  const loadUnreadCount = useCallback(async () => {
    if (!userId) return;

    try {
      const result = await getUnreadMessageCount(userId);
      if ("error" in result) {
        throw new Error(result.error.message);
      }
      setUnreadCount(result.count);
    } catch (err: any) {
      console.error("Error loading unread count:", err);
    }
  }, [userId]);

  // Load conversations and unread count on mount
  useEffect(() => {
    if (userId) {
      loadConversations();
      loadUnreadCount();
    }
  }, [userId, loadConversations, loadUnreadCount]);

  // Set up real-time subscription for new messages
  useEffect(() => {
    if (!userId || !currentConversation) return;

    // Listen for new messages in the current conversation
    const messagesQuery = query(
      collection(db, "messages"),
      where("conversationId", "==", currentConversation.id),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const newMessage = change.doc.data() as Message;

          // Check if this is a new message (not in our current list)
          const isNewMessage = !messages.some((m) => m.id === newMessage.id);

          if (isNewMessage) {
            setMessages((prev) => [newMessage, ...prev]);

            // If the message is not from the current user, mark it as read
            if (newMessage.senderId !== userId) {
              markMessagesAsRead(currentConversation.id, userId);
            }
          }
        }
      });

      // Update unread count and refresh conversations
      loadUnreadCount();
      loadConversations();
    });

    return () => {
      unsubscribe();
    };
  }, [
    userId,
    currentConversation,
    messages,
    loadConversations,
    loadUnreadCount,
  ]);

  // Load messages for a conversation
  const loadMessages = useCallback(
    async (conversationId: string) => {
      setLoading(true);
      setError(null);
      try {
        const result = await getConversationMessages(conversationId);
        if ("error" in result) {
          throw new Error(result.error.message);
        }
        setMessages(result.messages);

        // Mark messages as read
        await markMessagesAsRead(conversationId, userId);
        loadUnreadCount();
      } catch (err: any) {
        console.error("Error loading messages:", err);
        setError(err.message || "Failed to load messages");
      } finally {
        setLoading(false);
      }
    },
    [userId, loadUnreadCount],
  );

  // Load more messages (pagination)
  const loadMoreMessages = useCallback(
    async (conversationId: string) => {
      if (messages.length === 0) return;

      setLoading(true);
      setError(null);
      try {
        const oldestMessage = messages[messages.length - 1];
        const result = await getConversationMessages(
          conversationId,
          50,
          oldestMessage.createdAt,
        );
        if ("error" in result) {
          throw new Error(result.error.message);
        }
        setMessages((prev) => [...prev, ...result.messages]);
      } catch (err: any) {
        console.error("Error loading more messages:", err);
        setError(err.message || "Failed to load more messages");
      } finally {
        setLoading(false);
      }
    },
    [messages],
  );

  // Start or open a direct conversation
  const startDirectConversation = useCallback(
    async (otherUserId: string) => {
      setLoading(true);
      setError(null);
      try {
        const result = await getOrCreateDirectConversation(userId, otherUserId);
        if ("error" in result) {
          throw new Error(result.error.message);
        }

        setCurrentConversation(result.conversation);
        await loadMessages(result.conversation.id);
        return result.conversation;
      } catch (err: any) {
        console.error("Error starting conversation:", err);
        setError(err.message || "Failed to start conversation");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [userId, loadMessages],
  );

  // Create a group conversation
  const createGroup = useCallback(
    async (name: string, participantIds: string[]) => {
      setLoading(true);
      setError(null);
      try {
        // Make sure the current user is included
        if (!participantIds.includes(userId)) {
          participantIds.push(userId);
        }

        const result = await createGroupConversation(
          name,
          userId,
          participantIds,
        );
        if ("error" in result) {
          throw new Error(result.error.message);
        }

        await loadConversations();
        return result.conversation;
      } catch (err: any) {
        console.error("Error creating group:", err);
        setError(err.message || "Failed to create group");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [userId, loadConversations],
  );

  // Send a message
  const sendMessage = useCallback(
    async (content: string, conversationId: string, recipientId?: string) => {
      setError(null);
      try {
        const result = await apiSendMessage(
          userId,
          content,
          conversationId,
          recipientId,
        );
        if ("error" in result) {
          throw new Error(result.error.message);
        }
        return { success: true, message: result.message };
      } catch (err: any) {
        console.error("Error sending message:", err);
        setError(err.message || "Failed to send message");
        return { success: false, error: err.message };
      }
    },
    [userId],
  );

  // Select a conversation
  const selectConversation = useCallback(
    async (conversation: Conversation) => {
      setCurrentConversation(conversation);
      await loadMessages(conversation.id);
    },
    [loadMessages],
  );

  return {
    conversations,
    currentConversation,
    messages,
    loading,
    error,
    unreadCount,
    loadConversations,
    loadMessages,
    loadMoreMessages,
    startDirectConversation,
    createGroup,
    sendMessage,
    selectConversation,
  };
}
