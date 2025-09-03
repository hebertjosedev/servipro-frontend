import react from "react";
import "../App.css";

const Contactus = () => {
  return (<>
  <div className="imgconstructor min-h-screen">
  <div className="card bg-white flex flex-col justify-center items-center text-black p-8 max-w-md mx-auto mt-10 shadow-lg rounded-2xl">
    <h2 className="text-2xl font-bold mb-4">Contáctanos</h2>
    <form className="w-full flex flex-col gap-4">
    <input
      type="text"
      placeholder="Nombre"
      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <input
      type="email"
      placeholder="Correo electrónico"
      className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <textarea
      placeholder="Mensaje"
      className="border rounded px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <button
      type="submit"
      className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
    >
      Enviar
    </button>
    </form>
    <div className="mt-6 text-center text-sm text-gray-600">
    También puedes escribirnos a <a href="mailto:contacto@ejemplo.com" className="text-blue-600 underline">contacto@ejemplo.com</a>
    </div>
  </div>
  </div>
  
  
  </>);
};

export default Contactus;
