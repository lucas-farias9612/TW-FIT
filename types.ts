
export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  category: 'Peito' | 'Costas' | 'Pernas' | 'Braços' | 'Cardio' | 'Mobilidade';
  thumbnail?: string;
}

export interface Announcement {
  id: string;
  text: string;
  active: boolean;
  createdAt: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  role: 'student' | 'admin';
  name: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
}
