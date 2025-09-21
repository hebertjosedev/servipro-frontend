import { useAuth } from "./AuthContext";
import { useProfessionalAuth } from "./ProfessionalAuthContext";
import { useRef, useState } from "react";
import type { DisplayMessage } from "../interfaces/ChatPanelType";

export const useSession = () => {
  // 💬 Mensajes por solicitud
  const [chatMessages, setChatMessages] = useState<Record<number, DisplayMessage[]>>({});

  // 🔔 Notificaciones por solicitud
  const [hasNewMessages, setHasNewMessages] = useState<Record<number, boolean>>({});

  // 💬 Estado de escritura por solicitud
  const [typingStatus, setTypingStatus] = useState<Record<number, boolean>>({});

  // 📍 Chat activo
  const [activeRequestId, setActiveRequestId] = useState<number | null>(null);
  const chatIsOpen = (id: number) => activeRequestId === id;

  // 🔌 WebSocket por solicitud
  const socketRefs = useRef<Record<number, WebSocket>>({});

  // 🔐 Autenticación
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

  // 🔓 Logout global
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

  // 💬 Agregar mensaje
  const addMessage = (requestId: number, message: DisplayMessage) => {
    setChatMessages((prev) => {
      const existing = prev[requestId] || [];
      const isDuplicate = existing.some((m) => m.message_id === message.message_id);
      if (isDuplicate) return prev;

      return {
        ...prev,
        [requestId]: [...existing, message],
      };
    });
  };

  // 💬 Limpiar mensajes
  const clearMessages = (requestId: number) => {
    setChatMessages((prev) => {
      const updated = { ...prev };
      delete updated[requestId];
      return updated;
    });
  };

  // 🔔 Marcar nuevo mensaje
  const markNewMessage = (requestId: number) => {
    setHasNewMessages((prev) => ({ ...prev, [requestId]: true }));
  };

  // 🔔 Limpiar notificación
  const clearNewMessage = (requestId: number) => {
    setHasNewMessages((prev) => ({ ...prev, [requestId]: false }));
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
    hasNewMessages,
    markNewMessage,
    clearNewMessage,
    typingStatus,
    setTypingStatus,
    activeRequestId,
    setActiveRequestId,
    chatIsOpen,
  };
};
