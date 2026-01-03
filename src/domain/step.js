/**
 * Represents a step in a task.
 */

class Step {
    #id = crypto.randomUUID();
    #description;
    #done;

    /** 
     * @returns {string} The id of the step.
     */
    get id() {
        return this.#id;
    }

    /** 
     * @returns {string} The description of the step.
     */
    get description() {
        return this.#description;
    }

    /**
     * @param {string} value The description of the step. 
     */
    set description(value) {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new TypeError('Description must be a non-empty string.');
        }
        this.#description = value;
    }

    /** 
     * @returns {boolean} The status of the task.
     */
    get done() {
        return this.#done;
    }

    /**
     * Toggles the status of the task.
     */
    toggleDone() {
        this.#done = !this.#done;
    }

    /**
     * 
     * @param {{description}} description The description of the step. 
     */
    constructor({ description } = {}) {
        this.description = description;
    }
}

export { Step };