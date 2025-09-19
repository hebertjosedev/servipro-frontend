import { useAuth } from "./AuthContext";
import { useProfessionalAuth } from "./ProfessionalAuthContext";
import { useRef, useState } from "react";
import type { DisplayMessage } from "../interfaces/ChatPanelType";

export const useSession = () => {

  const [chatMessages, setChatMessages] = useState<Record<number, DisplayMessage[]>>({});
  const socketRefs = useRef<Record<number, WebSocket>>({});

  const {
    user,
    token: userToken,
    logout: logoutUser,
    setUser,
  } = useAuth();

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
  setChatMessages((prev) => ({
    ...prev,
    [requestId]: [...(prev[requestId] || []), message],
  }));
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
