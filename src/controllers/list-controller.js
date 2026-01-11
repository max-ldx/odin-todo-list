import { List } from '../models/list';

export function createListController(listRepository) {
    window.addEventListener('list:updated', e => {
        const newList = e.detail;
        updateList({ id: newList.id, name: newList.name });
        notifyListsUpdated();
    })

    window.addEventListener('list:deleted', e => {
        const id = e.detail.id;
        deleteList(id);
        notifyListsUpdated();
    });

    const notifyListsUpdated = () => {
        const event = new CustomEvent('lists:updated', {
            detail: { lists: listRepository.getLists() }
        });
        window.dispatchEvent(event);
    };

    function updateList({ id = '', name = '' }) {
        listRepository.updateList({ id: id, name: name });
    }

    function deleteList(id) {
        listRepository.deleteList(id);
    }

    return {
        addList(name) {
            try {
                const list = new List(name);
                listRepository.addList(list);
                notifyListsUpdated();
            } catch (error) {
                console.log(error);
            }
        },

        getLists() {
            return listRepository.getLists();
        },


    };
}