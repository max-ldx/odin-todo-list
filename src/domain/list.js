import { Task } from "./task";

class List {
    #id = crypto.randomUUID();
    #tasks = [];

    get id() {
        return this.#id;
    }

    get tasks() {
        return [...this.#tasks];
    }

    addTask(task) {
        if (!(task instanceof Task)) {
            throw new TypeError('Task must be a task object');
        }
        this.#tasks.push(task);
    }

    removeTask(id) {
        this.#tasks = this.#tasks.filter(t => t.id !== id);
    }
}

export { List };