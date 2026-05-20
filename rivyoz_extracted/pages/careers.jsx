// الوظائف — Careers
const Why = () => {
  const perks = [
    { icon: 'flash', t: 'فريق صغير، أثر كبير', d: 'كل عضو في الفريق يصنع فرقاً ملموساً في المنتج وفي حياة مستخدميه.' },
    { icon: 'home', t: 'مرونة كاملة', d: 'العمل عن بُعد، ساعات مرنة، وثقة مطلقة في تنظيم وقتك.' },
    { icon: 'shieldTick', t: 'تأمين صحي شامل', d: 'تغطية لك ولعائلتك مع شبكة من أفضل المستشفيات.' },
    { icon: 'cup', t: 'مكافآت أداء', d: 'حصص أسهم، مكافآت ربع سنوية، ومسار وظيفي واضح.' },
    { icon: 'documentText', t: 'ميزانية تعلّم', d: 'دورات، مؤتمرات، وكتب — تطوّرك مسؤوليتنا.' },
    { icon: 'heart', t: 'ثقافة محترمة', d: 'احترام، شفافية، ومسافة آمنة بين العمل والحياة.' },
  ];
  return (
    <section style={{ padding: '100px 40px', background: '#FBF6F1' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel num="٠١" title="لماذا ريفيوز؟" color="#F58762" />
        <h2 style={{
          fontSize: 'clamp(40px, 4.5vw, 72px)', fontWeight: 900, lineHeight: 1.35,
          letterSpacing: '-0.03em', color: '#1B0E2B', marginBottom: 50, maxWidth: 700,
        }}>
          مكان للنمو،<br /><span className="grad-text">وللصنع.</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {perks.map((p, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 18, padding: 24,
              border: '1px solid rgba(67,36,103,0.06)',
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: 'linear-gradient(135deg, #FCDDD0, #E5D4F2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 14,
              }}>
                <Icon name={p.icon} size={24} color="#432467" strokeWidth={1.6} />
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#1B0E2B', marginBottom: 6 }}>{p.t}</div>
              <p style={{ fontSize: 14, color: '#6B5575', lineHeight: 1.5 }}>{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Openings = () => {
  const jobs = [
    { title: 'مهندس React Native أوّل', dept: 'هندسة', type: 'دوام كامل', loc: 'القاهرة / عن بُعد', exp: '٥+ سنوات' },
    { title: 'مهندسة بيانات', dept: 'هندسة', type: 'دوام كامل', loc: 'القاهرة / عن بُعد', exp: '٣+ سنوات' },
    { title: 'مصمّم منتج (UX/UI)', dept: 'تصميم', type: 'دوام كامل', loc: 'القاهرة', exp: '٤+ سنوات' },
    { title: 'مدير منتج', dept: 'منتج', type: 'دوام كامل', loc: 'القاهرة / عن بُعد', exp: '٥+ سنوات' },
    { title: 'مسوّق رقمي', dept: 'تسويق', type: 'دوام كامل', loc: 'القاهرة', exp: '٣+ سنوات' },
    { title: 'كاتب محتوى عربي', dept: 'تسويق', type: 'عقد', loc: 'عن بُعد', exp: '٢+ سنوات' },
    { title: 'متدرّب هندسة', dept: 'هندسة', type: 'تدريب', loc: 'القاهرة', exp: 'حديث التخرّج' },
  ];
  const depts = ['الكل', 'هندسة', 'تصميم', 'منتج', 'تسويق', 'مبيعات'];
  const [filter, setFilter] = React.useState('الكل');
  const filtered = filter === 'الكل' ? jobs : jobs.filter(j => j.dept === filter);
  return (
    <section style={{ padding: '100px 40px', background: '#1B0E2B', color: '#FCDDD0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel num="٠٢" title="الفرص المتاحة" color="#F58762" />
        <h2 style={{
          fontSize: 'clamp(40px, 4.5vw, 72px)', fontWeight: 900, lineHeight: 1.35,
          letterSpacing: '-0.03em', marginBottom: 40,
        }}>
          نبحث عن <span style={{ color: '#F58762' }}>أشخاص</span> مثلك.
        </h2>

        {/* Filter */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
          {depts.map(d => (
            <button key={d} onClick={() => setFilter(d)} style={{
              background: filter === d ? '#F58762' : 'rgba(255,255,255,0.06)',
              color: filter === d ? '#1B0E2B' : '#FCDDD0',
              padding: '8px 18px', borderRadius: 99, fontSize: 14, fontWeight: 700,
              border: '1px solid ' + (filter === d ? '#F58762' : 'rgba(252,221,208,0.15)'),
            }}>{d}</button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon="briefcase"
            title="لا توجد وظائف في هذا القسم حالياً"
            subtitle="لكننا نوسّع الفريق باستمرار. تابعنا على لينكدإن أو أرسل سيرتك الذاتية، وسنتواصل معك أول ما تظهر فرصة."
            cta={{ label: 'إرسال سيرة ذاتية', href: 'mailto:jobs@rivyoz.com' }}
            accent="#F58762"
            dark
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map((j, i) => (
              <a key={i} href={'job-detail.html?id=' + i} style={{
                background: 'rgba(255,255,255,0.04)', borderRadius: 14,
                padding: '20px 24px', border: '1px solid rgba(252,221,208,0.1)',
                display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: 20,
                alignItems: 'center', transition: 'all 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(245,135,98,0.08)'; e.currentTarget.style.borderColor = 'rgba(245,135,98,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(252,221,208,0.1)'; }}>
                <div>
                  <div style={{ fontSize: 19, fontWeight: 800 }}>{j.title}</div>
                  <div style={{ fontSize: 12, color: '#F58762', fontWeight: 700, marginTop: 4 }}>{j.dept}</div>
                </div>
                <div style={{ fontSize: 14, opacity: 0.8, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon name="briefcase" size={14} color="#FCDDD0" strokeWidth={1.6} />
                  {j.type}
                </div>
                <div style={{ fontSize: 14, opacity: 0.8, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon name="location" size={14} color="#FCDDD0" strokeWidth={1.6} />
                  {j.loc}
                </div>
                <div style={{ fontSize: 14, opacity: 0.8 }}>{j.exp}</div>
                <Icon name="arrowLeft" size={18} color="#F58762" strokeWidth={2} />
              </a>
            ))}
          </div>
        )}

        <div style={{
          marginTop: 40, padding: 24, borderRadius: 16,
          border: '1px dashed rgba(252,221,208,0.2)',
          textAlign: 'center', fontSize: 15, opacity: 0.85,
        }}>
          لا ترى ما يناسبك؟ أرسل سيرتك الذاتية على <strong style={{ color: '#F58762' }} className="mono">jobs@rivyoz.com</strong> وسنبقى على تواصل.
        </div>
      </div>
    </section>
  );
};

const App = () => (
  <PageShell
    num="٠٣"
    label="الوظائف"
    title="انضم لرحلتنا."
    subtitle="نبني فريقاً يجمع المهندسين، المصمّمين، والكتّاب — كلٌّ بشغفه. إذا كان لديك قصة لتُضيفها، نحن نسمع."
    accent="#F58762"
  >
    <Why />
    <Openings />
  </PageShell>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
