'use strict'

import { app, protocol, BrowserWindow, Tray, Menu, remote } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import path from 'path'
const isDevelopment = process.env.NODE_ENV !== 'production'
    //Pacote responsavel por salvar as configurações de tela
const windowStateKeeper = require('electron-window-state');


// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    { scheme: 'app', privileges: { secure: true, standard: true } }
])



async function createWindow() {
    // Caso as as configurações não sejam salvas, ele usa esse medida pradrão pra tela.
    let mainWindowState = windowStateKeeper({
        defaultWidth: 800,
        defaultHeight: 600,
    });
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        // Telea cheia e restaurando o estado do fullscrenn
        fullscreen: mainWindowState.fullScreen,
        // barra com as opções de maximizar, minimizar e fechar
        frame: true,
        webPreferences: {

            // Use pluginOptions.nodeIntegration, leave this alone
            // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
            contextIsolation: false

        }
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
            // AQUI ABRE O PAINEL F12
            // if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app')
            // Load the index.html when not in development
        win.loadURL('app://./index.html')
    }

    const getOpenAtLogin = () => app.getLoginItemSettings().openAtLogin
    let tray = null
    app.whenReady().then(() => {
        // const path = require('path');
        // const iconPath = path.join(__dirname + '/icons/logo.png');
        tray = new Tray(path.join(__static, 'icon.png'))
        const contextMenu = Menu.buildFromTemplate([{
                label: "Abrir com o Login",
                type: 'checkbox',
                checked: getOpenAtLogin(),
                click() {
                    const openAtLogin = getOpenAtLogin()

                    app.setLoginItemSettings({
                        openAtLogin: !openAtLogin
                    })
                },
            },
            {
                label: "Sair",
                click() {
                    //BrowserWindow.quit();
                    tray.destroy();
                    win.destroy();
                }
            }
        ])
        tray.setToolTip('This is my apllication')
        tray.setContextMenu(contextMenu)
    })


    // Salva as configurações de tela
    mainWindowState.manage(win);
}




// Inicia o programa junto com o sisteama.
// app.setLoginItemSettings({ openAtLogin: true });

// Nome do aplicativo
app.setName = 'Dashboard Metas PAM';

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async() => {

    // if (isDevelopment && !process.env.IS_TEST) {
    //     try {
    //         await installExtension(VUEJS_DEVTOOLS)
    //     } catch (e) {
    //         console.error('Vue Devtools failed to install:', e.toString())
    //     }
    // }
    createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}