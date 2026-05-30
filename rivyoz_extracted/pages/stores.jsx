// كل المتاجر — All Stores with search + filter
const { useState, useMemo } = React;

const ALL_STORES = [
  { name: 'Amazon EG', ar: 'أمازون مصر', color: '#FF9900', initial: 'a', cat: 'متعدد الفئات', country: 'مصر', products: 45230, rating: 4.7, partner: 'شريك رسمي' },
  { name: 'noon', ar: 'نون', color: '#FEEE00', dark: true, initial: 'n', cat: 'متعدد الفئات', country: 'مصر', products: 38500, rating: 4.6, partner: 'شريك رسمي' },
  { name: 'Jumia', ar: 'جوميا', color: '#F68B1E', initial: 'J', cat: 'متعدد الفئات', country: 'مصر', products: 32100, rating: 4.3, partner: null },
  { name: 'B.TECH', ar: 'بي تك', color: '#E2231A', initial: 'B', cat: 'إلكترونيات', country: 'مصر', products: 8400, rating: 4.5, partner: 'شريك رسمي' },
  { name: '2B Egypt', ar: 'تو بي', color: '#0D2C54', initial: '2', cat: 'إلكترونيات', country: 'مصر', products: 6200, rating: 4.4, partner: null },
  { name: 'Carrefour', ar: 'كارفور', color: '#004E9F', initial: 'C', cat: 'هايبر ماركت', country: 'مصر', products: 18900, rating: 4.5, partner: null },
  { name: 'Spinneys', ar: 'سبينيس', color: '#006B3F', initial: 'S', cat: 'سوبر ماركت', country: 'مصر', products: 7800, rating: 4.6, partner: null },
  { name: 'Souq', ar: 'سوق', color: '#F47B20', initial: 'S', cat: 'متعدد الفئات', country: 'مصر', products: 12300, rating: 4.0, partner: null },
  { name: 'SHEIN', ar: 'شي إن', color: '#1B0E2B', initial: 'S', cat: 'موضة', country: 'دولي', products: 25600, rating: 4.2, partner: null },
  { name: 'Talabat', ar: 'طلبات', color: '#FF5A00', initial: 't', cat: 'توصيل طعام', country: 'مصر', products: 4500, rating: 4.5, partner: null },
  { name: 'H&M', ar: 'إتش آند إم', color: '#E50010', initial: 'H', cat: 'موضة', country: 'دولي', products: 9200, rating: 4.3, partner: null },
  { name: 'Zara', ar: 'زارا', color: '#000000', initial: 'Z', cat: 'موضة', country: 'دولي', products: 5800, rating: 4.4, partner: null },
  { name: 'Centrepoint', ar: 'سنتربوينت', color: '#000000', initial: 'C', cat: 'موضة', country: 'إقليمي', products: 11400, rating: 4.2, partner: null },
  { name: 'Namshi', ar: 'نمشي', color: '#4A4A4A', initial: 'N', cat: 'موضة', country: 'إقليمي', products: 13700, rating: 4.3, partner: null },
  { name: 'Mobile Shop', ar: 'موبايل شوب', color: '#1E88E5', initial: 'M', cat: 'إلكترونيات', country: 'مصر', products: 3400, rating: 4.1, partner: null },
  { name: 'IKEA', ar: 'إيكيا', color: '#FBD914', dark: true, initial: 'I', cat: 'منزل', country: 'إقليمي', products: 7200, rating: 4.7, partner: null },
  { name: 'Vivense', ar: 'فيفينس', color: '#FF6B35', initial: 'V', cat: 'منزل', country: 'دولي', products: 4800, rating: 4.0, partner: null },
  { name: 'LULU', ar: 'لولو', color: '#E31837', initial: 'L', cat: 'هايبر ماركت', country: 'إقليمي', products: 8600, rating: 4.4, partner: null },
  { name: 'Seoudi', ar: 'سعودي', color: '#A8244E', initial: 'S', cat: 'سوبر ماركت', country: 'مصر', products: 6300, rating: 4.5, partner: null },
  { name: 'Sigma', ar: 'سيجما', color: '#005B96', initial: 'S', cat: 'إلكترونيات', country: 'مصر', products: 4100, rating: 4.2, partner: null },
  { name: 'Hyper One', ar: 'هايبر وان', color: '#005226', initial: 'H', cat: 'هايبر ماركت', country: 'مصر', products: 5900, rating: 4.3, partner: null },
  { name: 'Othaim', ar: 'العثيم', color: '#FFA500', initial: 'O', cat: 'سوبر ماركت', country: 'إقليمي', products: 5200, rating: 4.4, partner: null },
];

