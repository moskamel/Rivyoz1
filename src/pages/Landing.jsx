import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Zap, Package, UtensilsCrossed, ChefHat, BarChart3,
  Users, Archive, ChevronLeft, Star, Check, ArrowLeft
} from 'lucide-react'

/* ─── Design tokens ─────────────────────────────────────── */
const T = {
  bg:         '#080808',
  surface:    '#111111',
  surface2:   '#1A1A1A',
  surface3:   '#242424',
  border:     'rgba(255,255,255,0.07)',
  borderStr:  'rgba(255,255,255,0.13)',
  borderAcc:  'rgba(249,115,22,0.30)',
  text:       '#F0F0F0',
  text2:      '#8A8A8A',
  accent:     '#F97316',
  accentHov:  '#EA6C10',
  accentMut:  'rgba(249,115,22,0.10)',
  accentGlow: '0 0 32px rgba(249,115,22,0.22)',
  green:      '#22C55E',
  yellow:     '#FBBF24',
}

/* ─── Helpers ───────────────────────────────────────────── */
const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function StarRow({ count = 5, color = T.yellow }) {
  return (
    <span style={{ display: 'inline-flex', gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} fill={color} color={color} />
      ))}
    </span>
  )
}

/* ─── Navbar ────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navStyle = {
    position:        'fixed',
    top:             0,
    insetInline:     0,
    zIndex:          100,
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'space-between',
    padding:         '0 clamp(16px, 5vw, 80px)',
    height:          64,
    background:      scrolled ? 'rgba(8,8,8,0.92)' : 'rgba(8,8,8,0.60)',
    backdropFilter:  'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderBottom:    scrolled ? `1px solid ${T.border}` : '1px solid transparent',
    transition:      'background 0.3s, border-color 0.3s',
  }

  const logoStyle = {
    display:    'flex',
    alignItems: 'center',
    gap:        8,
    cursor:     'pointer',
    textDecoration: 'none',
  }

  const navLinks = [
    { label: 'المميزات', id: 'features' },
    { label: 'التسعير',  id: 'pricing'  },
    { label: 'اتصل بنا', id: 'footer'   },
  ]

  return (
    <nav style={navStyle} dir="rtl">
      {/* Logo */}
      <div style={logoStyle} onClick={() => scrollTo('hero')}>
        <div style={{
          width:          36,
          height:         36,
          borderRadius:   10,
          background:     T.accent,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          boxShadow:      T.accentGlow,
        }}>
          <Zap size={20} color="#fff" fill="#fff" />
        </div>
        <span style={{
          fontFamily:  'Cairo, sans-serif',
          fontWeight:  800,
          fontSize:    22,
          color:       T.text,
          letterSpacing: '-0.5px',
        }}>ريڤيو</span>
      </div>

      {/* Nav links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {navLinks.map(l => (
          <button
            key={l.id}
            onClick={() => scrollTo(l.id)}
            style={{
              background:  'none',
              border:      'none',
              cursor:      'pointer',
              fontFamily:  'Cairo, sans-serif',
              fontWeight:  500,
              fontSize:    15,
              color:       T.text2,
              transition:  'color 0.2s',
              padding:     '4px 0',
            }}
            onMouseEnter={e => e.target.style.color = T.text}
            onMouseLeave={e => e.target.style.color = T.text2}
          >
            {l.label}
          </button>
        ))}

        <button
          onClick={() => navigate('/login')}
          style={{
            background:   T.accent,
            border:       'none',
            borderRadius: 8,
            padding:      '8px 20px',
            fontFamily:   'Cairo, sans-serif',
            fontWeight:   700,
            fontSize:     14,
            color:        '#fff',
            cursor:       'pointer',
            boxShadow:    T.accentGlow,
            transition:   'background 0.2s, transform 0.15s',
          }}
          onMouseEnter={e => { e.target.style.background = T.accentHov; e.target.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.target.style.background = T.accent;    e.target.style.transform = 'translateY(0)' }}
        >
          ابدأ مجاناً
        </button>
      </div>
    </nav>
  )
}

/* ─── Hero ──────────────────────────────────────────────── */
function Hero() {
  const navigate = useNavigate()
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)
  const [count3, setCount3] = useState(0)
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true
    const animate = (setter, target, duration) => {
      const step = target / (duration / 16)
      let cur = 0
      const id = setInterval(() => {
        cur = Math.min(cur + step, target)
        setter(Math.round(cur * 10) / 10)
        if (cur >= target) clearInterval(id)
      }, 16)
    }
    setTimeout(() => {
      animate(setCount1, 2340, 1400)
      animate(setCount2, 18, 900)
      animate(setCount3, 4.9, 800)
    }, 400)
  }, [])

  return (
    <section
      id="hero"
      style={{
        position:       'relative',
        minHeight:      '100vh',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        textAlign:      'center',
        padding:        'clamp(100px, 14vw, 160px) clamp(16px, 6vw, 80px) 80px',
        overflow:       'hidden',
      }}
      dir="rtl"
    >
      {/* Decorative orbs */}
      <div style={{
        position:     'absolute',
        top:          '8%',
        right:        '10%',
        width:        480,
        height:       480,
        borderRadius: '50%',
        background:   'radial-gradient(circle, rgba(249,115,22,0.13) 0%, transparent 70%)',
        pointerEvents: 'none',
        filter:       'blur(1px)',
      }} />
      <div style={{
        position:     'absolute',
        bottom:       '10%',
        left:         '8%',
        width:        360,
        height:       360,
        borderRadius: '50%',
        background:   'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position:     'absolute',
        top:          '35%',
        left:         '20%',
        width:        200,
        height:       200,
        borderRadius: '50%',
        background:   'radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Badge */}
      <div style={{
        display:      'inline-flex',
        alignItems:   'center',
        gap:          6,
        background:   T.accentMut,
        border:       `1px solid ${T.borderAcc}`,
        borderRadius: 999,
        padding:      '5px 14px',
        marginBottom: 28,
      }}>
        <Zap size={14} color={T.accent} fill={T.accent} />
        <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: 13, fontWeight: 600, color: T.accent }}>
          نظام إدارة المطاعم #1
        </span>
      </div>

      {/* Headline */}
      <h1 style={{
        fontFamily:   'Cairo, sans-serif',
        fontSize:     'clamp(36px, 6vw, 72px)',
        fontWeight:   900,
        color:        T.text,
        lineHeight:   1.15,
        margin:       '0 0 20px',
        maxWidth:     800,
        letterSpacing: '-1px',
      }}>
        أدر مطعمك بذكاء مع{' '}
        <span style={{ color: T.accent, textShadow: '0 0 40px rgba(249,115,22,0.4)' }}>
          ريڤيو
        </span>
      </h1>

      {/* Subtext */}
      <p style={{
        fontFamily: 'Cairo, sans-serif',
        fontSize:   'clamp(15px, 2vw, 19px)',
        fontWeight: 400,
        color:      T.text2,
        lineHeight: 1.8,
        maxWidth:   580,
        margin:     '0 0 40px',
      }}>
        نظام إدارة متكامل للمطاعم — طلبات، قائمة، مطبخ، تقارير — كل شيء في مكان واحد
      </p>

      {/* CTA buttons */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 64 }}>
        <button
          onClick={() => navigate('/login')}
          style={{
            background:   T.accent,
            border:       'none',
            borderRadius: 12,
            padding:      '14px 32px',
            fontFamily:   'Cairo, sans-serif',
            fontWeight:   700,
            fontSize:     17,
            color:        '#fff',
            cursor:       'pointer',
            boxShadow:    '0 8px 32px rgba(249,115,22,0.35)',
            display:      'flex',
            alignItems:   'center',
            gap:          8,
            transition:   'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(249,115,22,0.45)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)';    e.currentTarget.style.boxShadow = '0 8px 32px rgba(249,115,22,0.35)' }}
        >
          ابدأ مجاناً
          <ArrowLeft size={18} />
        </button>

        <button
          onClick={() => scrollTo('how')}
          style={{
            background:   'transparent',
            border:       `1px solid ${T.borderStr}`,
            borderRadius: 12,
            padding:      '14px 32px',
            fontFamily:   'Cairo, sans-serif',
            fontWeight:   600,
            fontSize:     17,
            color:        T.text2,
            cursor:       'pointer',
            transition:   'border-color 0.2s, color 0.2s, transform 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.color = T.text; e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = T.borderStr; e.currentTarget.style.color = T.text2; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          شاهد كيف يعمل
        </button>
      </div>

      {/* Stats row */}
      <div style={{
        display:      'flex',
        gap:          'clamp(20px, 4vw, 56px)',
        flexWrap:     'wrap',
        justifyContent: 'center',
        background:   T.surface,
        border:       `1px solid ${T.border}`,
        borderRadius: 16,
        padding:      '20px 40px',
        backdropFilter: 'blur(8px)',
      }}>
        {[
          { value: `${Math.round(count1).toLocaleString('ar-EG')} ج`, label: 'مبيعات في يوم واحد' },
          { value: `${Math.round(count2)} طلب`, label: 'متوسط الطلبات اليومية' },
          { value: `${count3.toFixed(1)} ★`, label: 'متوسط تقييم العملاء', gold: true },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily:   'Inter, Cairo, sans-serif',
              fontWeight:   800,
              fontSize:     'clamp(22px, 3vw, 32px)',
              color:        s.gold ? T.yellow : T.accent,
              lineHeight:   1,
              marginBottom: 4,
            }}>
              {s.value}
            </div>
            <div style={{ fontFamily: 'Cairo, sans-serif', fontSize: 13, color: T.text2, fontWeight: 500 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Features ──────────────────────────────────────────── */
const FEATURES = [
  {
    icon:  <Package size={26} color={T.accent} />,
    title: 'إدارة الطلبات',
    desc:  'تتبع كل طلب في الوقت الفعلي — من الاستلام حتى التسليم بشفافية كاملة',
  },
  {
    icon:  <UtensilsCrossed size={26} color={T.accent} />,
    title: 'قائمة ذكية',
    desc:  'أضف وعدّل الأصناف بسهولة، وتحكم بالأسعار والصور والتصنيفات',
  },
  {
    icon:  <ChefHat size={26} color={T.accent} />,
    title: 'شاشة المطبخ KDS',
    desc:  'عرض فوري للطلبات على شاشة الطباخين مع تحديثات تلقائية',
  },
  {
    icon:  <BarChart3 size={26} color={T.accent} />,
    title: 'تقارير مفصلة',
    desc:  'تحليل المبيعات والأداء يومياً وأسبوعياً وشهرياً بمخططات بيانية',
  },
  {
    icon:  <Users size={26} color={T.accent} />,
    title: 'إدارة الفريق',
    desc:  'صلاحيات وأدوار لكل موظف — مدير، كاشير، طباخ، توصيل',
  },
  {
    icon:  <Archive size={26} color={T.accent} />,
    title: 'المخزون',
    desc:  'تتبع المواد والمخزون تلقائياً مع تنبيهات عند نفاد الكميات',
  },
]

function FeatureCard({ icon, title, desc }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background:   hov ? T.surface2 : T.surface,
        border:       `1px solid ${hov ? T.borderAcc : T.border}`,
        borderRadius: 16,
        padding:      '28px 24px',
        transition:   'background 0.25s, border-color 0.25s, transform 0.25s, box-shadow 0.25s',
        transform:    hov ? 'translateY(-4px)' : 'none',
        boxShadow:    hov ? T.accentGlow : 'none',
        cursor:       'default',
      }}
    >
      <div style={{
        width:          48,
        height:         48,
        borderRadius:   12,
        background:     T.accentMut,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        marginBottom:   16,
        border:         `1px solid ${T.borderAcc}`,
      }}>
        {icon}
      </div>
      <h3 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 17, color: T.text, margin: '0 0 8px' }}>
        {title}
      </h3>
      <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: 14, color: T.text2, lineHeight: 1.7, margin: 0 }}>
        {desc}
      </p>
    </div>
  )
}

