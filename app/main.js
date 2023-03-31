const { app, BrowserWindow } = require('electron');
const path = require('path');

//app.disableHardwareAcceleration()


let mainWindow = null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration:true,
            contextIsolation: false,           
        },
        icon: path.resolve(__dirname, '..', 'hache logo-12.ico')
    })
    mainWindow.loadFile(__dirname + '/index.html')
});