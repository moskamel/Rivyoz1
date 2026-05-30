// قانوني — Legal hub
const LegalHub = () => {
  const docs = [
    {
      icon: 'documentText', title: 'الشروط والأحكام',
      desc: 'القواعد التي تحكم استخدامك لتطبيق ريفيوز والخدمات المرتبطة به.',
      updated: 'مايو ٢٠٢٦', href: 'terms.html', color: '#F58762',
    },
    {
      icon: 'security', title: 'سياسة الخصوصية',
      desc: 'كيف نجمع، نستخدم، ونحمي بياناتك الشخصية — بشفافية كاملة.',
      updated: 'مايو ٢٠٢٦', href: 'privacy.html', color: '#C95FA0',
    },
    {
      icon: 'cookie', title: 'ملفات تعريف الارتباط',
      desc: 'ما هي، لماذا نستخدمها، وكيف يمكنك التحكّم فيها.',
      updated: 'مايو ٢٠٢٦', href: 'cookies.html', color: '#432467',
    },
    {
      icon: 'twentyFourSupport', title: 'الدعم والمساعدة',
      desc: 'إجابات للأسئلة الشائعة، وقنوات التواصل المباشر مع فريق الدعم.',
      updated: 'محدّث دوماً', href: 'support.html', color: '#006B3F',
    },
  ];
  return (
    <section style={{ padding: '100px 40px', background: '#FBF6F1' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel num="٠١" title="الوثائق القانونية" color="#C95FA0" />
        <h2 style={{
          fontSize: 'clamp(40px, 4.5vw, 72px)', fontWeight: 900, lineHeight: 1.35,
          letterSpacing: '-0.03em', color: '#1B0E2B', marginBottom: 50,
        }}>
          الشفافية أولاً.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
          {docs.map((d, i) => (
            <a key={i} href={d.href} style={{
              background: '#fff', borderRadius: 20, padding: 32,
              border: '1px solid rgba(67,36,103,0.06)',
              display: 'flex', gap: 20, alignItems: 'flex-start',
              transition: 'all 0.3s', position: 'relative',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 18px 36px -18px rgba(67,36,103,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14, flexShrink: 0,
                background: d.color, color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name={d.icon} size={26} color="#fff" strokeWidth={1.8} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#1B0E2B', marginBottom: 6 }}>{d.title}</div>
                <p style={{ fontSize: 15, color: '#6B5575', lineHeight: 1.5, marginBottom: 14 }}>{d.desc}</p>
                <div style={{ fontSize: 12, fontFamily: 'JetBrains Mono', color: '#9E8AAE', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon name="calendar" size={12} color="#9E8AAE" strokeWidth={1.8} />
                  آخر تحديث: {d.updated}
                </div>
              </div>
              <Icon name="arrowLeft" size={20} color={d.color} strokeWidth={2} />
            </a>
          ))}
        </div>

        <div style={{
          marginTop: 60, padding: 32, borderRadius: 20,
          background: '#1B0E2B', color: '#FCDDD0',
          display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>أسئلة قانونية أو شكاوى؟</div>
            <p style={{ fontSize: 14, opacity: 0.75, lineHeight: 1.5 }}>
              راسلنا مباشرة على <strong className="mono" style={{ color: '#F58762' }}>legal@rivyoz.com</strong> وفريقنا القانوني سيرد خلال يومي عمل.
            </p>
          </div>
          <a href="contact.html" style={{
            background: '#F58762', color: '#1B0E2B',
            padding: '14px 22px', borderRadius: 12,
            fontSize: 15, fontWeight: 800,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            تواصل معنا
            <Icon name="arrowLeft" size={16} color="#1B0E2B" strokeWidth={2.2} />
          </a>
        </div>
      </div>
    </section>
  );
};

const App = () => (
  <PageShell
    num="٠٥"
    label="قانوني"
    title="بياناتك. حقوقك. شفافيتنا."
    subtitle="نؤمن أن الالتزام القانوني ليس بنوداً تُخفى بحروف صغيرة. كل وثيقة هنا مكتوبة بلغة مفهومة، ومحدّثة دوماً."
    accent="#C95FA0"
  >
    <LegalHub />
  </PageShell>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
