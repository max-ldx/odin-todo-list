import { createElement, Pencil, Trash } from "lucide";

export function createList({ name = '' }) {
    const list = document.createElement('div');
    const listName = document.createElement('span');
    listName.textContent = name;
    const edit = createElement(Pencil);
    const del = createElement(Trash);

    list.appendChild(listName);
    list.appendChild(edit);
    list.appendChild(del);

    list.classList.add('list');
    
    return list;
}