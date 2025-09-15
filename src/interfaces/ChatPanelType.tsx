export interface ChatPanelProps {
  requestId: number;
  currentUser: { role: string }; // ajusta según tu modelo real
  token: string;
}

export interface Message {
  id: number;
  content: string;
  sender: string;
  timestamp: string;
  text: string;
  sender_role: string;
  // agrega más campos si los tienes
}

export interface DisplayMessage {
  sender: string;
  text: string;
  timestamp: string;
}