function Features() {
  return (
    <section
      id="features"
      style={{
        padding:  'clamp(60px, 8vw, 120px) clamp(16px, 6vw, 80px)',
        maxWidth: 1100,
        margin:   '0 auto',
      }}
      dir="rtl"
    >
      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <div style={{
          display:      'inline-flex',
          alignItems:   'center',
          gap:          6,
          background:   T.accentMut,
          border:       `1px solid ${T.borderAcc}`,
          borderRadius: 999,
          padding:      '4px 14px',
          marginBottom: 16,
        }}>
          <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: 13, fontWeight: 600, color: T.accent }}>المميزات</span>
        </div>
        <h2 style={{
          fontFamily:   'Cairo, sans-serif',
          fontSize:     'clamp(28px, 4vw, 44px)',
          fontWeight:   800,
          color:        T.text,
          margin:       '0 0 12px',
          letterSpacing: '-0.5px',
        }}>
          كل ما تحتاجه لإدارة مطعمك
        </h2>
        <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: 16, color: T.text2, margin: 0 }}>
          منصة واحدة تجمع كل أدوات إدارة مطعمك في مكان واحد
        </p>
      </div>

      {/* Grid */}
      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap:                 20,
      }}>
        {FEATURES.map((f, i) => (
          <FeatureCard key={i} {...f} />
        ))}
      </div>
    </section>
  )
}

