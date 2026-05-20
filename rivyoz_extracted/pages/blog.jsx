// المدوّنة — Blog
const Featured = ({ post }) => (
  <section style={{ padding: '100px 40px', background: '#FBF6F1' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <SectionLabel num="٠١" title="المقال المميّز" color="#F58762" />
      <a href="blog-detail.html?id=featured" style={{
        background: '#fff', borderRadius: 24, padding: 0,
        border: '1px solid rgba(67,36,103,0.06)',
        display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 0,
        overflow: 'hidden', position: 'relative',
        boxShadow: '0 24px 60px -30px rgba(67,36,103,0.25)',
      }}>
        <div style={{ padding: 50 }}>
          <div style={{
            display: 'inline-block', fontSize: 12, fontWeight: 800, color: '#C95FA0',
            background: 'rgba(201,95,160,0.1)', padding: '4px 10px', borderRadius: 99, marginBottom: 18,
          }}>{post.category}</div>
          <h2 style={{ fontSize: 42, fontWeight: 900, lineHeight: 1.15, color: '#1B0E2B', letterSpacing: '-0.02em', marginBottom: 16 }}>
            {post.title}
          </h2>
          <p style={{ fontSize: 17, color: '#6B5575', lineHeight: 1.6, marginBottom: 24 }}>{post.excerpt}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 14, color: '#6B5575' }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'linear-gradient(135deg, #F58762, #C95FA0)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 800,
            }}>{post.author[0]}</div>
            <div>
              <div style={{ fontWeight: 700, color: '#1B0E2B' }}>{post.author}</div>
              <div style={{ fontSize: 12 }}>{post.date} · {post.read}</div>
            </div>
          </div>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #F58762, #C95FA0, #432467)',
          minHeight: 360, position: 'relative', overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            fontSize: 240, fontWeight: 900, lineHeight: 1,
            color: 'rgba(255,255,255,0.15)', fontFamily: 'JetBrains Mono',
          }}>٠١</div>
          <div style={{
            position: 'absolute', bottom: 24, right: 24,
            color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 12, opacity: 0.7,
          }}>صورة المقال</div>
        </div>
      </a>
    </div>
  </section>
);

