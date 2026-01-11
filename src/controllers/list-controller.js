import { List } from '../models/list';

export function createListController(listRepository) {
    window.addEventListener('list:deleted', e => {
        const id = e.detail.id;
        deleteList(id);
    });


    const notify = () => {
        const event = new CustomEvent('lists:updated', {
            detail: { lists: listRepository.getLists() }
        });
        window.dispatchEvent(event);
    };

    function deleteList(id) {
        listRepository.deleteList(id);
        notify()
    }

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


    };
}