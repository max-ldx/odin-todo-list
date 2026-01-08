import { List } from '../models/list';

export function createListController(listRepository) {
    const notify = () => {
        const event = new CustomEvent('lists:updated', {
            detail: { lists: listRepository.getLists() }
        });
        window.dispatchEvent(event);
    };

    return {
        addList(name) {
            try {
                const list = new List(name);
                listRepository.addList(list);
                notify();
            } catch (error) {
                console.log(error);
            }
        },

        getLists() {
            return listRepository.getLists();
        },

        delete(id) {
            listRepository.deleteList(id);
            notify();
        }
    };
}