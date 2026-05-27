import { useState } from 'react'
import { Download, QrCode, Check, Store, Palette, Bike, CreditCard } from 'lucide-react'
import Layout from '../components/layout/Layout'
import { getConfig, setConfig } from '../lib/restaurantStore'

const tabs = [
  { label: 'المطعم',   icon: Store },
  { label: 'التصميم',  icon: Palette },
  { label: 'التوصيل',  icon: Bike },
  { label: 'QR Code',  icon: QrCode },
  { label: 'الاشتراك', icon: CreditCard },
]

function Toast({ message }) {
  return (
    <div style={{ position: 'fixed', bottom: 24, left: 24, zIndex: 50, background: 'var(--green)', color: 'white', padding: '10px 18px', borderRadius: 12, fontWeight: 600, fontSize: 13, boxShadow: '0 8px 24px rgba(34,197,94,0.3)' }}>
      {message}
    </div>
  )
}

function useToast() {
  const [toast, setToast] = useState(null)
  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2000)
  }
  return { toast, showToast }
}

const inputStyle = {
  width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--border)',
  background: 'var(--surface-2)', color: 'var(--text)', fontSize: 13, outline: 'none',
  fontFamily: 'Cairo, sans-serif', boxSizing: 'border-box', transition: 'border-color 0.15s',
}

function Field({ label, value, onChange, type = 'text' }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6 }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        style={inputStyle}
        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
        onBlur={e => e.target.style.borderColor = 'var(--border)'}
      />
    </div>
  )
}

