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

export interface ProfessionalPrivate extends Professional {
  address?: string;
  phone?: string;
  role: string;
}

export interface ProfessionalAuthContextType {
  professional: ProfessionalPrivate | null;
  token: string | null;
  setToken: (token: string | null) => void;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
  setProfessional: (pro: ProfessionalPrivate | null) => void;
}