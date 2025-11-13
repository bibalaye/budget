'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import Onboarding from '@/components/Onboarding';
import FixedCharges from '@/components/FixedCharges';
import BudgetPlanner from '@/components/BudgetPlanner';
import BudgetControls from '@/components/BudgetControls';
import Advice from '@/components/Advice';
import Statistics from '@/components/Statistics';
import Footer from '@/components/Footer';
import { 
  getUserProfile, 
  saveUserProfile,
  getFixedCharges,
  saveFixedCharges,
  getBudgetPlan,
  saveBudgetPlan,
  getTransactions,
  saveTransactions
} from '@/lib/storage';
import { 
  getCurrentMonthTransactions, 
  calculateTotalByType,
  calculatePercentage,
  getDaysRemainingInMonth
} from '@/lib/utils';

/**
 * Home page - Main budget management page
 */
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [fixedCharges, setFixedCharges] = useState([]);
  const [budgetPlan, setBudgetPlan] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [showBudgetPlanner, setShowBudgetPlanner] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    const profile = getUserProfile();
    const charges = getFixedCharges();
    const plan = getBudgetPlan();
    const trans = getTransactions();

    setUserProfile(profile);
    setFixedCharges(charges);
    setBudgetPlan(plan);
    setTransactions(trans);
    setIsLoading(false);
  }, []);

  // Save data to localStorage
  useEffect(() => {
    if (!isLoading && userProfile) {
      saveUserProfile(userProfile);
    }
  }, [userProfile, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      saveFixedCharges(fixedCharges);
    }
  }, [fixedCharges, isLoading]);

  useEffect(() => {
    if (!isLoading && budgetPlan) {
      saveBudgetPlan(budgetPlan);
    }
  }, [budgetPlan, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      saveTransactions(transactions);
    }
  }, [transactions, isLoading]);

  const handleOnboardingComplete = (profile) => {
    setUserProfile(profile);
  };

  const handleBudgetPlanComplete = (plan) => {
    setBudgetPlan(plan);
    setShowBudgetPlanner(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen hero-background flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  // Show onboarding if no user profile
  if (!userProfile) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  // Calculate stats
  const currentMonthTransactions = getCurrentMonthTransactions(transactions);
  const totalIncome = calculateTotalByType(currentMonthTransactions, 'income');
  const totalExpense = calculateTotalByType(currentMonthTransactions, 'expense');
  const totalFixedCharges = fixedCharges.reduce((sum, c) => sum + c.amount, 0);
  const monthlyBudget = parseFloat(userProfile.salary) - totalFixedCharges;
  const balance = totalIncome - totalExpense;
  const budgetUsedPercentage = calculatePercentage(totalExpense, monthlyBudget);

  return (
    <div className="min-h-screen hero-background">
      <Header 
        userProfile={userProfile}
        onProfileUpdate={setUserProfile}
      />
      <main className="pt-[100px] px-5 pb-5">
        <div className="max-w-[1200px] mx-auto">
          <div className="hero-section mb-10">
            <h1 className="hero-title mt-[40px] mb-2.5">
              <span className="text-white">Gérez votre </span><br />
              <span className="gradient-text">
                Budget Personnel
              </span>
            </h1>
            <p className="text-white text-base mb-10">
              Suivez vos revenus et dépenses en temps réel. Prenez le contrôle de vos finances personnelles.
            </p>
          </div>

          {/* Dashboard */}
          <div className="mb-8">
            <Dashboard
              balance={balance}
              totalIncome={totalIncome}
              totalExpense={totalExpense}
              budgetUsedPercentage={budgetUsedPercentage}
              monthlyBudget={monthlyBudget}
            />
          </div>

          {/* Fixed Charges */}
          <div className="mb-8">
            <FixedCharges
              charges={fixedCharges}
              onUpdate={setFixedCharges}
            />
          </div>

          {/* Budget Planner */}
          {showBudgetPlanner && (
            <div className="mb-8">
              <BudgetPlanner
                salary={parseFloat(userProfile.salary)}
                fixedCharges={fixedCharges}
                onComplete={handleBudgetPlanComplete}
              />
            </div>
          )}

          {!budgetPlan && !showBudgetPlanner && (
            <div className="mb-8 bg-rollbar-bg-card rounded-xl p-8 border border-rollbar-border text-center">
              <h3 className="text-white text-xl font-semibold mb-3">
                📊 Créez votre budget mensuel
              </h3>
              <p className="text-rollbar-gray-text mb-6">
                Définissez vos objectifs de dépenses par catégorie pour mieux gérer votre argent
              </p>
              <button
                onClick={() => setShowBudgetPlanner(true)}
                className="btn-blue-lg"
              >
                Créer mon budget
              </button>
            </div>
          )}

          {/* Advice */}
          {budgetPlan && (
            <div className="mb-8">
              <Advice
                transactions={currentMonthTransactions}
                budgetPlan={budgetPlan}
                daysLeft={getDaysRemainingInMonth()}
              />
            </div>
          )}

          {/* Statistics */}
          {budgetPlan && currentMonthTransactions.length > 0 && (
            <div className="mb-8">
              <Statistics
                transactions={currentMonthTransactions}
                budgetPlan={budgetPlan}
              />
            </div>
          )}

          {/* Transactions */}
          <BudgetControls
            transactions={transactions}
            onUpdate={setTransactions}
            budgetPlan={budgetPlan}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
