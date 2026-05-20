// الدعم — Support / FAQ
const FAQ = () => {
  const [openId, setOpenId] = React.useState(0);
  const [cat, setCat] = React.useState('الكل');
  const categories = ['الكل', 'الحساب', 'المسح والبحث', 'الأسعار', 'المكافآت', 'الخصوصية', 'الفواتير'];

  const faqs = [
    { cat: 'الحساب', q: 'كيف أنشئ حساباً في ريفيوز؟', a: 'حمّل التطبيق من آب ستور أو جوجل بلاي، افتح التطبيق، ثم اختر "إنشاء حساب". يمكنك التسجيل بالبريد الإلكتروني أو حساب جوجل، أو الاستمرار كضيف بدون حساب.' },
    { cat: 'الحساب', q: 'هل يمكنني استخدام التطبيق بدون حساب؟', a: 'نعم. يمكنك تصفّح المنتجات ومقارنة الأسعار كضيف. لكنك ستحتاج لحساب إذا أردت حفظ المنتجات، كتابة مراجعات، أو جمع نقاط المكافآت.' },
    { cat: 'الحساب', q: 'كيف أحذف حسابي؟', a: 'من إعدادات التطبيق → الحساب → "حذف الحساب". سنحذف بياناتك خلال ٣٠ يوماً وفق سياسة الخصوصية.' },
    { cat: 'المسح والبحث', q: 'كيف تعمل ميزة المسح بالكاميرا؟', a: 'وجّه الكاميرا نحو أي منتج، انقر زر المسح، وانتظر ثانية واحدة. سيتعرّف الذكاء الاصطناعي على المنتج ويعرض لك اسمه، فئته، ونطاق سعره التقريبي مع أرخص متجر يبيعه.' },
    { cat: 'المسح والبحث', q: 'لماذا لم يتعرّف التطبيق على المنتج؟', a: 'قد يحدث ذلك إذا كانت الإضاءة ضعيفة، الصورة ضبابية، أو المنتج جديد جداً لم يُضف بعد لقاعدة بياناتنا. حاول تصوير المنتج بإضاءة أفضل، أو ابحث عنه باسمه يدوياً.' },
    { cat: 'الأسعار', q: 'هل الأسعار محدّثة فعلاً؟', a: 'نعم. نسحب الأسعار من المتاجر بشكل لحظي، وفي الغالب يكون السعر دقيقاً. مع ذلك، قد يحدث تأخير قصير في تحديث بعض المتاجر. السعر النهائي يُحدّده المتجر عند الشراء.' },
    { cat: 'الأسعار', q: 'لماذا الأسعار مختلفة بين التطبيق والمتجر أحياناً؟', a: 'قد تتغيّر الأسعار في المتجر مباشرة. كما أن بعض المتاجر تعرض عروضاً خاصّة للأعضاء أو في تطبيقاتها. ننصح دائماً بمراجعة السعر النهائي قبل إتمام الشراء.' },
    { cat: 'المكافآت', q: 'كيف أكسب نقاطاً؟', a: 'كتابة مراجعة = ٥٠ نقطة. رفع صورة لمنتج = ٢٠ نقطة. مراجعة يجدها الآخرون مفيدة = ١٠ نقاط إضافية. كل نشاط حقيقي يكافأ.' },
    { cat: 'المكافآت', q: 'بماذا أستبدل نقاطي؟', a: 'النقاط تفتح مستويات أعلى (مساهم، موثوق، خبير) وكل مستوى يفتح مزايا حصرية: كوبونات، تنبيهات أسعار، وصول مبكّر لميزات جديدة، ودعم أولوية.' },
    { cat: 'المكافآت', q: 'هل تنتهي صلاحية النقاط؟', a: 'النقاط لا تنتهي طالما حسابك نشط. لكن قد نراجع الحسابات الخاملة لمدّة أكثر من سنتين.' },
    { cat: 'الخصوصية', q: 'هل تشاركون بياناتي مع المتاجر؟', a: 'لا. لا نشارك أي بيانات شخصية مع المتاجر. حين تنقر على رابط شراء، يصل المتجر فقط أنك جئت من ريفيوز — لا اسمك ولا بريدك.' },
    { cat: 'الخصوصية', q: 'هل تبيعون بياناتي؟', a: 'لا. أبداً. نموذج عملنا لا يعتمد على بيع البيانات. لمزيد من التفاصيل، راجع سياسة الخصوصية.' },
  ];

  const filtered = cat === 'الكل' ? faqs : faqs.filter(f => f.cat === cat);

  return (
    <section style={{ padding: '80px 40px', background: '#FBF6F1' }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        <SectionLabel num="٠١" title="الأسئلة الشائعة" color="#C95FA0" />
        <h2 style={{
          fontSize: 'clamp(36px, 4vw, 64px)', fontWeight: 900, lineHeight: 1.35,
          letterSpacing: '-0.03em', color: '#1B0E2B', marginBottom: 32,
        }}>
          لديك سؤال؟<br /><span className="grad-text">الإجابة هنا.</span>
        </h2>

        {/* Category filter */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
          {categories.map(c => (
            <button key={c} onClick={() => { setCat(c); setOpenId(null); }} style={{
              background: cat === c ? '#1B0E2B' : '#fff',
              color: cat === c ? '#fff' : '#1B0E2B',
              padding: '8px 16px', borderRadius: 99, fontSize: 14, fontWeight: 700,
              border: '1px solid ' + (cat === c ? '#1B0E2B' : 'rgba(67,36,103,0.1)'),
            }}>{c}</button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon="question"
            title="لا توجد أسئلة في هذا التصنيف"
            subtitle="لم نُجمع أسئلة شائعة في هذا التصنيف بعد. إذا لديك سؤال، تواصل معنا مباشرة وسنُجيبك خلال ٤ ساعات."
            cta={{ label: 'تواصل مع الدعم', href: 'contact.html' }}
            accent="#C95FA0"
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map((f, i) => {
              const open = openId === i;
              return (
                <div key={i} style={{
                  background: '#fff', borderRadius: 16,
                  border: '1px solid rgba(67,36,103,0.08)',
                  overflow: 'hidden',
                  transition: 'all 0.25s',
                  ...(open ? { boxShadow: '0 12px 28px -18px rgba(67,36,103,0.25)' } : {}),
                }}>
                  <button onClick={() => setOpenId(open ? null : i)} style={{
                    width: '100%', padding: '20px 24px', textAlign: 'right',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14,
                  }}>
                    <span style={{ fontSize: 17, fontWeight: 800, color: '#1B0E2B' }}>{f.q}</span>
                    <span style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: open ? '#C95FA0' : '#FBF6F1', color: open ? '#fff' : '#1B0E2B',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      transition: 'all 0.25s', transform: open ? 'rotate(45deg)' : 'rotate(0)',
                    }}>
                      <Icon name="add" size={16} color={open ? '#fff' : '#1B0E2B'} strokeWidth={2.2} />
                    </span>
                  </button>
                  {open && (
                    <div style={{
                      padding: '0 24px 22px', fontSize: 16, lineHeight: 1.65, color: '#3a2649',
                      borderTop: '1px dashed rgba(67,36,103,0.12)', paddingTop: 16,
                    }}>{f.a}</div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

const Channels = () => (
  <section style={{ padding: '100px 40px', background: '#1B0E2B', color: '#FCDDD0' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <SectionLabel num="٠٢" title="لم تجد إجابتك؟" color="#F58762" />
      <h2 style={{
        fontSize: 'clamp(40px, 4.5vw, 72px)', fontWeight: 900, lineHeight: 1.35,
        letterSpacing: '-0.03em', marginBottom: 16,
      }}>
        تكلّم مع <span style={{ color: '#F58762' }}>إنسان.</span>
      </h2>
      <p style={{ fontSize: 18, opacity: 0.8, lineHeight: 1.6, maxWidth: 600, marginBottom: 50 }}>
        فريق الدعم متاح من الأحد إلى الخميس. اختر القناة الأنسب لك:
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {[
          { icon: 'call', name: 'واتساب', sub: 'رد فوري', value: '+٢٠ ١٠٠ ٠٠٠ ٠٠٠٠', color: '#25D366' },
          { icon: 'send', name: 'البريد الإلكتروني', sub: 'خلال ٤ ساعات', value: 'support@rivyoz.com', color: '#C95FA0' },
          { icon: 'twentyFourSupport', name: 'محادثة مباشرة', sub: 'داخل التطبيق', value: 'الإعدادات → الدعم', color: '#F58762' },
        ].map((c, i) => (
          <a key={i} href="#" style={{
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(252,221,208,0.1)',
            borderRadius: 18, padding: 28, display: 'flex', flexDirection: 'column', gap: 16,
            transition: 'all 0.3s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = c.color; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(252,221,208,0.1)'; }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14, background: c.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name={c.icon} size={26} color="#fff" strokeWidth={1.8} />
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>{c.name}</div>
              <div style={{ fontSize: 13, opacity: 0.6, marginTop: 2 }}>{c.sub}</div>
            </div>
            <div style={{ fontSize: 14, fontFamily: 'JetBrains Mono', color: c.color, fontWeight: 700, marginTop: 'auto' }} className="mono">
              {c.value}
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

const App = () => (
  <PageShell
    num="٠٩"
    label="الدعم"
    title="مساعدة سريعة. بشر حقيقيون."
    subtitle="إجابات لأكثر الأسئلة شيوعاً، وقنوات تواصل مباشر مع فريقنا متى احتجت."
    accent="#C95FA0"
  >
    <FAQ />
    <Channels />
  </PageShell>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
