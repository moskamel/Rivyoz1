import { useEffect, useState, useContext, createContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  HambergerMenu, CloseCircle, Call, Sms, Instagram, Facebook, Sun, Moon
} from 'iconsax-react'

/* ─── Design Tokens ──────────────────────────────────────────── */
export const C_light = {
  orange:      '#E8572A',
  orangeHov:   '#D04B22',
  orangeLight: '#FFF1EC',
  orangeMid:   'rgba(232,87,42,0.12)',
  orangeBorder:'rgba(232,87,42,0.25)',
  navy:        '#1A1A2E',
  navyLight:   '#2A2A45',
  white:       '#FFFFFF',
  gray50:      '#F8F9FA',
  gray100:     '#F1F3F5',
  gray200:     '#E9ECEF',
  gray400:     '#ADB5BD',
  gray600:     '#6C757D',
  gray700:     '#495057',
  gray900:     '#1A1A2E',
  green:       '#198754',
  greenLight:  '#D1E7DD',
  red:         '#DC3545',
  redLight:    '#F8D7DA',
}

export const C_dark = {
  orange:      '#E8572A',
  orangeHov:   '#D04B22',
  orangeLight: 'rgba(232,87,42,0.18)',
  orangeMid:   'rgba(232,87,42,0.15)',
  orangeBorder:'rgba(232,87,42,0.35)',
  navy:        '#EEEDF8',
  navyLight:   '#D0CEF0',
  white:       '#111119',
  gray50:      '#0D0D18',
  gray100:     '#1A1A28',
  gray200:     'rgba(255,255,255,0.1)',
  gray400:     'rgba(255,255,255,0.3)',
  gray600:     '#9A98B8',
  gray700:     '#C4C2DC',
  gray900:     '#EEEDF8',
  green:       '#34D399',
  greenLight:  'rgba(52,211,153,0.15)',
  red:         '#F87171',
  redLight:    'rgba(248,113,113,0.12)',
}

export const LandingThemeCtx = createContext({ C: C_light, isDark: false, toggle: () => {} })

export const F = "'Tajawal', 'Zain', sans-serif"
export const scrollTo = id => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* ─── Global Styles ──────────────────────────────────────────── */
export function GlobalStyles() {
  const { C } = useContext(LandingThemeCtx)
  return (
    <style>{`
      @keyframes fadeUp   { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
      @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
      @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:.5} }
      @keyframes marquee  { from{transform:translateX(0)} to{transform:translateX(-50%)} }
      @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      .fazz-fadeup   { animation: fadeUp 0.55s ease both }
      .fazz-fadein   { animation: fadeIn 0.4s ease both }
      .fazz-float    { animation: float 4s ease-in-out infinite }
      .fazz-btn-primary {
        display:inline-flex; align-items:center; gap:8px;
        background:${C.orange}; color:#fff; border:none;
        font-family:${F}; font-weight:800; font-size:16px;
        border-radius:999px; padding:14px 28px; cursor:pointer;
        transition:background .18s,transform .15s,box-shadow .18s;
        text-decoration:none;
      }
      .fazz-btn-primary:hover { background:${C.orangeHov}; transform:translateY(-2px); box-shadow:0 8px 24px rgba(232,87,42,.35); }
      .fazz-btn-outline {
        display:inline-flex; align-items:center; gap:8px;
        background:transparent; color:${C.navy}; border:2px solid ${C.gray200};
        font-family:${F}; font-weight:700; font-size:15px;
        border-radius:999px; padding:13px 24px; cursor:pointer;
        transition:border-color .18s,color .18s,transform .15s;
        text-decoration:none;
      }
      .fazz-btn-outline:hover { border-color:${C.orange}; color:${C.orange}; transform:translateY(-2px); }
      .fazz-card {
        background:${C.white}; border:1.5px solid ${C.gray200};
        border-radius:16px; transition:border-color .2s, transform .2s, box-shadow .2s;
      }
      .fazz-card:hover { border-color:${C.orangeBorder}; transform:translateY(-4px); box-shadow:0 12px 32px rgba(232,87,42,.10); }
      .fazz-section-badge {
        display:inline-flex; align-items:center; gap:6px;
        background:${C.orangeLight}; color:${C.orange};
        border:1.5px solid ${C.orangeBorder};
        border-radius:999px; padding:4px 14px;
        font-family:${F}; font-size:13px; font-weight:700;
      }
      * { box-sizing:border-box; margin:0; padding:0; }
      html { scroll-behavior: smooth; }
      body { direction:rtl; }
    `}</style>
  )
}

