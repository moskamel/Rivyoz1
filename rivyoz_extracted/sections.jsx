// Landing page sections — Reviyoz
const { useState, useEffect, useRef } = React;

// ============================================================
// SECTION HEADER (consistent across all sections)
// ============================================================
const SectionLabel = ({ num, title, color = '#C95FA0' }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: 12,
    marginBottom: 28,
    padding: '7px 16px 7px 20px',
    background: 'rgba(255,255,255,0.4)',
    border: `1px solid ${color}33`,
    borderRadius: 99, lineHeight: 1.2,
  }}>
    <span style={{
      fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 700,
      color, letterSpacing: 1, lineHeight: 1.2,
    }}>{num}</span>
    <span style={{
      width: 24, height: 1, background: color, opacity: 0.5,
    }} />
    <span style={{
      fontSize: 15, fontWeight: 700, color: color, letterSpacing: 1, lineHeight: 1.2,
    }}>{title}</span>
  </div>
);

// ============================================================
// REUSABLE: App Store + Google Play buttons (mini + full sizes)
// ============================================================
const AppleIcon = ({ size = 22, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
  </svg>
);
const PlayIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <defs>
      <linearGradient id={`pg-${size}-a`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#00C9FF"/>
        <stop offset="100%" stopColor="#005FCE"/>
      </linearGradient>
      <linearGradient id={`pg-${size}-b`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFE000"/>
        <stop offset="100%" stopColor="#FFBD00"/>
      </linearGradient>
      <linearGradient id={`pg-${size}-c`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FF3A44"/>
        <stop offset="100%" stopColor="#C31162"/>
      </linearGradient>
      <linearGradient id={`pg-${size}-d`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#00F176"/>
        <stop offset="100%" stopColor="#00A661"/>
      </linearGradient>
    </defs>
    <path fill={`url(#pg-${size}-a)`} d="M3.5 2.6C3.2 2.9 3 3.4 3 4v16c0 .6.2 1.1.5 1.4l9.4-9.4z"/>
    <path fill={`url(#pg-${size}-b)`} d="M16.8 9.2l-4 2.3 4 2.3 3.2-1.8c.8-.5.8-1.3 0-1.8z"/>
    <path fill={`url(#pg-${size}-c)`} d="M3.5 21.4c.5.5 1.3.5 2.2.1l11.1-6.3-4-2.3z"/>
    <path fill={`url(#pg-${size}-d)`} d="M3.5 2.6l9.4 9.3 4-2.3L5.7 2.5C5.3 2.3 4.8 2.2 4.4 2.2c-.4 0-.7.1-.9.4z"/>
  </svg>
);

const AppStoreBtn = ({ size = 'md', theme = 'dark' }) => {
  const sizes = {
    sm: { padding: '8px 14px', icon: 20, sub: 9, main: 14, gap: 8, radius: 12 },
    md: { padding: '14px 22px', icon: 26, sub: 11, main: 16, gap: 12, radius: 14 },
    lg: { padding: '18px 28px', icon: 32, sub: 12, main: 18, gap: 14, radius: 16 },
  };
  const s = sizes[size];
  const isDark = theme === 'dark';
  return (
    <a href="#" style={{
      background: isDark ? '#1B0E2B' : '#fff',
      color: isDark ? '#fff' : '#1B0E2B',
      padding: s.padding, borderRadius: s.radius,
      display: 'inline-flex', alignItems: 'center', gap: s.gap,
      fontWeight: 700,
      border: isDark ? 'none' : '1px solid rgba(67,36,103,0.12)',
      textDecoration: 'none',
      boxShadow: '0 8px 20px -10px rgba(27,14,43,0.3)',
    }}>
      <AppleIcon size={s.icon} color={isDark ? '#fff' : '#1B0E2B'} />
      <span style={{ textAlign: 'right', lineHeight: 1.1 }}>
        <div style={{ fontSize: s.sub, opacity: isDark ? 0.7 : 0.6, fontWeight: 500 }}>حمّل من</div>
        <div style={{ fontSize: s.main, fontWeight: 800 }}>آب ستور</div>
      </span>
    </a>
  );
};

const GooglePlayBtn = ({ size = 'md', theme = 'light' }) => {
  const sizes = {
    sm: { padding: '8px 14px', icon: 20, sub: 9, main: 14, gap: 8, radius: 12 },
    md: { padding: '14px 22px', icon: 26, sub: 11, main: 16, gap: 12, radius: 14 },
    lg: { padding: '18px 28px', icon: 32, sub: 12, main: 18, gap: 14, radius: 16 },
  };
  const s = sizes[size];
  const isDark = theme === 'dark';
  return (
    <a href="#" style={{
      background: isDark ? '#1B0E2B' : '#fff',
      color: isDark ? '#fff' : '#1B0E2B',
      padding: s.padding, borderRadius: s.radius,
      display: 'inline-flex', alignItems: 'center', gap: s.gap,
      fontWeight: 700,
      border: isDark ? 'none' : '1px solid rgba(67,36,103,0.12)',
      textDecoration: 'none',
      boxShadow: '0 8px 20px -10px rgba(27,14,43,0.3)',
    }}>
      <PlayIcon size={s.icon} />
      <span style={{ textAlign: 'right', lineHeight: 1.1 }}>
        <div style={{ fontSize: s.sub, opacity: isDark ? 0.7 : 0.6, fontWeight: 500 }}>متاح على</div>
        <div style={{ fontSize: s.main, fontWeight: 800 }}>جوجل بلاي</div>
      </span>
    </a>
  );
};

// ============================================================
// NAV
// ============================================================
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      padding: scrolled ? '10px 32px' : '16px 32px',
      background: scrolled ? 'rgba(251,246,241,0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(67,36,103,0.06)' : '1px solid transparent',
      transition: 'all 0.3s',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      gap: 24,
    }}>
      <a href="index.html" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <img src="assets/logo.svg" alt="Rivyoz ريفيوز" style={{ height: 40, width: 'auto', display: 'block' }} />
      </a>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
        {[
          { label: 'الرئيسية', href: '#' },
          { label: 'من نحن', href: 'pages/about.html' },
          { label: 'المميزات', href: 'pages/features.html' },
          { label: 'الوظائف', href: 'pages/careers.html' },
          { label: 'المدوّنة', href: 'pages/blog.html' },
          { label: 'تواصل معنا', href: 'pages/contact.html' },
        ].map(l => (
          <a key={l.label} href={l.href} style={{
            fontSize: 15, fontWeight: 600, color: '#1B0E2B', opacity: 0.75,
            whiteSpace: 'nowrap',
          }}>{l.label}</a>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <AppStoreBtn size="sm" theme="dark" />
        <GooglePlayBtn size="sm" theme="light" />
      </div>
    </nav>
  );
};

// ============================================================
// HERO
// ============================================================
const Hero = () => {
  const [time, setTime] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const loop = (t) => { setTime((t - start) / 1000); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <section style={{
      minHeight: '100vh', position: 'relative',
      background: 'linear-gradient(180deg, #FCDDD0 0%, #FDF8FF 55%, #E5D4F2 100%)',
      paddingTop: 110, paddingBottom: 180, overflow: 'hidden',
    }}>
      {/* decorative blobs */}
      <div style={{
        position: 'absolute', top: '15%', right: '-10%', width: 600, height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,135,98,0.35), transparent 70%)',
        filter: 'blur(20px)', transform: `translateY(${Math.sin(time*0.5)*20}px)`,
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', left: '-10%', width: 700, height: 700,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(67,36,103,0.2), transparent 70%)',
        filter: 'blur(40px)', transform: `translateY(${Math.cos(time*0.4)*30}px)`,
      }} />

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px', position: 'relative' }}>
        {/* meta strip — two prominent pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36, flexWrap: 'wrap' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#fff', border: '1px solid rgba(67,36,103,0.08)',
            padding: '8px 16px', borderRadius: 99,
            fontSize: 14, color: '#1B0E2B', fontWeight: 600,
            boxShadow: '0 4px 12px -6px rgba(67,36,103,0.1)',
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#F58762', boxShadow: '0 0 8px #F58762',
            }} />
            أكثر من <strong style={{ color: '#C95FA0', fontSize: 15 }}><span className="mono">٥٠</span> ألف</strong> منتج
          </span>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#1B0E2B', color: '#FCDDD0',
            padding: '8px 16px', borderRadius: 99,
            fontSize: 14, fontWeight: 600,
            boxShadow: '0 4px 12px -6px rgba(67,36,103,0.2)',
          }}>
            <Icon name="shop" size={14} color="#F58762" strokeWidth={1.8} />
            أكثر من <strong style={{ color: '#F58762', fontSize: 15 }}><span className="mono">٢٠٠٠</span></strong> متجر
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 60, alignItems: 'center' }}>
          {/* Left: massive headline */}
          <div>
            <h1 style={{
              fontSize: 'clamp(60px, 8vw, 130px)',
              fontWeight: 900, lineHeight: 1.35, letterSpacing: '-0.04em',
              color: '#1B0E2B', marginBottom: 28,
            }}>
              <div>اكتشف.</div>
              <div className="grad-text">قارن.</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, flexWrap: 'wrap' }}>
                <span>اشترِ</span>
                <span style={{
                  fontSize: '0.5em', fontWeight: 400, fontStyle: 'italic',
                  color: '#6B5575', letterSpacing: '0',
                }}>— بذكاء.</span>
              </div>
            </h1>
            <p style={{
              fontSize: 22, lineHeight: 1.5, color: '#3a2649',
              maxWidth: 540, marginBottom: 36, fontWeight: 400,
            }}>
              تطبيق عربي يجمع لك آلاف المنتجات من أكبر المتاجر،
              يقارن أسعارها لحظياً، ويُريك المراجعات الحقيقية —
              كل ذلك بمسحة كاميرا واحدة.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 44 }}>
              <AppStoreBtn size="md" theme="dark" />
              <GooglePlayBtn size="md" theme="light" />
            </div>

            {/* enhanced stats */}
            <div style={{
              display: 'flex', gap: 16, paddingTop: 28,
              borderTop: '1px solid rgba(67,36,103,0.1)',
            }}>
              {[
                { num: '٥٠', sup: 'ألف+', label: 'منتج مفهرس', icon: 'shopBag', color: '#F58762' },
                { num: '٢٠', sup: '+', label: 'متجر شريك', icon: 'shop', color: '#C95FA0' },
                { num: '٤٫٩', sup: '★', label: 'تقييم آب ستور', icon: 'star', color: '#432467' },
              ].map((s, i) => (
                <div key={i} style={{
                  flex: 1, position: 'relative',
                  background: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(67,36,103,0.06)',
                  borderRadius: 16, padding: '16px 18px',
                  backdropFilter: 'blur(8px)',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', top: -8, left: -8,
                    width: 60, height: 60, borderRadius: '50%',
                    background: `${s.color}18`, filter: 'blur(8px)',
                  }} />
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, position: 'relative' }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: 10,
                      background: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon name={s.icon} size={16} color={s.color} strokeWidth={1.8} bold={s.icon === 'star'} />
                    </div>
                    <span style={{
                      fontSize: 10, fontWeight: 700, color: s.color,
                      fontFamily: 'JetBrains Mono', letterSpacing: 1,
                    }}>{String(i+1).padStart(2,'0')}</span>
                  </div>
                  <div style={{
                    display: 'flex', alignItems: 'baseline', gap: 4,
                    fontSize: 38, fontWeight: 900, color: '#1B0E2B',
                    lineHeight: 1, letterSpacing: '-0.03em',
                    position: 'relative',
                  }}>
                    <span className="mono">{s.num}</span>
                    <span style={{
                      fontSize: 18, color: s.color, fontWeight: 800,
                    }}>{s.sup}</span>
                  </div>
                  <div style={{ fontSize: 13, color: '#6B5575', marginTop: 6, fontWeight: 600 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: phone stack */}
          <div style={{ position: 'relative', height: 640, display: 'flex', justifyContent: 'center' }}>
            <div style={{
              position: 'absolute', top: 20, right: 0, zIndex: 5,
              transform: `rotate(-8deg) translateY(${Math.sin(time)*4}px)`,
              background: '#1B0E2B', color: '#FCDDD0',
              padding: '10px 16px', borderRadius: 14,
              fontSize: 14, fontWeight: 700,
              boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <Icon name="camera" size={16} color="#F58762" strokeWidth={1.8} />
              صوّر • اعرف • قارن
              <svg style={{ position: 'absolute', bottom: -8, right: 30 }} width="20" height="12" viewBox="0 0 20 12"><path d="M0 0 L20 0 L10 12 Z" fill="#1B0E2B"/></svg>
            </div>

            <div style={{ transform: 'translateX(-40px)', position: 'relative', zIndex: 1 }}>
              <PhoneFrame tilt={-6} style={{ transform: `rotate(-6deg) translateY(${Math.sin(time*0.7)*6}px)` }}>
                <ScanScreen />
              </PhoneFrame>
            </div>
            <div style={{
              transform: `translateX(40px) translateY(${50 + Math.cos(time*0.6)*6}px) rotate(6deg)`,
              position: 'absolute', right: 20, top: 30, zIndex: 2,
              width: 240, height: 500,
              filter: 'drop-shadow(0 30px 40px rgba(67,36,103,0.35))',
            }}>
              <img
                src="assets/app-home.png"
                alt="شاشة تطبيق ريفيوز"
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* marquee strip — branded wordmark badges with star separators */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: '#1B0E2B', padding: '20px 0',
        overflow: 'hidden', whiteSpace: 'nowrap',
      }}>
        <div className="brands-track" style={{
          display: 'inline-flex', alignItems: 'center', gap: 28,
          animation: 'marquee 40s linear infinite',
          direction: 'ltr', paddingInlineStart: 28,
        }}>
          {Array(3).fill().flatMap((_, k) => [
            { name: 'Amazon', ar: 'أمازون', color: '#FF9900' },
            { name: 'noon', ar: 'نون', color: '#FEEE00', dark: true },
            { name: 'Jumia', ar: 'جوميا', color: '#F68B1E' },
            { name: 'B.TECH', ar: 'بي تك', color: '#E2231A' },
            { name: '2B', ar: 'تو بي', color: '#0D2C54' },
            { name: 'Carrefour', ar: 'كارفور', color: '#004E9F' },
            { name: 'Spinneys', ar: 'سبينيس', color: '#006B3F' },
            { name: 'SHEIN', ar: 'شي إن', color: '#222' },
            { name: 'Talabat', ar: 'طلبات', color: '#FF5A00' },
          ].flatMap((b, i) => [
            <div key={`${k}-${i}-b`} style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'rgba(255,255,255,0.06)',
              padding: '8px 16px', borderRadius: 14,
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <span style={{
                width: 28, height: 28, borderRadius: 8,
                background: b.color,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                color: b.dark ? '#1B0E2B' : '#fff',
                fontFamily: 'JetBrains Mono', fontSize: 14, fontWeight: 900,
              }}>{b.name[0].toUpperCase()}</span>
              <span style={{ color: '#FCDDD0', fontSize: 16, fontWeight: 700 }}>{b.ar}</span>
              <span style={{
                color: '#9E8AAE', fontSize: 11, fontFamily: 'JetBrains Mono',
                fontWeight: 500, opacity: 0.7,
              }}>{b.name}</span>
            </div>,
            <svg key={`${k}-${i}-s`} width="14" height="14" viewBox="0 0 24 24" fill={i % 2 === 0 ? '#F58762' : '#C95FA0'} style={{ flexShrink: 0 }}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>,
          ]))}
        </div>
      </div>
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }
        @keyframes marqueeRTL { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        .brands-track:hover { animation-play-state: paused; }
      `}</style>
    </section>
  );
};

// ============================================================
// FEATURE: AI SCAN
// ============================================================
const AIScanFeature = () => (
  <section id="features" style={{ background: '#1B0E2B', color: '#FCDDD0', padding: '120px 40px', position: 'relative', overflow: 'hidden' }}>
    <div style={{
      position: 'absolute', top: 40, left: 40,
      fontSize: 320, fontWeight: 900, lineHeight: 0.85,
      color: 'rgba(245,135,98,0.06)', fontFamily: 'JetBrains Mono',
    }}>٠١</div>

    <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <div style={{
            position: 'absolute', width: 420, height: 420, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,135,98,0.3), transparent 60%)',
            filter: 'blur(30px)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          }} />
          <PhoneFrame glow>
            <ScanScreen />
          </PhoneFrame>
          <div style={{
            position: 'absolute', top: 30, right: '5%', zIndex: 5,
            background: 'rgba(245,135,98,0.15)', border: '1px solid rgba(245,135,98,0.4)',
            backdropFilter: 'blur(20px)',
            padding: '8px 14px', borderRadius: 10,
            fontFamily: 'JetBrains Mono', fontSize: 11, color: '#F58762',
            transform: 'rotate(4deg)', display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <Icon name="magicStar" size={14} color="#F58762" strokeWidth={1.8} />
            تشغيل المسح
          </div>
          <div style={{
            position: 'absolute', bottom: 80, left: '0%', zIndex: 5,
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
            padding: '12px 16px', borderRadius: 12,
            transform: 'rotate(-3deg)',
            color: '#FCDDD0',
          }}>
            <div style={{ fontSize: 11, opacity: 0.6, fontWeight: 600, marginBottom: 2 }}>زمن المعالجة</div>
            <div style={{ fontSize: 22, fontWeight: 900, fontFamily: 'JetBrains Mono', color: '#F58762' }}>
              <span className="mono">١٫٤</span> ثانية
            </div>
          </div>
        </div>

        <div>
          <SectionLabel num="٠١" title="المسح بالكاميرا" color="#F58762" />
          <h2 style={{
            fontSize: 'clamp(48px, 5vw, 88px)', fontWeight: 900, lineHeight: 1.35,
            letterSpacing: '-0.03em', marginBottom: 28, color: '#FCDDD0',
          }}>
            وجّه كاميرتك<br />
            <span style={{ color: '#F58762' }}>وستعرف كل شيء.</span>
          </h2>
          <p style={{ fontSize: 20, lineHeight: 1.6, opacity: 0.8, marginBottom: 36, maxWidth: 500 }}>
            تقنية ذكاء اصطناعي متقدّمة تتعرّف على أي منتج تصوّره في ثوانٍ —
            تُعيد لك الاسم بالعربية والإنجليزية، الفئة، ونطاق السعر،
            ثم تربطك مباشرة بأرخص متجر يبيعه.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {[
              { k: 'دقّة عالية', v: 'تعرّف موثوق على آلاف المنتجات', icon: 'shieldTick' },
              { k: 'ثنائي اللغة', v: 'نتائج عربية وإنجليزية معاً', icon: 'globe' },
              { k: 'سجل محفوظ', v: 'كل عملية مسح في حسابك', icon: 'documentText' },
              { k: 'سعر تقريبي', v: 'نطاق سعر فوري قبل المقارنة', icon: 'flash' },
            ].map((f, i) => (
              <div key={i} style={{
                padding: '16px 0', borderTop: '1px solid rgba(252,221,208,0.15)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <Icon name={f.icon} size={20} color="#F58762" strokeWidth={1.8} />
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#FCDDD0' }}>{f.k}</div>
                </div>
                <div style={{ fontSize: 14, opacity: 0.6, paddingRight: 30 }}>{f.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ============================================================
// FEATURE: PRICE COMPARISON
// ============================================================
const PriceCompareFeature = () => (
  <section style={{
    background: 'linear-gradient(180deg, #FDF8FF 0%, #FCDDD0 100%)',
    padding: '120px 40px', position: 'relative', overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute', top: 40, right: 40,
      fontSize: 320, fontWeight: 900, lineHeight: 0.85,
      color: 'rgba(67,36,103,0.05)', fontFamily: 'JetBrains Mono',
    }}>٠٢</div>

    <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
        <div>
          <SectionLabel num="٠٢" title="مقارنة الأسعار" />
          <h2 style={{
            fontSize: 'clamp(48px, 5vw, 88px)', fontWeight: 900, lineHeight: 1.35,
            letterSpacing: '-0.03em', marginBottom: 28, color: '#1B0E2B',
          }}>
            <span className="grad-text">سعر واحد</span>
            <br />
            في كل المتاجر.
          </h2>
          <p style={{ fontSize: 20, lineHeight: 1.6, color: '#3a2649', marginBottom: 36, maxWidth: 500 }}>
            بدلاً من فتح عشرات التطبيقات والمواقع — ضع المنتج، ودَع ريفيوز يعرض لك أسعاره في
            <strong> أمازون، نون، جوميا، بي تك </strong> وكل المتاجر دفعةً واحدة، مع نسبة الخصم لكل واحد.
          </p>

          <div style={{
            background: '#FBF6F1', borderRadius: 18, padding: 24,
            border: '1px dashed rgba(67,36,103,0.2)',
            maxWidth: 460, position: 'relative',
            boxShadow: '0 20px 40px -20px rgba(67,36,103,0.15)',
          }}>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#6B5575', marginBottom: 12, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon name="discount" size={14} color="#C95FA0" strokeWidth={1.8} />
              توفير عند كل عملية شراء
            </div>
            {[
              { l: 'متوسط سعر السوق', v: '١٩٤٥٠', mute: true, line: true },
              { l: 'أفضل سعر — ريفيوز', v: '١٧٢٥٠' },
              { l: 'إجمالي التوفير', v: '٢٢٠٠ ج.م', big: true },
            ].map((r, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                padding: '10px 0', borderTop: i===0 ? 'none' : '1px solid rgba(67,36,103,0.08)',
                borderStyle: r.big ? 'solid' : (i===0 ? 'none' : 'dashed'),
              }}>
                <span style={{
                  fontSize: r.big ? 18 : 15, color: r.mute ? '#6B5575' : '#1B0E2B',
                  fontWeight: r.big ? 800 : 500,
                }}>{r.l}</span>
                <span style={{
                  fontSize: r.big ? 28 : 18, fontWeight: 900,
                  color: r.big ? '#C95FA0' : (r.mute ? '#9E8AAE' : '#1B0E2B'),
                  textDecoration: r.line ? 'line-through' : 'none',
                }}>
                  <span className="mono">{r.v}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <PhoneFrame tilt={4}>
            <CompareScreen />
          </PhoneFrame>
          <div style={{
            position: 'absolute', top: 220, right: -40, transform: 'rotate(-15deg)',
            fontFamily: 'JetBrains Mono', fontSize: 13, color: '#C95FA0',
            display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700,
          }}>
            <Icon name="arrowRight" size={16} color="#C95FA0" strokeWidth={2.2} />
            الأفضل سعراً
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ============================================================
// CATEGORIES
// ============================================================
const Categories = () => {
  const cats = [
    { name: 'الأجهزة والتقنية', count: '١٢٣٤٠', icon: 'monitor', color: '#FCDDD0' },
    { name: 'الملابس والأناقة', count: '٨٢١٠', icon: 'shopBag', color: '#E5D4F2' },
    { name: 'العناية الشخصية', count: '٤٥٢٠', icon: 'magicStar', color: '#FCDDD0' },
    { name: 'المستلزمات المنزلية', count: '٦٧٨٠', icon: 'home', color: '#E5D4F2' },
    { name: 'المعدات الرياضية', count: '٢٣٤٠', icon: 'cup', color: '#FCDDD0' },
    { name: 'الكتب والثقافة', count: '٥٦٧٠', icon: 'documentText', color: '#E5D4F2' },
    { name: 'الأطعمة والمشروبات', count: '٣٤٥٠', icon: 'shop', color: '#FCDDD0' },
    { name: 'مستلزمات الأطفال', count: '٢٨٩٠', icon: 'heart', color: '#E5D4F2' },
  ];
  return (
    <section style={{ background: '#FBF6F1', padding: '120px 40px', position: 'relative' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 60, flexWrap: 'wrap', gap: 30 }}>
          <div>
            <SectionLabel num="٠٣" title="التصنيفات" />
            <h2 style={{ fontSize: 'clamp(48px, 5vw, 88px)', fontWeight: 900, lineHeight: 1.35, letterSpacing: '-0.03em', color: '#1B0E2B' }}>
              كل ما تحتاج،<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400 }}>في ثمانية أقسام.</span>
            </h2>
          </div>
          <div style={{ fontSize: 18, color: '#6B5575', maxWidth: 420, lineHeight: 1.5 }}>
            من أحدث الإلكترونيات إلى مستلزمات الأطفال — تصفّح، فلتر، وقارن في تصنيفات منظّمة بعناية.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {cats.map((c, i) => (
            <a key={i} href="#" className="cat-card" style={{
              background: c.color, borderRadius: 20, padding: 24,
              minHeight: 220, position: 'relative', overflow: 'hidden',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              cursor: 'pointer', transition: 'transform 0.3s',
              border: '1px solid rgba(67,36,103,0.06)',
              color: '#1B0E2B',
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: 18,
                background: 'rgba(255,255,255,0.6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name={c.icon} size={32} color="#432467" strokeWidth={1.6} />
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#1B0E2B', marginBottom: 4, lineHeight: 1.1 }}>{c.name}</div>
                <div style={{ fontSize: 13, color: '#6B5575' }}>
                  <span className="mono">{c.count}</span> منتج
                </div>
              </div>
              <div className="cat-arrow" style={{
                position: 'absolute', top: 18, left: 18,
                width: 32, height: 32, borderRadius: '50%',
                background: 'rgba(255,255,255,0.7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s',
              }}>
                <Icon name="arrowLeft" size={14} color="#1B0E2B" strokeWidth={2.2} />
              </div>
            </a>
          ))}
        </div>
        <style>{`
          .cat-card:hover { transform: translateY(-6px); }
          .cat-card:hover .cat-arrow { background: #1B0E2B; }
          .cat-card:hover .cat-arrow svg { stroke: #fff; }
        `}</style>
      </div>
    </section>
  );
};

// ============================================================
// REWARDS / USER TIERS
// ============================================================
const Rewards = () => {
  const levels = [
    {
      name: 'مبتدئ', en: 'Rookie', range: '٠ — ١٩٩',
      color: '#FCDDD0', accent: '#F58762', dark: false,
      perks: ['تصفّح كامل', 'حفظ ٢٠ منتج', 'مراجعات أساسية'],
      icon: 'magicStar',
    },
    {
      name: 'مساهم', en: 'Contributor', range: '٢٠٠ — ٤٩٩',
      color: '#FBC2A0', accent: '#E66A40', dark: false,
      perks: ['كل ميزات مبتدئ', 'حفظ غير محدود', 'شارة مساهم', 'كوبونات حصرية'],
      icon: 'medalStar',
    },
    {
      name: 'موثوق', en: 'Trusted', range: '٥٠٠ — ٩٩٩',
      color: '#C95FA0', accent: '#FCDDD0', dark: true,
      perks: ['كل ميزات مساهم', 'تنبيهات أسعار', 'وصول مبكّر', 'دعم أولوية'],
      icon: 'shieldTick',
    },
    {
      name: 'خبير', en: 'Expert', range: '١٠٠٠+',
      color: '#432467', accent: '#F58762', dark: true,
      perks: ['كل ميزات موثوق', 'مكافآت شهرية', 'مراجع مُصادَق ✓', 'شراكات حصرية'],
      icon: 'crown',
    },
  ];

  return (
    <section id="rewards" style={{
      background: 'linear-gradient(160deg, #432467 0%, #1B0E2B 100%)',
      color: '#FCDDD0', padding: '120px 40px', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '-15%', left: '20%', width: 500, height: 500,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,135,98,0.3), transparent 60%)',
        filter: 'blur(40px)',
      }} />

      <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, marginBottom: 60, alignItems: 'end' }}>
          <div>
            <SectionLabel num="٠٤" title="نظام المكافآت" color="#F58762" />
            <h2 style={{ fontSize: 'clamp(48px, 5vw, 88px)', fontWeight: 900, lineHeight: 1.35, letterSpacing: '-0.03em' }}>
              راجِع. اكسب.<br />
              <span style={{ color: '#F58762' }}>ارتقِ.</span>
            </h2>
          </div>
          <div>
            <p style={{ fontSize: 19, lineHeight: 1.6, opacity: 0.8, maxWidth: 480 }}>
              كل مراجعة كتبتها، كل صورة رفعتها، كل تفاعل قمت به — يقابله نقاط حقيقية.
              تجمعها. تترقّى. تفتح مكافآت.
            </p>
          </div>
        </div>

        {/* Points list */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 80 }}>
          {[
            { action: 'كتابة مراجعة', points: '٥٠', icon: 'note' },
            { action: 'رفع صورة', points: '٢٠', icon: 'gallery' },
            { action: 'مراجعة مفيدة', points: '١٠', icon: 'checkCircle' },
          ].map((p, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(252,221,208,0.15)',
              borderRadius: 16, padding: '24px 28px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontSize: 14, opacity: 0.6, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon name={p.icon} size={16} color="#FCDDD0" strokeWidth={1.6} />
                  {p.action}
                </div>
                <div style={{ fontSize: 36, fontWeight: 900, color: '#F58762', lineHeight: 1, fontFamily: 'JetBrains Mono' }}>
                  +{p.points}
                </div>
              </div>
              <div style={{ fontSize: 12, color: '#9E8AAE', letterSpacing: 1 }}>نقطة</div>
            </div>
          ))}
        </div>

        {/* === USER TIERS === */}
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{
                fontFamily: 'JetBrains Mono', fontSize: 12, color: '#F58762',
                background: 'rgba(245,135,98,0.1)', border: '1px solid rgba(245,135,98,0.3)',
                padding: '4px 10px', borderRadius: 6, letterSpacing: 1,
              }}>مستويات المستخدم</span>
              <span style={{ fontSize: 22, fontWeight: 800, color: '#FCDDD0' }}>أربعة مستويات. مكافآت تتضاعف.</span>
            </div>
            <span style={{ fontSize: 13, opacity: 0.5, fontFamily: 'JetBrains Mono' }}>
              <span className="mono">٠</span> ──→ <span className="mono">١٠٠٠+</span> نقطة
            </span>
          </div>

          {/* progression rail */}
          <div style={{
            position: 'relative', height: 3, background: 'rgba(252,221,208,0.1)',
            borderRadius: 99, marginBottom: 18,
          }}>
            <div style={{
              position: 'absolute', top: 0, right: 0, height: 3,
              width: '100%', borderRadius: 99,
              background: 'linear-gradient(to left, #FCDDD0, #F58762, #C95FA0, #432467)',
            }} />
            {[0, 25, 50, 75, 100].map((pct, i) => (
              <div key={i} style={{
                position: 'absolute', top: '50%', right: `${pct}%`,
                transform: 'translate(50%, -50%)',
                width: 10, height: 10, borderRadius: '50%',
                background: i === 0 ? '#FCDDD0' : (i === 4 ? '#432467' : '#F58762'),
                border: '2px solid #1B0E2B',
              }} />
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {levels.map((l, i) => (
              <div key={i} style={{
                background: l.color, color: l.dark ? '#fff' : '#1B0E2B',
                padding: '24px 22px 22px', borderRadius: 18,
                position: 'relative', minHeight: 320,
                display: 'flex', flexDirection: 'column',
                boxShadow: l.dark ? '0 20px 40px -20px rgba(0,0,0,0.4)' : '0 10px 30px -15px rgba(67,36,103,0.2)',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: 14, left: 14,
                  fontFamily: 'JetBrains Mono', fontSize: 10, fontWeight: 700,
                  letterSpacing: 1, color: l.accent, opacity: 0.9,
                  background: l.dark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.4)',
                  padding: '3px 8px', borderRadius: 6,
                }}>
                  المستوى ٠{i+1}
                </div>

                <div style={{
                  width: 56, height: 56, borderRadius: 14,
                  background: l.dark ? 'rgba(255,255,255,0.1)' : 'rgba(27,14,43,0.06)',
                  border: l.dark ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(27,14,43,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 18,
                }}>
                  <Icon name={l.icon} size={26} color={l.accent} strokeWidth={1.6} />
                </div>

                <div style={{ fontSize: 34, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 10, lineHeight: 1 }}>{l.name}</div>
                <div style={{
                  display: 'inline-flex', alignSelf: 'flex-start',
                  fontSize: 12, fontWeight: 700,
                  background: l.dark ? 'rgba(255,255,255,0.1)' : 'rgba(27,14,43,0.08)',
                  padding: '4px 10px', borderRadius: 6, marginBottom: 18,
                }}>
                  <span className="mono">{l.range}</span>&nbsp;نقطة
                </div>

                <div style={{
                  borderTop: l.dark ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(27,14,43,0.1)',
                  paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 8,
                }}>
                  {l.perks.map((p, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, opacity: 0.9 }}>
                      <Icon name="check" size={12} color={l.accent} strokeWidth={3} />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>

                <div style={{
                  position: 'absolute', bottom: -30, right: -30,
                  width: 100, height: 100, borderRadius: '50%',
                  background: l.accent, opacity: l.dark ? 0.1 : 0.15,
                }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// STORES
// ============================================================
const Stores = () => {
  const stores = [
    { name: 'Amazon', ar: 'أمازون', color: '#FF9900', tag: 'متعدد الفئات', initial: 'a' },
    { name: 'noon', ar: 'نون', color: '#FEEE00', dark: true, tag: 'متجر شامل', initial: 'n' },
    { name: 'Jumia', ar: 'جوميا', color: '#F68B1E', tag: 'تسوّق عام', initial: 'J' },
    { name: 'B.TECH', ar: 'بي تك', color: '#E2231A', tag: 'إلكترونيات', initial: 'B' },
    { name: '2B', ar: 'تو بي', color: '#0D2C54', tag: 'تقنية', initial: '2' },
    { name: 'Carrefour', ar: 'كارفور', color: '#004E9F', tag: 'هايبر ماركت', initial: 'C' },
    { name: 'Spinneys', ar: 'سبينيس', color: '#006B3F', tag: 'سوبر ماركت', initial: 'S' },
    { name: 'Souq', ar: 'سوق', color: '#F47B20', tag: 'سوق إلكتروني', initial: 'S' },
    { name: 'SHEIN', ar: 'شي إن', color: '#1B0E2B', tag: 'موضة', initial: 'S' },
    { name: 'Talabat', ar: 'طلبات', color: '#FF5A00', tag: 'توصيل', initial: 't' },
  ];
  return (
    <section id="stores" style={{ background: '#FBF6F1', padding: '120px 40px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 60, flexWrap: 'wrap', gap: 30 }}>
          <div>
            <SectionLabel num="٠٥" title="شركاؤنا في مصر" />
            <h2 style={{ fontSize: 'clamp(48px, 5vw, 80px)', fontWeight: 900, lineHeight: 1.35, letterSpacing: '-0.03em', color: '#1B0E2B' }}>
              عشرات المتاجر،<br />
              <span className="grad-text">تطبيق واحد.</span>
            </h2>
          </div>
          <div style={{ fontSize: 17, color: '#6B5575', maxWidth: 420, lineHeight: 1.5 }}>
            من أكبر المتاجر المصرية والإقليمية — كل عروضهم وأسعارهم تحت تصرّفك في مكان واحد.
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14,
        }}>
          {stores.map((s, i) => (
            <div key={i} className="store-card" style={{
              background: '#fff', borderRadius: 18, padding: 0,
              border: '1px solid rgba(67,36,103,0.06)',
              overflow: 'hidden', position: 'relative',
              transition: 'all 0.3s', cursor: 'pointer',
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{
                background: s.color,
                padding: '28px 18px 22px',
                position: 'relative',
                color: s.dark ? '#1B0E2B' : '#fff',
                minHeight: 110,
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              }}>
                <div style={{
                  fontSize: 56, fontWeight: 900, lineHeight: 0.9,
                  letterSpacing: '-0.05em', fontFamily: 'JetBrains Mono',
                  opacity: 0.95,
                }}>{s.initial}</div>
                <div style={{
                  fontSize: 16, fontWeight: 800, letterSpacing: '-0.01em',
                  fontFamily: 'JetBrains Mono',
                }}>{s.name}</div>
                <div style={{
                  position: 'absolute', top: 12, left: 12,
                  display: 'flex', gap: 3,
                }}>
                  {[0,1,2].map(j => (
                    <div key={j} style={{
                      width: 4, height: 4, borderRadius: '50%',
                      background: s.dark ? 'rgba(27,14,43,0.3)' : 'rgba(255,255,255,0.4)',
                    }} />
                  ))}
                </div>
              </div>

              <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ fontSize: 17, fontWeight: 800, color: '#1B0E2B' }}>{s.ar}</div>
                <div style={{ fontSize: 12, color: '#9E8AAE' }}>{s.tag}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 36, textAlign: 'center',
        }}>
          <a href="pages/stores.html" style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            background: '#1B0E2B', color: '#fff',
            padding: '16px 28px', borderRadius: 99,
            fontSize: 16, fontWeight: 700,
            boxShadow: '0 12px 24px -12px rgba(27,14,43,0.4)',
            transition: 'all 0.3s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 18px 30px -14px rgba(27,14,43,0.5)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 12px 24px -12px rgba(27,14,43,0.4)'; }}>
            <span style={{
              background: '#F58762', color: '#1B0E2B',
              padding: '3px 10px', borderRadius: 99,
              fontSize: 12, fontWeight: 900,
            }} className="mono">+١٢</span>
            استكشف جميع المتاجر
            <Icon name="arrowLeft" size={16} color="#fff" strokeWidth={2.2} />
          </a>
          <div style={{ fontSize: 13, color: '#6B5575', marginTop: 12 }}>
            ونضيف المزيد كل أسبوع.
          </div>
        </div>
        <style>{`
          .store-card:hover { transform: translateY(-6px); box-shadow: 0 18px 36px -18px rgba(67,36,103,0.25); }
        `}</style>
      </div>
    </section>
  );
};

// ============================================================
// REVIEWS — auto-marquee right to left
// ============================================================
const Reviews = () => {
  const reviews = [
    { name: 'سارة م.', loc: 'القاهرة', level: 'خبير', text: 'حرفياً وفّرت أكثر من ١٥٠٠ جنيه آخر شهر. بقيت أكتب مراجعة بعد كل شراء — حلو وصار عادة.', rating: 5 },
    { name: 'خالد ع.', loc: 'الإسكندرية', level: 'موثوق', text: 'ميزة الكاميرا سحر. صوّرت سماعات في معرض، التطبيق طلعها مع كل الأسعار. اشتريت أرخص بـ٣٠٪.', rating: 5 },
    { name: 'لينا ك.', loc: 'الجيزة', level: 'مساهم', text: 'كانت تجربة تسوّقي قبل ريفيوز فوضى — تطبيق هنا، موقع هناك. دلوقتي كل حاجة في مكان واحد.', rating: 5 },
    { name: 'يوسف ح.', loc: 'المنصورة', level: 'موثوق', text: 'البحث الذكي بيوفّر وقت كتير. أكتب اسم منتج وفي ثانية ألاقي مقارنة كاملة بين كل المتاجر.', rating: 5 },
    { name: 'منى س.', loc: 'طنطا', level: 'خبير', text: 'النقاط بتتجمع بسرعة لما تكتب مراجعات بانتظام. وصلت لمستوى خبير في أقل من شهرين.', rating: 5 },
    { name: 'أحمد ر.', loc: 'أسيوط', level: 'مساهم', text: 'سهولة التطبيق وسرعته في عرض الأسعار خلتني أستغني عن أي تطبيق مقارنة تاني.', rating: 5 },
  ];

  const Card = ({ r }) => (
    <div style={{
      background: '#fff', borderRadius: 20, padding: 28,
      border: '1px solid rgba(67,36,103,0.06)',
      display: 'flex', flexDirection: 'column', gap: 18,
      width: 380, flexShrink: 0,
      boxShadow: '0 12px 30px -20px rgba(67,36,103,0.2)',
      direction: 'rtl', textAlign: 'right',
    }}>
      <div style={{ display: 'flex', gap: 2 }}>
        {[...Array(r.rating)].map((_, j) => (
          <Icon key={j} name="star" size={18} color="#F58762" bold />
        ))}
      </div>
      <p style={{ fontSize: 18, lineHeight: 1.5, color: '#1B0E2B', fontWeight: 500 }}>
        "{r.text}"
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 'auto', paddingTop: 18, borderTop: '1px solid rgba(67,36,103,0.08)' }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: 'linear-gradient(135deg, #F58762, #C95FA0)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 800, fontSize: 16,
        }}>{r.name[0]}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#1B0E2B' }}>{r.name}</div>
          <div style={{ fontSize: 12, color: '#6B5575', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Icon name="location" size={11} color="#9E8AAE" strokeWidth={1.8} />
            {r.loc}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section style={{
      background: 'linear-gradient(180deg, #FBF6F1 0%, #FCDDD0 100%)',
      padding: '120px 0', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 40px', marginBottom: 60 }}>
        <SectionLabel num="٠٦" title="آراء المستخدمين" />
        <h2 style={{ fontSize: 'clamp(48px, 5vw, 80px)', fontWeight: 900, lineHeight: 1.35, letterSpacing: '-0.03em', color: '#1B0E2B', maxWidth: 800 }}>
          تقييمات حقيقية،<br />من <span className="grad-text">ناس حقيقيين.</span>
        </h2>
      </div>

      {/* Auto-marquee track */}
      <div style={{
        position: 'relative', width: '100%', overflow: 'hidden',
        maskImage: 'linear-gradient(to left, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(to left, transparent, black 8%, black 92%, transparent)',
      }}>
        <div className="reviews-track" style={{
          display: 'flex', gap: 20, padding: '20px 0',
          animation: 'reviewsScroll 60s linear infinite',
          direction: 'ltr',
        }}>
          {[...reviews, ...reviews].map((r, i) => (
            <Card key={i} r={r} />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes reviewsScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(50%); }
        }
        .reviews-track:hover { animation-play-state: paused; }
      `}</style>
    </section>
  );
};

// ============================================================
// DOWNLOAD CTA
// ============================================================
const DownloadCTA = () => (
  <section style={{
    background: 'linear-gradient(135deg, #F58762 0%, #C95FA0 50%, #432467 100%)',
    padding: '140px 40px', position: 'relative', overflow: 'hidden', color: '#fff',
  }}>
    <div style={{
      position: 'absolute', inset: 0, display: 'flex',
      alignItems: 'center', justifyContent: 'center', pointerEvents: 'none',
      fontSize: 'clamp(160px, 24vw, 380px)', fontWeight: 900,
      color: 'rgba(255,255,255,0.08)', lineHeight: 0.85, letterSpacing: '-0.05em',
      whiteSpace: 'nowrap',
    }}>ريفيوز</div>

    <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', textAlign: 'center' }}>
      <div style={{ display: 'inline-block', marginBottom: 16 }}>
        <SectionLabel num="٠٧" title="متاح الآن" color="#FCDDD0" />
      </div>
      <h2 style={{
        fontSize: 'clamp(56px, 7vw, 120px)', fontWeight: 900, lineHeight: 1.3,
        letterSpacing: '-0.04em', marginBottom: 28,
      }}>
        حمّل ريفيوز.<br />
        ابدأ التوفير اليوم.
      </h2>
      <p style={{ fontSize: 22, lineHeight: 1.5, maxWidth: 600, margin: '0 auto 48px', opacity: 0.9 }}>
        مجاني تماماً. متاح على آيفون و أندرويد. تجربة عربية أصيلة بكل التفاصيل.
      </p>

      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        <AppStoreBtn size="lg" theme="dark" />
        <GooglePlayBtn size="lg" theme="light" />
      </div>
    </div>
  </section>
);

// ============================================================
// FOOTER
// ============================================================
const Footer = () => (
  <footer style={{ background: '#1B0E2B', color: '#FCDDD0', padding: '80px 40px 40px' }}>
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 60, marginBottom: 60 }}>
        <div>
          <div style={{ marginBottom: 20 }}>
            <img src="assets/logo-light.svg" alt="Rivyoz ريفيوز" style={{ height: 52, width: 'auto', display: 'block' }} />
          </div>
          <p style={{ fontSize: 16, opacity: 0.7, lineHeight: 1.5, maxWidth: 380, marginBottom: 24 }}>
            تطبيق عربي لاكتشاف المنتجات، مقارنة الأسعار، وقراءة المراجعات الحقيقية.
          </p>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12, opacity: 0.5 }}>
            v1.0.0 · com.rivyoz.app
          </div>
        </div>

        {[
          { title: 'التطبيق', links: [
            { l: 'المميزات', h: '#features' },
            { l: 'المتاجر', h: '#stores' },
            { l: 'المكافآت', h: '#rewards' },
            { l: 'الفئات', h: '#features' },
          ]},
          { title: 'الشركة', links: [
            { l: 'من نحن', h: 'pages/about.html' },
            { l: 'تواصل معنا', h: 'pages/contact.html' },
            { l: 'الوظائف', h: 'pages/careers.html' },
            { l: 'المدوّنة', h: 'pages/blog.html' },
          ]},
          { title: 'قانوني', links: [
            { l: 'الشروط', h: 'pages/terms.html' },
            { l: 'الخصوصية', h: 'pages/privacy.html' },
            { l: 'ملفات تعريف الارتباط', h: 'pages/cookies.html' },
            { l: 'الدعم', h: 'pages/support.html' },
          ]},
        ].map((col, i) => (
          <div key={i}>
            <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 18, color: '#F58762' }}>{col.title}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {col.links.map(l => (
                <a key={l.l} href={l.h} style={{ fontSize: 15, opacity: 0.7 }}>{l.l}</a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        borderTop: '1px solid rgba(252,221,208,0.15)',
        paddingTop: 30,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20,
      }}>
        <div style={{ fontSize: 14, opacity: 0.6 }}>
          © <span className="mono">٢٠٢٦</span> ريفيوز. جميع الحقوق محفوظة.
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {[
            { name: 'إكس', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
            { name: 'إنستجرام', path: 'M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5zm10 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm5.5-2.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' },
            { name: 'تيك توك', path: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.87a8.16 8.16 0 0 0 4.77 1.52V7c-.61.01-1.21-.13-1.84-.31z' },
            { name: 'فيسبوك', path: 'M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01z' },
            { name: 'يوتيوب', path: 'M21.582 6.186a2.506 2.506 0 0 0-1.768-1.768C18.254 4 12 4 12 4s-6.254 0-7.814.418A2.506 2.506 0 0 0 2.418 6.186C2 7.746 2 12 2 12s0 4.254.418 5.814a2.506 2.506 0 0 0 1.768 1.768C5.746 20 12 20 12 20s6.254 0 7.814-.418a2.506 2.506 0 0 0 1.768-1.768C22 16.254 22 12 22 12s0-4.254-.418-5.814zM10 15.464V8.536L16 12z' },
          ].map(s => (
            <a key={s.name} href="#" title={s.name} style={{
              width: 38, height: 38, borderRadius: 11,
              background: 'rgba(252,221,208,0.08)',
              border: '1px solid rgba(252,221,208,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#FCDDD0', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#F58762'; e.currentTarget.style.borderColor = '#F58762'; e.currentTarget.style.color = '#1B0E2B'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(252,221,208,0.08)'; e.currentTarget.style.borderColor = 'rgba(252,221,208,0.15)'; e.currentTarget.style.color = '#FCDDD0'; }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d={s.path} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

Object.assign(window, { SectionLabel, Nav, Hero, AIScanFeature, PriceCompareFeature, Categories, Rewards, Stores, Reviews, DownloadCTA, Footer });
