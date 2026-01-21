import { createList } from "./list";
import { createTask } from "./task";

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

    window.addEventListener('ui:get-list', e => {
        const list = storage.getList(e.detail);
        if (list) {
            const event = new CustomEvent('ctrl:list-get', {
                detail: list
            });
            window.dispatchEvent(event);
        }
    });

    window.addEventListener('ui:add-task', e => {
        const detail = e.detail;
        const task = createTask({
            name: detail.taskName,
            description: detail.taskDescription,
            dueDate: new Date(detail.taskDueDate),
            priority: detail.taskPriority
        });
        storage.addTask(detail.listId, task);
    });

}