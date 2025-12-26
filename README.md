# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.





## Répartition des Rôles et des Tâches

Le projet est réparti en trois axes principaux afin d’assurer une collaboration
efficace entre les membres du groupe :  

---

### Moungoue : Backend et Base de Données
- Implémentation du schéma de base de données à partir de la modélisation UML
- Mise en place des routes de gestion des réservations et des incidents
- Développement de l’API d’authentification (Admin, Responsable, Enseignant)
- Implémentation de la gestion des rôles et des autorisations
- Vérification de la disponibilité des laboratoires
- Historisation des utilisations et des incidents

---

### Njeuha : Frontend et Interfaces Utilisateur
- Réalisation des maquettes des interfaces
- Développement des composants React
- Mise en place de la navigation et du routage
- Responsivité de l’application (Web et Mobile)
- Mise en place de la vue panoramique des enseignants et des demandes
- Création du formulaire de réservation pour les enseignants
- Affichage et gestion des notifications de validation (ticket numérique)
- Affichage de l’état des laboratoires
- Affichage des réservations en cours et des réservations validées

---

### Kamegni : Modélisation et Fonctionnalités de Gestion

*Responsabilité principale :*  
Assurer l’analyse, la modélisation du système et l’implémentation des
fonctionnalités de gestion pour l’Administrateur et le Responsable de laboratoire.

*Tâches :*
- Rédaction du dossier du projet (analyse, modélisation, diagrammes)
- Conception des cas d’utilisation
- Élaboration du diagramme de classes et du schéma de base de données
- Développement de l’interface Administrateur (gestion des laboratoires)
- Développement de l’interface Responsable (mise à jour de l’état des labos)
- Validation ou modification des réservations
- Gestion des incidents et validation de l’état des laboratoires après utilisation

---
