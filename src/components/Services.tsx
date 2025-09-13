import axios from "axios";
import "../App.css";
import { ProfessionalCard } from "./ProfessionalCard";
import { useState } from "react";
import type { Professional } from "../interfaces/Professional";

const Electronic = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const categories = [
    { id: 1, name: "Electricidad" },
    { id: 2, name: "Tecnología" },
    { id: 3, name: "Plomería" },
    { id: 4, name: "Limpieza" },
    { id: 5, name: "Electrónica" },
    { id: 6, name: "Carpintería" },
  ];

  const fetchProfessionalsByCategory = async (
    categoryId: number,
    categoryName: string
  ) => {
    try {
      const res = await axios.get(
        `https://servipro-backend-production.up.railway.app/api/v1/professionals/category/${categoryId}`
      );
      setProfessionals(res.data);
      setSelectedCategory(categoryName);
    } catch (err) {
      console.error("Error al cargar profesionales por categoría", err);
    }
  };
  return (
    <>
      <div className="imgconstructor min-h-screen flex items-center justify-center">
        <div className="flex card flex-col container sm:w-100 md:w-120 lg:w-140 gap-3">
          <div className="card-body bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
            <div className="p-6">
              <h1 className="text-3xl font-bold text-center mb-6">
                Solicitar Servicios
              </h1>

              <div className="flex flex-wrap gap-4 justify-center mb-6">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() =>
                      fetchProfessionalsByCategory(cat.id, cat.name)
                    }
                    className="btn btn-outline btn-primary"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {selectedCategory && (
                <h2 className="text-xl font-semibold text-center mb-4">
                  Profesionales en {selectedCategory}
                </h2>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {professionals.map((pro) => (
                  <ProfessionalCard key={pro.id} professional={pro} />
                ))}
              </div>

              {selectedCategory && professionals.length === 0 && (
                <p className="text-center text-gray-500 italic mt-6">
                  No hay profesionales registrados en esta categoría aún.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Electronic;
