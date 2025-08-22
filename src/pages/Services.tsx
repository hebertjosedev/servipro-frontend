import "../App.css";
import { NavLink } from 'react-router';

const Services = () => {
  return (
    <>
      <div className="imgconstructor min-h-screen flex items-center justify-center">
        <div className="flex card flex-col container sm:w-100 md:w-120 lg:w-140 gap-3">
          <div className="card-body bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
            <h2 className="card-title text-2xl text-gray-800 mb-6 text-center">
              Servicios
            </h2>
            <div className="flex flex-row flex-wrap gap-8 justify-center p-8 w-full">
              <div className="flex flex-col items-center px-3 w-30">
                <NavLink to={"/electrician"} className={"hover:bg-gray-700  transition rounded-2xl"} >
                <img
                  src="src/assets/electrician._icon.png"
                  className="w-24 h-24"
                  alt="electrician_icon"
                />
                </NavLink>
                <p className="text-2xl text-gray-800 mt-2">Electricidad</p>
              </div>
              <div className="flex flex-col items-center px-3 w-30 ">
                <NavLink to={"/technology"} className={"hover:bg-gray-700  transition rounded-2xl"} >
                <img
                  src="src/assets/it_icon.png"
                  className="w-24 h-24"
                  alt="it_icon"
                />
                </NavLink>
                <p className="text-2xl text-gray-800 mt-2">Tecnología</p>
              </div>
              <div className="flex flex-col items-center px-3 w-30">
                <NavLink to={"/plumbing"} className={"hover:bg-gray-700  transition rounded-2xl"} >
                <img
                  src="src/assets/plumbing_icon.png"
                  className="w-24 h-24"
                  alt="plumbing_icon"
                />
                </NavLink>
                <p className="text-2xl text-gray-800 mt-2">Plomería</p>
              </div>
                 <div className="flex flex-col items-center px-3 w-30">
                <NavLink to={"/cleaning"} className={"hover:bg-gray-700  transition rounded-2xl"} >
                <img
                  src="src\assets\cleaning_icon.png"
                  className="w-24 h-24"
                  alt="cleaning_icon"
                />
                </NavLink>
                <p className="text-2xl text-gray-800 mt-2">Limpieza</p>
              </div>
               <div className="flex flex-col items-center px-3 w-30">
                <NavLink to={"/electronic"} className={"hover:bg-gray-700  transition rounded-2xl"} >
                <img
                  src="src/assets/electronic_icon.png"
                  className="w-24 h-24"
                  alt="electronic_icon"
                />
                </NavLink>
                <p className="text-2xl text-gray-800 mt-2">Electrónica</p>
              </div>
              <div className="flex flex-col items-center px-3 w-30">
                <NavLink to={"/carpentry"} className={"hover:bg-gray-700  transition rounded-2xl"} >
                <img
                  src="src/assets/Carpentry_icon.png"
                  className="w-24 h-24"
                  alt="carpentry_icon"
                />
                </NavLink>
                <p className="text-2xl text-gray-800 mt-2">Carpintería</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
