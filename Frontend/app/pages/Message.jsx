import { useState } from 'react';
import { ArrowLeft, Send, MoreVertical } from 'lucide-react';
import { messages } from '../data';

const Message = () => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation()
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col c-width bg-gray-50">
      <div className="flex flex-col mx-auto w-full md:max-w-[80%]">
        {/* header */}
        <div className="bg-white border-b border-gray-200 cursor-pointer px-4 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center space-x-3">
              <img
                src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="John Doe"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
              <div>
                <h1 className="font-semibold text-gray-900">John Doe</h1>
                <p className="text-sm text-green-500">Online</p>
              </div>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <MoreVertical className="w-5 h-5 cursor-pointer text-gray-600" />
          </button>
        </div>



        {/* messages container */}
        <div className="flex-1 px-4 pt-8 pb-4 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${msg.isOwner ? 'flex-row-reverse space-x-reverse' : ''
                }`}
            >
              <img
                src={msg.avatar}
                alt={msg.sender}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <div className={`flex flex-col ${msg.isOwner ? 'items-end' : 'items-start'}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${msg.isOwner
                      ? 'bg-blue-500 text-white rounded-br-md'
                      : 'bg-white text-gray-800 rounded-bl-md border border-gray-200'
                    }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
                <span className="text-xs text-gray-500 mt-1 px-2">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* message input */}
        <div className="bg-white border-t border-gray-200 px-4 py-4">
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type a message..."
                className="w-full px-4 py-3 bg-gray-100 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 max-h-32"
                rows="1"
                style={{
                  minHeight: '48px',
                  height: 'auto',
                  overflow: 'hidden'
                }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
                }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className={`p-3 rounded-full transition-all duration-200 ${message.trim()
                  ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl transform hover:scale-105'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="flex justify-between items-center mt-2 px-2">
            <div className="text-xs text-gray-400">
              Press Enter to send, Shift + Enter for new line
            </div>
            <div className="text-xs text-gray-400">
              {message.length}/1000
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;