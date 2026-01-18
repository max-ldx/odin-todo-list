import { createElement, Trash } from "lucide";

export function createListView() {
    const listsContainer = document.querySelector('#lists');

    window.addEventListener('ctrl:list-added', e => {
        const listElement = document.createElement('li');
        const listNameElement = document.createElement('span');
        listNameElement.textContent = e.detail.name;
        const deleteIcon = createElement(Trash);

        listElement.appendChild(listNameElement);
        listElement.appendChild(deleteIcon);
        deleteIcon.addEventListener('click', e => {
            e.stopPropagation();
            const event = new CustomEvent('ui:delete-list', {
                detail: e.detail.id
            });
            window.dispatchEvent(event);
        });

        listElement.dataset.id = e.detail.id;
        listsContainer.appendChild(listElement);
    });

    window.addEventListener('ctrl:list-deleted', e => {
        const toDelete = document.querySelector(`[data-id="${e.detail}"]`);

        if (toDelete) {
            toDelete.remove();
        }
    });
}