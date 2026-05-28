import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Zap, Package, UtensilsCrossed, ChefHat, BarChart3,
  Users, Archive, Star, Check, ArrowLeft,
  TrendingUp, Wifi, Bell, Printer, Smartphone,
  MessageCircle, ChevronDown, ChevronUp, Banknote,
  Sun, Moon,
} from 'lucide-react'

/* ─── Theme definitions ─────────────────────────────────── */
const DARK = {
  mode:          'dark',
  bg:            '#080808',
  surface:       '#111111',
  surface2:      '#1A1A1A',
  surface3:      '#242424',
  border:        'rgba(255,255,255,0.07)',
  borderStr:     'rgba(255,255,255,0.13)',
  borderAcc:     'rgba(249,115,22,0.30)',
  text:          '#F0F0F0',
  text2:         '#8A8A8A',
  accent:        '#F97316',
  accentHov:     '#EA6C10',
  accentMut:     'rgba(249,115,22,0.10)',
  accentGlow:    '0 0 32px rgba(249,115,22,0.22)',
  green:         '#22C55E',
  greenMut:      'rgba(34,197,94,0.10)',
  greenBorder:   'rgba(34,197,94,0.25)',
  yellow:        '#FBBF24',
  navBgTop:      'rgba(8,8,8,0.60)',
  navBgScrolled: 'rgba(8,8,8,0.95)',
  painBg:        'linear-gradient(180deg, #080808 0%, #100500 50%, #080808 100%)',
  ctaBg:         'linear-gradient(135deg, #0f0f0f 0%, #1a0a00 50%, #0f0f0f 100%)',
  ctaTextColor:  '#F0F0F0',
  trustBg:       '#111111',
  orb1:          'rgba(249,115,22,0.13)',
  orb2:          'rgba(249,115,22,0.07)',
  roiBg:         '#111111',
  roiInner:      '#1A1A1A',
  stepBg:        '#080808',
  footerBg:      '#111111',
}

const LIGHT = {
  mode:          'light',
  bg:            '#F8F9FA',
  surface:       '#FFFFFF',
  surface2:      '#F1F3F5',
  surface3:      '#E5E7EB',
  border:        'rgba(0,0,0,0.08)',
  borderStr:     'rgba(0,0,0,0.15)',
  borderAcc:     'rgba(249,115,22,0.28)',
  text:          '#111827',
  text2:         '#6B7280',
  accent:        '#F97316',
  accentHov:     '#EA6C10',
  accentMut:     'rgba(249,115,22,0.08)',
  accentGlow:    '0 4px 24px rgba(249,115,22,0.18)',
  green:         '#16A34A',
  greenMut:      'rgba(22,163,74,0.08)',
  greenBorder:   'rgba(22,163,74,0.25)',
  yellow:        '#D97706',
  navBgTop:      'rgba(248,249,250,0.75)',
  navBgScrolled: 'rgba(255,255,255,0.97)',
  painBg:        'linear-gradient(180deg, #F8F9FA 0%, #FFF7ED 50%, #F8F9FA 100%)',
  ctaBg:         'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 50%, #FFF7ED 100%)',
  ctaTextColor:  '#111827',
  trustBg:       '#FFFFFF',
  orb1:          'rgba(249,115,22,0.10)',
  orb2:          'rgba(249,115,22,0.05)',
  roiBg:         '#F8F9FA',
  roiInner:      '#FFFFFF',
  stepBg:        '#FFFFFF',
  footerBg:      '#FFFFFF',
}

/* ─── Context ───────────────────────────────────────────── */
const ThemeCtx = createContext(DARK)
const useTheme = () => useContext(ThemeCtx)

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function StarRow({ count = 5 }) {
  const T = useTheme()
  return (
    <span style={{ display: 'inline-flex', gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} fill={T.yellow} color={T.yellow} />
      ))}
    </span>
  )
}

/* ─── Floating WhatsApp ─────────────────────────────────── */
function WhatsAppFloat() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <a
      href="https://wa.me/201000000000?text=مرحبا،%20أريد%20معرفة%20المزيد%20عن%20ريڤيو"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed', bottom: 28, left: 24, zIndex: 200,
        width: 56, height: 56, borderRadius: '50%',
        background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(37,211,102,0.45)', cursor: 'pointer', textDecoration: 'none',
        transition: 'transform 0.2s, opacity 0.3s',
        opacity: visible ? 1 : 0, transform: visible ? 'scale(1)' : 'scale(0.7)',
        pointerEvents: visible ? 'all' : 'none',
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

/* ─── Theme Toggle ──────────────────────────────────────── */
function ThemeToggle({ isDark, onToggle }) {
  const T = useTheme()
  return (
    <button
      onClick={onToggle}
      title={isDark ? 'الوضع الفاتح' : 'الوضع الداكن'}
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        background: T.surface2, border: `1px solid ${T.border}`,
        borderRadius: 20, padding: '6px 12px', cursor: 'pointer',
        transition: 'background 0.2s, border-color 0.2s, transform 0.15s',
        color: T.text2,
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.transform = 'scale(1.05)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = 'scale(1)' }}
    >
      {isDark
        ? <Sun size={15} color={T.yellow} strokeWidth={2.5} />
        : <Moon size={15} color={T.text2} strokeWidth={2.5} />
      }
      <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: 12, fontWeight: 600, color: isDark ? T.yellow : T.text2 }}>
        {isDark ? 'فاتح' : 'داكن'}
      </span>
    </button>
  )
}

