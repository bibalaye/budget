/**
 * Local storage utilities for budget app
 */

// Storage keys
const KEYS = {
  USER_PROFILE: 'budget_user_profile',
  FIXED_CHARGES: 'budget_fixed_charges',
  BUDGET_PLAN: 'budget_plan',
  TRANSACTIONS: 'budget_transactions',
  SAVINGS_GOALS: 'budget_savings_goals',
  SETTINGS: 'budget_settings'
};

// User Profile
export const saveUserProfile = (profile) => {
  localStorage.setItem(KEYS.USER_PROFILE, JSON.stringify(profile));
};

export const getUserProfile = () => {
  const data = localStorage.getItem(KEYS.USER_PROFILE);
  return data ? JSON.parse(data) : null;
};

// Fixed Charges
export const saveFixedCharges = (charges) => {
  localStorage.setItem(KEYS.FIXED_CHARGES, JSON.stringify(charges));
};

export const getFixedCharges = () => {
  const data = localStorage.getItem(KEYS.FIXED_CHARGES);
  return data ? JSON.parse(data) : [];
};

// Budget Plan
export const saveBudgetPlan = (plan) => {
  localStorage.setItem(KEYS.BUDGET_PLAN, JSON.stringify(plan));
};

export const getBudgetPlan = () => {
  const data = localStorage.getItem(KEYS.BUDGET_PLAN);
  return data ? JSON.parse(data) : null;
};

// Transactions
export const saveTransactions = (transactions) => {
  localStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(transactions));
};

export const getTransactions = () => {
  const data = localStorage.getItem(KEYS.TRANSACTIONS);
  return data ? JSON.parse(data) : [];
};

// Savings Goals
export const saveSavingsGoals = (goals) => {
  localStorage.setItem(KEYS.SAVINGS_GOALS, JSON.stringify(goals));
};

export const getSavingsGoals = () => {
  const data = localStorage.getItem(KEYS.SAVINGS_GOALS);
  return data ? JSON.parse(data) : [];
};

// Settings
export const saveSettings = (settings) => {
  localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
};

export const getSettings = () => {
  const data = localStorage.getItem(KEYS.SETTINGS);
  return data ? JSON.parse(data) : { currency: 'FCFA', notifications: true };
};

// Clear all data
export const clearAllData = () => {
  Object.values(KEYS).forEach(key => localStorage.removeItem(key));
};
