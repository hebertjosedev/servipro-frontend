import { useAuth } from "./AuthContext";
import { useProfessionalAuth } from "./ProfessionalAuthContext";
import { useRef, useState } from "react";
import type { DisplayMessage } from "../interfaces/ChatPanelType";

export const useSession = () => {
  // 💬 Mensajes por solicitud
  const [chatMessages, setChatMessages] = useState<
    Record<number, DisplayMessage[]>
  >({});

  // 🔔 Notificaciones por solicitud
  const [hasNewMessages, setHasNewMessages] = useState<Record<number, boolean>>(
    {}
  );

  // 💬 Estado de escritura por solicitud
  type TypingStatus = Record<number, { active: boolean; name?: string }>;
  const [typingStatus, setTypingStatus] = useState<TypingStatus>({});

  // 📍 Chat activo
  const [activeRequestId, setActiveRequestId] = useState<number | null>(null);
  const chatIsOpen = (id: number) => activeRequestId === id;

  const [presenceStatus, setPresenceStatus] = useState<
    Record<number, "online" | "offline">
  >({});

  // 🔌 WebSocket por solicitud
  const socketRefs = useRef<Record<number, WebSocket>>({});

  // referencia para nodejs
  const notifierSocketRefs = useRef<Record<number, WebSocket>>({});


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
    // 🔴 Emitir presencia "offline" antes de limpiar
    const token =
      localStorage.getItem("userToken") ||
      localStorage.getItem("professionalToken");
    if (token) {
      fetch("http://localhost:3002/api/presence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, status: "offline" }),
      });
    }

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
      const isDuplicate = existing.some(
        (m) => m.message_id === message.message_id
      );
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
    setChatMessages,
    addMessage,
    clearMessages,
    socketRefs,
    notifierSocketRefs,
    hasNewMessages,
    markNewMessage,
    clearNewMessage,
    typingStatus,
    setTypingStatus,
    activeRequestId,
    setActiveRequestId,
    chatIsOpen,
    presenceStatus,
    setPresenceStatus,
  };
};
