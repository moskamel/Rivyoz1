// ملفات تعريف الارتباط — Cookies Policy
const sections = [
  {
    id: 'what',
    title: 'ما هي ملفات تعريف الارتباط؟',
    content: (
      <p>
        ملفات تعريف الارتباط (Cookies) هي ملفات نصّية صغيرة يتم تخزينها على جهازك حين تستخدم تطبيقاً أو موقعاً.
        تساعد هذه الملفات في تذكّر تفضيلاتك، إبقائك مسجّل الدخول، وفهم كيفية تفاعلك مع الخدمة بشكل مجمّع.
        لا تحوي ملفات تعريف الارتباط بياناتك الشخصية بشكل مباشر، لكنها قد تربط نشاطك بحسابك.
      </p>
    ),
  },
  {
    id: 'types',
    title: 'أنواع الملفات التي نستخدمها',
    content: (
      <div style={{ display: 'grid', gap: 12 }}>
        {[
          {
            t: 'أساسية', req: true,
            d: 'ضرورية لعمل التطبيق — تسجيل الدخول، الأمان، إعدادات اللغة. لا يمكن تعطيلها.',
          },
          {
            t: 'وظيفية', req: false,
            d: 'تحفظ تفضيلاتك (الفئات المفضّلة، العملة، الثيمة) لتجربة شخصية.',
          },
          {
            t: 'تحليلية', req: false,
            d: 'تساعدنا في فهم كيف يستخدم الناس التطبيق — بشكل مجمّع وبدون معرفة هويتك.',
          },
          {
            t: 'تسويقية', req: false,
            d: 'تُستخدم لقياس فاعلية حملاتنا التسويقية. لا نشاركها مع أطراف ثالثة لأغراض إعلانية.',
          },
        ].map((c, i) => (
          <div key={i} style={{
            background: '#FBF6F1', borderRadius: 12, padding: '16px 20px',
            display: 'grid', gridTemplateColumns: '120px 1fr auto', gap: 16, alignItems: 'center',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: c.req ? '#E66A40' : '#C95FA0' }} />
              <strong style={{ color: '#1B0E2B', fontSize: 16 }}>{c.t}</strong>
            </div>
            <span style={{ fontSize: 15 }}>{c.d}</span>
            <span style={{
              fontSize: 11, padding: '4px 10px', borderRadius: 99, fontWeight: 700,
              background: c.req ? '#1B0E2B' : 'rgba(67,36,103,0.08)',
              color: c.req ? '#fff' : '#1B0E2B',
            }}>
              {c.req ? 'إلزامية' : 'اختيارية'}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'control',
    title: 'كيف تتحكم في الملفات',
    content: (
      <div>
        <p>تستطيع التحكّم في كل أنواع الملفات الاختيارية من ثلاث طرق:</p>
        <ol style={{ paddingInlineStart: 24, marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <li>
            <strong>داخل التطبيق</strong> — انتقل إلى <em>الإعدادات → الخصوصية → ملفات تعريف الارتباط</em>،
            وعطّل ما تشاء.
          </li>
          <li>
            <strong>إعدادات الجهاز</strong> — كل من نظامي iOS و Android يوفّر تحكّماً على مستوى التطبيق
            في تتبّع الإعلانات.
          </li>
          <li>
            <strong>متصفّح الويب</strong> — إذا كنت تستخدم النسخة الإلكترونية،
            يمكنك إدارة الملفات من إعدادات متصفّحك مباشرة.
          </li>
        </ol>
      </div>
    ),
  },
  {
    id: 'third',
    title: 'ملفات الأطراف الثالثة',
    content: (
      <div>
        <p>نستخدم خدمات الأطراف الثالثة التالية، وكلٌّ منها قد يضع ملفاته الخاصّة:</p>
        <ul style={{ paddingInlineStart: 24, marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <li><strong>PostHog</strong> — لتحليلات الاستخدام المُجمَّعة.</li>
          <li><strong>Supabase</strong> — لإدارة الحسابات والمصادقة.</li>
          <li><strong>Google Analytics</strong> — لقياس الزيارات في الموقع الإلكتروني.</li>
        </ul>
        <p style={{ marginTop: 14 }}>
          لمزيد من التفاصيل، راجع سياسات الخصوصية الخاصّة بكل من هذه الشركات.
        </p>
      </div>
    ),
  },
  {
    id: 'duration',
    title: 'مدّة بقاء الملفات',
    content: (
      <ul style={{ paddingInlineStart: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <li><strong>ملفات الجلسة</strong> — تُحذف عند إغلاق التطبيق.</li>
        <li><strong>ملفات دائمة</strong> — تبقى من <span className="mono">٣٠</span> يوماً إلى <span className="mono">٢٤</span> شهراً، حسب الغرض.</li>
        <li><strong>ملفات أمنية</strong> — تبقى طوال فترة جلسة الحساب لحمايتك.</li>
      </ul>
    ),
  },
  {
    id: 'changes',
    title: 'تحديثات هذه السياسة',
    content: (
      <p>
        قد نُحدّث سياسة ملفات تعريف الارتباط حين نضيف ميزات جديدة أو نغيّر مزوّدي الخدمة.
        نشير دائماً إلى تاريخ آخر تحديث في أعلى هذه الصفحة، ونُعلمك بأي تغيير جوهري داخل التطبيق.
      </p>
    ),
  },
];

const App = () => (
  <PageShell
    num="٠٨"
    label="ملفات تعريف الارتباط"
    title="ملفّاتك. اختيارك."
    subtitle="نستخدم ملفات تعريف الارتباط بأقل قدر ممكن، ونمنحك التحكّم الكامل في الباقي."
    accent="#432467"
  >
    <LegalDoc sections={sections} accent="#432467" />
  </PageShell>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
