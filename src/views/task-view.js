
function setupListClickedEventListener() {
    window.addEventListener('list:clicked', e => {
        // Render add task button and the list's tasks
        console.log(e.detail.id);
    });
}

export { setupListClickedEventListener };
