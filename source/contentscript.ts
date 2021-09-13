import * as browser from 'webextension-polyfill';

console.log('content script initialized');

browser.runtime.onMessage.addListener(async (message) => {
	console.log('message received:', message);

	switch (message.type) {
		case 'SET_VALUE':
			const input = document.querySelector<HTMLInputElement>('.new-todo');
			input.value = message.value;
			break;
		case 'MARK_ALL':
			const checkboxes = document.querySelectorAll<HTMLInputElement>('.toggle');
			checkboxes.forEach((checkbox) => checkbox.checked = true);
			break;
		case 'GET_TODOS':
			const todoItems: HTMLLabelElement[] = Array.prototype.slice.call(document.querySelectorAll<HTMLLabelElement>('.todo-list li'));
			return todoItems.map(todoItem => ({
				label: todoItem.querySelector('label').innerHTML,
				done: todoItem.querySelector<HTMLInputElement>('.toggle').checked
			}))
	}
})
