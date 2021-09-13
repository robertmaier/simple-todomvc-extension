import * as browser from 'webextension-polyfill';

browser.runtime.onMessage.addListener((message) => {
	console.log('background - received message:', message);
})
