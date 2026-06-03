import React, { useState, useEffect } from 'react';
import './Planes.css';

export default function Planes() {
    const [planSelected, setPlanSelected] = useState(null);
    const [particles, setParticles] = useState([]);

    // Generación dinámica de partículas al montar el componente
    useEffect(() => {
        const count = 40;
        const generatedParticles = [];
        for (let i = 0; i < count; i++) {
            const size = Math.random() * 3 + 1 + 'px';
            const left = Math.random() * 100 + '%';
            const delay = Math.random() * 20 + 's';
            const duration = Math.random() * 10 + 10 + 's';
            const color = Math.random() > 0.5 ? '#ff00ff' : '#00ffff';

            generatedParticles.push({
                id: i,
                style: {
                    width: size,
                    height: size,
                    left: left,
                    bottom: '-20px',
                    animationDelay: delay,
                    animationDuration: duration,
                    background: color,
                    boxShadow: `0 0 10px ${color}`
                }
            });
        }
        setParticles(generatedParticles);
    }, []);

    const handleSelectPlan = (planId) => {
        setPlanSelected(planId);
        console.log(`Plan preparado para Sandbox de Stripe: ${planId}`);
        // Aquí conectaremos a futuro el activador del modal/checkout de pruebas.
    };

    return (
        <div className="plans-v3-screen-wrapper">
            {/* Fondo de Partículas Animado */}
            <div className="plans-v3-canvas-bg">
                {particles.map((p) => (
                    <div key={p.id} className="plans-v3-particle" style={p.style} />
                ))}
            </div>

            {/* Header / Navbar de Navegación */}
            <header className="plans-v3-header">
                <div className="plans-v3-navbar">
                    <div className="plans-v3-brand">Pure Cinema Feel</div>
                    <nav className="plans-v3-nav-links">
                        <a href="#explorar" className="plans-v3-nav-link">Explorar</a>
                        <a href="#peliculas" className="plans-v3-nav-link">Películas</a>
                        <a href="#estrenos" className="plans-v3-nav-link">Estrenos</a>
                        <a href="#precios" className="plans-v3-nav-link active">Precios</a>
                    </nav>
                    <div className="plans-v3-nav-actions">
                        <button className="plans-v3-icon-btn">
                            <span className="material-symbols-outlined">account_circle</span>
                        </button>
                        <button className="plans-v3-btn-start">Comenzar</button>
                    </div>
                </div>
            </header>

            {/* Contenido Principal */}
            <main className="plans-v3-main">
                <div className="plans-v3-container">
                    <div className="plans-v3-text-center">
                        <h1 className="plans-v3-title">
                            ELIGE TU NIVEL DE <span>INMERSIÓN</span>
                        </h1>
                        <p className="plans-v3-subtitle">
                            Accede al catálogo más exclusivo con tecnología de última generación. Sin anuncios, sin límites.
                        </p>
                    </div>

                    <div className="plans-v3-grid">
                        
                        {/* PLAN 1: BÁSICO */}
                        <div 
                            className={`plans-v3-glass-card ${planSelected === 'basic' ? 'plans-v3-active' : ''}`}
                            onClick={() => handleSelectPlan('basic')}
                        >
                            <div className="plans-v3-card-header">
                                <h3 className="plans-v3-card-title">The Archivist</h3>
                                <div className="plans-v3-price-block">
                                    <span className="plans-v3-price">$8.99</span>
                                    <span className="plans-v3-text-muted">/mes</span>
                                </div>
                            </div>
                            <ul className="plans-v3-features-list">
                                <li className="plans-v3-feature-item">
                                    <span className="material-symbols-outlined plans-v3-fuchsia-icon">check_circle</span>
                                    <span>1080p Full HD</span>
                                </li>
                                <li className="plans-v3-feature-item">
                                    <span className="material-symbols-outlined plans-v3-fuchsia-icon">check_circle</span>
                                    <span>1 Dispositivo</span>
                                </li>
                                <li className="plans-v3-feature-item disabled">
                                    <span className="material-symbols-outlined">block</span>
                                    <span style={{ textDecoration: 'line-through' }}>HDR & Dolby Vision</span>
                                </li>
                                <li className="plans-v3-feature-item disabled">
                                    <span className="material-symbols-outlined">block</span>
                                    <span style={{ textDecoration: 'line-through' }}>Audio Espacial</span>
                                </li>
                            </ul>
                            <button className="plans-v3-btn-execute">
                                {planSelected === 'basic' ? 'Plan Seleccionado' : 'Seleccionar'}
                            </button>
                        </div>

                        {/* PLAN 2: RECOMENDADO (4K) */}
                        <div 
                            className={`plans-v3-glass-card plans-v3-recommended ${planSelected === 'cinephile' ? 'plans-v3-active' : ''}`}
                            onClick={() => handleSelectPlan('cinephile')}
                        >
                            <div className="plans-v3-badge">MEJOR VALOR</div>
                            <div className="plans-v3-card-header" style={{ marginTop: '16px' }}>
                                <h3 className="plans-v3-card-title" style={{ color: 'var(--plans-cyan)' }}>The Cinephile</h3>
                                <div className="plans-v3-price-block">
                                    <span className="plans-v3-price">$14.99</span>
                                    <span className="plans-v3-text-muted">/mes</span>
                                </div>
                            </div>
                            <ul className="plans-v3-features-list">
                                <li className="plans-v3-feature-item" style={{ color: '#fff' }}>
                                    <span className="material-symbols-outlined plans-v3-cyan-icon">verified</span>
                                    <span>4K Ultra HD + HDR</span>
                                </li>
                                <li className="plans-v3-feature-item" style={{ color: '#fff' }}>
                                    <span className="material-symbols-outlined plans-v3-cyan-icon">verified</span>
                                    <span>2 Dispositivos simultáneos</span>
                                </li>
                                <li className="plans-v3-feature-item" style={{ color: '#fff' }}>
                                    <span className="material-symbols-outlined plans-v3-cyan-icon">verified</span>
                                    <span>Audio Espacial 360</span>
                                </li>
                                <li className="plans-v3-feature-item" style={{ color: '#fff' }}>
                                    <span className="material-symbols-outlined plans-v3-cyan-icon">verified</span>
                                    <span>Descargas Offline</span>
                                </li>
                            </ul>
                            <button className="plans-v3-btn-execute">
                                {planSelected === 'cinephile' ? 'Plan Seleccionado' : 'Seleccionar'}
                            </button>
                        </div>

                        {/* PLAN 3: AVANZADO */}
                        <div 
                            className={`plans-v3-glass-card ${planSelected === 'studio' ? 'plans-v3-active' : ''}`}
                            onClick={() => handleSelectPlan('studio')}
                        >
                            <div className="plans-v3-card-header">
                                <h3 className="plans-v3-card-title">The Studio</h3>
                                <div className="plans-v3-price-block">
                                    <span className="plans-v3-price">$22.99</span>
                                    <span className="plans-v3-text-muted">/mes</span>
                                </div>
                            </div>
                            <ul className="plans-v3-features-list">
                                <li className="plans-v3-feature-item">
                                    <span className="material-symbols-outlined plans-v3-fuchsia-icon">star</span>
                                    <span>4K + Dolby Vision</span>
                                </li>
                                <li className="plans-v3-feature-item">
                                    <span className="material-symbols-outlined plans-v3-fuchsia-icon">star</span>
                                    <span>4 Dispositivos</span>
                                </li>
                                <li className="plans-v3-feature-item">
                                    <span className="material-symbols-outlined plans-v3-fuchsia-icon">star</span>
                                    <span>Calidad de Estudio Bitrate</span>
                                </li>
                                <li className="plans-v3-feature-item">
                                    <span className="material-symbols-outlined plans-v3-fuchsia-icon">star</span>
                                    <span>Soporte Prioritario</span>
                                </li>
                            </ul>
                            <button className="plans-v3-btn-execute">
                                {planSelected === 'studio' ? 'Plan Seleccionado' : 'Seleccionar'}
                            </button>
                        </div>

                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="plans-v3-footer">
                <div className="plans-v3-footer-content">
                    <div className="plans-v3-text-gradient" style={{ fontWeight: 800, fontSize: '12px', letterSpacing: '2px' }}>
                        PURE CINEMA FEEL
                    </div>
                    <div className="plans-v3-footer-links">
                        <a href="#terminos" className="plans-v3-footer-link">Términos</a>
                        <a href="#privacidad" className="plans-v3-footer-link">Privacidad</a>
                        <a href="#contacto" className="plans-v3-footer-link">Contacto</a>
                    </div>
                    <p className="plans-v3-footer-link" style={{ margin: 0 }}>
                        © 2026 Pure Cinema Feel. El futuro del cine es hoy.
                    </p>
                </div>
            </footer>
        </div>
    );
}