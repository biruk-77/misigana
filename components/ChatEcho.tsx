
import React from 'react';
import { CHAT_MOMENTS } from '../constants';
import { MessageCircle } from 'lucide-react';

const ChatEcho: React.FC = () => {
  return (
    <section className="space-y-12 py-12">
      <div className="text-center space-y-3">
        <span className="text-[#a8bfa1] font-bold text-[10px] uppercase tracking-[0.5em]">Echoes of Us</span>
        <h2 className="text-4xl md:text-5xl font-serif italic text-[#4a3f3f]">Our Words.</h2>
      </div>

      <div className="max-w-2xl mx-auto space-y-6 px-4">
        {CHAT_MOMENTS.map((msg, idx) => (
          <div 
            key={idx}
            className={`flex flex-col ${msg.sender === 'Biruk' ? 'items-start' : 'items-end'} animate-soft-reveal`}
            style={{ animationDelay: `${idx * 0.2}s` }}
          >
            <div className={`max-w-[80%] p-6 rounded-[2rem] shadow-sm border border-[#e8939c]/10 ${
              msg.sender === 'Biruk' 
                ? 'bg-white rounded-tl-none' 
                : 'bg-[#e8939c]/5 rounded-tr-none border-[#e8939c]/20'
            }`}>
              <p className={`text-lg ${msg.sender === 'Biruk' ? 'font-medium' : 'font-serif italic'} text-[#4a3f3f]`}>
                "{msg.text}"
              </p>
              <div className="mt-3 flex items-center gap-2 opacity-30 text-[10px] font-bold uppercase tracking-widest">
                <span>{msg.sender}</span>
                <span>•</span>
                <span>{msg.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChatEcho;
