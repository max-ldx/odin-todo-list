import './style.css';

import { TaskStore } from './taskStore.js';
import { StorageManager } from './storageManager.js';

async function runDemo() {
    console.log("🚀 Starting Task System Demo...\n");

    // 1. INITIALIZATION
    // Load data from LocalStorage and boot the store
    const initialData = StorageManager.load();
    const store = new TaskStore(initialData);

    // 2. THE OBSERVER
    // Connect the storage manager to the store
    store.subscribe(lists => {
        StorageManager.save(lists);
        console.log("💾 [StorageSubscriber] Data synced to LocalStorage.");
    });

    console.log(`Current lists in store: ${store.lists.length}`);

    // 3. TESTING VALIDATIONS (The "Try/Catch" block)
    console.log("\n🧪 Testing Validations...");
    try {
        store.addList("A"); // Too short!
    } catch (error) {
        console.log(`❌ Expected Error caught: "${error.message}"`);
    }

    // 4. ADDING DATA
    console.log("\n📝 Creating a new list and tasks...");
    store.addList("Coding Project");
    const myLists = store.lists;
    const projectList = myLists[myLists.length - 1];

    store.addTask(projectList.id, {
        title: "Setup Store",
        description: "Implement the Observer pattern",
        priority: 3,
        dueDate: Date.now() + 10000000 // Future
    });

    // 5. UPDATING DATA
    console.log("\n🔄 Updating a task...");
    const taskToUpdate = projectList.tasks[0];
    store.updateTask(projectList.id, taskToUpdate.id, {
        title: "Store is working!",
        priority: 1
    });

    // 6. VERIFYING THE HYDRATION
    console.log("\n🔍 Verifying Hydration...");
    const rawDataFromStorage = JSON.parse(localStorage.getItem('app_task_data'));
    console.log("Raw JSON in LocalStorage has Methods?", !!rawDataFromStorage[0].tasks[0].toggleComplete); // false
    
    // Now look at our Store (Hydrated)
    const storeTask = store.lists[store.lists.length - 1].tasks[0];
    console.log("Store Object has Methods?", !!storeTask.toggleComplete); // true
    console.log(`Task Title: "${storeTask.title}" | Due Date is Date Object?`, storeTask.dueDate instanceof Date);

    console.log("\n✅ Demo finished. Check your Application tab in DevTools!");
}

runDemo();