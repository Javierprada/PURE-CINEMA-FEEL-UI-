import React, { useEffect } from 'react';
import './HomePage.css';

function HomePage() {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById('main-header');
      const navWrapper = header?.querySelector('.nav-wrapper');
      
      if (header && navWrapper) {
        if (window.scrollY > 50) {
          navWrapper.style.padding = '10px 0';
          header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5)';
        } else {
          navWrapper.style.padding = '20px 0';
          header.style.boxShadow = 'none';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCardClick = (movieTitle) => {
    console.log(`Opening movie details for: ${movieTitle}`);
  };

  return (
    <div className="homepage-root">
      <header id="main-header">
        <div className="container nav-wrapper">
          <div className="logo-v4">Pure Cinema Feel</div>
          <nav>
            <ul>
              <li><a className="active" href="#">Explorar</a></li>
              <li><a href="#">Películas</a></li>
              <li><a href="#">Estrenos</a></li>
              <li><a href="#">Precios</a></li>
            </ul>
          </nav>
          <div className="header-actions">
            <img alt="Cinema Camera" className="camera-icon" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8ZU5m_WsLiR_NlDQxrgx7HVAY8xUZu3GW_DR0B5Qrs50KkAJ9ZblEo43-X6s4HTxAqZGLvBhL93H4WZdbd-R6mtBpqSl0sFqSEi0MUb2-2l8InIOpUZ_53-PumWxW_oEwYi2xFD5Jjt_AFaV7pLeBcqthMBcHskof_jVwm3JYLyCl-R1LOqcZH4_Ln1BqgGL3brBxp0TiZIPBDji0mfGw3pDKvkPa9_SScUSxXfWx-d7BVY7zzvu8zitnIAsoWQkYB_Ms4ugPgA" />
            <button className="btn-primary">Comenzar</button>
            <span className="material-symbols-outlined account-icon">account_circle</span>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-glow"></div>
          <h1>TRANSMISIÓN ULTRA 4K INMUTABLE.</h1>
          <p>Bienvenido a la zona libre de interrupciones. Transmite tus obras maestras favoritas en 4K nativo con sonido atmosférico envolvente. Dale play y piérdete en la pantalla.<br/>Esto es Pure Cinema Feel.</p>
          <button className="hero-btn">EXPLORA EL CINE</button>
          <div className="scroll-hint">
            <span className="material-symbols-outlined">expand_more</span>
          </div>
        </section>

        <section className="movies container">
          <div className="section-header">
            <h2 className="section-title">Estrenos de Vanguardia</h2>
            
            <div style={{ display: 'flex', gap: '8px' }}> {/*Puntos suspensivos*/}
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-fuchsia)', opacity: 0.8 }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-cyan)', opacity: 0.8 }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-fuchsia)', opacity: 0.8 }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-cyan)', opacity: 0.8 }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-fuchsia)', opacity: 0.8 }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-cyan)', opacity: 0.8 }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-fuchsia)', opacity: 0.8 }}></div>
            </div>
          </div>
          <div className="grid">
            
            {/* Movie Card 1 */}
            <div className="movie-card" onClick={() => handleCardClick('VELVET ECHOES')}>
              <img alt="Velvet Echoes" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnfE5LGTxR6_OnmRVwD32sZaLV_kaAqtr59eEcqjH6z4u6-h8spv-ifct7mxAh9BKPC6iuIFkGApH9Kvw-VHt46BEa1g7v3U6qWcJpL6raqvL6UAOES5OmOQp1iM1SBp1QpI-zP6I6TUaOA_6r95EsItoJo0_1zN8MwEuaRiVVDn5J-F5ck5VIR-hbp8YM6tNq4RHqGfc8laxrBoAPbxlU-NS-v1l7IEAkMYRFg7bzZWkXEawmET3GfojYM2Q1SNXkVYyD1barhA" />
              <div className="card-overlay">
                <div className="card-content">
                  <span className="category neon-text-fuchsia">SCI-FI NOIR</span>
                  <h3 className="movie-title">VELVET ECHOES</h3>
                  <div className="play-link">
                    <span className="material-symbols-outlined">play_circle</span>
                    Ver Trailer
                  </div>
                </div>
              </div>
            </div>

            {/* Movie Card 2 */}
            <div className="movie-card" onClick={() => handleCardClick('DATA BREACH')}>
              <img alt="Data Breach" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7nbQ8N7PRowCEL_SiVT48zRCzgz6j8jh9sH7YdcJr_schPuaie-GzyhwFFwLfr1BHjXtDrPBEEVS46CvALpybd8PRNeFtNj2e-LWtgl9j6QAtSyxzxtoVjgbpLUpMnTkfVc9b3Z6GepF8sEwxfqTw55lwNR6IfVXXR2L1mrgadH1J3yNzMsBLrr7AoSGbOXxG_0WH-yOVqeE7RsikFPDDr8FW1NtMFX49bjd5-CS-Yq9CNxgtOqLs3Ce2lThPC3QoicQoU2zX7g" />
              <div className="card-overlay">
                <div className="card-content">
                  <span className="category neon-text-cyan">CYBER THRILLER</span>
                  <h3 className="movie-title">DATA BREACH</h3>
                  <div className="play-link">
                    <span className="material-symbols-outlined">play_circle</span>
                    Ver Trailer
                  </div>
                </div>
              </div>
            </div>

            {/* Movie Card 3 */}
            <div className="movie-card" onClick={() => handleCardClick('NEON FOREST')}>
              <img alt="Neon Forest" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCU1yYnO2C76rfGCR10gZPoPP4CvYF2I3IXhMcExfhzEeOXGmWdyaQlPLxnSoRB8TbEQSiaADkSkKeTcBni7B9xB5CfW_-PvuXP0iredXD0z7gb0sNThZmda29lnPBcpGuQzSJxDL54zF1I0YKLfOUKntRT1fdLXuI-736db7TVVa9fU8GrWwLIy3OWjqIgAxM4bEx3uYVrwwuLrzn3HvQ1v9FNMKDSWkG3_Y9Knt4eh4xxepYedICF-Gu7U2ZoN8mgdqbBI04iXA" />
              <div className="card-overlay">
                <div className="card-content">
                  <span className="category neon-text-fuchsia">FANTASY</span>
                  <h3 className="movie-title">NEON FOREST</h3>
                  <div className="play-link">
                    <span className="material-symbols-outlined">play_circle</span>
                    Ver Trailer
                  </div>
                </div>
              </div>
            </div>

            {/* Movie Card 4 */}
            <div className="movie-card" onClick={() => handleCardClick('COSMIC PULSE')}>
              <img alt="Cosmic Pulse" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDT6wNfLXT-I5vWXenmrZTwJeZ4jY8A4S6tGeDaPmGdyc8cR27giAs-_0OA6aSQ_zyfE94PtW54auP7II1uFbkNi_WPiAL_hgq2o9F12Wx9zpUQ4FMn_7mftCMUQ30eX7fqVbHnaO-eLCPd9aJ_x0Mvfptn7a-6f1lUYlio9xWu_WnQfvSLOssi5D8aWdQzrTI4vwn8YQ7rFCpDSfMA8DpCLE2ejReZ2IXF7gy-8eRetdalE7VN1zV_eb8IiMwq3rgUIgF9A9XVxA" />
              <div className="card-overlay">
                <div className="card-content">
                  <span className="category neon-text-cyan">DOCUMENTARY</span>
                  <h3 className="movie-title">COSMIC PULSE</h3>
                  <div className="play-link">
                    <span className="material-symbols-outlined">play_circle</span>
                    Ver Trailer
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        <div className="divider"></div>

        <section className="stats container">
          <div className="glass-panel">
            <div className="stat-item">
              <div className="stat-number neon-text-cyan" style={{ color: 'var(--color-cyan)' }}>4K+</div>
              <div className="stat-label">Títulos UHD</div>
            </div>
            <div className="stat-item">
              <div className="stat-number neon-text-fuchsia" style={{ color: 'var(--color-fuchsia)' }}>0ms</div>
              <div className="stat-label">Latencia Stream</div>
            </div>
            <div className="stat-item">
              <div className="stat-number" style={{ color: 'white' }}>24/7</div>
              <div className="stat-label">Cine Inmersivo</div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-wrapper">
          <div className="footer-brand">
            <div className="footer-logo neon-text-fuchsia">Pure Cinema Feel</div>
            <p className="copyright">© 2026 Pure Cinema Feel.<br/>El futuro del cine es hoy.</p>
          </div>
          <div className="footer-links">
            <a href="#">Términos</a>
            <a href="#">Privacidad</a>
            <a href="#">Contacto</a>
            <a href="#">Mi Cuenta</a>
          </div>
          <div className="footer-icons">
            <span className="material-symbols-outlined">language</span>
            <span className="material-symbols-outlined">share</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;

