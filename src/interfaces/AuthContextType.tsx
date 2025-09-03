// src/interfaces/AuthContextType.ts
export interface User {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  document_type: string;
  document_number: string;
  role: "user" | "professional";
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  setToken: (token: string | null) => void;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
  setUser: (user: User | null) => void;
}
