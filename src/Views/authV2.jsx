import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
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
    

    // NUEVOS ESTADOS DE CONTROL Y AUTENTICACIÓN
    const [correo_electronico, setCorreo_electronico] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState('');
    const [userRol, setUserRol] = useState(null);
    
    
    
    
    /* ========================================================================
       NUEVA LÓGICA (1): ESTADOS ADICIONALES PARA EL REGISTRO DE USUARIOS
       ========================================================================
       Reciclamos 'correo_electronico' y 'password' que ya declaraste arriba.
       Solo añadimos estados específicos para controlar los nombres y apellidos,
       además de un mensaje de éxito para avisar cuando la cuenta fue creada.
    */
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [successMessage, setSuccessMessage] = useState ('');
    const [newPassword, setNewPassword] = useState ('');





    const toggleView = (newView) => {
        setView(newView);
        setErrorMessage(''); // Limpiamos errores, si cambia de vista
        setSuccessMessage(''); // Limpiamos mensaje de ÉXITO al cambiar la vista
    };



    // FUNCIÓN DE PETICIÓN CON AXIOS AL SERVIDOR PUERTO (8080)
    const handleSubmitLogin = async (e) => {

       if (e && e.preventDefault) {
           e.preventDefault();// Evita que la pagina parpadee o se recargue.
            setIsLoading(true);
            setErrorMessage('');
       }
        console.log("🚀 Petición Axios iniciada con:", {correo_electronico, password });

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                correo_electronico: correo_electronico,
                password: password
            });

            console.log("✅ Servidor respondió con éxito:", response.data);

            if (response.data.success) {
                console.log('Acceso Verificado!', response.data.user);

                const dastosUsuario = response.data.user || response.data.administrador_conectado;
                localStorage.setItem('userSession', JSON.stringify(dastosUsuario));

                // 🚀 Disparamos la redirección guardando el rol
                setUserRol(dastosUsuario.rol);
            }


        } catch (error) {
            console.log("❌ Error capturado en Axios:", error);
            if (error.response) {
                // Si el backend responde con un error controlado: 401 0 403
                setErrorMessage(error.response.data.message);
            } else {
                // Fallo de RED, servidor apagado o error de CORS
                setErrorMessage("ERROR_DE_NEXO: Servidor inaccesible puerto 8080")
            }

        } finally {
            setIsLoading(false);
        }






    };


    const handleSubmitRegister = async (e) => {
        e.preventDefault(); // Detiene la recarga total del navegador
        setIsLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        console.log("🚀 Despachando datos de registro al Backend...");

        try {
            const response = await axios.post('http://localhost:8080/api/auth/register',{
                nombres: nombres,
                apellidos: apellidos,
                correo_electronico: correo_electronico,
                password: password,

                // Nota: No enviamos 'rol' para que por defecto el servidor asigne 'user' por seguridad.
            });

            console.log('Registro ÉXITOSO en servidor:', response.data);

            if (response.data.success) {
                setSuccessMessage("¡Cuenta activada con éxito! Redirigiendo al login...");

                // Limpiamos los inputs del formulario de registro para que queden vacios
                setNombres('');
                setApellidos('');
                setCorreo_electronico('');
                setPassword('');

                // Esperamos 2.5 segundos para que el usuario lea el mensaje y lo devolvemos al login
                setTimeout(()=> {
                    toggleView('login');
                }, 2500);



            }



        }catch (error) {
            console.log("❌ Fallo en el proceso de registro:", error);
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.message || "Error desconocido en el servidor");
            }else {
                setErrorMessage("ERROR_DE_NEXO: Imposible conectar con el servicio de registro")
            }
        }finally {
            setIsLoading(false);
        }



    };

    


    const handleRecoverSubmit = (e) => {
        e.preventDefault();
        toggleView('resetPassword'); // Aqui creamos la vista alternativa.
    };


    const handlePasswordResetSubmit = (e) => {
        e.preventDefault();

        if (newPassword !== password) {
            setErrorMessage("Las contraseñas no coinciden ciberneticamente.");
            return;
        }

        // Aqui se mete la petición Axios para actualizar la contraseña en el backend
        setSuccessMessage("Contraseña restablecida con ÉXITO 🔧");
        setNewPassword('');
        setPassword('');
        setTimeout(()=> toggleView('login'), 2000);

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




   




    // CONEXIÓN DE INPUTS Y EVENTOS EN EL RENDER DEL LOGIN
    const renderLogin = () => (
        <form onSubmit={handleSubmitLogin}  className="auth-v2-form-wrapper">
            <h2 className="auth-v2-title">
                ACCESO A LA COLECCIÓN PRIVADA
            </h2>

            {/* RENDERIZADO CONDICIONAL DEL MESAJE DE ERRROR DEL SERVIDOR */}
            {errorMessage && (
                <div className='auth-v2-error-alert' style={{color: '#ff00ff', fontSize: '0.75rem', marginBottom: '1rem', fontFamily: 'monospace', textTransform: 'uppercase'}} >
                    ⚠️ {errorMessage}
                </div>
            )}

            <div className="auth-v2-input-group">
                <div className="auth-v2-input-relative">
                    <span className="material-symbols-outlined auth-v2-icon">mail</span>
                    <input 
                        type="email" 
                        placeholder="Digite Email"
                        className="auth-v2-input-field auth-v2-input-glow"
                        value={correo_electronico}
                        onChange={(e)=> setCorreo_electronico(e.target.value)}
                        disabled={isLoading}
                        required
                    >
                    </input>
                </div>
                <div className="auth-v2-input-relative">
                    <span className="material-symbols-outlined auth-v2-icon">lock</span>
                    <input 
                        type="password" 
                        placeholder="Contraseña de acceso"
                        className="auth-v2-input-field auth-v2-input-glow"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        disabled={isLoading}
                        required
                    >
                    </input>    
                </div>
            </div>

            <button type='submit' className="auth-v2-btn-execute auth-v2-btn-flicker" disabled={isLoading}>
                INICIAR SESIÓN
            </button>

            <div className="auth-v2-links-container">
                <button
                    type='button' // Evita que este botón envie el formulario 
                    onClick={() => toggleView('recover')}
                    className="auth-v2-link-btn"
                >
                    ¿Olvidaste tu contraseña?
                </button>

                <p className="auth-v2-text-muted">
                    ¿Nuevo en el sistema? 
                    <button
                        type='button'  //Evita que este boton envie el formulario 
                        onClick={() => toggleView('register')}
                        className="auth-v2-link-btn-highlight"
                    >
                        Registrarse
                    </button>
                </p>
            </div>
        </form>
    );

    const renderRegister = () => (
        <form  onSubmit={handleSubmitRegister} className="auth-v2-form-wrapper">
            <h2 className="auth-v2-title">
                CREA TU ACCESO A LA EXPERIENCIA
            </h2>

            {/* ALERTAS CONDICIONALES: Muestran respuestas del Backend en tiempo real */}
            {errorMessage && (
                <div className='auth-v2-error-alert' style={{color: '#ff00ff', fontSize: '0.75rem', marginBottom: '1rem', fontFamily: 'monospace', textTransform: 'uppercase'}} >
                    ⚠️ {errorMessage}
                </div>
            )}
            {successMessage && (
                <div className='auth-v2-success-alert' style={{color: '#00ffff', fontSize: '0.75rem', marginBottom: '1rem', fontFamily: 'monospace', textTransform: 'uppercase'}} >
                    ✨ {successMessage}
                </div>
            )}

            <div className="auth-v2-input-group">
                <div className="auth-v2-input-relative">
                    <span className="material-symbols-outlined auth-v2-icon">person</span>
                    <input 
                        type="text" 
                        placeholder="Nombres"
                        className="auth-v2-input-field auth-v2-input-glow"
                        value={nombres}
                        onChange={(e)=> setNombres(e.target.value)}
                        disabled={isLoading}
                        required
                    />
                </div>
                {/*INPUT de apellidos*/}
                 <div className="auth-v2-input-relative">
                    <span className="material-symbols-outlined auth-v2-icon">person</span>
                    <input 
                        type="text" 
                        placeholder="Apellidos"
                        className="auth-v2-input-field auth-v2-input-glow"
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}
                        disabled={isLoading}
                        required
                    />
                </div>


                {/*INPUT de correo eletrónico*/}
                <div className="auth-v2-input-relative">
                    <span className="material-symbols-outlined auth-v2-icon">mail</span>
                    <input 
                        type="email" 
                        placeholder="Email"
                        className="auth-v2-input-field auth-v2-input-glow"
                        value={correo_electronico}
                        onChange={(e) => setCorreo_electronico(e.target.value)}
                        disabled={isLoading}
                        required
                    />
                </div>

                {/*INPUT de contraseña */}
                <div className="auth-v2-input-relative">
                    <span className="material-symbols-outlined auth-v2-icon">lock</span>
                    <input 
                        type="password" 
                        placeholder="Nueva Contraseña"
                        className="auth-v2-input-field auth-v2-input-glow"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        required
                    />
                </div>
            </div>

            {/*BOTÓN EJECUTOR: Cambia su etiqueta dinamica si hay carga activa */}
            <button type='submit' className="auth-v2-btn-execute auth-v2-btn-flicker" disabled={isLoading}>
                {isLoading ? 'PROCESANDO CIBER-REGISTRO...' : 'ACTIVAR CUENTA'}
            </button>

            <div className="auth-v2-links-container">
                <p className="auth-v2-text-muted">
                    ¿Ya tienes cuenta? 
                    <button 
                        type="button"
                        onClick={() => toggleView('login')}
                        className="auth-v2-link-btn-cyan"
                    >
                        Iniciar Sesión
                    </button>
                </p>
            </div>
        </form>
    );

    const renderRecover = () => (
        <form onSubmit={handleRecoverSubmit} className="auth-v2-form-wrapper">
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
                        value={correo_electronico}
                        onChange={(e)=> setCorreo_electronico(e.target.value)}
                        className="auth-v2-input-field auth-v2-input-glow"
                        disabled={isLoading}
                        required
                    />
                </div>
            </div>
            <button
                type='submit'
                
                className="auth-v2-btn-execute auth-v2-btn-flicker"
                
            >
                ENVIAR TOKEN DE ACCESO
            </button>
            <div className="auth-v2-links-container">
                <button 
                    type="button"
                    onClick={() => toggleView('login')} // Devuelta al login.
                    className="auth-v2-link-btn flex-center"
                    
                >
                    <span className="material-symbols-outlined text-icon-sm">arrow_back</span>
                    Volver al inicio de sesión
                </button>
            </div>
        </form>
    );




    const PasswordResetForm = () => (
        
            <form  onSubmit={handlePasswordResetSubmit} className="auth-v2-form-wrapper" >
                <h2 className="auth-v2-title">CAMBIAR CONTRASEÑA 🔐</h2>

                {errorMessage && (
                    <div className='auth-v2-error-alert' style={{color: '#ff00ff', fontSize: '0.75rem', marginBottom: '1rem', fontFamily: 'monospace', textTransform: 'uppercase'}} >
                        ⚠️ {errorMessage}
                    </div>
                )}

                {successMessage && (
                    <div className='auth-v2-success-alert' style={{color: '#00ffff', fontSize: '0.75rem', marginBottom: '1rem', fontFamily: 'monospace', textTransform: 'uppercase'}} >
                        ✨ {successMessage}
                    </div>
                )}

                <div className="auth-v2-input-group">
                    <div className="auth-v2-input-relative">
                        <span className="material-symbols-outlined auth-v2-icon">lock</span>
                        <input 
                            type="password" 
                            placeholder="Digite su nueva contraseña"
                            className="auth-v2-input-field auth-v2-input-glow"
                            value={newPassword}
                            onChange={(e)=> setNewPassword(e.target.value)}
                            disabled={isLoading}
                            required
                        >
                        </input>
                    </div>
                    <div className="auth-v2-input-relative">
                        <span className="material-symbols-outlined auth-v2-icon">lock</span>
                        <input 
                            type="password" 
                            placeholder="Confirme su contraseña"
                            className="auth-v2-input-field auth-v2-input-glow"
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            disabled={isLoading}
                            required
                        >
                        </input>    
                    </div>
                </div>
                <button 
                    type='submit'
                    className="auth-v2-btn-execute auth-v2-btn-flicker" disabled={isLoading}
                    
                
                >
                    CONFIRMAR NUEVA CONTRASEÑA
                </button>
            </form>
    );
    







    // Redirección declarativa DINAMICA
    if (userRol === 'admin') {
        return <Navigate to="/adminDash" replace={true}/>;
    }

    if (userRol === 'usuario'){
        return <Navigate to="/userDashboard" replace={true}/>;
    }

    return (
        <div className="auth-v2-screen-container">
            <CSSParticles/>
            <div className="auth-v2-card-panel auth-v2-glass-card">

                {renderHeader()}
                <div className="auth-v2-content">
                    {view === 'login' && renderLogin()}
                    {view === 'register' && renderRegister()}
                    {view === 'recover' && renderRecover()}
                    {view === 'resetPassword' && PasswordResetForm()}
                </div>
            </div>
        </div>
    );
};

export default AuthPortal;