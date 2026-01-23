import './style.css';
import { TaskStore } from './taskStore.js';
import { StorageManager } from './storageManager.js';
import { UIManager } from './UIManager.js';

/**
 * INITIALISATION DU COEUR DE L'APPLICATION
 */

// 1. Charger les données brutes du LocalStorage et les transformer en objets réels (Hydratation)
const savedData = StorageManager.load();

// 2. Créer l'instance unique du Store avec les données chargées
const store = new TaskStore(savedData);

// 3. Abonner le StorageManager aux changements du Store
// À chaque modification (ajout, suppression, édit), les données sont sauvegardées
store.subscribe(lists => StorageManager.save(lists));

/**
 * INITIALISATION DE L'INTERFACE UTILISATEUR
 */

// 4. Lancer le gestionnaire d'UI en lui passant le store
const app = new UIManager(store);

// 5. Rendre l'instance 'app' accessible globalement
// Cela permet aux événements onclick="app.toggleTask(...)" du HTML de fonctionner
window.app = app;

/**
 * DONNÉES PAR DÉFAUT (PREMIER LANCEMENT)
 */

// 6. Si l'utilisateur n'a aucune liste, on crée un exemple de bienvenue
if (store.lists.length === 0) {
    console.log("🛠️ Initialisation des données par défaut...");

    // Création d'une liste par défaut
    store.addList("🚀 Ma Première Liste");
    
    // Récupération de l'ID de la liste fraîchement créée
    const defaultListId = store.lists[0].id;

    // Ajout de tâches d'exemple
    // On calcule une date à demain (J+1) pour la validation
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];

    store.addTask(defaultListId, {
        title: "Bienvenue dans Task Manager",
        description: "Cliquez sur une tâche pour la modifier ou sur le '+' pour créer une liste.",
        priority: 2,
        dueDate: dateStr
    });

    store.addTask(defaultListId, {
        title: "Tester la persistance",
        description: "Ajoutez des tâches et rafraîchissez la page : tout restera là !",
        priority: 1,
        dueDate: dateStr
    });

    // Sélectionner la liste par défaut et mettre à jour l'affichage
    app.activeListId = defaultListId;
    app.render();
}

console.log("✅ Application démarrée avec succès.");