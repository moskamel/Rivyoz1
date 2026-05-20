// من نحن — About Reviyoz
const { useState, useEffect } = React;

const Mission = () => (
  <section style={{ padding: '100px 40px', background: '#FBF6F1' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <SectionLabel num="٠١" title="مهمّتنا" color="#F58762" />
      <h2 style={{
        fontSize: 'clamp(40px, 4.5vw, 76px)', fontWeight: 900, lineHeight: 1.35,
        letterSpacing: '-0.03em', color: '#1B0E2B', marginBottom: 28, maxWidth: 900,
      }}>
        <span className="grad-text">نُمكّن المستهلك العربي</span><br />
        من اتخاذ قرارات تسوّق أذكى.
      </h2>
      <p style={{ fontSize: 22, lineHeight: 1.6, color: '#3a2649', maxWidth: 780 }}>
        نؤمن أن لكل مشترٍ الحق في معرفة السعر الأفضل قبل الدفع، والمراجعات الصادقة قبل الالتزام،
        والوصول السهل لمعلومات يثق بها. ريفيوز بُني ليجعل ذلك حقيقة — لكل من يتسوّق بالعربية.
      </p>
    </div>
  </section>
);

const Story = () => {
  const milestones = [
    { year: '٢٠٢٤', title: 'الفكرة', text: 'انطلقت من تجربة حقيقية: ساعات من البحث عن أفضل سعر، وتطبيقات متفرقة لا تتحدث مع بعضها.' },
    { year: '٢٠٢٥', title: 'النموذج الأولي', text: 'جمعنا فريقاً صغيراً من المهندسين والمصمّمين، وبنينا أول نسخة من المحرك الذي يقارن الأسعار لحظياً.' },
    { year: '٢٠٢٥', title: 'الذكاء الاصطناعي', text: 'دمجنا تقنية التعرّف بالكاميرا، فأصبح المسح الفوري للمنتجات ممكناً بثانية واحدة.' },
    { year: '٢٠٢٦', title: 'الإطلاق', text: 'أطلقنا الإصدار الأول علناً على آيفون وأندرويد، وبدأنا رحلتنا مع آلاف المستخدمين في مصر والمنطقة.' },
  ];
  return (
    <section style={{ padding: '100px 40px', background: '#1B0E2B', color: '#FCDDD0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel num="٠٢" title="قصّتنا" color="#F58762" />
        <h2 style={{
          fontSize: 'clamp(40px, 4.5vw, 76px)', fontWeight: 900, lineHeight: 1.35,
          letterSpacing: '-0.03em', marginBottom: 60,
        }}>
          من فكرة بسيطة،<br />إلى تطبيق <span style={{ color: '#F58762' }}>يستخدمه آلاف.</span>
        </h2>

        <div style={{ position: 'relative' }}>
          {/* timeline rail */}
          <div style={{
            position: 'absolute', top: 18, right: 0, left: 0, height: 2,
            background: 'linear-gradient(to left, transparent, #F58762, #C95FA0, #432467, transparent)',
          }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {milestones.map((m, i) => (
              <div key={i}>
                <div style={{
                  width: 38, height: 38, borderRadius: '50%',
                  background: '#F58762', color: '#1B0E2B',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 900, fontSize: 14, fontFamily: 'JetBrains Mono',
                  marginBottom: 18, position: 'relative', zIndex: 2,
                  border: '4px solid #1B0E2B',
                }}>{i+1}</div>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: 13, color: '#F58762', fontWeight: 700, marginBottom: 6 }}>
                  <span className="mono">{m.year}</span>
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>{m.title}</div>
                <p style={{ fontSize: 15, opacity: 0.75, lineHeight: 1.5 }}>{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Values = () => {
  const values = [
    { icon: 'shieldTick', title: 'الشفافية', desc: 'لا أسعار خفيّة، لا اتفاقيات سرّية. ما تراه هو ما يدفعه أي مستخدم.' },
    { icon: 'magicStar', title: 'الابتكار', desc: 'نطبّق أحدث تقنيات الذكاء الاصطناعي لجعل التسوّق أبسط وأسرع.' },
    { icon: 'heart', title: 'المستخدم أولاً', desc: 'كل قرار تصميم وكل ميزة جديدة تبدأ بسؤال: هل تخدم المستخدم فعلاً؟' },
    { icon: 'globe', title: 'العربية أصيلة', desc: 'بُني من الصفر بالعربية وللعربية — لا ترجمات قاصرة، تجربة كاملة.' },
  ];
  return (
    <section style={{ padding: '100px 40px', background: '#FBF6F1' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel num="٠٣" title="قيمنا" />
        <h2 style={{
          fontSize: 'clamp(40px, 4.5vw, 76px)', fontWeight: 900, lineHeight: 1.35,
          letterSpacing: '-0.03em', color: '#1B0E2B', marginBottom: 50, maxWidth: 800,
        }}>
          ما نؤمن به،<br /><span style={{ fontStyle: 'italic', fontWeight: 400 }}>وما نبني به.</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {values.map((v, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 20, padding: 32,
              border: '1px solid rgba(67,36,103,0.06)',
              display: 'flex', gap: 20,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16, flexShrink: 0,
                background: 'linear-gradient(135deg, #FCDDD0, #E5D4F2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name={v.icon} size={28} color="#432467" strokeWidth={1.6} />
              </div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#1B0E2B', marginBottom: 6 }}>{v.title}</div>
                <p style={{ fontSize: 16, color: '#6B5575', lineHeight: 1.5 }}>{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Stats = () => (
  <section style={{
    padding: '80px 40px',
    background: 'linear-gradient(135deg, #F58762 0%, #C95FA0 50%, #432467 100%)',
    color: '#fff',
  }}>
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 30 }}>
        {[
          { n: '٥٠ ألف+', l: 'منتج مفهرس' },
          { n: '٢٠+', l: 'متجر شريك' },
          { n: '١٥', l: 'عضو في الفريق' },
          { n: '٤٫٩', l: 'تقييم متوسط' },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 64, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.04em', marginBottom: 8 }}>{s.n}</div>
            <div style={{ fontSize: 16, opacity: 0.85 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const App = () => (
  <PageShell
    num="٠١"
    label="من نحن"
    title="بُني للعربية. بُني لك."
    subtitle="ريفيوز مشروع شغوف يهدف لتغيير طريقة تسوّقنا الرقمي — بأدوات حديثة، وتصميم عربي أصيل، وثقافة تضع المستخدم في المركز."
    accent="#F58762"
  >
    <Mission />
    <Stats />
    <Story />
    <Values />
  </PageShell>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
