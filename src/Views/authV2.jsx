import React, { useState } from 'react';
import './authV2.css';



const CSSParticles = () => {
    return (
        <div className="auth-v2-particles">
            <div className="auth-v2-particle"></div>
            <div className="auth-v2-particle"></div>
            <div className="auth-v2-particle"></div>
            <div className="auth-v2-particle"></div>
            <div className="auth-v2-particle"></div>
            <div className="auth-v2-particle"></div>
            <div className="auth-v2-particle"></div>
            <div className="auth-v2-particle"></div>
            <div className="auth-v2-particle"></div>
            <div className="auth-v2-particle"></div>
        </div>
    );
 };



const AuthPortal = () => {
    const [view, setView] = useState('login');

    const toggleView = (newView) => {
        setView(newView);
    };


    



    const renderHeader = () => (
        <div className="auth-v2-header">
            <div className="auth-v2-logo-wrapper">
                <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQss1fwGp5AXb2K0F9x3iCyp64TnOg-qhrnTvYIUvWIOPuxGiZnHjZfWU7CQ-JIIFcgSVbStjubkgjVD0PGt8JzHEeGWrjMz7bkSq018xMa86ZCV9X9vdrn1_p8hiWmmMwJR8KGD55BTpw9OMo0mXviFeqbAAFA06Fk7RnR1NwW6iFXa2H7zc6TzTHW_VRwSnSnASRYX0EktxqXwOsUvsvfMkhCmakOe8QXziNSAARhH7ie8BV-1SG3_vM53QzBr0oH_ZDmB7-LA" 
                    alt="Pure Cinema Brand" 
                    className="auth-v2-logo-img"
                />
            </div>
            <h1 className="auth-v2-neon-text">
                PURE CINEMA FEEL
            </h1>
        </div>
    );

    const renderLogin = () => (
        <div className="auth-v2-form-wrapper">
            <h2 className="auth-v2-title">
                ACCESO A LA COLECCIÓN PRIVADA
            </h2>
            <div className="auth-v2-input-group">
                <div className="auth-v2-input-relative">
                    <span className="material-symbols-outlined auth-v2-icon">mail</span>
                    <input 
                        type="email" 
                        placeholder="Digite Email"
                        className="auth-v2-input-field auth-v2-input-glow"
                    />
                </div>
                <div className="auth-v2-input-relative">
                    <span className="material-symbols-outlined auth-v2-icon">lock</span>
                    <input 
                        type="password" 
                        placeholder="Contraseña de acceso"
                        className="auth-v2-input-field auth-v2-input-glow"
                    />
                </div>
            </div>
            <button className="auth-v2-btn-execute auth-v2-btn-flicker">
                INICIAR SESIÓN
            </button>
            <div className="auth-v2-links-container">
                <button 
                    onClick={() => toggleView('recover')}
                    className="auth-v2-link-btn"
                >
                    ¿Olvidaste tu contraseña?
                </button>
                <p className="auth-v2-text-muted">
                    ¿Nuevo en el sistema? 
                    <button 
                        onClick={() => toggleView('register')}
                        className="auth-v2-link-btn-highlight"
                    >
                        Registrarse
                    </button>
                </p>
            </div>
        </div>
    );

    const renderRegister = () => (
        <div className="auth-v2-form-wrapper">
            <h2 className="auth-v2-title">
                CREA TU ACCESO A LA EXPERIENCIA
            </h2>
            <div className="auth-v2-input-group">
                <div className="auth-v2-input-relative">
                    <span className="material-symbols-outlined auth-v2-icon">person</span>
                    <input 
                        type="text" 
                        placeholder="Nombres Apellidos"
                        className="auth-v2-input-field auth-v2-input-glow"
                    />
                </div>
                <div className="auth-v2-input-relative">
                    <span className="material-symbols-outlined auth-v2-icon">mail</span>
                    <input 
                        type="email" 
                        placeholder="Email"
                        className="auth-v2-input-field auth-v2-input-glow"
                    />
                </div>
                <div className="auth-v2-input-relative">
                    <span className="material-symbols-outlined auth-v2-icon">lock</span>
                    <input 
                        type="password" 
                        placeholder="Nueva Contraseña"
                        className="auth-v2-input-field auth-v2-input-glow"
                    />
                </div>
            </div>
            <button className="auth-v2-btn-execute auth-v2-btn-flicker">
                ACTIVAR CUENTA
            </button>
            <div className="auth-v2-links-container">
                <p className="auth-v2-text-muted">
                    ¿Ya tienes cuenta? 
                    <button 
                        onClick={() => toggleView('login')}
                        className="auth-v2-link-btn-cyan"
                    >
                        Iniciar Sesión
                    </button>
                </p>
            </div>
        </div>
    );

    const renderRecover = () => (
        <div className="auth-v2-form-wrapper">
            <h2 className="auth-v2-title">
                RESTABLECER ACCESO
            </h2>
            <p className="auth-v2-description">
                Introduce tu email para enviarte un enlace de recuperación cibernética.
            </p>
            <div className="auth-v2-input-group">
                <div className="auth-v2-input-relative">
                    <span className="material-symbols-outlined auth-v2-icon">mail</span>
                    <input 
                        type="email" 
                        placeholder="Email de recuperación"
                        className="auth-v2-input-field auth-v2-input-glow"
                    />
                </div>
            </div>
            <button className="auth-v2-btn-execute auth-v2-btn-flicker">
                ENVIAR TOKEN DE ACCESO
            </button>
            <div className="auth-v2-links-container">
                <button 
                    onClick={() => toggleView('login')}
                    className="auth-v2-link-btn flex-center"
                >
                    <span className="material-symbols-outlined text-icon-sm">arrow_back</span>
                    Volver al inicio de sesión
                </button>
            </div>
        </div>
    );

    return (
        <div className="auth-v2-screen-container">
            <CSSParticles/>
            <div className="auth-v2-card-panel auth-v2-glass-card">

                {renderHeader()}
                <div className="auth-v2-content">
                    {view === 'login' && renderLogin()}
                    {view === 'register' && renderRegister()}
                    {view === 'recover' && renderRecover()}
                </div>
            </div>
        </div>
    );
};

export default AuthPortal;