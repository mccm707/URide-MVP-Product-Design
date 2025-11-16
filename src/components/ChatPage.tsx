import { useState } from 'react';
import { Send, ShieldCheck, MapPin, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Header } from './Header';
import type { User } from '../App';

interface ChatPageProps {
  user: User;
  chatWith: User;
  onBack: () => void;
}

interface Message {
  id: string;
  sender: 'me' | 'them';
  text: string;
  timestamp: Date;
}

export function ChatPage({ user, chatWith, onBack }: ChatPageProps) {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'them',
      text: 'Hey! Thanks for matching with my ride!',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
    {
      id: '2',
      sender: 'them',
      text: "Let's meet at the main entrance of Rush Rhees Library at 1:45 PM",
      timestamp: new Date(Date.now() - 1000 * 60 * 4),
    },
    {
      id: '3',
      sender: 'me',
      text: 'Perfect! See you there',
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
    },
  ]);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'me',
      text: messageText,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setMessageText('');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header user={user} title="Chat" showBack onBack={onBack} />

      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {/* Chat Header - Co-rider info */}
        <Card className="m-4 p-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={chatWith.photo}
                alt={chatWith.name}
                className="w-12 h-12 rounded-full border-2 border-blue-600"
              />
              {chatWith.verified && (
                <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-0.5">
                  <ShieldCheck className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-gray-900">{chatWith.name}</span>
                <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                  Verified
                </span>
              </div>
              <p className="text-sm text-gray-600">ROC Airport • Nov 22, 2:00 PM</p>
            </div>
          </div>
        </Card>

        {/* Important Info Banner */}
        <div className="mx-4 mb-4">
          <Card className="bg-blue-50 border-blue-200 p-3">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="text-blue-900 mb-1">Meeting Point Shared</p>
                <div className="flex items-center gap-1.5 text-blue-700">
                  <MapPin className="w-3 h-3" />
                  <span>Rush Rhees Library Main Entrance</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] ${
                  message.sender === 'me'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-900 border border-gray-200'
                } rounded-2xl px-4 py-2.5`}
              >
                <p>{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="max-w-4xl mx-auto flex gap-2">
            <Input
              type="text"
              placeholder="Type a message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!messageText.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Safety Footer */}
        <div className="bg-yellow-50 border-t border-yellow-200 p-3">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs text-yellow-800 text-center">
              🔒 Keep conversations respectful and on-topic. Report any inappropriate behavior.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}