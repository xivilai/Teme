// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

function createWindow() {
  const window = new electron.BrowserWindow({
    width: 135,
    height: 50,
    alwaysOnTop: true,
    skipTaskbar: true,
    transparent: true,
    frame: false,
    icon: path.join(__dirname, '../', '/resources/win32/app-icon.png'),
    webPreferences: {
      nodeIntegration: true
    }
  });
  window.loadFile('src/index.html');
  setInterval(() => {
    window.setAlwaysOnTop(true);
    if (window.isMinimized()) {
      console.log('window is minimized, restoring');
      window.restore();
    }
  }, 300);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

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