/* ─── Navbar ────────────────────────────────────────────── */
function Navbar({ isDark, onToggle }) {
  const T = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const navLinks = [
    { label: 'المميزات',    id: 'features' },
    { label: 'كيف يعمل',   id: 'how'      },
    { label: 'التسعير',    id: 'pricing'  },
    { label: 'أسئلة شائعة', id: 'faq'    },
  ]

  return (
    <nav
      dir="rtl"
      style={{
        position: 'fixed', top: 0, insetInline: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(16px, 5vw, 80px)', height: 64,
        background: scrolled ? T.navBgScrolled : T.navBgTop,
        backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
        borderBottom: `1px solid ${scrolled ? T.border : 'transparent'}`,
        transition: 'background 0.3s, border-color 0.3s',
        boxShadow: scrolled && T.mode === 'light' ? '0 1px 12px rgba(0,0,0,0.06)' : 'none',
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => scrollTo('hero')}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: T.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: T.accentGlow }}>
          <Zap size={20} color="#fff" fill="#fff" />
        </div>
        <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 800, fontSize: 22, color: T.text, letterSpacing: '-0.5px' }}>ريڤيو</span>
        <span style={{ background: T.accentMut, border: `1px solid ${T.borderAcc}`, borderRadius: 6, padding: '2px 8px', fontFamily: 'Cairo, sans-serif', fontSize: 11, fontWeight: 700, color: T.accent }}>مصر</span>
      </div>

      {/* Links + actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        {navLinks.map(l => (
          <button key={l.id} onClick={() => scrollTo(l.id)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontWeight: 500, fontSize: 14, color: T.text2, padding: '4px 0', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = T.text}
            onMouseLeave={e => e.target.style.color = T.text2}
          >{l.label}</button>
        ))}

        <ThemeToggle isDark={isDark} onToggle={onToggle} />

        <a href="https://wa.me/201000000000" target="_blank" rel="noopener noreferrer"
          style={{ background: '#25D366', border: 'none', borderRadius: 8, padding: '7px 16px', fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 13, color: '#fff', cursor: 'pointer', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
          <MessageCircle size={14} />واتساب
        </a>

        <button onClick={() => navigate('/explore')}
          style={{ background: T.surface2, border: `1px solid ${T.border}`, borderRadius: 8, padding: '8px 16px', fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 14, color: T.text, cursor: 'pointer', transition: 'background 0.2s, border-color 0.2s, transform 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = 'translateY(0)' }}
        >اكتشف المطاعم</button>

        <button onClick={() => navigate('/login')}
          style={{ background: T.accent, border: 'none', borderRadius: 8, padding: '8px 20px', fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 14, color: '#fff', cursor: 'pointer', boxShadow: T.accentGlow, transition: 'background 0.2s, transform 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.background = T.accentHov; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.background = T.accent; e.currentTarget.style.transform = 'translateY(0)' }}
        >ابدأ مجاناً</button>
      </div>
    </nav>
  )
}

/* ─── Trust Bar ─────────────────────────────────────────── */
function TrustBar() {
  const T = useTheme()
  const items = [
    { icon: '🇪🇬', label: 'منتج مصري 100٪' },
    { icon: '🔒', label: 'بياناتك محمية' },
    { icon: '💳', label: 'فوري • فودافون كاش • InstaPay' },
    { icon: '📞', label: 'دعم بالعربي ٧ أيام' },
    { icon: '⚡', label: 'إعداد في أقل من ١٠ دقائق' },
    { icon: '🏆', label: 'الأكثر استخداماً في مصر' },
  ]
  return (
    <div style={{ background: T.trustBg, borderBottom: `1px solid ${T.border}`, overflow: 'hidden', padding: '10px 0' }}>
      <div style={{ display: 'flex', gap: 48, animation: 'marquee 22s linear infinite', whiteSpace: 'nowrap', width: 'max-content' }}>
        {[...items, ...items].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <span style={{ fontSize: 16 }}>{item.icon}</span>
            <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: 13, fontWeight: 600, color: T.text2 }}>{item.label}</span>
            <span style={{ color: T.border, fontSize: 18, marginRight: 16 }}>•</span>
          </div>
        ))}
      </div>
      <style>{`@keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
    </div>
  )
}

/* ─── Hero ──────────────────────────────────────────────── */
function Hero() {
  const T = useTheme()
  const navigate = useNavigate()
  const [c1, setC1] = useState(0)
  const [c2, setC2] = useState(0)
  const [c3, setC3] = useState(0)
  const [c4, setC4] = useState(0)
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true
    const animate = (setter, target, duration) => {
      const step = target / (duration / 16); let cur = 0
      const id = setInterval(() => {
        cur = Math.min(cur + step, target)
        setter(Math.round(cur * 10) / 10)
        if (cur >= target) clearInterval(id)
      }, 16)
    }
    setTimeout(() => {
      animate(setC1, 1200, 1600); animate(setC2, 98, 1200)
      animate(setC3, 4.9, 900);   animate(setC4, 35, 1000)
    }, 400)
  }, [])

  return (
    <section id="hero" dir="rtl" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 'clamp(100px,14vw,160px) clamp(16px,6vw,80px) 80px', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '8%', right: '10%', width: 520, height: 520, borderRadius: '50%', background: `radial-gradient(circle, ${T.orb1} 0%, transparent 70%)`, pointerEvents: 'none', filter: 'blur(2px)' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '8%', width: 380, height: 380, borderRadius: '50%', background: `radial-gradient(circle, ${T.orb2} 0%, transparent 70%)`, pointerEvents: 'none' }} />

      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: T.greenMut, border: `1px solid ${T.greenBorder}`, borderRadius: 999, padding: '5px 16px', marginBottom: 20 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: T.green, boxShadow: `0 0 8px ${T.green}99`, display: 'inline-block' }} />
        <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: 13, fontWeight: 600, color: T.green }}>+٢٣ مطعم انضموا هذا الأسبوع</span>
      </div>

      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: T.accentMut, border: `1px solid ${T.borderAcc}`, borderRadius: 999, padding: '5px 14px', marginBottom: 28 }}>
        <Zap size={14} color={T.accent} fill={T.accent} />
        <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: 13, fontWeight: 600, color: T.accent }}>نظام إدارة المطاعم #١ في مصر</span>
      </div>

      <h1 style={{ fontFamily: 'Cairo, sans-serif', fontSize: 'clamp(34px,5.5vw,68px)', fontWeight: 900, color: T.text, lineHeight: 1.15, margin: '0 0 20px', maxWidth: 820, letterSpacing: '-1px' }}>
        خلّص من الفوضى وزوّد مبيعاتك مع{' '}
        <span style={{ color: T.accent, textShadow: `0 0 40px ${T.accent}66` }}>ريڤيو</span>
      </h1>

      <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: 'clamp(15px,2vw,19px)', color: T.text2, lineHeight: 1.85, maxWidth: 600, margin: '0 0 12px' }}>
        نظام إدارة متكامل للمطاعم المصرية — طلبات، قائمة، مطبخ، تقارير، فريق عمل
      </p>
      <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: 14, color: T.accent, margin: '0 0 44px', fontWeight: 600 }}>
        يدعم الدفع بـ فوري • فودافون كاش • InstaPay • بطاقات بنكية
      </p>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 72 }}>
        <button onClick={() => navigate('/login')}
          style={{ background: T.accent, border: 'none', borderRadius: 12, padding: '15px 36px', fontFamily: 'Cairo, sans-serif', fontWeight: 800, fontSize: 17, color: '#fff', cursor: 'pointer', boxShadow: `0 8px 32px ${T.accent}66`, display: 'flex', alignItems: 'center', gap: 8, transition: 'transform 0.2s, box-shadow 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 12px 40px ${T.accent}80` }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 32px ${T.accent}66` }}>
          ابدأ مجاناً — بدون كريدت كارد <ArrowLeft size={18} />
        </button>
        <button onClick={() => scrollTo('how')}
          style={{ background: 'transparent', border: `1px solid ${T.borderStr}`, borderRadius: 12, padding: '15px 32px', fontFamily: 'Cairo, sans-serif', fontWeight: 600, fontSize: 17, color: T.text2, cursor: 'pointer', transition: 'border-color 0.2s, color 0.2s, transform 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.color = T.text; e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = T.borderStr; e.currentTarget.style.color = T.text2; e.currentTarget.style.transform = 'translateY(0)' }}>
          شاهد كيف يعمل
        </button>
      </div>

      <div style={{ display: 'flex', gap: 'clamp(16px,4vw,52px)', flexWrap: 'wrap', justifyContent: 'center', background: T.surface, border: `1px solid ${T.border}`, borderRadius: 20, padding: '22px 44px', backdropFilter: 'blur(8px)', boxShadow: T.mode === 'light' ? '0 2px 16px rgba(0,0,0,0.06)' : 'none' }}>
        {[
          { value: `+${Math.round(c1).toLocaleString('ar-EG')}`, label: 'مطعم يستخدم ريڤيو', color: T.accent },
          { value: `${Math.round(c2)}٪`, label: 'من العملاء راضون', color: T.green },
          { value: `${c3.toFixed(1)} ★`, label: 'متوسط التقييم', color: T.yellow },
          { value: `+${Math.round(c4)}٪`, label: 'زيادة في المبيعات', color: T.accent },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: 'center', minWidth: 90 }}>
            <div style={{ fontFamily: 'Inter, Cairo, sans-serif', fontWeight: 800, fontSize: 'clamp(22px,3vw,30px)', color: s.color, lineHeight: 1, marginBottom: 5 }}>{s.value}</div>
            <div style={{ fontFamily: 'Cairo, sans-serif', fontSize: 12, color: T.text2, fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Pain Points ───────────────────────────────────────── */
function PainPoints() {
  const T = useTheme()
  const pains = [
    { emoji: '😤', title: 'طلبات بتتضيع', desc: 'الكاشير بيكتب غلط، الطباخ مش فاهم، العميل بيشتكي' },
    { emoji: '📊', title: 'مش عارف مبيعاتي كام', desc: 'في الآخر اليوم مش عارف كسبت ولا خسرت بدون أرقام واضحة' },
    { emoji: '👥', title: 'الفريق مش منظم', desc: 'كل واحد شغال بطريقته وفي فوضى في التنسيق' },
    { emoji: '📦', title: 'المخزون بيخلص فجأة', desc: 'عميل بيطلب صنف وبتكتشف إنه مش موجود' },
  ]
  return (
    <section style={{ padding: 'clamp(60px,8vw,100px) clamp(16px,6vw,80px)', background: T.painBg }} dir="rtl">
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <h2 style={{ fontFamily: 'Cairo, sans-serif', fontSize: 'clamp(26px,4vw,42px)', fontWeight: 800, color: T.text, margin: '0 0 12px', letterSpacing: '-0.5px' }}>هل بتعاني من أي من دي؟</h2>
          <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: 16, color: T.text2 }}>معظم أصحاب المطاعم في مصر بيواجهوا نفس المشاكل دي كل يوم</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {pains.map((p, i) => (
            <div key={i}
              style={{ background: T.mode === 'dark' ? 'rgba(239,68,68,0.04)' : 'rgba(239,68,68,0.03)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 16, padding: '24px 20px', transition: 'border-color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(239,68,68,0.4)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(239,68,68,0.15)'}
            >
              <span style={{ fontSize: 36, display: 'block', marginBottom: 14 }}>{p.emoji}</span>
              <h3 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 17, color: T.text, margin: '0 0 8px' }}>{p.title}</h3>
              <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: 14, color: T.text2, lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48, background: T.surface, border: `1px solid ${T.borderAcc}`, borderRadius: 20, padding: '28px 32px', textAlign: 'center', boxShadow: T.mode === 'light' ? '0 2px 16px rgba(0,0,0,0.06)' : 'none' }}>
          <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: 'clamp(17px,2.5vw,22px)', fontWeight: 700, color: T.text, margin: 0, lineHeight: 1.6 }}>
            ريڤيو حل كل المشاكل دي لـ <span style={{ color: T.accent }}>+١٢٠٠ مطعم مصري</span> — وهيحلها لك كمان ⚡
          </p>
        </div>
      </div>
    </section>
  )
}

/* ─── Features ──────────────────────────────────────────── */
const FEATURES_DATA = [
  { title: 'إدارة الطلبات لحظة بلحظة',  desc: 'تتبع كل طلب من الاستلام للتسليم — دليفري، تيك أواي، أو أوندور — في شاشة واحدة واضحة' },
  { title: 'قائمة ذكية سهلة التعديل',    desc: 'غيّر أسعارك وأضف أصناف جديدة في ثوانٍ، مع صور وتصنيفات وعروض خاصة بضغطة' },
  { title: 'شاشة المطبخ KDS',             desc: 'الطلبات بتوصل مباشرة لشاشة المطبخ — مفيش ورق ومفيش أخطاء في أوقات الزحمة' },
  { title: 'تقارير وأرباح واضحة',         desc: 'اعرف أكتر صنف بيتباع، أعلى ساعة مبيعات، وصافي ربحك يومياً وشهرياً' },
  { title: 'إدارة الفريق والصلاحيات',     desc: 'كل موظف عنده دوره — مدير، كاشير، طباخ، موصل — وانت بتراقب الكل من بُعد' },
  { title: 'مخزون تلقائي مع تنبيهات',    desc: 'النظام بيخصم من المخزون مع كل طلب وبيبعتلك تنبيه لما الكمية تقل' },
  { title: 'تطبيق موبايل للمدير',         desc: 'راقب مطعمك من موبايلك في أي وقت — حتى لو مش موجود في المطعم' },
  { title: 'طباعة فواتير وإيصالات',       desc: 'فواتير احترافية بلوجو المطعم تُطبع تلقائياً مع كل طلب على الطابعة الحرارية' },
  { title: 'إشعارات واتساب للعملاء',      desc: 'ابعت تأكيد الطلب وتحديث التوصيل لعملائك مباشرة على واتساب بشكل تلقائي' },
]
const FEATURE_ICONS = [Package, UtensilsCrossed, ChefHat, BarChart3, Users, Archive, Smartphone, Printer, Bell]

function FeatureCard({ IconComp, title, desc }) {
  const T = useTheme()
  const [hov, setHov] = useState(false)
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? T.surface2 : T.surface, border: `1px solid ${hov ? T.borderAcc : T.border}`, borderRadius: 16, padding: '28px 24px', transition: 'background 0.25s, border-color 0.25s, transform 0.25s, box-shadow 0.25s', transform: hov ? 'translateY(-4px)' : 'none', boxShadow: hov ? T.accentGlow : (T.mode === 'light' ? '0 1px 6px rgba(0,0,0,0.05)' : 'none') }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: T.accentMut, border: `1px solid ${T.borderAcc}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
        <IconComp size={24} color={T.accent} />
      </div>
      <h3 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 16, color: T.text, margin: '0 0 8px' }}>{title}</h3>
      <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: 14, color: T.text2, lineHeight: 1.7, margin: 0 }}>{desc}</p>
    </div>
  )
}

