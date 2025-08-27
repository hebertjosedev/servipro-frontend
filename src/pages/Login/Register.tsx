import React, { useRef, useEffect, useState } from "react";
import "../../App.css";
// import Pikaday from "pikaday";
import { useNavigate } from "react-router";
import axios from "axios";
import RegisterProfessional from "./RegisterProfessional";
import RegisterUser from "./RegisterUser";
import { IoPerson } from "react-icons/io5";

const Register = () => {
  // Info usuarios y profesionales
  const [user, setUser] = useState(false);
  const [professional, setProfessional] = useState(false);
  // const [name, setName] = React.useState("");
  // const [documentType, setDocumentType] = React.useState("V");
  // const [documento, setDocumento] = React.useState("");
  // // const [birthdate, setBirthdate] = React.useState("");
  // const myDatepicker = useRef(null);
  // const [phone, setPhone] = React.useState("");
  // const [direction, setDirection] = React.useState("");
  // const [email, setEmail] = React.useState("");
  // const [password, setPassword] = React.useState("");
  // const [confirmPassword, setConfirmPassword] = React.useState("");
  // const [isLoading, setIsLoading] = React.useState(false); // Estado para el botón de carga
  // const [generalError, setGeneralError] = React.useState(""); // Para errores generales de la API

  const navigate = useNavigate();

  // Validar que password y confirmPassword sean iguales
  // useEffect(() => {
  //   const passwordError = document.getElementById("passwordError");
  //   if (confirmPassword !== password) {
  //     if (passwordError) {
  //       passwordError.style.display = "block";
  //       passwordError.style.visibility = "visible";
  //       passwordError.style.color = "var(--color-error)";
  //     }
  //   } else {
  //     if (passwordError) {
  //       passwordError.style.display = "none";
  //       passwordError.style.visibility = "hidden";
  //     }
  //   }
  // }, [password, confirmPassword]);

  // const handleRegister = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // const userData = new URLSearchParams({
  //   //   document_type: documento, // Asegúrate de que los nombres de las claves coincidan
  //   //   full_name: name,
  //   //   email: email,
  //   //   phone: phone,
  //   //   address: direction,
  //   //   // birth_date: birthDate,
  //   //   password: password,
  //   // });

  //   // Realiza la solicitud POST con Axios
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:8000/api/v1/users/register`,
  //       {
  //         full_name: name,
  //         document_type: documentType,
  //         document_number: documento, // Asegúrate de que los nombres de las claves coincidan
  //         phone: phone,
  //         address: direction,
  //         email: email,
  //         password: password,
  //         // birth_date: birthDate,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     // Axios lanza un error para códigos de estado 4xx/5xx, no es necesario verificar response.ok
  //     // Si llegamos aquí, la solicitud fue exitosa (código 2xx)
  //     alert("Registro exitoso. ¡Ahora puedes iniciar sesión!");
  //     navigate("/"); // Redirige a la página de inicio de sesión
  //   } catch (error) {
  //     console.error("Error durante el registro:", error);
  //     if (axios.isAxiosError(error) && error.response) {
  //       // Error de la API (por ejemplo, validación, usuario ya existe)
  //       setGeneralError(
  //         error.response.data.detail ||
  //           "Error en el registro. Inténtalo de nuevo."
  //       );
  //     } else {
  //       // Otros errores (por ejemplo, problemas de red)
  //       setGeneralError(
  //         "Hubo un problema de conexión con el servidor. Inténtalo más tarde."
  //       );
  //     }
  //   } finally {
  //     setIsLoading(false); // Desactiva el estado de carga
  //   }
  // };

  return (
    <>
      <div className="imgconstructor min-h-screen py-5">
        <div className="card flex items-center justify-center bg-gray-100 rounded-xl">
          <div className="card-content bg-gray-100 p-5 lg:p-8 rounded-lg shadow-md w-100 lg:w-170 md:w-150 sm:w-130">
            {!user && !professional && (
              <div className="flex justify-center items-center">
              <h2 className="font-semibold mb-2">Registrate</h2>
            </div>
            )}
            <div className="flex justify-center items-center">
            <div className="flex items-center justify-center w-45 rounded-2xl bg-blue-600">
              <button
                className={`p-2 my-1 rounded-2xl cursor-pointer transition-all ${
                  user
                    ? "bg-white text-blue-500 font-semibold"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                onClick={() => {
                  setUser(true);
                  setProfessional(false);
                }}
              >
                Usuario
              </button>

              <button
                className={`p-2 my-1 rounded-2xl cursor-pointer transition-all ${
                  professional
                    ? "bg-white text-blue-500 font-semibold"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                onClick={() => {
                  setProfessional(true);
                  setUser(false);
                }}
              >
                Profesional
              </button>
              </div>
            </div>
            {user && (
              <RegisterUser />
            )}
            {professional && (
              <RegisterProfessional />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
