import './style.css';
import { Step } from './domain/step';
import { Task } from './domain/task';
import { Priority } from './domain/priority';
import { List } from './domain/list';

const stepOne = new Step({ description: 'Test description' });
const taskOne = new Task({ title: 'Test', description: 'test', dueDate: new Date(2026, 5, 1,), priority: Priority.HIGH })
const listOne = new List();
listOne.addTask(taskOne);
taskOne.addStep(stepOne);

console.log(stepOne)
console.log(taskOne);
console.log(listOne);

taskOne.removeStep(stepOne.id);
listOne.removeTask(taskOne.id);

console.log(taskOne);
console.log(listOne);
