import { createTask } from "./task";

export function createList({
    id = crypto.randomUUID(),
    name = '',
    tasks = []
} = {}) {
    let taskInstances = tasks.map(t => t.toggleComplete ? t : createTask(t));

    return {
        get id() { return id; },
        get name() { return name; },
        get tasks() { return [...taskInstances]; },
        addTask(...newTasks) { taskInstances.push(...newTasks); },
        toJSON() {
            return { id, name, tasks: taskInstances.map(t => t.toJSON()) };
        }
    };
}