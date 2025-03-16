import { UserData } from '../types/UserData';

export const fetchUserData = async (): Promise<UserData> => {
  // Simulated API call
  return {
    name: "Aryan Bhutani",
    balance: 12500.00,
    savingsGoals: [
      {
        id: "1",
        name: "Emergency Fund",
        targetAmount: 10000,
        currentAmount: 5000,
        deadline: new Date("2024-12-31")
      }
    ],
    recentTransactions: [
      {
        id: "1",
        type: "expense",
        amount: 50.00,
        category: "Food",
        date: new Date(),
        description: "Grocery shopping"
      }
    ],
    insights: [
      {
        id: "1",
        type: "tip",
        message: "You could save $200 monthly by optimizing your subscriptions",
        date: new Date()
      }
    ],
    achievements: [
      {
        id: "1",
        name: "First Investment",
        description: "Made your first investment",
        earned: true,
        progress: 100
      }
    ]
  };
};