'use client';

import { useState } from 'react';

/**
 * Onboarding component - Initial setup wizard
 */
export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    salary: '',
    salaryDate: 1,
    dependents: 0,
    housingType: 'locataire',
    transportType: 'transport_commun',
    employmentStatus: 'salarie'
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(profile);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceed = () => {
    if (step === 1) return profile.salary && parseFloat(profile.salary) > 0;
    return true;
  };

  return (
    <div className="fixed inset-0 bg-rollbar-bg-dark z-50 flex items-center justify-center p-5">
      <div className="max-w-[600px] w-full bg-rollbar-bg-card rounded-xl p-8 border border-rollbar-border">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-rollbar-gray-text text-sm">Étape {step} sur 3</span>
            <span className="text-rollbar-gray-text text-sm">{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="h-2 bg-rollbar-bg-dark rounded-full overflow-hidden">
            <div 
              className="h-full bg-rollbar-yellow transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Salary */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-white text-2xl font-semibold mb-2">
                Bienvenue ! 👋
              </h2>
              <p className="text-rollbar-gray-text">
                Commençons par configurer votre profil financier
              </p>
            </div>

            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                Quel est votre salaire mensuel net ?
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={profile.salary}
                  onChange={(e) => setProfile({...profile, salary: e.target.value})}
                  placeholder="Ex: 150000"
                  className="w-full bg-rollbar-bg-dark border border-rollbar-border text-white px-4 py-3 rounded-lg text-lg focus:outline-none focus:border-rollbar-blue transition-colors"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-rollbar-gray-text">
                  FCFA
                </span>
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                Quel jour du mois recevez-vous votre salaire ?
              </label>
              <select
                value={profile.salaryDate}
                onChange={(e) => setProfile({...profile, salaryDate: parseInt(e.target.value)})}
                className="w-full bg-rollbar-bg-dark border border-rollbar-border text-white px-4 py-3 rounded-lg focus:outline-none focus:border-rollbar-blue transition-colors"
              >
                {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Step 2: Lifestyle */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-white text-2xl font-semibold mb-2">
                Votre situation 🏠
              </h2>
              <p className="text-rollbar-gray-text">
                Ces informations nous aident à personnaliser vos conseils
              </p>
            </div>

            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                Nombre de personnes à charge
              </label>
              <input
                type="number"
                min="0"
                value={profile.dependents}
                onChange={(e) => setProfile({...profile, dependents: parseInt(e.target.value) || 0})}
                className="w-full bg-rollbar-bg-dark border border-rollbar-border text-white px-4 py-3 rounded-lg focus:outline-none focus:border-rollbar-blue transition-colors"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                Type de logement
              </label>
              <select
                value={profile.housingType}
                onChange={(e) => setProfile({...profile, housingType: e.target.value})}
                className="w-full bg-rollbar-bg-dark border border-rollbar-border text-white px-4 py-3 rounded-lg focus:outline-none focus:border-rollbar-blue transition-colors"
              >
                <option value="proprietaire">Propriétaire</option>
                <option value="locataire">Locataire</option>
                <option value="heberge">Hébergé</option>
              </select>
            </div>

            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                Moyen de transport principal
              </label>
              <select
                value={profile.transportType}
                onChange={(e) => setProfile({...profile, transportType: e.target.value})}
                className="w-full bg-rollbar-bg-dark border border-rollbar-border text-white px-4 py-3 rounded-lg focus:outline-none focus:border-rollbar-blue transition-colors"
              >
                <option value="voiture">Voiture personnelle</option>
                <option value="moto">Moto/Scooter</option>
                <option value="transport_commun">Transport en commun</option>
                <option value="velo">Vélo</option>
                <option value="marche">À pied</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 3: Employment */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-white text-2xl font-semibold mb-2">
                Dernière étape ! 🎯
              </h2>
              <p className="text-rollbar-gray-text">
                Quelques informations supplémentaires
              </p>
            </div>

            <div>
              <label className="block text-white text-sm font-semibold mb-2">
                Situation professionnelle
              </label>
              <select
                value={profile.employmentStatus}
                onChange={(e) => setProfile({...profile, employmentStatus: e.target.value})}
                className="w-full bg-rollbar-bg-dark border border-rollbar-border text-white px-4 py-3 rounded-lg focus:outline-none focus:border-rollbar-blue transition-colors"
              >
                <option value="salarie">Salarié(e)</option>
                <option value="independant">Indépendant(e)</option>
                <option value="etudiant">Étudiant(e)</option>
                <option value="retraite">Retraité(e)</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <div className="bg-rollbar-bg-dark border border-rollbar-border rounded-lg p-4">
              <p className="text-sm text-rollbar-gray-text">
                💡 <strong className="text-white">Astuce :</strong> Vous pourrez modifier ces informations à tout moment dans les paramètres.
              </p>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex gap-3 mt-8">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="btn-outline flex-1"
            >
              Retour
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="btn-blue-lg flex-1"
          >
            {step === 3 ? 'Commencer' : 'Suivant'}
          </button>
        </div>
      </div>
    </div>
  );
}