/* ─── How it works ──────────────────────────────────────── */
const STEPS = [
  {
    num:   '01',
    icon:  <Zap size={22} color={T.accent} />,
    title: 'سجّل مطعمك',
    desc:  'أنشئ حسابك في دقيقتين — أدخل اسم مطعمك وابدأ مباشرة بدون أي تعقيد',
  },
  {
    num:   '02',
    icon:  <UtensilsCrossed size={22} color={T.accent} />,
    title: 'أضف قائمتك',
    desc:  'استورد قائمتك الموجودة أو أنشئ قائمة من الصفر بالأصناف والأسعار والصور',
  },
  {
    num:   '03',
    icon:  <Package size={22} color={T.accent} />,
    title: 'ابدأ الطلبات',
    desc:  'استقبل وأدر الطلبات فوراً عبر لوحة التحكم وشاشة المطبخ KDS',
  },
]

function HowItWorks() {
  return (
    <section
      id="how"
      style={{
        padding:    'clamp(60px, 8vw, 120px) clamp(16px, 6vw, 80px)',
        background: T.surface,
        borderTop:  `1px solid ${T.border}`,
        borderBottom: `1px solid ${T.border}`,
      }}
      dir="rtl"
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{
            display:      'inline-flex',
            alignItems:   'center',
            gap:          6,
            background:   T.accentMut,
            border:       `1px solid ${T.borderAcc}`,
            borderRadius: 999,
            padding:      '4px 14px',
            marginBottom: 16,
          }}>
            <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: 13, fontWeight: 600, color: T.accent }}>كيف يعمل</span>
          </div>
          <h2 style={{
            fontFamily:   'Cairo, sans-serif',
            fontSize:     'clamp(28px, 4vw, 44px)',
            fontWeight:   800,
            color:        T.text,
            margin:       '0 0 12px',
            letterSpacing: '-0.5px',
          }}>
            ابدأ في ٣ خطوات بسيطة
          </h2>
          <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: 16, color: T.text2, margin: 0 }}>
            بدون تعقيد ولا تدريب مطوّل — ريڤيو مصمم ليكون سهلاً من اليوم الأول
          </p>
        </div>

        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap:                 24,
          position:            'relative',
        }}>
          {STEPS.map((s, i) => (
            <div
              key={i}
              style={{
                background:   T.bg,
                border:       `1px solid ${T.border}`,
                borderRadius: 16,
                padding:      '32px 24px',
                position:     'relative',
                overflow:     'hidden',
              }}
            >
              {/* Big number background */}
              <div style={{
                position:   'absolute',
                top:        -10,
                left:       16,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 900,
                fontSize:   80,
                color:      'rgba(249,115,22,0.05)',
                lineHeight: 1,
                userSelect: 'none',
              }}>
                {s.num}
              </div>

              {/* Number badge */}
              <div style={{
                width:          40,
                height:         40,
                borderRadius:   '50%',
                background:     T.accent,
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                marginBottom:   16,
                fontFamily:     'Inter, sans-serif',
                fontWeight:     800,
                fontSize:       16,
                color:          '#fff',
                boxShadow:      T.accentGlow,
              }}>
                {i + 1}
              </div>

              <h3 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 18, color: T.text, margin: '0 0 10px' }}>
                {s.title}
              </h3>
              <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: 14, color: T.text2, lineHeight: 1.75, margin: 0 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Testimonials ──────────────────────────────────────── */
const TESTIMONIALS = [
  {
    name:     'أحمد الزهراني',
    role:     'صاحب مطعم شاورما كينج',
    quote:    'ريڤيو غيّر طريقة إدارتي للمطعم كلياً. الآن أتابع الطلبات والمخزون من موبايلي بسهولة تامة. المبيعات زادت ٣٠٪ في الشهر الأول!',
    stars:    5,
  },
  {
    name:     'سارة العتيبي',
    role:     'مديرة كافيه ميترو',
    quote:    'شاشة المطبخ KDS أنقذت عملياتنا في أوقات الذروة. فريق المطبخ الآن منظم ومرتاح والأخطاء انتهت تقريباً.',
    stars:    5,
  },
  {
    name:     'خالد المطيري',
    role:     'صاحب بيتزا بلازا',
    quote:    'التقارير المفصلة ساعدتني أعرف أي أصناف تحقق أعلى ربح. الدعم الفني ممتاز ويرد بسرعة. أنصح كل أصحاب المطاعم باستخدامه.',
    stars:    5,
  },
]

function TestimonialCard({ name, role, quote, stars }) {
  return (
    <div style={{
      background:   T.surface,
      border:       `1px solid ${T.border}`,
      borderRadius: 16,
      padding:      '28px 24px',
      display:      'flex',
      flexDirection: 'column',
      gap:          16,
    }}>
      <StarRow count={stars} />
      <p style={{
        fontFamily: 'Cairo, sans-serif',
        fontSize:   15,
        color:      T.text,
        lineHeight: 1.8,
        margin:     0,
        flex:       1,
      }}>
        "{quote}"
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width:          44,
          height:         44,
          borderRadius:   '50%',
          background:     `linear-gradient(135deg, ${T.accent}, #c25905)`,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          fontFamily:     'Cairo, sans-serif',
          fontWeight:     800,
          fontSize:       18,
          color:          '#fff',
          flexShrink:     0,
        }}>
          {name[0]}
        </div>
        <div>
          <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 15, color: T.text }}>{name}</div>
          <div style={{ fontFamily: 'Cairo, sans-serif', fontSize: 13, color: T.text2 }}>{role}</div>
        </div>
      </div>
    </div>
  )
}

