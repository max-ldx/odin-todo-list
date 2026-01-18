import { createList } from "./list";
import { createSeeder } from "./seeder";
import { createStorage } from "./storage";

const storage = createStorage();
if (storage.getLists().length === 0) {
    const seeder = createSeeder();
    storage.addList(seeder.seed());
    console.log(storage)
}
const lists = storage.getLists();

const listsContainer = document.querySelector('#lists');

for (const list of lists) {
    const li = document.createElement('li');
    li.textContent = list.name;
    listsContainer.appendChild(li);
}

const addListBtn = document.querySelector('#addListBtn');
const addListDialog = document.querySelector('#addListDialog');
const listForm = document.querySelector('#listForm');
const listsUl = document.querySelector('#lists');

addListBtn.addEventListener('click', () => {
    addListDialog.showModal();
});

addListDialog.addEventListener('close', () => {
    if (addListDialog.returnValue === 'confirm') {
        const formData = new FormData(listForm);
        const listName = formData.get('listName');

        const list = createList({ name: listName });
        storage.addList(list);

        const li = document.createElement('li');
        li.textContent = listName;
        li.addEventListener('click', () => {
            console.log(list);
            
        });
        listsUl.appendChild(li);
    }
    listForm.reset();
});