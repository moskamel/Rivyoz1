import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Global, Scan, Notification, Star1, Shop,
  ArrowLeft2, ArrowRight2, TickCircle,
  ShoppingBag, ChartSquare, Heart, People,
  ArrowDown2, DollarSquare, Category,
} from 'iconsax-react'
import {
  C_light, C_dark, LandingThemeCtx, F, scrollTo,
  GlobalStyles, Navbar, Footer,
} from './LandingShared'

/* ─── Dashboard Mockup ───────────────────────────────────────── */
function DashboardMockup() {
  const { C } = useContext(LandingThemeCtx)
  const orders = [
    { id: '#٢١٤', item: 'كفتة مشوية × ٢',  status: 'جديد',    dot: C.orange },
    { id: '#٢١٣', item: 'شاورما دجاج',      status: 'تحضير',   dot: '#3B82F6' },
    { id: '#٢١٢', item: 'بيتزا مارغريتا',  status: 'جاهز ✓',  dot: '#22C55E' },
  ]
  return (
    <div className="fazz-float" style={{
      background: C_dark.gray50, borderRadius: 20, padding: 20,
      width: '100%', maxWidth: 380,
      boxShadow: '0 24px 64px rgba(26,26,46,.45)', position: 'relative',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <p style={{ fontFamily: F, fontSize: 11, color: 'rgba(255,255,255,.5)', fontWeight: 500 }}>لوحة التحكم</p>
          <p style={{ fontFamily: F, fontSize: 16, fontWeight: 800, color: '#fff', marginTop: 2 }}>مطعم الشيف كريم</p>
        </div>
        <div style={{ background: C.orange, borderRadius: 10, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff', display: 'inline-block' }} />
          <span style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: '#fff' }}>مفتوح</span>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 18 }}>
        {[
          { label: 'طلبات اليوم', val: '٣٢' },
          { label: 'المبيعات',    val: '١٨٤٠ج' },
          { label: 'متوسط الطلب', val: '٥٧ج' },
        ].map((s, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,.06)', borderRadius: 12, padding: '10px 12px' }}>
            <p style={{ fontFamily: F, fontSize: 10, color: 'rgba(255,255,255,.5)', marginBottom: 4 }}>{s.label}</p>
            <p style={{ fontFamily: F, fontSize: 15, fontWeight: 800, color: '#fff' }}>{s.val}</p>
          </div>
        ))}
      </div>
      <div style={{ background: 'rgba(255,255,255,.04)', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
          <p style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,.7)' }}>الطلبات الحالية</p>
        </div>
        {orders.map((o, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '11px 14px',
            borderBottom: i < orders.length - 1 ? '1px solid rgba(255,255,255,.04)' : 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: o.dot, flexShrink: 0 }} />
              <div>
                <p style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: '#fff' }}>{o.item}</p>
                <p style={{ fontFamily: F, fontSize: 10, color: 'rgba(255,255,255,.4)', marginTop: 1 }}>{o.id}</p>
              </div>
            </div>
            <span style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: o.dot, background: `${o.dot}22`, padding: '3px 10px', borderRadius: 999 }}>{o.status}</span>
          </div>
        ))}
      </div>
      <div style={{
        position: 'absolute', top: -14, left: -14,
        background: C.white, border: `1.5px solid ${C.gray200}`,
        borderRadius: 12, padding: '8px 14px',
        display: 'flex', alignItems: 'center', gap: 8,
        boxShadow: '0 4px 16px rgba(26,26,46,.12)',
      }}>
        <span style={{ fontSize: 18 }}>🎉</span>
        <div>
          <p style={{ fontFamily: F, fontSize: 10, color: C.gray600 }}>وفّرت الشهر ده</p>
          <p style={{ fontFamily: F, fontSize: 15, fontWeight: 800, color: C.green }}>١٢٠٠ ج عمولة</p>
        </div>
      </div>
      <div style={{
        position: 'absolute', bottom: -16, right: -16,
        background: C.orange, borderRadius: 12, padding: '8px 14px',
        display: 'flex', alignItems: 'center', gap: 6,
        boxShadow: '0 4px 16px rgba(249,115,22,.4)',
      }}>
        <Notification size={16} color="#fff" variant="Bold" />
        <span style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: '#fff' }}>طلب جديد!</span>
      </div>
    </div>
  )
}

/* ─── Hero ───────────────────────────────────────────────────── */
function Hero() {
  const { C } = useContext(LandingThemeCtx)
  const navigate = useNavigate()

  return (
    <section id="hero" dir="rtl" style={{
      minHeight: '100vh',
      background: `linear-gradient(160deg, ${C.white} 55%, ${C.orangeLight} 100%)`,
      display: 'flex', alignItems: 'center',
      padding: 'clamp(96px,12vw,140px) clamp(16px,6vw,80px) clamp(64px,8vw,100px)',
    }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', gap: 'clamp(32px,5vw,72px)', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px', minWidth: 0 }}>
          <div className="fazz-section-badge fazz-fadeup" style={{ marginBottom: 24 }}>
            🚀 منصة الطلبات المستقلة رقم ١ في مصر
          </div>
          <h1 className="fazz-fadeup" style={{
            fontFamily: F, fontWeight: 900,
            fontSize: 'clamp(32px,4.5vw,58px)',
            color: C.navy, lineHeight: 1.2, letterSpacing: '-1px',
            margin: '0 0 20px', animationDelay: '.08s',
          }}>
            وفّر عمولتك —<br />
            <span style={{ color: C.orange }}>امتلك مطعمك الرقمي</span>
          </h1>
          <p className="fazz-fadeup" style={{
            fontFamily: F, fontSize: 'clamp(15px,2vw,19px)',
            color: C.gray600, lineHeight: 1.85,
            margin: '0 0 36px', maxWidth: 520, animationDelay: '.16s',
          }}>
            بدون عمولة. بدون تبعية. موقعك الخاص، قائمتك الرقمية، تتبع الطلبات لحظياً، وتحليلات مبيعات ذكية — كل ده في يدك من النهارده.
          </p>
          <div className="fazz-fadeup" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 36, animationDelay: '.24s' }}>
            <button className="fazz-btn-primary" onClick={() => navigate('/login')} style={{ fontSize: 16, padding: '15px 32px' }}>
              ابدأ مجاناً — ١٤ يوم
            </button>
            <button className="fazz-btn-outline" onClick={() => scrollTo('how')}>شوف بيشتغل إزاي</button>
          </div>
          <div className="fazz-fadeup" style={{ display: 'flex', gap: 20, flexWrap: 'wrap', animationDelay: '.32s' }}>
            {['لا عمولة', 'موقع خاص بك', 'QR Code جاهز', 'تتبع لحظي للطلبات'].map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <TickCircle size={17} color={C.green} variant="Bold" />
                <span style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: C.gray700 }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: '1 1 320px', minWidth: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 32 }}>
          <DashboardMockup />
        </div>
      </div>
    </section>
  )
}

