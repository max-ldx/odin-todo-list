import { isValid, isBefore, parseISO } from 'date-fns';
import { Priority } from './priority.js';

const PRIVATE_KEY = Symbol('TodoPrivateKey');

export default class Todo {
    #id;
    #title;
    #description;
    #dueDate;
    #priority;
    #completed;

    constructor(key, {
        id = crypto.randomUUID(),
        title,
        description = '',
        dueDate,
        priority = Priority.NORMAL,
        completed = false
    } = {}) {
        if (key !== PRIVATE_KEY) {
            throw new Error('Private constructor: Use Todo.create() or Todo.fromJSON().');
        }

        this.#id = id;
        this.#title = title.trim();
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = priority;
        this.#completed = Boolean(completed);

        Object.freeze(this);
    }

    static #validateTitle(title) {
        if (typeof title !== 'string' || title.trim() === '') {
            throw new TypeError('Title must be a non-empty string.');
        }
    }

    static #parseAndValidateDate(inputDate) {
        const dueDateObj = typeof inputDate === 'string'
            ? parseISO(inputDate)
            : inputDate;

        if (!(dueDateObj instanceof Date) || !isValid(dueDateObj)) {
            throw new TypeError('Due date must be a valid Date object or ISO string.');
        }

        return dueDateObj;
    }

    static #validatePriority(priority) {
        if (!Object.values(Priority).includes(priority)) {
            throw new TypeError(`Priority must be one of: ${Object.values(Priority).join(', ')}`);
        }
    }

    static create(data) {
        Todo.#validateTitle(data?.title);

        const priority = data?.priority ?? Priority.NORMAL;
        Todo.#validatePriority(priority);

        const dueDateObj = Todo.#parseAndValidateDate(data?.dueDate);

        if (isBefore(dueDateObj, new Date())) {
            throw new RangeError('Due date and time cannot be in the past.');
        }

        return new Todo(PRIVATE_KEY, {
            ...data,
            priority,
            dueDate: dueDateObj,
            completed: false
        });
    }

    static fromJSON(json) {
        const data = typeof json === 'string' ? JSON.parse(json) : json;

        Todo.#validateTitle(data?.title);

        const priority = data?.priority ?? Priority.NORMAL;
        Todo.#validatePriority(priority);

        const dueDateObj = Todo.#parseAndValidateDate(data?.dueDate);

        return new Todo(PRIVATE_KEY, {
            ...data,
            priority,
            dueDate: dueDateObj,
            completed: Boolean(data?.completed)
        });
    }

    with(changes = {}) {
        const newTitle = changes.title !== undefined ? changes.title : this.#title;
        Todo.#validateTitle(newTitle);

        const newPriority = changes.priority !== undefined ? changes.priority : this.#priority;
        Todo.#validatePriority(newPriority);

        let newDueDate = this.#dueDate;
        if (changes.dueDate !== undefined) {
            newDueDate = Todo.#parseAndValidateDate(changes.dueDate);

            if (isBefore(newDueDate, new Date())) {
                throw new RangeError('New due date and time cannot be in the past.');
            }
        }

        const newCompleted = changes.completed !== undefined
            ? Boolean(changes.completed)
            : this.#completed;

        return new Todo(PRIVATE_KEY, {
            id: this.#id,
            title: newTitle,
            description: changes.description ?? this.#description,
            dueDate: newDueDate,
            priority: newPriority,
            completed: newCompleted
        });
    }

    toggleComplete() {
        return this.with({ completed: !this.#completed });
    }

    toJSON() {
        return {
            id: this.#id,
            title: this.#title,
            description: this.#description,
            dueDate: this.#dueDate.toISOString(),
            priority: this.#priority,
            completed: this.#completed
        };
    }

    get id() { return this.#id; }
    get title() { return this.#title; }
    get description() { return this.#description; }
    get dueDate() { return new Date(this.#dueDate.getTime()); }
    get priority() { return this.#priority; }
    get completed() { return this.#completed; }
}