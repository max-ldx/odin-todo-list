import { createList } from "../models/list";
import { EventBus } from "../event-bus";

export function createListController() {
    EventBus.addEventListener('ui:add-list', e => {
        const values = e.detail;
        const list = createList({ name: values['list-name'] });
        // Add it to list repository
        // Dispatch event list added
        // Listen in UI and localstorage
    });
}