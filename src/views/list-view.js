import { ListDTO } from "../dtos/list-dto";

class ListView {
    #listController;

    constructor(listController) {
        this.#listController = listController;
        this.#initializeOnNewListEventHandler();
    }

    #initializeOnNewListEventHandler() {
        const newListButtonElement = document.querySelector('.new-list-button');
        const bodyElement = document.querySelector('body');

        newListButtonElement.addEventListener('click', e => {
            const dialogElement = document.createElement('dialog');

            const dialogTitleElement = document.createElement('h2');
            dialogTitleElement.textContent = 'New list';
            dialogElement.appendChild(dialogTitleElement);

            // const dialogCloseElement = document.createElement('i');
            // dialogCloseElement.setAttribute('data-lucide', 'square-x');
            // dialogCloseElement.addEventListener('click', e => {
            //     dialogElement.close();
            // })
            // dialogElement.appendChild(dialogCloseElement);

            const dialogFormElement = document.createElement('form');
            dialogElement.appendChild(dialogFormElement);

            const dialogFormGroupElement = document.createElement('div');
            dialogFormGroupElement.classList.add('form-group');
            dialogFormElement.appendChild(dialogFormGroupElement);

            const nameLabelElement = document.createElement('label');
            nameLabelElement.textContent = 'Name';
            nameLabelElement.setAttribute('for', 'name');
            dialogFormGroupElement.appendChild(nameLabelElement);

            const nameInputElement = document.createElement('input');
            nameInputElement.setAttribute('id', 'name');
            nameInputElement.setAttribute('name', 'name');
            nameInputElement.setAttribute('type', 'text');
            nameInputElement.setAttribute('minlength', 2);
            nameInputElement.setAttribute('required', '');
            dialogFormGroupElement.appendChild(nameInputElement);

            const addButtonElement = document.createElement('button');
            addButtonElement.textContent = 'Submit';
            dialogFormElement.appendChild(addButtonElement);

            bodyElement.appendChild(dialogElement);

            dialogFormElement.addEventListener('submit', e => {
                e.preventDefault();

                const nameInputElement = document.querySelector('#name');
                const result = this.#listController.addList(new ListDTO(nameInputElement.value));

                if (result.error) {
                    console.log(result.message);
                } else {
                    console.log(this.#listController.getLists());
                    dialogElement.close();
                }
            });

            dialogElement.addEventListener('close', e => {
                dialogElement.remove();
            });

            dialogElement.showModal();
        });
    }
}

export { ListView };