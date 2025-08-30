import { useState } from "react";
import "../../App.css";
import { NavLink, useNavigate } from 'react-router';
import axios from 'axios';
import { useAuth } from "../../services/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate()
  // const [token, setToken] = useState(localStorage.getItem('token') || null);

  const {login, token } = useAuth()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/token',
        new URLSearchParams({
          username: username,
          password: password,
        }),{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      const { access_token } = response.data;
      login(access_token)
      setMessage('Inicio de sesion exitoso!!');

      // redirigimos al usuario a la pagina de inicio o a donde queramos
      navigate("/")

      // localStorage.setItem('token', access_token);
      // setToken(access_token)
      // setMessage('Inicio de sesion exitoso!!');
    } catch (error) {
      setMessage('Error de inicio de sesion. :(');
      console.error(error);
    }
  };

  // esta funcion es para poder acceder a alguna pagina que necesite autenticacion
  const fetchProtectedData = async () => {
    try {
      const response = await axios.get('',{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(`Datos protegidos: ${JSON.stringify(response.data)}`)
    } catch (error) {
      setMessage('No autorizado. Por favor, inicia sesion.');
      console.error(error);
    }
  }

  return (
    <>
    <div className="imgconstructor min-h-screen ">
      <div className=" rounded-xl flex items-center justify-center bg-gray-100  ">
      {!token ? (
        <form
            onSubmit={handleLogin}
            className="bg-white p-8 rounded-lg shadow-md w-96"
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-700 ">
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
              // onClick={fetchProtectedData}
              className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition cursor-pointer"
            >
              Iniciar Sesión
            </button>
            <NavLink to= "/register" className="text-sm text-blue-500 hover:underline mt-4 block text-center">
              ¿No tienes una cuenta? Regístrate
            </NavLink>
            <p>{message}</p>
          </form>

      ): (    
          <div>
          <h2>Bienvenido!</h2>
          <button className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition" onClick={fetchProtectedData}>Obtener datos protegidos</button>
          <button className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition" onClick={() => { localStorage.removeItem('token'); setToken(null); setMessage(''); }}>Logout</button>
        </div>

      )}
        </div>
      </div>
    </>
  );
};

export default Login;
