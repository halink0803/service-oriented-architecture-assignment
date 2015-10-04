'use strict';
const app = require('app');
const BrowserWindow = require('browser-window');
var ipc = require('ipc');

// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being GC'd
let mainWindow;

function createMainWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		resizable: true
	});

	win.loadUrl(`file://${__dirname}/index.html`);
	win.maximize();
	win.openDevTools();	
	win.on('closed', onClosed);

	return win;
}

function onClosed() {
	// deref the window
	// for multiple windows store them in an array
	mainWindow = null;
}

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate-with-no-open-windows', function () {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', function () {
	mainWindow = createMainWindow();

	var book_detail_window = new BrowserWindow({
			width: 400,
			height: 400,
			show: false,
			resizable: true
		});
	book_detail_window.loadUrl(`file://${__dirname}/book_detail.html`);
	book_detail_window.openDevTools();
	ipc.on('show-book-detail', function(){
		book_detail_window.show();
	})
});