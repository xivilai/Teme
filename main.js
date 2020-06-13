// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, Tray} = require('electron')
const path = require('path')

app.commandLine.appendSwitch('remote-debugging-port', '8315');
app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1');

function main() {
  createWindow();
  let tray = null
  tray = new Tray(path.join(__dirname, '/resources/win32/app-icon.png'));
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Options', type: 'normal', click: ()=> {  } },
    { label: 'Close', type: 'normal', click: ()=> { app.quit(); } },
  ])
  tray.setToolTip('Teme');
  tray.setContextMenu(contextMenu);
}

function createWindow() {
  const window = new BrowserWindow({
    width: 175,
    height: 80,
    skipTaskbar: true,
    transparent: true,
    frame: false,
    icon: path.join(__dirname, '/resources/win32/app-icon.png'),
    webPreferences: {
      nodeIntegration: true
    }
  });

  window.loadFile('index.html');

  window.setAlwaysOnTop(true, 'normal');
}

function createOptionsWindow() {
  const optionsWindow = new BrowserWindow({
    width: 175,
    height: 80,
    skipTaskbar: true,
    transparent: true,
    frame: false,
    icon: path.join(__dirname, '/resources/win32/app-icon.png'),
    webPreferences: {
      nodeIntegration: true
    }
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(main);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
