'use client';

import { useState } from 'react';
import TransactionSlideout from './TransactionSlideout';
import { getAllExpenseCategories, getAllIncomeCategories, getCategoryInfo } from '@/lib/categories';
import { formatCurrency } from '@/lib/utils';

/**
 * BudgetControls component - main control panel for budget management
 */
export default function BudgetControls({ transactions, onUpdate, budgetPlan }) {
  const [isSlideoutOpen, setIsSlideoutOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: 'alimentation',
    subcategory: ''
  });

  const expenseCategories = getAllExpenseCategories();
  const incomeCategories = getAllIncomeCategories();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newTransaction = {
      id: Date.now(),
      description: formData.description,
      amount: parseFloat(formData.amount),
      type: formData.type,
      category: formData.category,
      subcategory: formData.subcategory,
      date: new Date().toISOString()
    };

    onUpdate([newTransaction, ...transactions]);
    
    setFormData({
      description: '',
      amount: '',
      type: 'expense',
      category: 'alimentation',
      subcategory: ''
    });
    setShowForm(false);
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <>


      {/* Transactions counter */}
      <div className="mb-8">
        <div
          onClick={() => setIsSlideoutOpen(true)}
          className="bg-rollbar-bg-card rounded-lg p-4 border border-rollbar-border cursor-pointer transition-all hover:border-rollbar-blue flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <h3 className="text-rollbar-yellow text-base font-semibold m-0">
              Transactions
            </h3>
            <div className="text-white text-2xl font-bold font-mono">
              {transactions.length}
            </div>
          </div>
          <button className="bg-transparent text-white border border-white px-4 py-1.5 rounded-md text-sm font-semibold transition-all hover:border-rollbar-blue hover:text-rollbar-blue">
            Voir l'historique
          </button>
        </div>
      </div>

      {/* Add Transaction section */}
      <section className="bg-rollbar-bg-card rounded-xl p-8 mb-8 border border-rollbar-border">
        <div className="mb-6">
          <h2 className="text-white text-2xl font-semibold mt-2.5 mb-0">
            Ajouter une transaction
          </h2>
        </div>
        
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="event-btn"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nouvelle transaction
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                Type
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, type: 'expense', category: 'alimentation'})}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                    formData.type === 'expense' 
                      ? 'bg-red-500 text-white' 
                      : 'bg-rollbar-bg-dark text-rollbar-gray-text border border-rollbar-border'
                  }`}
                >
                  Dépense
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, type: 'income', category: 'salaire'})}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                    formData.type === 'income' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-rollbar-bg-dark text-rollbar-gray-text border border-rollbar-border'
                  }`}
                >
                  Revenu
                </button>
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                Description
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Ex: Courses du mois"
                required
                className="w-full bg-rollbar-bg-dark border border-rollbar-border text-white px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-rollbar-blue transition-colors"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                Montant (€)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                placeholder="0.00"
                required
                className="w-full bg-rollbar-bg-dark border border-rollbar-border text-white px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-rollbar-blue transition-colors"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                Catégorie
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value, subcategory: ''})}
                className="w-full bg-rollbar-bg-dark border border-rollbar-border text-white px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-rollbar-blue transition-colors"
              >
                {(formData.type === 'expense' ? expenseCategories : incomeCategories).map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {formData.type === 'expense' && getCategoryInfo(formData.category, 'expense').subcategories && (
              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  Sous-catégorie (optionnel)
                </label>
                <select
                  value={formData.subcategory}
                  onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
                  className="w-full bg-rollbar-bg-dark border border-rollbar-border text-white px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-rollbar-blue transition-colors"
                >
                  <option value="">Aucune</option>
                  {getCategoryInfo(formData.category, 'expense').subcategories.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 btn-blue-lg"
              >
                Ajouter
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn-outline"
              >
                Annuler
              </button>
            </div>
          </form>
        )}
      </section>

      {/* Transaction slideout */}
      <TransactionSlideout
        isOpen={isSlideoutOpen}
        onClose={() => setIsSlideoutOpen(false)}
        transactions={transactions}
      />
    </>
  );
}
