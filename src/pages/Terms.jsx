import { useContext } from 'react'
import { LandingPageWrapper, LandingThemeCtx, F } from './LandingShared'

function TermsContent() {
  const { C } = useContext(LandingThemeCtx)

  return (
    <div style={{ fontFamily: F, color: C.navy }}>

      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyLight} 100%)`,
        padding: 'clamp(56px,7vw,88px) clamp(16px,6vw,80px)',
        color: '#fff',
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(232,87,42,0.2)', border: '1px solid rgba(232,87,42,0.4)', borderRadius: 20, padding: '5px 16px', marginBottom: 20 }}>
            <span style={{ fontSize: 14 }}>📋</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.orange }}>شروط الاستخدام</span>
          </div>
          <h1 style={{ fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 900, marginBottom: 12, lineHeight: 1.3, fontFamily: F }}>شروط الاستخدام</h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', fontFamily: F }}>آخر تحديث: مايو ٢٠٢٥</p>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: 'clamp(48px,6vw,72px) clamp(16px,6vw,40px)' }}>

        <div style={{ background: C.orangeLight, border: `1.5px solid ${C.orangeBorder}`, borderRadius: 14, padding: '14px 18px', marginBottom: 36, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 20, flexShrink: 0 }}>ℹ️</span>
          <p style={{ fontSize: 14, color: C.gray700, lineHeight: 1.8, margin: 0, fontFamily: F }}>باستخدامك لمنصة Fazz فإنك توافق على هذه الشروط. إذا كنت لا توافق على أي من هذه الشروط، يُرجى التوقف عن استخدام المنصة.</p>
        </div>

        <Article C={C} title="١. تعريف الخدمة">
          <p>Fazz منصة رقمية تُتيح للمطاعم وأصحاب الأعمال الغذائية إنشاء متاجرهم الإلكترونية الخاصة وإدارة طلباتهم. تُقدِّم المنصة خدمات للطرفين:</p>
          <List C={C} items={[
            'أصحاب المطاعم (التجار): أدوات إدارة المتجر والطلبات والعملاء والتسويق',
            'العملاء: تصفح قوائم الطعام وتقديم الطلبات وتتبعها',
          ]} />
        </Article>

        <Article C={C} title="٢. شروط التسجيل والحساب">
          <List C={C} items={[
            'يجب أن يكون عمرك ١٨ سنة أو أكثر لإنشاء حساب تاجر',
            'يجب تقديم معلومات صحيحة ودقيقة عند التسجيل',
            'أنت مسؤول عن الحفاظ على سرية كلمة مرورك وأي نشاط يتم من خلال حسابك',
            'يُحظر إنشاء أكثر من حساب تاجر لنفس الشخص أو الجهة إلا بموافقة خطية من Fazz',
            'يحق لـ Fazz إيقاف أو إلغاء أي حساب يُخالف هذه الشروط',
          ]} />
        </Article>

        <Article C={C} title="٣. مسؤوليات التاجر">
          <p>بصفتك تاجراً على المنصة، تتعهد بما يلي:</p>
          <List C={C} items={[
            'تقديم معلومات دقيقة عن منتجاتك وأسعارها ومكوناتها',
            'الالتزام بتنفيذ الطلبات المقبولة في الوقت المحدد',
            'الامتثال لجميع القوانين المحلية المتعلقة بسلامة الغذاء والتراخيص التجارية',
            'عدم نشر محتوى مضلل أو مخالف للقانون',
            'الحفاظ على خصوصية بيانات عملائك واستخدامها فقط لتنفيذ الطلبات',
          ]} />
        </Article>

        <Article C={C} title="٤. الأسعار والمدفوعات">
          <List C={C} items={[
            'Fazz لا تفرض عمولة على المبيعات — أنت تحتفظ بكامل إيراداتك',
            'تُحدَّد رسوم الاشتراك في خطط الأسعار المعلنة على المنصة وقد تتغير مع إشعار مسبق',
            'الأسعار المعروضة لا تشمل ضريبة القيمة المضافة إلا إذا نُص على ذلك صراحةً',
            'في حالة الإلغاء خلال فترة التجربة المجانية لا يُستحق أي رسوم',
          ]} />
        </Article>

        <Article C={C} title="٥. الملكية الفكرية">
          <p>جميع حقوق الملكية الفكرية للمنصة — بما في ذلك التصميمات، الكود البرمجي، والعلامات التجارية — محفوظة لـ Fazz. يُمنح المستخدمون ترخيصاً محدوداً وغير حصري لاستخدام المنصة وفقاً لهذه الشروط.</p>
          <p style={{ marginTop: 12 }}>المحتوى الذي ترفعه (صور المنتجات، الأوصاف) يظل ملكك، وتمنح Fazz ترخيصاً لعرضه على المنصة.</p>
        </Article>

        <Article C={C} title="٦. حدود المسؤولية">
          <p>لا تتحمل Fazz المسؤولية عن:</p>
          <List C={C} items={[
            'جودة الطعام أو صحته — هذه مسؤولية المطعم بالكامل',
            'تأخر التوصيل الناجم عن ظروف خارجة عن إرادتنا',
            'الأضرار غير المباشرة أو الخسائر التجارية الناجمة عن انقطاع الخدمة',
            'أي محتوى ينشره التجار على منصاتهم الخاصة',
          ]} />
        </Article>

        <Article C={C} title="٧. إنهاء الخدمة">
          <p>يحق لك إلغاء اشتراكك في أي وقت من خلال لوحة التحكم. يحق لـ Fazz إيقاف الخدمة عند:</p>
          <List C={C} items={[
            'مخالفة هذه الشروط',
            'عدم سداد رسوم الاشتراك',
            'استخدام المنصة بطرق تضر بالمستخدمين الآخرين',
          ]} />
          <p style={{ marginTop: 12 }}>في حالة الإيقاف بسبب المخالفة، لا يحق المطالبة باسترداد الرسوم المدفوعة.</p>
        </Article>

        <Article C={C} title="٨. القانون الحاكم وتسوية النزاعات">
          <p>تخضع هذه الشروط لقوانين جمهورية مصر العربية. في حالة نشوء أي نزاع، يُسعى أولاً لحله بالتفاوض الودي. وإن تعذّر ذلك، تختص محاكم القاهرة بالفصل في النزاع.</p>
        </Article>

        <Article C={C} title="٩. التعديلات على الشروط">
          <p>تحتفظ Fazz بالحق في تعديل هذه الشروط في أي وقت. سيتم إشعارك بالتعديلات الجوهرية قبل ٣٠ يوماً على الأقل عبر البريد الإلكتروني أو إشعار على المنصة. استمرارك في الاستخدام بعد التعديل يُعدّ موافقةً ضمنية على الشروط الجديدة.</p>
        </Article>

        <Article C={C} title="١٠. التواصل">
          <p>لأي استفسار حول هذه الشروط:</p>
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

export default function Terms() {
  return (
    <LandingPageWrapper title="شروط الاستخدام — Fazz فَذّ">
      <TermsContent />
    </LandingPageWrapper>
  )
}
