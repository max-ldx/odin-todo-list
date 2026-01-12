function createList({ name = '' }) {
    return {
        id: crypto.randomUUID(),
        name: name,
        tasks: []
    }
}