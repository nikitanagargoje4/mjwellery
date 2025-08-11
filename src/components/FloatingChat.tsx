import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-amber-200 w-80 h-96 mb-4 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-amber-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-red-600 font-bold text-sm">R</span>
              </div>
              <div>
                <div className="font-bold text-sm">Jewelry Expert</div>
                <div className="text-xs text-amber-100">Online • Typically replies instantly</div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            <div className="bg-gray-100 rounded-xl p-3 max-w-xs">
              <p className="text-sm text-gray-800">
                Hello! Welcome to रत्नमाला. How can I help you find the perfect jewelry piece today? 💍
              </p>
              <div className="text-xs text-gray-500 mt-1">Just now</div>
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-3">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"
                onKeyPress={(e) => e.key === 'Enter' && message.trim() && setMessage('')}
              />
              <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors duration-200">
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-2 text-center">
              Powered by रत्नमाला Customer Care
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white p-4 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 relative"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6" />
            {/* Notification Dot */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </>
        )}
      </button>
    </div>
  );
};

export default FloatingChat;