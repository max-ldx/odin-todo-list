import { createList } from "./list";

const STORAGE_KEY = 'todo_app';

export function createStorage() {
    let lists = [];

    load();

    function save() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(lists.map(l => l.toJSON())));
    }

    function load() {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        lists = data.map(listData => createList(listData));
    }

    return {
        addList(...newLists) {
            lists.push(...newLists);
            save();
        },
        getLists() {
            return [...lists];
        }
    }
}