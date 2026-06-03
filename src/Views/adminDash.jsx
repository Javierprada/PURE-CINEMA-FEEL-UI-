import React, { useState, useEffect } from 'react';

import './adminDash.css';
import MovieLibrary from './movieLibrary';
import DashboardHome from './DashboardHome';
import Statistics from './Statistics';
import Logs from './Logs';
import PopoverAdmin from './PopoverAdmin';


const AdminDashb = () => {

    // 1. NUEVO ESTADO: Controla que pantalla se renderiza en el Main.
    const [activeSection, setActiveSection] = useState('injection');    
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const handleOpenPopover = () => setIsPopoverOpen (true);
    const handleClosePopover = () => setIsPopoverOpen (false);


    // Estado unificado del formulario listo para subir a MySQL workbench
    const [movieData, setMovieData] = useState({
        tituloOriginal: '',
        sinopsis: '',
        genero: 'CIENCIA FICCIÓN',
        director: '',
        elenco: '',
        fechaLanzamiento: '',
        duracion: '',
        streamingMasterUrl: '', // Almacenará el ID o URL de YouTube / Vimeo
        trailerUrl: ''
    });

    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        console.log('%c PURE CINEMA FEEL: COMMAND CENTER ACTIVE ', 'background: #ff00ff; color: #000; font-weight: bold;');
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMovieData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí conecta la llamada de backend Axios / Fetch hacia la base de datos MySQL
        console.log("Inyectando Metraje al Catálogo de Datos:", movieData);
        console.log("Archivo de Póster preparado:", selectedFile);
        alert(`Película "${movieData.tituloOriginal}" inyectada con éxito a la base de datos.`);
    };

    return (
        <div className="admin-v4-body-mock admin-v4-cyber-grid">
            {/*imita el efecto de una pantalla CRT o terminal antigua.*/}
            <div className="admin-v4-scanline"></div>

            {/* BARRA LATERAL (SIDEBAR) */}
            <aside className="admin-v4-sidebar">
                <div className="admin-v4-brand-area">
                    <div className='admin-v4-brand-content' >
                        <h1 className="admin-v4-brand-title">PURE<br />CINEMA<br />FEEL</h1>
                        <img src='IMG/Filmico 1.png' alt='filmico' className='icon-filmico' ></img>
                    </div>
                    <div className="admin-v4-brand-line"></div>
                </div>
                
                {/*NAVBAR MODIFICADA: Ahora usan botones/onClick para cambiar de pantalla*/}
                <nav className="admin-v4-nav">
                    <button
                        onClick={()=> setActiveSection('dashboard')}
                        className={`admin-v4-nav-item ${activeSection === 'dashboard' ? 'active' : ''}`}
                        style={{background: 'transparent', border: 'none', width:'100%', textLeft: 'left', cursor: 'pointer' }}
                    >
                        <span className="material-symbols-outlined" style={{ marginRight: '1rem' }}>dashboard</span>
                        DASHBOARD
                    </button>

                    <button 
                        onClick={()=> setActiveSection('injection')}
                        className={`admin-v4-nav-item ${activeSection === 'injection' ? 'active' : ''}` }
                        style={{ background: 'transparent', border: 'none', width: '100%', textLeft: 'left', cursor: 'pointer' }}

                    >
                        <span className="material-symbols-outlined" style={{ marginRight: '1rem' }}>cloud_upload</span>
                        INYECCIÓN DE DATOS
                    </button>

                    <button 
                        onClick={()=> setActiveSection('library')}
                            
                        className={`admin-v4-nav-item ${activeSection === 'library' ? 'active' : ''}`}
                        style={{ background: 'transparent', border: 'none', width: '100%', textLeft: 'left', cursor: 'pointer' }}
                    >
                        <span className="material-symbols-outlined" style={{ marginRight: '1rem' }}>movie</span>
                        BIBLIOTECA RAW
                    </button>

                    <button 
                        onClick={()=> setActiveSection('stats')}
                        className={`admin-v4-nav-item ${activeSection === 'stats' ? 'active' : ''}`}
                        style={{ background: 'transparent', border: 'none', width: '100%', textLeft: 'left', cursor: 'pointer' }}
                    
                    >
                        <span className="material-symbols-outlined" style={{ marginRight: '1rem' }}>analytics</span>
                        ESTADÍSTICAS
                    </button>

                    <button
                        onClick={()=> setActiveSection('logs')}
                        className={`admin-v4-nav-item ${activeSection === 'logs' ? 'active' : ''}`}
                        style={{ background: 'transparent', border: 'none', width: '100%', textLeft: 'left', cursor: 'pointer' }}
                    >
                        <span className="material-symbols-outlined" style={{ marginRight: '1rem' }}>terminal</span>
                        LOGS DE SISTEMA
                    </button>
                </nav>

                <div className="admin-v4-sidebar-footer">

                    <div 
                        className="admin-v4-operator-card"
                        onClick={handleOpenPopover}
                        style={{ cursor: 'pointer' }}
                        
                    >
                        <div className="admin-v4-avatar-wrapper">
                            <img src="IMG/Admin.jpg" alt="Admin" className="admin-v4-avatar-img" />
                        </div>
                        <div>
                            <p style={{ fontSize: '10px', color: '#00fbfb', margin: 0, fontWeight: 'bold' }}>ADMIN: JOSETH PRADA</p>
                            <p style={{ fontSize: '8px', color: '#dcbed4', margin: 0, letterSpacing: '0.05em' }}>NIVEL DE ACCESO: ABSOLUTO 🔐</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* ÁREA DE TRABAJO PRINCIPAL */}
            <main className="admin-v4-main-content">
                <header className="admin-v4-header">
                    <div className="admin-v4-status-pill">
                        <span className="admin-v4-pulse-led"></span>
                        ADMINISTRADOR: ONLINE
                    </div>

                    <div className="admin-v4-center-titles">
                        <h2>🎬 PANEL DE ADMINISTRACIÓN</h2>
                        <p>Pure Cinema Feel — Command Interface</p>
                    </div>

                    <div>
                        <button className="admin-v4-btn-preview">
                            INSPECCIONAR GALERÍA INTERNA
                        </button>
                    </div>
                </header>

                {/*2. RENDERIZADO CONDICIONAL EN EL WORKSPACE */}

                <div className="admin-v4-workspace">
                    {console.log("Seccion activa actual:", activeSection)}
                    {activeSection === 'injection' && (
                        <form onSubmit={handleSubmit} className="admin-v4-glass-card">
                            <div className="admin-v4-form-grid">
                                
                                {/* COLUMNA IZQUIERDA: METADATOS */}
                                <div className="admin-v4-col-left">
                                    <div className="admin-v4-section-indicator">
                                        <div className="admin-v4-indicator-bar" style={{ backgroundColor: '#ff00ff' }}></div>
                                        <h3 style={{ color: '#00fbfb' }}>METADATOS DE ARCHIVO</h3>
                                    </div>

                                    <div className="admin-v4-field-group">
                                        <label className="admin-v4-label">Título Original</label>
                                        <input 
                                            type="text" 
                                            name="tituloOriginal"
                                            value={movieData.tituloOriginal}
                                            onChange={handleInputChange}
                                            className="admin-v4-input admin-v4-input-title" 
                                            placeholder="EJ. SPIDERMAN 2038" 
                                            required
                                        />
                                    </div>

                                    <div className="admin-v4-field-group">
                                        <label className="admin-v4-label">Sinopsis de Obra</label>
                                        <textarea 
                                            name="sinopsis"
                                            value={movieData.sinopsis}
                                            onChange={handleInputChange}
                                            className="admin-v4-textarea" 
                                            rows="3" 
                                            placeholder="DESCRIBA LA NARRATIVA VISUAL..."
                                            required
                                        ></textarea>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                        <div className="admin-v4-field-group">
                                            <label className="admin-v4-label">Género Cinematográfico</label>
                                            <select 
                                                name="genero" 
                                                value={movieData.genero}
                                                onChange={handleInputChange}
                                                className="admin-v4-select"
                                            >
                                                <option value="CIENCIA FICCIÓN">CIENCIA FICCIÓN</option>
                                                <option value="NOIR FUTURISTA">NOIR FUTURISTA</option>
                                                <option value="DOCUMENTAL">DOCUMENTAL</option>
                                                <option value="ANIMACIÓN AVANZADA">ANIMACIÓN AVANZADA</option>
                                            </select>
                                        </div>

                                        <div className="admin-v4-field-group">
                                            <label className="admin-v4-label">Director de Arte</label>
                                            <input 
                                                type="text" 
                                                name="director"
                                                value={movieData.director}
                                                onChange={handleInputChange}
                                                className="admin-v4-input" 
                                                placeholder="NOMBRE DEL AUTOR" 
                                            />
                                        </div>
                                    </div>

                                    <div className="admin-v4-field-group">
                                        <label className="admin-v4-label">Elenco Principal (CSV)</label>
                                        <input 
                                            type="text" 
                                            name="elenco"
                                            value={movieData.elenco}
                                            onChange={handleInputChange}
                                            className="admin-v4-input" 
                                            placeholder="ACTOR 1, ACTOR 2, ACTOR 3..." 
                                        />
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                        <div className="admin-v4-field-group">
                                            <label className="admin-v4-label">Fecha de Lanzamiento</label>
                                            <input 
                                                type="date" 
                                                name="fechaLanzamiento"
                                                value={movieData.fechaLanzamiento}
                                                onChange={handleInputChange}
                                                className="admin-v4-input" 
                                                style={{ color: '#ff00ff', fontWeight: 'bold' }}
                                                required
                                            />
                                        </div>

                                        <div className="admin-v4-field-group">
                                            <label className="admin-v4-label">Duración (MIN)</label>
                                            <div style={{ position: 'relative' }}>
                                                <input 
                                                    type="number" 
                                                    name="duracion"
                                                    value={movieData.duracion}
                                                    onChange={handleInputChange}
                                                    className="admin-v4-input" 
                                                    placeholder="120" 
                                                    required
                                                />
                                                <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '10px', color: '#dcbed4' }}>MIN</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* COLUMNA DERECHA: MULTIMEDIA */}
                                <div className="admin-v4-col-right">
                                    <div className="admin-v4-section-indicator">
                                        <div className="admin-v4-indicator-bar" style={{ backgroundColor: '#00fbfb' }}></div>
                                        <h3 style={{ color: '#ff00ff' }}>INYECCIÓN DE MEDIA</h3>
                                    </div>

                                    <div className="admin-v4-field-group">
                                        <label className="admin-v4-label">Streaming Master ID / URL (YouTube - Vimeo)</label>
                                        <div className="admin-v4-media-addon">
                                            <div className="admin-v4-addon-icon">
                                                <span className="material-symbols-outlined" style={{ color: '#00fbfb', fontSize: '18px' }}>link</span>
                                            </div>
                                            <input 
                                                type="text" 
                                                name="streamingMasterUrl"
                                                value={movieData.streamingMasterUrl}
                                                onChange={handleInputChange}
                                                className="admin-v4-input" 
                                                placeholder="ID o link oculto de YouTube..." 
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="admin-v4-field-group">
                                        <label className="admin-v4-label">Trailer URL (Preview)</label>
                                        <div className="admin-v4-media-addon">
                                            <div className="admin-v4-addon-icon">
                                                <span className="material-symbols-outlined" style={{ color: '#ff00ff', fontSize: '18px' }}>play_circle</span>
                                            </div>
                                            <input 
                                                type="url" 
                                                name="trailerUrl"
                                                value={movieData.trailerUrl}
                                                onChange={handleInputChange}
                                                className="admin-v4-input" 
                                                placeholder="https://youtube.com/watch?v=..." 
                                            />
                                        </div>
                                    </div>

                                    <div className="admin-v4-field-group" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        <label className="admin-v4-label">Póster de la Película</label>
                                        <div className="admin-v4-upload-zone">
                                            <span className="material-symbols-outlined" style={{ color: '#ff00ff', fontSize: '36px' }}>upload_file</span>
                                            <div style={{ textAlign: 'center' }}>
                                                <p style={{ margin: 0, fontSize: '12px', fontWeight: 'bold' }}>Póster de la Película</p>
                                                <p style={{ margin: '4px 0 0 0', fontSize: '9px', color: '#dcbed4' }}>Arrastre el archivo .JPG o .PNG aquí</p>
                                            </div>
                                            <div style={{ fontSize: '8px', color: 'rgba(255, 0, 255, 0.6)', marginTop: '0.5rem' }}>Dimensión sugerida: 2000x3000px</div>
                                            <input 
                                                type="file" 
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} 
                                            />
                                        </div>
                                    </div>

                                    <button type="submit" className="admin-v4-btn-execute">
                                        <span className="material-symbols-outlined">bolt</span>
                                        CARGAR PELÍCULA
                                    </button>
                                </div>

                            </div>

                            {/* MÉTRICAS DEL SISTEMA */}
                            <div className="admin-v4-footer-stats">
                                <div className="admin-v4-stat-box" style={{ borderLeft: '2px solid #00fbfb' }}>
                                    <p style={{ margin: 0, fontSize: '9px', color: '#dcbed4', textTransform: 'uppercase' }}>Espacio Disponible</p>
                                    <p style={{ margin: '4px 0 0 0', fontSize: '18px', color: '#00fbfb', fontWeight: 'bold' }}>4.2 TB</p>
                                </div>
                                <div className="admin-v4-stat-box" style={{ borderLeft: '2px solid #ff00ff' }}>
                                    <p style={{ margin: 0, fontSize: '9px', color: '#dcbed4', textTransform: 'uppercase' }}>Tráfico de Red</p>
                                    <p style={{ margin: '4px 0 0 0', fontSize: '18px', color: '#ff00ff', fontWeight: 'bold' }}>1.2 GB/S</p>
                                </div>
                                <div className="admin-v4-stat-box" style={{ borderLeft: '2px solid #bfd043' }}>
                                    <p style={{ margin: 0, fontSize: '9px', color: '#dcbed4', textTransform: 'uppercase' }}>Encoder Status</p>
                                    <p style={{ margin: '4px 0 0 0', fontSize: '18px', color: '#bfd043', fontWeight: 'bold' }}>READY</p>
                                </div>
                                <div className="admin-v4-stat-box" style={{ borderLeft: '2px solid #ffffff' }}>
                                    <p style={{ margin: 0, fontSize: '9px', color: '#dcbed4', textTransform: 'uppercase' }}>System Uptime</p>
                                    <p style={{ margin: '4px 0 0 0', fontSize: '18px', color: '#ffffff', fontWeight: 'bold' }}>14D 05H</p>
                                </div>
                            </div>

                        </form>
                    )}

                    {activeSection === 'library' && <MovieLibrary/>}
                    {activeSection === 'dashboard' && <DashboardHome/>}
                    {activeSection === 'stats' && <Statistics/>}
                    {activeSection === 'logs' && <Logs/>}

                    <PopoverAdmin
                        isOpen={isPopoverOpen}
                        onClose={handleClosePopover}
                    />

                </div>
            </main>
        </div>
    );
};

export default AdminDashb;