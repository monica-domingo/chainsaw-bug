import React from 'react';

interface InteractiveSectionProps {
  counter: number;
  setCounter: (value: number | ((prevVar: number) => number)) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  openDevTools: () => void;
}

const InteractiveSection: React.FC<InteractiveSectionProps> = ({ counter, setCounter, darkMode, toggleDarkMode, openDevTools }) => {
  return (
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
  );
};

export default InteractiveSection;
