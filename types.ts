
export interface Memory {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
}

export interface LoveReason {
  id: number;
  text: string;
}

export type AppState = 'splash' | 'main';
