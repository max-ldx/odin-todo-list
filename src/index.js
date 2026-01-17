import { createSeeder } from "./seeder";
import { createStorage } from "./storage";

const storage = createStorage();
const lists = storage.getLists();
if (lists.length === 0) {
    const seeder = createSeeder();
    storage.addList(seeder.seed());
}