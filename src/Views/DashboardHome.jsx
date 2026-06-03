import React from 'react';
import './DashboardHome.css'; 

const DashboardHome = () => {
    return (
        <div className="dashboard-v4-home-container">
            
            <header className="admin-v4-section-header">
                <div className="admin-v4-indicator-bar"></div>
                <h2 className="section-title">Terminal // Resumen Crítico</h2>
                <p className="section-subtitle">Datos de rendimiento global del sistema pure cinema feel</p>
            </header>

            {/* SECCIÓN DE METRICAS (KPI GRID) */}
            <section className="kpi-v4-grid">

            {/* ENCABEZADO PRINCIPAL */}
                


                
                {/* TARJETA 1: TITULOS INDEXADOS */}
                <div className="admin-v4-glass-card cyan-border">
                    <div className="card-v4-header">
                        <span className="card-v4-label">Títulos Indexados</span>
                        <span className="material-symbols-outlined card-v4-icon cyan-text">movie</span>
                    </div>
                    <div className="card-v4-value">1,248</div>
                    <div className="card-v4-footer">
                        <span className="material-symbols-outlined" style={{ fontSize: '0.9rem', color: '#a2fb00' }}>trending_up</span>
                        <span style={{ color: '#a2fb00', fontWeight: 'bold' }}>+12 nuevos</span> indexados hoy
                    </div>
                </div>

                {/* TARJETA 2: ALMACENAMIENTO */}
                <div className="admin-v4-glass-card magenta-border">
                    <div className="card-v4-header">
                        <span className="card-v4-label">Almacenamiento Master</span>
                        <span className="material-symbols-outlined card-v4-icon magenta-text">database</span>
                    </div>
                    <div className="card-v4-value" style={{ fontSize: '2rem' }}>
                        4.2 <span style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.3)' }}>/ 10 TB</span>
                    </div>
                    <div className="storage-v4-bar">
                        <div className="storage-v4-fill"></div>
                    </div>
                    <div className="card-v4-footer">
                        Estado del nodo: <span className="magenta-text" style={{ fontWeight: 'bold' }}>OPTIMAL</span>
                    </div>
                </div>

                {/* TARJETA 3: PETICIONES TRÁFICO */}
                <div className="admin-v4-glass-card yellow-border">
                    <div className="card-v4-header">
                        <span className="card-v4-label">Tráfico de Red (Live)</span>
                        <span className="material-symbols-outlined card-v4-icon yellow-text">bolt</span>
                    </div>
                    <div className="card-v4-value">8.5<span style={{ fontSize: '1.5rem', color: '#bfd043' }}>k</span></div>
                    <div className="card-v4-footer">
                        <span className="material-symbols-outlined" style={{ fontSize: '0.9rem', color: '#bfd043' }}>wifi_tethering</span>
                        Peticiones API procesadas con éxito
                    </div>
                </div>

            </section>

            {/* SECCIÓN INFERIOR: HISTORIAL DE LOGS */}
            <div className="admin-v4-glass-card" style={{ borderTop: '1px solid rgba(0, 251, 251, 0.2)' }}>
                <div className="card-v4-label" style={{ marginBottom: '1.5rem', color: '#00fbfb' }}>
                    Logs de actividad reciente del sistema
                </div>
                <div className="terminal-v4-logs">
                    <div><span className="magenta-text">[14:20]</span> <span className="cyan-text">ADMIN_JOSETH:</span> INYECCIÓN EXITOSA - "BLADE_RUNNER_2049_MASTER"</div>
                    <div><span className="magenta-text">[13:55]</span> <span class="cyan-text">SYSTEM:</span> DEPLOY DE RESPALDO COMPLETO EN NODO_ZETA</div>
                    <div><span className="magenta-text">[12:10]</span> <span class="cyan-text">DATABASE:</span> 42 ENLACES DE STREAMING VERIFICADOS [OK]</div>
                </div>
            </div>

        </div>
    );
};

export default DashboardHome;