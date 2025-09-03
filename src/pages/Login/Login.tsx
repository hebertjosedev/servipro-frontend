import { useState } from "react";
import "../../App.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../services/AuthContext";
import { useProfessionalAuth } from "../../services/ProfessionalAuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const {
    login: loginUser,
    token: userToken,
    setUser,
    setToken: setUserToken,
  } = useAuth();

  const {
    login: loginProfessional,
    token: professionalToken,
    setProfessional,
    setToken: setProfessionalToken,
  } = useProfessionalAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/token",
        new URLSearchParams({
          username,
          password,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const { access_token, role, user, professional } = response.data;

      if (role === "user") {
        loginUser(access_token);
        setUser(user);
        setUserToken(access_token);
        localStorage.setItem("userData", JSON.stringify(user));
        localStorage.setItem("userToken", access_token);
      } else if (role === "professional") {
        // Limpia el contexto de usuario
        setUser(null);
        setUserToken(null);
        localStorage.removeItem("userToken");
        localStorage.removeItem("userData");

        // 1. Guarda el token en localStorage
        loginProfessional(access_token); // esto debería llamar setToken internamente
        setProfessional(professional);

        // 3. Guarda los datos del profesional
        localStorage.setItem("professionalData", JSON.stringify(professional));
      }

      setMessage("Inicio de sesión exitoso!!");
      navigate("/");
    } catch (error) {
      setMessage("Error de inicio de sesión. :(");
      console.error(error);
    }
  };

  const fetchProtectedData = async () => {
    const activeToken = userToken || professionalToken;
    if (!activeToken) return;

    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/protected",
        {
          headers: {
            Authorization: `Bearer ${activeToken}`,
          },
        }
      );
      setMessage(`Datos protegidos: ${JSON.stringify(response.data)}`);
    } catch (error) {
      setMessage("No autorizado. Por favor, inicia sesión.");
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("professionalToken");
    localStorage.removeItem("professionalData");
    setUser(null);
    setUserToken(null);
    setProfessional(null);
    setProfessionalToken(null);
    setMessage("");
  };

  const isAuthenticated = userToken || professionalToken;

  return (
    <div className="imgconstructor min-h-screen">
      <div className="rounded-xl flex items-center justify-center bg-gray-100">
        {!isAuthenticated ? (
          <form
            onSubmit={handleLogin}
            className="bg-white p-8 rounded-lg shadow-md w-96"
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
              Iniciar Sesión
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="username">
                Usuario
              </label>
              <input
                type="text"
                id="username"
                value={username}
                placeholder="Ingresa tu usuario"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-gray-700"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                placeholder="Ingresa tu contraseña"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-gray-700"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition cursor-pointer"
            >
              Iniciar Sesión
            </button>
            <NavLink
              to="/register"
              className="text-sm text-blue-500 hover:underline mt-4 block text-center"
            >
              ¿No tienes una cuenta? Regístrate
            </NavLink>
            <p>{message}</p>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <h2>Bienvenido!</h2>
            <button
              className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition"
              onClick={fetchProtectedData}
            >
              Obtener datos protegidos
            </button>
            <button
              className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
