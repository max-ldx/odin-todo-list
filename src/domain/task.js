import { compareAsc } from 'date-fns';
import { Priority } from './priority';
import { Step } from './step';

class Task {
    #id = crypto.randomUUID();
    #title;
    #description;
    #dueDate;
    #priority;
    #steps = [];

    get id() {
        return this.#id;
    }

    get title() {
        return this.#title;
    }

    set title(value) {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new TypeError('Title must be a non-empty string.');
        }
        this.#title = value;
    }

    get description() {
        return this.#description;
    }

    set description(value) {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new TypeError('Description must be a non-empty string.');
        }
        this.#description = value;
    }

    get dueDate() {
        return this.#dueDate;
    }

    set dueDate(value) {
        if (!(value instanceof Date)) {
            throw new TypeError('Due date must be a Date object.');
        }

        const now = new Date();
        if (compareAsc(value, now) !== 1) {
            throw new TypeError('Due date must be greater than now.');
        }

        this.#dueDate = value;
    }

    get priority() {
        return this.#priority;
    }

    set priority(value) {
        if (!Object.values(Priority).includes(value)) {
            throw new TypeError('Priority must be either: Low, Medium or High');
        }
        this.#priority = value;
    }

    get steps() {
        return [...this.#steps];
    }

    constructor({ title, description, dueDate, priority } = {}) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    addStep(step) {
        if (!(step instanceof Step)) {
            throw new TypeError('Step must be a step object.');
        }
        this.#steps.push(step);
    }

    removeStep(id) {
        this.#steps = this.#steps.filter(s => s.id !== id);
    }
}

export { Task };