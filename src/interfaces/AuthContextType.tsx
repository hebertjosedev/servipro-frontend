import { type User } from './User'; // Importa el tipo User

export type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
};