import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const RegisterUser = () => {

      // const [user, setUser] = useState(false);
      // const [professional, setProfessional] = useState(false);
      const [name, setName] = useState("");
      const [documentType, setDocumentType] = useState("V");
      const [documento, setDocumento] = useState("");
      // const [birthdate, setBirthdate] = useState("");
      // const myDatepicker = useRef(null);
      const [phone, setPhone] = useState("");
      const [direction, setDirection] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");
      // const [isLoading, setIsLoading] = useState(false); // Estado para el botón de carga
      // const [generalError, setGeneralError] = useState(""); // Para errores generales de la API
      const navigate = useNavigate();

        useEffect(() => {
          const passwordError = document.getElementById("passwordError");
          if (confirmPassword !== password) {
            if (passwordError) {
              passwordError.style.display = "block";
              passwordError.style.visibility = "visible";
              passwordError.style.color = "var(--color-error)";
            }
          } else {
            if (passwordError) {
              passwordError.style.display = "none";
              passwordError.style.visibility = "hidden";
            }
          }
        }, [password, confirmPassword]);

        const handleRegister = async (e: React.FormEvent) => {
          e.preventDefault();
          // const userData = new URLSearchParams({
          //   document_type: documento, // Asegúrate de que los nombres de las claves coincidan
          //   full_name: name,
          //   email: email,
          //   phone: phone,
          //   address: direction,
          //   // birth_date: birthDate,
          //   password: password,
          // });
      
          // Realiza la solicitud POST con Axios
          try {
            // const response = await axios.post cambiado por problema en vercel por no usar
            await axios.post(
              `servipro-backend-production.up.railway.app/api/v1/users/register`,
              {
                full_name: name,
                document_type: documentType,
                document_number: documento, // Asegúrate de que los nombres de las claves coincidan
                phone: phone,
                address: direction,
                email: email,
                password: password,
                // birth_date: birthDate,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
      
            // Axios lanza un error para códigos de estado 4xx/5xx, no es necesario verificar response.ok
            // Si llegamos aquí, la solicitud fue exitosa (código 2xx)
            alert("Registro exitoso. ¡Ahora puedes iniciar sesión!");
            navigate("/login"); // Redirige a la página de inicio de sesión
          } catch (error) {
            console.error("Error durante el registro:", error);
            if (axios.isAxiosError(error) && error.response) {
              // Error de la API (por ejemplo, validación, usuario ya existe)
              // setGeneralError(
              //   error.response.data.detail ||
              //     "Error en el registro. Inténtalo de nuevo."
              // );
            } else {
              // Otros errores (por ejemplo, problemas de red)
              // setGeneralError(
              //   "Hubo un problema de conexión con el servidor. Inténtalo más tarde."
              // );
            }
          } finally {
            // setIsLoading(false); // Desactiva el estado de carga
          }
        };

  return (
    <>
                  <form onSubmit={handleRegister}>
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-700 ">
                  Registro de usuario
                </h2>
                <div className="mb-2 w-90 lg:w-154">
                  <label className="block text-gray-950 mb-2" htmlFor="name">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-90 lg:w-154 p-2 border validator input border-gray-300 rounded text-gray-950"
                    required
                    minLength={10}
                    pattern="[a-zA-Z\s]+"
                  />
                  {name && name.length < 10 && (
                    <p className="validator-hint">
                      El nombre debe tener al menos 10 caracteres.
                    </p>
                  )}
                </div>
                <div className="mb-2 w-90 lg:w-100">
                  <label className="block text-gray-950 mb-2" htmlFor="id">
                    Cédula
                  </label>
                  <select
                    name="typeId"
                    id="typeId"
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    className=" p-2 border input border-gray-300 rounded w-10 text-gray-950 "
                  >
                    <option value="V">V</option>
                    <option value="E">E</option>
                    <option value="J">J</option>
                  </select>
                  <input
                    type="text"
                    id="documento"
                    value={documento}
                    onChange={(e) => setDocumento(e.target.value)}
                    className="w-80 lg:w-84 p-2 border input validator border-gray-300 rounded text-gray-950"
                    required
                    minLength={7}
                    maxLength={8}
                    pattern="[0-9]*"
                  />
                  {documento && documento.length < 6 && (
                    <p className="validator-hint">
                      La cédula debe tener al menos 6 dígitos
                    </p>
                  )}
                </div>
                {/* <div className="mb-4 w-90 lg:w-154">
                <label
                  className="block  text-gray-950 mb-2"
                  htmlFor="birthdate"
                >
                  Fecha de Nacimiento
                </label>
                <input
                  type="text"
                  id="birthdate"
                  className="input pika-single bg-base-content w-90 lg:w-154"
                  defaultValue="Selecciona una fecha"
                  ref={myDatepicker}
                />
              </div> */}
                <div className="mb-2 w-90 lg:w-154">
                  <label className="block text-gray-950 mb-2" htmlFor="phone">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-90 lg:w-154 p-2 border input border-gray-300 rounded text-gray-950 validator"
                    required
                    pattern="[0-9]*"
                    minLength={11}
                    maxLength={11}
                  />
                  {phone && phone.length < 10 && (
                    <p className="validator-hint">Tiene que ser 10 digitos</p>
                  )}
                </div>
                <div className="mb-2 w-90 lg:w-154">
                  <label className="block text-gray-950 mb-2" htmlFor="phone">
                    Dirección
                  </label>
                  <input
                    type="text"
                    id="direction"
                    value={direction}
                    onChange={(e) => setDirection(e.target.value)}
                    className="w-90 lg:w-154 p-2 border input validator border-gray-300 rounded text-gray-950"
                    minLength={10}
                    required
                  />
                  {direction && direction.length < 10 && (
                    <p className="validator-hint">
                      La dirección debe tener al menos 10 caracteres.
                    </p>
                  )}
                </div>
                <div className="mb-2 w-90 lg:w-154">
                  <label className="block text-gray-950 mb-2" htmlFor="email">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-90 lg:w-154 p-2 border input validator border-gray-300 rounded text-gray-950"
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  />
                  {/* Validar que el email exista y que tenga un formato válido */}
                  {email && (
                    <p className="validator-hint">
                      El correo electrónico debe tener un formato válido.
                    </p>
                  )}
                </div>
                <div className="mb-2 w-90 lg:w-154">
                  <label
                    className="block text-gray-950 mb-2"
                    htmlFor="password"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-90 lg:w-154 p-2 border input validator border-gray-300 rounded text-gray-950"
                    required
                    minLength={8}
                  />
                  {password && password.length < 8 && (
                    <p className="validator-hint">
                      Tiene que ser 8 digitos minimo
                    </p>
                  )}
                </div>
                <div className="mb-2 w-90 lg:w-154">
                  <label
                    className="block text-gray-950 mb-2"
                    htmlFor="confirmPassword"
                  >
                    Confirmar contraseña
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-90 lg:w-154 p-2 border input validator border-gray-300 rounded text-gray-950"
                    required
                  />
                  <p className="validator-hint" id="passwordError">
                    Las contraseñas no son iguales
                  </p>
                </div>
                <div className="text-center items-center justify-center flex gap-4 ">
                  <button
                    type="submit"
                    className="w-50 bg-blue-700 text-white py-2 rounded-2xl btn hover:bg-blue-800 transition"
                  >
                    Regístrar
                  </button>
                  {/* <button
                  type="submit"
                  className="w-50 bg-blue-700 text-white py-2 rounded-2xl btn hover:bg-blue-800 transition"
                >
                  Regístrate como Profesional
                </button> */}
                </div>
              </form>
    </>
  );
};

export default RegisterUser;