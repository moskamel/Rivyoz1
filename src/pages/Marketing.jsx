import { useState } from 'react'
import { Add, Copy, Tag, People, TrendUp, Flash, Message, Gift, Check, Trash, Star1 } from 'iconsax-react'
import Layout from '../components/layout/Layout'
import { getCoupons, setCoupons } from '../lib/restaurantStore'

function Toast({ message }) {
  return (
    <div style={{ position: 'fixed', bottom: 24, left: 24, zIndex: 50, background: 'var(--green)', color: 'white', padding: '10px 18px', borderRadius: 12, fontWeight: 600, fontSize: 13, boxShadow: '0 8px 24px rgba(34,197,94,0.3)' }}>
      {message}
    </div>
  )
}

function useToast() {
  const [toast, setToast] = useState(null)
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2000) }
  return { toast, showToast }
}

const tabs = [
  { label: 'برنامج الولاء', icon: Gift },
  { label: 'حملات واتساب', icon: Message },
  { label: 'الكوبونات', icon: Tag },
]

const inputStyle = {
  width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)',
  border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text)',
  fontSize: 13, outline: 'none', fontFamily: 'Zain, sans-serif', boxSizing: 'border-box',
  transition: 'border-color var(--dur-normal) ease, box-shadow var(--dur-normal) ease',
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

