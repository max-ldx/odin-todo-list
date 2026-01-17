import { createList } from "./list"
import { createTask } from "./task";
import { addDays } from "date-fns";

export function createSeeder() {
    return {
        seed() {
            const list = createList({ name: 'Default' });
            const task0 = createTask({ name: 'Brush Teeth', description: 'Morning and evening', dueDate: addDays(Date.now(), 1), priority: 1 });
            const task1 = createTask({ name: 'Make Bed', description: 'Tidy the bed', dueDate: addDays(Date.now(), 7), priority: 2 });
            list.addTask(task0, task1);
            return list;
        }
    };
}