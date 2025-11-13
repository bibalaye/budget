'use client';

import { useState } from 'react';
import { FIXED_CHARGE_TYPES } from '@/lib/categories';
import { formatCurrency } from '@/lib/utils';

/**
 * FixedCharges component - Manage monthly fixed charges
 */
export default function FixedCharges({ charges, onUpdate }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    type: 'loyer',
    name: '',
    amount: '',
    dueDate: 1
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const charge = {
      id: editingId || Date.now(),
      ...formData,
      amount: parseFloat(formData.amount)
    };

    let updatedCharges;
    if (editingId) {
      updatedCharges = charges.map(c => c.id === editingId ? charge : c);
    } else {
      updatedCharges = [...charges, charge];
    }

    onUpdate(updatedCharges);
    resetForm();
  };

  const handleEdit = (charge) => {
    setFormData({
      type: charge.type,
      name: charge.name,
      amount: charge.amount.toString(),
      dueDate: charge.dueDate
    });
    setEditingId(charge.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette charge ?')) {
      onUpdate(charges.filter(c => c.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ type: 'loyer', name: '', amount: '', dueDate: 1 });
    setEditingId(null);
    setShowForm(false);
  };

  const totalCharges = charges.reduce((sum, c) => sum + c.amount, 0);

  return (
    <section className="bg-rollbar-bg-card rounded-xl p-8 border border-rollbar-border">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white text-2xl font-semibold mb-1">
            Charges fixes mensuelles
          </h2>
          <p className="text-rollbar-gray-text text-sm">
            Total: <span className="text-white font-semibold">{formatCurrency(totalCharges)}</span>
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="btn-blue"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Ajouter
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 bg-rollbar-bg-dark rounded-lg p-6 border border-rollbar-border">
          <h3 className="text-white font-semibold mb-4">
            {editingId ? 'Modifier la charge' : 'Nouvelle charge fixe'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                Type de charge
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full bg-rollbar-bg-card border border-rollbar-border text-white px-4 py-3 rounded-lg focus:outline-none focus:border-rollbar-blue"
              >
                {FIXED_CHARGE_TYPES.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.icon} {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                Nom / Description
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Ex: Loyer appartement"
                required
                className="w-full bg-rollbar-bg-card border border-rollbar-border text-white px-4 py-3 rounded-lg focus:outline-none focus:border-rollbar-blue"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                Montant (FCFA)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                placeholder="0"
                required
                className="w-full bg-rollbar-bg-card border border-rollbar-border text-white px-4 py-3 rounded-lg focus:outline-none focus:border-rollbar-blue"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                Date d'échéance
              </label>
              <select
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: parseInt(e.target.value)})}
                className="w-full bg-rollbar-bg-card border border-rollbar-border text-white px-4 py-3 rounded-lg focus:outline-none focus:border-rollbar-blue"
              >
                {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                  <option key={day} value={day}>{day} du mois</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button type="submit" className="btn-blue-lg flex-1">
              {editingId ? 'Modifier' : 'Ajouter'}
            </button>
            <button type="button" onClick={resetForm} className="btn-outline">
              Annuler
            </button>
          </div>
        </form>
      )}

      {/* Charges list */}
      <div className="space-y-3">
        {charges.length === 0 ? (
          <p className="text-rollbar-gray-text text-center py-8">
            Aucune charge fixe enregistrée
          </p>
        ) : (
          charges.map(charge => {
            const typeInfo = FIXED_CHARGE_TYPES.find(t => t.value === charge.type);
            return (
              <div
                key={charge.id}
                className="bg-rollbar-bg-dark border border-rollbar-border rounded-lg p-4 flex items-center justify-between hover:border-rollbar-blue transition-all"
              >
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-3xl">{typeInfo?.icon}</span>
                  <div>
                    <h4 className="text-white font-semibold">{charge.name}</h4>
                    <p className="text-rollbar-gray-text text-sm">
                      Échéance: {charge.dueDate} du mois
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-white font-bold text-lg">
                    {formatCurrency(charge.amount)}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(charge)}
                      className="text-rollbar-blue hover:text-white transition-colors p-2"
                      title="Modifier"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(charge.id)}
                      className="text-red-400 hover:text-red-300 transition-colors p-2"
                      title="Supprimer"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
