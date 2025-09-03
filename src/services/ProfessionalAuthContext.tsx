// services/ProfessionalAuthContext.tsx
import {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import axios from "axios";
import type {
  ProfessionalAuthContextType,
  ProfessionalPrivate,
} from "../interfaces/Professional";

const ProfessionalAuthContext = createContext<
  ProfessionalAuthContextType | undefined
>(undefined);

export const useProfessionalAuth = () => {
  const context = useContext(ProfessionalAuthContext);
  if (!context) {
    throw new Error(
      "useProfessionalAuth debe usarse dentro de un ProfessionalAuthProvider"
    );
  }
  return context;
};

export const ProfessionalAuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [professional, setProfessional] = useState<ProfessionalPrivate | null>(
    null
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("professionalToken") || null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("professionalToken");
    if (storedToken && !token) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const fetchProfessional = async () => {
      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:8000/api/v1/auth/me",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.role === "professional") {
            setProfessional(response.data);
          } else {
            // No es profesional, limpiar contexto
            localStorage.removeItem("professionalToken");
            setToken(null);
          }
        } catch (error) {
          console.error("Error fetching professional data:", error);
          localStorage.removeItem("professionalToken");
          setToken(null);
        }
      }
      setLoading(false);
    };
    fetchProfessional();
  }, [token]);

  const login = (newToken: string) => {
    localStorage.setItem("professionalToken", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("professionalToken");
    setToken(null);
    setProfessional(null);
  };

  const authValue: ProfessionalAuthContextType = {
    professional,
    token,
    setToken,
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
