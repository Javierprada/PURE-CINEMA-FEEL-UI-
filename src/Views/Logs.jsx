import React from 'react';
import './Logs.css';

const Logs = () => {
    // Datos simulados para representar el flujo secuencial de la terminal
    const logEntries = [
        { id: 1, time: '14:20:05', node: 'MASTER_CORE', event: 'ENCRYPT_STREAM_STARTED', status: 'success' },
        { id: 2, time: '14:18:42', node: 'NODE_ZETA', event: 'INYECCIÓN_EXITOSA // BLADE_RUNNER_2049', status: 'success' },
        { id: 3, time: '14:15:10', node: 'DATABASE', event: 'RESTRICCION_DE_ACCESO_DETECTADA', status: 'warning' },
        { id: 4, time: '14:12:00', node: 'SYSTEM', event: 'BACKUP_SYNC_NODO_ALFA_COMPLETO', status: 'success' },
        { id: 5, time: '13:55:22', node: 'CINEMA_FEEL', event: 'MASTER_INIT_FAIL // REINTENTANDO...', status: 'critical' },
        { id: 6, time: '13:40:05', node: 'STORAGE', event: 'OPTIMIZACIÓN_FRAGMENTACIÓN_85%', status: 'success' },
        { id: 7, time: '13:30:15', node: 'API_GATEWAY', event: 'PETICIÓN_EXTERNA_BLOQUEADA_IP_ROOT', status: 'warning' }
    ];

    return (
        <div className="logs-v5-container">
            
            {/* ENCABEZADO DE LA TERMINAL DE LOGS */}
            <header className="logs-v5-header">
                <div className="logs-v5-title-wrapper">
                    <span className="material-symbols-outlined logs-v5-header-icon">terminal</span>
                    <h2 className="logs-v5-section-title">System Console // Logs de Flujo Secuencial</h2>
                </div>
                <p className="logs-v5-section-subtitle">Visualización de datos brutos en tiempo real [logs-v5-active]</p>
            </header>

            {/* ÁREA DE WATERFALL (FLUJO DE DATOS) */}
            <div className="logs-v5-workspace">
                
                {/* LISTADO DE LÍNEAS DE LOG */}
                <div className="logs-v5-list">
                    {logEntries.map((log) => (
                        <div key={log.id} className={`logs-v5-entry logs-v5-status-${log.status}`}>
                            <div className="logs-v5-entry-content">
                                <span className="logs-v5-entry-prefix">A:</span>
                                <span className="logs-v5-time">[{log.time}]</span>
                                <span className="logs-v5-node">{log.node}:</span>
                                <span className="logs-v5-event">{log.event}</span>
                            </div>
                            <button className="logs-v5-action-btn">
                                [VER_DETALLES]
                            </button>
                        </div>
                    ))}
                    {/* Cursor parpadeante al final de la lista */}
                    <div className="logs-v5-terminal-cursor">
                        <span>_</span>
                    </div>
                </div>

                {/* DECORACIÓN LATERAL: CASCADA DE CÓDIGO (DATA WATERFALL) */}
                <aside className="logs-v5-decoration">
                    <div className="logs-v5-code-stream">
                        010111010101001010101010101<br />
                        SYST_ERR_404_ST_00<br />
                        X86_64_RUNTIME_OK<br />
                        011101010111010101010101010<br />
                        CINEMA_FEEL_V4_SECURE<br />
                        LATENCY_CHECK_25MS<br />
                        001010101010101010101010101<br />
                        SYST_ERR_404_ST_00<br />
                        X86_64_RUNTIME_OK<br />
                        011101010111010101010101010<br />
                        CINEMA_FEEL_V4_SECURE
                    </div>
                </aside>

            </div>

            {/* BARRA DE ESTADO INFERIOR */}
            <footer className="logs-v5-footer">
                <div className="logs-v5-status-indicator">
                    <span className="logs-v5-pulse-dot"></span>
                    MONITOREO ACTIVO // NODO_ZETA: ONLINE
                </div>
                <div className="logs-v5-footer-meta">
                    v5.0.2 // CF-TERMINAL
                </div>
            </footer>

        </div>
    );
};

export default Logs;