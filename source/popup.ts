// Don't forget to import this wherever you use it
import * as browser from 'webextension-polyfill';
import { Tabs } from 'webextension-polyfill';
import Tab = Tabs.Tab;

async function getActiveTab(): Promise<Tab> {
	const tabs = await browser.tabs.query({ active: true, currentWindow: true });
	return tabs[0];
}

async function sendMessage(tabId: number, message: any): Promise<any> {
	return browser.tabs.sendMessage(tabId, message);
}

window.addEventListener('load', () => {
	console.log('popup loaded');
	const sendButton = document.querySelector<HTMLButtonElement>('#sendButton');
	sendButton.addEventListener('click', async (event) => {
		event.preventDefault();
		const textInput = document.querySelector<HTMLInputElement>('#textInput');

		const activeTab = await getActiveTab();
		await sendMessage(activeTab.id, { type: 'SET_VALUE', value: textInput.value });

		textInput.value = '';
	})

	const markButton = document.querySelector<HTMLButtonElement>('#markButton');
	markButton.addEventListener('click', async (event) => {
		event.preventDefault();

		const activeTab = await getActiveTab();
		await sendMessage(activeTab.id, {type: 'MARK_ALL'});
	})

	const getTodosButton = document.querySelector<HTMLButtonElement>('#getTodosButton');
	getTodosButton.addEventListener('click', async (event) => {
		event.preventDefault();

		const activeTab = await getActiveTab();
		const todos: { label: string; done: boolean} = await sendMessage(activeTab.id, {type: 'GET_TODOS'});
		alert(JSON.stringify(todos, null, 2));
	})
});
