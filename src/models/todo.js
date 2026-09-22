const PRIVATE_KEY = Symbol();

class Todo {
    #id;
    #title;
    #description;
    #dueDate;
    #done;

    get id() {
        return this.#id;
    }

    get title() {
        return this.#title;
    }

    get description() {
        return this.#description;
    }

    get dueDate() {
        return this.#dueDate instanceof Date ? new Date(this.#dueDate) : this.#dueDate;
    }

    get done() {
        return this.#done;
    }

    constructor({ id = crypto.randomUUID(), title, description, dueDate, done } = {}, key) {
        if (key !== PRIVATE_KEY) {
            throw new Error("Constructor is private. Use the public factory method instead.");
        }
        this.#id = id;
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate instanceof Date ? new Date(dueDate) : dueDate;
        this.#done = done;
    }

    static createFrozen({ id = crypto.randomUUID(), title, description, dueDate, done = false } = {}) {
        const todo = new Todo({ id, title, description, dueDate, done }, PRIVATE_KEY);
        return Object.freeze(todo);
    }

    with(changes = {}) {
        return Todo.createFrozen({
            title: this.#title,
            description: this.#description,
            dueDate: this.#dueDate,
            done: this.#done,
            ...changes,
            id: this.#id
        });
    }
}

export { Todo };