import './style.css';
import { createListController } from './controllers/list-controller'
import { ListRepository } from './repositories/list-repository';
import { setupAddListEventHandler } from './views/list-view';
import { createStaticIcons } from './lib/icons';
import { createList } from './components/listComponent';
import { createDOMCache } from './views/dom-cache';

createStaticIcons();
const DOMCache = createDOMCache();
// TODO: retrieve from local storage

// Setup in-memory storage
const listRepository = new ListRepository();

// Setup list controller
const listController = createListController(listRepository);

await setupAddListEventHandler(listController);

window.addEventListener('lists:updated', async e => {
    const listsElement = DOMCache.get('lists');
    listsElement.textContent = null;

    const lists = e.detail.lists;

    for (const list of lists) {
        listsElement.appendChild(await createList({ id: list.id, name: list.name }));
    }
    // save to local storage
});
