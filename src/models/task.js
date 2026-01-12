function createTask({ name = '' }) {
    return {
        id: crypto.randomUUID(),
        name: name,
        completed: false
    }
}