function Features() {
  const T = useTheme()
  return (
    <section id="features" dir="rtl" style={{ padding: 'clamp(60px,8vw,120px) clamp(16px,6vw,80px)', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: T.accentMut, border: `1px solid ${T.borderAcc}`, borderRadius: 999, padding: '4px 14px', marginBottom: 16 }}>
          <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: 13, fontWeight: 600, color: T.accent }}>المميزات</span>
        </div>
        <h2 style={{ fontFamily: 'Cairo, sans-serif', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: T.text, margin: '0 0 12px', letterSpacing: '-0.5px' }}>كل أدوات مطعمك في مكان واحد</h2>
        <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: 16, color: T.text2, margin: 0 }}>كل ما تحتاجه لتشغيل مطعمك باحترافية — بدون برامج متعددة وبدون تعقيد</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        {FEATURES_DATA.map((f, i) => <FeatureCard key={i} IconComp={FEATURE_ICONS[i]} title={f.title} desc={f.desc} />)}
      </div>
    </section>
  )
}

/* ─── How It Works ──────────────────────────────────────── */
const STEPS = [
  { num: '01', title: 'سجّل مطعمك',        desc: 'أنشئ حسابك في دقيقتين — اسم مطعمك وأدخل بياناتك الأساسية وابدأ مباشرة بدون أي تحميل أو تثبيت' },
  { num: '02', title: 'أضف قائمتك',         desc: 'أضف أصنافك بالاسم والسعر والصورة، وقسّمها في فئات. إذا عندك قائمة موجودة نساعدك تستوردها مجاناً' },
  { num: '03', title: 'ابدأ تستقبل طلبات', desc: 'وزّع رابط مطعمك على عملائك أو اطبع QR Code على المنيو وفوراً تبدأ تستقبل طلبات ومدفوعات' },
]

