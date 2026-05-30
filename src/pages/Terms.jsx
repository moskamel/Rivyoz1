import { useNavigate } from 'react-router-dom'
import { ArrowLeft2 } from 'iconsax-react'

const F = "'Zain', sans-serif"
const ORANGE = '#E8572A'
const NAVY = '#1A1A2E'

export default function Terms() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: '#F8F9FA', fontFamily: F, direction: 'rtl', color: NAVY }}>

      {/* Header */}
      <div style={{ background: '#fff', borderBottom: '1.5px solid #E9ECEF', padding: '0 clamp(16px,6vw,80px)', height: 64, display: 'flex', alignItems: 'center', gap: 16, position: 'sticky', top: 0, zIndex: 50 }}>
        <button
          onClick={() => navigate('/rivyo')}
          style={{ width: 38, height: 38, borderRadius: 999, background: '#F1F3F5', border: '1.5px solid #E9ECEF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          <ArrowLeft2 size={18} color={NAVY} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: ORANGE, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontWeight: 900, fontSize: 16, color: '#fff' }}>F</span>
          </div>
          <span style={{ fontWeight: 900, fontSize: 18, color: NAVY }}>Fazz</span>
        </div>
      </div>

      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2A2A45 100%)`, padding: 'clamp(48px,6vw,72px) clamp(16px,6vw,80px)', color: '#fff' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(232,87,42,0.2)', border: '1px solid rgba(232,87,42,0.4)', borderRadius: 20, padding: '5px 16px', marginBottom: 20 }}>
            <span style={{ fontSize: 14 }}>📋</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: ORANGE }}>شروط الاستخدام</span>
          </div>
          <h1 style={{ fontSize: 'clamp(24px,3.5vw,40px)', fontWeight: 900, marginBottom: 12, lineHeight: 1.3 }}>شروط الاستخدام</h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)' }}>آخر تحديث: مايو ٢٠٢٥</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: 'clamp(40px,5vw,64px) clamp(16px,6vw,40px)' }}>

        <div style={{ background: `${ORANGE}12`, border: `1.5px solid ${ORANGE}30`, borderRadius: 14, padding: '14px 18px', marginBottom: 32, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 20, flexShrink: 0 }}>ℹ️</span>
          <p style={{ fontSize: 13, color: '#495057', lineHeight: 1.8, margin: 0 }}>باستخدامك لمنصة Fazz فإنك توافق على هذه الشروط. إذا كنت لا توافق على أي من هذه الشروط، يُرجى التوقف عن استخدام المنصة.</p>
        </div>

        <Article title="١. تعريف الخدمة">
          <p>Fazz منصة رقمية تُتيح للمطاعم وأصحاب الأعمال الغذائية إنشاء متاجرهم الإلكترونية الخاصة وإدارة طلباتهم. تُقدِّم المنصة خدمات للطرفين:</p>
          <ul>
            <li><strong>أصحاب المطاعم (التجار):</strong> أدوات إدارة المتجر والطلبات والعملاء والتسويق</li>
            <li><strong>العملاء:</strong> تصفح قوائم الطعام وتقديم الطلبات وتتبعها</li>
          </ul>
        </Article>

        <Article title="٢. شروط التسجيل والحساب">
          <ul>
            <li>يجب أن يكون عمرك ١٨ سنة أو أكثر لإنشاء حساب تاجر</li>
            <li>يجب تقديم معلومات صحيحة ودقيقة عند التسجيل</li>
            <li>أنت مسؤول عن الحفاظ على سرية كلمة مرورك وأي نشاط يتم من خلال حسابك</li>
            <li>يُحظر إنشاء أكثر من حساب تاجر لنفس الشخص أو الجهة إلا بموافقة خطية من Fazz</li>
            <li>يحق لـ Fazz إيقاف أو إلغاء أي حساب يُخالف هذه الشروط</li>
          </ul>
        </Article>

        <Article title="٣. مسؤوليات التاجر">
          <p>بصفتك تاجراً على المنصة، تتعهد بما يلي:</p>
          <ul>
            <li>تقديم معلومات دقيقة عن منتجاتك وأسعارها ومكوناتها</li>
            <li>الالتزام بتنفيذ الطلبات المقبولة في الوقت المحدد</li>
            <li>الامتثال لجميع القوانين المحلية المتعلقة بسلامة الغذاء والتراخيص التجارية</li>
            <li>عدم نشر محتوى مضلل أو مخالف للقانون</li>
            <li>الحفاظ على خصوصية بيانات عملائك واستخدامها فقط لتنفيذ الطلبات</li>
          </ul>
        </Article>

        <Article title="٤. الأسعار والمدفوعات">
          <ul>
            <li>Fazz لا تفرض عمولة على المبيعات — أنت تحتفظ بكامل إيراداتك</li>
            <li>تُحدَّد رسوم الاشتراك في خطط الأسعار المعلنة على المنصة وقد تتغير مع إشعار مسبق</li>
            <li>الأسعار المعروضة لا تشمل ضريبة القيمة المضافة إلا إذا نُص على ذلك صراحةً</li>
            <li>في حالة الإلغاء خلال فترة التجربة المجانية لا يُستحق أي رسوم</li>
          </ul>
        </Article>

        <Article title="٥. الملكية الفكرية">
          <p>جميع حقوق الملكية الفكرية للمنصة — بما في ذلك التصميمات، الكود البرمجي، والعلامات التجارية — محفوظة لـ Fazz. يُمنح المستخدمون ترخيصاً محدوداً وغير حصري لاستخدام المنصة وفقاً لهذه الشروط.</p>
          <p style={{ marginTop: 12 }}>المحتوى الذي ترفعه (صور المنتجات، الأوصاف) يظل ملكك، وتمنح Fazz ترخيصاً لعرضه على المنصة.</p>
        </Article>

        <Article title="٦. حدود المسؤولية">
          <p>لا تتحمل Fazz المسؤولية عن:</p>
          <ul>
            <li>جودة الطعام أو صحته — هذه مسؤولية المطعم بالكامل</li>
            <li>تأخر التوصيل الناجم عن ظروف خارجة عن إرادتنا</li>
            <li>الأضرار غير المباشرة أو الخسائر التجارية الناجمة عن انقطاع الخدمة</li>
            <li>أي محتوى ينشره التجار على منصاتهم الخاصة</li>
          </ul>
        </Article>

        <Article title="٧. إنهاء الخدمة">
          <p>يحق لك إلغاء اشتراكك في أي وقت من خلال لوحة التحكم. يحق لـ Fazz إيقاف الخدمة عند:</p>
          <ul>
            <li>مخالفة هذه الشروط</li>
            <li>عدم سداد رسوم الاشتراك</li>
            <li>استخدام المنصة بطرق تضر بالمستخدمين الآخرين</li>
          </ul>
          <p style={{ marginTop: 12 }}>في حالة الإيقاف بسبب المخالفة، لا يحق المطالبة باسترداد الرسوم المدفوعة.</p>
        </Article>

        <Article title="٨. القانون الحاكم وتسوية النزاعات">
          <p>تخضع هذه الشروط لقوانين جمهورية مصر العربية. في حالة نشوء أي نزاع، يُسعى أولاً لحله بالتفاوض الودي. وإن تعذّر ذلك، تختص محاكم القاهرة بالفصل في النزاع.</p>
        </Article>

        <Article title="٩. التعديلات على الشروط">
          <p>تحتفظ Fazz بالحق في تعديل هذه الشروط في أي وقت. سيتم إشعارك بالتعديلات الجوهرية قبل ٣٠ يوماً على الأقل عبر البريد الإلكتروني أو إشعار على المنصة. استمرارك في الاستخدام بعد التعديل يُعدّ موافقةً ضمنية على الشروط الجديدة.</p>
        </Article>

        <Article title="١٠. التواصل">
          <p>لأي استفسار حول هذه الشروط:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
            <a href="mailto:hello@fazz.app" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: ORANGE, textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>📧 hello@fazz.app</a>
            <a href="https://wa.me/201000000000" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#25D366', textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>💬 واتساب مباشر</a>
          </div>
        </Article>

        <div style={{ textAlign: 'center', paddingTop: 32, borderTop: '1.5px solid #E9ECEF' }}>
          <button
            onClick={() => navigate('/rivyo')}
            style={{ padding: '13px 32px', borderRadius: 999, background: ORANGE, color: '#fff', fontWeight: 800, fontSize: 15, border: 'none', cursor: 'pointer', fontFamily: F }}
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    </div>
  )
}

function Article({ title, children }) {
  return (
    <div style={{ marginBottom: 20, background: '#fff', borderRadius: 18, padding: '24px 24px 20px', border: '1.5px solid #E9ECEF' }}>
      <h2 style={{ fontSize: 17, fontWeight: 900, color: NAVY, marginBottom: 14 }}>{title}</h2>
      <div style={{ fontSize: 14, color: '#495057', lineHeight: 1.9 }}>
        {children}
      </div>
    </div>
  )
}
