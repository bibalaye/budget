'use client';

import { useState } from 'react';
import { 
  groupTransactionsByCategory, 
  calculateTotalByCategory,
  formatCurrency,
  calculatePercentage,
  getMonthName
} from '@/lib/utils';
import { getCategoryInfo } from '@/lib/categories';

/**
 * Statistics component - Display spending analytics
 */
export default function Statistics({ transactions, budgetPlan }) {
  const [view, setView] = useState('category'); // 'category' or 'timeline'

  const expenses = transactions.filter(t => t.type === 'expense');
  const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
  
  // Group by category
  const byCategory = groupTransactionsByCategory(expenses);
  const categoryStats = Object.entries(byCategory).map(([category, trans]) => {
    const total = trans.reduce((sum, t) => sum + t.amount, 0);
    const budget = budgetPlan?.[category] || 0;
    const categoryInfo = getCategoryInfo(category, 'expense');
    
    return {
      category,
      name: categoryInfo.name,
      icon: categoryInfo.icon,
      total,
      budget,
      count: trans.length,
      percentage: calculatePercentage(total, totalExpenses),
      budgetPercentage: budget > 0 ? calculatePercentage(total, budget) : 0
    };
  }).sort((a, b) => b.total - a.total);

  // Group by week
  const weeklyStats = expenses.reduce((acc, t) => {
    const date = new Date(t.date);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    const weekKey = weekStart.toISOString().split('T')[0];
    
    if (!acc[weekKey]) {
      acc[weekKey] = { date: weekStart, total: 0, count: 0 };
    }
    acc[weekKey].total += t.amount;
    acc[weekKey].count += 1;
    return acc;
  }, {});

  const weeklyData = Object.values(weeklyStats).sort((a, b) => 
    new Date(a.date) - new Date(b.date)
  );

  return (
    <section className="bg-rollbar-bg-card rounded-xl p-8 border border-rollbar-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-2xl font-semibold">
          📊 Statistiques
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setView('category')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              view === 'category'
                ? 'bg-rollbar-blue text-white'
                : 'bg-rollbar-bg-dark text-rollbar-gray-text'
            }`}
          >
            Par catégorie
          </button>
          <button
            onClick={() => setView('timeline')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              view === 'timeline'
                ? 'bg-rollbar-blue text-white'
                : 'bg-rollbar-bg-dark text-rollbar-gray-text'
            }`}
          >
            Évolution
          </button>
        </div>
      </div>

      {view === 'category' && (
        <div className="space-y-4">
          {categoryStats.length === 0 ? (
            <p className="text-rollbar-gray-text text-center py-8">
              Aucune dépense enregistrée
            </p>
          ) : (
            categoryStats.map(stat => (
              <div key={stat.category} className="bg-rollbar-bg-dark rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{stat.icon}</span>
                    <div>
                      <h3 className="text-white font-semibold">{stat.name}</h3>
                      <p className="text-rollbar-gray-text text-xs">
                        {stat.count} transaction{stat.count > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold text-lg">
                      {formatCurrency(stat.total)}
                    </p>
                    <p className="text-rollbar-gray-text text-xs">
                      {stat.percentage}% du total
                    </p>
                  </div>
                </div>
                
                {/* Progress bar */}
                {stat.budget > 0 && (
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-rollbar-gray-text">
                        Budget: {formatCurrency(stat.budget)}
                      </span>
                      <span className={`font-semibold ${
                        stat.budgetPercentage >= 100 ? 'text-red-400' :
                        stat.budgetPercentage >= 80 ? 'text-orange-400' :
                        'text-green-400'
                      }`}>
                        {stat.budgetPercentage}%
                      </span>
                    </div>
                    <div className="h-2 bg-rollbar-border rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all ${
                          stat.budgetPercentage >= 100 ? 'bg-red-500' :
                          stat.budgetPercentage >= 80 ? 'bg-orange-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(stat.budgetPercentage, 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {view === 'timeline' && (
        <div className="space-y-4">
          {weeklyData.length === 0 ? (
            <p className="text-rollbar-gray-text text-center py-8">
              Aucune donnée disponible
            </p>
          ) : (
            weeklyData.map((week, index) => (
              <div key={index} className="bg-rollbar-bg-dark rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="text-white font-semibold">
                      Semaine du {week.date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                    </h3>
                    <p className="text-rollbar-gray-text text-xs">
                      {week.count} transaction{week.count > 1 ? 's' : ''}
                    </p>
                  </div>
                  <p className="text-white font-bold text-lg">
                    {formatCurrency(week.total)}
                  </p>
                </div>
                
                {/* Visual bar */}
                <div className="h-2 bg-rollbar-border rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-rollbar-blue transition-all"
                    style={{ 
                      width: `${Math.min((week.total / Math.max(...weeklyData.map(w => w.total))) * 100, 100)}%` 
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
}
