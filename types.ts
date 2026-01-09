
export interface ChatLine {
  sender: 'Biruk' | 'Misgana' | 'Bura' | 'Ma Q';
  text: string;
}

export interface Memory {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  chatHistory?: ChatLine[];
}

export interface LoveReason {
  id: number;
  text: string;
}

export interface ChatMoment {
  // Fix: Updated sender type to include 'Bura' and 'Ma Q' to resolve type errors in constants.tsx
  sender: 'Biruk' | 'Misgana' | 'Bura' | 'Ma Q';
  text: string;
  date: string;
}

export type AppState = 'splash' | 'main';