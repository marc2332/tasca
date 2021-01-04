import { app, BrowserWindow } from 'electron'
import path from 'path'

app.whenReady().then(() => {
	const win = new BrowserWindow({
		width: 500,
		height: 500,
		webPreferences:{
			contextIsolation: true
		}
	})
	win.loadURL(`file://${__dirname}/../index.html`)
	
	setInterval(() => {
		console.log(' Hello World from the main process')
	},1000)
})
asjkdask;;/(/"·!=$)("·")")___ok hooclasdkjsa

3243ÇÇÇ]*