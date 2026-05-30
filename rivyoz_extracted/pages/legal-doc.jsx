// Reusable legal document layout — used by terms, privacy, cookies
const LegalDoc = ({ sections, accent = '#C95FA0' }) => {
  const [active, setActive] = React.useState(sections[0]?.id);

  React.useEffect(() => {
    const onScroll = () => {
      const ys = sections.map(s => {
        const el = document.getElementById(s.id);
        return el ? { id: s.id, y: el.getBoundingClientRect().top } : null;
      }).filter(Boolean);
      const cur = ys.filter(s => s.y < 140).slice(-1)[0];
      if (cur) setActive(cur.id);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sections]);

  return (
    <section style={{ padding: '80px 40px', background: '#FBF6F1' }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '260px 1fr', gap: 60, alignItems: 'start',
      }}>
        {/* TOC */}
        <nav style={{
          position: 'sticky', top: 100,
          background: '#fff', borderRadius: 16, padding: 22,
          border: '1px solid rgba(67,36,103,0.06)',
        }}>
          <div style={{
            fontFamily: 'JetBrains Mono', fontSize: 11, color: accent, fontWeight: 700,
            letterSpacing: 1, marginBottom: 14,
          }}>الفهرس</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {sections.map((s, i) => (
              <a key={s.id} href={'#' + s.id} style={{
                fontSize: 14, fontWeight: 600,
                padding: '8px 12px', borderRadius: 8,
                color: active === s.id ? '#fff' : '#3a2649',
                background: active === s.id ? accent : 'transparent',
                transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{
                  fontFamily: 'JetBrains Mono', fontSize: 11,
                  opacity: active === s.id ? 1 : 0.5,
                }}>{String(i+1).padStart(2,'0')}</span>
                <span>{s.title}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* Content */}
        <article style={{ background: '#fff', borderRadius: 20, padding: '40px 50px', border: '1px solid rgba(67,36,103,0.06)' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            paddingBottom: 24, marginBottom: 32, borderBottom: '1px dashed rgba(67,36,103,0.12)',
          }}>
            <div style={{ fontSize: 13, color: '#6B5575', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="calendar" size={14} color="#6B5575" strokeWidth={1.6} />
              آخر تحديث: <strong style={{ color: '#1B0E2B' }} className="mono">١٨ مايو ٢٠٢٦</strong>
            </div>
            <div style={{ fontSize: 13, color: '#6B5575' }}>
              النسخة <span className="mono" style={{ color: '#1B0E2B' }}>١٫٠</span>
            </div>
          </div>

          {sections.map((s, i) => (
            <div key={s.id} id={s.id} style={{ marginBottom: 50, scrollMarginTop: 120 }}>
              <h2 style={{
                fontSize: 32, fontWeight: 900, color: '#1B0E2B',
                marginBottom: 16, letterSpacing: '-0.01em',
                display: 'flex', alignItems: 'baseline', gap: 12,
              }}>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: 18, color: accent, fontWeight: 700 }}>
                  {String(i+1).padStart(2,'0')}
                </span>
                {s.title}
              </h2>
              <div style={{ fontSize: 16, lineHeight: 1.75, color: '#3a2649' }}>
                {s.content}
              </div>
            </div>
          ))}

          <div style={{
            marginTop: 40, paddingTop: 24,
            borderTop: '1px dashed rgba(67,36,103,0.12)',
            fontSize: 14, color: '#6B5575',
          }}>
            للاستفسارات: <a href="mailto:legal@rivyoz.com" className="mono" style={{ color: accent, fontWeight: 700 }}>legal@rivyoz.com</a>
          </div>
        </article>
      </div>
    </section>
  );
};

window.LegalDoc = LegalDoc;
