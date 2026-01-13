export function createTask({ name = '', description = '' } = {}) {
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
        get completed() {
            return completed;
        },
        toggleCompleted() {
            completed = !completed;
        }
    }
}