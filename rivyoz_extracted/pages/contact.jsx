// تواصل معنا — Contact
const { useState } = React;

const ContactCards = () => {
  const channels = [
    {
      icon: 'call', title: 'واتساب', sub: 'دعم مباشر — رد فوري',
      value: '+٢٠ ١٠٠ ٠٠٠ ٠٠٠٠', href: 'https://wa.me/201000000000',
      tag: 'الأسرع', color: '#25D366',
    },
    {
      icon: 'send', title: 'البريد الإلكتروني', sub: 'للاستفسارات والشراكات',
      value: 'hello@rivyoz.com', href: 'mailto:hello@rivyoz.com',
      color: '#C95FA0',
    },
    {
      icon: 'location', title: 'المقر الرئيسي', sub: 'تشرّفنا بالزيارة بموعد مسبق',
      value: 'القاهرة الجديدة، مصر', href: '#',
      color: '#432467',
    },
  ];
  return (
    <section style={{ padding: '100px 40px', background: '#FBF6F1' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel num="٠١" title="قنوات التواصل" color="#F58762" />
        <h2 style={{
          fontSize: 'clamp(40px, 4.5vw, 72px)', fontWeight: 900, lineHeight: 1.35,
          letterSpacing: '-0.03em', color: '#1B0E2B', marginBottom: 50,
        }}>
          اختر الطريقة الأنسب لك.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {channels.map((c, i) => (
            <a key={i} href={c.href} style={{
              background: '#fff', borderRadius: 20, padding: 28,
              border: '1px solid rgba(67,36,103,0.06)',
              display: 'flex', flexDirection: 'column', gap: 16, position: 'relative',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 18px 36px -18px rgba(67,36,103,0.25)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
              {c.tag && (
                <div style={{
                  position: 'absolute', top: 16, left: 16,
                  background: c.color, color: '#fff',
                  padding: '3px 10px', borderRadius: 99, fontSize: 11, fontWeight: 800,
                }}>{c.tag}</div>
              )}
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: c.color, color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name={c.icon} size={26} color="#fff" strokeWidth={1.8} />
              </div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#1B0E2B', marginBottom: 2 }}>{c.title}</div>
                <div style={{ fontSize: 14, color: '#6B5575', marginBottom: 12 }}>{c.sub}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: c.color }} className="mono">
                  {c.value}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: 'عام', message: '' });
  const [sent, setSent] = useState(false);
  const handle = (k, v) => setForm({ ...form, [k]: v });
  const submit = (e) => { e.preventDefault(); setSent(true); };
  return (
    <section style={{ padding: '100px 40px', background: '#1B0E2B', color: '#FCDDD0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 60, alignItems: 'start' }}>
          <div>
            <SectionLabel num="٠٢" title="استمارة التواصل" color="#F58762" />
            <h2 style={{
              fontSize: 'clamp(36px, 4vw, 64px)', fontWeight: 900, lineHeight: 1.35,
              letterSpacing: '-0.03em', marginBottom: 20,
            }}>
              أرسل لنا<br /><span style={{ color: '#F58762' }}>رسالة.</span>
            </h2>
            <p style={{ fontSize: 17, opacity: 0.8, lineHeight: 1.6, marginBottom: 24 }}>
              فريق الدعم متاح من الأحد إلى الخميس،
              من <span className="mono">٩</span> صباحاً إلى <span className="mono">٦</span> مساءً (توقيت القاهرة).
            </p>
            <div style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(252,221,208,0.1)',
              padding: 18, borderRadius: 14,
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <Icon name="twentyFourSupport" size={28} color="#F58762" strokeWidth={1.6} />
              <div>
                <div style={{ fontSize: 15, fontWeight: 800 }}>متوسط زمن الرد</div>
                <div style={{ fontSize: 13, opacity: 0.7 }}>
                  أقل من <span className="mono">٤</span> ساعات في أيام العمل
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={submit} style={{
            background: 'rgba(255,255,255,0.04)', borderRadius: 20, padding: 32,
            border: '1px solid rgba(252,221,208,0.1)',
            display: 'flex', flexDirection: 'column', gap: 18,
          }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: 40 }}>
                <div style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: 'rgba(245,135,98,0.15)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 18,
                }}>
                  <Icon name="check" size={36} color="#F58762" strokeWidth={2.5} />
                </div>
                <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>تم استلام رسالتك</div>
                <div style={{ fontSize: 15, opacity: 0.7 }}>سنرد عليك خلال يوم عمل.</div>
              </div>
            ) : (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <Field label="الاسم الكامل" value={form.name} onChange={v => handle('name', v)} placeholder="مثال: أحمد محمود" />
                  <Field label="البريد الإلكتروني" type="email" value={form.email} onChange={v => handle('email', v)} placeholder="you@example.com" />
                </div>
                <SelectField label="الموضوع" value={form.subject} onChange={v => handle('subject', v)}
                  options={['عام', 'مشكلة تقنية', 'شراكة', 'استفسار صحفي', 'اقتراح ميزة']} />
                <Field label="الرسالة" textarea value={form.message} onChange={v => handle('message', v)} placeholder="اكتب تفاصيل استفسارك هنا…" />
                <button type="submit" style={{
                  background: '#F58762', color: '#fff',
                  padding: '14px 22px', borderRadius: 12,
                  fontSize: 16, fontWeight: 800,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                }}>
                  إرسال الرسالة
                  <Icon name="send" size={18} color="#fff" strokeWidth={1.8} />
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, value, onChange, type = 'text', placeholder, textarea }) => (
  <label style={{ display: 'block' }}>
    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, opacity: 0.85 }}>{label}</div>
    {textarea ? (
      <textarea
        value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        rows={5}
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
const SelectField = ({ label, value, onChange, options }) => (
  <label style={{ display: 'block' }}>
    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, opacity: 0.85 }}>{label}</div>
    <select value={value} onChange={e => onChange(e.target.value)}
      style={{
        width: '100%', background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(252,221,208,0.15)', borderRadius: 12,
        padding: '12px 14px', fontSize: 15, color: '#FCDDD0', fontFamily: 'inherit',
        outline: 'none', direction: 'rtl',
      }}>
      {options.map(o => <option key={o} value={o} style={{ background: '#1B0E2B' }}>{o}</option>)}
    </select>
  </label>
);

const App = () => (
  <PageShell
    num="٠٢"
    label="تواصل معنا"
    title="نحن هنا. تواصل معنا."
    subtitle="سؤال؟ اقتراح؟ مشكلة تقنية؟ فرصة شراكة؟ — اختر القناة التي تناسبك، وفريقنا جاهز للرد."
    accent="#C95FA0"
  >
    <ContactCards />
    <ContactForm />
  </PageShell>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
