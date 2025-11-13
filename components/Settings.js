'use client';

import { useState } from 'react';
import { clearAllData } from '@/lib/storage';

/**
 * Settings component - User profile and app settings
 */
export default function Settings({ isOpen, onClose, userProfile, onUpdate }) {
  const [formData, setFormData] = useState(userProfile);

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdate(formData);
    onClose();
  };

  const handleReset = () => {
    if (confirm('⚠️ Êtes-vous sûr de vouloir réinitialiser toutes les données ? Cette action est irréversible.')) {
      clearAllData();
      window.location.reload();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[999]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] bg-rollbar-bg-card rounded-xl shadow-xl z-[1000] p-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-rollbar-yellow text-2xl font-semibold m-0">
            ⚙️ Paramètres
          </h2>
          <button
            onClick={onClose}
            className="bg-transparent border-none text-white text-3xl cursor-pointer p-0 w-8 h-8 flex items-center justify-center transition-colors hover:text-rollbar-yellow"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div>
            <h3 className="text-white font-semibold mb-4">Profil financier</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  Salaire mensuel net (FCFA)
                </label>
                <input
                  type="number"
                  value={formData.salary}
                  onChange={(e) => setFormData({...formData, salary: e.target.value})}
                  className="w-full bg-rollbar-bg-dark border border-rollbar-border text-white px-4 py-3 rounded-lg focus:outline-none focus:border-rollbar-blue"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  Date de réception du salaire
                </label>
                <select
                  value={formData.salaryDate}
                  onChange={(e) => setFormData({...formData, salaryDate: parseInt(e.target.value)})}
                  className="w-full bg-rollbar-bg-dark border border-rollbar-border text-white px-4 py-3 rounded-lg focus:outline-none focus:border-rollbar-blue"
                >
                  {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                    <option key={day} value={day}>{day} du mois</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Informations personnelles</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  Personnes à charge
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.dependents}
                  onChange={(e) => setFormData({...formData, dependents: parseInt(e.target.value) || 0})}
                  className="w-full bg-rollbar-bg-dark border border-rollbar-border text-white px-4 py-3 rounded-lg focus:outline-none focus:border-rollbar-blue"
                />
              </div>

              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  Type de logement
                </label>
                <select
                  value={formData.housingType}
                  onChange={(e) => setFormData({...formData, housingType: e.target.value})}
                  className="w-full bg-rollbar-bg-dark border border-rollbar-border text-white px-4 py-3 rounded-lg focus:outline-none focus:border-rollbar-blue"
                >
                  <option value="proprietaire">Propriétaire</option>
                  <option value="locataire">Locataire</option>
                  <option value="heberge">Hébergé</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  Transport principal
                </label>
                <select
                  value={formData.transportType}
                  onChange={(e) => setFormData({...formData, transportType: e.target.value})}
                  className="w-full bg-rollbar-bg-dark border border-rollbar-border text-white px-4 py-3 rounded-lg focus:outline-none focus:border-rollbar-blue"
                >
                  <option value="voiture">Voiture personnelle</option>
                  <option value="moto">Moto/Scooter</option>
                  <option value="transport_commun">Transport en commun</option>
                  <option value="velo">Vélo</option>
                  <option value="marche">À pied</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-sm font-semibold mb-2">
                  Situation professionnelle
                </label>
                <select
                  value={formData.employmentStatus}
                  onChange={(e) => setFormData({...formData, employmentStatus: e.target.value})}
                  className="w-full bg-rollbar-bg-dark border border-rollbar-border text-white px-4 py-3 rounded-lg focus:outline-none focus:border-rollbar-blue"
                >
                  <option value="salarie">Salarié(e)</option>
                  <option value="independant">Indépendant(e)</option>
                  <option value="etudiant">Étudiant(e)</option>
                  <option value="retraite">Retraité(e)</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
            </div>
          </div>

          <div className="border-t border-rollbar-border pt-6">
            <h3 className="text-white font-semibold mb-4">Zone de danger</h3>
            <button
              onClick={handleReset}
              className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-semibold transition-all"
            >
              🗑️ Réinitialiser toutes les données
            </button>
            <p className="text-rollbar-gray-text text-xs mt-2">
              Cette action supprimera définitivement toutes vos données (profil, transactions, budget, etc.)
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              className="flex-1 btn-blue-lg"
            >
              Enregistrer
            </button>
            <button
              onClick={onClose}
              className="btn-outline"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