function Testimonials() {
  return (
    <section
      id="testimonials"
      style={{
        padding:  'clamp(60px, 8vw, 120px) clamp(16px, 6vw, 80px)',
        maxWidth: 1100,
        margin:   '0 auto',
      }}
      dir="rtl"
    >
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <div style={{
          display:      'inline-flex',
          alignItems:   'center',
          gap:          6,
          background:   T.accentMut,
          border:       `1px solid ${T.borderAcc}`,
          borderRadius: 999,
          padding:      '4px 14px',
          marginBottom: 16,
        }}>
          <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: 13, fontWeight: 600, color: T.accent }}>آراء العملاء</span>
        </div>
        <h2 style={{
          fontFamily:   'Cairo, sans-serif',
          fontSize:     'clamp(28px, 4vw, 44px)',
          fontWeight:   800,
          color:        T.text,
          margin:       '0 0 12px',
          letterSpacing: '-0.5px',
        }}>
          ماذا يقول أصحاب المطاعم
        </h2>
        <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: 16, color: T.text2, margin: 0 }}>
          انضم إلى مئات المطاعم التي طوّرت أعمالها مع ريڤيو
        </p>
      </div>

      <div style={{
        display:             'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap:                 20,
      }}>
        {TESTIMONIALS.map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </div>
    </section>
  )
}

