// تفاصيل مقال — Blog detail page

const ArticleHero = ({ post }) => (
  <section style={{
    background: 'linear-gradient(180deg, #FCDDD0 0%, #FDF8FF 100%)',
    paddingTop: 160, paddingBottom: 60, paddingInline: 40,
    position: 'relative', overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute', top: '15%', left: '-10%', width: 500, height: 500,
      borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,95,160,0.2), transparent 70%)',
      filter: 'blur(40px)',
    }} />
    <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32, fontSize: 14, color: '#6B5575' }}>
        <a href="../Reviyoz Landing.html" style={{ opacity: 0.7 }}>الرئيسية</a>
        <Icon name="arrowLeft" size={12} color="#6B5575" strokeWidth={2} />
        <a href="blog.html" style={{ opacity: 0.7 }}>المدوّنة</a>
        <Icon name="arrowLeft" size={12} color="#6B5575" strokeWidth={2} />
        <span style={{ color: '#1B0E2B', fontWeight: 700 }}>{post.category}</span>
      </div>

      <div style={{
        display: 'inline-block', fontSize: 12, fontWeight: 800, color: '#C95FA0',
        background: 'rgba(201,95,160,0.12)', padding: '6px 14px', borderRadius: 99, marginBottom: 24,
        letterSpacing: 1,
      }}>{post.category}</div>

      <h1 style={{
        fontSize: 'clamp(40px, 5vw, 76px)', fontWeight: 900, lineHeight: 1.35,
        letterSpacing: '-0.03em', color: '#1B0E2B', marginBottom: 24,
      }}>
        {post.title}
      </h1>

      <p style={{ fontSize: 22, lineHeight: 1.5, color: '#3a2649', marginBottom: 32, maxWidth: 760 }}>
        {post.excerpt}
      </p>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 20, paddingTop: 24,
        borderTop: '1px solid rgba(67,36,103,0.1)', flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'linear-gradient(135deg, #F58762, #C95FA0)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 800, fontSize: 18,
          }}>{post.author[0]}</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#1B0E2B' }}>{post.author}</div>
            <div style={{ fontSize: 12, color: '#6B5575' }}>{post.role}</div>
          </div>
        </div>
        <span style={{ width: 1, height: 24, background: 'rgba(67,36,103,0.12)' }} />
        <div style={{ fontSize: 14, color: '#6B5575', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon name="calendar" size={14} color="#6B5575" strokeWidth={1.6} />
          {post.date}
        </div>
        <span style={{ width: 1, height: 24, background: 'rgba(67,36,103,0.12)' }} />
        <div style={{ fontSize: 14, color: '#6B5575', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon name="documentText" size={14} color="#6B5575" strokeWidth={1.6} />
          {post.read}
        </div>

        <div style={{ marginInlineStart: 'auto', display: 'flex', gap: 8 }}>
          {['twitter', 'whatsapp', 'copy'].map((s, i) => (
            <button key={i} style={{
              width: 38, height: 38, borderRadius: 12,
              background: '#fff', border: '1px solid rgba(67,36,103,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#6B5575',
            }}>
              <Icon name={s === 'whatsapp' ? 'call' : s === 'twitter' ? 'send' : 'documentText'} size={16} color="#1B0E2B" strokeWidth={1.6} />
            </button>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const CoverImage = () => (
  <div style={{ padding: '0 40px', background: '#FBF6F1' }}>
    <div style={{
      maxWidth: 900, margin: '0 auto',
      height: 400, borderRadius: 24, marginTop: -30, position: 'relative',
      background: 'linear-gradient(135deg, #F58762 0%, #C95FA0 50%, #432467 100%)',
      overflow: 'hidden',
      boxShadow: '0 30px 60px -30px rgba(67,36,103,0.4)',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 300, fontWeight: 900, color: 'rgba(255,255,255,0.1)',
        fontFamily: 'JetBrains Mono', lineHeight: 1, letterSpacing: '-0.05em',
      }}>٠١</div>
      <div style={{
        position: 'absolute', bottom: 20, right: 24,
        color: '#fff', fontFamily: 'JetBrains Mono', fontSize: 12, opacity: 0.7,
      }}>[ صورة المقال ]</div>
    </div>
  </div>
);

const ArticleBody = () => (
  <article style={{ padding: '60px 40px', background: '#FBF6F1' }}>
    <div style={{
      maxWidth: 760, margin: '0 auto',
      fontSize: 19, lineHeight: 1.8, color: '#3a2649',
    }}>
      <p style={{ marginBottom: 20, fontSize: 22, lineHeight: 1.6, color: '#1B0E2B', fontWeight: 500 }}>
        التسوّق الإلكتروني في مصر تطوّر بشكل لا يُصدَّق خلال السنوات الأخيرة. أصبحت الخيارات لا تُحصى،
        لكن السؤال الذي يطرح نفسه: هل نتسوّق فعلاً بذكاء، أم نُنفق بشكل عشوائي؟
      </p>

      <p style={{ marginBottom: 20 }}>
        في هذا الدليل، سنستعرض ست استراتيجيات مجرّبة يطبّقها المتسوّقون المحترفون لتوفير ما بين <strong>٢٠٪ و ٤٠٪</strong>
        من قيمة كل عملية شراء — بدون التضحية بالجودة أو الانتظار لمواسم العروض.
      </p>

      <h2 style={{
        fontSize: 36, fontWeight: 900, color: '#1B0E2B', marginTop: 50, marginBottom: 16,
        letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: 12,
      }}>
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: 20, color: '#F58762' }}>٠١</span>
        قارن الأسعار قبل كل شراء
      </h2>
      <p style={{ marginBottom: 20 }}>
        الخطوة الأهم — وأكثر الناس يتجاهلونها. سعر نفس المنتج يختلف بشكل كبير بين المتاجر،
        أحياناً يصل الفرق إلى <strong>٣٠٪</strong>. استخدم تطبيقاً متخصّصاً في مقارنة الأسعار
        قبل أن تضغط زر الشراء.
      </p>

      {/* pull quote */}
      <blockquote style={{
        margin: '40px 0', padding: '24px 28px',
        background: '#fff', borderRadius: 16,
        borderRight: '4px solid #C95FA0',
        fontSize: 22, lineHeight: 1.5, fontWeight: 600, color: '#1B0E2B',
        fontStyle: 'italic',
      }}>
        "وفّرت أكثر من ١٥٠٠ جنيه في شهر واحد فقط بمقارنة بسيطة قبل كل عملية شراء"
        <div style={{ fontSize: 14, fontStyle: 'normal', color: '#6B5575', fontWeight: 500, marginTop: 8 }}>
          — سارة، مستخدمة ريفيوز
        </div>
      </blockquote>

      <h2 style={{
        fontSize: 36, fontWeight: 900, color: '#1B0E2B', marginTop: 50, marginBottom: 16,
        letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: 12,
      }}>
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: 20, color: '#F58762' }}>٠٢</span>
        فعّل تنبيهات الأسعار
      </h2>
      <p style={{ marginBottom: 20 }}>
        المنتج الذي تريده اليوم قد ينخفض سعره غداً. بدلاً من فتح التطبيقات يدوياً كل يوم،
        فعّل تنبيهات الأسعار للمنتجات التي تريدها، وسيُعلمك التطبيق فور انخفاض السعر.
      </p>

      <h2 style={{
        fontSize: 36, fontWeight: 900, color: '#1B0E2B', marginTop: 50, marginBottom: 16,
        letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: 12,
      }}>
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: 20, color: '#F58762' }}>٠٣</span>
        اقرأ المراجعات بعناية
      </h2>
      <p style={{ marginBottom: 16 }}>
        مراجعة سيّئة واحدة قد تنقذك من شراء فاشل. ركّز على:
      </p>
      <ul style={{ paddingInlineStart: 24, marginBottom: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <li><strong>عدد المراجعات</strong> — منتج بـ ١٠٠+ مراجعة أكثر موثوقية من واحد بـ ٥.</li>
        <li><strong>المراجعات المتوسطة (٣ نجوم)</strong> — أصدق ما تجد، لا متحمّسة ولا غاضبة.</li>
        <li><strong>الصور من المستخدمين</strong> — ما تشتريه ليس دائماً ما تراه في الإعلان.</li>
        <li><strong>تواريخ المراجعات</strong> — المراجعات القديمة قد تكون عن نسخة سابقة من المنتج.</li>
      </ul>

      {/* info box */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(245,135,98,0.08), rgba(201,95,160,0.05))',
        border: '1px dashed rgba(201,95,160,0.3)',
        borderRadius: 16, padding: 24, margin: '40px 0',
        display: 'flex', gap: 16,
      }}>
        <Icon name="flash" size={32} color="#C95FA0" strokeWidth={1.6} />
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#1B0E2B', marginBottom: 6 }}>نصيحة سريعة</div>
          <div style={{ fontSize: 15, color: '#3a2649', lineHeight: 1.6 }}>
            ميزة المسح بالكاميرا في ريفيوز تجعل العملية أسهل — وجّه الكاميرا نحو أي منتج،
            وستعرف اسمه وأسعاره وأهم مراجعاته في ثانية واحدة.
          </div>
        </div>
      </div>

      <h2 style={{
        fontSize: 36, fontWeight: 900, color: '#1B0E2B', marginTop: 50, marginBottom: 16,
        letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: 12,
      }}>
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: 20, color: '#F58762' }}>٠٤</span>
        استغل العروض الموسمية بذكاء
      </h2>
      <p style={{ marginBottom: 20 }}>
        موسم رمضان، الجمعة البيضاء، عروض رأس السنة — هذه ليست مصادفات تسويقية،
        بل فرص حقيقية للتوفير الكبير. لكن الحيلة أن تكون قائمتك جاهزة قبل بدء الموسم، لا أن تتصفّح وتشتري عشوائياً.
      </p>

      <h2 style={{
        fontSize: 36, fontWeight: 900, color: '#1B0E2B', marginTop: 50, marginBottom: 16,
        letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: 12,
      }}>
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: 20, color: '#F58762' }}>٠٥</span>
        لا تتجاهل المتاجر الجديدة
      </h2>
      <p style={{ marginBottom: 20 }}>
        الكثير من أفضل العروض موجود في متاجر صاعدة، ليست بالضرورة الأكبر اسماً.
        ريفيوز يعرض لك أسعار أكثر من ٢٠ متجراً مصرياً وإقليمياً، فلا تحصر نفسك في خيار أو اثنين.
      </p>

      <h2 style={{
        fontSize: 36, fontWeight: 900, color: '#1B0E2B', marginTop: 50, marginBottom: 16,
        letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: 12,
      }}>
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: 20, color: '#F58762' }}>٠٦</span>
        اكتب مراجعاتك — اربح نقاطاً
      </h2>
      <p style={{ marginBottom: 20 }}>
        كل مراجعة تكتبها تُكافأ بنقاط حقيقية، وكل نقطة تقرّبك من مستويات أعلى وكوبونات حصرية.
        مشاركة تجربتك لا تساعد الآخرين فحسب، بل توفّر لك أيضاً.
      </p>

      <div style={{
        marginTop: 60, padding: '32px 28px',
        background: '#1B0E2B', color: '#FCDDD0', borderRadius: 20,
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 28, fontWeight: 900, marginBottom: 12 }}>
          جرّب ريفيوز اليوم
        </div>
        <p style={{ fontSize: 16, opacity: 0.8, marginBottom: 20, maxWidth: 480, margin: '0 auto 20px' }}>
          طبّق كل ما قرأته في الدليل بأداة واحدة — مجاناً، باللغة العربية.
        </p>
        <a href="../Reviyoz Landing.html" style={{
          background: '#F58762', color: '#1B0E2B',
          padding: '14px 28px', borderRadius: 12,
          fontSize: 16, fontWeight: 800,
          display: 'inline-flex', alignItems: 'center', gap: 10,
        }}>
          تنزيل التطبيق
          <Icon name="arrowLeft" size={16} color="#1B0E2B" strokeWidth={2.2} />
        </a>
      </div>

      {/* tags */}
      <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid rgba(67,36,103,0.1)' }}>
        <div style={{ fontSize: 13, color: '#6B5575', fontWeight: 700, marginBottom: 12 }}>الوسوم</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['تسوّق ذكي', 'توفير', 'مقارنة أسعار', 'مراجعات', 'إرشادات', 'مبتدئين'].map(t => (
            <span key={t} style={{
              background: '#fff', color: '#1B0E2B',
              padding: '6px 14px', borderRadius: 99,
              fontSize: 13, fontWeight: 600,
              border: '1px solid rgba(67,36,103,0.1)',
            }}>#{t}</span>
          ))}
        </div>
      </div>
    </div>
  </article>
);