const StoreCard = ({ s }) => (
  <a href="#" className="store-card" style={{
    background: '#fff', borderRadius: 18, padding: 0,
    border: '1px solid rgba(67,36,103,0.06)',
    overflow: 'hidden', position: 'relative',
    transition: 'all 0.3s',
    display: 'flex', flexDirection: 'column',
    color: '#1B0E2B', textDecoration: 'none',
  }}>
    {s.partner && (
      <div style={{
        position: 'absolute', top: 10, right: 10, zIndex: 2,
        background: '#fff', color: '#C95FA0',
        padding: '3px 10px', borderRadius: 99,
        fontSize: 10, fontWeight: 800,
        boxShadow: '0 4px 12px -4px rgba(0,0,0,0.2)',
        display: 'flex', alignItems: 'center', gap: 4,
      }}>
        <Icon name="shieldTick" size={10} color="#C95FA0" strokeWidth={2} />
        {s.partner}
      </div>
    )}
    <div style={{
      background: s.color, padding: '28px 20px 22px',
      color: s.dark ? '#1B0E2B' : '#fff', position: 'relative', minHeight: 130,
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      <div style={{ fontSize: 56, fontWeight: 900, lineHeight: 0.9, fontFamily: 'JetBrains Mono', opacity: 0.95 }}>{s.initial}</div>
      <div style={{ fontSize: 16, fontWeight: 800, fontFamily: 'JetBrains Mono' }}>{s.name}</div>
    </div>
    <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div>
        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 2 }}>{s.ar}</div>
        <div style={{ fontSize: 12, color: '#9E8AAE' }}>{s.cat} · {s.country}</div>
      </div>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingTop: 12, borderTop: '1px dashed rgba(67,36,103,0.1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 700 }}>
          <Icon name="star" size={13} color="#F58762" bold />
          <span className="mono">{s.rating.toLocaleString('ar-EG')}</span>
        </div>
        <div style={{ fontSize: 12, color: '#6B5575' }}>
          <span className="mono">{s.products.toLocaleString('ar-EG')}</span> منتج
        </div>
      </div>
    </div>
  </a>
);

