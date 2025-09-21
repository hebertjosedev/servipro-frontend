import { useAuth } from "./AuthContext";
import { useProfessionalAuth } from "./ProfessionalAuthContext";
import { useRef, useState } from "react";
import type { DisplayMessage } from "../interfaces/ChatPanelType";

export const useSession = () => {
  const [chatMessages, setChatMessages] = useState<
    Record<number, DisplayMessage[]>
  >({});
  const socketRefs = useRef<Record<number, WebSocket>>({});

  const { user, token: userToken, logout: logoutUser, setUser } = useAuth();

  const {
    professional,
    token: professionalToken,
    logout: logoutProfessional,
    setProfessional,
  } = useProfessionalAuth();

  const role = user ? "user" : professional ? "professional" : null;
  const profile = user || professional;
  const token = userToken || professionalToken;

  const logoutGlobal = () => {
    logoutUser();
    logoutProfessional();
    setUser(null);
    setProfessional(null);
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("professionalToken");
    localStorage.removeItem("professionalData");
  };

  const addMessage = (requestId: number, message: DisplayMessage) => {
    setChatMessages((prev) => {
      const existing = prev[requestId] || [];

      const isDuplicate = existing.some((m) => m.message_id === message.message_id);

      // const isDuplicate = existing.some(
      //   (m) =>
      //     m.text === message.text &&
      //     m.sender === message.sender &&
      //     m.timestamp === message.timestamp
      // );
      if (isDuplicate) return prev;

      return {
        ...prev,
        [requestId]: [...existing, message],
      };
    });
  };

  const clearMessages = (requestId: number) => {
    setChatMessages((prev) => {
      const updated = { ...prev };
      delete updated[requestId];
      return updated;
    });
  };

  return {
    role,
    profile,
    token,
    logoutGlobal,
    chatMessages,
    addMessage,
    clearMessages,
    socketRefs,
  };
};
