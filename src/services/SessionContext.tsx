// services/SessionContext.tsx
import { createContext, useContext } from "react";
import { useSession } from "./useSession";

const SessionContext = createContext<ReturnType<typeof useSession> | null>(null);

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
};

export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (!context) throw new Error("useSessionContext must be used within a SessionProvider");
  return context;
};
