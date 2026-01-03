class ListRepository {
    #lists = [];

    addList(list) {
        this.#lists.push(list);
    }

    getLists() {
        return [...this.#lists];
    }

    updateList(list) {
        // TODO
    }

    deleteList(id) {
        this.#lists = this.#lists.filter(l => l.id !== id);
    }
}

export { ListRepository };