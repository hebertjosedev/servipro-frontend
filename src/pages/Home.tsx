import { NavLink } from 'react-router';
import '../App.css';

const Home = () => {
  

return (
  <>

<div className=" min-h-screen imgconstructor pb-10">
  <div className=" flex flex-col items-center justify-center min-h-screen ">
    <div className="bg-green-700 flex items-center justify-center p-6 rounded-full w-72 text-white mt-24 shadow-xl text-3xl font-bold tracking-wide text-center">
      ¡Bienvenido a ServiPro!
    </div>
    <section className="mt-10 rounded-xl shadow-lg p-8 w-full max-w-xl bg-gray-50 bg-opacity-25 text-gray-800 text-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center">Nuestros Servicios</h2>
      <p className="mb-4">
        Descubre una amplia variedad de servicios diseñados especialmente para ti. Explora nuestras opciones y contáctanos para obtener información personalizada. En ServiPro, nos comprometemos a ofrecer soluciones que se adapten a tus necesidades.
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>Servicios profesionales y confiables</li>
        <li>Atención personalizada</li>
        <li>Variedad de opciones para cada requerimiento</li>
        <li>Soporte y asesoría continua</li>
      </ul>
      <div className="mt-6 text-center">
        <NavLink to={"/services"} className="btn bg-green-700 text-white px-6 py-2 rounded-full shadow hover:bg-green-700 transition">
          Ver todos los servicios
        </NavLink>
      </div>
   </section>
  </div>
  
</div>
</>
);
}

export default Home;