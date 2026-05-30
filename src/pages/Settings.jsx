import { useState, useRef } from 'react'
import { Import, Scanner, Shop, Car, Card, Camera, Trash, Profile, Lock, Shield, Logout } from 'iconsax-react'
import ConfirmDialog from '../components/ConfirmDialog'
import { useNavigate } from 'react-router-dom'
import QRCode from 'react-qr-code'
import Layout from '../components/layout/Layout'
import { getConfig, setConfig } from '../lib/restaurantStore'

const tabs = [
  { label: 'المطعم',   icon: Shop },
  { label: 'التوصيل',  icon: Car },
  { label: 'QR Code',  icon: Scanner },
  { label: 'الاشتراك', icon: Card },
  { label: 'حسابي',    icon: Profile },
  { label: 'الأمان',   icon: Lock },
  { label: 'الجلسة',   icon: Shield },
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
  width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)',
  border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text)',
  fontSize: 13, outline: 'none', fontFamily: 'Zain, sans-serif', boxSizing: 'border-box',
  transition: 'border-color var(--dur-normal) ease, box-shadow var(--dur-normal) ease',
}

function Field({ label, value, onChange, type = 'text', error }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--text-2)', letterSpacing: '0.04em', marginBottom: 6 }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        style={{ ...inputStyle, borderColor: error ? 'var(--red)' : undefined }}
        onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-muted)' }}
        onBlur={e => { e.target.style.borderColor = error ? 'var(--red)' : 'var(--border)'; e.target.style.boxShadow = 'none' }}
      />
      {error && <p style={{ color: 'var(--red)', fontSize: 11, marginTop: 4, fontWeight: 600 }}>{error}</p>}
    </div>
  )
}

/* Resize + convert an image File to a base64 JPEG string */
function resizeImage(file, maxW, maxH, quality = 0.85) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (ev) => {
      const img = new Image()
      img.onload = () => {
        const ratio = Math.min(maxW / img.width, maxH / img.height, 1)
        const canvas = document.createElement('canvas')
        canvas.width  = Math.round(img.width  * ratio)
        canvas.height = Math.round(img.height * ratio)
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.src = ev.target.result
    }
    reader.readAsDataURL(file)
  })
}

