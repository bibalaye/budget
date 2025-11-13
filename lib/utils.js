/**
 * Utility functions for budget calculations
 */

// Format currency
export const formatCurrency = (amount, currency = 'FCFA') => {
  return `${amount.toLocaleString('fr-FR')} ${currency}`;
};

// Calculate percentage
export const calculatePercentage = (part, total) => {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
};

// Get days remaining in month
export const getDaysRemainingInMonth = () => {
  const now = new Date();
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return lastDay.getDate() - now.getDate();
};

// Get days in current month
export const getDaysInMonth = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
};

// Calculate daily budget
export const calculateDailyBudget = (remaining, daysLeft) => {
  if (daysLeft <= 0) return 0;
  return remaining / daysLeft;
};

// Filter transactions by date range
export const filterTransactionsByDateRange = (transactions, startDate, endDate) => {
  return transactions.filter(t => {
    const date = new Date(t.date);
    return date >= startDate && date <= endDate;
  });
};

// Get current month transactions
export const getCurrentMonthTransactions = (transactions) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  return filterTransactionsByDateRange(transactions, start, end);
};

// Calculate total by type
export const calculateTotalByType = (transactions, type) => {
  return transactions
    .filter(t => t.type === type)
    .reduce((sum, t) => sum + t.amount, 0);
};

// Calculate total by category
export const calculateTotalByCategory = (transactions, category) => {
  return transactions
    .filter(t => t.category === category)
    .reduce((sum, t) => sum + t.amount, 0);
};

// Group transactions by category
export const groupTransactionsByCategory = (transactions) => {
  return transactions.reduce((acc, transaction) => {
    const cat = transaction.category;
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(transaction);
    return acc;
  }, {});
};

// Calculate budget status
export const calculateBudgetStatus = (spent, budget) => {
  if (budget === 0) return 'none';
  const percentage = (spent / budget) * 100;
  if (percentage >= 100) return 'exceeded';
  if (percentage >= 80) return 'warning';
  return 'good';
};

// Generate unique ID
export const generateId = () => {
  return Date.now() + Math.random().toString(36).substr(2, 9);
};

// Format date
export const formatDate = (date, format = 'short') => {
  const d = new Date(date);
  if (format === 'short') {
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  }
  if (format === 'long') {
    return d.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  }
  if (format === 'full') {
    return d.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  return d.toLocaleDateString('fr-FR');
};

// Get month name
export const getMonthName = (monthIndex) => {
  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  return months[monthIndex];
};

// Calculate savings rate
export const calculateSavingsRate = (income, expenses) => {
  if (income === 0) return 0;
  return Math.round(((income - expenses) / income) * 100);
};
