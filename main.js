const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
//const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const Menu=electron.Menu
const MenuItem=electron.MenuItem


let win;

function createWindow () {

  win = new BrowserWindow({width: 800, height: 600})

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

win.webContents.openDevTools()
  win.on('closed', () => {
    win = null
  });
}

app.on('ready', function(){
  createWindow()
  const template=[
    {
      label:"Demo Menu",
      submenu:[
        {
          label:"SubMenu 1",
          click:function(){
            console.log("Click subMenu 1")
          }
        },
        {
          type:"separator",
        },
        {
          label:"SubMenu 2"
        },
      ]
    },
    {
      label:"Edit",
      submenu:[
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        
      ]
    },
    {
      label:"Help"
    }
  ]
  const menu=Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  const ctxMenu=new Menu();
  ctxMenu.append(new MenuItem({
    label:"New ContextMEnu",
    click:function(){
      console.log("Click Context Menu Item")
    }

}));
ctxMenu.append(new MenuItem({
  role:"selectall"
  
  }
  ));
  win.webContents.on("context-menu",function(e,params){
    ctxMenu.popup(win,params.x,params.y)
  })

});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});