// Shared shell for sub-pages: nav, hero header, footer
// Pages live in pages/ subdir, so all relative paths walk up one level.

const PageNav = () => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
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
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24,
    }}>
      <a href="../Reviyoz Landing.html" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        <img src="../assets/logo.svg" alt="Rivyoz ريفيوز" style={{ height: 40, width: 'auto', display: 'block' }} />
      </a>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
        {[
          { label: 'الرئيسية', href: '../Reviyoz Landing.html' },
          { label: 'من نحن', href: 'about.html' },
          { label: 'المميزات', href: 'features.html' },
          { label: 'الوظائف', href: 'careers.html' },
          { label: 'المدوّنة', href: 'blog.html' },
          { label: 'تواصل معنا', href: 'contact.html' },
        ].map(l => (
          <a key={l.label} href={l.href} style={{ fontSize: 15, fontWeight: 600, color: '#1B0E2B', opacity: 0.75, whiteSpace: 'nowrap' }}>{l.label}</a>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <a href="#" style={{
          background: '#1B0E2B', color: '#fff',
          padding: '8px 14px', borderRadius: 12,
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontWeight: 700, textDecoration: 'none',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
          <span style={{ textAlign: 'right', lineHeight: 1.1 }}>
            <div style={{ fontSize: 9, opacity: 0.7, fontWeight: 500 }}>حمّل من</div>
            <div style={{ fontSize: 14, fontWeight: 800 }}>آب ستور</div>
          </span>
        </a>
        <a href="#" style={{
          background: '#fff', color: '#1B0E2B',
          padding: '8px 14px', borderRadius: 12,
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontWeight: 700, textDecoration: 'none',
          border: '1px solid rgba(67,36,103,0.12)',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24"><defs><linearGradient id="ns-a" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#00C9FF"/><stop offset="100%" stopColor="#005FCE"/></linearGradient><linearGradient id="ns-b" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#FFE000"/><stop offset="100%" stopColor="#FFBD00"/></linearGradient><linearGradient id="ns-c" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#FF3A44"/><stop offset="100%" stopColor="#C31162"/></linearGradient><linearGradient id="ns-d" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#00F176"/><stop offset="100%" stopColor="#00A661"/></linearGradient></defs><path fill="url(#ns-a)" d="M3.5 2.6C3.2 2.9 3 3.4 3 4v16c0 .6.2 1.1.5 1.4l9.4-9.4z"/><path fill="url(#ns-b)" d="M16.8 9.2l-4 2.3 4 2.3 3.2-1.8c.8-.5.8-1.3 0-1.8z"/><path fill="url(#ns-c)" d="M3.5 21.4c.5.5 1.3.5 2.2.1l11.1-6.3-4-2.3z"/><path fill="url(#ns-d)" d="M3.5 2.6l9.4 9.3 4-2.3L5.7 2.5C5.3 2.3 4.8 2.2 4.4 2.2c-.4 0-.7.1-.9.4z"/></svg>
          <span style={{ textAlign: 'right', lineHeight: 1.1 }}>
            <div style={{ fontSize: 9, opacity: 0.6, fontWeight: 500 }}>متاح على</div>
            <div style={{ fontSize: 14, fontWeight: 800 }}>جوجل بلاي</div>
          </span>
        </a>
      </div>
    </nav>
  );
};

const PageHeader = ({ num, label, title, subtitle, accent = '#C95FA0' }) => (
  <section style={{
    background: 'linear-gradient(180deg, #FCDDD0 0%, #FDF8FF 100%)',
    paddingTop: 160, paddingBottom: 80, paddingInline: 40,
    position: 'relative', overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute', top: '20%', right: '-10%', width: 500, height: 500,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${accent}33, transparent 70%)`,
      filter: 'blur(40px)',
    }} />
    <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
      {/* breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36, fontSize: 14, color: '#6B5575' }}>
        <a href="../Reviyoz Landing.html" style={{ opacity: 0.7 }}>الرئيسية</a>
        <Icon name="arrowLeft" size={12} color="#6B5575" strokeWidth={2} />
        <span style={{ color: '#1B0E2B', fontWeight: 700 }}>{title}</span>
      </div>

      <SectionLabel num={num} title={label} color={accent} />
      <h1 style={{
        fontSize: 'clamp(56px, 7vw, 110px)', fontWeight: 900, lineHeight: 1.3,
        letterSpacing: '-0.04em', color: '#1B0E2B', marginBottom: 24,
      }}>
        {title}
      </h1>
      {subtitle && (
        <p style={{ fontSize: 22, lineHeight: 1.5, color: '#3a2649', maxWidth: 700 }}>
          {subtitle}
        </p>
      )}
    </div>
  </section>
);

const PageShell = ({ num, label, title, subtitle, accent, children }) => (
  <div>
    <PageNav />
    <PageHeader num={num} label={label} title={title} subtitle={subtitle} accent={accent} />
    <main style={{ background: '#FBF6F1', minHeight: '40vh' }}>
      {children}
    </main>
    <Footer />
  </div>
);

// Reused Footer (copies the one in sections.jsx but with up-level paths)
const Footer = () => (
  <footer style={{ background: '#1B0E2B', color: '#FCDDD0', padding: '80px 40px 40px' }}>
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 60, marginBottom: 60 }}>
        <div>
          <div style={{ marginBottom: 20 }}>
            <img src="../assets/logo-light.svg" alt="Rivyoz ريفيوز" style={{ height: 52, width: 'auto', display: 'block' }} />
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
            { l: 'المميزات', h: '../Reviyoz Landing.html#features' },
            { l: 'المتاجر', h: '../Reviyoz Landing.html#stores' },
            { l: 'المكافآت', h: '../Reviyoz Landing.html#rewards' },
            { l: 'الفئات', h: '../Reviyoz Landing.html#features' },
          ]},
          { title: 'الشركة', links: [
            { l: 'من نحن', h: 'about.html' },
            { l: 'تواصل معنا', h: 'contact.html' },
            { l: 'الوظائف', h: 'careers.html' },
            { l: 'المدوّنة', h: 'blog.html' },
          ]},
          { title: 'قانوني', links: [
            { l: 'الشروط', h: 'terms.html' },
            { l: 'الخصوصية', h: 'privacy.html' },
            { l: 'ملفات تعريف الارتباط', h: 'cookies.html' },
            { l: 'الدعم', h: 'support.html' },
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

// SectionLabel — copy of the one in sections.jsx for pages
const SectionLabel = ({ num, title, color = '#C95FA0' }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: 12,
    marginBottom: 28,
    padding: '7px 16px 7px 20px',
    background: 'rgba(255,255,255,0.4)',
    border: `1px solid ${color}33`,
    borderRadius: 99, lineHeight: 1.2,
  }}>
    <span style={{ fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 700, color, letterSpacing: 1, lineHeight: 1.2 }}>{num}</span>
    <span style={{ width: 24, height: 1, background: color, opacity: 0.5 }} />
    <span style={{ fontSize: 15, fontWeight: 700, color: color, letterSpacing: 1, lineHeight: 1.2 }}>{title}</span>
  </div>
);

Object.assign(window, { PageNav, PageHeader, PageShell, Footer, SectionLabel });
