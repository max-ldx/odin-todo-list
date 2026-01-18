export function createTaskView() {
    const main = document.querySelector('.main');

    window.addEventListener('ui:list-clicked', e => {
        const event = new CustomEvent('ui:get-list', {
            detail: e.detail
        });
        window.dispatchEvent(event);
    });

    // Listen for list from controller and display it
    // First, clear everyting in main
    // Then display everything
    window.addEventListener('ctrl:list-get', e => {
        const list = e.detail;
        main.textContent = null;
        const listNameElement = document.createElement('h1');

        listNameElement.textContent = list.name;
        main.appendChild(listNameElement);

        // On click, send custom event to open add task modal with list id
        const addTaskBtnElement = document.createElement('button');
        addTaskBtnElement.textContent = 'Add Task';
        main.appendChild(addTaskBtnElement);



        const tasksContainer = document.createElement('div');
        tasksContainer.textContent = 'This is where tasks will go';
        main.appendChild(tasksContainer);
    })
}