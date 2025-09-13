import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const RegisterProfessional = () => {
  // const [user, setUser] = useState(false);
  const [professionalCategory, setProfessionalCategory] = useState("");
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
  const [profession, setProfession] = useState("");
  const [experienceYears, setExperienceYears] = useState(0);
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState(""); // se enviará como lista
  const [serviceArea, setServiceArea] = useState("");
  // const [categoryId, setCategoryId] = useState(1); // por defecto
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
    // setIsLoading(true);

    const skillsArray = skills.split(",").map((s) => s.trim());

      console.log("Categoría seleccionada:", professionalCategory);
      console.log("Payload:", {
        category_id: Number(professionalCategory),
      });

    try {
      console.log("Categoría seleccionada:", professionalCategory);
      console.log("Payload:", {
        category_id: Number(professionalCategory),
      });
      // const response = await axios.post, esta linea estaba asi pero en vercel me marca el error que no se usa response
      await axios.post(
        `http://localhost:8000/api/v1/professionals/register`,
        {
          full_name: name,
          document_type: documentType,
          document_number: documento,
          phone: phone,
          address: direction,
          email: email,
          password: password,
          profession: profession,
          experience_years: experienceYears,
          bio: bio,
          skills: skillsArray,
          service_area: serviceArea,
          category_id: Number(professionalCategory),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("Registro profesional exitoso. ¡Ahora puedes iniciar sesión!");
      navigate("/login");
    } catch (error) {
      console.error("Error durante el registro:", error);
      if (axios.isAxiosError(error) && error.response) {
        // setGeneralError(
        //   error.response.data.detail ||
        //     "Error en el registro. Inténtalo de nuevo."
        // );
      } else {
        // setGeneralError("Hubo un problema de conexión con el servidor.");
      }
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleRegister}>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700 ">
          Registro de profesion
        </h2>
        <div className="mb-2 w-90 lg:w-100">
          <label htmlFor="categoryId" className="block text-gray-950 mb-2">
            Profesión u oficio
          </label>
          <select
            name="categoryId"
            id="categoryId"
            value={professionalCategory}
            onChange={(e) => setProfessionalCategory(e.target.value)}
            className=" p-2 border input border-gray-300 rounded w-10 text-gray-950 w-25"
          >
            <option value="1">Electricidad</option>
            <option value="2">Tecnologia</option>
            <option value="3">Plomeria</option>
            <option value="4">Limpieza</option>
            <option value="5">Electronica</option>
            <option value="6">Carpinteria</option>
          </select>
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
          <label className="block text-gray-950 mb-2" htmlFor="profession">
            Profesión
          </label>
          <input
            type="text"
            id="profession"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            className="w-90 lg:w-154 p-2 border validator input border-gray-300 rounded text-gray-950"
            required
            minLength={5}
          />
          {profession && profession.length < 5 && (
            <p className="validator-hint">
              La profesión debe tener al menos 5 caracteres.
            </p>
          )}
        </div>

        <div className="mb-2 w-90 lg:w-154">
          <label className="block text-gray-950 mb-2" htmlFor="experienceYears">
            Años de experiencia
          </label>
          <input
            type="number"
            id="experienceYears"
            value={experienceYears}
            onChange={(e) => setExperienceYears(Number(e.target.value))}
            className="w-90 lg:w-154 p-2 border validator input border-gray-300 rounded text-gray-950"
            required
            min={0}
          />
          {experienceYears < 0 && (
            <p className="validator-hint">
              La experiencia no puede ser negativa.
            </p>
          )}
        </div>

        <div className="mb-2 w-90 lg:w-154">
          <label className="block text-gray-950 mb-2" htmlFor="bio">
            Biografía
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-90 lg:w-154 p-2 border validator input border-gray-300 rounded text-gray-950"
            required
            minLength={10}
          />
          {bio && bio.length < 10 && (
            <p className="validator-hint">
              La biografía debe tener al menos 10 caracteres.
            </p>
          )}
        </div>

        <div className="mb-2 w-90 lg:w-154">
          <label className="block text-gray-950 mb-2" htmlFor="skills">
            Habilidades (separadas por coma)
          </label>
          <input
            type="text"
            id="skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-90 lg:w-154 p-2 border validator input border-gray-300 rounded text-gray-950"
            required
          />
          {skills && skills.split(",").length < 1 && (
            <p className="validator-hint">Agrega al menos una habilidad.</p>
          )}
        </div>

        <div className="mb-2 w-90 lg:w-154">
          <label className="block text-gray-950 mb-2" htmlFor="serviceArea">
            Zona de servicio
          </label>
          <input
            type="text"
            id="serviceArea"
            value={serviceArea}
            onChange={(e) => setServiceArea(e.target.value)}
            className="w-90 lg:w-154 p-2 border validator input border-gray-300 rounded text-gray-950"
            required
            minLength={4}
          />
          {serviceArea && serviceArea.length < 4 && (
            <p className="validator-hint">
              La zona debe tener al menos 4 caracteres.
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
          <label className="block text-gray-950 mb-2" htmlFor="password">
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
            <p className="validator-hint">Tiene que ser 8 digitos minimo</p>
          )}
        </div>
        <div className="mb-2 w-90 lg:w-154">
          <label className="block text-gray-950 mb-2" htmlFor="confirmPassword">
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

export default RegisterProfessional;