function HowItWorks() {
  const T = useTheme()
  return (
    <section id="how" dir="rtl" style={{ padding: 'clamp(60px,8vw,120px) clamp(16px,6vw,80px)', background: T.mode === 'light' ? T.surface2 : T.surface, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: T.accentMut, border: `1px solid ${T.borderAcc}`, borderRadius: 999, padding: '4px 14px', marginBottom: 16 }}>
            <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: 13, fontWeight: 600, color: T.accent }}>كيف يعمل</span>
          </div>
          <h2 style={{ fontFamily: 'Cairo, sans-serif', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: T.text, margin: '0 0 12px', letterSpacing: '-0.5px' }}>ابدأ في ٣ خطوات بسيطة</h2>
          <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: 16, color: T.text2, margin: 0 }}>بدون تعقيد ولا تدريب مطوّل — ريڤيو مصمم عشان تشتغل بيه من أول يوم</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{ background: T.stepBg, border: `1px solid ${T.border}`, borderRadius: 16, padding: '32px 24px', position: 'relative', overflow: 'hidden', boxShadow: T.mode === 'light' ? '0 2px 12px rgba(0,0,0,0.06)' : 'none' }}>
              <div style={{ position: 'absolute', top: -10, left: 16, fontFamily: 'Inter, sans-serif', fontWeight: 900, fontSize: 80, color: 'rgba(249,115,22,0.06)', lineHeight: 1, userSelect: 'none' }}>{s.num}</div>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: T.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 16, color: '#fff', boxShadow: T.accentGlow }}>
                {i + 1}
              </div>
              <h3 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 18, color: T.text, margin: '0 0 10px' }}>{s.title}</h3>
              <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: 14, color: T.text2, lineHeight: 1.75, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── ROI Calculator ────────────────────────────────────── */