/* ─── Pricing ───────────────────────────────────────────── */
const FREE_FEATURES    = ['حتى ٥٠ طلب/شهر', 'قائمة واحدة', 'تقارير أساسية', 'دعم بريد إلكتروني']
const PRO_FEATURES     = ['طلبات غير محدودة', 'قوائم متعددة', 'شاشة المطبخ KDS', 'إدارة فريق العمل', 'تقارير متقدمة ومخططات', 'دعم أولوية ٢٤/٧']

function PricingCard({ title, price, features, highlighted, badge, onStart }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background:   highlighted ? T.surface2 : T.surface,
        border:       highlighted
          ? `2px solid ${T.accent}`
          : `1px solid ${hov ? T.borderStr : T.border}`,
        borderRadius: 20,
        padding:      '36px 32px',
        position:     'relative',
        transition:   'transform 0.25s, box-shadow 0.25s',
        transform:    (highlighted || hov) ? 'translateY(-6px)' : 'none',
        boxShadow:    highlighted ? T.accentGlow : 'none',
        flex:         1,
        minWidth:     260,
        maxWidth:     400,
      }}
    >
      {badge && (
        <div style={{
          position:    'absolute',
          top:         -14,
          right:       24,
          background:  T.accent,
          borderRadius: 999,
          padding:     '4px 16px',
          fontFamily:  'Cairo, sans-serif',
          fontWeight:  700,
          fontSize:    12,
          color:       '#fff',
        }}>
          {badge}
        </div>
      )}

      <h3 style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 20, color: T.text, margin: '0 0 8px' }}>
        {title}
      </h3>

      <div style={{ marginBottom: 24 }}>
        {price === 0 ? (
          <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 800, fontSize: 36, color: T.text }}>مجاني</span>
        ) : (
          <span style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, fontSize: 42, color: T.accent }}>{price}</span>
            <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: 16, color: T.text2 }}>ج/شهر</span>
          </span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
        {features.map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width:          22,
              height:         22,
              borderRadius:   '50%',
              background:     T.accentMut,
              border:         `1px solid ${T.borderAcc}`,
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              flexShrink:     0,
            }}>
              <Check size={12} color={T.accent} strokeWidth={3} />
            </div>
            <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: 14, color: T.text2 }}>{f}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onStart}
        style={{
          width:        '100%',
          background:   highlighted ? T.accent : 'transparent',
          border:       highlighted ? 'none' : `1px solid ${T.borderStr}`,
          borderRadius: 10,
          padding:      '12px',
          fontFamily:   'Cairo, sans-serif',
          fontWeight:   700,
          fontSize:     15,
          color:        highlighted ? '#fff' : T.text2,
          cursor:       'pointer',
          transition:   'background 0.2s, color 0.2s',
          boxShadow:    highlighted ? '0 4px 20px rgba(249,115,22,0.30)' : 'none',
        }}
        onMouseEnter={e => {
          if (!highlighted) { e.currentTarget.style.background = T.accentMut; e.currentTarget.style.color = T.accent }
        }}
        onMouseLeave={e => {
          if (!highlighted) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = T.text2 }
        }}
      >
        {highlighted ? 'ابدأ الاحترافي ←' : 'ابدأ مجاناً'}
      </button>
    </div>
  )
}

