import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, RefreshCw, Lightbulb } from 'lucide-react';
import { Message } from '../types';
import { sendMessageToGemini, resetChatSession } from '../services/geminiService';

const SUGGESTIONS = [
  "Which patients are critical?",
  "Is Dr. Ray available?",
  "Summarize Sarah Jenkins' condition",
  "List all empty beds"
];

const AIAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: "Hello! I am CareFlow AI. I have access to the current patient records and doctor schedules. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const responseText = await sendMessageToGemini(textToSend);

    const modelMessage: Message = {
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, modelMessage]);
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    resetChatSession();
    setMessages([{
      role: 'model',
      text: "Context refreshed. How can I help you with the latest hospital data?",
      timestamp: new Date()
    }]);
  };

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col animate-in fade-in zoom-in-95 duration-500">
      <div className="flex items-center justify-between mb-4">
        <div>
           <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
             <Sparkles className="w-6 h-6 text-teal-500" />
             AI Assistant
           </h2>
           <p className="text-slate-500">Powered by Gemini 2.5 Flash</p>
        </div>
        <button 
          onClick={handleReset}
          className="text-xs flex items-center gap-1.5 text-slate-500 hover:text-teal-600 transition-colors px-3 py-1.5 bg-white rounded-lg border border-slate-200 hover:border-teal-200"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset Context
        </button>
      </div>

      <div className="flex-1 bg-white rounded-2xl shadow-lg border border-slate-200 flex flex-col overflow-hidden">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-slate-800' : 'bg-teal-600 shadow-md shadow-teal-600/20'
              }`}>
                {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
              </div>
              
              <div className={`flex flex-col max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`px-5 py-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user' 
                    ? 'bg-slate-800 text-white rounded-tr-none shadow-md' 
                    : 'bg-slate-50 text-slate-800 border border-slate-100 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-1.5 px-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center shrink-0 shadow-md shadow-teal-600/20">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-slate-50 border border-slate-100 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-teal-600 animate-spin" />
                <span className="text-sm text-slate-500">Analyzing hospital records...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-3">
          {messages.length < 3 && !loading && (
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {SUGGESTIONS.map((s, i) => (
                <button 
                  key={i}
                  onClick={() => handleSend(s)}
                  className="flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 bg-white border border-teal-100 text-teal-700 rounded-full text-xs font-medium hover:bg-teal-50 transition-colors"
                >
                  <Lightbulb className="w-3 h-3" />
                  {s}
                </button>
              ))}
            </div>
          )}
          
          <div className="relative">
            <div className="flex items-end gap-2 bg-white rounded-xl border border-slate-200 p-2 focus-within:ring-2 focus-within:ring-teal-500/20 focus-within:border-teal-500 transition-all shadow-sm">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about patients, symptoms, or doctor availability..."
                className="w-full bg-transparent border-none focus:ring-0 resize-none max-h-32 text-sm text-slate-700 placeholder-slate-400 p-2"
                rows={1}
                style={{ minHeight: '44px' }}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                className={`p-2.5 rounded-lg transition-all duration-200 flex-shrink-0 mb-0.5 ${
                  input.trim() && !loading
                    ? 'bg-teal-600 text-white shadow-md hover:bg-teal-700 hover:shadow-lg hover:scale-105 active:scale-95' 
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
          <p className="text-center text-[10px] text-slate-400">
            CareFlow AI can make mistakes. Please verify critical medical information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;