function ROICalc() {
  const T = useTheme()
  const [orders, setOrders] = useState(30)
  const [avg, setAvg] = useState(80)
  const monthly = orders * avg * 30
  const saved = Math.round(monthly * 0.15)
  const cost = 199

  return (
    <section dir="rtl" style={{ padding: 'clamp(60px,8vw,100px) clamp(16px,6vw,80px)', background: T.roiBg }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: T.accentMut, border: `1px solid ${T.borderAcc}`, borderRadius: 999, padding: '4px 14px', marginBottom: 16 }}>
            <TrendingUp size={13} color={T.accent} />
            <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: 13, fontWeight: 600, color: T.accent }}>احسب عائدك</span>
          </div>
          <h2 style={{ fontFamily: 'Cairo, sans-serif', fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, color: T.text, margin: '0 0 10px', letterSpacing: '-0.5px' }}>ريڤيو هيوفرلك كام بالشهر؟</h2>
          <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: 15, color: T.text2 }}>حرّك المؤشرات عشان تحسب العائد المتوقع لمطعمك</p>
        </div>
        <div style={{ background: T.roiInner, border: `1px solid ${T.border}`, borderRadius: 24, padding: 'clamp(24px,4vw,44px)', boxShadow: T.mode === 'light' ? '0 2px 20px rgba(0,0,0,0.07)' : 'none' }}>
          {[
            { label: 'عدد الطلبات في اليوم', value: orders, setter: setOrders, min: 5, max: 300, unit: 'طلب' },
            { label: 'متوسط قيمة الطلب', value: avg, setter: setAvg, min: 30, max: 500, unit: 'جنيه' },
          ].map((s, i) => (
            <div key={i} style={{ marginBottom: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: 15, fontWeight: 600, color: T.text }}>{s.label}</span>
                <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: 16, fontWeight: 800, color: T.accent }}>{s.value.toLocaleString('ar-EG')} {s.unit}</span>
              </div>
              <input type="range" min={s.min} max={s.max} value={s.value} onChange={e => s.setter(+e.target.value)}
                style={{ width: '100%', accentColor: T.accent, height: 4, cursor: 'pointer' }} />
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginTop: 8 }}>
            {[
              { label: 'مبيعاتك الشهرية',       value: `${monthly.toLocaleString('ar-EG')} ج`, color: T.text },
              { label: 'التوفير المتوقع مع ريڤيو', value: `${saved.toLocaleString('ar-EG')} ج`,  color: T.green, sub: 'تقليل أخطاء + كفاءة أعلى' },
              { label: 'تكلفة ريڤيو الاحترافي', value: `${cost} ج/شهر`,                           color: T.accent },
            ].map((r, i) => (
              <div key={i} style={{ background: T.surface2, borderRadius: 14, padding: '18px 20px', textAlign: 'center', border: `1px solid ${T.border}` }}>
                <div style={{ fontFamily: 'Cairo, sans-serif', fontSize: 11, color: T.text2, marginBottom: 8, lineHeight: 1.4 }}>{r.label}</div>
                <div style={{ fontFamily: 'Cairo, sans-serif', fontSize: 22, fontWeight: 800, color: r.color }}>{r.value}</div>
                {r.sub && <div style={{ fontFamily: 'Cairo, sans-serif', fontSize: 11, color: T.text2, marginTop: 4 }}>{r.sub}</div>}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, padding: '14px 20px', background: T.greenMut, border: `1px solid ${T.greenBorder}`, borderRadius: 12, textAlign: 'center' }}>
            <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: 14, fontWeight: 700, color: T.green }}>
              🎯 ريڤيو بيوفر متوسط {Math.round(saved / cost).toLocaleString('ar-EG')}× قيمته الشهرية
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Testimonials ──────────────────────────────────────── */
const TESTIMONIALS = [
  { name: 'محمد عبد العزيز', role: 'صاحب مطعم كبابجي — القاهرة، مدينة نصر', quote: 'كنت بخسر طلبات كتير بسبب الفوضى. مع ريڤيو الطلبات بوصل للمطبخ تلقائياً والأخطاء وقفت تقريباً. في أول شهر المبيعات زادت ٢٨٪!', stars: 5 },
  { name: 'نرمين السيد',    role: 'مديرة كافيه ويف — الإسكندرية، سيدي جابر',   quote: 'شاشة المطبخ KDS غيرت حياتنا في وقت الذروة. البريستا والكاشير بقوا متنسقين تماماً. العملاء بقوا يمدحوا السرعة.', stars: 5 },
  { name: 'أحمد الغزالي',   role: 'صاحب سلسلة بيتزا — الجيزة، فيصل والهرم',    quote: 'عندي ٣ فروع وريڤيو بيخليني أتابعهم كلهم من موبايلي. التقارير واضحة والأرباح بيّنة. الاشتراك اتعوّض في أول أسبوع.', stars: 5 },
  { name: 'هاجر رمضان',    role: 'صاحبة كلاود كيتشن — المنصورة',                quote: 'أنا cloud kitchen ومحتاجة كل حاجة أون لاين. ريڤيو أعطاني لينك طلبات، دفع بفوري وفودافون كاش، وتقارير يومية.', stars: 5 },
  { name: 'كريم وهبي',     role: 'مدير عمليات — سلسلة شاورما كروز، ٥ فروع',    quote: 'إدارة ٥ فروع كانت كابوس. دلوقتي كل فرع عنده صلاحياته وأنا شايف كل حاجة من داشبورد واحدة. الدعم سريع جداً.', stars: 5 },
  { name: 'دينا مصطفى',    role: 'صاحبة مطعم نوري — طنطا',                      quote: 'خايفة كنت إن النظام معقد. لقيته أسهل من أي حاجة استخدمتها. في ساعة واحدة أنا والعمال بقينا شغالين عليه.', stars: 5 },
]

