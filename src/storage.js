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
        deleteList(id) {
            const length = lists.length;
            lists = lists.filter(l => l.id !== id);
            save();
            if (length !== lists.length) {
                return id;
            } else {
                return null;
            }
        },
        getLists() {
            return [...lists];
        },
        getList(id) {
            return lists.find(l => l.id === id);
        },
        addTask(listId, task) {
            const list = this.getList(listId);
            list.addTask(task);
            save();
        }
    }
}