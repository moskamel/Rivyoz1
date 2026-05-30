import { useNavigate } from 'react-router-dom'
import { ArrowLeft2 } from 'iconsax-react'

const F = "'Zain', sans-serif"
const ORANGE = '#E8572A'
const NAVY = '#1A1A2E'

export default function About() {
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
      <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #2A2A45 100%)`, padding: 'clamp(48px,6vw,80px) clamp(16px,6vw,80px)', textAlign: 'center', color: '#fff' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(232,87,42,0.2)', border: '1px solid rgba(232,87,42,0.4)', borderRadius: 20, padding: '5px 16px', marginBottom: 24 }}>
            <span style={{ fontSize: 14 }}>🚀</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: ORANGE }}>عن منصة Fazz</span>
          </div>
          <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, marginBottom: 16, lineHeight: 1.3 }}>
            نُمكّن المطاعم المصرية<br />من امتلاك وجودها الرقمي
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.78)', lineHeight: 1.9, maxWidth: 560, margin: '0 auto' }}>
            Fazz منصة متكاملة تمنح كل مطعم متجره الإلكتروني الخاص بدون عمولة — بدءاً من قائمة الطعام وحتى تتبع الطلبات وإدارة العملاء
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: 'clamp(40px,5vw,64px) clamp(16px,6vw,40px)' }}>

        {/* Mission */}
        <Section title="مهمتنا" emoji="🎯">
          <p>نؤمن بأن كل مطعم — كبيراً كان أم صغيراً — يستحق أن يملك هويته الرقمية المستقلة بعيداً عن تطبيقات الوسطى التي تقتطع عمولات ضخمة من أرباحه. Fazz وُلدت لتضع السلطة في يد أصحاب المطاعم أنفسهم.</p>
        </Section>

        {/* Values */}
        <Section title="قيمنا" emoji="💡">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginTop: 8 }}>
            {[
              { icon: '🤝', title: 'الشراكة الحقيقية', desc: 'نحن شركاء لمطاعمنا وليس مجرد مزود خدمة' },
              { icon: '⚡', title: 'البساطة أولاً', desc: 'أدوات قوية تعمل بدون تعقيد أو تدريب مطوّل' },
              { icon: '🔒', title: 'الخصوصية والأمان', desc: 'بيانات عملائك ملكك أنت وحدك' },
              { icon: '📈', title: 'النمو المستدام', desc: 'نساعدك على بناء قاعدة عملاء ولا تعتمد على تطبيق وسيط' },
            ].map((v, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 16, padding: '20px 18px', border: '1.5px solid #E9ECEF' }}>
                <span style={{ fontSize: 28, display: 'block', marginBottom: 10 }}>{v.icon}</span>
                <p style={{ fontWeight: 800, fontSize: 15, color: NAVY, marginBottom: 6 }}>{v.title}</p>
                <p style={{ fontSize: 13, color: '#6C757D', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Story */}
        <Section title="قصتنا" emoji="📖">
          <p>انطلقت Fazz من ملاحظة بسيطة: المطاعم المصرية تدفع عمولات ضخمة لتطبيقات التوصيل الكبرى مقابل الوصول إلى عملائها، بينما يظل العميل مرتبطاً بالتطبيق وليس بالمطعم نفسه.</p>
          <p style={{ marginTop: 14 }}>قررنا أن نبني حلاً مختلفاً — نظام طلبات رقمي متكامل يتيح لكل مطعم إنشاء متجره الخاص، إدارة قائمته، تتبع طلباته، ومكافأة عملائه المخلصين، كل ذلك تحت علامته التجارية هو.</p>
        </Section>

        {/* Numbers */}
        <Section title="بالأرقام" emoji="📊">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16, marginTop: 8 }}>
            {[
              { num: '500+', label: 'مطعم يثق بنا' },
              { num: '2M+', label: 'طلب مُعالَج' },
              { num: '0%', label: 'عمولة على المبيعات' },
              { num: '24/7', label: 'دعم فني متاح' },
            ].map((s, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 16, padding: '24px 16px', textAlign: 'center', border: '1.5px solid #E9ECEF' }}>
                <p style={{ fontSize: 32, fontWeight: 900, color: ORANGE, marginBottom: 6 }}>{s.num}</p>
                <p style={{ fontSize: 13, color: '#6C757D', fontWeight: 600 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Contact */}
        <Section title="تواصل معنا" emoji="📬">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
            {[
              { icon: '📞', text: '٠١٠٠ ٠٠٠ ٠٠٠٠', href: 'tel:+201000000000' },
              { icon: '📧', text: 'hello@fazz.app', href: 'mailto:hello@fazz.app' },
              { icon: '💬', text: 'واتساب مباشر', href: 'https://wa.me/201000000000' },
            ].map((c, i) => (
              <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: '#fff', borderRadius: 14, border: '1.5px solid #E9ECEF', textDecoration: 'none', color: NAVY, fontWeight: 600, fontSize: 14 }}>
                <span style={{ fontSize: 20 }}>{c.icon}</span>
                {c.text}
              </a>
            ))}
          </div>
        </Section>

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

function Section({ title, emoji, children }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ fontSize: 20, fontWeight: 900, color: NAVY, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>{emoji}</span> {title}
      </h2>
      <div style={{ fontSize: 14, color: '#495057', lineHeight: 1.9 }}>
        {children}
      </div>
    </div>
  )
}
