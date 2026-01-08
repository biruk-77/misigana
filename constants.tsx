
import React from 'react';
import { Heart, Stars, MapPin, Calendar, Camera, BookOpen, Anchor } from 'lucide-react';
import { Memory, LoveReason } from './types';

export const MEMORIES: Memory[] = [
  {
    id: '1',
    title: 'The Covenant of Prayer',
    date: 'Nov 22, 2024',
    description: 'The moment our journey transcended feelings. We decided to let God lead us, confirming our love through prayer. A true testimony of faith.',
    image: 'https://images.unsplash.com/photo-1515023115689-589c39455d44?auto=format&fit=crop&q=80',
  },
  {
    id: '2',
    title: 'Reality Better Than Dreams',
    date: 'Dec 5, 2025',
    description: 'Our first meeting. The anxiety washed away the moment I saw you. I found my Queen, and you found your Gentleman. Finally home.',
    image: 'https://images.unsplash.com/photo-1516589174184-c68526572af0?auto=format&fit=crop&q=80',
  },
  {
    id: '3',
    title: 'The Birth of Yemiwedish',
    date: 'Dec 19, 2025',
    description: 'When a nickname became an identity. "Yemiwedish"—the one who loves you. You promised to be my safe place, my peace in the storm.',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80',
  },
  {
    id: '4',
    title: 'Effort Over Egos',
    date: 'Jan 1, 2026',
    description: 'We chose a love that stays. No exits, no running—just two souls deciding to fix what is broken and grow together with Christ at our center.',
    image: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&q=80',
  }
];

export const INITIAL_REASONS: LoveReason[] = [
  { id: 1, text: "The way you keep Christ at the center of your heart, making you a light I always want to follow." },
  { id: 2, text: "You are the only one who truly understands me, my 'Yemiwedish' who sees my soul." },
  { id: 3, text: "The peace you bring into my life—I finally feel like I can breathe when I am with you." },
  { id: 4, text: "Your commitment to choosing effort over ego; we don't look for exits, we build bridges." },
  { id: 5, text: "The way you look at me as your 'Gentleman', making me want to be a better man every single day." },
];

export const ICONS = {
  Heart: <Heart className="text-rose-500 fill-rose-500" />,
  Stars: <Stars className="text-amber-400" />,
  Location: <MapPin className="text-rose-400" />,
  Calendar: <Calendar className="text-rose-400" />,
  Camera: <Camera className="text-rose-400" />,
  Bible: <BookOpen className="text-rose-400" />,
  Peace: <Anchor className="text-rose-400" />,
};
