import { useState, useEffect } from 'react';
import './App.css'
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
          <header className="title-bar">
              <div className="title">Bee 🐝</div>
              <div className="window-controls">
                  <button onClick={handleMinimize} title="Minimizar">_</button>
                  <button onClick={handleMaximizeRestore} title={isMaximized ? 'Restaurar' : 'Maximizar'}>□</button>
                  <button onClick={handleClose} title="Cerrar" className="close-btn">×</button>
              </div>
          </header>

          <div className="content">
              <h1>¡Bienvenido a Bee🐝™!</h1>
              <p className="subtitle">La aplicación que finge ser útil mientras demuestra que sabes usar Electron</p>

              {systemInfo && (
                  <div className="system-info">
                      <h2>Información del Sistema:</h2>
                      <p>Plataforma: <strong>{systemInfo.platform}</strong> (porque la portabilidad es para presumir)</p>
                      <p>Arquitectura: <strong>{systemInfo.arch}</strong> (¿realmente importa?)</p>
                      <p>CPUs: <strong>{systemInfo.cpus}</strong> (de los cuales Electron usa... todos)</p>
                      <p>Memoria: <strong>{Math.round(systemInfo.memory / 1024 / 1024)}</strong> MB (prepárate para verla desaparecer)</p>
                      <p>Versión de Electron: <strong>{systemInfo.electronVersion}</strong> (actualiza cada semana para mantenerte ocupado)</p>
                  </div>
              )}

              <div className="interactive-section">
                  <h2>Elementos Interactivos Totalmente Innecesarios:</h2>

                  <div className="counter-section">
                      <p>Contador inútil: {counter}</p>
                      <button onClick={() => setCounter(counter + 1)}>Incrementar</button>
                      <button onClick={() => setCounter(0)}>Reiniciar</button>
                  </div>

                  <div className="theme-section">
                      <button onClick={toggleDarkMode}>
                          {darkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
                      </button>
                      <p className="theme-joke">Porque no eres un verdadero desarrollador sin un toggle de modo oscuro</p>
                  </div>

                  <div className="dev-tools">
                      <button onClick={openDevTools}>Abrir DevTools</button>
                      <p className="dev-joke">Para fingir que estás depurando algo importante</p>
                  </div>
              </div>

              <div className="electron-joke">
                  <h3>¿Por qué usar Electron?</h3>
                  <p>Porque nada dice "soy un desarrollador moderno" como usar 300MB de RAM para mostrar un "Hola Mundo"</p>
              </div>
          </div>

          <footer>
              <p>Hecho con <span>❤️</span> y aproximadamente 1.5GB de node_modules</p>
          </footer>
      </div>
  )
}

export default App
