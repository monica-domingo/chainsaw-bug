import React from 'react';

interface SystemInfo {
  platform: string;
  arch: string;
  cpus: number;
  memory: number;
  electronVersion: string;
}

interface SystemInfoDisplayProps {
  systemInfo: SystemInfo | null;
}

const SystemInfoDisplay: React.FC<SystemInfoDisplayProps> = ({ systemInfo }) => {
  if (!systemInfo) {
    return null;
  }

  return (
    <div className="system-info">
      <h2>Información del Sistema:</h2>
      <p>Plataforma: <strong>{systemInfo.platform}</strong> (porque la portabilidad es para presumir)</p>
      <p>Arquitectura: <strong>{systemInfo.arch}</strong> (¿realmente importa?)</p>
      <p>CPUs: <strong>{systemInfo.cpus}</strong> (de los cuales Electron usa... todos)</p>
      <p>Memoria: <strong>{Math.round(systemInfo.memory / 1024 / 1024)}</strong> MB (prepárate para verla desaparecer)</p>
      <p>Versión de Electron: <strong>{systemInfo.electronVersion}</strong> (actualiza cada semana para mantenerte ocupado)</p>
    </div>
  );
};

export default SystemInfoDisplay;
