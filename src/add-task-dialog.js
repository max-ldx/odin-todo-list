export function createAddTaskDialog() {
    window.addEventListener('ui:add-task-modal', e => {
        const listId = e.detail;
        const addTaskDialog = document.querySelector('#addTaskDialog');
        const taskForm = document.querySelector('#addTaskForm');
        addTaskDialog.showModal();

        addTaskDialog.addEventListener('close', e => {
            if (addTaskDialog.returnValue === 'confirm') {
                const formData = new FormData(taskForm);
                const taskName = formData.get('taskName');
                const taskDescription = formData.get('taskDescription');
                const taskDueDate = formData.get('taskDueDate');
                const taskPriority = formData.get('taskPriority')
                const event = new CustomEvent('ui:add-task', {
                    detail: {
                        listId,
                        taskName,
                        taskDescription,
                        taskDueDate,
                        taskPriority
                    }
                });
                window.dispatchEvent(event);
            }
            taskForm.reset();
        });
    });
}