const PostsGrid = ({ posts }) => {
  const cats = ['الكل', 'تسوّق', 'تقنية', 'إرشادات', 'تحديثات', 'مقابلات'];
  const [cat, setCat] = React.useState('الكل');
  const filtered = cat === 'الكل' ? posts : posts.filter(p => p.category === cat);
  return (
    <section style={{ padding: '100px 40px', background: '#1B0E2B', color: '#FCDDD0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel num="٠٢" title="المقالات الأخيرة" color="#F58762" />
        <h2 style={{
          fontSize: 'clamp(40px, 4.5vw, 72px)', fontWeight: 900, lineHeight: 1.35,
          letterSpacing: '-0.03em', marginBottom: 32,
        }}>
          اقرأ. تعلّم. <span style={{ color: '#F58762' }}>وفّر.</span>
        </h2>

        <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
          {cats.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              background: cat === c ? '#F58762' : 'rgba(255,255,255,0.06)',
              color: cat === c ? '#1B0E2B' : '#FCDDD0',
              padding: '8px 18px', borderRadius: 99, fontSize: 14, fontWeight: 700,
              border: '1px solid ' + (cat === c ? '#F58762' : 'rgba(252,221,208,0.15)'),
            }}>{c}</button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon="documentText"
            title="لا توجد مقالات في هذا التصنيف بعد"
            subtitle="نُعدّ محتوى جديداً في هذا التصنيف. اشترك في النشرة لتصلك أحدث المقالات فور نشرها."
            cta={{ label: 'تصفّح كل المقالات', href: '#' }}
            accent="#F58762"
            dark
          />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {filtered.map((p, i) => (
              <a key={i} href={'blog-detail.html?id=' + i} style={{
                background: 'rgba(255,255,255,0.04)', borderRadius: 18,
                overflow: 'hidden', border: '1px solid rgba(252,221,208,0.1)',
                transition: 'all 0.3s', display: 'flex', flexDirection: 'column',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(245,135,98,0.3)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(252,221,208,0.1)'; }}>
                <div style={{
                  height: 180, background: p.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 80, fontWeight: 900, color: 'rgba(255,255,255,0.25)',
                  fontFamily: 'JetBrains Mono',
                }}>{String(i+2).padStart(2,'0')}</div>
                <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                  <div style={{
                    fontSize: 11, fontWeight: 800, color: '#F58762',
                    letterSpacing: 1,
                  }}>{p.category}</div>
                  <h3 style={{ fontSize: 19, fontWeight: 800, lineHeight: 1.3 }}>{p.title}</h3>
                  <p style={{ fontSize: 14, opacity: 0.7, lineHeight: 1.5, flex: 1 }}>{p.excerpt}</p>
                  <div style={{
                    paddingTop: 12, borderTop: '1px solid rgba(252,221,208,0.1)',
                    fontSize: 12, opacity: 0.6, display: 'flex', justifyContent: 'space-between',
                  }}>
                    <span>{p.author}</span>
                    <span>{p.read}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const App = () => {
  const featured = {
    category: 'إرشادات',
    title: 'كيف توفّر ٣٠٪ في تسوّق إلكتروني — دليل المبتدئ',
    excerpt: 'من فهم تقلّبات الأسعار إلى استخدام الكاميرا الذكية، إليك كل ما تحتاج لتصبح متسوّقاً ذكياً.',
    author: 'سارة محمود',
    date: 'مايو ٢٠٢٦',
    read: 'قراءة ٨ دقائق',
  };
  const posts = [
    { category: 'تقنية', title: 'الذكاء الاصطناعي وراء المسح الفوري — كيف يعمل؟', excerpt: 'نظرة من الداخل على التقنية التي تتعرّف على المنتج في ثانية واحدة.', author: 'محمد فؤاد', read: '٦ د', bg: 'linear-gradient(135deg, #432467, #C95FA0)' },
    { category: 'تسوّق', title: 'أكثر ١٠ منتجات بحثاً في مصر هذا الشهر', excerpt: 'تحليل لاتجاهات التسوّق المصرية والمنتجات الأعلى طلباً.', author: 'لينا حسن', read: '٤ د', bg: 'linear-gradient(135deg, #F58762, #C95FA0)' },
    { category: 'تحديثات', title: 'الإصدار ١٫٠ — كل ما هو جديد', excerpt: 'فلترة محسّنة، تنبيهات أسعار، وثيمة داكنة. كل التحديثات في مكان واحد.', author: 'فريق ريفيوز', read: '٣ د', bg: 'linear-gradient(135deg, #C95FA0, #432467)' },
    { category: 'إرشادات', title: 'كيف تكتب مراجعة مفيدة فعلاً؟', excerpt: 'الفرق بين مراجعة عابرة ومراجعة تساعد الآخرين في القرار.', author: 'يوسف عبد الله', read: '٥ د', bg: 'linear-gradient(135deg, #FCDDD0, #C95FA0)' },
    { category: 'تسوّق', title: 'موسم العروض في رمضان — كيف تستعد؟', excerpt: 'دليلك لاستغلال أكبر مواسم التخفيضات بأقصى كفاءة.', author: 'منى السيد', read: '٧ د', bg: 'linear-gradient(135deg, #432467, #1B0E2B)' },
    { category: 'تقنية', title: 'مقارنة الأسعار في الزمن الحقيقي — التحدّيات', excerpt: 'لماذا الأمر أصعب مما يبدو، وكيف حللنا المشكلة.', author: 'أحمد رشدي', read: '٩ د', bg: 'linear-gradient(135deg, #E5D4F2, #432467)' },
  ];

  return (
    <PageShell
      num="٠٤"
      label="المدوّنة"
      title="أفكار. أدلّة. تحديثات."
      subtitle="مساحتنا للحديث عن التسوّق الذكي، التقنية وراء التطبيق، وقصص من مجتمع ريفيوز."
      accent="#C95FA0"
    >
      <Featured post={featured} />
      <PostsGrid posts={posts} />
    </PageShell>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
