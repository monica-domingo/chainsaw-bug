import { useState, useEffect } from 'react';
import './App.css';
import TitleBar from './components/TitleBar';
import SystemInfoDisplay from './components/SystemInfoDisplay';
import InteractiveSection from './components/InteractiveSection';
import AppFooter from './components/AppFooter';

const { ipcRenderer } = window.require ? window.require('electron') : { ipcRenderer: mockIpcRenderer() };

function mockIpcRenderer() {
    return {
        send: (channel: string, ...args: any[]) => console.log(`IPC send: ${channel}`, args),
        on: (channel: string, listener: (...args: any[]) => void) => {
            console.log(`IPC registered listener for: ${channel}`);
            return listener;
        },
        removeAllListeners: (channel: string) => console.log(`IPC removed listeners for: ${channel}`)
    };
}

interface SystemInfo {
    platform: string;
    arch: string;
    cpus: number;
    memory: number;
    electronVersion: string;
}

function App() {
    const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
    const [isMaximized, setIsMaximized] = useState<boolean>(false);
    const [counter, setCounter] = useState<number>(0);
    const [darkMode, setDarkMode] = useState<boolean>(false);

    useEffect(() => {
        ipcRenderer.send('get-system-info');

        ipcRenderer.on('system-info-reply', (_: any, info: SystemInfo) => {
            setSystemInfo(info);
        });

        ipcRenderer.on('window-state-change', (_: any, maximized: boolean) => {
            setIsMaximized(maximized);
        });

        return () => {
            ipcRenderer.removeAllListeners('system-info-reply');
            ipcRenderer.removeAllListeners('window-state-change');
        };
    }, []);

    const handleMinimize = () => {
        ipcRenderer.send('window-control', 'minimize');
    };

    const handleMaximizeRestore = () => {
        ipcRenderer.send('window-control', isMaximized ? 'restore' : 'maximize');
    };

    const handleClose = () => {
        ipcRenderer.send('window-control', 'close');
    };

    const openDevTools = () => {
        ipcRenderer.send('open-dev-tools');
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.className = !darkMode ? 'dark-mode' : '';
    };

    return (
        <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
            <TitleBar
                isMaximized={isMaximized}
                handleMinimize={handleMinimize}
                handleMaximizeRestore={handleMaximizeRestore}
                handleClose={handleClose}
            />

            <div className="content">
                <h1>¡Bienvenido a Bee🐝™!</h1>
                <p className="subtitle">La aplicación que finge ser útil mientras demuestra que sabes usar Electron</p>

                <SystemInfoDisplay systemInfo={systemInfo} />

                <InteractiveSection
                    counter={counter}
                    setCounter={setCounter}
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                    openDevTools={openDevTools}
                />

                <div className="electron-joke">
                    <h3>¿Por qué usar Electron?</h3>
                    <p>Porque nada dice "soy un desarrollador moderno" como usar 300MB de RAM para mostrar un "Hola Mundo"</p>
                </div>
            </div>

            <AppFooter />
        </div>
    );
}

export default App;
