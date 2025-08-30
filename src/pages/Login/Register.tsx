import { useState } from "react";
import "../../App.css";
// import Pikaday from "pikaday";
import RegisterProfessional from "./RegisterProfessional";
import RegisterUser from "./RegisterUser";

const Register = () => {
  // Info usuarios y profesionales
  const [user, setUser] = useState(false);
  const [professional, setProfessional] = useState(false);

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