function TestimonialCard({ name, role, quote, stars }) {
  const T = useTheme()
  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 16, boxShadow: T.mode === 'light' ? '0 1px 8px rgba(0,0,0,0.05)' : 'none' }}>
      <StarRow count={stars} />
      <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: 14, color: T.text, lineHeight: 1.85, margin: 0, flex: 1 }}>"{quote}"</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: `linear-gradient(135deg, ${T.accent}, #c25905)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Cairo, sans-serif', fontWeight: 800, fontSize: 18, color: '#fff', flexShrink: 0 }}>
          {name[0]}
        </div>
        <div>
          <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 15, color: T.text }}>{name}</div>
          <div style={{ fontFamily: 'Cairo, sans-serif', fontSize: 12, color: T.text2 }}>{role}</div>
        </div>
      </div>
    </div>
  )
}

function Testimonials() {
  const T = useTheme()
  return (
    <section id="testimonials" dir="rtl" style={{ padding: 'clamp(60px,8vw,120px) clamp(16px,6vw,80px)', background: T.mode === 'light' ? T.surface2 : T.surface, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: T.accentMut, border: `1px solid ${T.borderAcc}`, borderRadius: 999, padding: '4px 14px', marginBottom: 16 }}>
            <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: 13, fontWeight: 600, color: T.accent }}>آراء العملاء</span>
          </div>
          <h2 style={{ fontFamily: 'Cairo, sans-serif', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: T.text, margin: '0 0 12px', letterSpacing: '-0.5px' }}>ماذا يقول أصحاب المطاعم في مصر</h2>
          <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: 16, color: T.text2, margin: 0 }}>من القاهرة للإسكندرية للمنصورة — ريڤيو فرق حياة مطاعم حقيقية</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {TESTIMONIALS.map((t, i) => <TestimonialCard key={i} {...t} />)}
        </div>
        <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, padding: '18px 36px', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', justifyContent: 'center', boxShadow: T.mode === 'light' ? '0 2px 16px rgba(0,0,0,0.06)' : 'none' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Cairo, sans-serif', fontSize: 40, fontWeight: 900, color: T.yellow, lineHeight: 1 }}>٤.٩</div>
              <StarRow count={5} />
              <div style={{ fontFamily: 'Cairo, sans-serif', fontSize: 12, color: T.text2, marginTop: 4 }}>من ٥ نجوم</div>
            </div>
            <div style={{ width: 1, height: 56, background: T.border }} />
            <div style={{ fontFamily: 'Cairo, sans-serif', fontSize: 15, color: T.text2, lineHeight: 1.8 }}>
              <span style={{ color: T.text, fontWeight: 700 }}>+٩٨٪</span> من العملاء ينصحون بريڤيو<br />
              <span style={{ color: T.text, fontWeight: 700 }}>+١٢٠٠</span> مطعم نشط في مصر<br />
              <span style={{ color: T.text, fontWeight: 700 }}>٧ أيام</span> متوسط فترة الإعداد
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Integrations ──────────────────────────────────────── */
function Integrations() {
  const T = useTheme()
  const items = [
    { name: 'فوري',           emoji: '🔵', desc: 'دفع فوري في كل مكان' },
    { name: 'فودافون كاش',   emoji: '🔴', desc: 'أكثر محفظة انتشاراً' },
    { name: 'InstaPay',       emoji: '🟣', desc: 'التحويل الفوري'       },
    { name: 'واتساب',         emoji: '🟢', desc: 'إشعارات العملاء'      },
    { name: 'بطاقات بنكية',  emoji: '💳', desc: 'Visa & Mastercard'     },
    { name: 'طابعة حرارية',  emoji: '🖨️', desc: 'كل الموديلات'         },
  ]
  return (
    <section dir="rtl" style={{ padding: 'clamp(60px,8vw,100px) clamp(16px,6vw,80px)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: T.accentMut, border: `1px solid ${T.borderAcc}`, borderRadius: 999, padding: '4px 14px', marginBottom: 16 }}>
            <Wifi size={13} color={T.accent} />
            <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: 13, fontWeight: 600, color: T.accent }}>التكاملات</span>
          </div>
          <h2 style={{ fontFamily: 'Cairo, sans-serif', fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, color: T.text, margin: '0 0 10px', letterSpacing: '-0.5px' }}>يتكامل مع كل اللي بتستخدمه</h2>
          <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: 15, color: T.text2 }}>وسائل الدفع والتواصل الأكثر انتشاراً في مصر جاهزة من اليوم الأول</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16 }}>
          {items.map((item, i) => (
            <div key={i}
              style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: '20px 16px', textAlign: 'center', transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s', boxShadow: T.mode === 'light' ? '0 1px 6px rgba(0,0,0,0.05)' : 'none' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.borderAcc; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = T.accentGlow }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = T.mode === 'light' ? '0 1px 6px rgba(0,0,0,0.05)' : 'none' }}
            >
              <div style={{ fontSize: 32, marginBottom: 10 }}>{item.emoji}</div>
              <div style={{ fontFamily: 'Cairo, sans-serif', fontSize: 14, fontWeight: 700, color: T.text, marginBottom: 4 }}>{item.name}</div>
              <div style={{ fontFamily: 'Cairo, sans-serif', fontSize: 12, color: T.text2 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Pricing ───────────────────────────────────────────── */
const PLANS = [
  { title: 'المجاني',     price: 0,   desc: 'ابدأ وجرّب بدون أي التزام',      badge: null,          features: ['حتى ٥٠ طلب/شهر', 'قائمة واحدة — ٢٠ صنف', 'تقارير أساسية', 'رابط طلبات للعملاء', 'دعم بريد إلكتروني'], highlighted: false },
  { title: 'الاحترافي',  price: 199, desc: 'لمطعم نشط يريد النمو',           badge: 'الأكثر شيوعاً', features: ['طلبات غير محدودة', 'قوائم متعددة بصور', 'شاشة المطبخ KDS', 'إدارة فريق + صلاحيات', 'تقارير متقدمة + تصدير', 'دعم فوري ٧ أيام/٢٤ ساعة', 'إشعارات واتساب للعملاء', 'طباعة فواتير احترافية'], highlighted: true },
  { title: 'المؤسسات',   price: 499, desc: 'لسلاسل وفروع متعددة',            badge: 'للسلاسل',     features: ['كل مميزات الاحترافي', 'فروع غير محدودة', 'داشبورد مركزي للفروع', 'API تكامل مع أنظمتك', 'مدير حساب مخصص', 'تدريب الفريق أون سايت', 'SLA ٩٩.٩٪ uptime'], highlighted: false },
]

function PricingCard({ title, price, desc, features, highlighted, badge }) {
  const T = useTheme()
  const navigate = useNavigate()
  const [hov, setHov] = useState(false)
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: highlighted ? (T.mode === 'dark' ? T.surface2 : '#FFF7ED') : T.surface, border: highlighted ? `2px solid ${T.accent}` : `1px solid ${hov ? T.borderStr : T.border}`, borderRadius: 20, padding: '36px 28px', position: 'relative', flex: 1, minWidth: 240, maxWidth: 360, transition: 'transform 0.25s, box-shadow 0.25s', transform: (highlighted || hov) ? 'translateY(-6px)' : 'none', boxShadow: highlighted ? T.accentGlow : (T.mode === 'light' && hov ? '0 4px 24px rgba(0,0,0,0.08)' : 'none') }}>
      {badge && (
        <div style={{ position: 'absolute', top: -14, right: 24, background: highlighted ? T.accent : T.surface3, borderRadius: 999, padding: '4px 16px', fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 12, color: highlighted ? '#fff' : T.text2 }}>{badge}</div>
      )}
      <h3 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 19, color: T.text, margin: '0 0 4px' }}>{title}</h3>
      <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: 13, color: T.text2, margin: '0 0 20px' }}>{desc}</p>
      <div style={{ marginBottom: 28 }}>
        {price === 0
          ? <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 800, fontSize: 36, color: T.text }}>مجاني</span>
          : <span style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, fontSize: 40, color: highlighted ? T.accent : T.text }}>{price}</span>
              <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: 15, color: T.text2 }}>ج/شهر</span>
            </span>
        }
        {price > 0 && <div style={{ fontFamily: 'Cairo, sans-serif', fontSize: 12, color: T.green, marginTop: 6 }}>✓ شامل ضريبة القيمة المضافة</div>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 28 }}>
        {features.map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: T.accentMut, border: `1px solid ${T.borderAcc}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Check size={11} color={T.accent} strokeWidth={3} />
            </div>
            <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: 13, color: T.text2 }}>{f}</span>
          </div>
        ))}
      </div>
      <button onClick={() => navigate('/login')}
        style={{ width: '100%', background: highlighted ? T.accent : 'transparent', border: highlighted ? 'none' : `1px solid ${T.borderStr}`, borderRadius: 10, padding: '13px', fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 14, color: highlighted ? '#fff' : T.text2, cursor: 'pointer', transition: 'background 0.2s, color 0.2s', boxShadow: highlighted ? `0 4px 20px ${T.accent}4d` : 'none' }}
        onMouseEnter={e => { if (!highlighted) { e.currentTarget.style.background = T.accentMut; e.currentTarget.style.color = T.accent } }}
        onMouseLeave={e => { if (!highlighted) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = T.text2 } }}
      >{price === 0 ? 'ابدأ مجاناً' : price === 199 ? 'ابدأ الاحترافي ←' : 'تواصل معنا'}</button>
    </div>
  )
}