function Pricing() {
  const navigate = useNavigate()
  return (
    <section
      id="pricing"
      style={{
        padding:    'clamp(60px, 8vw, 120px) clamp(16px, 6vw, 80px)',
        background: T.surface,
        borderTop:  `1px solid ${T.border}`,
        borderBottom: `1px solid ${T.border}`,
      }}
      dir="rtl"
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{
            display:      'inline-flex',
            alignItems:   'center',
            gap:          6,
            background:   T.accentMut,
            border:       `1px solid ${T.borderAcc}`,
            borderRadius: 999,
            padding:      '4px 14px',
            marginBottom: 16,
          }}>
            <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: 13, fontWeight: 600, color: T.accent }}>التسعير</span>
          </div>
          <h2 style={{
            fontFamily:   'Cairo, sans-serif',
            fontSize:     'clamp(28px, 4vw, 44px)',
            fontWeight:   800,
            color:        T.text,
            margin:       '0 0 12px',
            letterSpacing: '-0.5px',
          }}>
            اختر الخطة المناسبة لك
          </h2>
          <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: 16, color: T.text2, margin: 0 }}>
            ابدأ مجاناً وطوّر عند الحاجة — بدون رسوم خفية
          </p>
        </div>

        <div style={{
          display:        'flex',
          gap:            24,
          justifyContent: 'center',
          flexWrap:       'wrap',
          alignItems:     'stretch',
        }}>
          <PricingCard
            title="الخطة المجانية"
            price={0}
            features={FREE_FEATURES}
            highlighted={false}
            onStart={() => navigate('/login')}
          />
          <PricingCard
            title="الخطة الاحترافية"
            price={149}
            features={PRO_FEATURES}
            highlighted={true}
            badge="الأكثر شيوعاً"
            onStart={() => navigate('/login')}
          />
        </div>
      </div>
    </section>
  )
}

