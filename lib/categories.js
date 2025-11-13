/**
 * Categories and subcategories for budget management
 */

export const EXPENSE_CATEGORIES = {
  alimentation: {
    name: 'Alimentation',
    icon: '🍽️',
    subcategories: ['Courses', 'Restaurant', 'Snacks', 'Marché']
  },
  transport: {
    name: 'Transport',
    icon: '🚗',
    subcategories: ['Carburant', 'Transport en commun', 'Taxi/Moto', 'Entretien véhicule']
  },
  logement: {
    name: 'Logement',
    icon: '🏠',
    subcategories: ['Loyer', 'Électricité', 'Eau', 'Internet', 'Entretien']
  },
  sante: {
    name: 'Santé',
    icon: '⚕️',
    subcategories: ['Médicaments', 'Consultations', 'Urgences', 'Assurance']
  },
  loisirs: {
    name: 'Loisirs',
    icon: '🎮',
    subcategories: ['Sorties', 'Sport', 'Hobbies', 'Vacances']
  },
  vetements: {
    name: 'Vêtements',
    icon: '👔',
    subcategories: ['Vêtements', 'Chaussures', 'Coiffure', 'Soins personnels']
  },
  education: {
    name: 'Éducation',
    icon: '📚',
    subcategories: ['Scolarité', 'Livres', 'Formations', 'Fournitures']
  },
  abonnements: {
    name: 'Abonnements',
    icon: '📱',
    subcategories: ['Téléphone', 'Streaming', 'Salle de sport', 'Autres']
  },
  autre: {
    name: 'Autre',
    icon: '📦',
    subcategories: ['Divers', 'Cadeaux', 'Imprévus']
  }
};

export const INCOME_CATEGORIES = {
  salaire: {
    name: 'Salaire',
    icon: '💼'
  },
  freelance: {
    name: 'Freelance',
    icon: '💻'
  },
  investissement: {
    name: 'Investissement',
    icon: '📈'
  },
  aide: {
    name: 'Aide/Allocation',
    icon: '🤝'
  },
  autre: {
    name: 'Autre',
    icon: '💰'
  }
};

export const FIXED_CHARGE_TYPES = [
  { value: 'loyer', label: 'Loyer / Hypothèque', icon: '🏠' },
  { value: 'electricite', label: 'Électricité', icon: '💡' },
  { value: 'eau', label: 'Eau', icon: '💧' },
  { value: 'internet', label: 'Internet / Téléphone', icon: '📡' },
  { value: 'assurance', label: 'Assurances', icon: '🛡️' },
  { value: 'abonnement', label: 'Abonnements', icon: '📺' },
  { value: 'credit', label: 'Crédits / Emprunts', icon: '🏦' },
  { value: 'scolarite', label: 'Scolarité', icon: '🎓' },
  { value: 'autre', label: 'Autre', icon: '📋' }
];

export const getCategoryInfo = (categoryKey, type = 'expense') => {
  const categories = type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;
  return categories[categoryKey] || { name: categoryKey, icon: '📦' };
};

export const getAllExpenseCategories = () => {
  return Object.keys(EXPENSE_CATEGORIES).map(key => ({
    value: key,
    ...EXPENSE_CATEGORIES[key]
  }));
};

export const getAllIncomeCategories = () => {
  return Object.keys(INCOME_CATEGORIES).map(key => ({
    value: key,
    ...INCOME_CATEGORIES[key]
  }));
};
