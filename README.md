# to-do-list-
## Fonctionnalités


- Ajouter des tâches
- Lister les tâches 
- Supprimer des tâches 
- Gérer l'état des tâches

## Prérequis

- Node.js
- Expo 
- React Native

## Installation

 -Clonez le dépôt 
 -Acceder au dossier du projet:  cd testRN
 -Installer les dependances : npm install
 -Demarrer le serveur :npx expo start
 -Changer l'URL de l'API pour que l'application fonctionne. Si localhost ne fonctionne pas, essayez de mettre l'adresse IP.

## Utilisation
 -Ouvrez l'application sur votre appareil ou émulateur.
 -Tester les fonctionnalites :
  vous pouvez ajouter, marquer comme complètes, trier par priorité , trier par alphabetique en ordre croissant et supprimer des tâches selon vos besoins.


# Documentation

### Structure du Projet

- `app/index.tsx` : Le point d'entrée de l'application
- `service/serviceTask.ts` : Gère les appels à l'API fictive.
- `interface/Todo.ts` : Définitions des types TypeScript utilisés dans l'application.
- `components/TodoTask.tsx` : Composants de l'interface utilisateur.

### Démarche

1. **Conception de l'interface** : L'interface a été conçue pour offrir une expérience utilisateur fluide, tout en restant sur un seul écran.
2.  **Design patern**: L' architecture est principalement fonctionnelle et basée sur des composants, intégrant certains éléments du pattern MVC. Cependant, elle ne constitue pas une implémentation complète du MVC

3. **Gestion de l'état** : L'application utilise le state management de React pour gérer l'état des tâches. Cela permet une mise à jour réactive de l'interface lors de l'ajout, de la suppression ou de la modification d'une tâche.

4. **API REST fictive** :L'application interagit avec une API REST fictive pour simuler les opérations CRUD, ce qui permet de tester les fonctionnalités sans nécessiter un backend réel. J'utilise JSON Server pour mettre en place le serveur de l'API.

5. **Fonctionnalités de tri** : Les tâches peuvent être triées selon plusieurs critères. Cette fonctionnalité améliore l'expérience utilisateur en rendant la gestion des tâches plus organisée.


### Optimisations

- Utilisation de hooks pour une meilleure performance.
- Implémentation de gestion des erreurs pour garantir une expérience utilisateur robuste.

