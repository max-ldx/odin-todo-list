import { List } from '../models/list';

class ListController {
    #listRepository;

    constructor(listRepository) {
        this.#listRepository = listRepository;
    }

    addList(listDTO) {
        try {
            const list = new List(listDTO.name);
            this.#listRepository.addList(list);
            // Save to local storage
            return { error: false, message: '' };
        } catch (error) {
            return { error: true, message: error.message };
        }
    }

    getLists() {
        return this.#listRepository.getLists();
    }

    delete(id) {
        this.#listRepository.deleteList(id);
    }
}

export { ListController };