'use client';

import { useState } from 'react';
import { getAllExpenseCategories } from '@/lib/categories';
import { formatCurrency, calculatePercentage } from '@/lib/utils';

/**
 * BudgetPlanner component - Create monthly budget plan
 */
export default function BudgetPlanner({ salary, fixedCharges, onComplete }) {
  const [step, setStep] = useState(0);
  const categories = getAllExpenseCategories();
  const [budgets, setBudgets] = useState(
    categories.reduce((acc, cat) => ({ ...acc, [cat.value]: 0 }), {})
  );

  const totalFixedCharges = fixedCharges.reduce((sum, c) => sum + c.amount, 0);
  const remainingAfterCharges = salary - totalFixedCharges;
  const totalBudgeted = Object.values(budgets).reduce((sum, val) => sum + val, 0);
  const remaining = remainingAfterCharges - totalBudgeted;

  const suggestions = {
    alimentation: Math.round(remainingAfterCharges * 0.35),
    transport: Math.round(remainingAfterCharges * 0.15),
    sante: Math.round(remainingAfterCharges * 0.10),
    loisirs: Math.round(remainingAfterCharges * 0.08),
    vetements: Math.round(remainingAfterCharges * 0.05),
    education: Math.round(remainingAfterCharges * 0.05),
    epargne: Math.round(remainingAfterCharges * 0.15),
    autre: Math.round(remainingAfterCharges * 0.07)
  };

  const handleNext = () => {
    if (step < categories.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(budgets);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleUseSuggestion = () => {
    const currentCat = categories[step].value;
    setBudgets({ ...budgets, [currentCat]: suggestions[currentCat] || 0 });
  };

  const currentCategory = categories[step];
  const currentBudget = budgets[currentCategory.value];
  const suggestion = suggestions[currentCategory.value];

  return (
    <div className="bg-rollbar-bg-card rounded-xl p-8 border border-rollbar-border">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-2xl font-semibold">
            Planification budgétaire
          </h2>
          <span className="text-rollbar-gray-text text-sm">
            {step + 1} / {categories.length}
          </span>
        </div>
        
        {/* Progress bar */}
        <div className="h-2 bg-rollbar-bg-dark rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-rollbar-yellow transition-all duration-300"
            style={{ width: `${((step + 1) / categories.length) * 100}%` }}
          />
        </div>

        {/* Budget summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-rollbar-bg-dark rounded-lg p-4">
            <p className="text-rollbar-gray-text text-xs mb-1">Disponible</p>
            <p className="text-white font-bold">{formatCurrency(remainingAfterCharges)}</p>
          </div>
          <div className="bg-rollbar-bg-dark rounded-lg p-4">
            <p className="text-rollbar-gray-text text-xs mb-1">Budgété</p>
            <p className="text-white font-bold">{formatCurrency(totalBudgeted)}</p>
          </div>
          <div className="bg-rollbar-bg-dark rounded-lg p-4">
            <p className="text-rollbar-gray-text text-xs mb-1">Restant</p>
            <p className={`font-bold ${remaining >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {formatCurrency(remaining)}
            </p>
          </div>
        </div>
      </div>

      {/* Category form */}
      <div className="bg-rollbar-bg-dark rounded-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{currentCategory.icon}</span>
          <div>
            <h3 className="text-white text-xl font-semibold">{currentCategory.name}</h3>
            <p className="text-rollbar-gray-text text-sm">
              Budget mensuel pour cette catégorie
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-white text-sm font-semibold mb-2">
              Montant mensuel (FCFA)
            </label>
            <input
              type="number"
              value={currentBudget}
              onChange={(e) => setBudgets({
                ...budgets,
                [currentCategory.value]: parseFloat(e.target.value) || 0
              })}
              placeholder="0"
              className="w-full bg-rollbar-bg-card border border-rollbar-border text-white px-4 py-3 rounded-lg text-lg focus:outline-none focus:border-rollbar-blue"
            />
          </div>

          {suggestion > 0 && (
            <div className="bg-rollbar-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-semibold mb-1">
                    💡 Suggestion
                  </p>
                  <p className="text-rollbar-gray-text text-xs">
                    Basé sur {calculatePercentage(suggestion, remainingAfterCharges)}% de votre budget disponible
                  </p>
                </div>
                <button
                  onClick={handleUseSuggestion}
                  className="btn-blue text-sm"
                >
                  {formatCurrency(suggestion)}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        {step > 0 && (
          <button onClick={handleBack} className="btn-outline flex-1">
            Précédent
          </button>
        )}
        <button 
          onClick={handleNext} 
          className="btn-blue-lg flex-1"
          disabled={remaining < 0}
        >
          {step === categories.length - 1 ? 'Terminer' : 'Suivant'}
        </button>
      </div>

      {remaining < 0 && (
        <p className="text-red-400 text-sm text-center mt-4">
          ⚠️ Votre budget dépasse vos revenus disponibles
        </p>
      )}
    </div>
  );
}
