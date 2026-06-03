import React from 'react';
import './PopoverAdmin.css';

const PopoverAdmin = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="admin-popover-v6-overlay" onClick={onClose}>
            <div 
                className="admin-popover-v6-card" 
                onClick={(e) => e.stopPropagation()}
            >
                {/* ESQUINA DECORATIVA DE FLUJO DE DATOS */}
                <div className="admin-popover-v6-glitch-border"></div>

                {/* ENCABEZADO TÉCNICO */}
                <div className="admin-popover-v6-header">
                    <span className="admin-popover-v6-tag">ADMIN_INFO // [id: 1030688543]</span>
                    <button className="admin-popover-v6-close-btn" onClick={onClose}>×</button>
                </div>

                {/* CONTENIDO PRINCIPAL (DOS COLUMNAS) */}
                <div className="admin-popover-v6-body">
                    
                    {/* COLUMNA IZQUIERDA: AVATAR ENMARCADO */}
                    <div className="admin-popover-v6-avatar-wrapper">
                        <div className="admin-popover-v6-photo-frame">
                            <img 
                                src="IMG/Admin.jpg" 
                                alt="Admin Profile" 
                                className="admin-popover-v6-img"
                            />
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: CREDENCIALES PRINCIPALES */}
                    <div className="admin-popover-v6-credentials">
                        <div className="admin-popover-v6-access-level">
                            ACCESS_LEVEL: <span className="admin-popover-v6-magenta-text">ABSOLUTO 🔐</span>
                        </div>
                        <h3 className="admin-popover-v6-name">JOSETH PRADA</h3>
                        
                        {/* BOTONES INTERACTIVOS DE CONFIGURACIÓN */}
                        <div className="admin-popover-v6-quick-actions">
                            <button className="admin-popover-v6-btn">
                                <span>VIEW ACCESS LOGS</span>
                            </button>
                            <button className="admin-popover-v6-btn">
                                <span>LOGOUT SESSION</span>
                            </button>
                            <button className="admin-popover-v6-btn admin-popover-v6-btn-wide">
                                <span>UPDATE PROFILE PHOTO</span>
                            </button>
                        </div>
                    </div>

                </div>

                {/* SECCIÓN INFERIOR: METADATOS METRICOS */}
                <div className="admin-popover-v6-meta-section">
                    <div className="admin-popover-v6-meta-row">
                        <span className="admin-popover-v6-label">OPERATOR ID:</span>
                        <span className="admin-popover-v6-value admin-popover-v6-magenta-text">JPR_3387</span>
                    </div>
                    <div className="admin-popover-v6-meta-row">
                        <span className="admin-popover-v6-label">SESSION TIME:</span>
                        <span className="admin-popover-v6-value">04:12:00 <span className="admin-popover-v6-cyan-text">(ACTIVE)</span></span>
                    </div>
                    <div className="admin-popover-v6-meta-row">
                        <span className="admin-popover-v6-label">RECENT ACTIONS COUNT:</span>
                        <span className="admin-popover-v6-value admin-popover-v6-cyan-text">42</span>
                    </div>

                    {/* SUB-FLUJO DE AUDITORÍA CRÍTICA */}
                    <div className="admin-popover-v6-mini-logs">
                        <div className="admin-popover-v6-logs-title">DATA LOG WATERFALL..</div>
                        <div className="admin-popover-v6-log-line">
                            <span className="admin-popover-v6-log-time">[14:20]</span> LOG_042: INDEX_STREAM_01
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PopoverAdmin;