const RelatedPosts = () => (
  <section style={{ padding: '80px 40px', background: '#FBF6F1', borderTop: '1px solid rgba(67,36,103,0.06)' }}>
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <SectionLabel num="✦" title="اقرأ أيضاً" color="#C95FA0" />
      <h2 style={{
        fontSize: 'clamp(32px, 3.5vw, 56px)', fontWeight: 900, lineHeight: 1.35,
        letterSpacing: '-0.03em', color: '#1B0E2B', marginBottom: 32,
      }}>
        مقالات قد تعجبك.
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {[
          { cat: 'تقنية', title: 'الذكاء الاصطناعي وراء المسح الفوري — كيف يعمل؟', read: '٦ د', bg: 'linear-gradient(135deg, #432467, #C95FA0)' },
          { cat: 'تسوّق', title: 'أكثر ١٠ منتجات بحثاً في مصر هذا الشهر', read: '٤ د', bg: 'linear-gradient(135deg, #F58762, #C95FA0)' },
          { cat: 'إرشادات', title: 'كيف تكتب مراجعة مفيدة فعلاً؟', read: '٥ د', bg: 'linear-gradient(135deg, #FCDDD0, #C95FA0)' },
        ].map((p, i) => (
          <a key={i} href="blog-detail.html" style={{
            background: '#fff', borderRadius: 18,
            overflow: 'hidden', border: '1px solid rgba(67,36,103,0.06)',
            display: 'flex', flexDirection: 'column',
            transition: 'all 0.3s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 32px -16px rgba(67,36,103,0.2)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
            <div style={{
              height: 140, background: p.bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 60, fontWeight: 900, color: 'rgba(255,255,255,0.3)',
              fontFamily: 'JetBrains Mono',
            }}>{String(i+2).padStart(2,'0')}</div>
            <div style={{ padding: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: '#C95FA0', letterSpacing: 1, marginBottom: 8 }}>{p.cat}</div>
              <h3 style={{ fontSize: 18, fontWeight: 800, lineHeight: 1.3, color: '#1B0E2B', marginBottom: 12 }}>{p.title}</h3>
              <div style={{ fontSize: 13, color: '#6B5575' }}>{p.read} قراءة</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

const App = () => {
  const post = {
    category: 'إرشادات',
    title: 'كيف توفّر ٣٠٪ في تسوّق إلكتروني — دليل المبتدئ',
    excerpt: 'ست استراتيجيات بسيطة جرّبها آلاف المستخدمين، وحقّقت لهم توفيراً ملموساً في كل عملية شراء.',
    author: 'سارة محمود',
    role: 'محرّرة محتوى — ريفيوز',
    date: '١٥ مايو ٢٠٢٦',
    read: 'قراءة ٨ دقائق',
  };
  return (
    <div>
      <PageNav />
      <ArticleHero post={post} />
      <CoverImage />
      <ArticleBody />
      <RelatedPosts />
      <Footer />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
