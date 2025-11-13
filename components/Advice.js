'use client';

import { getCategoryInfo } from '@/lib/categories';
import { formatCurrency, calculatePercentage } from '@/lib/utils';

/**
 * Advice component - Smart recommendations and alerts
 */
export default function Advice({ transactions, budgetPlan, daysLeft }) {
  if (!budgetPlan) return null;

  const advices = [];

  // Calculate spending by category
  const spendingByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  // Check each category
  Object.entries(budgetPlan).forEach(([category, budget]) => {
    if (budget === 0) return;
    
    const spent = spendingByCategory[category] || 0;
    const percentage = calculatePercentage(spent, budget);
    const categoryInfo = getCategoryInfo(category, 'expense');

    // Over budget
    if (percentage >= 100) {
      advices.push({
        type: 'danger',
        icon: '🚨',
        title: `Budget ${categoryInfo.name} dépassé`,
        message: `Vous avez dépensé ${formatCurrency(spent)} sur ${formatCurrency(budget)} (${percentage}%)`
      });
    }
    // Warning - 80% used
    else if (percentage >= 80 && daysLeft > 5) {
      advices.push({
        type: 'warning',
        icon: '⚠️',
        title: `Attention au budget ${categoryInfo.name}`,
        message: `Vous avez utilisé ${percentage}% de votre budget et il reste ${daysLeft} jours`
      });
    }
    // Good progress
    else if (percentage < 50 && daysLeft < 10) {
      advices.push({
        type: 'success',
        icon: '✅',
        title: `Excellent ! Budget ${categoryInfo.name}`,
        message: `Vous êtes en dessous de votre budget avec seulement ${percentage}% utilisé`
      });
    }
  });

  // Daily budget advice
  const totalBudget = Object.values(budgetPlan).reduce((sum, val) => sum + val, 0);
  const totalSpent = Object.values(spendingByCategory).reduce((sum, val) => sum + val, 0);
  const remaining = totalBudget - totalSpent;
  const dailyBudget = daysLeft > 0 ? remaining / daysLeft : 0;

  if (dailyBudget > 0 && daysLeft > 0) {
    advices.push({
      type: 'info',
      icon: '💡',
      title: 'Budget journalier recommandé',
      message: `Il vous reste ${formatCurrency(dailyBudget)} par jour pour les ${daysLeft} jours restants`
    });
  }

  if (advices.length === 0) {
    advices.push({
      type: 'success',
      icon: '🎉',
      title: 'Tout va bien !',
      message: 'Vous gérez bien votre budget ce mois-ci. Continuez comme ça !'
    });
  }

  return (
    <section className="bg-rollbar-bg-card rounded-xl p-8 border border-rollbar-border">
      <h2 className="text-white text-2xl font-semibold mb-6">
        💬 Conseils personnalisés
      </h2>
      
      <div className="space-y-3">
        {advices.map((advice, index) => (
          <div
            key={index}
            className={`rounded-lg p-4 border ${
              advice.type === 'danger' ? 'bg-[rgba(239,68,68,0.1)] border-red-500' :
              advice.type === 'warning' ? 'bg-[rgba(251,146,60,0.1)] border-orange-500' :
              advice.type === 'success' ? 'bg-[rgba(16,185,129,0.1)] border-green-500' :
              'bg-[rgba(68,132,255,0.1)] border-rollbar-blue'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{advice.icon}</span>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">{advice.title}</h3>
                <p className="text-rollbar-gray-text text-sm">{advice.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
