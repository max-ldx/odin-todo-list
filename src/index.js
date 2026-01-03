import './style.css';
import { ListController } from './controllers/list-controller'
import { ListRepository } from './repositories/list-repository';
import { ListView } from './views/list-view';

// Setup Lucide icons
lucide.createIcons();

// TODO: retrieve from local storage

// Setup in-memory storage
const listRepository = new ListRepository();

// Setup list controller
const listController = new ListController(listRepository);

// TODO: setup event listeners to list controller
const listView = new ListView(listController);

