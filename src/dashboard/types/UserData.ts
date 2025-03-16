export interface UserData {
  name: string;
  balance: number;
  savingsGoals: SavingsGoal[];
  recentTransactions: Transaction[];
  insights: Insight[];
  achievements: Achievement[];
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
}

export interface UserData {
  name: string;
  balance: number;
  savingsGoals: SavingsGoal[];
  insights: Insight[];
//   achievements: {
//     title: string;
//     description: string;
//     icon: string;
//   }[];
achievements: Achievement[];
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  date: Date;
  description: string;
}

export interface Insight {
  id: string;
  type: 'tip' | 'warning' | 'achievement';
  message: string;
  date: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  earned: boolean;
  progress: number;
}