import { Task } from './task.js';

export class TaskList {
    // Private fields
    #id;
    #name;
    #tasks;

    /**
     * @param {Object} data - List properties
     * @param {boolean} isHydrating - Passed down to Task objects during hydration
     */
    constructor({
        id = crypto.randomUUID(),
        name = '',
        tasks = []
    } = {}, isHydrating = false) {

        this.#id = id;
        this.name = name; // Validation via setter

        // Hydrate tasks: convert raw objects into Task instances
        this.#tasks = tasks.map(taskData => {
            // If it's already an instance of Task, keep it, otherwise instantiate it
            return taskData instanceof Task
                ? taskData
                : new Task(taskData, isHydrating);
        });
    }

    // --- SETTERS WITH VALIDATION ---

    // Inside TaskList.js

    set name(value) {
        if (!value || value.trim().length < 2) {
            throw new Error("List name must contain at least 2 characters.");
        }
        this.#name = value.trim();
    }

    // --- GETTERS ---

    get id() { return this.#id; }
    get name() { return this.#name; }
    get tasks() {
        // Return a copy to prevent direct array manipulation from outside
        return [...this.#tasks];
    }

    // --- METHODS ---

    addTask(task) {
        if (!(task instanceof Task)) {
            throw new Error("Only instances of Task can be added to the list.");
        }
        this.#tasks.push(task);
    }

    removeTask(taskId) {
        this.#tasks = this.#tasks.filter(t => t.id !== taskId);
    }

    /**
     * Prepares the list and all its tasks for JSON.stringify()
     */
    toJSON() {
        return {
            id: this.#id,
            name: this.#name,
            // The Task.toJSON() method is automatically called for each task
            tasks: this.#tasks
        };
    }
}