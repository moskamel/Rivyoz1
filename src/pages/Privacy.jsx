import { useContext } from 'react'
import { LandingPageWrapper, LandingThemeCtx, F } from './LandingShared'

function PrivacyContent() {
  const { C } = useContext(LandingThemeCtx)

  return (
    <div style={{ fontFamily: F, color: C.navy }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #1A1A2E 0%, #2A2A45 100%)',
        padding: 'clamp(56px,7vw,88px) clamp(16px,6vw,80px)',
        color: '#fff',
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(232,87,42,0.2)', border: '1px solid rgba(232,87,42,0.4)', borderRadius: 20, padding: '5px 16px', marginBottom: 20 }}>
            <span style={{ fontSize: 14 }}>🔒</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.orange }}>سياسة الخصوصية</span>
          </div>
          <h1 style={{ fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 900, marginBottom: 12, lineHeight: 1.3, fontFamily: F }}>سياسة الخصوصية</h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', fontFamily: F }}>آخر تحديث: مايو ٢٠٢٥</p>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: 'clamp(48px,6vw,72px) clamp(16px,6vw,40px)' }}>

        <div style={{ background: `${C.orangeLight}`, border: `1.5px solid ${C.orangeBorder}`, borderRadius: 14, padding: '14px 18px', marginBottom: 36, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 20, flexShrink: 0 }}>ℹ️</span>
          <p style={{ fontSize: 14, color: C.gray700, lineHeight: 1.8, margin: 0, fontFamily: F }}>باستخدامك لمنصة Fazz فإنك توافق على سياسة الخصوصية هذه. نحن ملتزمون بحماية خصوصيتك وبياناتك الشخصية.</p>
        </div>

        <Article C={C} title="١. المعلومات التي نجمعها">
          <p>عند استخدامك لمنصة Fazz، قد نجمع المعلومات التالية:</p>
          <List C={C} items={[
            'المعلومات الشخصية: الاسم، رقم الهاتف، عنوان البريد الإلكتروني',
            'معلومات الطلبات: تاريخ الطلبات، العناوين، تفضيلاتك الغذائية',
            'البيانات التقنية: عنوان IP، نوع المتصفح، الجهاز المستخدم',
            'بيانات الاستخدام: الصفحات التي تزورها وكيفية تفاعلك مع المنصة',
          ]} />
        </Article>

        <Article C={C} title="٢. كيف نستخدم معلوماتك">
          <p>نستخدم المعلومات المجموعة للأغراض التالية:</p>
          <List C={C} items={[
            'معالجة طلباتك وتأكيدها وتتبعها',
            'تحسين تجربتك على المنصة وتخصيص المحتوى',
            'إرسال إشعارات تتعلق بطلباتك وعروض المطاعم',
            'إدارة برنامج نقاط المكافآت',
            'التواصل معك للرد على استفساراتك وشكاواك',
          ]} />
        </Article>

        <Article C={C} title="٣. مشاركة المعلومات مع أطراف أخرى">
          <p>نحن لا نبيع معلوماتك الشخصية لأي طرف ثالث. قد نشارك بعض البيانات في الحالات التالية فقط:</p>
          <List C={C} items={[
            'المطاعم المشتركة: نشارك تفاصيل طلبك مع المطعم الذي تطلب منه لتنفيذ الطلب',
            'متطلبات قانونية: عند الضرورة القانونية استجابةً لأوامر المحاكم أو السلطات المختصة',
            'حماية الحقوق: لحماية حقوق Fazz أو حقوق المستخدمين عند الضرورة',
          ]} />
        </Article>

        <Article C={C} title="٤. أمان البيانات">
          <p>نتخذ تدابير تقنية وتنظيمية مناسبة لحماية بياناتك من الوصول غير المصرح به، بما في ذلك:</p>
          <List C={C} items={[
            'تشفير البيانات أثناء النقل باستخدام بروتوكول HTTPS',
            'تخزين كلمات المرور بشكل مشفر',
            'تقييد الوصول الداخلي لبيانات المستخدمين على أساس الحاجة فقط',
          ]} />
        </Article>

        <Article C={C} title="٥. حقوقك">
          <p>يحق لك في أي وقت:</p>
          <List C={C} items={[
            'الاطلاع على البيانات الشخصية التي نحتفظ بها عنك',
            'طلب تصحيح أي بيانات غير دقيقة',
            'طلب حذف حسابك وبياناتك الشخصية',
            'إلغاء الاشتراك في الرسائل التسويقية في أي وقت',
          ]} />
          <p style={{ marginTop: 14 }}>للاستفادة من هذه الحقوق، تواصل معنا على: <a href="mailto:hello@fazz.app" style={{ color: C.orange, textDecoration: 'none', fontWeight: 700 }}>hello@fazz.app</a></p>
        </Article>

        <Article C={C} title="٦. ملفات تعريف الارتباط (Cookies)">
          <p>نستخدم ملفات تعريف الارتباط لتحسين تجربتك، بما في ذلك تذكر تفضيلاتك والحفاظ على جلسة تسجيل الدخول. يمكنك التحكم في ملفات تعريف الارتباط من خلال إعدادات متصفحك.</p>
        </Article>

        <Article C={C} title="٧. التعديلات على هذه السياسة">
          <p>قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنُعلمك بأي تغييرات جوهرية عبر إشعار واضح على المنصة أو عبر البريد الإلكتروني. استمرارك في استخدام المنصة بعد نشر التعديلات يُعدّ موافقةً على السياسة المُحدَّثة.</p>
        </Article>

        <Article C={C} title="٨. التواصل بشأن الخصوصية">
          <p>لأي استفسار أو شكوى تتعلق بخصوصية بياناتك، تواصل معنا:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
            <a href="mailto:hello@fazz.app" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: C.orange, textDecoration: 'none', fontWeight: 700, fontSize: 14, fontFamily: F }}>📧 hello@fazz.app</a>
            <a href="https://wa.me/201000000000" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#25D366', textDecoration: 'none', fontWeight: 700, fontSize: 14, fontFamily: F }}>💬 واتساب مباشر</a>
          </div>
        </Article>
      </div>
    </div>
  )
}

function Article({ C, title, children }) {
  return (
    <div style={{ marginBottom: 20, background: C.white, borderRadius: 18, padding: '24px 24px 20px', border: `1.5px solid ${C.gray200}` }}>
      <h2 style={{ fontSize: 17, fontWeight: 900, color: C.navy, marginBottom: 14, fontFamily: F }}>{title}</h2>
      <div style={{ fontSize: 14, color: C.gray700, lineHeight: 1.9, fontFamily: F }}>
        {children}
      </div>
    </div>
  )
}

function List({ C, items }) {
  return (
    <ul style={{ paddingRight: 20, margin: '10px 0 0' }}>
      {items.map((item, i) => (
        <li key={i} style={{ marginBottom: 7, color: C.gray700, fontFamily: F }}>{item}</li>
      ))}
    </ul>
  )
}

export default function Privacy() {
  return (
    <LandingPageWrapper title="سياسة الخصوصية — Fazz فَذّ">
      <PrivacyContent />
    </LandingPageWrapper>
  )
}
