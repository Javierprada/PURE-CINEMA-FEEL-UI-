import React from 'react';
import './Statistics.css';

const Statistics = () => {
    return (
        <div className="statistics-v4-container">
            
            {/* ENCABEZADO DE SECCIÓN DE ESTADÍSTICAS */}
            <header className="statistics-v4-section-header">
                <h2 className="statistics-v4-section-title">Terminal de Análisis // Datos V4</h2>
                <p className="statistics-v4-section-subtitle">Datos de Cinema Feel // Métricas avanzadas e infraestructura</p>
            </header>

            {/* PANEL PRINCIPAL DE GRÁFICOS Y DISTRIBUCIÓN */}
            <section className="statistics-v4-grid">
                
                {/* TARJETA 1: DISTRIBUCIÓN GEOGRÁFICA */}
                <div className="statistics-v4-card statistics-v4-cyan-glow">
                    <div className="statistics-v4-card-header">
                        <span className="statistics-v4-card-label">Distribución Geográfica de Operadores</span>
                        <span className="material-symbols-outlined statistics-v4-icon statistics-v4-cyan-text">public</span>
                    </div>
                    
                    {/* Simulación del Mapa y Gráficos de barras por región */}
                    <div className="statistics-v4-geo-workspace">
                        <div className="statistics-v4-geo-chart-container">
                            <div className="statistics-v4-bar-group">
                                <div className="statistics-v4-bar-multi">
                                    <div className="statistics-v4-subbar statistics-v4-bg-cyan" style={{ height: '75%' }}></div>
                                    <div className="statistics-v4-subbar statistics-v4-bg-magenta" style={{ height: '40%' }}></div>
                                </div>
                                <span className="statistics-v4-bar-tag">NA</span>
                            </div>
                            <div className="statistics-v4-bar-group">
                                <div className="statistics-v4-bar-multi">
                                    <div className="statistics-v4-subbar statistics-v4-bg-cyan" style={{ height: '50%' }}></div>
                                    <div className="statistics-v4-subbar statistics-v4-bg-magenta" style={{ height: '85%' }}></div>
                                </div>
                                <span className="statistics-v4-bar-tag">LATAM</span>
                            </div>
                            <div className="statistics-v4-bar-group">
                                <div className="statistics-v4-bar-multi">
                                    <div className="statistics-v4-subbar statistics-v4-bg-cyan" style={{ height: '60%' }}></div>
                                    <div className="statistics-v4-subbar statistics-v4-bg-magenta" style={{ height: '55%' }}></div>
                                </div>
                                <span className="statistics-v4-bar-tag">EU</span>
                            </div>
                            <div className="statistics-v4-bar-group">
                                <div className="statistics-v4-bar-multi">
                                    <div className="statistics-v4-subbar statistics-v4-bg-cyan" style={{ height: '90%' }}></div>
                                    <div className="statistics-v4-subbar Nav-magenta" style={{ height: '30%' }}></div>
                                </div>
                                <span className="statistics-v4-bar-tag">ASIA</span>
                            </div>
                        </div>
                    </div>

                    <div className="statistics-v4-card-footer">
                        <div className="statistics-v4-legend-item"><span className="statistics-v4-dot statistics-v4-bg-cyan"></span> Active</div>
                        <div className="statistics-v4-legend-item"><span className="statistics-v4-dot statistics-v4-bg-magenta"></span> Idle</div>
                    </div>
                </div>

                {/* TARJETA 2: FRAGMENTACIÓN DE ALMACENAMIENTO */}
                <div className="statistics-v4-card statistics-v4-magenta-glow">
                    <div className="statistics-v4-card-header">
                        <span className="statistics-v4-card-label">Fragmentación de Almacenamiento Master</span>
                        <span className="material-symbols-outlined statistics-v4-icon statistics-v4-magenta-text">donut_large</span>
                    </div>
                    
                    <div className="statistics-v4-donut-workspace">
                        <div className="statistics-v4-donut-chart">
                            <div className="statistics-v4-donut-hole"></div>
                        </div>
                        
                        <div className="statistics-v4-donut-legends">
                            <div className="statistics-v4-donut-row">
                                <span className="statistics-v4-dot statistics-v4-bg-magenta"></span>
                                <div className="statistics-v4-donut-text">
                                    <p className="statistics-v4-donut-title">Películas 4K</p>
                                    <p className="statistics-v4-donut-pct statistics-v4-magenta-text">65%</p>
                                </div>
                            </div>
                            <div className="statistics-v4-donut-row">
                                <span className="statistics-v4-dot statistics-v4-bg-cyan"></span>
                                <div className="statistics-v4-donut-text">
                                    <p className="statistics-v4-donut-title">Trailers</p>
                                    <p className="statistics-v4-donut-pct statistics-v4-cyan-text">25%</p>
                                </div>
                            </div>
                            <div className="statistics-v4-donut-row">
                                <span className="statistics-v4-dot statistics-v4-bg-yellow"></span>
                                <div className="statistics-v4-donut-text">
                                    <p className="statistics-v4-donut-title">Metadatos</p>
                                    <p className="statistics-v4-donut-pct statistics-v4-yellow-text">10%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="statistics-v4-card-footer">
                        Estado general del clúster: <span className="statistics-v4-cyan-text" style={{ fontWeight: 'bold' }}>ESTABLE</span>
                    </div>
                </div>

                {/* TARJETA 3: TENDENCIA DE FLUJO DE RED */}
                <div className="statistics-v4-card statistics-v4-cyan-glow">
                    <div className="statistics-v4-card-header">
                        <span className="statistics-v4-card-label">Tendencia de Flujo de Red // Live</span>
                        <span className="material-symbols-outlined statistics-v4-icon statistics-v4-cyan-text">timeline</span>
                    </div>
                    
                    <div className="statistics-v4-line-workspace">
                        <div className="statistics-v4-line-chart-grid">
                            <svg className="statistics-v4-svg-graph" viewBox="0 0 300 120" preserveAspectRatio="none">
                                <polyline
                                    fill="none"
                                    stroke="#00fbfb"
                                    strokeWidth="2"
                                    points="0,90 40,75 80,85 120,50 160,35 200,65 240,40 280,55 300,20"
                                    style={{ filter: 'drop-shadow(0px 0px 4px rgba(0,251,251,0.6))' }}
                                />
                                <circle cx="40" cy="75" r="3" fill="#00fbfb" />
                                <circle cx="120" cy="50" r="3" fill="#00fbfb" />
                                <circle cx="160" cy="35" r="3" fill="#00fbfb" />
                                <circle cx="240" cy="40" r="3" fill="#00fbfb" />

                                <polyline
                                    fill="none"
                                    stroke="#ff00ff"
                                    strokeWidth="1.5"
                                    points="0,110 40,95 80,100 120,80 160,85 200,75 240,88 280,70 300,60"
                                    style={{ filter: 'drop-shadow(0px 0px 4px rgba(255,0,255,0.6))' }}
                                />
                            </svg>
                            <div className="statistics-v4-internal-tag">Latencia Promedio: 25ms</div>
                        </div>
                    </div>

                    <div className="statistics-v4-card-footer">
                        <span className="statistics-v4-cyan-text">● Hits Totales</span>
                        <span className="statistics-v4-magenta-text">● Hits de Video</span>
                    </div>
                </div>

            </section>

            {/* SECCIÓN INFERIOR DE ACCIONES DE ANÁLISIS */}
            <div className="statistics-v4-actions-panel">
                <div className="statistics-v4-panel-title">
                    Acciones de Análisis Avanzado [statistics-v4]
                </div>
                
                <div className="statistics-v4-buttons-group">
                    <button className="statistics-v4-btn-execute">
                        EJECUTAR ANÁLISIS DE FALLO // [statistics-v4]
                    </button>

                    <button className="statistics-v4-btn-report">
                        GENERAR INFORME EXPLICATIVO // STATISTICS-V4-INFORME
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Statistics;