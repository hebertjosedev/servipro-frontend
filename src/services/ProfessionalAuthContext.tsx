// services/ProfessionalAuthContext.tsx
import {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import axios from "axios";
import type {ProfessionalAuthContextType, ProfessionalPrivate} from "../interfaces/Professional";

const ProfessionalAuthContext = createContext<ProfessionalAuthContextType | undefined>(undefined);

export const useProfessionalAuth = () => {
  const context = useContext(ProfessionalAuthContext);
  if (!context) {
    throw new Error("useProfessionalAuth debe usarse dentro de un ProfessionalAuthProvider");
  }
  return context;
};

export const ProfessionalAuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [professional, setProfessional] = useState<ProfessionalPrivate | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token") || null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfessional = async () => {
      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:8000/api/v1/users/me",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setProfessional(response.data);
        } catch (error) {
          console.error("Error fetching professional data:", error);
          localStorage.removeItem("token");
          setToken(null);
        }
      }
      setLoading(false);
    };
    fetchProfessional();
  }, [token]);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setProfessional(null);
  };

  const authValue: ProfessionalAuthContextType = {
  professional,
  token,
  login,
  logout,
  loading,
  setProfessional,
  };

  return (
    <ProfessionalAuthContext.Provider value={authValue}>
      {children}
    </ProfessionalAuthContext.Provider>
  );
};
