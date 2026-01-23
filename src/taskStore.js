import { TaskList } from './taskList.js';
import { Task } from './task.js';

export class TaskStore {
    #lists;
    #subscribers;

    constructor(initialData = []) {
        this.#subscribers = [];
        this.#lists = initialData;
    }

    // --- OBSERVER PATTERN ---
    subscribe(callback) {
        this.#subscribers.push(callback);
        callback(this.#lists); // Initial call
        return () => this.#subscribers = this.#subscribers.filter(sub => sub !== callback);
    }

    #notify() {
        this.#subscribers.forEach(callback => callback(this.#lists));
    }

    // --- LIST ACTIONS ---

    addList(name) {
        const newList = new TaskList({ name });
        this.#lists.push(newList);
        this.#notify();
    }

    removeList(listId) {
        this.#lists = this.#lists.filter(list => list.id !== listId);
        this.#notify();
    }

    renameList(listId, newName) {
        const list = this.#findList(listId);
        if (list) {
            list.name = newName; // Triggers TaskList setter validation
            this.#notify();
        }
    }

    // --- TASK ACTIONS ---

    addTask(listId, taskData) {
        const list = this.#findList(listId);
        if (list) {
            list.addTask(new Task(taskData));
            this.#notify();
        }
    }

    removeTask(listId, taskId) {
        const list = this.#findList(listId);
        if (list) {
            list.removeTask(taskId);
            this.#notify();
        }
    }

    /**
     * Updates specific properties of a task (title, priority, etc.)
     * @param {string} listId 
     * @param {string} taskId 
     * @param {Object} updates - e.g., { title: "New Title", priority: 2 }
     */
    updateTask(listId, taskId, updates) {
        const list = this.#findList(listId);
        const task = list?.tasks.find(t => t.id === taskId);

        if (task) {
            // Apply updates by calling setters
            Object.keys(updates).forEach(key => {
                if (key !== 'id' && key in task) {
                    task[key] = updates[key];
                }
            });
            this.#notify();
        }
    }

    // --- UTILS ---

    #findList(id) {
        return this.#lists.find(l => l.id === id);
    }

    get lists() {
        return [...this.#lists];
    }
}