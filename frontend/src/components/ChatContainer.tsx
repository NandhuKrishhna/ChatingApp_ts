import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useGetMessagesQuery } from "../redux/api/chatApi";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./MessageSkeleton";
import { skipToken } from "@reduxjs/toolkit/query";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const selectedUser = useSelector((state: RootState) => state.chat.selectedUser);
  const authUser = useSelector((state: RootState) => state.auth.authUser);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  // Fetch messages for the selected user
  const { data: messages = [], isLoading, error } = useGetMessagesQuery(
    selectedUser?._id ?? skipToken
  );

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-zinc-500">
        Select a user to start chatting
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center text-red-500">
        Failed to load messages
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          // Debugging: Log the values and types
          console.log("Message Sender:", message.sender, typeof message.sender);
          console.log("Auth User ID:", authUser?._id, typeof authUser?._id);

          // Compare sender with authUser._id
          const isCurrentUser =
            authUser && message.sender
              ? String(message.sender) === String(authUser._id)
              : false;

          return (
            <div
              key={message._id}
              className={`chat ${isCurrentUser ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      isCurrentUser
                        ? authUser?.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                {message.createdAt && (
                  <time className="text-xs opacity-50 ml-1">
                    {formatMessageTime(message.createdAt)}
                  </time>
                )}
              </div>
              <div className="chat-bubble flex flex-col">
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          );
        })}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;