import React from 'react';

interface TitleBarProps {
  isMaximized: boolean;
  handleMinimize: () => void;
  handleMaximizeRestore: () => void;
  handleClose: () => void;
}

const TitleBar: React.FC<TitleBarProps> = ({ isMaximized, handleMinimize, handleMaximizeRestore, handleClose }) => {
  return (
    <header className="title-bar">
      <div className="title">Bee 🐝</div>
      <div className="window-controls">
        <button onClick={handleMinimize} title="Minimizar">_</button>
        <button onClick={handleMaximizeRestore} title={isMaximized ? 'Restaurar' : 'Maximizar'}>□</button>
        <button onClick={handleClose} title="Cerrar" className="close-btn">×</button>
      </div>
    </header>
  );
};

export default TitleBar;
