import Todo from './todo.js';

const PRIVATE_KEY = Symbol('ProjectPrivateKey');

export default class Project {
    #id;
    #name;
    #todos;

    constructor(key, {
        id = crypto.randomUUID(),
        name,
        todos = []
    } = {}) {
        if (key !== PRIVATE_KEY) {
            throw new Error('Private constructor: Use Project.create() or Project.fromJSON().');
        }

        this.#id = id;
        this.#name = name.trim();
        this.#todos = Object.freeze([...todos]);

        Object.freeze(this);
    }

    static #validateName(name) {
        if (typeof name !== 'string' || name.trim() === '') {
            throw new TypeError('Project name must be a non-empty string.');
        }
    }

    static #validateTodos(todos) {
        if (!Array.isArray(todos)) {
            throw new TypeError('Todos must be an array.');
        }
        for (const todo of todos) {
            if (!(todo instanceof Todo)) {
                throw new TypeError('All items in the todos array must be instances of Todo.');
            }
        }
    }

    static create(data) {
        Project.#validateName(data?.name);

        const todos = data?.todos ?? [];
        Project.#validateTodos(todos);

        return new Project(PRIVATE_KEY, {
            ...data,
            todos
        });
    }

    static fromJSON(json) {
        const data = typeof json === 'string' ? JSON.parse(json) : json;

        Project.#validateName(data?.name);

        const rawTodos = data?.todos ?? [];
        if (!Array.isArray(rawTodos)) {
            throw new TypeError('Todos must be an array.');
        }

        const todos = rawTodos.map(todoData => Todo.fromJSON(todoData));

        return new Project(PRIVATE_KEY, {
            ...data,
            todos
        });
    }

    with(changes = {}) {
        const newName = changes.name !== undefined ? changes.name : this.#name;
        Project.#validateName(newName);

        let newTodos = this.#todos;
        if (changes.todos !== undefined) {
            Project.#validateTodos(changes.todos);
            newTodos = changes.todos;
        }

        return new Project(PRIVATE_KEY, {
            id: this.#id,
            name: newName,
            todos: newTodos
        });
    }

    addTodo(...todosToAdd) {
        Project.#validateTodos(todosToAdd);
        return this.with({
            todos: [...this.#todos, ...todosToAdd]
        });
    }

    removeTodo(todoId) {
        const updatedTodos = this.#todos.filter(todo => todo.id !== todoId);
        return this.with({ todos: updatedTodos });
    }

    updateTodo(updatedTodo) {
        if (!(updatedTodo instanceof Todo)) {
            throw new TypeError('Argument must be an instance of Todo.');
        }

        const index = this.#todos.findIndex(t => t.id === updatedTodo.id);
        if (index === -1) {
            throw new Error(`Todo with id ${updatedTodo.id} not found in this project.`);
        }

        const newTodos = [...this.#todos];
        newTodos[index] = updatedTodo;

        return this.with({ todos: newTodos });
    }

    toggleTodoComplete(todoId) {
        const todo = this.#todos.find(t => t.id === todoId);
        if (!todo) {
            throw new Error(`Todo with id ${todoId} not found in this project.`);
        }
        return this.updateTodo(todo.toggleComplete());
    }

    toJSON() {
        return {
            id: this.#id,
            name: this.#name,
            todos: this.#todos.map(todo => todo.toJSON())
        };
    }

    get id() { return this.#id; }
    get name() { return this.#name; }
    get todos() { return [...this.#todos]; }
}