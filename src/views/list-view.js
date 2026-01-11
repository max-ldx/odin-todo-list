import { createDialog } from "../components/dialogComponent";

async function setupAddListEventHandler(listController) {
    const addListButtonElement = document.querySelector('.new-list-button');
    addListButtonElement.addEventListener('click', async () => {
        const data = await showAddListModal();
        if (data !== null) {
            listController.addList(data.listName);
        }
    });
}

async function showAddListModal() {
    return await createDialog({
        title: 'Add add list',
        content: `<input type="text" name="listName" placeholder="List name" required>`
    });
}

export { setupAddListEventHandler }; 