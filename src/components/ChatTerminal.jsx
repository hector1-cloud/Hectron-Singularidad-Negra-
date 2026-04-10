import React, { useState, useEffect, useRef } from 'react';

const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;

function ChatTerminal({ proyecto, modelo }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'system', content: `NÚCLEO_${modelo}_ACTIVO. PROYECTO: ${proyecto.toUpperCase()}.` },
    { role: 'assistant', content: 'Protocolos de comunicación establecidos. ¿Qué órdenes tiene, Arquitecto?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch(
        `https://api-inference.huggingface.co/models/AbadaLabs/HECTRON`,
        {
          headers: { 
            Authorization: `Bearer ${HF_TOKEN}`,
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({ inputs: input }),
        }
      );
      
      const data = await response.json();
      const aiContent = data[0]?.generated_text || data.generated_text || "ERROR: SEÑAL_DÉBIL_REINTENTE";

      setMessages(prev => [...prev, { role: 'assistant', content: aiContent }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "FALLO_DE_RED: VERIFIQUE_API_TOKEN" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-black p-2 sm:p-4">
      {/* Header Estilo Consola */}
      <div className="border-b border-green-900 pb-2 mb-4 flex justify-between text-[10px] uppercase tracking-tighter">
        <span>STATUS: OPERATIVO_LINK</span>
        <span className="animate-pulse">● REC_STREAM</span>
      </div>

      {/* Área de Mensajes */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 scrollbar-hide">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start animate-fade-in'}`}>
            <div className={`max-w-[85%] p-3 rounded-lg border ${
              msg.role === 'user' 
                ? 'bg-green-950/20 border-green-500/30 text-green-300' 
                : 'bg-zinc-900 border-zinc-800 text-green-500'
            }`}>
              <p className="text-[10px] opacity-50 mb-1 uppercase">
                {msg.role === 'assistant' ? '>> HECTRON_OS' : '>> OPERADOR'}
              </p>
              <p className="text-sm leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        {isTyping && <div className="text-xs text-green-800 animate-pulse">PROCESANDO_PENSAMIENTO...</div>}
        <div ref={scrollRef} />
      </div>

      {/* Input de Comandos */}
      <form onSubmit={sendMessage} className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escriba un comando..."
          className="w-full bg-zinc-900 border border-zinc-800 text-green-400 p-4 rounded-lg outline-none focus:border-green-500 transition-all text-sm"
        />
        <button className="absolute right-4 top-4 text-green-500 font-bold">↵</button>
      </form>
    </div>
  );
}

export default ChatTerminal;
