// سياسة الخصوصية — Privacy Policy
const sections = [
  {
    id: 'intro',
    title: 'مبادئنا في الخصوصية',
    content: (
      <div>
        <p>في ريفيوز، نلتزم بثلاثة مبادئ أساسية:</p>
        <ul style={{ paddingInlineStart: 24, marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <li><strong>الحدّ الأدنى</strong>: نجمع فقط ما نحتاجه فعلاً لتشغيل الخدمة.</li>
          <li><strong>الشفافية</strong>: نوضّح بدقة ما يُجمَع، لماذا، ومن يصل إليه.</li>
          <li><strong>تحكّمك</strong>: تستطيع في أي لحظة مراجعة بياناتك، تعديلها، أو حذفها.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'collect',
    title: 'البيانات التي نجمعها',
    content: (
      <div>
        <p>عند استخدامك التطبيق، قد نجمع:</p>
        <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
          {[
            { k: 'بيانات الحساب', v: 'الاسم، البريد الإلكتروني، صورة الملف الشخصي.' },
            { k: 'بيانات الاستخدام', v: 'سجلّ البحث، سجلّ المسح، المنتجات المحفوظة.' },
            { k: 'البيانات التقنية', v: 'نوع الجهاز، نظام التشغيل، نسخة التطبيق، عنوان IP.' },
            { k: 'بيانات الموقع التقريبي', v: 'فقط لعرض المتاجر القريبة — وأنت تتحكّم في هذا.' },
          ].map((r, i) => (
            <div key={i} style={{
              background: '#FBF6F1', borderRadius: 10, padding: '12px 16px',
              display: 'grid', gridTemplateColumns: '180px 1fr', gap: 16,
            }}>
              <strong style={{ color: '#432467' }}>{r.k}</strong>
              <span>{r.v}</span>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 14 }}>لا نجمع: رقم هاتفك، بيانات بطاقتك البنكية، أو أي معلومات مالية حسّاسة.</p>
      </div>
    ),
  },
  {
    id: 'why',
    title: 'لماذا نجمع هذه البيانات',
    content: (
      <ul style={{ paddingInlineStart: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <li>لتقديم وتشغيل التطبيق وميزاته الأساسية.</li>
        <li>لتخصيص تجربتك (المنتجات المقترحة، الفئات المفضّلة).</li>
        <li>لتحسين الخدمة عبر تحليلات استخدام مجمّعة وغير مُعرّفة.</li>
        <li>للتواصل معك بشأن تحديثات مهمّة أو ميزات جديدة.</li>
        <li>للالتزام بالواجبات القانونية والتنظيمية.</li>
      </ul>
    ),
  },
  {
    id: 'share',
    title: 'مع من نشارك بياناتك',
    content: (
      <div>
        <p>لا نبيع بياناتك. أبداً. لكننا نشاركها مع:</p>
        <ul style={{ paddingInlineStart: 24, marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <li><strong>مزوّدي البنية التحتية</strong> (مثل Supabase) لتخزين وتشغيل التطبيق.</li>
          <li><strong>مزوّدي التحليلات</strong> (مثل PostHog) لفهم استخدام مجمّع للتطبيق.</li>
          <li><strong>المتاجر الشريكة</strong> فقط حين تنقر على رابط شراء — يصلهم أنك جئت من ريفيوز، لا أكثر.</li>
        </ul>
        <p style={{ marginTop: 12 }}>كل هذه الأطراف ملزمون تعاقدياً بالحفاظ على سرّية بياناتك.</p>
      </div>
    ),
  },
  {
    id: 'rights',
    title: 'حقوقك',
    content: (
      <div>
        <p>تملك في أي وقت الحق في:</p>
        <ul style={{ paddingInlineStart: 24, marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <li><strong>الاطلاع</strong> على البيانات التي نحتفظ بها عنك.</li>
          <li><strong>التصحيح</strong> أو تحديث أي معلومة غير دقيقة.</li>
          <li><strong>الحذف</strong> الكامل لحسابك وبياناتك.</li>
          <li><strong>التصدير</strong> لبياناتك في صيغة مقروءة.</li>
          <li><strong>الاعتراض</strong> على أي معالجة لا توافق عليها.</li>
        </ul>
        <p style={{ marginTop: 12 }}>
          لممارسة أي من هذه الحقوق، توجّه إلى إعدادات الخصوصية داخل التطبيق، أو راسلنا على
          {' '}<strong className="mono">privacy@reviyoz.com</strong>.
        </p>
      </div>
    ),
  },
  {
    id: 'security',
    title: 'كيف نحمي بياناتك',
    content: (
      <ul style={{ paddingInlineStart: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <li>تشفير كامل للبيانات الحسّاسة أثناء النقل والتخزين.</li>
        <li>تخزين آمن للمعلومات المهمّة عبر Expo Secure Store.</li>
        <li>وصول محدود للبيانات داخل الفريق، وفق مبدأ "الحاجة للمعرفة".</li>
        <li>مراجعات أمنية دورية واختبارات اختراق.</li>
      </ul>
    ),
  },
  {
    id: 'retention',
    title: 'مدّة الاحتفاظ',
    content: (
      <p>
        نحتفظ ببياناتك طالما كان حسابك نشطاً. إذا حذفت حسابك، نحذف بياناتك الشخصية خلال <strong>٣٠ يوماً</strong>.
        نحتفظ ببعض البيانات المُجمَّعة وغير المُعرّفة لأغراض التحليلات.
      </p>
    ),
  },
  {
    id: 'children',
    title: 'الأطفال والقاصرين',
    content: (
      <p>
        ريفيوز غير مصمّم لمن هم دون <strong>١٦ عاماً</strong>. لا نجمع عمداً بيانات من القاصرين.
        إذا اكتشفنا أن حساباً يخصّ قاصراً، نقوم بحذفه فوراً.
      </p>
    ),
  },
  {
    id: 'updates',
    title: 'تحديثات السياسة',
    content: (
      <p>
        قد نحدّث هذه السياسة من وقت لآخر لتعكس تغييرات في الخدمة أو القانون.
        سنُعلمك بأي تغيير جوهري عبر إشعار في التطبيق أو رسالة بريد إلكتروني،
        قبل سريانه بـ <strong>١٤ يوماً</strong> على الأقل.
      </p>
    ),
  },
];

const App = () => (
  <PageShell
    num="٠٧"
    label="سياسة الخصوصية"
    title="بياناتك. سياستنا."
    subtitle="هذه السياسة تُجيب على سؤال واحد: ما الذي نعرفه عنك، ولماذا، ومن يصل إليه. بصراحة، وبلا تعقيد."
    accent="#C95FA0"
  >
    <LegalDoc sections={sections} accent="#C95FA0" />
  </PageShell>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
