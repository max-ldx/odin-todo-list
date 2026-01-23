export class Task {
    // Private fields
    #id;
    #title;
    #description;
    #dueDate;
    #priority;
    #complete;

    /**
     * @param {Object} data - Task properties
     * @param {boolean} isHydrating - If true, disables the future date validation for existing tasks
     */
    constructor({
        id = crypto.randomUUID(),
        title = '',
        description = '',
        dueDate = Date.now(),
        priority = 1,
        complete = false
    } = {}, isHydrating = false) {

        this.#id = id;
        this.#complete = complete;

        // Validation using setters
        this.title = title;
        this.description = description;
        this.priority = priority;

        // Date management
        const parsedDate = new Date(dueDate);

        // 1. Check if the date is technically valid
        if (isNaN(parsedDate.getTime())) {
            throw new Error("The provided date is invalid.");
        }

        // 2. Check if it's in the future (only if not loading from storage)
        if (!isHydrating && parsedDate <= new Date()) {
            throw new Error("The due date must be in the future.");
        }

        this.#dueDate = parsedDate;
    }

    // --- SETTERS WITH VALIDATION ---

    set title(value) {
        if (!value || value.trim().length < 2) {
            throw new Error("Title must contain at least 2 characters (excluding whitespace).");
        }
        this.#title = value.trim();
    }

    set description(value) {
        if (!value || value.trim().length < 2) {
            throw new Error("Description must contain at least 2 characters (excluding whitespace).");
        }
        this.#description = value.trim();
    }

    set priority(value) {
        const p = Number(value);
        if (isNaN(p) || p < 1 || p > 3) {
            throw new Error("Priority must be a number between 1 and 3.");
        }
        this.#priority = p;
    }

    // --- GETTERS ---

    get id() { return this.#id; }
    get title() { return this.#title; }
    get description() { return this.#description; }
    get dueDate() { return this.#dueDate; }
    get priority() { return this.#priority; }
    get complete() { return this.#complete; }

    // --- METHODS ---

    toggleComplete() {
        this.#complete = !this.#complete;
    }

    /**
     * Prepares the object for JSON.stringify()
     */
    toJSON() {
        return {
            id: this.#id,
            title: this.#title,
            description: this.#description,
            dueDate: this.#dueDate.getTime(), // Store as timestamp for better reliability
            priority: this.#priority,
            complete: this.#complete
        };
    }
}