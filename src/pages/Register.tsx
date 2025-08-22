import React, { useRef, useEffect } from "react";
import "../App.css";
import Pikaday from "pikaday";
import { useNavigate } from "react-router";

const Register = () => {
  // Info usuarios y profesionales
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [direction, setDirection] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [id, setId] = React.useState("");
  const [birthdate, setBirthdate] = React.useState("");
  const myDatepicker = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const picker = new Pikaday({
      field: myDatepicker.current,
      format: "D/M/YYYY",
      toString(date, format) {
        // you should do formatting based on the passed format,
        // but we will just return 'D/M/YYYY' for simplicity
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      },
      parse(dateString, format) {
        // dateString is the result of `toString` method
        const parts = dateString.split("/");
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
      },
      minDate: new Date(1935, 0, 1),
      maxDate: new Date(),
    });

    if (picker !== null) setBirthdate(picker.toString());

    return () => picker.destroy();
  }, []);

  // Validar que password y confirmPassword sean iguales
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

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    //redirect to login page
    navigate("/login");
  }

  return (
    <>
      <div className="imgconstructor min-h-screen py-5">
        <div className="card flex items-center justify-center bg-gray-100 rounded-xl ">
          <div className=" card-content bg-gray-100 p-5 lg:p-8 rounded-lg shadow-md w-100 lg:w-170 md:w-150 sm:w-130">
            <form onSubmit={handleRegister}>
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-700 ">
                Registro
              </h2>
              <div className="mb-2 w-90 lg:w-100">
                <label className="block text-gray-950 mb-2" htmlFor="id">
                  Cédula
                </label>
                <select
                  name="typeId"
                  id="typeId"
                  className=" p-2 border input bg-base-content border-gray-300 rounded w-10 text-gray-950 "
                >
                  <option value="V">V</option>
                  <option value="E">E</option>
                  <option value="J">J</option>
                </select>
                <input
                  type="text"
                  id="id"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="w-80 lg:w-84 p-2 border input validator bg-base-content border-gray-300 rounded text-gray-950"
                  required
                  minLength={6}
                  pattern="[0-9]*"
                />
                {id && id.length < 6 && (
                  <p className="validator-hint">
                    La cédula debe tener al menos 6 dígitos
                  </p>
                )}
              </div>
              <div className="mb-2 w-90 lg:w-154">
                <label className="block text-gray-950 mb-2" htmlFor="name">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-90 lg:w-154 p-2 border validator input bg-base-content border-gray-300 rounded text-gray-950"
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
              <div className="mb-2 w-90 lg:w-154">
                <label className="block text-gray-950 mb-2" htmlFor="email">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-90 lg:w-154 p-2 border input validator bg-base-content border-gray-300 rounded text-gray-950"
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
                <label className="block text-gray-950 mb-2" htmlFor="phone">
                  Teléfono
                </label>
                <input
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-90 lg:w-154 p-2 border input bg-base-content border-gray-300 rounded text-gray-950 validator"
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
                  className="w-90 lg:w-154 p-2 border input validator bg-base-content border-gray-300 rounded text-gray-950"
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
                <label className="block text-gray-950 mb-2" htmlFor="password">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-90 lg:w-154 p-2 border input validator bg-base-content border-gray-300 rounded text-gray-950"
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
                  className="w-90 lg:w-154 p-2 border bg-base-content input validator border-gray-300 rounded text-gray-950"
                  required
                />
                <p className="validator-hint" id="passwordError">
                  Las contraseñas no son iguales
                </p>
              </div>
              <div className="mb-4 w-90 lg:w-154">
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
              </div>
              <div className="text-center items-center justify-center flex gap-4 ">
                  <button
                    type="submit"
                    className="w-50 bg-green-700 text-white py-2 rounded-2xl btn hover:bg-green-800 transition"
                  >
                    Regístrate como Usuario 
                  </button>
                     <button
                    type="submit"
                    className="w-50 bg-green-700 text-white py-2 rounded-2xl btn hover:bg-green-800 transition"
                  >
                    Regístrate como Profesional
                  </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