function LoyaltyTab() {
  const [enabled, setEnabled] = useState(true)
  const [spendPer, setSpendPer] = useState(10)
  const [pointsPer, setPointsPer] = useState(1)
  const [redeemAt, setRedeemAt] = useState(100)
  const [discountVal, setDiscountVal] = useState(10)
  const { toast, showToast } = useToast()

  const tiers = [
    { name: 'مبتدئ', color: '#9CA3AF', min: 0, max: 500, icon: '🥉' },
    { name: 'موثوق', color: '#60A5FA', min: 500, max: 1500, icon: '🥈' },
    { name: 'مساهم', color: '#F97316', min: 1500, max: 3000, icon: '🥇' },
    { name: 'خبير', color: '#A78BFA', min: 3000, max: null, icon: '💎' },
  ]

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      {/* Left col */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="glass-accent" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 28 }}>🎁</span>
              <div>
                <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>برنامج النقاط</p>
                <p style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 3 }}>اكسب ولاء زبائنك بنظام مكافآت</p>
              </div>
            </div>
            <Toggle value={enabled} onChange={setEnabled} />
          </div>

          {enabled && (
            <div style={{ paddingTop: 16, borderTop: '1px solid var(--border)' }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 10 }}>معادلة الكسب</p>
              <div className="flex items-center gap-3" style={{ marginBottom: 12, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 13, color: 'var(--text-2)', whiteSpace: 'nowrap' }}>كل</span>
                <input type="number" value={spendPer} onChange={e => setSpendPer(e.target.value)} style={{ ...inputStyle, width: 64, textAlign: 'center' }}
                  onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-muted)' }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                />
                <span style={{ fontSize: 13, color: 'var(--text-2)', whiteSpace: 'nowrap' }}>ج =</span>
                <input type="number" value={pointsPer} onChange={e => setPointsPer(e.target.value)} style={{ ...inputStyle, width: 64, textAlign: 'center' }}
                  onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-muted)' }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                />
                <span style={{ fontSize: 13, color: 'var(--text-2)', whiteSpace: 'nowrap' }}>نقطة</span>
              </div>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 10 }}>معادلة الاسترداد</p>
              <div className="flex items-center gap-3" style={{ flexWrap: 'wrap' }}>
                <input type="number" value={redeemAt} onChange={e => setRedeemAt(e.target.value)} style={{ ...inputStyle, width: 80, textAlign: 'center' }}
                  onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-muted)' }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                />
                <span style={{ fontSize: 13, color: 'var(--text-2)', whiteSpace: 'nowrap' }}>نقطة = خصم</span>
                <input type="number" value={discountVal} onChange={e => setDiscountVal(e.target.value)} style={{ ...inputStyle, width: 64, textAlign: 'center' }}
                  onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-muted)' }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                />
                <span style={{ fontSize: 13, color: 'var(--text-2)' }}>ج</span>
              </div>
            </div>
          )}
        </div>

        {/* Tiers */}
        {enabled && (
          <div className="glass" style={{ padding: 20 }}>
            <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14, marginBottom: 14 }}>مستويات الولاء</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {tiers.map(t => (
                <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10, background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 18 }}>{t.icon}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{t.name}</p>
                    <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>
                      {t.min.toLocaleString()} {t.max ? `– ${t.max.toLocaleString()} نقطة` : '+ نقطة'}
                    </p>
                  </div>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: t.color, flexShrink: 0 }} />
                </div>
              ))}
            </div>
          </div>
        )}

        <button onClick={() => showToast('تم حفظ إعدادات الولاء ✓')} className="btn-primary" style={{ transition: 'all var(--dur-normal) var(--ease-default)' }}>
          حفظ الإعدادات
        </button>
        {toast && <Toast message={toast} />}
      </div>

      {/* Right col: stats */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="glass" style={{ padding: 20 }}>
          <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14, marginBottom: 14 }}>إحصائيات هذا الشهر</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { label: 'أعضاء البرنامج', value: '234', icon: People, color: 'var(--accent)' },
              { label: 'نقاط محصودة', value: '12,400', icon: Flash, color: 'var(--yellow)' },
              { label: 'خصومات مستخدمة', value: '89', icon: Tag, color: 'var(--green)' },
              { label: 'طلب/عضو/شهر', value: '3.2', icon: TrendUp, color: 'var(--blue)' },
            ].map(s => {
              const Icon = s.icon
              return (
                <div key={s.label} style={{ background: 'var(--surface-2)', borderRadius: 12, padding: '14px', border: '1px solid var(--border)' }}>
                  <Icon size={16} style={{ color: s.color, marginBottom: 8 }} />
                  <p className="num" style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', lineHeight: 1 }}>{s.value}</p>
                  <p style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 4 }}>{s.label}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top redeemers */}
        <div className="glass" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
            <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>أعلى مستخدمي النقاط</p>
          </div>
          {[
            { name: 'أحمد محمد السيد', pts: 2840, tier: 'خبير', color: '#A78BFA' },
            { name: 'خالد محمود عبد الله', pts: 1920, tier: 'مساهم', color: '#F97316' },
            { name: 'فاطمة حسن إبراهيم', pts: 1240, tier: 'موثوق', color: '#60A5FA' },
            { name: 'منى عبد الرحمن', pts: 680, tier: 'موثوق', color: '#60A5FA' },
          ].map((u, i) => (
            <div key={u.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 20px', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
              <span style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'var(--text-2)', fontFamily: 'Inter', flexShrink: 0 }}>{i + 1}</span>
              <p style={{ flex: 1, fontSize: 13, fontWeight: 500, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.name}</p>
              <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, background: 'var(--surface-2)', color: u.color, fontWeight: 600, flexShrink: 0 }}>{u.tier}</span>
              <span className="num" style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', flexShrink: 0 }}>{u.pts.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function WhatsappTab() {
  const [target, setTarget] = useState('all')
  const [message, setMessage] = useState('عزيزي {الاسم}،\nعندنا عرض خاص النهارده! 🍖')
  const [sent, setSent] = useState(false)
  const preview = message.replace('{الاسم}', 'أحمد')

  const handleSend = () => {
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  const targets = [
    { key: 'all', label: 'كل الزبائن', count: 234, icon: '👥' },
    { key: 'inactive', label: 'لم يطلبوا منذ 7 أيام', count: 45, icon: '😴' },
    { key: 'top', label: 'الأكثر طلباً (فوق 5 طلبات)', count: 28, icon: '⭐' },
    { key: 'new', label: 'زبائن جدد (آخر 7 أيام)', count: 12, icon: '🆕' },
  ]

  const stats = [
    { label: 'رسائل أُرسلت', value: '1,240' },
    { label: 'نسبة الفتح', value: '68%' },
    { label: 'طلبات ناتجة', value: '89' },
    { label: 'عائد الحملة', value: '4,200 ج' },
  ]

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      {/* Left: targeting + stats */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="glass" style={{ padding: 20 }}>
          <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14, marginBottom: 12 }}>اختر الجمهور</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {targets.map(t => (
              <button
                key={t.key}
                onClick={() => setTarget(t.key)}
                style={{
                  width: '100%', textAlign: 'right', padding: '10px 14px', borderRadius: 10, fontSize: 13, fontWeight: 500,
                  display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', transition: 'all 0.15s',
                  border: `1px solid ${target === t.key ? 'var(--accent)' : 'var(--border)'}`,
                  background: target === t.key ? 'var(--accent-muted)' : 'transparent',
                  color: target === t.key ? 'var(--accent)' : 'var(--text-2)',
                }}
              >
                <span style={{ fontSize: 16 }}>{t.icon}</span>
                <span style={{ flex: 1 }}>{t.label}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', background: 'var(--surface-2)', padding: '2px 8px', borderRadius: 6 }}>{t.count}</span>
                {target === t.key && <Check size={13} />}
              </button>
            ))}
          </div>
        </div>

        {/* Last campaign stats */}
        <div className="glass" style={{ padding: 20 }}>
          <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14, marginBottom: 14 }}>آخر حملة</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {stats.map(s => (
              <div key={s.label} style={{ background: 'var(--surface-2)', borderRadius: 10, padding: '10px 12px', border: '1px solid var(--border)' }}>
                <p className="num" style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)' }}>{s.value}</p>
                <p style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 3 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: message + preview */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="glass" style={{ padding: 20 }}>
          <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14, marginBottom: 10 }}>الرسالة</p>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            style={{ ...inputStyle, resize: 'none', marginBottom: 8, borderRadius: 'var(--radius-lg)', padding: 12, lineHeight: 1.6 }}
            rows={5}
            placeholder="اكتب رسالتك..."
            onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-muted)' }}
            onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
          />
          <p style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 14 }}>المتغيرات المتاحة: &#123;الاسم&#125; &#123;آخر_طلب&#125;</p>

          {/* WhatsApp preview */}
          <div style={{ background: '#0B141A', borderRadius: 12, padding: 16, position: 'relative' }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#8696A0', marginBottom: 10 }}>معاينة واتساب</p>
            <div style={{ background: '#005C4B', borderRadius: '12px 12px 12px 0', padding: '8px 12px', display: 'inline-block', maxWidth: '85%' }}>
              <p style={{ fontSize: 13, color: '#E9EDEF', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>{preview}</p>
              <p style={{ fontSize: 10, color: '#8696A0', marginTop: 4, textAlign: 'left' }}>✓✓ الآن</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="btn-ghost" style={{ flex: 1 }}>
            جدولة لوقت معين
          </button>
          <button onClick={handleSend} style={{ flex: 1, height: 40, background: sent ? 'var(--green)' : '#25D366', color: 'white', borderRadius: 'var(--radius-lg)', fontWeight: 600, fontSize: 13, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'all var(--dur-normal) var(--ease-default)' }}>
            {sent ? <Check size={14} /> : <Message size={14} />}
            {sent ? 'تم الإرسال ✓' : 'إرسال الآن'}
          </button>
        </div>
      </div>
    </div>
  )
}

function CouponsTab() {
  const [coupons, setCouponsState] = useState(getCoupons)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ code: '', type: 'percent', value: '', maxUses: '', minOrder: '', expiry: '' })

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    setForm(f => ({ ...f, code: Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('') }))
  }

  const save = () => {
    if (!form.code || !form.value) return
    const updated = [...coupons, {
      id: Date.now(), code: form.code, type: form.type,
      value: +form.value,
      discount: form.type === 'percent' ? `${form.value}%` : `${form.value} ج`,
      used: 0, max: form.maxUses ? +form.maxUses : null,
      minOrder: form.minOrder ? +form.minOrder : null,
      expiry: form.expiry || null,
    }]
    setCouponsState(updated)
    setCoupons(updated)
    setShowForm(false)
    setForm({ code: '', type: 'percent', value: '', maxUses: '', minOrder: '', expiry: '' })
  }

  const remove = (id) => {
    const updated = coupons.filter(c => c.id !== id)
    setCouponsState(updated)
    setCoupons(updated)
  }

  const copyCode = (code) => navigator.clipboard?.writeText(code)

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      {/* Left: list */}
      <div className="glass" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>الكوبونات ({coupons.length})</p>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary" style={{ height: 36, padding: '0 14px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Add size={14} /> كوبون جديد
          </button>
        </div>

        {coupons.map((c, i) => {
          const pct = c.max ? Math.round((c.used / c.max) * 100) : null
          const isExpired = c.expiry && new Date(c.expiry) < new Date()
          return (
            <div key={c.id} style={{ padding: '14px 20px', borderBottom: i < coupons.length - 1 ? '1px solid var(--border)' : 'none', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div className="flex items-center gap-3" style={{ marginBottom: c.max ? 8 : 0 }}>
                <button className="flex items-center gap-2" onClick={() => copyCode(c.code)} style={{ fontFamily: 'Inter, monospace', fontWeight: 800, fontSize: 16, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.06em' }}>
                  {c.code}
                  <Copy size={11} style={{ color: 'var(--text-3)' }} />
                </button>
                <span className="badge badge-green badge-pill badge-lg">{c.discount}</span>
                {isExpired && <span className="badge badge-red badge-pill badge-sm">منتهي</span>}
                <div style={{ marginRight: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
                  {c.minOrder && <span style={{ fontSize: 11, color: 'var(--text-3)' }}>حد أدنى {c.minOrder} ج</span>}
                  <button onClick={() => remove(c.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
                    <Trash size={13} style={{ color: 'var(--text-3)' }} />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span style={{ fontSize: 12, color: 'var(--text-3)' }}>
                  {c.used}{c.max ? `/${c.max}` : ''} استخدام
                  {c.expiry && ` · ينتهي ${c.expiry}`}
                </span>
                {c.max && (
                  <div style={{ flex: 1, height: 4, background: 'var(--surface-3)', borderRadius: 4, overflow: 'hidden', marginRight: 4 }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: pct >= 80 ? 'var(--red)' : 'var(--accent)', borderRadius: 4, transition: 'width 0.3s' }} />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Right: form */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="glass" style={{ padding: 20 }}>
          <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14, marginBottom: 16 }}>
            {showForm ? 'إضافة كوبون جديد' : 'إحصائيات الكوبونات'}
          </p>

          {!showForm ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'كوبونات نشطة', value: coupons.length, color: 'var(--green)' },
                { label: 'إجمالي الاستخدامات', value: coupons.reduce((a, c) => a + (c.used || 0), 0), color: 'var(--accent)' },
                { label: 'خصومات ممنوحة', value: '890 ج', color: 'var(--blue)' },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: 10, background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                  <p style={{ fontSize: 13, color: 'var(--text-2)' }}>{s.label}</p>
                  <p className="num" style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.value}</p>
                </div>
              ))}
              <button onClick={() => setShowForm(true)} className="btn-primary" style={{ marginTop: 8, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <Add size={14} /> إضافة كوبون
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 5 }}>كود الخصم</label>
                <div className="flex gap-2">
                  <input type="text" value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value.toUpperCase() }))} placeholder="PROMO20"
                    style={{ ...inputStyle, flex: 1 }}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                  <button onClick={generateCode} style={{ padding: '9px 12px', border: '1px solid var(--border)', borderRadius: 10, fontSize: 12, fontWeight: 600, background: 'transparent', color: 'var(--text-2)', cursor: 'pointer', whiteSpace: 'nowrap' }}>توليد</button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 5 }}>قيمة الخصم</label>
                <div className="flex">
                  <input type="number" value={form.value} onChange={e => setForm(f => ({ ...f, value: e.target.value }))} placeholder="20"
                    style={{ ...inputStyle, flex: 1, borderRadius: '10px 0 0 10px' }}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                  <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} style={{ padding: '9px 10px', border: '1px solid var(--border)', borderRight: 'none', borderRadius: '0 10px 10px 0', background: 'var(--surface-3)', color: 'var(--text-2)', fontSize: 12, outline: 'none' }}>
                    <option value="percent">%</option>
                    <option value="fixed">ج</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 5 }}>أقصى عدد استخدامات</label>
                  <input type="number" value={form.maxUses} onChange={e => setForm(f => ({ ...f, maxUses: e.target.value }))} placeholder="50 (اختياري)"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 5 }}>حد أدنى للطلب (ج)</label>
                  <input type="number" value={form.minOrder} onChange={e => setForm(f => ({ ...f, minOrder: e.target.value }))} placeholder="100 (اختياري)"
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 5 }}>تاريخ الانتهاء</label>
                <input type="date" value={form.expiry} onChange={e => setForm(f => ({ ...f, expiry: e.target.value }))}
                  style={{ ...inputStyle, colorScheme: 'dark' }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              <div className="flex gap-3">
                <button onClick={() => setShowForm(false)} className="btn-ghost" style={{ flex: 1 }}>
                  إلغاء
                </button>
                <button onClick={save} disabled={!form.code || !form.value} className="btn-primary" style={{ flex: 1 }}>
                  حفظ
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Marketing() {
  const [activeTab, setActiveTab] = useState(0)

  const topStats = [
    { label: 'أعضاء الولاء', value: '234', color: 'var(--accent)', mutedBg: 'var(--accent-muted)', icon: People },
    { label: 'رسائل واتساب', value: '1,240', color: '#25D366', mutedBg: 'rgba(37,211,102,0.12)', icon: Message },
    { label: 'كوبونات نشطة', value: '6', color: 'var(--blue)', mutedBg: 'var(--blue-muted)', icon: Tag },
    { label: 'عائد التسويق', value: '8,400 ج', color: 'var(--yellow)', mutedBg: 'var(--yellow-muted)', icon: TrendUp },
  ]

  return (
    <Layout title="التسويق">
      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        {topStats.map(s => {
          const Icon = s.icon
          return (
            <div key={s.label} className="glass glass-interactive animate-fade-in" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-lg)', background: s.mutedBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={16} style={{ color: s.color }} />
                </div>
              </div>
              <p className="num" style={{ fontSize: 26, fontWeight: 800, color: 'var(--text)', lineHeight: 1, letterSpacing: '-0.02em' }}>{s.value}</p>
              <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', marginTop: 6, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{s.label}</p>
            </div>
          )
        })}
      </div>

      {/* Pill-style tab bar */}
      <div style={{ display: 'flex', gap: 6, padding: 4, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', marginBottom: 20, width: 'fit-content' }}>
        {tabs.map(({ label, icon: Icon }, i) => {
          const active = activeTab === i
          return (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                height: 36, padding: '0 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                border: 'none', borderRadius: 'var(--radius-md)',
                background: active ? 'var(--accent)' : 'transparent',
                color: active ? 'white' : 'var(--text-2)',
                transition: 'all 150ms var(--ease-default)',
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--surface-3)' }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
            >
              <Icon size={14} strokeWidth={active ? 2 : 1.5} />
              {label}
            </button>
          )
        })}
      </div>

      {activeTab === 0 && <LoyaltyTab />}
      {activeTab === 1 && <WhatsappTab />}
      {activeTab === 2 && <CouponsTab />}
    </Layout>
  )
}
