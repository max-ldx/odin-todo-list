export function createDialog({ title = '', content = '' }) {
    return new Promise((resolve) => {
        const dialog = document.createElement('dialog');

        dialog.innerHTML = `
            <form method="dialog">
                <h2>${title}</h2>
                <div>${content}</div>
                <div>
                    <button type="button" value="cancel" class="button-cancel">Cancel</button>
                    <button type="submit" value="confirm">Confirm</button>
                </div>
            </form>
        `;

        const form = dialog.querySelector('form');
        const cancelBtn = dialog.querySelector('.button-cancel');

        cancelBtn.addEventListener('click', dialog.close);

        dialog.addEventListener('close', () => {
            if (dialog.returnValue === 'confirm') {
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                resolve(data);
            } else {
                resolve(null);
            }
            dialog.remove();
        });

        document.body.appendChild(dialog);
        dialog.showModal();
    });
}