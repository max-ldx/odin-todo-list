export function createList({ name = '' } = {}) {
    const id = crypto.randomUUID();
    let tasks = [];

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
        get tasks() {
            return [...tasks];
        },
        upsertTask(task) {
            const index = tasks.findIndex(t => t.id === task.id);
            index !== -1 ? tasks[index] = task : tasks.push(task);
        },
        removeTask(id) {
            tasks = tasks.filter(t => t.id !== id);
        }
    }
}