import React, { useEffect, useState } from 'react';
import {Navigate} from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player'
import './UserDashboard.css';







export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  // ESTADOS DINAMICOS: Para la base de datos y el reproductor.
  const [movies, setMovies] = useState([]); // Aqui se guardan las películas de MYSQL.
  const [playlist, setPlaylist] = useState([]); // Películas marcadas como favoritas. Funcionalidad dinamica.
  const [selectedMovie, setSelectedMovie] = useState(null); // Película que se reproduce en tiempo real.
  const [isLoading, setIsLoading] = useState(true);
  const ENDPOINT_MOVIES = 'http://localhost:8080/api/get/movies';

  // EFECTO PARA TRAER LAS PELÍCULAS DESDE EL SERVIDOR
  useEffect(()=>{
    axios.get(ENDPOINT_MOVIES)
    .then((Response)=> {
      console.log("📡 Respuesta del servidor:", Response.data)

      if (Response.data && Array.isArray(Response.data.movies)) {
        setMovies(Response.data.movies); // Guardamos solo el array
      } else if (Array.isArray(Response.data)) {
        setMovies(Response.data);
      }
      
    })
    .catch ((error) => {
      console.error("❌ Error al conectar con Pure Cinema Feel API:", error);
    })
    .finally (()=> {
      setIsLoading(false);
    })
  },[])




  // 🛡️ PARSER ULTRA-BLINDADO: Extrae la URL incluso si viene un tag <iframe> completo
  const formatUrlForPlayer = (url) => {
    if (!url) return '';

    let targetUrl = url.trim();

    // Si guardaste un <iframe> completo en la DB, esto extrae solo el contenido del 'src'
    if (targetUrl.includes('<iframe')) {
      const srcMatch = targetUrl.match(/src=["']([^"']+)["']/);
      if (srcMatch && srcMatch[1]) {
        targetUrl = srcMatch[1];
      }
    }

    // Corregir protocolos relativos comunes en embeds (//player.vimeo... -> https://player.vimeo...)
    if (targetUrl.startsWith('//')) {
      targetUrl = 'https:' + targetUrl;
    }

    // Conversión de Embed de Vimeo a Link Nativo
    if (targetUrl.includes("player.vimeo.com/video/")) {
      const vimeoId = targetUrl.split('/video/')[1]?.split('?')[0];
      return `https://vimeo.com/${vimeoId}`;
    }

    // Conversión de Embed de YouTube a Link Nativo
    if (targetUrl.includes("youtube.com/embed/")) {
      const ytId = targetUrl.split('/embed/')[1]?.split('?')[0];
      return `https://www.youtube.com/watch?v=${ytId}`;
    }

    return targetUrl;
  };



  


  // Alternar favoritos
  const toggleFavorite = (movie) => {
    if (playlist.some(m => m.id === movie.id)) {
      setPlaylist(playlist.filter(m => m.id !== movie.id)); // Deja pasar a todas las peliculas cuyo 'id' sea diferente la de la pelicula que quiero quitar.
    } else {
      setPlaylist([...playlist, movie]);
    }
  };


    // Lógica de cierre de sesión.
  const [shouldRedirect, setShoulRedirect] = useState (false);
  const handleLogout = () => {
    localStorage.removeItem('userSession');
    setShoulRedirect(true);
  };


  // Guardian declarativo de expulsión.
  // Si esta activo, interrumpe el renderizado y saca al usuario inmediatamente.
  if (shouldRedirect) {
    return <Navigate to='/authV2' replace={true}/>;
  }



  return (
    <div className="user-dashboard-root">
      
      {/* ASIDE - BARRA LATERAL IZQUIERDA */}
      <aside className="user-sidebar">
        <div className="brand-logo-area">
          <h1 className="text-pink">
            PURE<br/>
            <span>CINEMA<br/></span>
            FEEL
          </h1>
          <img src='/IMG/Filmico 1.png' alt='Filmico1' className='filmico'></img>
        </div>

        <div className="profile-container">
          <div className="avatar-wrapper">
            <div className="avatar-ring">
              <img src="https://img.favpng.com/22/22/23/male-avatar-user-profile-clip-art-png-favpng-D6fQkBXdkGV4QGp022dE3tPHY.jpg" alt="Instructor Profile" />
            </div>
            <div className="live-tag">LIVE</div>
          </div>
          <div className="profile-info">
            <h3>Instructor Evaluador</h3>
            <span className="premium-badge">Plan Prueba Premium 🏆  </span>
          </div>
        </div>

        <nav className="user-nav-links">
          <button className={activeTab === 'home' ? 'nav-btn active' : 'nav-btn'} onClick={() => setActiveTab('home')}>
            <span className="nav-icon">home</span> HOME
          </button>
          <button className={activeTab === 'playlist' ? 'nav-btn active' : 'nav-btn'} onClick={() => setActiveTab('playlist')}>
            <span className="nav-icon">video_library</span> MY PLAYLIST ({playlist.length})
          </button>
          <button className={activeTab === 'history' ? 'nav-btn active' : 'nav-btn'} onClick={() => setActiveTab('history')}>
            <span className="nav-icon">history</span> HISTORIAL
          </button>
          <button className={activeTab === 'account' ? 'nav-btn active' : 'nav-btn'} onClick={() => setActiveTab('account')}>
            <span className="nav-icon">person</span> My cuenta
          </button>
        </nav>

        <div className="logout-area">
          <button className="logout-button-action" onClick={handleLogout}>
            <span className="nav-icon">logout</span>Cerrar sesión
          </button>
        </div>
      </aside>

      {/* CONTENEDOR PRINCIPAL */}
      <main className="user-main-view">
        
        {/* BARRA DE BUSQUEDA / HEADER */}
        <header className="user-top-bar">
          <div className="search-box-container">
            <span className="search-icon-inside">search</span>
            <input 
              type="text" 
              placeholder="Explore obras maestras del cine..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="top-bar-actions">
            <button className="icon-notification-btn">
              <span className="nav-icon">notifications</span>
              <span className="dot-alert"></span>
            </button>
            <button className="icon-settings-btn">
              <span className="nav-icon">settings</span>
            </button>
            <div className="bar-divider"></div>
            <div className="now-streaming-widget">
              <span className="widget-lbl">Ahora trasmitiendo</span>
              <span className="widget-title">Interstellar 4K</span>
            </div>
          </div>
        </header>

        {/* LIENZO DE CONTENIDO DINÁMICO MAIN */}
        <div className="content-scroll-canvas">
          
          {activeTab === 'home' && (
            <>

              {/* SECCIÓN CIBERNETICA DEL REPRODUCTOR PRINCIPAL (dinamico) */}
              {selectedMovie && (
                <section style={{ marginBottom: '30px', background: '#111', padding: '20px', borderRadius: '12px', border: '1px solid #333', display: 'block' }}>
                  
                  {/* Barra superior de control */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }} >
                    <h3 style={{ color: '#00ffff', margin: 0 }}>📺 REPRODUCIENDO: {selectedMovie.title}</h3>
                    <button onClick={() => setSelectedMovie(null)} style={{ background: '#ff00ff', border: 'none', color: '#fff', padding: '8px 18px', cursor: 'pointer', borderRadius: '6px', fontWeight: 'bold', boxShadow: '0 0 10px #ff00ff' }}>
                      ✖ CERRAR SALA
                    </button>
                  </div>

                  {/* 📋 LOGGER DE CONTROL: Esto imprimirá en tu consola F12 cada vez que intente renderizar */}
                  {console.log("🎬 URL Original DB:", selectedMovie.video_url)}
                  {console.log("🚀 URL procesada para react-player:", formatUrlForPlayer(selectedMovie.video_url))}

                  {/* 🔥 TRUCO MAESTRO: Contenedor con hack de padding (Inmune a fallos de Flexbox/Grid) */}
                  <div style={{ 
                    position: 'relative',
                    width: '100%', 
                    aspectRatio: '16 / 9',
                    backgroundColor: '#000', 
                    borderRadius: '8px', 
                    overflow: 'hidden', 
                    border: '2px solid #00ffff' 
                  }}>
                    <ReactPlayer
                      src={formatUrlForPlayer(selectedMovie.video_url)} // Le pasamos la URL directa de la BD sin transformar
                      className="react-player"
                      width="100%"
                      height="100%"
                      style={{ position: 'absolute', top: 0, left: 0 }}
                      controls={true} // Muestra controles de reproducción nativos
                      playing={true} // Cambia a true para que inicie solo
                      muted={true}
                      config={{
                        youtube:{
                          playerVars: {showinfo: 1, origin: window.location.origin}
                        }
                      }}
                      onError={(e) => console.error("❌ ERROR CRÍTICO DE REPRODUCCIÓN EN REACTPLAYER:", e)}
                    
                    />
                  </div>
                  
                  <p style={{ marginTop: '15px', color: '#ccc', fontStyle: 'italic', lineHeight: '1.5' }}>{selectedMovie.description}</p>
                </section>
              )}










              {/* HÉROE DESTACADO */}
              <section className="hero-spotlight-grid">
                <div className="hero-banner-main">
                  <img src="/IMG/Spiderman.png" alt="Spiderman" className="hero-bg-img"/>
                  <div className="hero-gradient-overlay"></div>
                  <div className="hero-text-details">
                    <span className="trending-tag">TENDENCIA AHORA</span>
                    <h2>SPIDERMAN<br/>Marca un nuevo dia</h2>
                    <div className="hero-buttons-row">
                      <button className="play-now-main-btn">▶ Ver Ahora</button>
                      <button className="add-playlist-hero-btn">+ Playlist</button>
                    </div>
                  </div>
                </div>

                <div className="hero-right-cards">
                  <div className="continue-watching-card">
                    <h4>Continue viendo</h4>
                    <p>Cyberpunk 2077: Edgerunners</p>
                    <div className="progress-bar-back">
                      <div className="progress-bar-fill"></div>
                    </div>
                  </div>
                  <div className="new-arrivals-card">
                    <div>
                      <h4>Recien llegados</h4>
                      <p>5 Nuevas películas agregadas hoy</p>
                    </div>
                    <div className="spark-icon-box">⭐</div>
                  </div>
                </div>
              </section>

              {/* Agregados Recientemente */}
              <section className="movie-grid-section-wrapper">
                <div className="section-header-row">
                  <h3>Agregados recientemente (LIVE SQL)</h3>
                  <span className="view-all-link">Ver Todo</span>
                </div>

                {isLoading ? (
                  <p style={{ color: '#00ffff' }}>Sincronizando flujos con el servidor de datos...</p>
                ) : (

                  <div className="movies-responsive-grid">
                    {Array.isArray(movies) && movies.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase())).map(movie => (
                      <div key={movie.id} className="movie-showcase-card">
                        <div className="poster-wrapper-area">

                          {/* Si poster_url está vacío, usamos un placeholder cyberpunk por defecto */}
                          <img src={(movie.poster_url && movie.poster_url !== "NULL" && movie.poster_url.trim() !== "" ) ? movie.poster_url : "https://static.vecteezy.com/system/resources/thumbnails/011/215/319/small/planet-earth-with-sunrise-in-space-photo.jpg"} />
                          <div className="hover-play-layer">

                            {/* Al hacer clic, inyectamos la película completa al reproductor */}
                            <button className="neon-play-btn-card" onClick={()=> setSelectedMovie(movie) }>▶ Ver Ahora</button>
                          </div>
                          <button 
                            className={`card-heart-trigger ${playlist.some(m => m.id === movie.id) ? 'liked' : ''}`}
                            onClick={() => toggleFavorite(movie)}
                          >
                            ⭐
                          </button>
                        </div>

                        <div className="card-movie-meta">
                          <h5>{movie.title}</h5>
                          <div className="card-tags-info">
                            <span className="tag-genre-badge">{movie.genre}</span>
                            <span className="tag-dot"><strong>•</strong></span>
                            <span className="tag-year-lbl">{movie.release_date ? movie.release_date.substring(0,4) : '2026'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </>
          )}

          {activeTab === 'playlist' && (
            <section className="movie-grid-section-wrapper">
              <div className="section-header-row">
                <h3 className="border-cyan">My Playlist</h3>
              </div>
              {playlist.length === 0 ? (
                <p className="empty-message-info">Tu playlist está vacía. ¡Agrega películas desde el Home!</p>
              ) : (
                <div className="movies-responsive-grid">
                  {playlist.map(movie => (
                    <div key={movie.id} className="movie-showcase-card">
                      <div className="poster-wrapper-area">
                        <img src={movie.poster_url || "https://images.unsplash.com/photo-1542204172-e7052809a86e?auto=format&fit=crop&w=400&q=80" } alt={movie.title} />
                        <div className="hover-play-layer">
                          <button className="neon-play-btn-card" onClick={()=> {setSelectedMovie(movie); setActiveTab('home');}} >▶ Ver Ahora</button>
                        </div>
                        <button className="card-heart-trigger liked" onClick={() => toggleFavorite(movie)}>❤️</button>
                      </div>
                      <div className="card-movie-meta">
                        <h5>{movie.title}</h5>
                        <div className="card-tags-info">
                          <span className="tag-genre-badge">{movie.genre}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {activeTab === 'history' && (
            <section className="movie-grid-section-wrapper">
              <div className="section-header-row">
                <h3>History</h3>
              </div>
              <p className="empty-message-info">Has visto 0 películas recientemente.</p>
            </section>
          )}

          {activeTab === 'account' && (
            <section className="movie-grid-section-wrapper">
              <div className="section-header-row">
                <h3 className="border-cyan">Mi cuenta</h3>
              </div>
              <div className="account-settings-form-box">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group-flex">
                    <label>Nombre Completo</label>
                    <input type="text" defaultValue="Instructor Evaluador" />
                  </div>
                  <div className="form-group-flex">
                    <label>Correo Electrónico</label>
                    <input type="email" defaultValue="instructor@purecinemafeel.com" />
                  </div>
                  <div className="subscription-status-alert">
                    <p>Tu suscripción <strong>Premium</strong> está activa y renovará automáticamente.</p>
                  </div>
                  <button type="button" className="submit-profile-changes">Actualizar Datos</button>
                </form>
              </div>
            </section>
          )}

        </div>
      </main>
    </div>
  );
}