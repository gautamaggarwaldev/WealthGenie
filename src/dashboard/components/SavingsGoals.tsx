import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { SavingsGoal } from '../types/UserData';

interface SavingsGoalsProps {
  goals: SavingsGoal[];
  onUpdateGoal?: (updatedGoal: SavingsGoal) => void;
  onAddGoal?: (newGoal: Omit<SavingsGoal, 'id'>) => void;
}

const SavingsGoals: React.FC<SavingsGoalsProps> = ({ goals, onUpdateGoal, onAddGoal }) => {
  const [editingGoal, setEditingGoal] = useState<string | null>(null);
  const [editedAmount, setEditedAmount] = useState<string>('');
  const [newGoal, setNewGoal] = useState({ name: '', targetAmount: '' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (goal: SavingsGoal) => {
    setEditingGoal(goal.id);
    setEditedAmount(goal.targetAmount.toString());
  };

  const handleSave = (goal: SavingsGoal) => {
    const newAmount = parseInt(editedAmount);
    if (!isNaN(newAmount) && newAmount > 0) {
      onUpdateGoal?.({
        ...goal,
        targetAmount: newAmount
      });
    }
    setEditingGoal(null);
  };

  const handleAddGoal = () => {
    const targetAmount = parseInt(newGoal.targetAmount);
    if (newGoal.name && !isNaN(targetAmount) && targetAmount > 0) {
      onAddGoal?.({
        name: newGoal.name,
        targetAmount,
        deadline: new Date(), // Adding required deadline property with default value
        currentAmount: 0,
      });
      setNewGoal({ name: '', targetAmount: '' });
      setIsDialogOpen(false);
    }
  };

  return (
    <Card className="p-6 bg-gray-900/50 border-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Savings Goals</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="border-[#00D395] text-[#00D395] hover:bg-[#00D395] hover:text-white"
            >
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800 text-white">
            <DialogHeader>
              <DialogTitle>Create New Savings Goal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Goal Name</label>
                <Input
                  value={newGoal.name}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., New Car"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Target Amount (₹)</label>
                <Input
                  type="number"
                  value={newGoal.targetAmount}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, targetAmount: e.target.value }))}
                  placeholder="Enter amount"
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <Button 
                className="w-full bg-[#00D395] hover:bg-[#00D395]/90"
                onClick={handleAddGoal}
              >
                Create Goal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <p className="text-white">{goal.name}</p>
              <div className="flex items-center gap-2">
                {editingGoal === goal.id ? (
                  <>
                    <Input
                      type="number"
                      value={editedAmount}
                      onChange={(e) => setEditedAmount(e.target.value)}
                      className="w-24 bg-gray-800 border-gray-700 text-white"
                    />
                    <Button 
                      size="sm"
                      className="bg-[#00D395] hover:bg-[#00D395]/90"
                      onClick={() => handleSave(goal)}
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="text-[#00D395]">
                      ₹{goal.currentAmount.toLocaleString()} / ₹{goal.targetAmount.toLocaleString()}
                    </p>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-gray-400 hover:text-white"
                      onClick={() => handleEdit(goal)}
                    >
                      <i className="fas fa-edit" />
                    </Button>
                  </>
                )}
              </div>
            </div>
            <Progress value={(goal.currentAmount / goal.targetAmount) * 100} className="bg-gray-800 [&>div]:bg-white" />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SavingsGoals;