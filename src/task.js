export function createTask({
    id = crypto.randomUUID(),
    name = '',
    description = '',
    dueDate = Date.now(),
    priority = 1,
    complete = false
} = {}) {
    let isComplete = complete;

    return {
        get id() { return id; },
        get name() { return name; },
        get description() { return description },
        get dueDate() { return dueDate },
        get priority() { return priority },
        get complete() { return isComplete; },
        toggleComplete() { isComplete = !isComplete; },
        toJSON() {
            return { id, name, description, dueDate, priority, complete: isComplete };
        }
    };
}