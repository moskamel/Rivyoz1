import { useState } from 'react'
import { Plus, Copy } from 'lucide-react'
import Layout from '../components/layout/Layout'
import { mockCoupons } from '../lib/mock'

const tabs = ['برنامج الولاء', 'حملات واتساب', 'الكوبونات']

const inputStyle = {
  width: '100%', padding: '9px 12px', borderRadius: 10, border: '1px solid var(--border)',
  background: 'var(--surface-2)', color: 'var(--text)', fontSize: 13, outline: 'none',
  fontFamily: 'Cairo, sans-serif', boxSizing: 'border-box',
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

  return (
    <div style={{ maxWidth: 480 }}>
      <div className="glass" style={{ padding: 20, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>برنامج النقاط</p>
            <p style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 3 }}>اكسب ولاء زبائنك بنظام مكافآت</p>
          </div>
          <Toggle value={enabled} onChange={setEnabled} />
        </div>

        {enabled && (
          <div style={{ paddingTop: 16, borderTop: '1px solid var(--border)' }}>
            <div className="flex items-center gap-3" style={{ marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: 'var(--text-2)', whiteSpace: 'nowrap' }}>كل</span>
              <input type="number" value={spendPer} onChange={e => setSpendPer(e.target.value)} style={{ ...inputStyle, width: 64, textAlign: 'center' }} />
              <span style={{ fontSize: 13, color: 'var(--text-2)', whiteSpace: 'nowrap' }}>ج =</span>
              <input type="number" value={pointsPer} onChange={e => setPointsPer(e.target.value)} style={{ ...inputStyle, width: 64, textAlign: 'center' }} />
              <span style={{ fontSize: 13, color: 'var(--text-2)', whiteSpace: 'nowrap' }}>نقطة</span>
            </div>
            <div className="flex items-center gap-3">
              <input type="number" value={redeemAt} onChange={e => setRedeemAt(e.target.value)} style={{ ...inputStyle, width: 80, textAlign: 'center' }} />
              <span style={{ fontSize: 13, color: 'var(--text-2)', whiteSpace: 'nowrap' }}>نقطة = خصم</span>
              <input type="number" value={discountVal} onChange={e => setDiscountVal(e.target.value)} style={{ ...inputStyle, width: 64, textAlign: 'center' }} />
              <span style={{ fontSize: 13, color: 'var(--text-2)' }}>ج</span>
            </div>
          </div>
        )}
      </div>

      {enabled && (
        <div className="glass" style={{ padding: 20, marginBottom: 16 }}>
          <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14, marginBottom: 14 }}>إحصائيات هذا الشهر</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { label: 'أعضاء البرنامج', value: '234' },
              { label: 'نقاط محصودة', value: '12,400' },
              { label: 'خصومات مستخدمة', value: '89 (890 ج)' },
              { label: 'متوسط الطلبات/عضو', value: '3.2 طلب/شهر' },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--surface-2)', borderRadius: 12, padding: '12px 14px', border: '1px solid var(--border)' }}>
                <p className="num" style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)' }}>{s.value}</p>
                <p style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 3 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <button style={{ padding: '11px 24px', background: 'var(--accent)', color: 'white', borderRadius: 10, fontWeight: 600, fontSize: 13, border: 'none', cursor: 'pointer' }}>
        حفظ الإعدادات
      </button>
    </div>
  )
}

function WhatsappTab() {
  const [target, setTarget] = useState('all')
  const [message, setMessage] = useState('عزيزي {الاسم}،\nعندنا عرض خاص النهارده! 🍖')
  const preview = message.replace('{الاسم}', 'أحمد')

  const targets = [
    { key: 'all', label: 'كل الزبائن', count: 234 },
    { key: 'inactive', label: 'لم يطلبوا منذ 7 أيام', count: 45 },
    { key: 'top', label: 'الأكثر طلباً (فوق 5 طلبات)', count: 28 },
  ]

  return (
    <div style={{ maxWidth: 480 }}>
      <div className="glass" style={{ padding: 20, marginBottom: 16 }}>
        <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14, marginBottom: 12 }}>المستهدفون</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {targets.map(t => (
            <button
              key={t.key}
              onClick={() => setTarget(t.key)}
              style={{
                width: '100%', textAlign: 'right', padding: '10px 14px', borderRadius: 10, fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'all 0.15s',
                border: `1px solid ${target === t.key ? 'var(--accent)' : 'var(--border)'}`,
                background: target === t.key ? 'var(--accent-muted)' : 'transparent',
                color: target === t.key ? 'var(--accent)' : 'var(--text-2)',
              }}
            >
              <span>{t.label}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)' }}>{t.count} شخص</span>
            </button>
          ))}
        </div>
      </div>

      <div className="glass" style={{ padding: 20, marginBottom: 16 }}>
        <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14, marginBottom: 10 }}>الرسالة</p>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          style={{ ...inputStyle, resize: 'none' }}
          rows={4}
          placeholder="اكتب رسالتك..."
          onFocus={e => e.target.style.borderColor = 'var(--accent)'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />
        <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 6 }}>المتغيرات المتاحة: &#123;الاسم&#125; &#123;آخر_طلب&#125;</p>
        {preview && (
          <div style={{ marginTop: 12, background: 'var(--green-muted)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 10, padding: 12 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--green)', marginBottom: 4 }}>معاينة</p>
            <p style={{ fontSize: 13, color: 'var(--text)', whiteSpace: 'pre-wrap' }}>{preview}</p>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button style={{ flex: 1, padding: '11px', border: '1px solid var(--border)', color: 'var(--text-2)', borderRadius: 10, fontWeight: 600, fontSize: 13, background: 'transparent', cursor: 'pointer' }}>
          جدولة لوقت معين
        </button>
        <button style={{ flex: 1, padding: '11px', background: 'var(--green)', color: 'white', borderRadius: 10, fontWeight: 600, fontSize: 13, border: 'none', cursor: 'pointer' }}>
          إرسال الآن
        </button>
      </div>
    </div>
  )
}

