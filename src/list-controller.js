import { createList } from "./list";

export function createListController(storage) {
    window.addEventListener('ui:add-list', e => {
        const list = createList({ name: e.detail.listName });
        storage.addList(list);
        const event = new CustomEvent('ctrl:list-added', {
            detail: list
        });
        window.dispatchEvent(event);
    });

    window.addEventListener('ui:delete-list', e => {
        const id = storage.deleteList(e.detail);
        if (id !== null) {
            const event = new CustomEvent('ctrl:list-deleted', {
                detail: id
            });
            window.dispatchEvent(event);
        }
    });
}