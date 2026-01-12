
import React, { useState, useRef, useEffect } from 'react';
import { getGeminiAdvisorResponse } from '../services/gemini';
import { ChatMessage } from '../types';

interface SmartPathAIProps {
  onClose: () => void;
}

const STARTER_PROMPTS = [
  "How do I start as a beginner?",
  "What's the difference between CPC and CCS?",
  "Tell me about job placements.",
  "Which course is best for nursing background?"
];

const SmartPathAI: React.FC<SmartPathAIProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      content: 'Welcome to Seyone Academy! I am your SmartPath Career Advisor. I can help you find the perfect certification for your goals. What is your background in healthcare?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (customMessage?: string) => {
    const userMessage = (customMessage || input).trim();
    if (!userMessage || isLoading) return;

    setInput('');
    setIsLoading(true);

    const newUserMsg: ChatMessage = { role: 'user', content: userMessage, timestamp: new Date() };
    setMessages(prev => [...prev, newUserMsg]);

    try {
      const history = messages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
      }));

      const aiResponse = await getGeminiAdvisorResponse(userMessage, history);
      
      const newAiMsg: ChatMessage = { 
        role: 'model', 
        content: aiResponse, 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, newAiMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white animate-in slide-in-from-bottom-2 duration-300">
      {/* Header */}
      <div className="bg-[#1A1A1B] p-4 text-white flex justify-between items-center shrink-0 border-b-4 border-[#76BC21]">
        <div className="flex items-center space-x-3">
          <div className="bg-[#76BC21] p-2 rounded-xl shadow-lg animate-pulse">
            <i className="fas fa-brain text-white text-lg"></i>
          </div>
          <div>
            <h3 className="font-black text-sm tracking-tight">SmartPath Advisor</h3>
            <span className="text-[10px] text-[#76BC21] font-black uppercase tracking-widest">Seyone Academy</span>
          </div>
        </div>
        <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-lg transition-colors">
          <i className="fas fa-times"></i>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-grow overflow-y-auto p-4 space-y-6 bg-slate-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm border ${
              msg.role === 'user' 
                ? 'bg-[#76BC21] text-white border-[#76BC21] rounded-tr-none' 
                : 'bg-white text-slate-700 border-slate-200 rounded-tl-none'
            }`}>
              {msg.content.split('\n').map((line, i) => (
                <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>
              ))}
              <div className={`text-[10px] mt-2 opacity-50 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        {/* Quick Suggestions - only show if few messages */}
        {messages.length < 5 && !isLoading && (
          <div className="pt-4 flex flex-wrap gap-2 animate-in fade-in duration-500 delay-300">
            {STARTER_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="text-[11px] font-bold bg-white border border-slate-200 text-slate-600 px-3 py-2 rounded-lg hover:border-[#76BC21] hover:text-[#76BC21] transition-all text-left"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 flex space-x-2">
              <div className="w-2 h-2 bg-[#76BC21] rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-[#76BC21] rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-[#76BC21] rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <form 
        onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
        className="p-4 bg-white border-t border-slate-100 flex items-center space-x-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your background or goals..."
          className="flex-grow bg-slate-100 border-none focus:ring-2 focus:ring-[#76BC21] rounded-xl py-3 px-4 text-sm"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-[#1A1A1B] text-white p-3 rounded-xl w-12 h-12 flex items-center justify-center hover:bg-[#76BC21] transition-all disabled:opacity-30 disabled:hover:bg-[#1A1A1B] shadow-lg shadow-black/5"
        >
          <i className={`fas ${isLoading ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`}></i>
        </button>
      </form>
      
      <div className="bg-white pb-2 px-4 text-center">
        <p className="text-[10px] text-slate-400 font-medium">Seyone SmartPath AI uses Gemini for career pathing guidance.</p>
      </div>
    </div>
  );
};

export default SmartPathAI;
