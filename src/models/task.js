export function createTask({ name = '', description = '', dueDate = Date.now(), priority = 1 } = {}) {
    const id = crypto.randomUUID();
    let completed = false;

    return {
        get id() {
            return id;
        },
        get name() {
            return name;
        },
        set name(value) {
            name = value;
        },
        get description() {
            return description;
        },
        set description(value) {
            description = value;
        },
        get dueDate() {
            return dueDate;
        },
        set dueDate(value) {
            dueDate = value;
        },
        get priority() {
            return priority;
        },
        set priority(value) {
            priority = value;
        },
        get completed() {
            return completed;
        },
        toggleCompleted() {
            completed = !completed;
        }
    }
}