/* ─── Trust Bar ──────────────────────────────────────────────── */
function TrustBar() {
  const { C } = useContext(LandingThemeCtx)
  return (
    <section dir="rtl" style={{ background: C_dark.gray50, padding: '0 clamp(16px,6vw,80px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        {[
          { val: '+٥٠٠', label: 'مطعم يستخدم Fazz' },
          { val: 'صفر ٪', label: 'عمولة على طلباتك' },
          { val: '+١٢٠٠٠', label: 'طلب يومي على المنصة' },
          { val: '٩٨٪', label: 'نسبة رضا العملاء' },
          { val: '٣٠ دقيقة', label: 'وأنت أون لاين' },
        ].map((s, i) => (
          <div key={i} style={{
            flex: '1 1 140px', textAlign: 'center', padding: '22px 16px',
            borderLeft: i > 0 ? '1px solid rgba(255,255,255,.08)' : 'none',
          }}>
            <p style={{ fontFamily: "'Zain',sans-serif", fontWeight: 900, fontSize: 24, color: C.orange, lineHeight: 1, marginBottom: 4 }}>{s.val}</p>
            <p style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,.55)', lineHeight: 1.4 }}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Pain Section ───────────────────────────────────────────── */
function PainSection() {
  const { C } = useContext(LandingThemeCtx)
  const [monthly, setMonthly] = useState(30)
  const [avg, setAvg]         = useState(80)
  const commission = Math.round(monthly * avg * 30 * 0.20)
  const fazzCost   = 500

  return (
    <section dir="rtl" style={{ padding: 'clamp(64px,8vw,100px) clamp(16px,6vw,80px)', background: C.gray50 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div className="fazz-section-badge" style={{ marginBottom: 16 }}>💸 المشكلة</div>
          <h2 style={{ fontFamily: F, fontWeight: 900, fontSize: 'clamp(26px,4vw,44px)', color: C.navy, letterSpacing: '-0.5px', margin: '0 0 12px' }}>
            بتدفع كام عمولة كل شهر؟
          </h2>
          <p style={{ fontFamily: F, fontSize: 16, color: C.gray600, maxWidth: 520, margin: '0 auto' }}>
            تطبيقات الطلبات بتاخد ٢٠٪ من كل طلب — وانت بتدفع وهم بيكسبوا
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20, marginBottom: 48 }}>
          <div style={{ background: C_dark.gray50, borderRadius: 20, padding: 32, color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>😤</div>
              <div>
                <p style={{ fontFamily: F, fontWeight: 800, fontSize: 17, color: '#fff' }}>مع تطبيقات الطلبات</p>
                <p style={{ fontFamily: F, fontSize: 12, color: 'rgba(255,255,255,.5)' }}>الطريقة القديمة</p>
              </div>
            </div>
            {['عمولة ٢٠٪ على كل طلب','بياناتك وزبائنك ليهم','تصميمهم — مش تصميمك','قواعدهم — أنت تتبعها','يحذفوك امتى ما شاؤوا'].map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#DC354522', border: '1.5px solid #DC354555', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: '#DC3545', fontSize: 12, fontWeight: 900 }}>✕</span>
                </div>
                <span style={{ fontFamily: F, fontSize: 14, color: 'rgba(255,255,255,.75)' }}>{t}</span>
              </div>
            ))}
          </div>
          <div style={{ background: C.white, border: `2.5px solid ${C.orange}`, borderRadius: 20, padding: 32, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: C.orange }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: C.orangeLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🚀</div>
              <div>
                <p style={{ fontFamily: F, fontWeight: 800, fontSize: 17, color: C.navy }}>مع Fazz</p>
                <p style={{ fontFamily: F, fontSize: 12, color: C.orange, fontWeight: 600 }}>الطريقة الذكية</p>
              </div>
            </div>
            {['صفر عمولة — ٠٪ على كل طلب','بياناتك وزبائنك ليك أنت','تصميمك وهويتك الخاصة','استقلالية كاملة','موقعك — لا أحد يحذفك'].map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <TickCircle size={22} color={C.green} variant="Bold" style={{ flexShrink: 0 }} />
                <span style={{ fontFamily: F, fontSize: 14, color: C.gray700, fontWeight: 600 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
        <h3 style={{ fontFamily: F, fontWeight: 800, fontSize: 'clamp(20px,3vw,28px)', color: C.navy, textAlign: 'center', margin: '0 0 24px' }}>
          احسب كم بتخسر كل شهر 👇
        </h3>
        <div style={{ background: C.white, border: `1.5px solid ${C.gray200}`, borderRadius: 20, padding: 'clamp(24px,4vw,40px)', maxWidth: 680, margin: '0 auto' }}>
          {[
            { label: 'عدد الطلبات في اليوم', val: monthly, set: setMonthly, min: 5, max: 200, unit: 'طلب' },
            { label: 'متوسط قيمة الطلب',     val: avg,     set: setAvg,     min: 30, max: 400, unit: 'ج' },
          ].map((s, i) => (
            <div key={i} style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontFamily: F, fontSize: 14, fontWeight: 600, color: C.gray700 }}>{s.label}</span>
                <span style={{ fontFamily: F, fontSize: 15, fontWeight: 800, color: C.orange }}>{s.val} {s.unit}</span>
              </div>
              <input type="range" min={s.min} max={s.max} value={s.val} onChange={e => s.set(+e.target.value)}
                style={{ width: '100%', accentColor: C.orange, height: 4, cursor: 'pointer' }} />
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div style={{ background: C.redLight, border: `1.5px solid rgba(220,53,69,.25)`, borderRadius: 14, padding: '18px 20px', textAlign: 'center' }}>
              <p style={{ fontFamily: F, fontSize: 12, color: C.red, marginBottom: 6, fontWeight: 600 }}>عمولتك الشهرية المهدرة</p>
              <p style={{ fontFamily: F, fontSize: 26, fontWeight: 900, color: C.red }}>{commission.toLocaleString('ar-EG')} ج</p>
            </div>
            <div style={{ background: C.greenLight, border: `1.5px solid rgba(25,135,84,.25)`, borderRadius: 14, padding: '18px 20px', textAlign: 'center' }}>
              <p style={{ fontFamily: F, fontSize: 12, color: C.green, marginBottom: 6, fontWeight: 600 }}>توفيرك مع Fazz شهرياً</p>
              <p style={{ fontFamily: F, fontSize: 26, fontWeight: 900, color: C.green }}>{Math.max(0, commission - fazzCost).toLocaleString('ar-EG')} ج</p>
            </div>
          </div>
          <p style={{ fontFamily: F, fontSize: 13, color: C.gray600, textAlign: 'center', marginTop: 14 }}>اشتراك Fazz Pro = ٥٠٠ ج/شهر فقط 💪</p>
        </div>
      </div>
    </section>
  )
}

/* ─── Feature Showcase ───────────────────────────────────────── */
function FeatureShowcase() {
  const { C } = useContext(LandingThemeCtx)
  const [active, setActive] = useState(0)

  const features = [
    {
      icon: ShoppingBag,
      label: 'إدارة الطلبات',
      title: 'طلباتك في يدك — لحظة بلحظة',
      desc: 'استقبل وتابع وأدر كل طلب بضغطة واحدة. من الطلب الجديد لحد التسليم، بدون فوضى.',
      bullets: ['إشعار فوري لكل طلب جديد','سير عمل: جديد ← تحضير ← جاهز ← توصيل','رفض الطلب مع سبب الرفض','إنشاء طلبات يدوية (طاولة / تيك أواي / توصيل)','تحديث كل ٣ ثوانٍ تلقائياً'],
      mockup: <OrdersMockup />,
    },
    {
      icon: Category,
      label: 'القائمة والتصميم',
      title: 'هويتك الرقمية — بتصميمك أنت',
      desc: 'صمم موقعك وقائمتك بالألوان والصور اللي تعبر عنك. بدون مبرمج ولا تصميم جرافيك.',
      bullets: ['اختيار لون المطعم من ٨ ألوان جاهزة أو لون مخصص','رفع صور الأكل والغلاف','ترتيب الأصناف بالسحب والإفلات','تفعيل وتعطيل الأصناف بسرعة','QR Code جاهز للطباعة بضغطة واحدة'],
      mockup: <BrandMockup />,
    },
    {
      icon: ChartSquare,
      label: 'التحليلات والتقارير',
      title: 'قرارات ذكية مبنية على بيانات حقيقية',
      desc: 'شوف مبيعاتك وأرباحك وأداء كل صنف في تقارير واضحة — مع رؤى ذكاء اصطناعي تساعدك تنمو.',
      bullets: ['٨ مؤشرات رئيسية: المبيعات، الطلبات، متوسط الطلب، الزبائن الجدد','مقارنة أسبوعية وشهرية مع الفترة السابقة','تحليل ساعات الذروة وأيام الأسبوع','تقرير الزبائن الأكثر إنفاقاً','رؤى AI بتقترح إجراءات لزيادة الأرباح'],
      mockup: <AnalyticsMockup />,
    },
    {
      icon: Heart,
      label: 'برنامج الولاء',
      title: 'زبائنك يرجعوا — ويجيبوا معاهم ناس',
      desc: 'نظام نقاط ومكافآت بيحفز زبائنك على الطلب أكثر والولاء لمطعمك بدل المنافسين.',
      bullets: ['٤ مراحل: مبتدئ ← فضي ← ذهبي ← بلاتيني','نقاط على كل طلب مع مضاعفات خاصة','مكافآت: خصومات، وجبة مجانية، شحن مجاني','قاعدة عملاء كاملة مع تاريخ كل زبون','حملات واتساب مستهدفة بناءً على الشرائح'],
      mockup: <LoyaltyMockup />,
    },
    {
      icon: People,
      label: 'الفريق والفروع',
      title: 'أدر فريقك وفروعك من شاشة واحدة',
      desc: 'من موظف واحد لسلسلة فروع — Fazz بيكبر معاك وبيدي كل فرد في الفريق صلاحياته.',
      bullets: ['٥ أدوار: مدير، مشرف، كاشير، مطبخ، توصيل','مقارنة أداء الفروع في لوحة واحدة','إضافة وحذف الموظفين بسهولة','صلاحيات وصول مختلفة لكل دور','تقارير مبيعات لكل فرع على حدة'],
      mockup: <TeamMockup />,
    },
  ]

  const feat = features[active]
  const Icon = feat.icon

  return (
    <section id="features" dir="rtl" style={{
      padding: 'clamp(64px,8vw,100px) clamp(16px,6vw,80px)',
      background: C.white,
      borderTop: `1.5px solid ${C.gray200}`,
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div className="fazz-section-badge" style={{ marginBottom: 16 }}>✨ المميزات</div>
          <h2 style={{ fontFamily: F, fontWeight: 900, fontSize: 'clamp(26px,4vw,44px)', color: C.navy, letterSpacing: '-0.5px', margin: '0 0 12px' }}>
            كل اللي محتاجه لتشغيل مطعمك
          </h2>
          <p style={{ fontFamily: F, fontSize: 16, color: C.gray600, maxWidth: 480, margin: '0 auto' }}>
            من الطلب الأول للتقرير الشهري — Fazz بيغطي كل خطوة
          </p>
        </div>

        {/* Tab bar */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
          {features.map((f, i) => {
            const FIcon = f.icon
            const isActive = active === i
            return (
              <button key={i} onClick={() => setActive(i)} style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '9px 18px', borderRadius: 999, cursor: 'pointer',
                fontFamily: F, fontSize: 14, fontWeight: isActive ? 800 : 600,
                border: isActive ? `1.5px solid ${C.orange}` : `1.5px solid ${C.gray200}`,
                background: isActive ? C.orangeLight : 'transparent',
                color: isActive ? C.orange : C.gray600,
                transition: 'all .18s',
              }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = C.orangeBorder; e.currentTarget.style.color = C.navy } }}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = C.gray200; e.currentTarget.style.color = C.gray600 } }}
              >
                <FIcon size={16} />
                {f.label}
              </button>
            )
          })}
        </div>

        {/* Content panel */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 32, alignItems: 'center' }}>
          {/* Text side */}
          <div>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: C.orangeLight, border: `1.5px solid ${C.orangeBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
              <Icon size={26} color={C.orange} />
            </div>
            <h3 style={{ fontFamily: F, fontWeight: 900, fontSize: 'clamp(20px,2.5vw,28px)', color: C.navy, margin: '0 0 12px', letterSpacing: '-0.3px' }}>
              {feat.title}
            </h3>
            <p style={{ fontFamily: F, fontSize: 16, color: C.gray600, lineHeight: 1.75, margin: '0 0 24px' }}>
              {feat.desc}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {feat.bullets.map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <TickCircle size={18} color={C.orange} variant="Bold" style={{ flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontFamily: F, fontSize: 14, color: C.gray700, lineHeight: 1.5 }}>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual mockup side */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {feat.mockup}
          </div>
        </div>
      </div>
    </section>
  )
}

/* mockup sub-components for FeatureShowcase */
function OrdersMockup() {
  const { C } = useContext(LandingThemeCtx)
  const rows = [
    { id: '#٢١٥', item: 'برجر دجاج × ٢',   status: 'جديد',     dot: C.orange },
    { id: '#٢١٤', item: 'بيتزا مارغريتا',   status: 'تحضير',    dot: '#EAB308' },
    { id: '#٢١٣', item: 'كفتة مشوية',        status: 'جاهز ✓',  dot: '#22C55E' },
    { id: '#٢١٢', item: 'شاورما دجاج',       status: 'توصيل 🛵', dot: '#3B82F6' },
  ]
  return (
    <div style={{ background: C_dark.gray50, borderRadius: 18, padding: 18, width: '100%', maxWidth: 360, boxShadow: '0 16px 48px rgba(0,0,0,.3)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <span style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,.8)' }}>الطلبات الحالية</span>
        <span style={{ background: C.orange, color: '#fff', fontFamily: F, fontSize: 11, fontWeight: 800, padding: '3px 10px', borderRadius: 20 }}>٤ جديد 🔔</span>
      </div>
      {rows.map((o, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,.06)' : 'none' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: o.dot, flexShrink: 0 }} />
            <div>
              <p style={{ fontFamily: F, color: '#fff', fontSize: 12, fontWeight: 700 }}>{o.item}</p>
              <p style={{ fontFamily: F, color: 'rgba(255,255,255,.4)', fontSize: 10 }}>{o.id}</p>
            </div>
          </div>
          <span style={{ fontFamily: F, background: `${o.dot}22`, color: o.dot, padding: '3px 10px', borderRadius: 20, fontSize: 10, fontWeight: 700 }}>{o.status}</span>
        </div>
      ))}
      <button style={{ marginTop: 12, width: '100%', padding: '9px', borderRadius: 10, background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.12)', color: 'rgba(255,255,255,.65)', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: F }}>
        + إنشاء طلب يدوي
      </button>
    </div>
  )
}

function BrandMockup() {
  const { C } = useContext(LandingThemeCtx)
  const colors = ['#F97316','#EF4444','#8B5CF6','#3B82F6','#10B981','#F59E0B']
  const [sel, setSel] = useState(0)
  return (
    <div style={{ background: C.white, border: `1.5px solid ${C.gray200}`, borderRadius: 18, padding: 20, width: '100%', maxWidth: 340, boxShadow: '0 8px 32px rgba(0,0,0,.08)' }}>
      <p style={{ fontFamily: F, fontWeight: 700, fontSize: 13, color: C.navy, marginBottom: 12 }}>لون مطعمك</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {colors.map((col, i) => (
          <button key={i} onClick={() => setSel(i)} style={{
            width: 28, height: 28, borderRadius: '50%', background: col, border: sel === i ? `3px solid ${C.navy}` : '3px solid transparent',
            cursor: 'pointer', outline: 'none', transition: 'transform .15s',
            transform: sel === i ? 'scale(1.2)' : 'scale(1)',
          }} />
        ))}
      </div>
      <div style={{ borderRadius: 14, overflow: 'hidden', border: `1.5px solid ${C.gray200}` }}>
        <div style={{ background: colors[sel], padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(255,255,255,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🍖</div>
          <span style={{ fontFamily: F, fontWeight: 800, color: '#fff', fontSize: 14 }}>مطعم الشيف أحمد</span>
        </div>
        <div style={{ background: C.white, padding: '12px 16px' }}>
          <p style={{ fontFamily: F, fontSize: 12, color: C.gray600, marginBottom: 8 }}>اطلب الآن من قائمتنا 🔥</p>
          <div style={{ background: colors[sel], borderRadius: 8, padding: '8px', textAlign: 'center' }}>
            <span style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: '#fff' }}>QR — اطبع وشارك</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function AnalyticsMockup() {
  const { C } = useContext(LandingThemeCtx)
  const bars = [60, 45, 80, 55, 90, 70, 95]
  const days = ['س','ح','ن','ث','ر','خ','ج']
  return (
    <div style={{ background: C_dark.gray50, borderRadius: 18, padding: 18, width: '100%', maxWidth: 360, boxShadow: '0 16px 48px rgba(0,0,0,.3)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,.8)' }}>المبيعات هذا الأسبوع</span>
        <span style={{ fontFamily: "'Zain',sans-serif", fontSize: 14, fontWeight: 800, color: C.orange }}>+١٤٪ ↑</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 80, marginBottom: 6 }}>
        {bars.map((h, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ width: '100%', height: `${h}%`, background: i === 6 ? C.orange : 'rgba(249,115,22,.3)', borderRadius: '4px 4px 0 0', transition: 'height .3s' }} />
            <span style={{ fontFamily: F, fontSize: 9, color: 'rgba(255,255,255,.4)' }}>{days[i]}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 14 }}>
        {[
          { label: 'الإيراد اليوم', val: '١٨٤٠ ج', up: true },
          { label: 'عدد الطلبات', val: '٣٢ طلب', up: true },
        ].map((s, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,.06)', borderRadius: 10, padding: '10px 12px' }}>
            <p style={{ fontFamily: F, fontSize: 10, color: 'rgba(255,255,255,.45)', marginBottom: 3 }}>{s.label}</p>
            <p style={{ fontFamily: "'Zain',sans-serif", fontSize: 15, fontWeight: 800, color: '#fff' }}>{s.val}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10, background: 'rgba(249,115,22,.12)', border: '1px solid rgba(249,115,22,.25)', borderRadius: 10, padding: '9px 12px', display: 'flex', gap: 8, alignItems: 'center' }}>
        <span style={{ fontSize: 14 }}>🤖</span>
        <p style={{ fontFamily: F, fontSize: 11, color: 'rgba(255,255,255,.75)', lineHeight: 1.4 }}>الأربعاء حجم الطلبات أعلى بـ٤٣٪ — استعد بمخزون إضافي</p>
      </div>
    </div>
  )
}

function LoyaltyMockup() {
  const { C } = useContext(LandingThemeCtx)
  const tiers = [
    { name: 'مبتدئ', pts: '٠', color: '#9CA3AF' },
    { name: 'فضي',   pts: '٥٠٠', color: '#94A3B8' },
    { name: 'ذهبي',  pts: '١٥٠٠', color: '#F59E0B' },
    { name: 'بلاتيني', pts: '٣٠٠٠', color: '#A78BFA' },
  ]
  return (
    <div style={{ background: C.white, border: `1.5px solid ${C.gray200}`, borderRadius: 18, padding: 18, width: '100%', maxWidth: 340, boxShadow: '0 8px 32px rgba(0,0,0,.08)' }}>
      <div style={{ background: C_dark.gray50, borderRadius: 14, padding: '14px 16px', marginBottom: 16 }}>
        <p style={{ fontFamily: F, fontSize: 11, color: 'rgba(255,255,255,.5)', marginBottom: 2 }}>رصيد نقاطك</p>
        <p style={{ fontFamily: "'Zain',sans-serif", fontSize: 32, fontWeight: 900, color: C.orange, lineHeight: 1 }}>٣٤٠ نقطة</p>
        <p style={{ fontFamily: F, fontSize: 11, color: 'rgba(255,255,255,.45)', marginTop: 4 }}>١٦٠ نقطة للمرحلة الفضية 🥈</p>
        <div style={{ marginTop: 8, background: 'rgba(255,255,255,.1)', borderRadius: 4, height: 6 }}>
          <div style={{ width: '68%', height: '100%', background: C.orange, borderRadius: 4 }} />
        </div>
      </div>
      <p style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: C.navy, marginBottom: 10 }}>مراحل الولاء</p>
      <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
        {tiers.map((t, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', padding: '7px 4px', borderRadius: 10, background: i === 0 ? C.orangeLight : C.gray100, border: i === 0 ? `1.5px solid ${C.orangeBorder}` : `1px solid ${C.gray200}` }}>
            <p style={{ fontSize: 14, marginBottom: 2 }}>{i === 0 ? '🌱' : i === 1 ? '🥈' : i === 2 ? '🥇' : '💎'}</p>
            <p style={{ fontFamily: F, fontSize: 9, fontWeight: 700, color: i === 0 ? C.orange : C.gray600 }}>{t.name}</p>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: F, fontSize: 12, fontWeight: 700, color: C.navy, marginBottom: 8 }}>مكافآت متاحة</p>
      <div style={{ display: 'flex', gap: 8 }}>
        {[{ icon: '🎁', label: 'خصم ١٠٪' }, { icon: '🚚', label: 'شحن مجاني' }].map((r, i) => (
          <div key={i} style={{ flex: 1, background: C.greenLight, border: `1px solid rgba(22,163,74,.2)`, borderRadius: 10, padding: '8px', textAlign: 'center' }}>
            <p style={{ fontSize: 16, marginBottom: 3 }}>{r.icon}</p>
            <p style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: C.green }}>{r.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function TeamMockup() {
  const { C } = useContext(LandingThemeCtx)
  const staff = [
    { name: 'أحمد محمد',  role: 'مدير',   status: 'متاح', color: C.orange },
    { name: 'سارة خالد',   role: 'كاشير',  status: 'متاح', color: '#3B82F6' },
    { name: 'محمود علي',   role: 'مطبخ',   status: 'في الشيفت', color: '#22C55E' },
    { name: 'نور حسن',     role: 'توصيل',  status: 'في الطريق', color: '#EAB308' },
  ]
  return (
    <div style={{ background: C.white, border: `1.5px solid ${C.gray200}`, borderRadius: 18, padding: 18, width: '100%', maxWidth: 340, boxShadow: '0 8px 32px rgba(0,0,0,.08)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <p style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.navy }}>الفريق</p>
        <span style={{ fontFamily: F, fontSize: 11, fontWeight: 700, color: C.orange, background: C.orangeLight, padding: '3px 10px', borderRadius: 20 }}>٤ موظفين</span>
      </div>
      {staff.map((s, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: i < 3 ? `1px solid ${C.gray200}` : 'none' }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: s.color + '20', border: `1.5px solid ${s.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F, fontWeight: 800, fontSize: 14, color: s.color, flexShrink: 0 }}>{s.name[0]}</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.navy }}>{s.name}</p>
            <p style={{ fontFamily: F, fontSize: 11, color: C.gray600 }}>{s.role}</p>
          </div>
          <span style={{ fontFamily: F, fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 8, background: s.color + '18', color: s.color }}>{s.status}</span>
        </div>
      ))}
      <button style={{ marginTop: 12, width: '100%', padding: '9px', borderRadius: 10, background: C.orangeLight, border: `1.5px solid ${C.orangeBorder}`, color: C.orange, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: F }}>
        + إضافة موظف
      </button>
    </div>
  )
}

