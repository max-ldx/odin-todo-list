import { createElement, Trash } from "lucide";

export function createListView() {
    const listsContainer = document.querySelector('#lists');

    window.addEventListener('ctrl:list-added', e => {
        const listElement = document.createElement('li');
        const listNameElement = document.createElement('div');
        listNameElement.textContent = e.detail.name;
        const deleteIcon = createElement(Trash);

        listElement.appendChild(listNameElement);
        listElement.appendChild(deleteIcon);

        listElement.dataset.id = e.detail.id;
        listsContainer.appendChild(listElement);
    });
}