/* ─── CTA Banner ────────────────────────────────────────── */
function CTABanner() {
  const navigate = useNavigate()
  return (
    <section
      id="cta"
      style={{
        padding:    'clamp(60px, 8vw, 100px) clamp(16px, 6vw, 80px)',
        textAlign:  'center',
        background: `linear-gradient(135deg, #0f0f0f 0%, #1a0a00 50%, #0f0f0f 100%)`,
        position:   'relative',
        overflow:   'hidden',
      }}
      dir="rtl"
    >
      {/* Glow orb */}
      <div style={{
        position:     'absolute',
        top:          '50%',
        left:         '50%',
        transform:    'translate(-50%, -50%)',
        width:        600,
        height:       600,
        borderRadius: '50%',
        background:   'radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2 style={{
          fontFamily:   'Cairo, sans-serif',
          fontSize:     'clamp(28px, 4.5vw, 52px)',
          fontWeight:   900,
          color:        T.text,
          margin:       '0 0 16px',
          letterSpacing: '-0.5px',
          lineHeight:   1.2,
        }}>
          جاهز لتطوير مطعمك؟
        </h2>
        <p style={{
          fontFamily: 'Cairo, sans-serif',
          fontSize:   'clamp(15px, 2vw, 18px)',
          color:      T.text2,
          margin:     '0 0 40px',
          maxWidth:   480,
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: 1.7,
        }}>
          انضم إلى مئات المطاعم التي تستخدم ريڤيو لإدارة أعمالها بكفاءة وذكاء
        </p>
        <button
          onClick={() => navigate('/login')}
          style={{
            background:   T.accent,
            border:       'none',
            borderRadius: 14,
            padding:      '16px 44px',
            fontFamily:   'Cairo, sans-serif',
            fontWeight:   800,
            fontSize:     18,
            color:        '#fff',
            cursor:       'pointer',
            boxShadow:    '0 12px 48px rgba(249,115,22,0.45)',
            display:      'inline-flex',
            alignItems:   'center',
            gap:          10,
            transition:   'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 56px rgba(249,115,22,0.55)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 12px 48px rgba(249,115,22,0.45)' }}
        >
          ابدأ مجاناً الآن
          <ArrowLeft size={20} />
        </button>
      </div>
    </section>
  )
}

