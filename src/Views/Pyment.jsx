import React, { useState, useEffect, useRef } from 'react';
import './Pyment.css';

export default function PaymentFormV4() {
  const [activeMethod, setActiveMethod] = useState('card');
  const canvasRef = useRef(null);

  // Inicialización del sistema de partículas Cyberpunk en segundo plano
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = Math.random() > 0.5 ? '#ff00ff' : '#00ffff';
        this.opacity = Math.random();
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity * 0.3;
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 150; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMethodChange = (method) => {
    setActiveMethod(method);
  };

  const getButtonText = () => {
    if (activeMethod === 'card') return 'INITIALIZE_PAYMENT';
    if (activeMethod === 'paypal') return 'PROCEED_TO_PAYPAL';
    return 'AUTHENTICATE_MOBILE';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ejecutar lógica de envío o conexión al backend según activeMethod
    console.log(`Procesando pago vía: ${activeMethod}`);
  };

  return (
    <div className="payment-v4-body-wrapper">
      <canvas ref={canvasRef} id="canvas-particles"></canvas>

      {/* Top Navigation */}
      <header className="payment-v4-header">
        <div className="payment-v4-header-left">
          <img alt="FILMICO Logo" className="payment-v4-logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6oyc73sHjiMQWpg0WrS4iwNGSdYjX8RvOCVyfjspDu-BW6CTIRKTqCe1RsS5bdihUs6qTC08HxBzbOhfoHNVc-h-3KJ8nUuJ6kFHhdjovEuFk8VGioyBUa4hb1NCPlCPscWvGuyNdoYUK84PFWfAyT9b-mExOc1lu9OAQ_CBsJkPm6VOAEHyUlqPYGgA-IOAMNpHCyP84yxMyFQKcboIBN9TkJK5lNnV-YW0UUYGnFs8tbndEzIOIEaTkBueO_812" />
          <h1 className="payment-v4-brand-title">Pure Cinema Feel</h1>
        </div>
        <div className="payment-v4-header-right">
          <span className="material-symbols-outlined text-neon-cyan">qr_code_scanner</span>
          <span className="material-symbols-outlined text-on-surface-variant">account_balance_wallet</span>
          <div className="payment-v4-avatar-wrapper">
            <img alt="User HUD Avatar" className="payment-v4-avatar-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLux30X3HmjMezojZLlMKcmNQ1cbLUhA_iVg1K6oB_OXNvkC6vL4I-uiitzZ-lLPYZgigh_ySeNswK-K_MJ_nSCR8l_zaY-HDMrIcgHQuR87Ke4dwgN4fLUwhGLWlglnGsDKnyQ-KInbIWZueaWZL3LjKmHkrcmI8NZnR8P99PdSuM23gU74lsVr1tH43Gtfp05mCAlUdnQdquQcE8gwdhBLYYRhV_djdhy07PiekoTe-x4Oo6SZk" />
          </div>
        </div>
      </header>

      {/* Side Navigation (Desktop) */}
      <aside className="payment-v4-sidebar">
        <div className="payment-v4-sidebar-brand">
          <h3 className="payment-v4-sidebar-title">METODOS DE PAGOS</h3>
          <p className="payment-v4-sidebar-status">STATUS: ENCRYPTED</p>
        </div>
        <nav className="payment-v4-sidebar-nav">
          <a className="payment-v4-nav-item payment-v4-nav-item-active" href="#payment">
            <span className="material-symbols-outlined">payments</span>
            <span>Payment</span>
          </a>
          <a className="payment-v4-nav-item" href="#history">
            <span className="material-symbols-outlined">history</span>
            <span>History</span>
          </a>
          <a className="payment-v4-nav-item" href="#nodes">
            <span className="material-symbols-outlined">hub</span>
            <span>Nodes</span>
          </a>
          <a className="payment-v4-nav-item" href="#security">
            <span className="material-symbols-outlined">security</span>
            <span>Security</span>
          </a>
        </nav>
        <button className="payment-v4-upgrade-btn">UPGRADE PLAN</button>
      </aside>

      {/* Main Content Area */}
      <main className="payment-v4-main-layout">
        <div className="payment-v4-glass-panel">
          <div className="payment-v4-scanline"></div>

          {/* Terminal Header */}
          <div className="payment-v4-terminal-header">
            <div className="payment-v4-terminal-meta">
              <div>
                <p className="payment-v4-label-caps text-neon-cyan">TRANSACTION_ID: 882-XF9</p>
                <h2 className="payment-v4-gateway-title">PAYMENT GATEWAY</h2>
              </div>
              <div className="payment-v4-status-container">
                <p className="payment-v4-label-caps text-outline-variant">STATUS</p>
                <p className="payment-v4-status-indicator">
                  <span className="payment-v4-status-dot"></span>
                  ENCRYPTED
                </p>
              </div>
            </div>
          </div>

          {/* Protocol / Method Selector */}
          <section className="payment-v4-protocol-section">
            <h3 className="payment-v4-label-caps text-on-surface-variant">SELECT_PROTOCOL</h3>
            <div className="payment-v4-method-grid">
              <button
                type="button"
                className={`payment-v4-method-btn ${activeMethod === 'card' ? 'payment-v4-tab-active' : ''}`}
                onClick={() => handleMethodChange('card')}
              >
                <span className="material-symbols-outlined">credit_card</span>
                <span className="payment-v4-label-caps-sub">CREDIT CARD</span>
              </button>
              <button
                type="button"
                className={`payment-v4-method-btn ${activeMethod === 'nequi' ? 'payment-v4-tab-active' : ''}`}
                onClick={() => handleMethodChange('nequi')}
              >
                <span className="material-symbols-outlined">smartphone</span>
                <span className="payment-v4-label-caps-sub">NEQUI</span>
              </button>
              <button
                type="button"
                className={`payment-v4-method-btn ${activeMethod === 'daviplata' ? 'payment-v4-tab-active' : ''}`}
                onClick={() => handleMethodChange('daviplata')}
              >
                <span className="material-symbols-outlined">account_balance</span>
                <span className="payment-v4-label-caps-sub">DAVIPLATA</span>
              </button>
              <button
                type="button"
                className={`payment-v4-method-btn ${activeMethod === 'paypal' ? 'payment-v4-tab-active' : ''}`}
                onClick={() => handleMethodChange('paypal')}
              >
                <span className="material-symbols-outlined">language</span>
                <span className="payment-v4-label-caps-sub">PAYPAL</span>
              </button>
            </div>
          </section>

          {/* Form wrapper encapsulation requirement */}
          <form onSubmit={handleSubmit} className="payment-v4-core-form">
            <div className="payment-v4-dynamic-fields">
              
              {/* Form: Credit Card Inputs */}
              {activeMethod === 'card' && (
                <div className="payment-v4-fields-group">
                  <div className="payment-v4-input-wrapper">
                    <label className="payment-v4-input-label">CARD_NUMBER</label>
                    <input className="payment-v4-input payment-v4-code-font" maxLength="19" placeholder="XXXX XXXX XXXX XXXX" type="text" />
                  </div>
                  <div className="payment-v4-input-wrapper">
                    <label className="payment-v4-input-label">CARDHOLDER_NAME</label>
                    <input className="payment-v4-input payment-v4-code-font payment-v4-uppercase" placeholder="JOSETH PRADA" type="text" />
                  </div>
                  <div className="payment-v4-form-grid-half">
                    <div className="payment-v4-input-wrapper">
                      <label className="payment-v4-input-label">EXP_DATE</label>
                      <input className="payment-v4-input payment-v4-code-font" maxLength="5" placeholder="MM/YY" type="text" />
                    </div>
                    <div className="payment-v4-input-wrapper">
                      <label className="payment-v4-input-label">CVV_SECURE</label>
                      <input className="payment-v4-input payment-v4-code-font" maxLength="4" placeholder="***" type="password" />
                    </div>
                  </div>
                </div>
              )}

              {/* Form: Billeteras Digitales (Nequi / Daviplata) */}
              {(activeMethod === 'nequi' || activeMethod === 'daviplata') && (
                <div className="payment-v4-fields-group">
                  <div className="payment-v4-input-wrapper">
                    <label className="payment-v4-input-label">
                      {activeMethod === 'nequi' ? 'NEQUI_ID' : 'DAVIPLATA_ID'}
                    </label>
                    <div className="payment-v4-phone-field-container">
                      <span className="payment-v4-prefix-badge">+57</span>
                      <input className="payment-v4-input payment-v4-input-with-prefix payment-v4-code-font" maxLength="10" placeholder="300 000 0000" type="tel" />
                    </div>
                    <p className="payment-v4-input-tip">Enter your registered mobile number for authentication.</p>
                  </div>
                </div>
              )}

              {/* Form: PayPal Redirect Screen */}
              {activeMethod === 'paypal' && (
                <div className="payment-v4-paypal-info-box">
                  <span className="material-symbols-outlined text-neon-cyan">info</span>
                  <div>
                    <h4 className="payment-v4-info-title">EXTERNAL REDIRECT</h4>
                    <p className="payment-v4-info-desc">You will be securely redirected to PayPal to complete your purchase. Secure tunnel established.</p>
                  </div>
                </div>
              )}

            </div>

            {/* Actions Panel */}
            <div className="payment-v4-action-container">
              <button className="payment-v4-neon-btn" type="submit">
                <span>{getButtonText()}</span>
                <span className="payment-v4-cursor-blink"></span>
              </button>

              <div className="payment-v4-footer-meta">
                <span className="payment-v4-encryption-tag">
                  <span className="material-symbols-outlined">lock</span> 256-BIT AES
                </span>
                <span>V4.02.9-STABLE</span>
              </div>
            </div>
          </form>
        </div>
      </main>

      {/* Bottom Navigation (Mobile Viewports Only) */}
      <nav className="payment-v4-mobile-navbar">
        <a className="payment-v4-mobile-nav-link payment-v4-mobile-active" href="#pay">
          <span className="material-symbols-outlined">credit_card</span>
          <span className="payment-v4-label-caps-micro">PAY</span>
        </a>
        <a className="payment-v4-mobile-nav-link" href="#methods">
          <span className="material-symbols-outlined">account_tree</span>
          <span className="payment-v4-label-caps-micro">METHODS</span>
        </a>
        <a className="payment-v4-mobile-nav-link" href="#vault">
          <span className="material-symbols-outlined">lock</span>
          <span className="payment-v4-label-caps-micro">VAULT</span>
        </a>
        <a className="payment-v4-mobile-nav-link" href="#settings">
          <span className="material-symbols-outlined">settings_input_component</span>
          <span className="payment-v4-label-caps-micro">SETTINGS</span>
        </a>
      </nav>
    </div>
  );
}