function Pricing() {
  const T = useTheme()
  return (
    <section id="pricing" dir="rtl" style={{ padding: 'clamp(60px,8vw,120px) clamp(16px,6vw,80px)', background: T.mode === 'light' ? T.surface2 : T.surface, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: T.accentMut, border: `1px solid ${T.borderAcc}`, borderRadius: 999, padding: '4px 14px', marginBottom: 16 }}>
            <Banknote size={13} color={T.accent} />
            <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: 13, fontWeight: 600, color: T.accent }}>التسعير</span>
          </div>
          <h2 style={{ fontFamily: 'Cairo, sans-serif', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: T.text, margin: '0 0 12px', letterSpacing: '-0.5px' }}>اختر الخطة المناسبة لمطعمك</h2>
          <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: 16, color: T.text2, margin: '0 0 8px' }}>ابدأ مجاناً — ادفع بالجنيه المصري — ألغِ وقتما تشاء</p>
          <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: 13, color: T.text2 }}>💳 الدفع بفوري، فودافون كاش، InstaPay، أو بطاقة بنكية</p>
        </div>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'stretch' }}>
          {PLANS.map((p, i) => <PricingCard key={i} {...p} />)}
        </div>
        <p style={{ textAlign: 'center', fontFamily: 'Cairo, sans-serif', fontSize: 13, color: T.text2, marginTop: 28 }}>
          ✓ بدون رسوم خفية &nbsp;•&nbsp; ✓ إلغاء في أي وقت &nbsp;•&nbsp; ✓ لا يوجد التزام سنوي
        </p>
      </div>
    </section>
  )
}

/* ─── FAQ ───────────────────────────────────────────────── */
const FAQS = [
  { q: 'هل محتاج خبرة تقنية لاستخدام ريڤيو؟', a: 'لأ خالص. ريڤيو مصمم عشان أي حد يقدر يستخدمه بدون أي خلفية تقنية. معظم العملاء بيبدأوا وحدهم في أقل من ساعة.' },
  { q: 'هل بياناتي ومبيعاتي آمنة؟', a: 'نعم بالكامل. بياناتك مشفّرة وموجودة على سيرفرات آمنة. مفيش أي طرف تالت بيوصل لبياناتك. بنعمل نسخ احتياطي تلقائي يومياً.' },
  { q: 'هل ينفع أستخدمه لأكتر من فرع؟', a: 'أيوه. خطة المؤسسات بتخليك تدير فروع غير محدودة من داشبورد واحد. كل فرع عنده إحصائياته الخاصة.' },
  { q: 'إيه طرق الدفع المتاحة في مصر؟', a: 'بندعم فوري، فودافون كاش، InstaPay، وبطاقات Visa وMastercard. كل الأسعار بالجنيه المصري وشاملة ضريبة القيمة المضافة.' },
  { q: 'هل في نسخة تجريبية مجانية؟', a: 'أيوه! الخطة المجانية متاحة بدون أي بطاقة بنكية. تقدر تجرب النظام لأول ٥٠ طلب كامل المميزات الأساسية.' },
  { q: 'إيه لو احتجت مساعدة بعد الاشتراك؟', a: 'فريق دعمنا بيرد على واتساب والإيميل ٧ أيام في الأسبوع. في خطة الاحترافي الرد خلال ساعة.' },
  { q: 'هل ريڤيو بيشتغل مع الطابعة الحرارية؟', a: 'أيوه، بيدعم كل الطابعات الحرارية الشائعة في السوق المصري. الفواتير بتُطبع تلقائياً مع كل طلب بلوجو مطعمك.' },
  { q: 'ممكن أشوف النظام قبل ما أشترك؟', a: 'بالتأكيد! ابدأ بالخطة المجانية وجرّب كل حاجة. أو تواصل معنا على واتساب وهنعملك جلسة demo مجانية.' },
]