/* ─── Navbar ─────────────────────────────────────────────────── */
export function Navbar() {
  const { C, isDark, toggle } = useContext(LandingThemeCtx)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isLanding = pathname === '/rivyo'

  const [scrolled, setScrolled]    = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: 'المميزات', id: 'features' },
    { label: 'الأسعار',  id: 'pricing'  },
    { label: 'كيف يعمل', id: 'how'     },
  ]

  const handleLink = id => {
    if (isLanding) { scrollTo(id); setMobileOpen(false) }
    else navigate('/rivyo')
  }

  const handleLogo = () => {
    if (isLanding) scrollTo('hero')
    else navigate('/rivyo')
  }

  return (
    <>
      <nav dir="rtl" style={{
        position: 'fixed', top: 0, insetInline: 0, zIndex: 100,
        height: 68,
        background: scrolled ? (isDark ? 'rgba(17,17,25,0.97)' : 'rgba(255,255,255,0.97)') : (isDark ? 'rgba(17,17,25,0.85)' : 'rgba(255,255,255,0.85)'),
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        borderBottom: `1.5px solid ${scrolled ? C.gray200 : 'transparent'}`,
        transition: 'background .3s, border-color .3s, box-shadow .3s',
        boxShadow: scrolled ? '0 2px 16px rgba(26,26,46,.07)' : 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(16px,6vw,80px)',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={handleLogo}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: C.orange, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: F, fontWeight: 900, fontSize: 20, color: '#fff', letterSpacing: '-1px' }}>F</span>
          </div>
          <div>
            <span style={{ fontFamily: F, fontWeight: 900, fontSize: 22, color: C.navy, letterSpacing: '-0.5px' }}>Fazz</span>
            <span style={{ fontFamily: F, fontSize: 11, color: C.gray600, display: 'block', lineHeight: 1, marginTop: 1 }}>فَذّ</span>
          </div>
        </div>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="fazz-desktop-nav">
          {links.map(l => (
            <button key={l.id} onClick={() => handleLink(l.id)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: F, fontWeight: 600, fontSize: 15, color: C.gray700,
              transition: 'color .15s', padding: '4px 0',
            }}
            onMouseEnter={e => e.target.style.color = C.orange}
            onMouseLeave={e => e.target.style.color = C.gray700}
            >{l.label}</button>
          ))}
          <button onClick={() => navigate('/login')} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: F, fontWeight: 600, fontSize: 15, color: C.gray700,
            transition: 'color .15s', padding: '4px 0',
          }}
          onMouseEnter={e => e.target.style.color = C.orange}
          onMouseLeave={e => e.target.style.color = C.gray700}
          >تسجيل الدخول</button>

          <button onClick={toggle} style={{
            width: 36, height: 36, borderRadius: 999,
            background: C.gray100, border: `1.5px solid ${C.gray200}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all .15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = C.orange; e.currentTarget.style.background = C.orangeLight }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = C.gray200; e.currentTarget.style.background = C.gray100 }}
          >
            {isDark ? <Sun size={18} color={C.orange} /> : <Moon size={18} color={C.gray700} />}
          </button>

          <button className="fazz-btn-primary" onClick={() => navigate('/login')}
            style={{ fontSize: 14, padding: '10px 22px' }}>
            ابدأ مجاناً
          </button>
        </div>

        {/* Mobile: toggle + hamburger */}
        <div style={{ display: 'none', alignItems: 'center', gap: 8 }} className="fazz-mobile-right">
          <button onClick={toggle} style={{
            width: 34, height: 34, borderRadius: 999,
            background: C.gray100, border: `1.5px solid ${C.gray200}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}>
            {isDark ? <Sun size={16} color={C.orange} /> : <Moon size={16} color={C.gray700} />}
          </button>
          <button onClick={() => setMobileOpen(o => !o)} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 4,
          }} className="fazz-mobile-menu-btn">
            {mobileOpen
              ? <CloseCircle size={28} color={C.navy} />
              : <HambergerMenu size={28} color={C.navy} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div dir="rtl" style={{
          position: 'fixed', top: 68, insetInline: 0, zIndex: 99,
          background: C.white, borderBottom: `1.5px solid ${C.gray200}`,
          padding: '20px 24px 28px', display: 'flex', flexDirection: 'column', gap: 4,
          boxShadow: '0 8px 32px rgba(26,26,46,.12)',
        }}>
          {links.map(l => (
            <button key={l.id} onClick={() => handleLink(l.id)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: F, fontWeight: 700, fontSize: 17, color: C.navy,
              textAlign: 'right', padding: '12px 0',
              borderBottom: `1px solid ${C.gray100}`,
            }}>{l.label}</button>
          ))}
          <button onClick={() => { navigate('/login'); setMobileOpen(false) }} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: F, fontWeight: 700, fontSize: 17, color: C.navy,
            textAlign: 'right', padding: '12px 0',
            borderBottom: `1px solid ${C.gray100}`,
          }}>تسجيل الدخول</button>
          <button className="fazz-btn-primary" onClick={() => { navigate('/login'); setMobileOpen(false) }}
            style={{ marginTop: 12, width: '100%', justifyContent: 'center', fontSize: 16, padding: '14px' }}>
            ابدأ مجاناً
          </button>
        </div>
      )}

      <style>{`
        @media (max-width:768px) {
          .fazz-desktop-nav { display:none !important; }
          .fazz-mobile-right { display:flex !important; }
          .fazz-mobile-menu-btn { display:flex !important; }
        }
      `}</style>
    </>
  )
}

