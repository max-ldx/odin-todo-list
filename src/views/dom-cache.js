export function createDOMCache() {
    const map = new Map();

    map.set('lists', document.querySelector('.lists'));
    
    return map;
}