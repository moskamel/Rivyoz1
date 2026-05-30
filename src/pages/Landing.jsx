import { useEffect, useRef, useState, useContext, createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Global, Scan, Notification, Category, Star1, Shop,
  ArrowLeft2, ArrowRight2, TickCircle, HambergerMenu, CloseCircle,
  Call, Sms, Instagram, Facebook, Sun, Moon
} from 'iconsax-react'

/* ─── Design Tokens ─────────────────────────────────────────── */
const C_light = {
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

const C_dark = {
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

const LandingThemeCtx = createContext({ C: C_light, isDark: false, toggle: () => {} })

const F = "'Tajawal', 'Zain', sans-serif"
const scrollTo = id => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* ─── Global Styles ──────────────────────────────────────────── */
const GlobalStyles = () => {
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
        border-radius:12px; padding:14px 28px; cursor:pointer;
        transition:background .18s,transform .15s,box-shadow .18s;
        text-decoration:none;
      }
      .fazz-btn-primary:hover { background:${C.orangeHov}; transform:translateY(-2px); box-shadow:0 8px 24px rgba(232,87,42,.35); }
      .fazz-btn-outline {
        display:inline-flex; align-items:center; gap:8px;
        background:transparent; color:${C.navy}; border:2px solid ${C.gray200};
        font-family:${F}; font-weight:700; font-size:15px;
        border-radius:12px; padding:13px 24px; cursor:pointer;
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
function Navbar() {
  const { C, isDark, toggle } = useContext(LandingThemeCtx)
  const navigate = useNavigate()
  const [scrolled, setScrolled]   = useState(false)
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
        padding: '0 clamp(16px,5vw,72px)',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => scrollTo('hero')}>
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
            <button key={l.id} onClick={() => scrollTo(l.id)} style={{
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

          {/* Dark/Light toggle */}
          <button onClick={toggle} style={{
            width: 36, height: 36, borderRadius: 10,
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
            style={{ fontSize: 14, padding: '10px 22px', borderRadius: 10 }}>
            ابدأ مجاناً
          </button>
        </div>

        {/* Mobile: toggle + hamburger */}
        <div style={{ display: 'none', alignItems: 'center', gap: 8 }} className="fazz-mobile-right">
          <button onClick={toggle} style={{
            width: 34, height: 34, borderRadius: 10,
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
            <button key={l.id} onClick={() => { scrollTo(l.id); setMobileOpen(false) }} style={{
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

/* ─── Dashboard Mockup ───────────────────────────────────────── */
function DashboardMockup() {
  const { C } = useContext(LandingThemeCtx)
  const orders = [
    { id: '#٢١٤', item: 'كفتة مشوية × ٢',  status: 'جديد',      dot: C.orange },
    { id: '#٢١٣', item: 'شاورما دجاج',     status: 'تحضير',     dot: '#3B82F6' },
    { id: '#٢١٢', item: 'بيتزا مارغريتا', status: 'جاهز ✓',    dot: C.green },
  ]
  return (
    <div className="fazz-float" style={{
      background: C_dark.gray50,
      borderRadius: 20,
      padding: 20,
      width: '100%',
      maxWidth: 380,
      boxShadow: '0 24px 64px rgba(26,26,46,.45)',
      position: 'relative',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <p style={{ fontFamily: F, fontSize: 11, color: 'rgba(255,255,255,.5)', fontWeight: 500 }}>لوحة التحكم</p>
          <p style={{ fontFamily: F, fontSize: 16, fontWeight: 800, color: '#fff', marginTop: 2 }}>مطعم الشيف كريم</p>
        </div>
        <div style={{ background: C.orange, borderRadius: 10, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff', display: 'inline-block' }} />
          <span style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: '#fff' }}>مفتوح</span>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 18 }}>
        {[
          { label: 'طلبات اليوم', val: '٣٢' },
          { label: 'المبيعات',    val: '١٨٤٠ج' },
          { label: 'متوسط الطلب', val: '٥٧ج' },
        ].map((s, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,.06)', borderRadius: 12, padding: '10px 12px' }}>
            <p style={{ fontFamily: F, fontSize: 10, color: 'rgba(255,255,255,.5)', marginBottom: 4 }}>{s.label}</p>
            <p style={{ fontFamily: F, fontSize: 15, fontWeight: 800, color: '#fff' }}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* Orders list */}
      <div style={{ background: 'rgba(255,255,255,.04)', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
          <p style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,.7)' }}>الطلبات الحالية</p>
        </div>
        {orders.map((o, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '11px 14px',
            borderBottom: i < orders.length - 1 ? '1px solid rgba(255,255,255,.04)' : 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: o.dot, display: 'inline-block', flexShrink: 0 }} />
              <div>
                <p style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: '#fff' }}>{o.item}</p>
                <p style={{ fontFamily: F, fontSize: 10, color: 'rgba(255,255,255,.4)', marginTop: 1 }}>{o.id}</p>
              </div>
            </div>
            <span style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: o.dot, background: `${o.dot}22`, padding: '3px 10px', borderRadius: 999 }}>{o.status}</span>
          </div>
        ))}
      </div>

      {/* Floating badge */}
      <div style={{
        position: 'absolute', top: -14, left: -14,
        background: C.white, border: `1.5px solid ${C.gray200}`,
        borderRadius: 12, padding: '8px 14px',
        display: 'flex', alignItems: 'center', gap: 8,
        boxShadow: '0 4px 16px rgba(26,26,46,.12)',
      }}>
        <span style={{ fontSize: 18 }}>🎉</span>
        <div>
          <p style={{ fontFamily: F, fontSize: 10, color: C.gray600 }}>وفّرت الشهر ده</p>
          <p style={{ fontFamily: F, fontSize: 15, fontWeight: 800, color: C.green }}>١٢٠٠ ج عمولة</p>
        </div>
      </div>

      {/* Notification badge */}
      <div style={{
        position: 'absolute', bottom: -16, right: -16,
        background: C.orange, borderRadius: 12, padding: '8px 14px',
        display: 'flex', alignItems: 'center', gap: 6,
        boxShadow: '0 4px 16px rgba(232,87,42,.4)',
      }}>
        <Notification size={16} color="#fff" variant="Bold" />
        <span style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: '#fff' }}>طلب جديد!</span>
      </div>
    </div>
  )
}

/* ─── Hero ───────────────────────────────────────────────────── */
function Hero() {
  const { C } = useContext(LandingThemeCtx)
  const navigate = useNavigate()
  const badges = ['✓ لا عمولة', '✓ موقع خاص بك', '✓ QR Code جاهز']

  return (
    <section id="hero" dir="rtl" style={{
      minHeight: '100vh',
      background: `linear-gradient(160deg, ${C.white} 55%, ${C.orangeLight} 100%)`,
      display: 'flex', alignItems: 'center',
      padding: 'clamp(96px,12vw,140px) clamp(16px,6vw,80px) clamp(64px,8vw,100px)',
    }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', gap: 'clamp(32px,5vw,72px)', flexWrap: 'wrap' }}>

        {/* Text column */}
        <div style={{ flex: '1 1 400px', minWidth: 0 }}>
          <div className="fazz-section-badge fazz-fadeup" style={{ marginBottom: 24 }}>
            🚀 منصة الطلبات المستقلة رقم ١ في مصر
          </div>

          <h1 className="fazz-fadeup" style={{
            fontFamily: F, fontWeight: 900,
            fontSize: 'clamp(32px,4.5vw,58px)',
            color: C.navy, lineHeight: 1.2, letterSpacing: '-1px',
            margin: '0 0 20px',
            animationDelay: '.08s',
          }}>
            وفّر عمولتك —<br />
            <span style={{ color: C.orange }}>امتلك مطعمك الرقمي</span>
          </h1>

          <p className="fazz-fadeup" style={{
            fontFamily: F, fontSize: 'clamp(15px,2vw,19px)',
            color: C.gray600, lineHeight: 1.85,
            margin: '0 0 36px', maxWidth: 520,
            animationDelay: '.16s',
          }}>
            بدون عمولة. بدون تبعية. فقط موقعك الخاص وزبائنك وأرباحك — كلها في يدك من النهارده.
          </p>

          <div className="fazz-fadeup" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 32, animationDelay: '.24s' }}>
            <button className="fazz-btn-primary" onClick={() => navigate('/login')}
              style={{ fontSize: 16, padding: '15px 32px' }}>
              ابدأ مجاناً — ١٤ يوم <ArrowLeft2 size={18} />
            </button>
            <button className="fazz-btn-outline" onClick={() => scrollTo('how')}>
              شوف بيشتغل إزاي
            </button>
          </div>

          <div className="fazz-fadeup" style={{ display: 'flex', gap: 20, flexWrap: 'wrap', animationDelay: '.32s' }}>
            {badges.map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <TickCircle size={17} color={C.green} variant="Bold" />
                <span style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: C.gray700 }}>{b.replace('✓ ', '')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mockup column */}
        <div style={{ flex: '1 1 320px', minWidth: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 32 }}>
          <DashboardMockup />
        </div>
      </div>
    </section>
  )
}

/* ─── Pain Section ───────────────────────────────────────────── */
function PainSection() {
  const { C } = useContext(LandingThemeCtx)
  const [monthly, setMonthly] = useState(30)
  const [avg, setAvg]         = useState(80)
  const commission = Math.round(monthly * avg * 30 * 0.20)
  const fazzCost   = 500

  return (
    <section dir="rtl" style={{ padding: 'clamp(64px,8vw,100px) clamp(16px,6vw,80px)', background: C.gray50 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div className="fazz-section-badge" style={{ marginBottom: 16 }}>💸 المشكلة</div>
          <h2 style={{ fontFamily: F, fontWeight: 900, fontSize: 'clamp(26px,4vw,44px)', color: C.navy, letterSpacing: '-0.5px', margin: '0 0 12px' }}>
            بتدفع كام عمولة كل شهر؟
          </h2>
          <p style={{ fontFamily: F, fontSize: 16, color: C.gray600, maxWidth: 520, margin: '0 auto' }}>
            تطبيقات الطلبات بتاخد ٢٠٪ من كل طلب — وانت بتدفع وهم بيكسبوا
          </p>
        </div>

        {/* Comparison */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20, marginBottom: 48 }}>
          {/* Old way */}
          <div style={{ background: C_dark.gray50, borderRadius: 20, padding: 32, color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>😤</div>
              <div>
                <p style={{ fontFamily: F, fontWeight: 800, fontSize: 17, color: '#fff' }}>مع تطبيقات الطلبات</p>
                <p style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,.5)' }}>الطريقة القديمة</p>
              </div>
            </div>
            {[
              'عمولة ٢٠٪ على كل طلب',
              'بياناتك وزبائنك ليهم',
              'تصميمهم — مش تصميمك',
              'قواعدهم — أنت تتبعها',
              'يحذفوك امتى ما شاؤوا',
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#DC354522', border: '1.5px solid #DC354555', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: '#DC3545', fontSize: 12, fontWeight: 900 }}>✕</span>
                </div>
                <span style={{ fontFamily: F, fontSize: 14, color: 'rgba(255,255,255,.75)' }}>{t}</span>
              </div>
            ))}
          </div>

          {/* Fazz way */}
          <div style={{ background: C.white, border: `2.5px solid ${C.orange}`, borderRadius: 20, padding: 32, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: C.orange }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: C.orangeLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🚀</div>
              <div>
                <p style={{ fontFamily: F, fontWeight: 800, fontSize: 17, color: C.navy }}>مع Fazz</p>
                <p style={{ fontFamily: F, fontSize: 12, color: C.orange, fontWeight: 600 }}>الطريقة الذكية</p>
              </div>
            </div>
            {[
              'صفر عمولة — ٠٪ على كل طلب',
              'بياناتك وزبائنك ليك أنت',
              'تصميمك وهويتك الخاصة',
              'استقلالية كاملة',
              'موقعك — لا أحد يحذفك',
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <TickCircle size={22} color={C.green} variant="Bold" style={{ flexShrink: 0 }} />
                <span style={{ fontFamily: F, fontSize: 14, color: C.gray700, fontWeight: 600 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Calculator */}
        <div style={{ background: C.white, border: `1.5px solid ${C.gray200}`, borderRadius: 20, padding: 'clamp(24px,4vw,40px)', maxWidth: 680, margin: '0 auto' }}>
          <h3 style={{ fontFamily: F, fontWeight: 800, fontSize: 20, color: C.navy, textAlign: 'center', margin: '0 0 28px' }}>
            احسب كم بتخسر كل شهر 👇
          </h3>
          {[
            { label: 'عدد الطلبات في اليوم', val: monthly, set: setMonthly, min: 5, max: 200, unit: 'طلب' },
            { label: 'متوسط قيمة الطلب',     val: avg,     set: setAvg,     min: 30, max: 400, unit: 'ج' },
          ].map((s, i) => (
            <div key={i} style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: C.gray700 }}>{s.label}</span>
                <span style={{ fontFamily: F, fontSize: 15, fontWeight: 800, color: C.orange }}>{s.val} {s.unit}</span>
              </div>
              <input type="range" min={s.min} max={s.max} value={s.val} onChange={e => s.set(+e.target.value)}
                style={{ width: '100%', accentColor: C.orange, height: 4, cursor: 'pointer' }} />
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 8 }}>
            <div style={{ background: C.redLight, border: `1.5px solid rgba(220,53,69,.25)`, borderRadius: 14, padding: '18px 20px', textAlign: 'center' }}>
              <p style={{ fontFamily: F, fontSize: 12, color: C.red, marginBottom: 6, fontWeight: 600 }}>عمولتك الشهرية المهدرة</p>
              <p style={{ fontFamily: F, fontSize: 26, fontWeight: 900, color: C.red }}>{commission.toLocaleString('ar-EG')} ج</p>
            </div>
            <div style={{ background: C.greenLight, border: `1.5px solid rgba(25,135,84,.25)`, borderRadius: 14, padding: '18px 20px', textAlign: 'center' }}>
              <p style={{ fontFamily: F, fontSize: 12, color: C.green, marginBottom: 6, fontWeight: 600 }}>توفيرك مع Fazz شهرياً</p>
              <p style={{ fontFamily: F, fontSize: 26, fontWeight: 900, color: C.green }}>{Math.max(0, commission - fazzCost).toLocaleString('ar-EG')} ج</p>
            </div>
          </div>
          <p style={{ fontFamily: F, fontSize: 13, color: C.gray600, textAlign: 'center', marginTop: 14 }}>
            اشتراك Fazz Pro = ٥٠٠ ج/شهر فقط 💪
          </p>
        </div>
      </div>
    </section>
  )
}

/* ─── How It Works ───────────────────────────────────────────── */
function HowItWorks() {
  const { C } = useContext(LandingThemeCtx)
  const navigate = useNavigate()
  const steps = [
    {
      num: '١',
      icon: '🎉',
      title: 'اشترك مجاناً',
      desc: 'اعمل حسابك في دقيقتين — اسم مطعمك وبياناتك الأساسية وتبدأ فوراً بدون أي تنزيل أو تثبيت',
    },
    {
      num: '٢',
      icon: '🎨',
      title: 'خصّص موقعك',
      desc: 'أضف قائمتك باللون والصورة والسعر، واختار هوية مطعمك — الألوان، اللوجو، وطريقة العرض',
    },
    {
      num: '٣',
      icon: '📲',
      title: 'شارك QR Code',
      desc: 'اطبع الكود على المناشير والمنيو — وابدأ تستقبل طلبات ودفع مباشرة في جيبك',
    },
  ]

  return (
    <section id="how" dir="rtl" style={{
      padding: 'clamp(64px,8vw,100px) clamp(16px,6vw,80px)',
      background: C.white,
      borderTop: `1.5px solid ${C.gray200}`,
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="fazz-section-badge" style={{ marginBottom: 16 }}>⚡ كيف يعمل</div>
          <h2 style={{ fontFamily: F, fontWeight: 900, fontSize: 'clamp(26px,4vw,44px)', color: C.navy, letterSpacing: '-0.5px', margin: '0 0 12px' }}>
            ٣ خطوات بسيطة — وانت جاهز
          </h2>
          <p style={{ fontFamily: F, fontSize: 16, color: C.gray600 }}>
            بدون تعقيد ولا تدريب مطوّل — Fazz مصمم عشان تشتغل بيه من أول يوم
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 24, position: 'relative' }}>
          {steps.map((s, i) => (
            <div key={i} style={{ position: 'relative' }}>
              {i < steps.length - 1 && (
                <div style={{
                  position: 'absolute', top: 32, left: '-12%',
                  width: '24%', height: 2,
                  background: `linear-gradient(90deg, ${C.orangeBorder}, transparent)`,
                  zIndex: 0, display: 'block',
                }} />
              )}
              <div className="fazz-card" style={{ padding: '32px 28px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: C.orange, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Inter', sans-serif", fontWeight: 900, fontSize: 22,
                  margin: '0 auto 18px',
                  boxShadow: `0 8px 24px ${C.orangeBorder}`,
                }}>{s.num}</div>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{s.icon}</div>
                <h3 style={{ fontFamily: F, fontWeight: 800, fontSize: 19, color: C.navy, margin: '0 0 10px' }}>{s.title}</h3>
                <p style={{ fontFamily: F, fontSize: 14, color: C.gray600, lineHeight: 1.8, margin: 0 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 44 }}>
          <button className="fazz-btn-primary" onClick={() => navigate('/login')}
            style={{ fontSize: 16, padding: '15px 40px' }}>
            ابدأ مجاناً دلوقتي <ArrowLeft2 size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}

/* ─── Features Grid ──────────────────────────────────────────── */
function FeaturesGrid() {
  const { C } = useContext(LandingThemeCtx)
  const features = [
    { Icon: Global, title: 'موقع خاص بتصميمك', desc: 'موقعك على الإنترنت بعنوانك الخاص — هويتك، ألوانك، طريقتك — مش تصميم تطبيق تاني' },
    { Icon: Scan, title: 'QR Code جاهز للطباعة', desc: 'اطبعه على المنيو والطاولات — عميلك يمسح ويطلب ويدفع من موبايله في ثوانٍ' },
    { Icon: Notification, title: 'استقبال طلبات لحظي', desc: 'كل طلب جديد بيوصلك فوري — صوت، إشعار، وبيظهر في لوحة التحكم مباشرة' },
    { Icon: Category, title: 'لوحة تحكم شاملة', desc: 'إحصائيات، تقارير، تاريخ الطلبات، وإدارة القائمة — كل حاجة من مكان واحد' },
    { Icon: Star1, title: 'برنامج ولاء للزبائن', desc: 'نقاط وهدايا لزبائنك الدايمين — خليهم يرجعوا تاني ويجيبوا معاهم ناس' },
    { Icon: Shop, title: 'ماركتبليس موحد', desc: 'مطعمك بيظهر في قائمة Fazz للزبائن الجدد — مبيعات إضافية بدون مجهود' },
  ]

  return (
    <section id="features" dir="rtl" style={{
      padding: 'clamp(64px,8vw,100px) clamp(16px,6vw,80px)',
      background: C.gray50,
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div className="fazz-section-badge" style={{ marginBottom: 16 }}>✨ المميزات</div>
          <h2 style={{ fontFamily: F, fontWeight: 900, fontSize: 'clamp(26px,4vw,44px)', color: C.navy, letterSpacing: '-0.5px', margin: '0 0 12px' }}>
            كل اللي محتاجه في مكان واحد
          </h2>
          <p style={{ fontFamily: F, fontSize: 16, color: C.gray600 }}>
            من الطلب للتوصيل — Fazz بيغطي كل جزء من تجربة مطعمك الرقمي
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20 }}>
          {features.map(({ Icon, title, desc }, i) => (
            <div key={i} className="fazz-card" style={{ padding: '28px 24px' }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: C.orangeLight, border: `1.5px solid ${C.orangeBorder}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 18,
              }}>
                <Icon size={26} color={C.orange} />
              </div>
              <h3 style={{ fontFamily: F, fontWeight: 800, fontSize: 17, color: C.navy, margin: '0 0 8px' }}>{title}</h3>
              <p style={{ fontFamily: F, fontSize: 14, color: C.gray600, lineHeight: 1.8, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Pricing ────────────────────────────────────────────────── */
function Pricing() {
  const { C } = useContext(LandingThemeCtx)
  const navigate = useNavigate()
  const plans = [
    {
      name: 'المجاني',
      price: 0,
      badge: null,
      featured: false,
      desc: 'ابدأ وجرّب بدون أي التزام',
      cta: 'ابدأ مجاناً',
      features: [
        'قائمة رقمية كاملة',
        'حتى ٣٠ طلب يومياً',
        'QR Code قابل للطباعة',
        'صفحة مطعم جاهزة',
        'دعم بريد إلكتروني',
      ],
    },
    {
      name: 'Pro',
      price: 500,
      badge: 'الأكثر شيوعاً',
      featured: true,
      desc: 'لمطعم شغال وعايز ينمو ويبقى مستقل',
      cta: 'ابدأ الـ Pro',
      features: [
        'طلبات غير محدودة — صفر عمولة',
        'ماركتبليس Fazz الموحد',
        'برنامج ولاء للزبائن',
        'تقارير مبيعات متقدمة',
        'إشعارات واتساب للزبائن',
        'دعم ٧ أيام / ٢٤ ساعة',
        'دومين خاص بمطعمك',
        'تخصيص كامل للهوية',
      ],
    },
  ]

  return (
    <section id="pricing" dir="rtl" style={{
      padding: 'clamp(64px,8vw,100px) clamp(16px,6vw,80px)',
      background: C.white,
      borderTop: `1.5px solid ${C.gray200}`,
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div className="fazz-section-badge" style={{ marginBottom: 16 }}>💰 الأسعار</div>
          <h2 style={{ fontFamily: F, fontWeight: 900, fontSize: 'clamp(26px,4vw,44px)', color: C.navy, letterSpacing: '-0.5px', margin: '0 0 12px' }}>
            سعر واضح. بدون مفاجآت.
          </h2>
          <p style={{ fontFamily: F, fontSize: 16, color: C.gray600 }}>
            ابدأ مجاناً — ادفع بالجنيه المصري — ألغي امتى ما تحب
          </p>
        </div>

        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'stretch' }}>
          {plans.map((p, i) => (
            <div key={i} style={{
              flex: '1 1 300px', maxWidth: 400,
              background: p.featured ? C_dark.gray50 : C.white,
              border: p.featured ? `2.5px solid ${C.orange}` : `1.5px solid ${C.gray200}`,
              borderRadius: 20,
              padding: '36px 32px',
              position: 'relative',
              boxShadow: p.featured ? `0 20px 48px rgba(26,26,46,.2)` : 'none',
              transition: 'transform .2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {p.badge && (
                <div style={{
                  position: 'absolute', top: -14, right: 28,
                  background: C.orange, borderRadius: 999,
                  padding: '4px 18px',
                  fontFamily: F, fontSize: 12, fontWeight: 800, color: '#fff',
                }}>{p.badge}</div>
              )}

              <h3 style={{ fontFamily: F, fontWeight: 800, fontSize: 20, color: p.featured ? '#fff' : C.navy, margin: '0 0 4px' }}>{p.name}</h3>
              <p style={{ fontFamily: F, fontSize: 13, color: p.featured ? 'rgba(255,255,255,.6)' : C.gray600, margin: '0 0 22px' }}>{p.desc}</p>

              <div style={{ margin: '0 0 28px' }}>
                {p.price === 0
                  ? <span style={{ fontFamily: F, fontWeight: 900, fontSize: 40, color: p.featured ? '#fff' : C.navy }}>مجاني</span>
                  : <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                      <span style={{ fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: 46, color: C.orange }}>{p.price}</span>
                      <span style={{ fontFamily: F, fontSize: 16, color: p.featured ? 'rgba(255,255,255,.7)' : C.gray600 }}>ج / شهر</span>
                    </div>
                }
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
                {p.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <TickCircle size={19} color={p.featured ? C.orange : C.green} variant="Bold" style={{ flexShrink: 0 }} />
                    <span style={{ fontFamily: F, fontSize: 14, color: p.featured ? 'rgba(255,255,255,.82)' : C.gray700 }}>{f}</span>
                  </div>
                ))}
              </div>

              <button
                className={p.featured ? 'fazz-btn-primary' : 'fazz-btn-outline'}
                onClick={() => navigate('/login')}
                style={{ width: '100%', justifyContent: 'center', fontSize: 15, padding: '14px' }}>
                {p.cta}
              </button>
            </div>
          ))}
        </div>

        <p style={{ fontFamily: F, fontSize: 13, color: C.gray600, textAlign: 'center', marginTop: 28 }}>
          ✓ بدون رسوم خفية &nbsp;•&nbsp; ✓ إلغاء في أي وقت &nbsp;•&nbsp; ✓ الدفع بفوري أو فودافون كاش أو InstaPay
        </p>
      </div>
    </section>
  )
}

/* ─── Testimonials ───────────────────────────────────────────── */
function Testimonials() {
  const { C } = useContext(LandingThemeCtx)
  const [active, setActive] = useState(0)
  const testimonials = [
    {
      quote: 'من أول ما اشتركت في Fazz بطلت أدفع ٢٠٪ عمولة. في أول شهر وفّرت أكتر من ١٥٠٠ جنيه. الموقع سهل جداً وعملائي بيحبوا يطلبوا منه.',
      name: 'محمد الغزالي',
      restaurant: 'مطعم كبابجي مدينة نصر',
      stars: 5,
    },
    {
      quote: 'كنت خايفة إن الإعداد يكون معقد. في ساعة واحدة مطعمي كان أون لاين. دلوقتي QR Code على كل طاولة وعملائي بيطلبوا من موبايلهم.',
      name: 'نرمين حسن',
      restaurant: 'كافيه ويف — الإسكندرية',
      stars: 5,
    },
    {
      quote: 'عندي ٣ فروع وFazz بيخليني أتابعهم كلهم من شاشة واحدة. التقارير اليومية واضحة والأرباح بيّنة. أنصح أي صاحب مطعم يجرب.',
      name: 'كريم وهبي',
      restaurant: 'سلسلة شاورما كروز',
      stars: 5,
    },
  ]

  const prev = () => setActive(a => (a - 1 + testimonials.length) % testimonials.length)
  const next = () => setActive(a => (a + 1) % testimonials.length)

  return (
    <section dir="rtl" style={{
      padding: 'clamp(64px,8vw,100px) clamp(16px,6vw,80px)',
      background: C.gray50,
      borderTop: `1.5px solid ${C.gray200}`,
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="fazz-section-badge" style={{ marginBottom: 16 }}>⭐ آراء العملاء</div>
          <h2 style={{ fontFamily: F, fontWeight: 900, fontSize: 'clamp(26px,4vw,44px)', color: C.navy, letterSpacing: '-0.5px', margin: '0 0 12px' }}>
            مطاعم بتثق في Fazz
          </h2>
        </div>

        {/* Slider */}
        <div style={{ position: 'relative' }}>
          <div style={{
            background: C.white, border: `1.5px solid ${C.gray200}`,
            borderRadius: 20, padding: 'clamp(28px,5vw,48px)',
            minHeight: 260,
          }}>
            <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
              {Array.from({ length: testimonials[active].stars }).map((_, i) => (
                <Star1 key={i} size={20} color="#FBBF24" variant="Bold" />
              ))}
            </div>
            <p style={{
              fontFamily: F, fontSize: 'clamp(15px,2vw,18px)', fontWeight: 500,
              color: C.gray700, lineHeight: 1.85, margin: '0 0 28px',
              borderRight: `4px solid ${C.orange}`, paddingRight: 16,
            }}>
              "{testimonials[active].quote}"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: `linear-gradient(135deg, ${C.orange}, ${C.orangeHov})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: F, fontWeight: 900, fontSize: 20, color: '#fff', flexShrink: 0,
              }}>
                {testimonials[active].name[0]}
              </div>
              <div>
                <p style={{ fontFamily: F, fontWeight: 800, fontSize: 16, color: C.navy }}>{testimonials[active].name}</p>
                <p style={{ fontFamily: F, fontSize: 13, color: C.gray600 }}>{testimonials[active].restaurant}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 24 }}>
            <button onClick={prev} style={{
              width: 44, height: 44, borderRadius: '50%',
              background: C.white, border: `1.5px solid ${C.gray200}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'border-color .15s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = C.orange}
            onMouseLeave={e => e.currentTarget.style.borderColor = C.gray200}
            ><ArrowRight2 size={20} color={C.navy} /></button>

            <div style={{ display: 'flex', gap: 8 }}>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} style={{
                  width: active === i ? 24 : 8, height: 8, borderRadius: 4,
                  background: active === i ? C.orange : C.gray200,
                  border: 'none', cursor: 'pointer',
                  transition: 'width .25s, background .25s', padding: 0,
                }} />
              ))}
            </div>

            <button onClick={next} style={{
              width: 44, height: 44, borderRadius: '50%',
              background: C.white, border: `1.5px solid ${C.gray200}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'border-color .15s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = C.orange}
            onMouseLeave={e => e.currentTarget.style.borderColor = C.gray200}
            ><ArrowLeft2 size={20} color={C.navy} /></button>
          </div>
        </div>

        {/* Stats strip */}
        <div style={{
          display: 'flex', gap: 0, marginTop: 44,
          background: C_dark.gray50, borderRadius: 16, overflow: 'hidden', flexWrap: 'wrap',
        }}>
          {[
            { val: '٤.٩ ★', label: 'متوسط التقييم' },
            { val: '+٥٠٠', label: 'مطعم يستخدم Fazz' },
            { val: '٩٨٪',  label: 'نسبة الرضا' },
          ].map((s, i) => (
            <div key={i} style={{
              flex: '1 1 140px', padding: '24px 20px', textAlign: 'center',
              borderLeft: i > 0 ? '1px solid rgba(255,255,255,.1)' : 'none',
            }}>
              <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: 30, color: C.orange, marginBottom: 4 }}>{s.val}</p>
              <p style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,.65)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Final CTA ──────────────────────────────────────────────── */
function FinalCTA() {
  const { C } = useContext(LandingThemeCtx)
  const navigate = useNavigate()
  return (
    <section dir="rtl" style={{
      padding: 'clamp(80px,10vw,120px) clamp(16px,6vw,80px)',
      background: C_dark.gray50,
      textAlign: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: '-30%', right: '-10%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, rgba(232,87,42,.18) 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-20%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, rgba(232,87,42,.1) 0%, transparent 65%)`, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: C.orangeMid, border: `1.5px solid ${C.orangeBorder}`, borderRadius: 999, padding: '5px 18px', marginBottom: 24 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: C.orange, boxShadow: `0 0 8px ${C.orange}`, display: 'inline-block' }} />
          <span style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.orange }}>متاح دلوقتي — ابدأ في دقيقتين</span>
        </div>

        <h2 style={{
          fontFamily: F, fontWeight: 900,
          fontSize: 'clamp(30px,5vw,58px)',
          color: '#fff', lineHeight: 1.2, letterSpacing: '-1px',
          margin: '0 0 16px',
        }}>
          جاهز تبدأ؟
        </h2>
        <p style={{ fontFamily: F, fontSize: 'clamp(15px,2vw,19px)', color: 'rgba(255,255,255,.7)', margin: '0 0 12px', lineHeight: 1.7 }}>
          ١٤ يوم مجاناً — لا بطاقة بنكية — إلغاء في أي وقت
        </p>
        <p style={{ fontFamily: F, fontSize: 14, color: C.orange, fontWeight: 700, margin: '0 0 44px' }}>
          انضم لـ +٥٠٠ مطعم بيستخدموا Fazz كل يوم
        </p>

        <button className="fazz-btn-primary" onClick={() => navigate('/login')}
          style={{ fontSize: 18, padding: '18px 52px', borderRadius: 14, boxShadow: `0 16px 48px rgba(232,87,42,.5)` }}>
          ابدأ دلوقتي — مجاناً <ArrowLeft2 size={22} />
        </button>

        <div style={{ display: 'flex', gap: 28, justifyContent: 'center', marginTop: 28, flexWrap: 'wrap' }}>
          {['لا عمولة أبداً', 'QR Code فوري', 'إلغاء بنقرة', 'دعم عربي ٧ أيام'].map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <TickCircle size={16} color={C.orange} variant="Bold" />
              <span style={{ fontFamily: F, fontSize: 14, color: 'rgba(255,255,255,.75)', fontWeight: 600 }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ─────────────────────────────────────────────────── */
function Footer() {
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, cursor: 'pointer' }} onClick={() => scrollTo('hero')}>
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
                  width: 38, height: 38, borderRadius: 10,
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
                  <button onClick={() => scrollTo(id)} style={{
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
            {['سياسة الخصوصية', 'شروط الاستخدام', 'عن المنصة'].map(l => (
              <span key={l} style={{ fontFamily: F, fontSize: 13, color: C.gray600, cursor: 'pointer' }}
                onMouseEnter={e => e.target.style.color = C.orange}
                onMouseLeave={e => e.target.style.color = C.gray600}
              >{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─── WhatsApp Float ─────────────────────────────────────────── */
function WhatsAppFloat() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <a href="https://wa.me/201000000000?text=مرحبا،%20أريد%20معرفة%20المزيد%20عن%20Fazz"
      target="_blank" rel="noopener noreferrer"
      style={{
        position: 'fixed', bottom: 28, left: 24, zIndex: 200,
        width: 56, height: 56, borderRadius: '50%',
        background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(37,211,102,.45)', textDecoration: 'none',
        transition: 'transform .2s, opacity .3s',
        opacity: show ? 1 : 0,
        transform: show ? 'scale(1)' : 'scale(0.7)',
        pointerEvents: show ? 'all' : 'none',
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  )
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function Landing() {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('c_theme') === 'dark')

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    localStorage.setItem('c_theme', next ? 'dark' : 'light')
  }

  const C = isDark ? C_dark : C_light

  useEffect(() => {
    document.title = 'Fazz فَذّ — امتلك مطعمك الرقمي بدون عمولة'
    window.scrollTo(0, 0)
  }, [])

  return (
    <LandingThemeCtx.Provider value={{ C, isDark, toggle }}>
      <GlobalStyles />
      <div dir="rtl" style={{ background: C.white, minHeight: '100vh', fontFamily: F, overflowX: 'hidden' }}>
        <Navbar />
        <Hero />
        <PainSection />
        <HowItWorks />
        <FeaturesGrid />
        <Pricing />
        <Testimonials />
        <FinalCTA />
        <Footer />
        <WhatsAppFloat />
      </div>
    </LandingThemeCtx.Provider>
  )
}
