import { useNavigate } from 'react-router-dom'
import { ArrowLeft2 } from 'iconsax-react'

const F = "'Zain', sans-serif"
const ORANGE = '#E8572A'
const NAVY = '#1A1A2E'

export default function Privacy() {
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
            <span style={{ fontSize: 14 }}>🔒</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: ORANGE }}>سياسة الخصوصية</span>
          </div>
          <h1 style={{ fontSize: 'clamp(24px,3.5vw,40px)', fontWeight: 900, marginBottom: 12, lineHeight: 1.3 }}>سياسة الخصوصية</h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)' }}>آخر تحديث: مايو ٢٠٢٥</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: 'clamp(40px,5vw,64px) clamp(16px,6vw,40px)' }}>

        <Article title="١. المعلومات التي نجمعها">
          <p>عند استخدامك لمنصة Fazz، قد نجمع المعلومات التالية:</p>
          <ul>
            <li>المعلومات الشخصية: الاسم، رقم الهاتف، عنوان البريد الإلكتروني</li>
            <li>معلومات الطلبات: تاريخ الطلبات، العناوين، تفضيلاتك الغذائية</li>
            <li>البيانات التقنية: عنوان IP، نوع المتصفح، الجهاز المستخدم</li>
            <li>بيانات الاستخدام: الصفحات التي تزورها وكيفية تفاعلك مع المنصة</li>
          </ul>
        </Article>

        <Article title="٢. كيف نستخدم معلوماتك">
          <p>نستخدم المعلومات المجموعة للأغراض التالية:</p>
          <ul>
            <li>معالجة طلباتك وتأكيدها وتتبعها</li>
            <li>تحسين تجربتك على المنصة وتخصيص المحتوى</li>
            <li>إرسال إشعارات تتعلق بطلباتك وعروض المطاعم</li>
            <li>إدارة برنامج نقاط المكافآت</li>
            <li>التواصل معك للرد على استفساراتك وشكاواك</li>
          </ul>
        </Article>

        <Article title="٣. مشاركة المعلومات مع أطراف أخرى">
          <p>نحن لا نبيع معلوماتك الشخصية لأي طرف ثالث. قد نشارك بعض البيانات في الحالات التالية فقط:</p>
          <ul>
            <li><strong>المطاعم المشتركة:</strong> نشارك تفاصيل طلبك مع المطعم الذي تطلب منه لتنفيذ الطلب</li>
            <li><strong>متطلبات قانونية:</strong> عند الضرورة القانونية استجابةً لأوامر المحاكم أو السلطات المختصة</li>
            <li><strong>حماية الحقوق:</strong> لحماية حقوق Fazz أو حقوق المستخدمين عند الضرورة</li>
          </ul>
        </Article>

        <Article title="٤. أمان البيانات">
          <p>نتخذ تدابير تقنية وتنظيمية مناسبة لحماية بياناتك من الوصول غير المصرح به، بما في ذلك:</p>
          <ul>
            <li>تشفير البيانات أثناء النقل باستخدام بروتوكول HTTPS</li>
            <li>تخزين كلمات المرور بشكل مشفر</li>
            <li>تقييد الوصول الداخلي لبيانات المستخدمين على أساس الحاجة فقط</li>
          </ul>
        </Article>

        <Article title="٥. حقوقك">
          <p>يحق لك في أي وقت:</p>
          <ul>
            <li>الاطلاع على البيانات الشخصية التي نحتفظ بها عنك</li>
            <li>طلب تصحيح أي بيانات غير دقيقة</li>
            <li>طلب حذف حسابك وبياناتك الشخصية</li>
            <li>إلغاء الاشتراك في الرسائل التسويقية في أي وقت</li>
          </ul>
          <p style={{ marginTop: 12 }}>للاستفادة من هذه الحقوق، تواصل معنا على: <a href="mailto:hello@fazz.app" style={{ color: ORANGE, textDecoration: 'none', fontWeight: 700 }}>hello@fazz.app</a></p>
        </Article>

        <Article title="٦. ملفات تعريف الارتباط (Cookies)">
          <p>نستخدم ملفات تعريف الارتباط لتحسين تجربتك، بما في ذلك تذكر تفضيلاتك والحفاظ على جلسة تسجيل الدخول. يمكنك التحكم في ملفات تعريف الارتباط من خلال إعدادات متصفحك.</p>
        </Article>

        <Article title="٧. التعديلات على هذه السياسة">
          <p>قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنُعلمك بأي تغييرات جوهرية عبر إشعار واضح على المنصة أو عبر البريد الإلكتروني. استمرارك في استخدام المنصة بعد نشر التعديلات يُعدّ موافقةً على السياسة المُحدَّثة.</p>
        </Article>

        <Article title="٨. التواصل بشأن الخصوصية">
          <p>لأي استفسار أو شكوى تتعلق بخصوصية بياناتك، تواصل معنا:</p>
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
    <div style={{ marginBottom: 36, background: '#fff', borderRadius: 18, padding: '24px 24px 20px', border: '1.5px solid #E9ECEF' }}>
      <h2 style={{ fontSize: 17, fontWeight: 900, color: NAVY, marginBottom: 14 }}>{title}</h2>
      <div style={{ fontSize: 14, color: '#495057', lineHeight: 1.9 }}>
        {children}
      </div>
      <style>{`
        .fazz-article ul { padding-right: 20px; margin: 10px 0 0; }
        .fazz-article li { margin-bottom: 6px; }
      `}</style>
    </div>
  )
}
