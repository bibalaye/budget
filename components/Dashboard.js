'use client';

import { formatCurrency, getDaysRemainingInMonth, calculateDailyBudget } from '@/lib/utils';

/**
 * Dashboard component - Main overview
 */
export default function Dashboard({ 
  balance, 
  totalIncome, 
  totalExpense, 
  budgetUsedPercentage,
  monthlyBudget 
}) {
  const daysLeft = getDaysRemainingInMonth();
  const dailyBudget = calculateDailyBudget(balance, daysLeft);

  return (
    <div className="space-y-6">
      {/* Main balance card */}
      <div className="bg-gradient-to-br from-rollbar-blue to-[#2c5fb8] rounded-xl p-8 text-white shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold opacity-90">Solde disponible</h3>
          <span className="text-xs opacity-75">{daysLeft} jours restants</span>
        </div>
        <p className="text-4xl font-bold mb-2">{formatCurrency(balance)}</p>
        <div className="flex items-center gap-2 text-sm opacity-90">
          <span>Budget journalier recommandé:</span>
          <span className="font-semibold">{formatCurrency(dailyBudget)}</span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-rollbar-bg-card rounded-lg p-6 border border-rollbar-border">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">💰</span>
            <h3 className="text-rollbar-gray-text text-sm font-semibold">Revenus</h3>
          </div>
          <p className="text-green-400 text-2xl font-bold">{formatCurrency(totalIncome)}</p>
        </div>
        
        <div className="bg-rollbar-bg-card rounded-lg p-6 border border-rollbar-border">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">💸</span>
            <h3 className="text-rollbar-gray-text text-sm font-semibold">Dépenses</h3>
          </div>
          <p className="text-red-400 text-2xl font-bold">{formatCurrency(totalExpense)}</p>
        </div>
        
        <div className="bg-rollbar-bg-card rounded-lg p-6 border border-rollbar-border">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">📊</span>
            <h3 className="text-rollbar-gray-text text-sm font-semibold">Budget utilisé</h3>
          </div>
          <p className={`text-2xl font-bold ${
            budgetUsedPercentage >= 100 ? 'text-red-400' :
            budgetUsedPercentage >= 80 ? 'text-orange-400' :
            'text-rollbar-yellow'
          }`}>
            {budgetUsedPercentage}%
          </p>
        </div>
      </div>

      {/* Budget progress bar */}
      <div className="bg-rollbar-bg-card rounded-lg p-6 border border-rollbar-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold">Progression du budget</h3>
          <span className="text-rollbar-gray-text text-sm">
            {formatCurrency(totalExpense)} / {formatCurrency(monthlyBudget)}
          </span>
        </div>
        <div className="h-4 bg-rollbar-bg-dark rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${
              budgetUsedPercentage >= 100 ? 'bg-red-500' :
              budgetUsedPercentage >= 80 ? 'bg-orange-500' :
              'bg-green-500'
            }`}
            style={{ width: `${Math.min(budgetUsedPercentage, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
