import { createElement, Pencil, Trash } from "lucide";
import { createDialog } from "./dialogComponent";

export function createList({ id = '', name = '' }) {
    const list = document.createElement('div');
    const listName = document.createElement('span');
    listName.textContent = name;
    const edit = createElement(Pencil);
    const del = createElement(Trash);

    list.appendChild(listName);
    list.appendChild(edit);
    list.appendChild(del);

    list.classList.add('list');

    edit.addEventListener('click', async () => {
        const data = await showEditListModal({ name: name });
        if (data !== null) {
            notifyListUpdated({ id: id, name: data.listName });
        }
    });

    del.addEventListener('click', async () => {
        const data = await showDeleteListModal();
        if (data !== null) {
            notifyListDeleted(id);
        }
    });

    return list;
}

async function showEditListModal({ name = '' }) {
    return await createDialog({
        title: 'Update list',
        content: `<input type="text" name="listName" placeholder="List name" value="${name}" required`
    });
}

function notifyListUpdated({ id = '', name = '' }) {
    const event = new CustomEvent('list:updated', {
        detail: { id: id, name: name }
    });
    window.dispatchEvent(event);
}

async function showDeleteListModal() {
    return await createDialog({
        title: 'Delete this list?',
        content: '<span>This action cannot be undone!</span>'
    });
}

function notifyListDeleted(id) {
    const event = new CustomEvent('list:deleted', {
        detail: { id: id }
    });
    window.dispatchEvent(event);
}