function FAQ() {
  const T = useTheme()
  const [open, setOpen] = useState(null)
  return (
    <section id="faq" dir="rtl" style={{ padding: 'clamp(60px,8vw,100px) clamp(16px,6vw,80px)' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: T.accentMut, border: `1px solid ${T.borderAcc}`, borderRadius: 999, padding: '4px 14px', marginBottom: 16 }}>
            <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: 13, fontWeight: 600, color: T.accent }}>أسئلة شائعة</span>
          </div>
          <h2 style={{ fontFamily: 'Cairo, sans-serif', fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, color: T.text, margin: '0 0 10px', letterSpacing: '-0.5px' }}>كل أسئلتك عندنا إجابة</h2>
          <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: 15, color: T.text2 }}>
            مش لاقي إجابتك؟ تواصل معنا على{' '}
            <a href="https://wa.me/201000000000" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontWeight: 700, textDecoration: 'none' }}>واتساب</a>
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ background: T.surface, border: `1px solid ${open === i ? T.borderAcc : T.border}`, borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.2s', boxShadow: T.mode === 'light' ? '0 1px 4px rgba(0,0,0,0.04)' : 'none' }}>
              <button onClick={() => setOpen(open === i ? null : i)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 20px', background: 'none', border: 'none', cursor: 'pointer', gap: 12 }}>
                <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: 15, fontWeight: 700, color: T.text, textAlign: 'right', flex: 1 }}>{faq.q}</span>
                <span style={{ color: T.accent, flexShrink: 0 }}>{open === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</span>
              </button>
              {open === i && (
                <div style={{ padding: '0 20px 18px' }}>
                  <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: 14, color: T.text2, lineHeight: 1.8, margin: 0 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CTA Banner ────────────────────────────────────────── */
function CTABanner() {
  const T = useTheme()
  const navigate = useNavigate()
  return (
    <section id="cta" dir="rtl" style={{ padding: 'clamp(60px,8vw,100px) clamp(16px,6vw,80px)', textAlign: 'center', background: T.ctaBg, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle, ${T.orb1} 0%, transparent 65%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontFamily: 'Cairo, sans-serif', fontSize: 'clamp(28px,4.5vw,52px)', fontWeight: 900, color: T.ctaTextColor, margin: '0 0 16px', letterSpacing: '-0.5px', lineHeight: 1.2 }}>
          جاهز تطور مطعمك من النهارده؟
        </h2>
        <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: 'clamp(15px,2vw,18px)', color: T.text2, margin: '0 0 12px', maxWidth: 520, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
          انضم لـ +١٢٠٠ مطعم مصري بيستخدموا ريڤيو كل يوم
        </p>
        <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: 14, color: T.accent, margin: '0 0 40px', fontWeight: 600 }}>
          ⚡ ابدأ في أقل من ١٠ دقائق — بدون كريدت كارد — بدون التزام
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/login')}
            style={{ background: T.accent, border: 'none', borderRadius: 14, padding: '16px 44px', fontFamily: 'Cairo, sans-serif', fontWeight: 800, fontSize: 18, color: '#fff', cursor: 'pointer', boxShadow: `0 12px 48px ${T.accent}73`, display: 'inline-flex', alignItems: 'center', gap: 10, transition: 'transform 0.2s, box-shadow 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 16px 56px ${T.accent}8c` }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 12px 48px ${T.accent}73` }}>
            ابدأ مجاناً الآن <ArrowLeft size={20} />
          </button>
          <a href="https://wa.me/201000000000?text=مرحبا،%20أريد%20demo%20مجاني%20لريڤيو" target="_blank" rel="noopener noreferrer"
            style={{ background: 'transparent', border: '1px solid rgba(37,211,102,0.4)', borderRadius: 14, padding: '16px 36px', fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 17, color: '#25D366', cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, transition: 'background 0.2s, border-color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(37,211,102,0.08)'; e.currentTarget.style.borderColor = '#25D366' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(37,211,102,0.4)' }}>
            <MessageCircle size={18} /> Demo مجاني على واتساب
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ────────────────────────────────────────────── */
function Footer() {
  const T = useTheme()
  const navigate = useNavigate()
  return (
    <footer id="footer" dir="rtl" style={{ background: T.footerBg, borderTop: `1px solid ${T.border}`, padding: 'clamp(40px,5vw,64px) clamp(16px,6vw,80px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 40, justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40 }}>
        <div style={{ maxWidth: 280 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, cursor: 'pointer' }} onClick={() => scrollTo('hero')}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: T.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Zap size={18} color="#fff" fill="#fff" /></div>
            <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 800, fontSize: 20, color: T.text }}>ريڤيو</span>
            <span style={{ background: T.accentMut, border: `1px solid ${T.borderAcc}`, borderRadius: 5, padding: '2px 7px', fontFamily: 'Cairo, sans-serif', fontSize: 10, fontWeight: 700, color: T.accent }}>مصر</span>
          </div>
          <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: 14, color: T.text2, lineHeight: 1.75, margin: '0 0 18px' }}>نظام إدارة متكامل للمطاعم المصرية — مصمم بعناية لأصحاب المطاعم العرب</p>
          <a href="https://wa.me/201000000000" target="_blank" rel="noopener noreferrer"
            style={{ width: 36, height: 36, borderRadius: 8, background: '#25D366', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
            <MessageCircle size={18} color="#fff" />
          </a>
        </div>
        <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 13, color: T.text, marginBottom: 16 }}>المنتج</div>
            {[['المميزات','features'],['كيف يعمل','how'],['التسعير','pricing'],['أسئلة شائعة','faq']].map(([label, id]) => (
              <div key={id} style={{ marginBottom: 10 }}>
                <button onClick={() => scrollTo(id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontSize: 14, color: T.text2, padding: 0, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = T.text} onMouseLeave={e => e.target.style.color = T.text2}>{label}</button>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 13, color: T.text, marginBottom: 16 }}>الحساب</div>
            {['تسجيل الدخول','إنشاء حساب مجاني','الدعم الفني'].map(l => (
              <div key={l} style={{ marginBottom: 10 }}>
                <button onClick={() => navigate('/login')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontSize: 14, color: T.text2, padding: 0, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = T.text} onMouseLeave={e => e.target.style.color = T.text2}>{l}</button>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 13, color: T.text, marginBottom: 16 }}>تواصل معنا</div>
            <div style={{ fontFamily: 'Cairo, sans-serif', fontSize: 14, color: T.text2, lineHeight: 2 }}>
              <div>📞 ٠١٠٠٠٠٠٠٠٠٠</div>
              <div>📧 hello@rivyo.com</div>
              <div>🕐 ٩ ص – ١١ م يومياً</div>
              <div style={{ marginTop: 8 }}><a href="https://wa.me/201000000000" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontWeight: 700, textDecoration: 'none' }}>💬 واتساب مباشر</a></div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1100, margin: '0 auto', paddingTop: 20, borderTop: `1px solid ${T.border}`, display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: 13, color: T.text2 }}>© 2025 ريڤيو. جميع الحقوق محفوظة • مصر</span>
        <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: 13, color: T.text2, display: 'flex', alignItems: 'center', gap: 6 }}>
          صُنع بـ <span style={{ color: T.accent }}>♥</span> للمطاعم المصرية
        </span>
      </div>
    </footer>
  )
}

/* ─── Page ──────────────────────────────────────────────── */
export default function Landing() {
  const [isDark, setIsDark] = useState(() => {
    try { return localStorage.getItem('rivyo_theme') !== 'light' } catch { return true }
  })

  const theme = isDark ? DARK : LIGHT

  const toggleTheme = () => {
    setIsDark(d => {
      const next = !d
      try { localStorage.setItem('rivyo_theme', next ? 'dark' : 'light') } catch {}
      return next
    })
  }

  useEffect(() => {
    document.title = 'ريڤيو — نظام إدارة المطاعم #١ في مصر'
    window.scrollTo(0, 0)
  }, [])

  return (
    <ThemeCtx.Provider value={theme}>
      <div dir="rtl" style={{ background: theme.bg, minHeight: '100vh', fontFamily: 'Cairo, sans-serif', overflowX: 'hidden', transition: 'background 0.3s, color 0.3s' }}>
        <Navbar isDark={isDark} onToggle={toggleTheme} />
        <TrustBar />
        <Hero />
        <PainPoints />
        <Features />
        <HowItWorks />
        <ROICalc />
        <Testimonials />
        <Integrations />
        <Pricing />
        <FAQ />
        <CTABanner />
        <Footer />
        <WhatsAppFloat />
      </div>
    </ThemeCtx.Provider>
  )
}
