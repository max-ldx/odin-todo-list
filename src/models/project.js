const PRIVATE_KEY = Symbol();

class Project {
    #id;
    #todos;

    get id() {
        return this.#id;
    }

    get todos() {
        return [...this.#todos];
    }

    constructor({ id = crypto.randomUUID(), todos = null } = {}, key) {
        if (key !== PRIVATE_KEY) {
            throw new Error("Constructor is private. Use the public factory method instead.");
        }
        this.#id = id;
        this.#todos = todos === null ? [] : todos;
    }

    static createFrozen({ id = crypto.randomUUID(), todos = null }) {
        const project = new Project({ id, todos });
        return Object.freeze(project);
    }
}

export { Project };