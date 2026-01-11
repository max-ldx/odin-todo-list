class ListRepository {
    #lists = [];

    addList(list) {
        this.#lists.push(list);
    }

    getLists() {
        return [...this.#lists];
    }

    updateList({ id = '', name = '' }) {
        for (const list of this.#lists) {
            if (list.id === id) {
                list.name = name;
            }
        }
    }

    deleteList(id) {
        this.#lists = this.#lists.filter(l => l.id !== id);
    }
}

export { ListRepository };