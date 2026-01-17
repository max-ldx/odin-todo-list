function createTask({
    id = crypto.randomUUID(),
    name = '',
    description = '',
    dueDate = Date.now(),
    priority = 1,
    complete = false
} = {}) {
    let isComplete = complete;

    return {
        get id() { return id; },
        get name() { return name; },
        get description() { return description },
        get dueDate() { return dueDate },
        get priority() { return priority },
        get complete() { return isComplete; },
        toggleComplete() { isComplete = !isComplete; },
        toJSON() {
            return { id, name, description, dueDate, priority, complete: isComplete };
        }
    };
}

function createList({
    id = crypto.randomUUID(),
    name = '',
    tasks = []
} = {}) {
    let taskInstances = tasks.map(t => t.toggleComplete ? t : createTask(t));

    return {
        get id() { return id; },
        get name() { return name; },
        get tasks() { return [...taskInstances]; },
        addTask(task) { taskInstances.push(task); },
        toJSON() {
            return { id, name, tasks: taskInstances.map(t => t.toJSON()) };
        }
    };
}

const STORAGE_KEY = 'todo_app';

const task0 = createTask({ name: 'Test', description: 'Desc', dueDate: new Date('2026/03/30'), priority: 1 })
const task1 = createTask({ name: 'Test1', description: 'Desc', dueDate: new Date('2026/03/30'), priority: 1 })
task1.toggleComplete()
const list0 = createList({ name: 'Test' });
list0.addTask(task0);

const list1 = createList({ name: 'Test1' });
list1.addTask(task1);

const lists = [list0, list1];

const jlists = lists.map(l => l.toJSON());

// Sauvegarde
localStorage.setItem(STORAGE_KEY, JSON.stringify(lists.map(l => l.toJSON())));

// Restauration simplifiée
const rawData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
const rlists = rawData.map(listData => createList(listData));

console.log(rlists)