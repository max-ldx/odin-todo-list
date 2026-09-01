import Project from './project.js';

const STORAGE_KEY = 'odin-todo-list-data';

export default class Storage {
    constructor() {
        throw new Error('Storage is a utility class and cannot be instantiated.');
    }

    static save(projects) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
        } catch (error) {
            console.error('Failed to save data:', error);
        }
    }

    static load() {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return [];

        try {
            const parsed = JSON.parse(data);
            return parsed.map(projectData => Project.fromJSON(projectData));
        } catch (e) {
            console.error('Failed to deserialize data:', e);
            return [];
        }
    }
}