function ImageUpload({ label, hint, value, onChange, aspect = 'banner' }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) return
    const [maxW, maxH, q] = aspect === 'logo' ? [300, 300, 0.88] : [900, 340, 0.82]
    const b64 = await resizeImage(file, maxW, maxH, q)
    onChange(b64)
  }

  const h = 120

  return (
    <>
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-2)', letterSpacing: '0.04em' }}>{label}</label>
        {value && (
          <button
            onClick={() => setConfirmDelete(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--red)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <Trash size={12} /> حذف
          </button>
        )}
      </div>

      <div
        onClick={() => inputRef.current.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]) }}
        style={{
          width: '100%', height: h, borderRadius: 'var(--radius-lg)',
          border: `2px dashed ${dragging ? 'var(--accent)' : value ? 'transparent' : 'var(--border-strong)'}`,
          background: dragging ? 'var(--accent-muted)' : value ? 'transparent' : 'var(--surface-2)',
          cursor: 'pointer', overflow: 'hidden', position: 'relative',
          transition: 'border-color 0.15s, background 0.15s',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {value ? (
          <>
            <img
              src={value}
              alt=""
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                display: 'block',
                borderRadius: 'var(--radius-lg)',
                ...(aspect === 'logo' ? { objectPosition: 'center' } : {}),
              }}
            />
            {/* Overlay on hover */}
            <div style={{
              position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.42)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: 0, transition: 'opacity 0.15s', borderRadius: 'var(--radius-lg)',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'white', fontSize: 13, fontWeight: 700 }}>
                <Camera size={16} /> تغيير الصورة
              </div>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 16 }}>
            <Camera size={22} color="var(--text-3)" style={{ marginBottom: 8 }} />
            <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-2)', marginBottom: 3 }}>
              {dragging ? 'أفلت الصورة هنا' : 'اضغط أو اسحب صورة'}
            </p>
            <p style={{ fontSize: 10, color: 'var(--text-3)' }}>{hint}</p>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={e => { handleFile(e.target.files[0]); e.target.value = '' }}
      />
    </div>
    <ConfirmDialog
      open={confirmDelete}
      title={`حذف ${label}؟`}
      message="سيتم حذف الصورة نهائياً."
      confirmLabel="احذف"
      onConfirm={() => { onChange(''); setConfirmDelete(false) }}
      onCancel={() => setConfirmDelete(false)}
    />
    </>
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
  const [bannerUrl, setBannerUrl] = useState(storedConfig.bannerUrl || '')
  const [logoUrl, setLogoUrl] = useState(storedConfig.logoUrl || '')
  const [errors, setErrors] = useState({})
  const { toast, showToast } = useToast()

  const clearErr = (key) => setErrors(p => ({ ...p, [key]: '' }))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'اسم المطعم مطلوب'
    if (!form.phone.trim()) e.phone = 'رقم الهاتف مطلوب'
    else if (!/^\d{10,15}$/.test(form.phone.replace(/[\s\-()]/g, ''))) e.phone = 'رقم هاتف غير صحيح (10–15 رقم)'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'بريد إلكتروني غير صحيح'
    return e
  }

  const handleSave = () => {
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return
    setConfig({ ...form, bannerUrl, logoUrl })
    showToast('تم الحفظ ✓')
  }

  return (
    <div className="animate-fade-in">

      {/* ── Image uploads row ── */}
      <div className="glass" style={{ padding: 20, marginBottom: 16 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
          صور المطعم
          <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-3)', marginRight: 8 }}>تظهر في صفحة الاستكشاف وموقعك</span>
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: 16 }}>
          <ImageUpload
            label="صورة الغلاف"
            hint="JPG / PNG · يُفضل 900×340 · حجم أقصى 5 ميجا"
            value={bannerUrl}
            onChange={setBannerUrl}
            aspect="banner"
          />
          <ImageUpload
            label="شعار المطعم"
            hint="مربع · JPG / PNG"
            value={logoUrl}
            onChange={setLogoUrl}
            aspect="logo"
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div className="glass" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 0 }}>معلومات المطعم</p>
          <Field label="اسم المطعم *" value={form.name} onChange={e => { setForm({ ...form, name: e.target.value }); clearErr('name') }} error={errors.name} />
          <Field label="الوصف" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <Field label="العنوان" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
        </div>
        <div className="glass" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 0 }}>بيانات التواصل</p>
          <Field label="رقم الموبايل *" value={form.phone} onChange={e => { setForm({ ...form, phone: e.target.value }); clearErr('phone') }} error={errors.phone} />
          <Field label="البريد الإلكتروني" type="email" value={form.email} onChange={e => { setForm({ ...form, email: e.target.value }); clearErr('email') }} error={errors.email} />
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--text-2)', letterSpacing: '0.04em', marginBottom: 10 }}>ساعات العمل</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { days: 'السبت – الخميس', from: '12:00', to: '23:00' },
                { days: 'الجمعة', from: '13:00', to: '00:00' },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                  <span style={{ width: 100, color: 'var(--text-2)', flexShrink: 0, fontSize: 12 }}>{row.days}</span>
                  <input type="time" defaultValue={row.from} style={{ ...inputStyle, flex: 1, padding: '6px 8px' }}
                    onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-muted)' }}
                    onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                  />
                  <span style={{ color: 'var(--text-3)', fontSize: 12 }}>–</span>
                  <input type="time" defaultValue={row.to} style={{ ...inputStyle, flex: 1, padding: '6px 8px' }}
                    onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-muted)' }}
                    onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <button className="btn-primary" onClick={handleSave}>
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

  const [deliveryErrors, setDeliveryErrors] = useState({})

  const save = () => {
    const e = {}
    if (deliveryFee === '' || Number(deliveryFee) < 0) e.deliveryFee = 'يجب أن تكون القيمة 0 أو أكبر'
    if (minOrder === '' || Number(minOrder) < 0) e.minOrder = 'يجب أن تكون القيمة 0 أو أكبر'
    if (!deliveryTime || Number(deliveryTime) <= 0) e.deliveryTime = 'وقت التوصيل يجب أن يكون أكبر من صفر'
    setDeliveryErrors(e)
    if (Object.keys(e).length) return
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
    <div className="animate-fade-in">
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
            { label: 'رسوم التوصيل', value: deliveryFee, setValue: setDeliveryFee, unit: 'ج', errKey: 'deliveryFee' },
            { label: 'الحد الأدنى للطلب', value: minOrder, setValue: setMinOrder, unit: 'ج', errKey: 'minOrder' },
            { label: 'وقت التوصيل المتوقع', value: deliveryTime, setValue: setDeliveryTime, unit: 'دقيقة', errKey: 'deliveryTime' },
          ].map(f => (
            <div key={f.label} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <label style={{ flex: 1, fontSize: 13, color: 'var(--text-2)' }}>{f.label}</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input type="number" value={f.value} min="0" onChange={e => { f.setValue(e.target.value); setDeliveryErrors(p => ({ ...p, [f.errKey]: '' })) }}
                    style={{ ...inputStyle, width: 80, textAlign: 'center', padding: '8px', borderColor: deliveryErrors[f.errKey] ? 'var(--red)' : undefined }}
                    onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-muted)' }}
                    onBlur={e => { e.target.style.borderColor = deliveryErrors[f.errKey] ? 'var(--red)' : 'var(--border)'; e.target.style.boxShadow = 'none' }}
                  />
                  <span style={{ fontSize: 12, color: 'var(--text-3)', minWidth: 36 }}>{f.unit}</span>
                </div>
              </div>
              {deliveryErrors[f.errKey] && <p style={{ color: 'var(--red)', fontSize: 11, marginTop: 4, fontWeight: 600, textAlign: 'left' }}>{deliveryErrors[f.errKey]}</p>}
            </div>
          ))}
        </div>
      </div>
      <button className="btn-primary" onClick={save}>حفظ</button>
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
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div className="glass" style={{ padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ background: 'white', padding: 20, borderRadius: 'var(--radius-xl)', marginBottom: 20, boxShadow: '0 4px 24px rgba(0,0,0,0.25)', display: 'inline-flex' }}>
          <QRCode value={url} size={148} />
        </div>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 6 }}>رابط الصفحة</p>
        <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)', fontFamily: 'Inter, monospace', wordBreak: 'break-all', textAlign: 'center', letterSpacing: '0.02em' }}>{url}</p>
      </div>

      <div className="glass" style={{ padding: 20 }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>تحميل الكود</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
          {['تحميل PNG عالي الدقة', 'تحميل PDF جاهز للطباعة A4', 'تحميل ملصق جاهز 10×10 سم'].map(label => (
            <button key={label} className="btn-ghost" onClick={() => handleDownload(label)} style={{ justifyContent: 'flex-start', gap: 10, width: '100%' }}>
              <Import size={14} />
              {label}
            </button>
          ))}
        </div>
        <div style={{ background: 'var(--surface-2)', borderRadius: 'var(--radius-md)', padding: 14, border: '1px solid var(--border)' }}>
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
  const [confirmCancel, setConfirmCancel] = useState(false)
  return (
    <>
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="glass" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>اشتراكك الحالي</p>
              <p style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 3 }}>تجدد في: 15 يوليو 2026</p>
            </div>
            <span className="badge badge-accent badge-pill badge-md">Pro ✓</span>
          </div>
          <div style={{ padding: '12px 14px', background: 'var(--surface-2)', borderRadius: 'var(--radius-md)', marginBottom: 16, border: '1px solid var(--border)' }}>
            <p style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 3 }}>طريقة الدفع</p>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>فيزا ****4242</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-subtle" style={{ flex: 1 }}>تغيير طريقة الدفع</button>
            <button className="btn-danger" onClick={() => setConfirmCancel(true)} style={{ flex: 1 }}>إلغاء الاشتراك</button>
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
                <Import size={12} /> تحميل
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    <ConfirmDialog
      open={confirmCancel}
      title="إلغاء الاشتراك؟"
      message="سيتم إلغاء اشتراكك في نهاية الفترة الحالية وستفقد جميع مميزات Pro."
      confirmLabel="نعم، ألغِ الاشتراك"
      onConfirm={() => setConfirmCancel(false)}
      onCancel={() => setConfirmCancel(false)}
    />
    </>
  )
}