function RestaurantTab() {
  const storedConfig = getConfig()
  const [form, setForm] = useState({
    name: storedConfig.name || 'مطعم الشيف أحمد',
    description: storedConfig.description || 'مطعم مشويات طازجة',
    address: storedConfig.address || 'التجمع الخامس، القاهرة',
    phone: storedConfig.phone || '01012345678',
    email: 'chef@email.com',
  })
  const { toast, showToast } = useToast()

  return (
    <div style={{ maxWidth: 480 }}>
      <div className="glass" style={{ padding: 20, marginBottom: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Field label="اسم المطعم" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <Field label="الوصف" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <Field label="العنوان" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
          <Field label="رقم الموبايل" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          <Field label="البريد الإلكتروني" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </div>
        <div style={{ marginTop: 20 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 10 }}>ساعات العمل</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { days: 'السبت – الخميس', from: '12:00', to: '23:00' },
              { days: 'الجمعة', from: '13:00', to: '00:00' },
            ].map((row, i) => (
              <div key={i} className="flex items-center gap-3" style={{ fontSize: 13 }}>
                <span style={{ width: 110, color: 'var(--text-2)', flexShrink: 0 }}>{row.days}</span>
                <span style={{ color: 'var(--text-3)' }}>من</span>
                <input type="time" defaultValue={row.from} style={{ ...inputStyle, width: 110, padding: '6px 10px' }} />
                <span style={{ color: 'var(--text-3)' }}>إلى</span>
                <input type="time" defaultValue={row.to} style={{ ...inputStyle, width: 110, padding: '6px 10px' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={() => { setConfig(form); showToast('تم الحفظ ✓') }}
        style={{ padding: '11px 28px', background: 'var(--accent)', color: 'white', borderRadius: 10, fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer' }}
      >
        حفظ التغييرات
      </button>
      {toast && <Toast message={toast} />}
    </div>
  )
}

function DesignTab() {
  const colors = ['#f97316', '#6366f1', '#22c55e', '#ec4899', '#1f2937']
  const [color, setColor] = useState(() => getConfig().color || '#f97316')
  const { toast, showToast } = useToast()

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div className="glass" style={{ padding: 20 }}>
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>اللون الرئيسي</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            {colors.map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                style={{ width: 32, height: 32, borderRadius: 8, background: c, border: 'none', cursor: 'pointer', transition: 'all 0.15s', transform: color === c ? 'scale(1.15)' : 'scale(1)', outline: color === c ? `2px solid var(--border-strong)` : 'none', outlineOffset: 2 }}
              />
            ))}
            <input type="color" value={color} onChange={e => setColor(e.target.value)} style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--border)', cursor: 'pointer', background: 'transparent', padding: 2 }} />
          </div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 10 }}>اللوجو</p>
          <div className="flex items-center gap-3">
            <div style={{ width: 56, height: 56, background: 'var(--surface-2)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, border: '1px solid var(--border)' }}>🍽️</div>
            <div className="flex gap-2">
              <button style={{ padding: '6px 12px', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12, fontWeight: 500, color: 'var(--text-2)', background: 'transparent', cursor: 'pointer' }}>تغيير</button>
              <button style={{ padding: '6px 12px', border: '1px solid var(--red-muted)', borderRadius: 8, fontSize: 12, fontWeight: 500, color: 'var(--red)', background: 'transparent', cursor: 'pointer' }}>حذف</button>
            </div>
          </div>
        </div>
        <button
          onClick={() => { setConfig({ color }); showToast('تم النشر ✓') }}
          style={{ padding: '11px 24px', background: 'var(--accent)', color: 'white', borderRadius: 10, fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer', width: '100%' }}
        >
          نشر التغييرات
        </button>
        {toast && <Toast message={toast} />}
      </div>

      <div className="glass" style={{ padding: 20 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>معاينة مباشرة</p>
        <div style={{ border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: 16, background: color }}>
            <p style={{ fontWeight: 700, fontSize: 16, color: 'white' }}>مطعم الشيف أحمد</p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>التجمع الخامس</p>
          </div>
          <div style={{ padding: 16, background: 'var(--surface-2)' }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-3)', marginBottom: 8, letterSpacing: '0.08em' }}>مشويات</p>
            {['كفتة مشوية — 85 ج', 'فراخ مشوية — 70 ج'].map(item => (
              <div key={item} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, paddingBottom: 8, borderBottom: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--text)' }}>{item.split(' — ')[0]}</span>
                <span style={{ fontWeight: 700, color }}>{item.split(' — ')[1]}</span>
              </div>
            ))}
          </div>
        </div>
        <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 10, textAlign: 'center' }}>منصة.com/مطعم-الشيف-أحمد</p>
      </div>
    </div>
  )
}

function Toggle({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      style={{ position: 'relative', width: 44, height: 24, borderRadius: 12, background: value ? 'var(--green)' : 'var(--surface-3)', border: 'none', cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0 }}
    >
      <span style={{ position: 'absolute', top: 4, width: 16, height: 16, background: 'white', borderRadius: '50%', transition: 'all 0.2s', right: value ? 4 : 'auto', left: value ? 'auto' : 4 }} />
    </button>
  )
}

function DeliveryTab() {
  const [opts, setOpts] = useState({ delivery: true, pickup: true, table: false })
  const toggle = (k) => setOpts(p => ({ ...p, [k]: !p[k] }))

  return (
    <div style={{ maxWidth: 480 }}>
      <div className="glass" style={{ padding: 20, marginBottom: 16 }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>خيارات الطلب</p>
        {[
          { key: 'delivery', label: 'توصيل (لديّ سواقين)' },
          { key: 'pickup', label: 'استلام من المطعم' },
          { key: 'table', label: 'طلب على الطاولة (QR طاولة)' },
        ].map(o => (
          <div key={o.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontSize: 13, color: 'var(--text)' }}>{o.label}</span>
            <Toggle value={opts[o.key]} onChange={() => toggle(o.key)} />
          </div>
        ))}
      </div>
      {opts.delivery && (
        <div className="glass" style={{ padding: 20, marginBottom: 16 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>إعدادات التوصيل</p>
          {[
            { label: 'رسوم التوصيل', placeholder: '15', unit: 'ج' },
            { label: 'الحد الأدنى للطلب', placeholder: '50', unit: 'ج' },
            { label: 'وقت التوصيل المتوقع', placeholder: '30', unit: 'دقيقة' },
          ].map(f => (
            <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <label style={{ flex: 1, fontSize: 13, color: 'var(--text-2)' }}>{f.label}</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="number" defaultValue={f.placeholder} style={{ ...inputStyle, width: 70, textAlign: 'center', padding: '8px' }} />
                <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{f.unit}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      <button style={{ padding: '11px 28px', background: 'var(--accent)', color: 'white', borderRadius: 10, fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer' }}>
        حفظ
      </button>
    </div>
  )
}

function QRTab() {
  return (
    <div style={{ maxWidth: 360 }}>
      <div className="glass" style={{ padding: 32, textAlign: 'center' }}>
        <div style={{ width: 160, height: 160, background: 'var(--surface-2)', borderRadius: 16, margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
          <QrCode size={80} style={{ color: 'var(--text-3)' }} />
        </div>
        <p style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 20 }}>منصة.com/مطعم-الشيف-أحمد</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {['تحميل PNG عالي الدقة', 'تحميل PDF جاهز للطباعة A4', 'تحميل ملصق جاهز 10×10 سم'].map(label => (
            <button key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px 16px', border: '1px solid var(--border)', borderRadius: 10, fontSize: 13, fontWeight: 500, color: 'var(--text-2)', background: 'transparent', cursor: 'pointer' }}>
              <Download size={14} />
              {label}
            </button>
          ))}
        </div>
        <div style={{ marginTop: 20, background: 'var(--surface-2)', borderRadius: 10, padding: 14, textAlign: 'right' }}>
          <p style={{ fontSize: 12, color: 'var(--text-3)' }}>✓ اطبع بدقة 300 DPI على الأقل</p>
          <p style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4 }}>✓ تأكد المسافة بين الكود والحافة 5مم</p>
        </div>
      </div>
    </div>
  )
}

function SubscriptionTab() {
  return (
    <div style={{ maxWidth: 440 }}>
      <div className="glass" style={{ padding: 20, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>اشتراكك الحالي</p>
            <p style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 3 }}>تجدد في: 15 يوليو 2026</p>
          </div>
          <span style={{ background: 'var(--accent-muted)', color: 'var(--accent)', fontWeight: 700, fontSize: 13, padding: '5px 12px', borderRadius: 10, border: '1px solid rgba(249,115,22,0.2)' }}>Pro ✓</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 16 }}>طريقة الدفع: فيزا ****4242</p>
        <div className="flex gap-2">
          <button style={{ flex: 1, padding: '10px', border: '1px solid var(--border)', borderRadius: 10, fontSize: 13, fontWeight: 600, color: 'var(--text-2)', background: 'transparent', cursor: 'pointer' }}>تغيير طريقة الدفع</button>
          <button style={{ flex: 1, padding: '10px', border: '1px solid var(--red-muted)', borderRadius: 10, fontSize: 13, fontWeight: 600, color: 'var(--red)', background: 'transparent', cursor: 'pointer' }}>إلغاء الاشتراك</button>
        </div>
      </div>
      <div className="glass" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>تاريخ الفواتير</p>
        </div>
        {['يونيو 2026', 'مايو 2026', 'أبريل 2026'].map((m, i, arr) => (
          <div key={m} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
            <span style={{ fontSize: 13, color: 'var(--text)' }}>{m}</span>
            <div className="flex items-center gap-3">
              <span className="num" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>500 ج</span>
              <button style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>تحميل</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const tabComponents = [RestaurantTab, DesignTab, DeliveryTab, QRTab, SubscriptionTab]

export default function Settings() {
  const [activeTab, setActiveTab] = useState(0)
  const TabComponent = tabComponents[activeTab]

  return (
    <Layout title="الإعدادات">
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
        {/* Vertical side-nav */}
        <div className="glass" style={{ width: 192, flexShrink: 0, padding: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {tabs.map((t, i) => {
            const Icon = t.icon
            const active = activeTab === i
            return (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px', borderRadius: 10, fontSize: 13, fontWeight: 600,
                  cursor: 'pointer', border: 'none', textAlign: 'right', transition: 'all 0.15s',
                  background: active ? 'var(--accent-muted)' : 'transparent',
                  color: active ? 'var(--accent)' : 'var(--text-2)',
                  position: 'relative',
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--surface-2)' }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
              >
                {active && (
                  <span style={{ position: 'absolute', right: 0, top: '20%', bottom: '20%', width: 3, borderRadius: 4, background: 'var(--accent)' }} />
                )}
                <Icon size={15} />
                {t.label}
              </button>
            )
          })}
        </div>

        {/* Content area */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <TabComponent />
        </div>
      </div>
    </Layout>
  )
}
