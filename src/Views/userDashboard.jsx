import React, { useState } from 'react';
import {Navigate} from 'react-router-dom';
import './UserDashboard.css';






// Caratulas películas añadidas recientemente.
const INITIAL_MOVIES = [
  { id: 1, title: "NEON NIGHTMARE", genre: "Thriller", year: "2024", poster: "https://images.unsplash.com/photo-1542204172-e7052809a86e?auto=format&fit=crop&w=400&q=80" },
  { id: 2, title: "VOID ODYSSEY", genre: "Sci-Fi", year: "2023", poster: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80" },
  { id: 3, title: "SILENT CODE", genre: "Action", year: "2024", poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80" },
  { id: 4, title: "SYNTHETIC MIND", genre: "Drama", year: "2024", poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80" },
  { id: 5, title: "VELVET ECHOES", genre: "Mystery", year: "2023", poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80" }
];

export default function UserDashboard() {



  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [playlist, setPlaylist] = useState([INITIAL_MOVIES[1]]); // Películas marcadas como favoritas


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
                  <h3>Agregados recientemente</h3>
                  <span className="view-all-link">Ver Todo</span>
                </div>

                <div className="movies-responsive-grid">
                  {INITIAL_MOVIES.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase())).map(movie => (
                    <div key={movie.id} className="movie-showcase-card">
                      <div className="poster-wrapper-area">
                        <img src={movie.poster} alt={movie.title} />
                        <div className="hover-play-layer">
                          <button className="neon-play-btn-card">▶ Ver Ahora</button>
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
                          <span className="tag-year-lbl">{movie.year}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
                        <img src={movie.poster} alt={movie.title} />
                        <div className="hover-play-layer">
                          <button className="neon-play-btn-card">▶ Ver Ahora</button>
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