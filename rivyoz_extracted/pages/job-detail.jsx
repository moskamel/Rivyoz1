// تفاصيل وظيفة — Job detail page
const { useState } = React;

const JobHero = ({ job }) => (
  <section style={{
    background: 'linear-gradient(180deg, #FCDDD0 0%, #FDF8FF 100%)',
    paddingTop: 160, paddingBottom: 60, paddingInline: 40,
    position: 'relative', overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute', top: '15%', right: '-10%', width: 500, height: 500,
      borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,135,98,0.25), transparent 70%)',
      filter: 'blur(40px)',
    }} />
    <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32, fontSize: 14, color: '#6B5575' }}>
        <a href="../Reviyoz Landing.html" style={{ opacity: 0.7 }}>الرئيسية</a>
        <Icon name="arrowLeft" size={12} color="#6B5575" strokeWidth={2} />
        <a href="careers.html" style={{ opacity: 0.7 }}>الوظائف</a>
        <Icon name="arrowLeft" size={12} color="#6B5575" strokeWidth={2} />
        <span style={{ color: '#1B0E2B', fontWeight: 700 }}>{job.title}</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 30, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 320 }}>
          <SectionLabel num="✦" title={job.dept} color="#F58762" />
          <h1 style={{
            fontSize: 'clamp(40px, 5vw, 80px)', fontWeight: 900, lineHeight: 1.3,
            letterSpacing: '-0.03em', color: '#1B0E2B', marginBottom: 24,
          }}>
            {job.title}
          </h1>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            {[
              { i: 'briefcase', v: job.type },
              { i: 'location', v: job.loc },
              { i: 'calendar', v: job.exp },
              { i: 'flash', v: 'بدء فوري' },
            ].map((m, i) => (
              <div key={i} style={{
                background: '#fff', padding: '10px 16px', borderRadius: 99,
                border: '1px solid rgba(67,36,103,0.08)',
                display: 'flex', alignItems: 'center', gap: 8,
                fontSize: 14, fontWeight: 600, color: '#1B0E2B',
              }}>
                <Icon name={m.i} size={15} color="#C95FA0" strokeWidth={1.6} />
                {m.v}
              </div>
            ))}
          </div>
        </div>

        <a href="#apply" style={{
          background: '#1B0E2B', color: '#fff',
          padding: '18px 28px', borderRadius: 16,
          fontSize: 17, fontWeight: 800,
          display: 'inline-flex', alignItems: 'center', gap: 10,
        }}>
          تقديم على الوظيفة
          <Icon name="arrowLeft" size={18} color="#fff" strokeWidth={2.2} />
        </a>
      </div>
    </div>
  </section>
);

