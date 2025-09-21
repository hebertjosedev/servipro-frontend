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
  sender_name?: string;
  text: string;
  sender_role: string;
  // agrega más campos si los tienes
}

export interface DisplayMessage {
  message_id: string;
  sender: string;
  role: string;
  text: string;
  timestamp: string;
}