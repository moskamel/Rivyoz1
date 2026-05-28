import { useState } from 'react'
import { Download, QrCode, Store, Bike, CreditCard } from 'lucide-react'
import QRCode from 'react-qr-code'
import Layout from '../components/layout/Layout'
import { getConfig, setConfig } from '../lib/restaurantStore'

const tabs = [
  { label: 'المطعم',   icon: Store },
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
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div className="glass" style={{ padding: 20 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>معلومات المطعم</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Field label="اسم المطعم" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <Field label="الوصف" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            <Field label="العنوان" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
          </div>
        </div>
        <div className="glass" style={{ padding: 20 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>بيانات التواصل</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
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
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                  <span style={{ width: 100, color: 'var(--text-2)', flexShrink: 0, fontSize: 12 }}>{row.days}</span>
                  <input type="time" defaultValue={row.from} style={{ ...inputStyle, flex: 1, padding: '6px 8px' }} />
                  <span style={{ color: 'var(--text-3)', fontSize: 12 }}>–</span>
                  <input type="time" defaultValue={row.to} style={{ ...inputStyle, flex: 1, padding: '6px 8px' }} />
                </div>
              ))}
            </div>
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
  const stored = getConfig()
  const [opts, setOpts] = useState({ delivery: stored.allowDelivery, pickup: stored.allowPickup, table: stored.allowTable })
  const [deliveryFee, setDeliveryFee] = useState(stored.deliveryFee)
  const [minOrder, setMinOrder] = useState(stored.minOrder)
  const [deliveryTime, setDeliveryTime] = useState(stored.deliveryTime)
  const { toast, showToast } = useToast()
  const toggle = (k) => setOpts(p => ({ ...p, [k]: !p[k] }))

  const save = () => {
    setConfig({
      allowDelivery: opts.delivery,
      allowPickup: opts.pickup,
      allowTable: opts.table,
      deliveryFee: Number(deliveryFee),
      minOrder: Number(minOrder),
      deliveryTime: Number(deliveryTime),
    })
    showToast('تم الحفظ ✓')
  }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div className="glass" style={{ padding: 20 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>خيارات الطلب</p>
          {[
            { key: 'delivery', label: 'توصيل', sub: 'لديّ سواقين للتوصيل' },
            { key: 'pickup', label: 'استلام من المطعم', sub: 'يمر الزبون بنفسه' },
            { key: 'table', label: 'طلب على الطاولة', sub: 'QR كود على الطاولة' },
          ].map(o => (
            <div key={o.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{o.label}</p>
                <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{o.sub}</p>
              </div>
              <Toggle value={opts[o.key]} onChange={() => toggle(o.key)} />
            </div>
          ))}
        </div>

        <div className="glass" style={{ padding: 20 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>إعدادات التوصيل</p>
          {[
            { label: 'رسوم التوصيل', value: deliveryFee, setValue: setDeliveryFee, unit: 'ج' },
            { label: 'الحد الأدنى للطلب', value: minOrder, setValue: setMinOrder, unit: 'ج' },
            { label: 'وقت التوصيل المتوقع', value: deliveryTime, setValue: setDeliveryTime, unit: 'دقيقة' },
          ].map(f => (
            <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <label style={{ flex: 1, fontSize: 13, color: 'var(--text-2)' }}>{f.label}</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="number" value={f.value} onChange={e => f.setValue(e.target.value)} style={{ ...inputStyle, width: 80, textAlign: 'center', padding: '8px' }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
                <span style={{ fontSize: 12, color: 'var(--text-3)', minWidth: 36 }}>{f.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={save} style={{ padding: '11px 28px', background: 'var(--accent)', color: 'white', borderRadius: 10, fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer' }}>
        حفظ
      </button>
      {toast && <Toast message={toast} />}
    </div>
  )
}

function QRTab() {
  const config = getConfig()
  const slug = config.slug || 'chef-ahmed'
  const url = `${window.location.origin}/${slug}`
  const { toast, showToast } = useToast()

  const handleDownload = (label) => {
    showToast(`${label} قريباً ✓`)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div className="glass" style={{ padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ background: 'white', padding: 16, borderRadius: 18, marginBottom: 16, boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
          <QRCode value={url} size={148} />
        </div>
        <p style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 4 }}>رابط الصفحة</p>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)', wordBreak: 'break-all', textAlign: 'center' }}>{url}</p>
      </div>

      <div className="glass" style={{ padding: 20 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>تحميل الكود</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {['تحميل PNG عالي الدقة', 'تحميل PDF جاهز للطباعة A4', 'تحميل ملصق جاهز 10×10 سم'].map(label => (
            <button key={label} onClick={() => handleDownload(label)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', border: '1px solid var(--border)', borderRadius: 10, fontSize: 13, fontWeight: 500, color: 'var(--text-2)', background: 'transparent', cursor: 'pointer', width: '100%', transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-2)' }}
            >
              <Download size={14} />
              {label}
            </button>
          ))}
        </div>
        <div style={{ background: 'var(--surface-2)', borderRadius: 10, padding: 14 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-2)', marginBottom: 8 }}>تعليمات الطباعة</p>
          <p style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 4 }}>✓ اطبع بدقة 300 DPI على الأقل</p>
          <p style={{ fontSize: 12, color: 'var(--text-3)' }}>✓ تأكد المسافة بين الكود والحافة 5مم</p>
        </div>
      </div>
      {toast && <Toast message={toast} />}
    </div>
  )
}

function SubscriptionTab() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="glass" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>اشتراكك الحالي</p>
              <p style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 3 }}>تجدد في: 15 يوليو 2026</p>
            </div>
            <span style={{ background: 'var(--accent-muted)', color: 'var(--accent)', fontWeight: 700, fontSize: 13, padding: '5px 12px', borderRadius: 10, border: '1px solid rgba(249,115,22,0.2)' }}>Pro ✓</span>
          </div>
          <div style={{ padding: '12px 14px', background: 'var(--surface-2)', borderRadius: 10, marginBottom: 16 }}>
            <p style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 3 }}>طريقة الدفع</p>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>فيزا ****4242</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ flex: 1, padding: '10px', border: '1px solid var(--border)', borderRadius: 10, fontSize: 13, fontWeight: 600, color: 'var(--text-2)', background: 'transparent', cursor: 'pointer' }}>تغيير طريقة الدفع</button>
            <button style={{ flex: 1, padding: '10px', border: '1px solid var(--red-muted)', borderRadius: 10, fontSize: 13, fontWeight: 600, color: 'var(--red)', background: 'transparent', cursor: 'pointer' }}>إلغاء الاشتراك</button>
          </div>
        </div>
      </div>

      <div className="glass" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>تاريخ الفواتير</p>
        </div>
        {['يونيو 2026', 'مايو 2026', 'أبريل 2026', 'مارس 2026'].map((m, i, arr) => (
          <div key={m} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
            <span style={{ fontSize: 13, color: 'var(--text)' }}>{m}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="num" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>500 ج</span>
              <button style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Download size={12} /> تحميل
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const tabComponents = [RestaurantTab, DeliveryTab, QRTab, SubscriptionTab]

export default function Settings() {
  const [activeTab, setActiveTab] = useState(0)
  const TabComponent = tabComponents[activeTab]

  return (
    <Layout title="الإعدادات">
      {/* Horizontal tab bar */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, borderBottom: '1px solid var(--border)', paddingBottom: 0 }}>
        {tabs.map((t, i) => {
          const Icon = t.icon
          const active = activeTab === i
          return (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              style={{
                display: 'flex', alignItems: 'center', gap: 7, padding: '9px 16px',
                fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none', background: 'none',
                color: active ? 'var(--accent)' : 'var(--text-2)', transition: 'all 0.15s',
                borderBottom: `2px solid ${active ? 'var(--accent)' : 'transparent'}`,
                marginBottom: -1,
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--text)' }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--text-2)' }}
            >
              <Icon size={14} />
              {t.label}
            </button>
          )
        })}
      </div>

      {/* Content */}
      <TabComponent />
    </Layout>
  )
}