/* ─── Footer ────────────────────────────────────────────── */
function Footer() {
  const navigate = useNavigate()
  return (
    <footer
      id="footer"
      style={{
        background:  T.surface,
        borderTop:   `1px solid ${T.border}`,
        padding:     'clamp(32px, 5vw, 56px) clamp(16px, 6vw, 80px)',
      }}
      dir="rtl"
    >
      <div style={{
        maxWidth:      1100,
        margin:        '0 auto',
        display:       'flex',
        flexWrap:      'wrap',
        gap:           32,
        justifyContent: 'space-between',
        alignItems:    'flex-start',
        marginBottom:  32,
      }}>
        {/* Logo & tagline */}
        <div style={{ maxWidth: 300 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, cursor: 'pointer' }} onClick={() => scrollTo('hero')}>
            <div style={{
              width:          34,
              height:         34,
              borderRadius:   9,
              background:     T.accent,
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
            }}>
              <Zap size={18} color="#fff" fill="#fff" />
            </div>
            <span style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 800, fontSize: 20, color: T.text }}>ريڤيو</span>
          </div>
          <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: 14, color: T.text2, lineHeight: 1.7, margin: 0 }}>
            نظام إدارة متكامل للمطاعم — مصمم بعناية لأصحاب المطاعم العرب
          </p>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 14, color: T.text, marginBottom: 14 }}>المنتج</div>
            {['المميزات', 'التسعير', 'شاشة المطبخ', 'التقارير'].map(l => (
              <div key={l} style={{ marginBottom: 10 }}>
                <button
                  onClick={() => scrollTo(l === 'المميزات' ? 'features' : l === 'التسعير' ? 'pricing' : 'features')}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'Cairo, sans-serif', fontSize: 14, color: T.text2,
                    padding: 0, transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.target.style.color = T.text}
                  onMouseLeave={e => e.target.style.color = T.text2}
                >
                  {l}
                </button>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 700, fontSize: 14, color: T.text, marginBottom: 14 }}>الحساب</div>
            {['تسجيل الدخول', 'إنشاء حساب', 'الدعم الفني'].map(l => (
              <div key={l} style={{ marginBottom: 10 }}>
                <button
                  onClick={() => navigate('/login')}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'Cairo, sans-serif', fontSize: 14, color: T.text2,
                    padding: 0, transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.target.style.color = T.text}
                  onMouseLeave={e => e.target.style.color = T.text2}
                >
                  {l}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth:      1100,
        margin:        '0 auto',
        paddingTop:    20,
        borderTop:     `1px solid ${T.border}`,
        display:       'flex',
        flexWrap:      'wrap',
        gap:           12,
        justifyContent: 'space-between',
        alignItems:    'center',
      }}>
        <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: 13, color: T.text2 }}>
          © 2025 ريڤيو. جميع الحقوق محفوظة.
        </span>
        <span style={{
          fontFamily:   'Cairo, sans-serif',
          fontSize:     13,
          color:        T.text2,
          display:      'flex',
          alignItems:   'center',
          gap:          6,
        }}>
          صُنع بـ
          <span style={{ color: T.accent }}>♥</span>
          للمطاعم العربية
        </span>
      </div>
    </footer>
  )
}

/* ─── Page ──────────────────────────────────────────────── */
export default function Landing() {
  useEffect(() => {
    document.title = 'ريڤيو — نظام إدارة المطاعم الذكي'
    // Ensure page starts at top
    window.scrollTo(0, 0)
  }, [])

  return (
    <div
      dir="rtl"
      style={{
        background:  T.bg,
        minHeight:   '100vh',
        fontFamily:  'Cairo, sans-serif',
        overflowX:   'hidden',
      }}
    >
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <CTABanner />
      <Footer />
    </div>
  )
}