function CouponsTab() {
  const [coupons, setCoupons] = useState(mockCoupons)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ code: '', type: 'percent', value: '', maxUses: '', minOrder: '' })

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    setForm({ ...form, code: Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('') })
  }

  const save = () => {
    if (!form.code || !form.value) return
    setCoupons(prev => [...prev, { id: Date.now(), code: form.code, discount: form.type === 'percent' ? `${form.value}%` : `${form.value} ج`, used: 0, max: form.maxUses || null, expiry: null }])
    setShowForm(false)
    setForm({ code: '', type: 'percent', value: '', maxUses: '', minOrder: '' })
  }

  return (
    <div style={{ maxWidth: 560 }}>
      <div className="glass" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>الكوبونات</p>
          <button onClick={() => setShowForm(!showForm)} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--accent)', color: 'white', padding: '7px 14px', borderRadius: 10, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer' }}>
            <Plus size={14} /> كوبون جديد
          </button>
        </div>

        {showForm && (
          <div style={{ padding: 16, borderBottom: '1px solid var(--border)', background: 'var(--surface-2)' }}>
            <div className="flex gap-3 mb-3">
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 5 }}>كود الخصم</label>
                <div className="flex gap-2">
                  <input type="text" value={form.code} onChange={e => setForm({ ...form, code: e.target.value.toUpperCase() })} placeholder="PROMO20" style={{ ...inputStyle, flex: 1 }}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                  <button onClick={generateCode} style={{ padding: '9px 12px', border: '1px solid var(--border)', borderRadius: 10, fontSize: 12, fontWeight: 600, background: 'transparent', color: 'var(--text-2)', cursor: 'pointer', whiteSpace: 'nowrap' }}>توليد</button>
                </div>
              </div>
              <div style={{ width: 120 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 5 }}>القيمة</label>
                <div className="flex">
                  <input type="number" value={form.value} onChange={e => setForm({ ...form, value: e.target.value })} placeholder="20" style={{ ...inputStyle, flex: 1, borderRadius: '10px 0 0 10px' }} />
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} style={{ padding: '9px 8px', border: '1px solid var(--border)', borderRight: 'none', borderRadius: '0 10px 10px 0', background: 'var(--surface-3)', color: 'var(--text-2)', fontSize: 12, outline: 'none' }}>
                    <option value="percent">%</option>
                    <option value="fixed">ج</option>
                  </select>
                </div>
              </div>
            </div>
            <button onClick={save} disabled={!form.code || !form.value} style={{ width: '100%', padding: '10px', background: form.code && form.value ? 'var(--accent)' : 'var(--surface-3)', color: form.code && form.value ? 'white' : 'var(--text-3)', borderRadius: 10, fontSize: 13, fontWeight: 600, border: 'none', cursor: form.code && form.value ? 'pointer' : 'not-allowed' }}>
              حفظ الكوبون
            </button>
          </div>
        )}

        {coupons.map((c, i) => (
          <div key={c.id} style={{ display: 'flex', alignItems: 'center', padding: '12px 20px', gap: 12, borderBottom: i < coupons.length - 1 ? '1px solid var(--border)' : 'none', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <button className="flex items-center gap-2" style={{ fontFamily: 'Inter, monospace', fontWeight: 700, fontSize: 14, color: 'var(--text)', background: 'none', border: 'none', cursor: 'pointer' }}>
              {c.code}
              <Copy size={12} style={{ color: 'var(--text-3)' }} />
            </button>
            <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 6, background: 'var(--accent-muted)', color: 'var(--accent)' }}>{c.discount}</span>
            <span style={{ fontSize: 12, color: 'var(--text-3)', marginRight: 'auto' }}>
              {c.used}{c.max ? `/${c.max}` : ''} استخدام
            </span>
            {c.expiry && <span style={{ fontSize: 11, color: 'var(--text-3)' }}>ينتهي {c.expiry}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Marketing() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <Layout title="التسويق">
      <div className="flex gap-2 mb-6">
        {tabs.map((t, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            style={{
              padding: '7px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: '1px solid', transition: 'all 0.15s',
              background: activeTab === i ? 'var(--accent)' : 'var(--surface)',
              borderColor: activeTab === i ? 'var(--accent)' : 'var(--border)',
              color: activeTab === i ? 'white' : 'var(--text-2)',
            }}
          >
            {t}
          </button>
        ))}
      </div>
      {activeTab === 0 && <LoyaltyTab />}
      {activeTab === 1 && <WhatsappTab />}
      {activeTab === 2 && <CouponsTab />}
    </Layout>
  )
}
