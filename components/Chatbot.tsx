
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { GoogleGenAI } from "@google/genai";

// Using Gemini API to provide a more dynamic and intelligent assistant experience
const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', text: 'Olá! Sou o assistente virtual da TW FIT. Como posso te ajudar hoje?', sender: 'bot', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), text: input, sender: 'user', timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    
    const userInput = input;
    setInput('');
    setIsTyping(true);

    try {
      // Initialize Gemini API client
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Use gemini-3-flash-preview for fast and helpful text interactions
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userInput,
        config: {
          systemInstruction: "Você é o assistente virtual oficial da TW FIT, uma academia de alta performance. Seu tom deve ser motivador, profissional, prestativo e enérgico. Ajude os usuários com informações sobre: 1. Preços: planos a partir de R$ 89,90/mês. 2. Horários: Seg-Sex 06:00 às 23:00, Sáb 08:00 às 14:00. 3. Localização: Rua Fitness, 123 - Centro. 4. Modalidades: Musculação, HIIT, Yoga e Jiu-Jitsu. 5. Treinos: alunos têm acesso a vídeos e fichas exclusivas na 'Área do Aluno' logada. Responda sempre em Português do Brasil.",
        },
      });

      // Directly access the .text property of GenerateContentResponse
      const botResponse = response.text || "Desculpe, tive um problema ao processar sua pergunta. Pode tentar novamente em alguns instantes?";
      
      const botMsg: ChatMessage = { id: (Date.now() + 1).toString(), text: botResponse, sender: 'bot', timestamp: Date.now() };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      const botMsg: ChatMessage = { id: (Date.now() + 1).toString(), text: "Ops! Estamos com uma instabilidade técnica. Por favor, tente novamente mais tarde ou nos chame no WhatsApp.", sender: 'bot', timestamp: Date.now() };
      setMessages(prev => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      {isOpen ? (
        <div className="w-80 h-96 glass rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-primary p-4 flex justify-between items-center">
            <h3 className="font-bold text-white">Assistente TW FIT</h3>
            <button onClick={() => setIsOpen(false)} className="text-white hover:rotate-90 transition-transform">✕</button>
          </div>
          
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-3">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                  m.sender === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-white/10 text-gray-200 rounded-bl-none border border-white/10'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 text-gray-200 p-3 rounded-xl text-sm rounded-bl-none border border-white/10 animate-pulse italic">
                  TW FIT está digitando...
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-white/10 flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Pergunte algo..."
              disabled={isTyping}
              className="flex-grow bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary disabled:opacity-50"
            />
            <button 
              onClick={handleSend} 
              disabled={isTyping || !input.trim()}
              className="bg-primary p-2 rounded-lg hover:scale-105 transition-transform disabled:opacity-50"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-secondary p-4 rounded-full shadow-lg hover:scale-110 transition-transform border border-primary/30"
        >
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default Chatbot;
