const { app, BrowserWindow} = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, '../public/favicon.ico')
  });

  win.loadURL('http://localhost:5173'); // Vite dev server URL
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
