export function createAddListDialog() {
    const addListBtn = document.querySelector('#addListBtn');
    const addListDialog = document.querySelector('#addListDialog');
    const listForm = document.querySelector('#addListForm');

    addListBtn.addEventListener('click', () => addListDialog.showModal());

    addListDialog.addEventListener('close', () => {
        if (addListDialog.returnValue === 'confirm') {
            const formData = new FormData(listForm);
            const listName = formData.get('listName');
            const event = new CustomEvent('ui:add-list', {
                detail: { listName: listName }
            });
            window.dispatchEvent(event);
        }
        listForm.reset();
    });
}