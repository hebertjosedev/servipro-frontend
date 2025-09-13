import {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import axios from "axios";
import type { AuthContextType, User } from "../interfaces/AuthContextType";
import { useNavigate } from "react-router";

// Tipamos el contexto correctamente
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const navigate = useNavigate()

// Hook personalizado con validación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

// Proveedor del contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("userToken") || null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
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

          if (response.data.role === "user") {
            setUser(response.data);
          } else {
            // No es usuario, limpiar contexto
            localStorage.removeItem("userToken");
            setToken(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          localStorage.removeItem("userToken");
          setToken(null);
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, [token]);

  const login = (newToken: string) => {
    localStorage.setItem("userToken", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    setToken(null);
    setUser(null);
    navigate('/login')
  };

  const authValue: AuthContextType = {
    user,
    token,
    setToken,
    login,
    logout,
    loading,
    setUser,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};
