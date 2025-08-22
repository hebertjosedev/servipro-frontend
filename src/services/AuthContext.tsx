import { createContext, useState, useContext, type ReactNode, useEffect } from 'react';
// import { type User } from '../interfaces/User'; // Importa los tipos
// import { type AuthContextType } from '../interfaces/AuthContextType'; // Importa el tipo AuthContextType
import axios from 'axios';

// Crea el contexto, dándole un valor inicial nulo y especificando el tipo
// const AuthContext = createContext<AuthContextType | null>(null);

const AuthContext = createContext(null);

// hook personalizado para facilitar su uso
export const useAuth = () => {
  return useContext(AuthContext);
}

// creamos el proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Efecto para cargar los datos del usuario si hay un token
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await axios.get('http://localhost:8000/api/v1/users/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Si el token no es válido, lo eliminamos
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const authValue = {
    user,
    token,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

// // Define el tipo de las props del proveedor
// type AuthProviderProps = {
//   children: ReactNode;
// };

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [user, setUser] = useState<User | null>(null);

//   const login = (userData: User) => {
//     // Aquí podrías guardar el token en localStorage y luego establecer el usuario
//     setUser(userData);
//   };

//   const logout = () => {
//     // Lógica para cerrar sesión, como limpiar el token de localStorage
//     setUser(null);
//   };

//   const value = { user, login, logout };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };