export class UIManager {
    constructor(store) {
        this.store = store;
        this.activeListId = null;

        // Cache DOM elements
        this.sidebarEl = document.getElementById('sidebar-list');
        this.taskListEl = document.getElementById('task-list');
        this.dialog = document.getElementById('form-dialog');
        this.form = document.getElementById('universal-form');
        this.activeTitle = document.getElementById('active-list-title');

        this.init();
    }

    init() {
        // Observer: Update UI on store change
        this.store.subscribe(() => this.render());

        // Event Listeners for UI static buttons
        document.getElementById('add-list-btn').onclick = () => this.showListForm();
        document.getElementById('edit-list-btn').onclick = () => this.showListForm(this.activeListId);
        document.getElementById('delete-list-btn').onclick = () => {
            if (confirm("Permanently delete this list and all its tasks?")) {
                this.store.removeList(this.activeListId);
                this.activeListId = null;
            }
        };
        document.getElementById('add-task-btn').onclick = () => this.showTaskForm();
        document.getElementById('cancel-btn').onclick = () => this.dialog.close();
    }

    // Utility for date formatting (required for HTML date input)
    #formatDateForInput(date) {
        if (!(date instanceof Date) || isNaN(date)) return '';
        return date.toISOString().split('T')[0];
    }

    render() {
        const lists = this.store.lists;

        // 1. Sidebar Rendering
        this.sidebarEl.innerHTML = lists.map(list => `
            <li class="${list.id === this.activeListId ? 'active' : ''}" data-id="${list.id}">
                ${list.name} (${list.tasks.length})
            </li>
        `).join('');

        this.sidebarEl.querySelectorAll('li').forEach(li => {
            li.onclick = () => {
                this.activeListId = li.dataset.id;
                this.render();
            };
        });

        // 2. Main Content Rendering
        const activeList = lists.find(l => l.id === this.activeListId);
        if (activeList) {
            this.activeTitle.innerText = activeList.name;
            document.getElementById('list-actions').classList.remove('hidden');
            document.getElementById('add-task-btn').classList.remove('hidden');

            this.taskListEl.innerHTML = activeList.tasks.map(task => `
                <li class="task-item ${task.complete ? 'done' : ''}">
                    <input type="checkbox" ${task.complete ? 'checked' : ''} 
                        onchange="app.toggleTask('${task.id}')">
                    <div class="task-info" onclick="app.showTaskForm('${task.id}')">
                        <div class="task-title">${task.title}</div>
                        <div class="task-meta">
                            <span>📅 ${task.dueDate.toLocaleDateString()}</span>
                            <span>⚡ Priority ${task.priority}</span>
                        </div>
                    </div>
                    <button class="btn-danger" onclick="app.deleteTask('${task.id}')">Delete</button>
                </li>
            `).join('');
        } else {
            this.activeTitle.innerText = "Select or create a list";
            document.getElementById('list-actions').classList.add('hidden');
            document.getElementById('add-task-btn').classList.add('hidden');
            this.taskListEl.innerHTML = '';
        }
    }

    showListForm(listId = null) {
        const list = this.store.lists.find(l => l.id === listId);
        document.getElementById('dialog-title').innerText = listId ? "Rename List" : "New List";
        document.getElementById('form-inputs').innerHTML = `
            <label>List Name</label>
            <input type="text" id="list-name-input" value="${list?.name || ''}" minlength="2" required>
        `;

        this.form.onsubmit = (e) => {
            e.preventDefault();
            const name = document.getElementById('list-name-input').value;
            listId ? this.store.renameList(listId, name) : this.store.addList(name);
            this.dialog.close();
        };
        this.dialog.showModal();
    }

    showTaskForm(taskId = null) {
        const list = this.store.lists.find(l => l.id === this.activeListId);
        const task = list?.tasks.find(t => t.id === taskId);

        document.getElementById('dialog-title').innerText = taskId ? "Edit Task" : "New Task";
        document.getElementById('form-inputs').innerHTML = `
            <label>Title</label>
            <input type="text" id="t-title" value="${task?.title || ''}" required minlength="2">
            
            <label>Due Date</label>
            <input type="date" id="t-date" value="${this.#formatDateForInput(task?.dueDate)}" required>
            
            <label>Priority</label>
            <select id="t-priority">
                <option value="1" ${task?.priority === 1 ? 'selected' : ''}>Low</option>
                <option value="2" ${task?.priority === 2 ? 'selected' : ''}>Medium</option>
                <option value="3" ${task?.priority === 3 ? 'selected' : ''}>High</option>
            </select>

            <label>Description</label>
            <textarea id="t-desc" rows="3">${task?.description || ''}</textarea>
        `;

        this.form.onsubmit = (e) => {
            e.preventDefault();
            const updates = {
                title: document.getElementById('t-title').value,
                description: document.getElementById('t-desc').value,
                priority: parseInt(document.getElementById('t-priority').value),
                dueDate: document.getElementById('t-date').value
            };

            try {
                taskId ? this.store.updateTask(this.activeListId, taskId, updates)
                    : this.store.addTask(this.activeListId, updates);
                this.dialog.close();
            } catch (err) { alert(err.message); }
        };
        this.dialog.showModal();
    }

    // Bridge methods for HTML onclick events
    toggleTask(taskId) {
        const list = this.store.lists.find(l => l.id === this.activeListId);
        const task = list.tasks.find(t => t.id === taskId);
        this.store.updateTask(this.activeListId, taskId, { complete: !task.complete });
    }

    deleteTask(taskId) {
        if (confirm("Delete this task?")) this.store.removeTask(this.activeListId, taskId);
    }
}