const roleLabels = { owner: 'صاحب المطعم', manager: 'مدير الفرع', cashier: 'كاشير', kitchen: 'مطبخ' }
const roleColors = { owner: '#F97316', manager: '#8B5CF6', cashier: '#06B6D4', kitchen: '#22C55E' }

const profileInputStyle = {
  width: '100%', padding: '11px 14px', borderRadius: 10,
  border: '1px solid var(--border)', background: 'var(--surface-2)',
  color: 'var(--text)', fontSize: 14, fontFamily: 'Zain, sans-serif',
  outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s',
}

function ProfileField({ label, value, onChange, type = 'text', error }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6 }}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        style={{ ...profileInputStyle, ...(error ? { borderColor: '#EF4444' } : {}) }}
        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
        onBlur={e => e.target.style.borderColor = error ? '#EF4444' : 'var(--border)'} />
      {error && <p style={{ color: '#EF4444', fontSize: 11, marginTop: 4, fontWeight: 600 }}>{error}</p>}
    </div>
  )
}

function ProfileToggle({ label, description, enabled, onToggle }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
      <div>
        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{label}</p>
        {description && <p style={{ fontSize: 12, color: 'var(--text-2)' }}>{description}</p>}
      </div>
      <button onClick={onToggle} style={{ width: 44, height: 24, borderRadius: 12, background: enabled ? 'var(--accent)' : 'var(--surface-3)', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
        <span style={{ position: 'absolute', top: 3, right: enabled ? 3 : 23, width: 18, height: 18, borderRadius: '50%', background: 'white', transition: 'right 0.2s', display: 'block', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }} />
      </button>
    </div>
  )
}

function AccountTab() {
  const role = localStorage.getItem('auth_role') || 'owner'
  const accentColor = roleColors[role] || '#F97316'
  const roleLabel = roleLabels[role] || 'صاحب المطعم'
  const initials = (roleLabels[role] || 'ص').split(' ').map(w => w[0]).join('')

  const [info, setInfo] = useState({ name: 'أحمد العمري', email: 'ahmed@restaurant.com', phone: '0512345678' })
  const [errors, setErrors] = useState({})
  const [saved, setSaved] = useState(false)

  function handleSave() {
    const e = {}
    if (!info.name.trim()) e.name = 'الاسم مطلوب'
    if (!info.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email)) e.email = 'بريد إلكتروني غير صحيح'
    if (!/^\d{10,15}$/.test(info.phone.replace(/[\s\-()+]/g, ''))) e.phone = 'رقم غير صحيح'
    setErrors(e)
    if (Object.keys(e).length) return
    setSaved(true); setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="animate-fade-in">
      <div className="glass" style={{ padding: 20, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: `${accentColor}22`, border: `2px solid ${accentColor}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900, color: accentColor, fontFamily: 'Zain, sans-serif' }}>{initials}</div>
            <button style={{ position: 'absolute', bottom: -2, left: -2, width: 22, height: 22, borderRadius: '50%', background: 'var(--accent)', border: '2px solid var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
              <Camera size={10} strokeWidth={2.5} />
            </button>
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: 16, fontWeight: 900, color: 'var(--text)', marginBottom: 4 }}>{info.name}</h3>
            <span style={{ display: 'inline-flex', padding: '3px 10px', borderRadius: 20, background: `${accentColor}18`, border: `1px solid ${accentColor}35`, color: accentColor, fontSize: 11, fontWeight: 700, fontFamily: 'Zain, sans-serif' }}>{roleLabel}</span>
          </div>
        </div>
      </div>
      <div className="glass" style={{ padding: 20 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>المعلومات الشخصية</p>
        <ProfileField label="الاسم الكامل *" value={info.name} onChange={v => { setInfo(p => ({ ...p, name: v })); setErrors(p => ({ ...p, name: '' })) }} error={errors.name} />
        <ProfileField label="البريد الإلكتروني *" type="email" value={info.email} onChange={v => { setInfo(p => ({ ...p, email: v })); setErrors(p => ({ ...p, email: '' })) }} error={errors.email} />
        <ProfileField label="رقم الجوال *" type="tel" value={info.phone} onChange={v => { setInfo(p => ({ ...p, phone: v })); setErrors(p => ({ ...p, phone: '' })) }} error={errors.phone} />
        <button onClick={handleSave} style={{ padding: '10px 24px', borderRadius: 10, background: saved ? '#22C55E' : 'var(--accent)', border: 'none', color: 'white', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s', fontFamily: 'Zain, sans-serif' }}>
          {saved ? '✓ تم الحفظ' : 'حفظ التغييرات'}
        </button>
      </div>
    </div>
  )
}

function SecurityTab() {
  const [security, setSecurity] = useState({ twoFactor: false, notifications: true })
  return (
    <div className="animate-fade-in">
      <div className="glass" style={{ padding: 20 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4, paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>الأمان والخصوصية</p>
        <ProfileToggle label="تغيير كلمة المرور" description="تحديث كلمة المرور الخاصة بحسابك" enabled={false} onToggle={() => {}} />
        <ProfileToggle label="رمز التحقق الثنائي" description="حماية إضافية عند تسجيل الدخول" enabled={security.twoFactor} onToggle={() => setSecurity(s => ({ ...s, twoFactor: !s.twoFactor }))} />
        <ProfileToggle label="إشعارات الأمان" description="تلقّي تنبيهات عند الدخول من جهاز جديد" enabled={security.notifications} onToggle={() => setSecurity(s => ({ ...s, notifications: !s.notifications }))} />
        <button style={{ marginTop: 16, padding: '10px 20px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text-2)', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.15s', fontFamily: 'Zain, sans-serif' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-2)' }}>
          <Lock size={14} strokeWidth={2} /> تغيير كلمة المرور
        </button>
      </div>
    </div>
  )
}

function SessionTab() {
  const navigate = useNavigate()
  const role = localStorage.getItem('auth_role') || 'owner'
  const accentColor = roleColors[role] || '#F97316'
  const roleLabel = roleLabels[role] || 'صاحب المطعم'
  const [confirmLogout, setConfirmLogout] = useState(false)

  function handleLogout() {
    localStorage.removeItem('auth_role')
    navigate('/login')
  }

  return (
    <>
    <div className="animate-fade-in">
      <div className="glass" style={{ padding: 20 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>الجلسة الحالية</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: `${accentColor}18`, border: `1px solid ${accentColor}35`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={18} color={accentColor} strokeWidth={2} />
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>جلسة نشطة</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ display: 'inline-flex', padding: '2px 10px', borderRadius: 20, background: `${accentColor}18`, border: `1px solid ${accentColor}35`, color: accentColor, fontSize: 11, fontWeight: 700, fontFamily: 'Zain, sans-serif' }}>{roleLabel}</span>
                <span style={{ fontSize: 11, color: 'var(--text-3)' }}>متصل الآن</span>
              </div>
            </div>
          </div>
          <button onClick={() => setConfirmLogout(true)} style={{ padding: '10px 20px', borderRadius: 10, border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.08)', color: '#EF4444', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.15s', fontFamily: 'Zain, sans-serif' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.15)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}>
            <Logout size={14} strokeWidth={2} /> تسجيل الخروج
          </button>
        </div>
      </div>
    </div>
    <ConfirmDialog
      open={confirmLogout}
      title="تسجيل الخروج؟"
      message="هل تريد تسجيل الخروج من حسابك؟"
      confirmLabel="تسجيل الخروج"
      onConfirm={handleLogout}
      onCancel={() => setConfirmLogout(false)}
    />
    </>
  )
}

const tabComponents = [RestaurantTab, DeliveryTab, QRTab, SubscriptionTab, AccountTab, SecurityTab, SessionTab]

export default function Settings() {
  const [activeTab, setActiveTab] = useState(0)
  const TabComponent = tabComponents[activeTab]

  return (
    <Layout title="الإعدادات">
      {/* Horizontal tab bar */}
      <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--border)', marginBottom: 20 }}>
        {tabs.map((t, i) => {
          const Icon = t.icon
          const active = activeTab === i
          return (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                height: 40, padding: '0 16px',
                fontSize: 13, fontWeight: active ? 700 : 500,
                cursor: 'pointer', border: 'none', background: 'transparent',
                color: active ? 'var(--accent)' : 'var(--text-2)',
                borderBottom: `2px solid ${active ? 'var(--accent)' : 'transparent'}`,
                marginBottom: -1,
                transition: 'all 150ms var(--ease-default)',
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--text)' }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--text-2)' }}
            >
              <Icon size={14} strokeWidth={active ? 2 : 1.5} />
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
