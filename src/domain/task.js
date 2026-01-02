import { compareAsc } from 'date-fns';
import { Priority } from './priority';
import { Step } from './step';

/**
 * Represents a task.
 */
class Task {
    #id = crypto.randomUUID();
    #title;
    #description;
    #dueDate;
    #priority;
    #steps = [];

    /**
     * @returns {string} The id of the task.
     */
    get id() {
        return this.#id;
    }

    /** 
     * @returns {string} The title of the task.
     */
    get title() {
        return this.#title;
    }

    /** 
     * @param {string} value The title of the task.
     */
    set title(value) {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new TypeError('Title must be a non-empty string.');
        }
        this.#title = value;
    }

    /** 
     * @returns {string} The description of the task.
     */
    get description() {
        return this.#description;
    }

    /**
     * @param {string} value The description of the task.
     */
    set description(value) {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new TypeError('Description must be a non-empty string.');
        }
        this.#description = value;
    }

    /** 
     * @returns {Date} The due date of the task.
     */
    get dueDate() {
        return this.#dueDate;
    }

    /** 
     * @param {Date} value The due date of the task.
     */
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

    /**
     * @returns {Priority} The priority of the task.
     */
    get priority() {
        return this.#priority;
    }

    /** 
     * @param {Priority} value The priority of the task. 
     */
    set priority(value) {
        if (!Object.values(Priority).includes(value)) {
            throw new TypeError('Priority must be either: Low, Medium or High');
        }
        this.#priority = value;
    }

    /** 
     * @returns {[Step]} A copy of the step list of the task
     */
    get steps() {
        return [...this.#steps];
    }

    /**
     * 
     * @param {{title, description, dueDate, priority}} param0 - A task literal 
     */
    constructor({ title, description, dueDate, priority } = {}) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    /**
     * 
     * @param {Step} step A step to add to the task 
     */
    addStep(step) {
        if (!(step instanceof Step)) {
            throw new TypeError('Step must be a step object.');
        }
        this.#steps.push(step);
    }

    /**
     * 
     * @param {string} id The id of a task to remove. 
     */
    removeStep(id) {
        this.#steps = this.#steps.filter(s => s.id !== id);
    }
}

export { Task };