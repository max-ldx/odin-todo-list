import { TaskList } from './taskList.js';

const STORAGE_KEY = 'app_task_data';

export const StorageManager = {
    /**
     * Reads from LocalStorage and hydratates the data
     */
    load() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            if (!data) return [];
            const rawArray = JSON.parse(data);
            return rawArray.map(listData => new TaskList(listData, true));
        } catch (error) {
            console.error("Persistence load error:", error);
            return [];
        }
    },

    /**
     * Returns a function that saves data to LocalStorage
     */
    save(lists) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
        } catch (error) {
            console.error("Persistence save error:", error);
        }
    }
};