# 💰 Budget Personnel

Application complète de gestion budgétaire personnelle construite avec Next.js et Tailwind CSS. Adaptée aux petits salaires et optimisée pour les pays d'Afrique francophone (FCFA).

## ✨ Fonctionnalités principales

### 🎯 Configuration initiale
- **Onboarding interactif** : Configuration du profil en 3 étapes
- Saisie du salaire mensuel et date de réception
- Informations sur le mode de vie (personnes à charge, logement, transport)

### 💳 Gestion des charges fixes
- Ajout/modification/suppression de charges mensuelles
- Catégorisation (loyer, électricité, internet, etc.)
- Dates d'échéance personnalisables
- Calcul automatique du total

### 📊 Planification budgétaire
- Assistant de création de budget par catégorie
- Suggestions intelligentes basées sur le salaire
- 9 catégories de dépenses prédéfinies
- Visualisation en temps réel du budget restant

### 💸 Suivi des transactions
- Ajout rapide de revenus et dépenses
- Catégorisation détaillée avec sous-catégories
- Historique complet avec filtres
- Interface intuitive et rapide

### 📈 Dashboard et statistiques
- Vue d'ensemble du solde disponible
- Budget journalier recommandé
- Jours restants avant prochain salaire
- Progression du budget avec barre visuelle
- Statistiques par catégorie
- Évolution hebdomadaire

### 💡 Conseils intelligents
- Alertes de dépassement de budget
- Recommandations personnalisées
- Conseils d'optimisation par catégorie
- Messages motivants

### ⚙️ Paramètres
- Modification du profil à tout moment
- Mise à jour du salaire
- Réinitialisation complète des données

## 🚀 Installation

```bash
# Cloner le projet
git clone [url-du-repo]
cd budget-app

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🏗️ Build Production

```bash
npm run build
npm start
```

## 🛠️ Technologies

- **Next.js 15** - Framework React avec App Router
- **React 19** - Bibliothèque UI
- **Tailwind CSS** - Framework CSS utility-first
- **LocalStorage** - Stockage local des données

## 📁 Structure du projet

```
budget-app/
├── app/
│   ├── globals.css          # Styles globaux
│   ├── layout.js            # Layout principal
│   └── page.js              # Page d'accueil
├── components/
│   ├── Onboarding.js        # Configuration initiale
│   ├── Dashboard.js         # Vue d'ensemble
│   ├── FixedCharges.js      # Gestion charges fixes
│   ├── BudgetPlanner.js     # Planification budget
│   ├── BudgetControls.js    # Ajout transactions
│   ├── TransactionSlideout.js # Historique
│   ├── Advice.js            # Conseils intelligents
│   ├── Statistics.js        # Statistiques détaillées
│   ├── Settings.js          # Paramètres utilisateur
│   ├── Header.js            # En-tête
│   └── Footer.js            # Pied de page
├── lib/
│   ├── utils.js             # Fonctions utilitaires
│   ├── storage.js           # Gestion localStorage
│   └── categories.js        # Catégories et icônes
└── public/                  # Assets statiques
```

## 💾 Stockage des données

Toutes les données sont stockées **localement** dans le navigateur via localStorage :
- Profil utilisateur
- Charges fixes
- Plan budgétaire
- Transactions
- Paramètres

**Aucune donnée n'est envoyée à un serveur externe.**

## 🎨 Catégories disponibles

### Dépenses
- 🍽️ Alimentation (Courses, Restaurant, Snacks, Marché)
- 🚗 Transport (Carburant, Transport en commun, Taxi, Entretien)
- 🏠 Logement (Loyer, Électricité, Eau, Internet)
- ⚕️ Santé (Médicaments, Consultations, Urgences)
- 🎮 Loisirs (Sorties, Sport, Hobbies, Vacances)
- 👔 Vêtements (Vêtements, Chaussures, Coiffure, Soins)
- 📚 Éducation (Scolarité, Livres, Formations)
- 📱 Abonnements (Téléphone, Streaming, Salle de sport)
- 📦 Autre

### Revenus
- 💼 Salaire
- 💻 Freelance
- 📈 Investissement
- 🤝 Aide/Allocation
- 💰 Autre

## 🎯 Fonctionnalités à venir

- [ ] Export des données (CSV, PDF)
- [ ] Graphiques avancés
- [ ] Objectifs d'épargne
- [ ] Notifications et rappels
- [ ] Mode sombre/clair
- [ ] Multi-devises
- [ ] Scanner de reçus (OCR)
- [ ] Mode hors ligne (PWA)
- [ ] Synchronisation cloud (optionnelle)

## 📱 Compatibilité

- ✅ Navigateurs modernes (Chrome, Firefox, Safari, Edge)
- ✅ Mobile responsive
- ✅ Tablettes
- ✅ Desktop

## 🔒 Sécurité et confidentialité

- Données stockées uniquement en local
- Aucun tracking ou analytics
- Aucune connexion internet requise après chargement
- Code source ouvert et auditable

## 📄 Licence

Ce projet est open source et disponible sous licence MIT.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer des fonctionnalités
- Soumettre des pull requests

## 📞 Support

Pour toute question ou suggestion, ouvrez une issue sur GitHub.

---

**Fait avec ❤️ pour aider à mieux gérer son budget personnel**
