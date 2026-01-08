import './style.css';
import { createListController } from './controllers/list-controller'
import { ListRepository } from './repositories/list-repository';
import { setupAddListEventHandler } from './views/list-view';
import { createStaticIcons } from './lib/icons';

createStaticIcons();
// TODO: retrieve from local storage

// Setup in-memory storage
const listRepository = new ListRepository();

// Setup list controller
const listController = createListController(listRepository);

await setupAddListEventHandler(listController);

window.addEventListener('lists:updated', (e) => {
    const lists = e.detail.lists;
    console.log(lists);
});
