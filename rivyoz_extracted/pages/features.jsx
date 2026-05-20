// المميزات والتحديثات — Features & Updates page

const Highlights = () => {
  const items = [
    { icon: 'scan', t: 'المسح بالكاميرا', d: 'وجّه الكاميرا نحو أي منتج واعرف كل شيء عنه في ثوانٍ — مدعوم بالذكاء الاصطناعي.', tag: 'مدعوم بـ AI', color: '#F58762' },
    { icon: 'discount', t: 'مقارنة الأسعار', d: 'أسعار لحظية من أكثر من ٢٠ متجراً، مع نسب خصم محسوبة لكل واحد.', tag: 'الأكثر استخداماً', color: '#C95FA0' },
    { icon: 'searchNormal', t: 'البحث الذكي', d: 'نتائج فورية من قاعدة بيانات ضخمة — اكتب أي شيء، نعرف ما تقصد.', color: '#432467' },
    { icon: 'star', t: 'مراجعات حقيقية', d: 'تقييمات موثوقة من مستخدمين فعليين — لا مراجعات مزيّفة، لا تحيّز.', color: '#006B3F' },
    { icon: 'cup', t: 'نقاط ومكافآت', d: 'اكسب نقاطاً مع كل تفاعل، وارتقِ بين أربعة مستويات حصرية.', color: '#E66A40' },
    { icon: 'heart', t: 'المفضّلة الذكية', d: 'احفظ ما تريده، ودَع التطبيق ينبّهك حين تنخفض الأسعار.', tag: 'جديد', color: '#C95FA0' },
    { icon: 'shop', t: 'صفحات المتاجر', d: 'كل متجر بصفحة كاملة — منتجاته، تقييماته، كوبوناته، وآخر عروضه.', color: '#0D2C54' },
    { icon: 'gallery', t: 'الفئات المنظّمة', d: 'ثمانية تصنيفات رئيسية، فلاتر متقدّمة، وتصفّح بصري سلس.', color: '#F58762' },
    { icon: 'security', t: 'خصوصية أولاً', d: 'لا نبيع بياناتك. تشفير كامل وتحكّم تفصيلي في كل ما يُجمَع.', color: '#432467' },
  ];
  return (
    <section style={{ padding: '100px 40px', background: '#FBF6F1' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionLabel num="٠١" title="مميزات التطبيق" color="#F58762" />
        <h2 style={{
          fontSize: 'clamp(40px, 4.5vw, 76px)', fontWeight: 900, lineHeight: 1.35,
          letterSpacing: '-0.03em', color: '#1B0E2B', marginBottom: 50, maxWidth: 800,
        }}>
          كل ما يحتاجه<br /><span className="grad-text">المتسوّق الذكي.</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {items.map((f, i) => (
            <div key={i} className="feat-card" style={{
              background: '#fff', borderRadius: 20, padding: 28,
              border: '1px solid rgba(67,36,103,0.06)',
              display: 'flex', flexDirection: 'column', gap: 14,
              position: 'relative', transition: 'all 0.3s', overflow: 'hidden',
            }}>
              {f.tag && (
                <div style={{
                  position: 'absolute', top: 16, left: 16,
                  background: f.color, color: '#fff',
                  padding: '3px 10px', borderRadius: 99, fontSize: 10, fontWeight: 800,
                }}>{f.tag}</div>
              )}
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: `${f.color}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name={f.icon} size={28} color={f.color} strokeWidth={1.6} bold={f.icon === 'star'} />
              </div>
              <div>
                <div style={{ fontSize: 21, fontWeight: 800, color: '#1B0E2B', marginBottom: 8 }}>{f.t}</div>
                <p style={{ fontSize: 15, color: '#6B5575', lineHeight: 1.55 }}>{f.d}</p>
              </div>
            </div>
          ))}
        </div>

        <style>{`
          .feat-card:hover { transform: translateY(-4px); box-shadow: 0 18px 36px -18px rgba(67,36,103,0.18); }
        `}</style>
      </div>
    </section>
  );
};

const Timeline = () => {
  const releases = [
    {
      v: '١٫٢٫٠', date: 'يونيو ٢٠٢٦', kind: 'قادم', accent: '#9E8AAE',
      title: 'تنبيهات الأسعار الذكية',
      desc: 'تنبيهات قابلة للتخصيص — حدّد السعر المستهدف، واترك للتطبيق الباقي.',
      changes: [
        { type: 'جديد', text: 'تنبيهات أسعار قابلة للتخصيص لكل منتج' },
        { type: 'جديد', text: 'مقارنة تاريخية للأسعار (آخر ٣ شهور)' },
        { type: 'تحسين', text: 'سرعة البحث مضاعفة' },
      ],
    },
    {
      v: '١٫١٫٠', date: 'مايو ٢٠٢٦', kind: 'أحدث', accent: '#F58762',
      title: 'الوضع الداكن وتنبيهات أذكى',
      desc: 'وضع داكن أصيل، فلاتر بحث متقدّمة، وتحسينات شاملة للأداء.',
      changes: [
        { type: 'جديد', text: 'وضع داكن (Dark Mode) في كل الشاشات' },
        { type: 'جديد', text: 'فلاتر بحث متقدّمة: السعر، التقييم، التوفّر' },
        { type: 'تحسين', text: 'تحسين زمن بدء التشغيل بنسبة ٤٠٪' },
        { type: 'إصلاح', text: 'إصلاح مشكلة في عرض الأسعار بعد إعادة فتح التطبيق' },
      ],
    },
    {
      v: '١٫٠٫٢', date: 'أبريل ٢٠٢٦', accent: '#C95FA0',
      title: 'تحسينات الكاميرا والاستقرار',
      desc: 'تعرّف أدق بالكاميرا، تجربة تسجيل أسهل، وإصلاحات عامة.',
      changes: [
        { type: 'تحسين', text: 'دقّة التعرّف بالكاميرا أعلى بنسبة ٢٥٪' },
        { type: 'تحسين', text: 'تجربة تسجيل دخول أبسط' },
        { type: 'إصلاح', text: 'إصلاح أخطاء في صفحة الملف الشخصي' },
      ],
    },
    {
      v: '١٫٠٫٠', date: 'مارس ٢٠٢٦', accent: '#432467',
      title: 'الإطلاق الرسمي',
      desc: 'أطلقنا ريفيوز للعموم — مسح بالكاميرا، مقارنة أسعار، نقاط، ومراجعات.',
      changes: [
        { type: 'جديد', text: 'إطلاق رسمي على آب ستور وجوجل بلاي' },
        { type: 'جديد', text: 'دعم ٢٠+ متجراً مصرياً وإقليمياً' },
        { type: 'جديد', text: 'نظام نقاط ومكافآت بأربعة مستويات' },
      ],
    },
  ];

  const typeColor = (t) => t === 'جديد' ? '#43a64e' : t === 'تحسين' ? '#F58762' : '#C95FA0';

  return (
    <section style={{ padding: '100px 40px', background: '#1B0E2B', color: '#FCDDD0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel num="٠٢" title="سجلّ التحديثات" color="#F58762" />
        <h2 style={{
          fontSize: 'clamp(40px, 4.5vw, 76px)', fontWeight: 900, lineHeight: 1.35,
          letterSpacing: '-0.03em', marginBottom: 60,
        }}>
          ما الجديد؟<br /><span style={{ color: '#F58762' }}>تحديث وراء تحديث.</span>
        </h2>

        <div style={{ position: 'relative' }}>
          {/* timeline rail */}
          <div style={{
            position: 'absolute', top: 28, bottom: 28, right: 18,
            width: 2, background: 'linear-gradient(to bottom, transparent, #F58762, #C95FA0, #432467, transparent)',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {releases.map((r, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '38px 1fr', gap: 24, alignItems: 'flex-start',
                position: 'relative',
              }}>
                {/* dot */}
                <div style={{
                  width: 38, height: 38, borderRadius: '50%',
                  background: r.accent, color: '#1B0E2B',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 900, fontFamily: 'JetBrains Mono', fontSize: 13,
                  border: '4px solid #1B0E2B', position: 'relative', zIndex: 2,
                }}>
                  v
                </div>
                <div style={{
                  background: 'rgba(255,255,255,0.04)', borderRadius: 16, padding: 28,
                  border: '1px solid rgba(252,221,208,0.1)',
                }}>
                  <div style={{
                    display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 8,
                  }}>
                    <span style={{
                      fontSize: 11, fontFamily: 'JetBrains Mono', fontWeight: 700,
                      color: r.accent, background: `${r.accent}1f`,
                      padding: '3px 8px', borderRadius: 6, letterSpacing: 1,
                    }}>
                      v<span className="mono">{r.v}</span>
                    </span>
                    {r.kind && (
                      <span style={{
                        fontSize: 11, fontWeight: 800, color: '#1B0E2B', background: r.accent,
                        padding: '3px 10px', borderRadius: 99,
                      }}>{r.kind}</span>
                    )}
                    <span style={{ fontSize: 13, opacity: 0.55 }}>{r.date}</span>
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>{r.title}</div>
                  <p style={{ fontSize: 15, opacity: 0.7, lineHeight: 1.6, marginBottom: 18 }}>{r.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {r.changes.map((c, j) => (
                      <div key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, opacity: 0.85 }}>
                        <span style={{
                          fontSize: 10, fontWeight: 800,
                          background: `${typeColor(c.type)}25`, color: typeColor(c.type),
                          padding: '3px 8px', borderRadius: 6, flexShrink: 0, marginTop: 2,
                        }}>{c.type}</span>
                        <span>{c.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Roadmap = () => {
  const items = [
    { q: 'الربع الثالث ٢٠٢٦', t: 'مقارنة المنتجات جنباً إلى جنب', icon: 'flash', status: 'قيد التطوير' },
    { q: 'الربع الثالث ٢٠٢٦', t: 'قوائم تسوّق مشتركة مع الأصدقاء', icon: 'heart', status: 'قيد التطوير' },
    { q: 'الربع الرابع ٢٠٢٦', t: 'توقّع أسعار المنتجات بالذكاء الاصطناعي', icon: 'magicStar', status: 'مخطّط' },
    { q: 'الربع الرابع ٢٠٢٦', t: 'مساعد تسوّق محادثة بالعربية', icon: 'twentyFourSupport', status: 'مخطّط' },
    { q: '٢٠٢٧', t: 'التوسّع للسعودية والإمارات', icon: 'globe', status: 'استكشاف' },
    { q: '٢٠٢٧', t: 'سوق إلكتروني داخل ريفيوز', icon: 'shop', status: 'استكشاف' },
  ];
  const sColor = (s) => s === 'قيد التطوير' ? '#F58762' : s === 'مخطّط' ? '#C95FA0' : '#9E8AAE';
  return (
    <section style={{ padding: '100px 40px', background: '#FBF6F1' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel num="٠٣" title="ماذا بعد؟" />
        <h2 style={{
          fontSize: 'clamp(40px, 4.5vw, 76px)', fontWeight: 900, lineHeight: 1.35,
          letterSpacing: '-0.03em', color: '#1B0E2B', marginBottom: 50, maxWidth: 800,
        }}>
          خارطة الطريق.<br />
          <span style={{ fontStyle: 'italic', fontWeight: 400 }}>ما نعمل عليه الآن.</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
          {items.map((r, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 18, padding: 24,
              border: '1px solid rgba(67,36,103,0.06)',
              display: 'flex', gap: 16, alignItems: 'flex-start',
            }}>
              <div style={{
                width: 50, height: 50, borderRadius: 14,
                background: `${sColor(r.status)}1c`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon name={r.icon} size={24} color={sColor(r.status)} strokeWidth={1.6} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 6 }}>
                  <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono', color: '#6B5575', fontWeight: 700 }}>{r.q}</div>
                  <div style={{
                    fontSize: 10, fontWeight: 800, color: sColor(r.status),
                    background: `${sColor(r.status)}1c`,
                    padding: '3px 8px', borderRadius: 99,
                  }}>{r.status}</div>
                </div>
                <div style={{ fontSize: 17, fontWeight: 800, color: '#1B0E2B', lineHeight: 1.3 }}>{r.t}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 40, padding: 24,
          background: 'linear-gradient(135deg, rgba(245,135,98,0.08), rgba(201,95,160,0.05))',
          border: '1px dashed rgba(201,95,160,0.3)',
          borderRadius: 18, textAlign: 'center',
          fontSize: 15, color: '#3a2649',
        }}>
          هل لديك اقتراح ميزة؟ راسلنا على
          {' '}<a href="mailto:feedback@rivyoz.com" className="mono" style={{ color: '#C95FA0', fontWeight: 800 }}>feedback@rivyoz.com</a>
        </div>
      </div>
    </section>
  );
};

const App = () => (
  <PageShell
    num="✦"
    label="المميزات والتحديثات"
    title="كل ما يستطيع ريفيوز فعله."
    subtitle="نظرة شاملة على مميزات التطبيق، سجلّ تحديثاته منذ الإطلاق، وما الذي نعمل عليه الآن."
    accent="#F58762"
  >
    <Highlights />
    <Timeline />
    <Roadmap />
  </PageShell>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