/* ─── Footer ─────────────────────────────────────────────────── */
export function Footer() {
  const { C } = useContext(LandingThemeCtx)
  const navigate = useNavigate()
  return (
    <footer dir="rtl" style={{
      background: C.white,
      borderTop: `1.5px solid ${C.gray200}`,
      padding: 'clamp(40px,5vw,64px) clamp(16px,6vw,80px)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 40 }}>

          {/* Brand */}
          <div style={{ maxWidth: 280 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, cursor: 'pointer' }} onClick={() => navigate('/rivyo')}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: C.orange, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: F, fontWeight: 900, fontSize: 20, color: '#fff' }}>F</span>
              </div>
              <div>
                <span style={{ fontFamily: F, fontWeight: 900, fontSize: 20, color: C.navy }}>Fazz</span>
                <span style={{ fontFamily: F, fontSize: 11, color: C.gray600, display: 'block', lineHeight: 1, marginTop: 1 }}>فَذّ</span>
              </div>
            </div>
            <p style={{ fontFamily: F, fontSize: 14, color: C.gray600, lineHeight: 1.8, margin: '0 0 20px' }}>
              منصة الطلبات المستقلة للمطاعم المصرية — امتلك مطعمك الرقمي بدون عمولة
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { Icon: Call,      href: 'tel:+201000000000' },
                { Icon: Sms,       href: 'mailto:hello@fazz.app' },
                { Icon: Instagram, href: '#' },
                { Icon: Facebook,  href: '#' },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} style={{
                  width: 38, height: 38, borderRadius: 999,
                  background: C.gray100, border: `1.5px solid ${C.gray200}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  textDecoration: 'none', transition: 'border-color .15s, background .15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.orange; e.currentTarget.style.background = C.orangeLight }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.gray200; e.currentTarget.style.background = C.gray100 }}
                >
                  <Icon size={18} color={C.gray700} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontFamily: F, fontWeight: 800, fontSize: 14, color: C.navy, marginBottom: 16 }}>المنتج</p>
              {[
                ['المميزات',  'features'],
                ['الأسعار',   'pricing'],
                ['كيف يعمل', 'how'],
              ].map(([label, id]) => (
                <div key={id} style={{ marginBottom: 12 }}>
                  <button onClick={() => navigate('/rivyo')} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: F, fontSize: 14, color: C.gray600, padding: 0,
                    transition: 'color .15s',
                  }}
                  onMouseEnter={e => e.target.style.color = C.orange}
                  onMouseLeave={e => e.target.style.color = C.gray600}
                  >{label}</button>
                </div>
              ))}
            </div>
            <div>
              <p style={{ fontFamily: F, fontWeight: 800, fontSize: 14, color: C.navy, marginBottom: 16 }}>الحساب</p>
              {['تسجيل الدخول', 'إنشاء حساب مجاني'].map(l => (
                <div key={l} style={{ marginBottom: 12 }}>
                  <button onClick={() => navigate('/login')} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: F, fontSize: 14, color: C.gray600, padding: 0,
                    transition: 'color .15s',
                  }}
                  onMouseEnter={e => e.target.style.color = C.orange}
                  onMouseLeave={e => e.target.style.color = C.gray600}
                  >{l}</button>
                </div>
              ))}
            </div>
            <div>
              <p style={{ fontFamily: F, fontWeight: 800, fontSize: 14, color: C.navy, marginBottom: 16 }}>تواصل معنا</p>
              <div style={{ fontFamily: F, fontSize: 14, color: C.gray600, lineHeight: 2.2 }}>
                <div>📞 ٠١٠٠٠٠٠٠٠٠٠</div>
                <div>📧 hello@fazz.app</div>
                <div style={{ marginTop: 4 }}>
                  <a href="https://wa.me/201000000000" target="_blank" rel="noopener noreferrer"
                    style={{ color: '#25D366', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    💬 واتساب مباشر
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{
          paddingTop: 24, borderTop: `1.5px solid ${C.gray200}`,
          display: 'flex', gap: 12, justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap',
        }}>
          <span style={{ fontFamily: F, fontSize: 13, color: C.gray600 }}>© 2025 Fazz — جميع الحقوق محفوظة</span>
          <div style={{ display: 'flex', gap: 20 }}>
            {[
              { label: 'سياسة الخصوصية', path: '/privacy' },
              { label: 'شروط الاستخدام',  path: '/terms'   },
              { label: 'عن المنصة',        path: '/about'   },
            ].map(({ label, path }) => (
              <button key={path} onClick={() => navigate(path)} style={{ background: 'none', border: 'none', padding: 0, fontFamily: F, fontSize: 13, color: C.gray600, cursor: 'pointer', transition: 'color .15s' }}
                onMouseEnter={e => e.target.style.color = C.orange}
                onMouseLeave={e => e.target.style.color = C.gray600}
              >{label}</button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─── Page Wrapper ───────────────────────────────────────────── */
export function LandingPageWrapper({ children, title }) {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('c_theme') === 'dark')

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    localStorage.setItem('c_theme', next ? 'dark' : 'light')
  }

  const C = isDark ? C_dark : C_light

  useEffect(() => {
    if (title) document.title = title
    window.scrollTo(0, 0)
  }, [title])

  return (
    <LandingThemeCtx.Provider value={{ C, isDark, toggle }}>
      <GlobalStyles />
      <div dir="rtl" style={{ background: C.white, minHeight: '100vh', fontFamily: F, overflowX: 'hidden' }}>
        <Navbar />
        <div style={{ paddingTop: 68 }}>
          {children}
        </div>
        <Footer />
      </div>
    </LandingThemeCtx.Provider>
  )
}
