import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom'
import axios from 'axios';
import './adminDash.css';
import MovieLibrary from './movieLibrary';
import DashboardHome from './DashboardHome';
import Statistics from './Statistics';
import Logs from './Logs';
import PopoverAdmin from './PopoverAdmin';
import GaleriaInterna from './GaleriaInterna';






const AdminDashb = () => {
    
    // Estado unificado del formulario listo para subir a MySQL workbench
    const [movieData, setMovieData] = useState({
        title: '',
        description: '',
        genre: 'CIENCIA FICCIÓN',
        director: '',
        actors: '',
        release_date: '',
        duracion_minutes: '',
        video_url: '', // Almacenará el ID o URL de YouTube / Vimeo
        trailer_url: '',
        poster_url: ''
        
    });
    
    // ---------- ESTADOS de CONTROL de la INTERFAZ ---------- //
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [activeSection, setActiveSection] = useState('injection');
    const [isScanningGallery, setIsScanningGallery] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(()=> {
        return localStorage.getItem('userSession') !== null;

    });



    // ---------------------- MANEJADORES de EVENTOS ------------------------ //
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

    const handleOpenPopover = () => setIsPopoverOpen (true);
    const handleClosePopover = () => setIsPopoverOpen (false);
    

    const handleLogout = (e) => {
        e.stopPropagation(); // Evitamos que el click se propague a la tarjeta del operador y abra el popover
        localStorage.removeItem('userSession');
        setIsLoggedIn(false); // Cambia el estado para provocar la redirección.

       
    };

    
    

    //4. Función escaneo de matriz
    const handleInspectGallery = () => {
        setIsScanningGallery(true);
        

        
        // Temporizador
        setTimeout(()=>{
            setIsScanningGallery(false); // El botón vuele a la normalidad
            setActiveSection('gallery'); // Aqui es donde se renderiza el contenido de Galeria Interna
        }, 1900); // 1.5 segundos de retraso artificial.
    };

    
    
   


    const handleMovieUploadSubmit = async (e) => {
        e.preventDefault();

        // 1. Validación rapida en el frontend.
        if (!movieData.title.trim() || !movieData.video_url.trim()) {
            setErrorMessage("¡ERROR DE INYECCIÓN! El Título y la URL de Video son campos obligatorios.");
            return;
        }


        setIsLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        // 2. EMPAQUETAMOS los DATOS con los datos exactos que el controlador y modelo esperan.
        const moviePayload = {
            ...movieData,
            duracion_minutes: movieData.duracion_minutes ? parseInt(movieData.duracion_minutes) : null
        };



        try {
            console.log("🚀 Transmitiendo metadatos al puerto de control...", moviePayload);

            //3. Petición POST al endpoint MVC del backend
            const response = await axios.post('http://localhost:8080/api/injection/upload', moviePayload);

            if (response.data.success) {
                setSuccessMessage("¡PELÍCULA INYECTADA CON ÉXITO A LA PLATAFORMA! 🎬🍿");

                //4. LIMPIAMOS TODOS LOS CAMPOS DEL PANEL DE ADMINISTRACIÓN.
                setMovieData({
                    title: '',
                    description: '',
                    genre: 'CIENCIA FICCIÓN',
                    director: '',
                    actors: '',
                    release_date: '',
                    duracion_minutes: '',
                    video_url: '',
                    trailer_url: '',
                    poster_url: ''
                });
                setSelectedFile(null);
            }
        
        }catch (error) {
            console.error("❌ Falla en la inyección de media:", error);
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.Message);
            }else {
                setErrorMessage("ERROR_DE_NEXO: Imposible conectar con el servidor de base de datos.");
            }
        }finally {
            setIsLoading(false);
        }




    };

    

    useEffect(() => {
        console.log('%c PURE CINEMA FEEL: COMMAND CENTER ACTIVE ', 'background: #ff00ff; color: #000; font-weight: bold;');
    }, []);


    
    if (!isLoggedIn) {
        return <Navigate to='/authV2' replace={true}/>;
    }
   

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
                        type='button'
                        onClick={()=> setActiveSection('dashboard')}
                        className={`admin-v4-nav-item ${activeSection === 'dashboard' ? 'active' : ''}`}
                        style={{background: 'transparent', border: 'none', width:'100%', textAlign: 'left', cursor: 'pointer' }}
                    >
                        <span className="material-symbols-outlined" style={{ marginRight: '1rem' }}>dashboard</span>
                        DASHBOARD
                    </button>

                    <button 
                        type='button'
                        onClick={()=> setActiveSection('injection')}
                        className={`admin-v4-nav-item ${activeSection === 'injection' ? 'active' : ''}` }
                        style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}

                    >
                        <span className="material-symbols-outlined" style={{ marginRight: '1rem' }}>cloud_upload</span>
                        INYECCIÓN DE DATOS
                    </button>

                    <button 
                        type='button'
                        onClick={()=> setActiveSection('library')}
                        className={`admin-v4-nav-item ${activeSection === 'library' ? 'active' : ''}`}
                        style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
                    >
                        <span className="material-symbols-outlined" style={{ marginRight: '1rem' }}>movie</span>
                        BIBLIOTECA RAW
                    </button>

                    <button 
                        type='button'
                        onClick={()=> setActiveSection('stats')}
                        className={`admin-v4-nav-item ${activeSection === 'stats' ? 'active' : ''}`}
                        style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
                    
                    >
                        <span className="material-symbols-outlined" style={{ marginRight: '1rem' }}>analytics</span>
                        ESTADÍSTICAS
                    </button>

                    <button
                        type='button'
                        onClick={()=> setActiveSection('logs')}
                        className={`admin-v4-nav-item ${activeSection === 'logs' ? 'active' : ''}`}
                        style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
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

                        {/* Botón de Apagado TV */}
                        <button 
                            type='button'
                            className="tv-power-btn"  title="Cerrar Sesión" onClick={handleLogout}
                            >
                            <span className="nav-icon">power_settings_new</span>
                        </button>

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
                        <button 
                            type='button'
                            onClick={handleInspectGallery}
                            disabled={isScanningGallery}
                            className={`admin-v4-btn-preview ${isScanningGallery ? 'gallery-internal-btn-inspect' : ''} `}
                            
                        >
                            
                            {isScanningGallery ? "⏳ EJECUTANDO ESCANEO DE MATRIZ.." : "INSPECCIONAR GALLERÍA INTERNA"}
                        </button>
                    </div>
                </header>

                {/*2. RENDERIZADO CONDICIONAL EN EL WORKSPACE */}

                <div className="admin-v4-workspace">
                    {console.log("Seccion activa actual:", activeSection)}
                    {activeSection === 'injection' && (
                        <form onSubmit={handleMovieUploadSubmit} className="admin-v4-glass-card">
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
                                            name="title"
                                            value={movieData.title}
                                            onChange={handleInputChange}
                                            className="admin-v4-input admin-v4-input-title" 
                                            placeholder="EJ. SPIDERMAN 2038" 
                                            required
                                        />
                                    </div>

                                    <div className="admin-v4-field-group">
                                        <label className="admin-v4-label">Sinopsis de Obra</label>
                                        <textarea 
                                            name="description"
                                            value={movieData.description}
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
                                                name="genre" 
                                                value={movieData.genre}
                                                onChange={handleInputChange}
                                                className="admin-v4-select"
                                            >
                                                <option value="CIENCIA FICCIÓN">CIENCIA FICCIÓN</option>
                                                <option value="NOIR FUTURISTA">NOIR FUTURISTA</option>
                                                <option value="DOCUMENTAL">DOCUMENTAL</option>
                                                <option value="ANIMACIÓN AVANZADA">ANIMACIÓN AVANZADA</option>
                                                <option value="EDUCATIVO">EDUCATIVO</option>
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
                                            name="actors"
                                            value={movieData.actors}
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
                                                name="release_date"
                                                value={movieData.release_date}
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
                                                    name="duracion_minutes"
                                                    value={movieData.duracion_minutes}
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
                                                name="video_url"
                                                value={movieData.video_url}
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
                                                name="trailer_url"
                                                value={movieData.trailer_url}
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
                                                name='poster_url'
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} 
                                            />
                                        </div>
                                    </div>

                                    {/* Espacio para ver el archivo seleccionado */}
                                    {selectedFile && (
                                        <p style={{ color: '#00fbfb', fontSize: '11px', marginTop: '0.5rem', textAlign: 'center' }}>
                                            Archivo listo: 📄 {selectedFile.name}
                                        </p>
                                    )}

                                    <button 
                                        type="submit" 
                                        className="admin-v4-btn-execute"
                                        disable={isLoading}
                                    >   
                                        <span className="material-symbols-outlined">bolt</span>
                                        {isLoading ? "PROCESANDO INYECCIÓN... ⏳" : "CARGAR PELÍCULA"}
                                    </button>

                                    {errorMessage && <div style={{ color: '#ff0055', backgroundColor: 'rgba(255,0,85,0.1)', padding: '10px', border: '1px solid #ff0055', marginTop: '1rem', fontSize: '12px', fontWeight: 'bold' }}>{errorMessage}</div>}
                                    {successMessage && <div style={{ color: '#00fbfb', backgroundColor: 'rgba(0,251,251,0.1)', padding: '10px', border: '1px solid #00fbfb', marginTop: '1rem', fontSize: '12px', fontWeight: 'bold' }}>{successMessage}</div>}


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
                    {activeSection === 'gallery' && <GaleriaInterna isLoading={isScanningGallery} />}
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