import { createAddListDialog } from "./add-list-dialog";
import { createList } from "./list";
import { createListController } from "./list-controller";
import { createListView } from "./list-view";
import { createSeeder } from "./seeder";
import { createStorage } from "./storage";
import { createTaskView } from "./task-view";

const storage = createStorage();
// if (storage.getLists().length === 0) {
//     const seeder = createSeeder();
//     storage.addList(seeder.seed());
//     console.log(storage)
// }
// const lists = storage.getLists();

// const listsContainer = document.querySelector('#lists');

// for (const list of lists) {
//     const li = document.createElement('li');
//     li.textContent = list.name;
//     listsContainer.appendChild(li);
// }

createAddListDialog();
createListController(storage);
createListView();
createTaskView();