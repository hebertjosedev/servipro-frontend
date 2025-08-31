export interface Professional {
  id: number;
  full_name: string;
  email: string;
  profession: string;
  experience_years: number;
  bio?: string;
  service_area: string;
  verified: boolean;
  category_id: number; // ← este es el que debes enviar al backend
  category?: string;   // ← opcional, si el backend te devuelve el nombre
}