const StoresGrid = () => {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('الكل');
  const [country, setCountry] = useState('الكل');
  const [sort, setSort] = useState('المنتجات');

  const cats = ['الكل', ...new Set(ALL_STORES.map(s => s.cat))];
  const countries = ['الكل', 'مصر', 'إقليمي', 'دولي'];

  const filtered = useMemo(() => {
    let r = ALL_STORES.filter(s =>
      (cat === 'الكل' || s.cat === cat) &&
      (country === 'الكل' || s.country === country) &&
      (q === '' || s.ar.includes(q) || s.name.toLowerCase().includes(q.toLowerCase()))
    );
    if (sort === 'المنتجات') r = r.sort((a,b) => b.products - a.products);
    else if (sort === 'التقييم') r = r.sort((a,b) => b.rating - a.rating);
    else if (sort === 'الاسم') r = r.sort((a,b) => a.ar.localeCompare(b.ar));
    return r;
  }, [q, cat, country, sort]);

  return (
    <section style={{ padding: '60px 40px 100px', background: '#FBF6F1' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Search + sort */}
        <div style={{
          background: '#fff', borderRadius: 20, padding: 20,
          border: '1px solid rgba(67,36,103,0.06)',
          marginBottom: 24,
          display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: 12, alignItems: 'center',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: '#FBF6F1', borderRadius: 12, padding: '10px 14px',
            border: '1px solid rgba(67,36,103,0.06)',
          }}>
            <Icon name="search" size={18} color="#6B5575" strokeWidth={1.8} />
            <input
              value={q} onChange={e => setQ(e.target.value)}
              placeholder="ابحث عن متجر…"
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                fontSize: 15, fontFamily: 'inherit', direction: 'rtl', color: '#1B0E2B',
              }} />
            {q && (
              <button onClick={() => setQ('')} style={{
                color: '#9E8AAE', display: 'flex', alignItems: 'center',
              }}>
                <Icon name="close" size={14} color="#9E8AAE" strokeWidth={2} />
              </button>
            )}
          </div>
          <select value={country} onChange={e => setCountry(e.target.value)} style={{
            background: '#FBF6F1', border: '1px solid rgba(67,36,103,0.06)', borderRadius: 12,
            padding: '12px 14px', fontSize: 15, color: '#1B0E2B', fontFamily: 'inherit',
            direction: 'rtl', outline: 'none',
          }}>
            {countries.map(c => <option key={c} value={c}>المنطقة: {c}</option>)}
          </select>
          <select value={sort} onChange={e => setSort(e.target.value)} style={{
            background: '#FBF6F1', border: '1px solid rgba(67,36,103,0.06)', borderRadius: 12,
            padding: '12px 14px', fontSize: 15, color: '#1B0E2B', fontFamily: 'inherit',
            direction: 'rtl', outline: 'none',
          }}>
            {['المنتجات', 'التقييم', 'الاسم'].map(c => <option key={c} value={c}>ترتيب حسب: {c}</option>)}
          </select>
        </div>

        {/* Category pills */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}>
          {cats.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              background: cat === c ? '#1B0E2B' : '#fff',
              color: cat === c ? '#fff' : '#1B0E2B',
              padding: '8px 16px', borderRadius: 99,
              fontSize: 14, fontWeight: 700,
              border: '1px solid ' + (cat === c ? '#1B0E2B' : 'rgba(67,36,103,0.1)'),
            }}>{c}</button>
          ))}
        </div>

        {/* Result count */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18,
        }}>
          <div style={{ fontSize: 15, color: '#6B5575' }}>
            <strong className="mono" style={{ color: '#1B0E2B' }}>{filtered.length}</strong> متجر
          </div>
          {(q || cat !== 'الكل' || country !== 'الكل') && (
            <button onClick={() => { setQ(''); setCat('الكل'); setCountry('الكل'); }} style={{
              fontSize: 13, color: '#C95FA0', fontWeight: 700,
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              مسح الفلاتر
              <Icon name="close" size={12} color="#C95FA0" strokeWidth={2} />
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon="searchNormal"
            title="لا توجد متاجر بهذه المواصفات"
            subtitle="جرّب تخفيف الفلاتر أو ابحث بكلمة أخرى. نضيف متاجر جديدة كل أسبوع."
            cta={{ label: 'مسح الفلاتر', href: '#' }}
            accent="#C95FA0"
          />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {filtered.map((s, i) => <StoreCard key={i} s={s} />)}
          </div>
        )}

        <style>{`
          .store-card:hover { transform: translateY(-6px); box-shadow: 0 18px 36px -18px rgba(67,36,103,0.25); }
        `}</style>
      </div>
    </section>
  );
};

const Partners = () => (
  <section style={{ padding: '80px 40px', background: '#1B0E2B', color: '#FCDDD0' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
        <div>
          <SectionLabel num="✦" title="شراكات" color="#F58762" />
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 900, lineHeight: 1.35,
            letterSpacing: '-0.03em', marginBottom: 20,
          }}>
            هل تملك متجراً؟<br /><span style={{ color: '#F58762' }}>انضم لنا.</span>
          </h2>
          <p style={{ fontSize: 17, opacity: 0.8, lineHeight: 1.6, marginBottom: 28 }}>
            نتعاون مع المتاجر لإيصال منتجاتهم لملايين المستخدمين في مصر والمنطقة.
            تواصل معنا لبدء الشراكة.
          </p>
          <a href="contact.html" style={{
            background: '#F58762', color: '#1B0E2B',
            padding: '14px 24px', borderRadius: 12,
            fontSize: 15, fontWeight: 800,
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            ابدأ شراكة
            <Icon name="arrowLeft" size={16} color="#1B0E2B" strokeWidth={2.2} />
          </a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
          {[
            { icon: 'flash', t: 'وصول لـ ١٠٠ ألف+ مستخدم' },
            { icon: 'discount', t: 'عرض كوبوناتك وعروضك' },
            { icon: 'documentText', t: 'تقارير أداء شهرية' },
            { icon: 'shieldTick', t: 'شارة شريك رسمي' },
          ].map((p, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(252,221,208,0.1)',
              borderRadius: 14, padding: '20px 18px',
            }}>
              <Icon name={p.icon} size={26} color="#F58762" strokeWidth={1.6} style={{ marginBottom: 12 }} />
              <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.3 }}>{p.t}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const App = () => (
  <PageShell
    num="✦"
    label="المتاجر الشريكة"
    title="كل المتاجر في مكان واحد."
    subtitle="تصفّح أكثر من ٢٢ متجراً مصرياً وإقليمياً ودولياً. ابحث، فلتر، وقارن في خطوات بسيطة."
    accent="#C95FA0"
  >
    <StoresGrid />
    <Partners />
  </PageShell>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
