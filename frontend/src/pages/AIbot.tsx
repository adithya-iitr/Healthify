import React, { useState, useRef, useEffect } from 'react';
import {
  Send, Bot, User, Sparkles, Dumbbell, Heart, Target, Clock
} from 'lucide-react';
import axios from 'axios';
interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}
import { useNavigate } from 'react-router-dom';
const AIAdvice: React.FC = () => {
  const navigate=useNavigate();
  const upgradeFromAI = ()=>{
    navigate('/plan')
  };
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content:
        "Hi! I'm your AI fitness assistant. I'm here to help answer your fitness and nutrition questions.",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null;

    if (!user) {
      navigate("/login");
    }
  }, [navigate]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 🔁 Fetch response from Gemini backend
  const fetchGeminiResponse = async (message: string): Promise<string> => {
    try {
      const res = await axios.post('http://localhost:8000/api/gemini/ask', {
        message,
      });
      const data = await res.data;
      return data.reply || "I'm sorry, I couldn't generate a response.";
    } catch (error) {
      console.error('Gemini API error:', error);
      return 'There was an error getting a response. Please try again.';
    }
  };

  // 🧠 Update to send real messages to Gemini
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    const aiReplyText = await fetchGeminiResponse(userMessage.content);

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: aiReplyText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiResponse]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Fitness Assistant</h1>
                <p className="text-gray-600">Get instant answers to your fitness questions</p>
              </div>
            </div>
            <button
              onClick={upgradeFromAI}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Feature Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <Dumbbell className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Workout Tips</h3>
            <p className="text-sm text-gray-600">Exercise guidance</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Nutrition</h3>
            <p className="text-sm text-gray-600">Diet advice</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Goal Setting</h3>
            <p className="text-sm text-gray-600">Plan your journey</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">24/7 Available</h3>
            <p className="text-sm text-gray-600">Always here to help</p>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' 
                      ? 'bg-emerald-500' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-600'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className={`rounded-2xl px-4 py-3 ${
                    message.type === 'user'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-emerald-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="border-t bg-gray-50 p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Questions:</h4>
            {/* <div className="flex flex-wrap gap-2">
              {predefinedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(question)}
                  className="bg-white hover:bg-blue-50 text-blue-600 text-xs px-3 py-2 rounded-full border border-blue-200 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div> */}
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about fitness, nutrition, or workouts..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={2}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  inputMessage.trim() && !isTyping
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Upgrade Prompt */}
        <div className="mt-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Want Personalized Guidance?</h3>
                <p className="text-emerald-100">Connect with certified trainers for custom workout plans and 1-on-1 support.</p>
              </div>
            </div>
            <button
              onClick={upgradeFromAI}
              className="bg-white text-emerald-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              View Plans
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAdvice;