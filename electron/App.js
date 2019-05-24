const {
	app,
	session,
	shell,
	BrowserWindow
} = require('electron')

let mainWindow

function createWindow() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			frame: false,
			nodeIntegration: true
		}
	})

	// Load pager app.
	mainWindow.loadURL(`file://${__dirname}/../build/index.html`)
	mainWindow.setMenuBarVisibility(false)

	// Handle proxy request
	const proxy  = 'file:///proxy?url=';
	const filter = { urls: [`${proxy}*`] }
	// Fetching rss feed without proxy.
	session.defaultSession.webRequest.onBeforeRequest(filter, (details, callback) => {
		let redirectURL = details.url.replace(proxy, '');
		callback({ redirectURL })
	})

	// Open link in default browser
	mainWindow.webContents.on('new-window', function (event, url) {
		event.preventDefault();
		shell.openExternal(url);
	})

	mainWindow.on('closed', function () {
		mainWindow = null
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
	if (mainWindow === null) createWindow()
})