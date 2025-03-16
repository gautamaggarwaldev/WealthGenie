import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: string;
}

const sampleStocks: StockData[] = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2456.75, change: 1.5, volume: '2.5M' },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3567.80, change: -0.8, volume: '1.8M' },
  { symbol: 'HDFC', name: 'HDFC Bank', price: 1678.90, change: 2.3, volume: '3.1M' },
  { symbol: 'INFY', name: 'Infosys', price: 1456.30, change: 0.5, volume: '2.2M' },
  { symbol: 'AAPL', name: 'Apple Inc.', price: 189.84, change: 0.7, volume: '3.8M' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', price: 378.85, change: 1.2, volume: '2.9M' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 134.99, change: -0.3, volume: '1.9M' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 145.68, change: 1.8, volume: '2.7M' }
];

const Stocks: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [stocks, setStocks] = useState<StockData[]>(sampleStocks);

  const handleSearch = () => {
    if (!searchTerm) {
      setStocks(sampleStocks);
      return;
    }
    const filteredStocks = sampleStocks.filter(stock => 
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setStocks(filteredStocks);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8">
      <div className="max-w-[1440px] mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Stock Market</h1>
          <Button 
            variant="outline" 
            className="border-[#00D395] text-[#00D395] hover:bg-[#00D395] hover:text-white"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </Button>
        </div>

        <div className="flex gap-4 items-center">
          <Input
            placeholder="Search stocks (e.g., RELIANCE)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button 
            className="bg-[#00D395] hover:bg-[#00D395]/90"
            onClick={handleSearch}
          >
            <i className="fas fa-search mr-2"></i>
            Search
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stocks.map((stock) => (
            <Card 
              key={stock.symbol} 
              className="p-6 bg-gray-900/50 border-gray-800 hover:border-[#00D395] transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{stock.symbol}</h3>
                    <p className="text-gray-400 text-sm">{stock.name}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-sm ${
                    stock.change >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[#00D395] text-2xl font-bold">₹{stock.price}</p>
                    <p className="text-gray-400 text-sm">Volume: {stock.volume}</p>
                  </div>
                  <Button className="bg-[#00D395] hover:bg-[#00D395]/90">
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          
          <Card className="p-6 bg-gray-900/50 border-gray-800 hover:border-[#00D395] transition-all duration-300 flex flex-col justify-center items-center cursor-pointer"
            onClick={() => window.open('https://www.nseindia.com/market-data/live-equity-market', '_blank')}
          >
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#00D395]/20 flex items-center justify-center mx-auto">
                <i className="fas fa-building text-[#00D395] text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-white">Browse More Companies</h3>
              <p className="text-gray-400 text-sm">Discover more investment opportunities on NSE</p>
              <Button className="bg-[#00D395] hover:bg-[#00D395]/90 w-full">
                <i className="fas fa-external-link-alt mr-2"></i>
                Visit NSE
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Stocks;