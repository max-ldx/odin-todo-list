const addListBtn = document.querySelector('#add-list-btn');
const addListDialog = document.querySelector('#add-list-dialog');
const addListForm = document.querySelector('#add-list-form');

addListBtn.addEventListener('click', () => addListDialog.showModal());

addListDialog.addEventListener('close', () => {
    if (addListDialog.returnValue === 'add') {
        const data = new FormData(addListForm);
        const values = Object.fromEntries(data.entries());
        console.log(values);
        // TODO: dispatch custom event with values
    }
});