/* ─── How It Works ───────────────────────────────────────────── */
function HowItWorks() {
  const { C } = useContext(LandingThemeCtx)
  const navigate = useNavigate()
  const steps = [
    { num: '١', icon: '🎉', title: 'اشترك مجاناً', desc: 'اعمل حسابك في دقيقتين — اسم مطعمك وبياناتك الأساسية وتبدأ فوراً بدون أي تنزيل أو تثبيت' },
    { num: '٢', icon: '🎨', title: 'خصّص موقعك', desc: 'أضف قائمتك باللون والصورة والسعر، واختار هوية مطعمك — الألوان، اللوجو، وطريقة العرض' },
    { num: '٣', icon: '📲', title: 'شارك QR Code', desc: 'اطبع الكود على المناشير والمنيو — وابدأ تستقبل طلبات ودفع مباشرة في جيبك' },
  ]
  return (
    <section id="how" dir="rtl" style={{ padding: 'clamp(64px,8vw,100px) clamp(16px,6vw,80px)', background: C.gray50, borderTop: `1.5px solid ${C.gray200}` }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="fazz-section-badge" style={{ marginBottom: 16 }}>⚡ كيف يعمل</div>
          <h2 style={{ fontFamily: F, fontWeight: 900, fontSize: 'clamp(26px,4vw,44px)', color: C.navy, letterSpacing: '-0.5px', margin: '0 0 12px' }}>
            ٣ خطوات — وأنت أون لاين
          </h2>
          <p style={{ fontFamily: F, fontSize: 16, color: C.gray600 }}>بدون تعقيد ولا تدريب مطوّل — Fazz مصمم عشان تشتغل بيه من أول يوم</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 24, position: 'relative' }}>
          {steps.map((s, i) => (
            <div key={i} style={{ position: 'relative' }}>
              {i < steps.length - 1 && (
                <div style={{ position: 'absolute', top: 32, left: '-12%', width: '24%', height: 2, background: `linear-gradient(90deg, ${C.orangeBorder}, transparent)`, zIndex: 0 }} />
              )}
              <div className="fazz-card" style={{ padding: '32px 28px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: C.orange, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Zain', sans-serif", fontWeight: 900, fontSize: 22, margin: '0 auto 18px', boxShadow: `0 8px 24px ${C.orangeBorder}` }}>{s.num}</div>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{s.icon}</div>
                <h3 style={{ fontFamily: F, fontWeight: 800, fontSize: 19, color: C.navy, margin: '0 0 10px' }}>{s.title}</h3>
                <p style={{ fontFamily: F, fontSize: 14, color: C.gray600, lineHeight: 1.8, margin: 0 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 44 }}>
          <button className="fazz-btn-primary" onClick={() => navigate('/login')} style={{ fontSize: 16, padding: '15px 40px' }}>ابدأ مجاناً دلوقتي</button>
        </div>
      </div>
    </section>
  )
}

/* ─── Restaurant Slider ──────────────────────────────────────── */
function RestaurantSlider() {
  const { C } = useContext(LandingThemeCtx)
  const restaurants = [
    { name: 'مطعم الشيف أحمد',  cat: 'مشويات',        emoji: '🍖', city: 'التجمع الخامس', joined: 'منذ ٦ أشهر' },
    { name: 'بيتزا بلازا',       cat: 'بيتزا',          emoji: '🍕', city: 'مدينة نصر',     joined: 'منذ ٣ أشهر' },
    { name: 'كافيه ميترو',       cat: 'كافيه',          emoji: '☕', city: 'وسط البلد',     joined: 'منذ ٨ أشهر' },
    { name: 'شاورما كينج',       cat: 'مشويات',        emoji: '🌯', city: 'المعادي',       joined: 'منذ سنة'    },
    { name: 'سوشي هاوس',         cat: 'سوشي',          emoji: '🍣', city: 'الزمالك',       joined: 'منذ ٢ شهر'  },
    { name: 'برجر فاكتوري',      cat: 'برجر',           emoji: '🍔', city: 'الدقي',         joined: 'منذ ٥ أشهر' },
    { name: 'مطعم الفلاح',       cat: 'أكل بيتي',      emoji: '🍲', city: 'شبرا',          joined: 'منذ سنة'    },
    { name: 'سيفود بلاس',        cat: 'مأكولات بحرية',emoji: '🦞', city: 'الإسكندرية',   joined: 'منذ ٤ أشهر' },
    { name: 'كنافة الشام',       cat: 'حلويات',        emoji: '🍯', city: 'عابدين',        joined: 'منذ ٧ أشهر' },
    { name: 'مطعم سلامة',        cat: 'مصري',          emoji: '🥘', city: 'بولاق',         joined: 'منذ ١١ شهر' },
    { name: 'توست هاوس',         cat: 'إفطار',          emoji: '🥐', city: 'المهندسين',     joined: 'منذ ٣ أشهر' },
    { name: 'حلويات النيل',      cat: 'حلويات',        emoji: '🎂', city: 'أسيوط',         joined: 'منذ ٢ شهر'  },
    { name: 'مطعم كبابجي',       cat: 'مشويات',        emoji: '🥩', city: 'مصر الجديدة',  joined: 'منذ ١٠ أشهر'},
    { name: 'ليمون ودجاج',       cat: 'دجاج',          emoji: '🍗', city: 'الشروق',        joined: 'منذ شهر'    },
    { name: 'بيت الكشري',        cat: 'مصري',          emoji: '🫙', city: 'الجيزة',        joined: 'منذ ٦ أشهر' },
    { name: 'فطير مشلتيت',       cat: 'فطير',          emoji: '🥞', city: 'طنطا',          joined: 'منذ ٤ أشهر' },
  ]
  return (
    <section style={{ padding: 'clamp(64px,8vw,100px) 0', background: C.gray50, borderTop: `1.5px solid ${C.gray200}`, overflow: 'hidden' }}>

      {/* Header */}
      <div dir="rtl" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(16px,6vw,80px)', marginBottom: 48, textAlign: 'center' }}>
        <div className="fazz-section-badge" style={{ marginBottom: 16 }}>🏪 مجتمعنا</div>
        <h2 style={{ fontFamily: F, fontWeight: 900, fontSize: 'clamp(26px,4vw,44px)', color: C.navy, letterSpacing: '-0.5px', margin: '0 0 12px' }}>مطاعم انضمت لـ Fazz</h2>
        <p style={{ fontFamily: F, fontSize: 16, color: C.gray600, maxWidth: 480, margin: '0 auto' }}>+٥٠٠ مطعم من كل مصر بيستخدموا Fazz كل يوم — وبيوفّروا عمولتهم</p>
      </div>

      {/* Single seamless row */}
      <div style={{ position: 'relative', overflow: 'hidden', padding: '6px 0' }}>
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, background: `linear-gradient(to left,${C.gray50},transparent)`, zIndex: 10, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, background: `linear-gradient(to right,${C.gray50},transparent)`, zIndex: 10, pointerEvents: 'none' }} />
        <div style={{
          display: 'flex', flexWrap: 'nowrap', width: 'max-content',
          animation: 'mq-scroll 40s linear infinite',
          willChange: 'transform',
        }}
          onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
          onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
        >
          {[...restaurants, ...restaurants, ...restaurants, ...restaurants].map((r, i) => <RestCard key={i} r={r} C={C} />)}
        </div>
      </div>

      {/* Stats bar */}
      <div dir="rtl" style={{ maxWidth: 1100, margin: '44px auto 0', padding: '0 clamp(16px,6vw,80px)' }}>
        <div style={{ display: 'flex', gap: 0, background: C.white, border: `1.5px solid ${C.gray200}`, borderRadius: 20, overflow: 'hidden', flexWrap: 'wrap' }}>
          {[
            { val: '+٥٠٠', label: 'مطعم مسجل', icon: '🏪' },
            { val: '+١٥', label: 'محافظة مصرية', icon: '📍' },
            { val: '+١٢٠٠٠', label: 'طلب يومي', icon: '🛵' },
            { val: '٩٨٪', label: 'نسبة الرضا', icon: '⭐' },
          ].map((s, i) => (
            <div key={i} style={{ flex: '1 1 140px', padding: '24px 20px', textAlign: 'center', borderLeft: i > 0 ? `1px solid ${C.gray200}` : 'none' }}>
              <p style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</p>
              <p style={{ fontFamily: "'Zain',sans-serif", fontWeight: 900, fontSize: 30, color: C.orange, marginBottom: 4, lineHeight: 1 }}>{s.val}</p>
              <p style={{ fontFamily: F, fontSize: 13, color: C.gray600 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function RestCard({ r, C }) {
  return (
    <div className="rest-card" style={{ background: C.white, border: `1.5px solid ${C.gray200}`, borderRadius: 16, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0, width: 230, marginRight: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'border-color .2s,box-shadow .2s', cursor: 'default' }}>
      <div style={{ width: 46, height: 46, borderRadius: 13, flexShrink: 0, background: C.orangeLight, border: `1.5px solid ${C.orangeBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{r.emoji}</div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <p style={{ fontFamily: F, fontWeight: 800, fontSize: 13, color: C.navy, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</p>
        <p style={{ fontFamily: F, fontSize: 11, color: C.gray600, whiteSpace: 'nowrap' }}>{r.cat} · {r.city}</p>
        <p style={{ fontFamily: F, fontSize: 10, color: C.orange, fontWeight: 700, marginTop: 3 }}>✓ انضم {r.joined}</p>
      </div>
    </div>
  )
}

/* ─── Pricing ────────────────────────────────────────────────── */
function Pricing() {
  const { C } = useContext(LandingThemeCtx)
  const navigate = useNavigate()
  const [annual, setAnnual] = useState(false)

  const plans = [
    {
      name: 'المجاني',
      monthlyPrice: 0,
      badge: null, featured: false,
      desc: 'ابدأ وجرّب بدون أي التزام',
      cta: 'ابدأ مجاناً',
      features: ['قائمة رقمية كاملة','حتى ٣٠ طلب يومياً','QR Code قابل للطباعة','صفحة مطعم جاهزة','دعم بريد إلكتروني'],
    },
    {
      name: 'Pro',
      monthlyPrice: 500,
      badge: 'الأكثر شيوعاً', featured: true,
      desc: 'لمطعم شغال وعايز ينمو ويبقى مستقل',
      cta: 'ابدأ الـ Pro',
      features: ['طلبات غير محدودة — صفر عمولة','ماركتبليس Fazz الموحد','برنامج ولاء متكامل للزبائن','تقارير مبيعات + رؤى AI','إشعارات واتساب للزبائن','إدارة فريق العمل والفروع','دعم ٧ أيام / ٢٤ ساعة','دومين خاص بمطعمك','تخصيص كامل للهوية البصرية'],
    },
  ]

  return (
    <section id="pricing" dir="rtl" style={{ padding: 'clamp(64px,8vw,100px) clamp(16px,6vw,80px)', background: C.white, borderTop: `1.5px solid ${C.gray200}` }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="fazz-section-badge" style={{ marginBottom: 16 }}>💰 الأسعار</div>
          <h2 style={{ fontFamily: F, fontWeight: 900, fontSize: 'clamp(26px,4vw,44px)', color: C.navy, letterSpacing: '-0.5px', margin: '0 0 12px' }}>
            سعر واضح. بدون مفاجآت.
          </h2>
          <p style={{ fontFamily: F, fontSize: 16, color: C.gray600, marginBottom: 28 }}>ابدأ مجاناً — ادفع بالجنيه المصري — ألغي امتى ما تحب</p>

          {/* Billing toggle */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: C.gray100, borderRadius: 999, padding: '4px 6px', border: `1.5px solid ${C.gray200}` }}>
            <button onClick={() => setAnnual(false)} style={{ padding: '7px 18px', borderRadius: 999, border: 'none', cursor: 'pointer', fontFamily: F, fontSize: 13, fontWeight: 700, background: !annual ? C.white : 'transparent', color: !annual ? C.navy : C.gray600, boxShadow: !annual ? '0 2px 8px rgba(0,0,0,.08)' : 'none', transition: 'all .18s' }}>شهري</button>
            <button onClick={() => setAnnual(true)} style={{ padding: '7px 18px', borderRadius: 999, border: 'none', cursor: 'pointer', fontFamily: F, fontSize: 13, fontWeight: 700, background: annual ? C.white : 'transparent', color: annual ? C.navy : C.gray600, boxShadow: annual ? '0 2px 8px rgba(0,0,0,.08)' : 'none', transition: 'all .18s', display: 'flex', alignItems: 'center', gap: 7 }}>
              سنوي
              <span style={{ background: C.green, color: '#fff', fontSize: 10, fontWeight: 800, padding: '2px 7px', borderRadius: 20 }}>وفّر ٢٠٪</span>
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'stretch' }}>
          {plans.map((p, i) => {
            const price = annual && p.monthlyPrice > 0 ? Math.round(p.monthlyPrice * 0.8) : p.monthlyPrice
            return (
              <div key={i} style={{
                flex: '1 1 300px', maxWidth: 400,
                background: p.featured ? C_dark.gray50 : C.white,
                border: p.featured ? `2.5px solid ${C.orange}` : `1.5px solid ${C.gray200}`,
                borderRadius: 20, padding: '36px 32px', position: 'relative',
                boxShadow: p.featured ? `0 20px 48px rgba(26,26,46,.2)` : 'none',
                transition: 'transform .2s', display: 'flex', flexDirection: 'column',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {p.badge && (
                  <div style={{ position: 'absolute', top: -14, right: 28, background: C.orange, borderRadius: 999, padding: '4px 18px', fontFamily: F, fontSize: 12, fontWeight: 800, color: '#fff' }}>{p.badge}</div>
                )}
                <h3 style={{ fontFamily: F, fontWeight: 800, fontSize: 20, color: p.featured ? '#fff' : C.navy, margin: '0 0 4px' }}>{p.name}</h3>
                <p style={{ fontFamily: F, fontSize: 13, color: p.featured ? 'rgba(255,255,255,.6)' : C.gray600, margin: '0 0 22px' }}>{p.desc}</p>
                <div style={{ margin: '0 0 28px' }}>
                  {price === 0
                    ? <span style={{ fontFamily: F, fontWeight: 900, fontSize: 40, color: p.featured ? '#fff' : C.navy }}>مجاني</span>
                    : <div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                          <span style={{ fontFamily: "'Zain',sans-serif", fontWeight: 900, fontSize: 46, color: C.orange }}>{price}</span>
                          <span style={{ fontFamily: F, fontSize: 16, color: p.featured ? 'rgba(255,255,255,.7)' : C.gray600 }}>ج / شهر</span>
                        </div>
                      </div>
                  }
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1, paddingBottom: 28 }}>
                  {p.features.map((f, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <TickCircle size={19} color={p.featured ? C.orange : C.green} variant="Bold" style={{ flexShrink: 0 }} />
                      <span style={{ fontFamily: F, fontSize: 14, color: p.featured ? 'rgba(255,255,255,.82)' : C.gray700 }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button className={p.featured ? 'fazz-btn-primary' : 'fazz-btn-outline'} onClick={() => navigate('/login')} style={{ width: '100%', justifyContent: 'center', fontSize: 15, padding: '14px', marginTop: 'auto' }}>
                  {p.cta}
                </button>
              </div>
            )
          })}
        </div>
        <p style={{ fontFamily: F, fontSize: 13, color: C.gray600, textAlign: 'center', marginTop: 28 }}>
          ✓ بدون رسوم خفية &nbsp;•&nbsp; ✓ إلغاء في أي وقت &nbsp;•&nbsp; ✓ الدفع بفوري أو فودافون كاش أو InstaPay
        </p>
      </div>
    </section>
  )
}

/* ─── Testimonials ───────────────────────────────────────────── */
function Testimonials() {
  const { C } = useContext(LandingThemeCtx)
  const [active, setActive] = useState(0)
  const testimonials = [
    { quote: 'من أول ما اشتركت في Fazz بطلت أدفع ٢٠٪ عمولة. في أول شهر وفّرت أكتر من ١٥٠٠ جنيه. الموقع سهل جداً وعملائي بيحبوا يطلبوا منه.', name: 'محمد الغزالي', restaurant: 'مطعم كبابجي مدينة نصر', stars: 5 },
    { quote: 'كنت خايفة إن الإعداد يكون معقد. في ساعة واحدة مطعمي كان أون لاين. دلوقتي QR Code على كل طاولة وعملائي بيطلبوا من موبايلهم.', name: 'نرمين حسن', restaurant: 'كافيه ويف — الإسكندرية', stars: 5 },
    { quote: 'عندي ٣ فروع وFazz بيخليني أتابعهم كلهم من شاشة واحدة. التقارير اليومية واضحة والأرباح بيّنة. أنصح أي صاحب مطعم يجرب.', name: 'كريم وهبي', restaurant: 'سلسلة شاورما كروز', stars: 5 },
    { quote: 'برنامج الولاء غيّر كل حاجة. زبائني الثابتين بقوا يطلبوا أكتر عشان يكسبوا النقاط. المبيعات زادت ١٨٪ في شهرين بس.', name: 'هند السيد', restaurant: 'مطعم هند للمأكولات الشعبية', stars: 5 },
  ]
  const prev = () => setActive(a => (a - 1 + testimonials.length) % testimonials.length)
  const next = () => setActive(a => (a + 1) % testimonials.length)
  return (
    <section dir="rtl" style={{ padding: 'clamp(64px,8vw,100px) clamp(16px,6vw,80px)', background: C.white, borderTop: `1.5px solid ${C.gray200}` }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="fazz-section-badge" style={{ marginBottom: 16 }}>⭐ آراء العملاء</div>
          <h2 style={{ fontFamily: F, fontWeight: 900, fontSize: 'clamp(26px,4vw,44px)', color: C.navy, letterSpacing: '-0.5px', margin: '0 0 12px' }}>مطاعم بتثق في Fazz</h2>
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ background: C.gray50, border: `1.5px solid ${C.gray200}`, borderRadius: 20, padding: 'clamp(28px,5vw,48px)', minHeight: 260 }}>
            <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
              {Array.from({ length: testimonials[active].stars }).map((_, i) => <Star1 key={i} size={20} color="#FBBF24" variant="Bold" />)}
            </div>
            <p style={{ fontFamily: F, fontSize: 'clamp(15px,2vw,18px)', fontWeight: 500, color: C.gray700, lineHeight: 1.85, margin: '0 0 28px', borderRight: `4px solid ${C.orange}`, paddingRight: 16 }}>
              "{testimonials[active].quote}"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: `linear-gradient(135deg, ${C.orange}, ${C.orangeHov})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F, fontWeight: 900, fontSize: 20, color: '#fff', flexShrink: 0 }}>
                {testimonials[active].name[0]}
              </div>
              <div>
                <p style={{ fontFamily: F, fontWeight: 800, fontSize: 16, color: C.navy }}>{testimonials[active].name}</p>
                <p style={{ fontFamily: F, fontSize: 13, color: C.gray600 }}>{testimonials[active].restaurant}</p>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 24 }}>
            <button onClick={prev} style={{ width: 44, height: 44, borderRadius: '50%', background: C.white, border: `1.5px solid ${C.gray200}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'border-color .15s' }} onMouseEnter={e => e.currentTarget.style.borderColor = C.orange} onMouseLeave={e => e.currentTarget.style.borderColor = C.gray200}><ArrowRight2 size={20} color={C.navy} /></button>
            <div style={{ display: 'flex', gap: 8 }}>
              {testimonials.map((_, i) => <button key={i} onClick={() => setActive(i)} style={{ width: active === i ? 24 : 8, height: 8, borderRadius: 4, background: active === i ? C.orange : C.gray200, border: 'none', cursor: 'pointer', transition: 'width .25s,background .25s', padding: 0 }} />)}
            </div>
            <button onClick={next} style={{ width: 44, height: 44, borderRadius: '50%', background: C.white, border: `1.5px solid ${C.gray200}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'border-color .15s' }} onMouseEnter={e => e.currentTarget.style.borderColor = C.orange} onMouseLeave={e => e.currentTarget.style.borderColor = C.gray200}><ArrowLeft2 size={20} color={C.navy} /></button>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 0, marginTop: 44, background: C_dark.gray50, borderRadius: 16, overflow: 'hidden', flexWrap: 'wrap' }}>
          {[{ val: '٤.٩ ★', label: 'متوسط التقييم' }, { val: '+٥٠٠', label: 'مطعم يستخدم Fazz' }, { val: '٩٨٪', label: 'نسبة الرضا' }].map((s, i) => (
            <div key={i} style={{ flex: '1 1 140px', padding: '24px 20px', textAlign: 'center', borderLeft: i > 0 ? '1px solid rgba(255,255,255,.1)' : 'none' }}>
              <p style={{ fontFamily: "'Zain',sans-serif", fontWeight: 900, fontSize: 30, color: C.orange, marginBottom: 4 }}>{s.val}</p>
              <p style={{ fontFamily: F, fontSize: 13, color: 'rgba(255,255,255,.65)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── FAQ ────────────────────────────────────────────────────── */
function FAQ() {
  const { C } = useContext(LandingThemeCtx)
  const [open, setOpen] = useState(null)
  const items = [
    { q: 'هل في عمولة على الطلبات من Fazz؟', a: 'لا خالص. Fazz مش بياخد أي عمولة على طلباتك. بتدفع اشتراك ثابت كل شهر بس — والباقي كله ليك أنت.' },
    { q: 'كيف يطلب زبائني من موقعي؟', a: 'بيمسحوا QR Code اللي بتطبعه أو بيدخلوا على رابط موقعك مباشرة من الموبايل. مش محتاجين يحملوا أي تطبيق.' },
    { q: 'ممكن أدير أكتر من فرع؟', a: 'آه. الـ Pro plan بيدعم فروع غير محدودة — كل فرع بلوحة بياناته الخاصة، مع مقارنة شاملة بين الفروع من شاشة واحدة.' },
    { q: 'هل محتاج خبرة تقنية عشان أبدأ؟', a: 'مش محتاج خالص. الإعداد الكامل بياخد أقل من ٣٠ دقيقة بدون أي كود ولا تصميم. لو احتجت مساعدة، فريق الدعم موجود ٧ أيام.' },
    { q: 'ممكن أغير تصميم موقعي وقائمتي في أي وقت؟', a: 'آه تماماً. بتغير الألوان، الصور، الأصناف، والأسعار لحظياً من لوحة التحكم — بدون ما تحتاج حد تاني.' },
    { q: 'إيه الفرق بين المجاني والـ Pro؟', a: 'المجاني كويس للبداية ولحد ٣٠ طلب يومياً. الـ Pro بيفتح طلبات غير محدودة، برنامج الولاء، تقارير AI، إدارة الفريق، والظهور في ماركتبليس Fazz.' },
  ]
  return (
    <section dir="rtl" style={{ padding: 'clamp(64px,8vw,100px) clamp(16px,6vw,80px)', background: C.gray50, borderTop: `1.5px solid ${C.gray200}` }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div className="fazz-section-badge" style={{ marginBottom: 16 }}>❓ الأسئلة الشائعة</div>
          <h2 style={{ fontFamily: F, fontWeight: 900, fontSize: 'clamp(26px,4vw,44px)', color: C.navy, letterSpacing: '-0.5px', margin: '0 0 12px' }}>
            عندك سؤال؟
          </h2>
          <p style={{ fontFamily: F, fontSize: 16, color: C.gray600 }}>الإجابات السريعة على أكتر الأسئلة اللي بنسمعها</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={i} style={{ background: C.white, border: `1.5px solid ${isOpen ? C.orange : C.gray200}`, borderRadius: 16, overflow: 'hidden', transition: 'border-color .2s' }}>
                <button onClick={() => setOpen(isOpen ? null : i)} style={{
                  width: '100%', padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                  background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'right',
                }}>
                  <span style={{ fontFamily: F, fontSize: 15, fontWeight: 700, color: isOpen ? C.orange : C.navy }}>{item.q}</span>
                  <ArrowDown2 size={18} color={isOpen ? C.orange : C.gray600} style={{ flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform .2s' }} />
                </button>
                {isOpen && (
                  <div style={{ padding: '0 22px 18px', borderTop: `1px solid ${C.gray200}` }}>
                    <p style={{ fontFamily: F, fontSize: 14, color: C.gray700, lineHeight: 1.8, margin: '14px 0 0' }}>{item.a}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─── Final CTA ──────────────────────────────────────────────── */
function FinalCTA() {
  const { C } = useContext(LandingThemeCtx)
  const navigate = useNavigate()
  return (
    <section dir="rtl" style={{ padding: 'clamp(80px,10vw,120px) clamp(16px,6vw,80px)', background: C_dark.gray50, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-30%', right: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(249,115,22,.18) 0%,transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-20%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(249,115,22,.10) 0%,transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: C.orangeMid, border: `1.5px solid ${C.orangeBorder}`, borderRadius: 999, padding: '5px 18px', marginBottom: 24 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: C.orange, boxShadow: `0 0 8px ${C.orange}`, display: 'inline-block' }} />
          <span style={{ fontFamily: F, fontSize: 13, fontWeight: 700, color: C.orange }}>متاح دلوقتي — ابدأ في دقيقتين</span>
        </div>
        <h2 style={{ fontFamily: F, fontWeight: 900, fontSize: 'clamp(30px,5vw,58px)', color: '#fff', lineHeight: 1.2, letterSpacing: '-1px', margin: '0 0 16px' }}>جاهز تبدأ؟</h2>
        <p style={{ fontFamily: F, fontSize: 'clamp(15px,2vw,19px)', color: 'rgba(255,255,255,.7)', margin: '0 0 12px', lineHeight: 1.7 }}>١٤ يوم مجاناً — لا بطاقة بنكية — إلغاء في أي وقت</p>
        <p style={{ fontFamily: F, fontSize: 14, color: C.orange, fontWeight: 700, margin: '0 0 44px' }}>انضم لـ +٥٠٠ مطعم بيستخدموا Fazz كل يوم</p>
        <button className="fazz-btn-primary" onClick={() => navigate('/login')} style={{ fontSize: 18, padding: '18px 52px', boxShadow: '0 16px 48px rgba(249,115,22,.5)' }}>
          ابدأ دلوقتي — مجاناً
        </button>
        <div style={{ display: 'flex', gap: 28, justifyContent: 'center', marginTop: 28, flexWrap: 'wrap' }}>
          {['لا عمولة أبداً', 'QR Code فوري', 'إلغاء بنقرة', 'دعم عربي ٧ أيام'].map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <TickCircle size={16} color={C.orange} variant="Bold" />
              <span style={{ fontFamily: F, fontSize: 14, color: 'rgba(255,255,255,.75)', fontWeight: 600 }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── WhatsApp Float ─────────────────────────────────────────── */
function WhatsAppFloat() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <a href="https://wa.me/201000000000?text=مرحبا،%20أريد%20معرفة%20المزيد%20عن%20Fazz" target="_blank" rel="noopener noreferrer"
      style={{ position: 'fixed', bottom: 28, left: 24, zIndex: 200, width: 56, height: 56, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(37,211,102,.45)', textDecoration: 'none', transition: 'transform .2s,opacity .3s', opacity: show ? 1 : 0, transform: show ? 'scale(1)' : 'scale(0.7)', pointerEvents: show ? 'all' : 'none' }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  )
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function Landing() {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('c_theme') === 'dark')

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    localStorage.setItem('c_theme', next ? 'dark' : 'light')
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  const C = isDark ? C_dark : C_light

  useEffect(() => {
    document.title = 'Fazz فَذّ — امتلك مطعمك الرقمي بدون عمولة'
    window.scrollTo(0, 0)
  }, [])

  return (
    <LandingThemeCtx.Provider value={{ C, isDark, toggle }}>
      <GlobalStyles />
      <div dir="rtl" style={{ background: C.white, minHeight: '100vh', fontFamily: F, overflowX: 'hidden' }}>
        <Navbar />
        <Hero />
        <TrustBar />
        <PainSection />
        <FeatureShowcase />
        <HowItWorks />
        <RestaurantSlider />
        <Pricing />
        <Testimonials />
        <FAQ />
        <FinalCTA />
        <Footer />
        <WhatsAppFloat />
      </div>
    </LandingThemeCtx.Provider>
  )
}
