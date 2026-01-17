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

for(const list of lists) {
    const li = document.createElement('li');
    li.textContent = list.name;
    listsContainer.appendChild(li);
}