const JobBody = ({ job }) => (
  <section style={{ padding: '80px 40px', background: '#FBF6F1' }}>
    <div style={{
      maxWidth: 1100, margin: '0 auto',
      display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 50, alignItems: 'start',
    }}>
      <div>
        {/* About */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '36px 40px', border: '1px solid rgba(67,36,103,0.06)', marginBottom: 24 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: '#1B0E2B', marginBottom: 14, display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 16, color: '#C95FA0' }}>٠١</span>
            عن الدور
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: '#3a2649' }}>{job.about}</p>
        </div>

        {/* Responsibilities */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '36px 40px', border: '1px solid rgba(67,36,103,0.06)', marginBottom: 24 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: '#1B0E2B', marginBottom: 18, display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 16, color: '#C95FA0' }}>٠٢</span>
            المسؤوليات
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {job.responsibilities.map((r, i) => (
              <li key={i} style={{ display: 'flex', gap: 12, fontSize: 16, lineHeight: 1.5, color: '#3a2649' }}>
                <span style={{
                  flexShrink: 0, marginTop: 6,
                  width: 8, height: 8, borderRadius: '50%', background: '#F58762',
                }} />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Requirements */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '36px 40px', border: '1px solid rgba(67,36,103,0.06)', marginBottom: 24 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: '#1B0E2B', marginBottom: 18, display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 16, color: '#C95FA0' }}>٠٣</span>
            المطلوب منك
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {job.requirements.map((r, i) => (
              <li key={i} style={{ display: 'flex', gap: 12, fontSize: 16, lineHeight: 1.5, color: '#3a2649' }}>
                <Icon name="check" size={18} color="#43a64e" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 4 }} />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Nice to have */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '36px 40px', border: '1px solid rgba(67,36,103,0.06)', marginBottom: 24 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: '#1B0E2B', marginBottom: 18, display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 16, color: '#C95FA0' }}>٠٤</span>
            ميزة إضافية
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {job.bonus.map((r, i) => (
              <li key={i} style={{ display: 'flex', gap: 12, fontSize: 16, lineHeight: 1.5, color: '#3a2649' }}>
                <Icon name="magicStar" size={18} color="#F58762" strokeWidth={1.8} style={{ flexShrink: 0, marginTop: 4 }} />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Side card */}
      <aside style={{ position: 'sticky', top: 100 }}>
        <div style={{
          background: '#1B0E2B', color: '#FCDDD0', borderRadius: 20, padding: 32, marginBottom: 16,
        }}>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#F58762', letterSpacing: 1, marginBottom: 12 }}>
            ملخّص الوظيفة
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { l: 'الراتب', v: job.salary, c: '#F58762' },
              { l: 'القسم', v: job.dept },
              { l: 'نوع الدوام', v: job.type },
              { l: 'الموقع', v: job.loc },
              { l: 'الخبرة', v: job.exp },
              { l: 'تاريخ النشر', v: '١٢ مايو ٢٠٢٦' },
              { l: 'تاريخ الانتهاء', v: '١٢ يونيو ٢٠٢٦' },
            ].map((r, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                paddingBottom: 14, borderBottom: i === 6 ? 'none' : '1px solid rgba(252,221,208,0.1)',
              }}>
                <span style={{ fontSize: 13, opacity: 0.6 }}>{r.l}</span>
                <span style={{ fontSize: 15, fontWeight: 700, color: r.c || '#FCDDD0' }}>{r.v}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          background: '#fff', borderRadius: 20, padding: 24, border: '1px solid rgba(67,36,103,0.06)',
        }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#1B0E2B', marginBottom: 8 }}>
            شارك الوظيفة
          </div>
          <div style={{ fontSize: 13, color: '#6B5575', marginBottom: 16 }}>
            تعرف أحداً مناسباً؟ ساعده باكتشاف الفرصة.
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['send', 'call', 'documentText'].map((s, i) => (
              <button key={i} style={{
                flex: 1, height: 42, borderRadius: 10,
                background: '#FBF6F1', border: '1px solid rgba(67,36,103,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name={s} size={16} color="#1B0E2B" strokeWidth={1.6} />
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  </section>
);

const ApplyForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', linkedin: '', cv: '', note: '' });
  const [submitted, setSubmitted] = useState(false);
  const handle = (k, v) => setForm({ ...form, [k]: v });

  return (
    <section id="apply" style={{ padding: '100px 40px', background: '#1B0E2B', color: '#FCDDD0' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <SectionLabel num="✦" title="استمارة التقديم" color="#F58762" />
        <h2 style={{
          fontSize: 'clamp(36px, 4vw, 64px)', fontWeight: 900, lineHeight: 1.35,
          letterSpacing: '-0.03em', marginBottom: 16, textAlign: 'center',
        }}>
          مستعد للانضمام؟<br /><span style={{ color: '#F58762' }}>قدّم الآن.</span>
        </h2>
        <p style={{ fontSize: 17, opacity: 0.8, lineHeight: 1.6, textAlign: 'center', marginBottom: 50, maxWidth: 540, margin: '0 auto 50px' }}>
          املأ الاستمارة وسنرد على طلبك خلال يومي عمل.
        </p>

        {submitted ? (
          <div style={{
            background: 'rgba(245,135,98,0.08)', border: '1px solid rgba(245,135,98,0.3)',
            borderRadius: 20, padding: 60, textAlign: 'center',
          }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'rgba(245,135,98,0.2)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 20,
            }}>
              <Icon name="check" size={42} color="#F58762" strokeWidth={2.5} />
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, marginBottom: 12 }}>تم إرسال طلبك</div>
            <p style={{ fontSize: 16, opacity: 0.8, maxWidth: 440, margin: '0 auto' }}>
              فريق الموارد البشرية سيراجع طلبك ويتواصل معك خلال <strong>يومي عمل</strong> على البريد المُسجَّل.
            </p>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(252,221,208,0.1)',
            borderRadius: 20, padding: 36,
            display: 'flex', flexDirection: 'column', gap: 18,
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Field label="الاسم الكامل" value={form.name} onChange={v => handle('name', v)} placeholder="مثال: نور عبد الله" />
              <Field label="البريد الإلكتروني" type="email" value={form.email} onChange={v => handle('email', v)} placeholder="you@example.com" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Field label="رقم الهاتف" value={form.phone} onChange={v => handle('phone', v)} placeholder="+20" />
              <Field label="رابط لينكدإن (اختياري)" value={form.linkedin} onChange={v => handle('linkedin', v)} placeholder="https://linkedin.com/in/…" />
            </div>
            <Field label="رابط السيرة الذاتية" value={form.cv} onChange={v => handle('cv', v)} placeholder="رابط Google Drive أو Dropbox" />
            <Field label="لماذا تريد العمل في ريفيوز؟" textarea value={form.note} onChange={v => handle('note', v)} placeholder="فقرة قصيرة عنك وعن دوافعك…" />
            <button type="submit" style={{
              background: '#F58762', color: '#1B0E2B',
              padding: '16px', borderRadius: 12, fontSize: 17, fontWeight: 800,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 8,
            }}>
              إرسال الطلب
              <Icon name="send" size={18} color="#1B0E2B" strokeWidth={1.8} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

const Field = ({ label, value, onChange, type = 'text', placeholder, textarea }) => (
  <label style={{ display: 'block' }}>
    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, opacity: 0.85, color: '#FCDDD0' }}>{label}</div>
    {textarea ? (
      <textarea
        value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={5}
        style={{
          width: '100%', background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(252,221,208,0.15)', borderRadius: 12,
          padding: '12px 14px', fontSize: 15, color: '#FCDDD0', fontFamily: 'inherit',
          resize: 'vertical', outline: 'none', direction: 'rtl',
        }} />
    ) : (
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{
          width: '100%', background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(252,221,208,0.15)', borderRadius: 12,
          padding: '12px 14px', fontSize: 15, color: '#FCDDD0', fontFamily: 'inherit',
          outline: 'none', direction: 'rtl',
        }} />
    )}
  </label>
);

const App = () => {
  const job = {
    title: 'مهندس React Native أوّل',
    dept: 'هندسة',
    type: 'دوام كامل',
    loc: 'القاهرة / عن بُعد',
    exp: '٥+ سنوات',
    salary: 'تنافسي + أسهم',
    about: 'نبحث عن مهندس React Native أوّل ليقود تطوير تطبيق ريفيوز الأساسي على iOS و Android. ستعمل بشكل وثيق مع فريق التصميم ومدير المنتج لتحويل أفكار جديدة إلى ميزات حقيقية يستخدمها آلاف الناس يومياً. ستكون مسؤولاً عن قرارات هندسية تؤثّر على مستقبل التطبيق، ومحيطك سيكون فريقاً صغيراً، طموحاً، ومتعاوناً.',
    responsibilities: [
      'تصميم وتطوير ميزات جديدة في تطبيق React Native (Expo).',
      'كتابة كود نظيف، مُختبَر، وقابل للصيانة.',
      'تقديم مراجعات شيفرة بنّاءة لأعضاء الفريق الآخرين.',
      'تحسين الأداء وزمن التحميل لتجربة سلسة.',
      'التعاون مع فرق التصميم والمنتج على دورة كاملة من الفكرة إلى الإطلاق.',
      'مشاركة معرفتك ورفع مستوى الفريق فنياً.',
    ],
    requirements: [
      'خبرة ٥+ سنوات في تطوير تطبيقات الموبايل، منها سنتان+ على React Native.',
      'إتقان TypeScript و React Hooks.',
      'تجربة عملية مع Expo، EAS Build، و OTA Updates.',
      'فهم عميق لـ REST APIs و WebSockets.',
      'خبرة في اختبارات الوحدة والتكامل (Jest، React Native Testing Library).',
      'قدرة على كتابة كود يدعم RTL واللغة العربية بشكل أصيل.',
    ],
    bonus: [
      'مساهمات في مشاريع مفتوحة المصدر.',
      'خبرة سابقة مع Supabase أو Firebase.',
      'معرفة بأساسيات تطوير iOS أو Android الأصلي.',
      'خلفية في تصميم تجربة المستخدم.',
    ],
  };

  return (
    <div>
      <PageNav />
      <JobHero job={job} />
      <JobBody job={job} />
      <ApplyForm />
      <Footer />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
