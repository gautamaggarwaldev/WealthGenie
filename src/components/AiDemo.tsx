import React, { useState, useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from 'framer-motion';

const sampleResponses = {
  "investment": "Based on your risk profile and goals, I recommend considering a diversified portfolio with 60% in equity mutual funds, 30% in bonds, and 10% in gold ETFs. This allocation provides a good balance of growth potential and risk management.",
  "savings": "To reach your savings goal of ₹10 lakhs in 3 years, you'll need to save approximately ₹25,000 per month, assuming an annual return of 8%. I can help you create a detailed savings plan.",
  "market": "The current market conditions show moderate volatility. Key sectors like IT and Banking are showing positive momentum. Consider dollar-cost averaging for your investments in this market.",
  "stocks": "For stock investments, I recommend starting with blue-chip companies. Consider companies like HDFC Bank, TCS, and Reliance Industries which have shown consistent growth.",
  "mutual funds": "Mutual funds are a great way to start investing. I recommend starting with index funds like Nifty 50 or diversified equity funds with a good track record.",
  "crypto": "Cryptocurrency is a highly volatile investment. If you're interested, start with small amounts in established cryptocurrencies and understand the risks involved.",
  "budget": "I can help you create a 50-30-20 budget plan: 50% for necessities, 30% for wants, and 20% for savings and investments.",
  "default": "I'm your AI financial advisor. I can help you with investment strategies, savings plans, market analysis, and more. Try asking about stocks, mutual funds, or budgeting!"
};

const AiDemo: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState<{ type: 'user' | 'ai'; text: string }[]>([
    { type: 'ai', text: "Hello! I'm your AI financial advisor. How can I help you today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  const handleSend = () => {
    if (!userInput.trim()) return;

    console.log('User Input:', userInput);
    setConversation(prev => [...prev, { type: 'user', text: userInput }]);
    setIsTyping(true);

    // Enhanced response logic
    setTimeout(() => {
      let response = sampleResponses.default;
      const input = userInput.toLowerCase();
      
      console.log('Processing input:', input);

      // Check for keywords in the input
      if (input.includes('invest')) {
        response = sampleResponses.investment;
        console.log('Matched: investment');
      }
      if (input.includes('save') || input.includes('savings')) {
        response = sampleResponses.savings;
        console.log('Matched: savings');
      }
      if (input.includes('market')) {
        response = sampleResponses.market;
        console.log('Matched: market');
      }
      if (input.includes('stocks') || input.includes('shares')) {
        response = sampleResponses.stocks;
        console.log('Matched: stocks');
      }
      if (input.includes('mutual') || input.includes('fund')) {
        response = sampleResponses['mutual funds'];
        console.log('Matched: mutual funds');
      }
      if (input.includes('crypto') || input.includes('bitcoin')) {
        response = sampleResponses.crypto;
        console.log('Matched: crypto');
      }
      if (input.includes('budget') || input.includes('plan')) {
        response = sampleResponses.budget;
        console.log('Matched: budget');
      }

      console.log('Selected Response:', response);
      setConversation(prev => [...prev, { type: 'ai', text: response }]);
      setIsTyping(false);
    }, 1000);

    setUserInput('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="w-full max-w-2xl mx-auto bg-gray-900/50 border-gray-800">
        <div className="p-4 border-b border-gray-800">
          <h3 className="text-lg font-semibold text-white">AI Financial Advisor Demo</h3>
        </div>
        
        <div className="h-[400px] overflow-y-auto p-4 space-y-4 scroll-smooth">
          <AnimatePresence>
            {conversation.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: msg.type === 'user' ? 20 : -20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 0.3,
                  type: "spring",
                  stiffness: 100 
                }}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.type === 'user'
                      ? 'bg-[#00D395] text-white'
                      : 'bg-gray-800 text-gray-100'
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-800 text-gray-100 p-3 rounded-lg">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      
        <div className="p-4 border-t border-gray-800 flex gap-2">
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                console.log('Enter pressed');
                handleSend();
              }
            }}
            placeholder="Ask about investments, savings, or market analysis..."
            className="bg-gray-800 border-gray-700 text-white"
          />
          <Button 
            onClick={() => {
              console.log('Button clicked');
              handleSend();
            }}
            className="bg-[#00D395] hover:bg-[#00D395]/90"
          >
            <i className="fas fa-paper-plane"></i>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default AiDemo;