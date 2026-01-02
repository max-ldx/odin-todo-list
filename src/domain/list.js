import { Task } from "./task";

/**
 * Represents a list of tasks
 */
class List {
    #id = crypto.randomUUID();
    #tasks = [];

    /** 
     * @returns {string} The id of the list
     */
    get id() {
        return this.#id;
    }

    /**
     * @returns {[Task]} A copy of the task list
     */
    get tasks() {
        return [...this.#tasks];
    }

    /**
     * 
     * @param {Task} task A task to add to the list 
     */
    addTask(task) {
        if (!(task instanceof Task)) {
            throw new TypeError('Task must be a task object');
        }
        this.#tasks.push(task);
    }

    /**
     * 
     * @param {string} id The id of a task to remove from the list
     */
    removeTask(id) {
        this.#tasks = this.#tasks.filter(t => t.id !== id);
    }
}

export { List };