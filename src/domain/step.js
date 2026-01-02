class Step {
    #id = crypto.randomUUID();
    #description;

    get id() {
        return this.#id;
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

    constructor({ description } = {}) {
        this.description = description;
    }
}

export { Step };