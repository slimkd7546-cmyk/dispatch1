import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { getUnreadMessageCount } from "@/api/messages";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

interface MessageIndicatorProps {
  className?: string;
}

const MessageIndicator: React.FC<MessageIndicatorProps> = ({
  className = "",
}) => {
  const { user } = useAuthContext();
  const [unreadCount, setUnreadCount] = useState(0);

  // Load unread count
  const loadUnreadCount = async () => {
    if (!user?.id) return;

    try {
      const result = await getUnreadMessageCount(user.id);
      if ("error" in result) {
        console.error("Error loading unread count:", result.error);
        return;
      }
      setUnreadCount(result.count);
    } catch (err) {
      console.error("Error loading unread count:", err);
    }
  };

  // Load unread count on mount and when user changes
  useEffect(() => {
    if (user?.id) {
      loadUnreadCount();
    }
  }, [user?.id]);

  // Set up real-time subscription for new messages
  useEffect(() => {
    if (!user?.id) return;

    const subscription = supabase
      .channel("messages-indicator-channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          const newMessage = payload.new as any;

          // If the message is not from the current user, update unread count
          if (newMessage.sender_id !== user.id) {
            loadUnreadCount();
          }
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user?.id]);

  if (unreadCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        className={className}
      >
        <Badge
          className="bg-teal-600 hover:bg-teal-700 transition-colors shadow-sm"
          variant="secondary"
        >
          {unreadCount > 99 ? "99+" : unreadCount}
        </Badge>
      </motion.div>
    </AnimatePresence>
  );
};

export default MessageIndicator;
