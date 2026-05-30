import { useContext } from 'react'
import { LandingPageWrapper, LandingThemeCtx, F } from './LandingShared'

function AboutContent() {
  const { C } = useContext(LandingThemeCtx)

  return (
    <div style={{ fontFamily: F, color: C.navy }}>

      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyLight} 100%)`,
        padding: 'clamp(56px,7vw,96px) clamp(16px,6vw,80px)',
        textAlign: 'center', color: '#fff',
      }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(232,87,42,0.2)', border: '1px solid rgba(232,87,42,0.4)', borderRadius: 20, padding: '5px 16px', marginBottom: 24 }}>
            <span style={{ fontSize: 14 }}>🚀</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.orange }}>عن منصة Fazz</span>
          </div>
          <h1 style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 900, marginBottom: 16, lineHeight: 1.25, fontFamily: F }}>
            نُمكّن المطاعم المصرية<br />من امتلاك وجودها الرقمي
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.78)', lineHeight: 1.9, maxWidth: 560, margin: '0 auto', fontFamily: F }}>
            Fazz منصة متكاملة تمنح كل مطعم متجره الإلكتروني الخاص بدون عمولة — بدءاً من قائمة الطعام وحتى تتبع الطلبات وإدارة العملاء
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: 'clamp(48px,6vw,72px) clamp(16px,6vw,40px)' }}>

        <Section C={C} title="مهمتنا" emoji="🎯">
          <p>نؤمن بأن كل مطعم — كبيراً كان أم صغيراً — يستحق أن يملك هويته الرقمية المستقلة بعيداً عن تطبيقات الوسطى التي تقتطع عمولات ضخمة من أرباحه. Fazz وُلدت لتضع السلطة في يد أصحاب المطاعم أنفسهم.</p>
        </Section>

        <Section C={C} title="قيمنا" emoji="💡">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginTop: 8 }}>
            {[
              { icon: '🤝', title: 'الشراكة الحقيقية', desc: 'نحن شركاء لمطاعمنا وليس مجرد مزود خدمة' },
              { icon: '⚡', title: 'البساطة أولاً',     desc: 'أدوات قوية تعمل بدون تعقيد أو تدريب مطوّل' },
              { icon: '🔒', title: 'الخصوصية والأمان', desc: 'بيانات عملائك ملكك أنت وحدك' },
              { icon: '📈', title: 'النمو المستدام',    desc: 'نساعدك على بناء قاعدة عملاء مستقلة' },
            ].map((v, i) => (
              <div key={i} style={{ background: C.white, borderRadius: 16, padding: '20px 18px', border: `1.5px solid ${C.gray200}` }}>
                <span style={{ fontSize: 28, display: 'block', marginBottom: 10 }}>{v.icon}</span>
                <p style={{ fontWeight: 800, fontSize: 15, color: C.navy, marginBottom: 6, fontFamily: F }}>{v.title}</p>
                <p style={{ fontSize: 13, color: C.gray600, lineHeight: 1.7, fontFamily: F }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section C={C} title="قصتنا" emoji="📖">
          <p>انطلقت Fazz من ملاحظة بسيطة: المطاعم المصرية تدفع عمولات ضخمة لتطبيقات التوصيل الكبرى مقابل الوصول إلى عملائها، بينما يظل العميل مرتبطاً بالتطبيق وليس بالمطعم نفسه.</p>
          <p style={{ marginTop: 14 }}>قررنا أن نبني حلاً مختلفاً — نظام طلبات رقمي متكامل يتيح لكل مطعم إنشاء متجره الخاص، إدارة قائمته، تتبع طلباته، ومكافأة عملائه المخلصين، كل ذلك تحت علامته التجارية هو.</p>
        </Section>

        <Section C={C} title="بالأرقام" emoji="📊">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, marginTop: 8 }}>
            {[
              { num: '500+', label: 'مطعم يثق بنا' },
              { num: '2M+',  label: 'طلب مُعالَج' },
              { num: '0%',   label: 'عمولة على المبيعات' },
              { num: '24/7', label: 'دعم فني متاح' },
            ].map((s, i) => (
              <div key={i} style={{ background: C.white, borderRadius: 16, padding: '24px 16px', textAlign: 'center', border: `1.5px solid ${C.gray200}` }}>
                <p style={{ fontSize: 32, fontWeight: 900, color: C.orange, marginBottom: 6, fontFamily: F }}>{s.num}</p>
                <p style={{ fontSize: 13, color: C.gray600, fontWeight: 600, fontFamily: F }}>{s.label}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section C={C} title="تواصل معنا" emoji="📬">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
            {[
              { icon: '📞', text: '٠١٠٠ ٠٠٠ ٠٠٠٠', href: 'tel:+201000000000' },
              { icon: '📧', text: 'hello@fazz.app',  href: 'mailto:hello@fazz.app' },
              { icon: '💬', text: 'واتساب مباشر',    href: 'https://wa.me/201000000000' },
            ].map((c, i) => (
              <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: C.white, borderRadius: 14, border: `1.5px solid ${C.gray200}`, textDecoration: 'none', color: C.navy, fontWeight: 600, fontSize: 14, fontFamily: F }}>
                <span style={{ fontSize: 20 }}>{c.icon}</span>
                {c.text}
              </a>
            ))}
          </div>
        </Section>
      </div>
    </div>
  )
}

function Section({ C, title, emoji, children }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <h2 style={{ fontSize: 22, fontWeight: 900, color: C.navy, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10, fontFamily: F }}>
        <span>{emoji}</span> {title}
      </h2>
      <div style={{ fontSize: 15, color: C.gray700, lineHeight: 1.9, fontFamily: F }}>
        {children}
      </div>
    </div>
  )
}

export default function About() {
  return (
    <LandingPageWrapper title="عن المنصة — Fazz فَذّ">
      <AboutContent />
    </LandingPageWrapper>
  )
}
