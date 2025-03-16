import React from 'react';
import { Card } from "@/components/ui/card";

interface DashboardHeaderProps {
  name: string;
  balance: number;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ name, balance }) => {
  return (
    <Card className="p-6 bg-gray-900/50 border-gray-800">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Welcome back, {name}</h2>
          <p className="text-gray-400">Here's your financial overview</p>
        </div>
        <div className="text-right">
          <p className="text-gray-400">Total Balance</p>
          <div className="text-4xl font-bold text-[#00D395]">
            ₹{balance.toLocaleString()}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DashboardHeader;