import { useState } from 'react'
import Layout from '../components/layout/Layout'
import { getConfig, setConfig } from '../lib/restaurantStore'

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

const presetColors = [
  { color: '#F97316', label: 'برتقالي' },
  { color: '#6366F1', label: 'بنفسجي' },
  { color: '#22C55E', label: 'أخضر' },
  { color: '#EC4899', label: 'وردي' },
  { color: '#3B82F6', label: 'أزرق' },
  { color: '#EF4444', label: 'أحمر' },
  { color: '#F59E0B', label: 'ذهبي' },
  { color: '#14B8A6', label: 'تيل' },
]

export default function Design() {
  const [color, setColor] = useState(() => getConfig().color || '#F97316')
  const { toast, showToast } = useToast()

  const handlePublish = () => {
    setConfig({ color })
    showToast('تم نشر التغييرات ✓')
  }

  return (
    <Layout title="تصميم الموقع">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Color picker */}
          <div className="glass" style={{ padding: 24 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>اللون الرئيسي</p>
            <p style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 20 }}>يظهر في الأزرار وعناوين الصفحة وأكواد QR</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 16 }}>
              {presetColors.map(p => (
                <button
                  key={p.color}
                  onClick={() => setColor(p.color)}
                  title={p.label}
                  style={{
                    height: 44, borderRadius: 12, background: p.color, border: 'none', cursor: 'pointer',
                    outline: color === p.color ? `3px solid ${p.color}` : '3px solid transparent',
                    outlineOffset: 2,
                    transform: color === p.color ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.15s',
                    boxShadow: color === p.color ? `0 4px 12px ${p.color}50` : 'none',
                  }}
                />
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <label style={{ fontSize: 12, color: 'var(--text-2)', fontWeight: 600 }}>لون مخصص</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface-2)', flex: 1 }}>
                <div style={{ width: 20, height: 20, borderRadius: 6, background: color, flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontFamily: 'Inter, monospace', color: 'var(--text)', flex: 1 }}>{color.toUpperCase()}</span>
                <input
                  type="color"
                  value={color}
                  onChange={e => setColor(e.target.value)}
                  style={{ position: 'absolute', inset: 0, opacity: 0, width: '100%', cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>

          {/* Logo */}
          <div className="glass" style={{ padding: 24 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>اللوجو</p>
            <p style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 16 }}>يظهر في أعلى صفحة المطعم وعلى القائمة</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 72, height: 72, background: 'var(--surface-2)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, border: '2px dashed var(--border)' }}>
                🍽️
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button style={{ padding: '8px 18px', border: '1px solid var(--border)', borderRadius: 10, fontSize: 13, fontWeight: 600, color: 'var(--text-2)', background: 'transparent', cursor: 'pointer' }}>
                  رفع لوجو جديد
                </button>
                <button style={{ padding: '8px 18px', border: '1px solid var(--red-muted)', borderRadius: 10, fontSize: 13, fontWeight: 600, color: 'var(--red)', background: 'transparent', cursor: 'pointer' }}>
                  حذف اللوجو
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handlePublish}
            style={{ padding: '13px', background: 'var(--accent)', color: 'white', borderRadius: 12, fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', boxShadow: `0 4px 16px ${color}40`, transition: 'all 0.15s' }}
          >
            نشر التغييرات
          </button>
        </div>

        {/* Live preview */}
        <div className="glass" style={{ padding: 24 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>معاينة مباشرة</p>
          <div style={{ border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
            {/* Mock storefront header */}
            <div style={{ background: color, padding: '20px 20px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                  🍽️
                </div>
                <div>
                  <p style={{ fontWeight: 800, fontSize: 16, color: 'white' }}>مطعم الشيف أحمد</p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', marginTop: 2 }}>مشويات · التجمع الخامس</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {['مشويات', 'مشروبات', 'حلويات'].map(c => (
                  <div key={c} style={{ padding: '5px 12px', borderRadius: 20, background: 'rgba(255,255,255,0.2)', fontSize: 12, color: 'white', fontWeight: 600 }}>{c}</div>
                ))}
              </div>
            </div>
            {/* Mock items */}
            <div style={{ padding: 16, background: '#fff' }}>
              {[
                { name: 'كفتة مشوية', price: 85, bestseller: true },
                { name: 'فراخ مشوية', price: 70, bestseller: false },
                { name: 'لحم مشوي', price: 110, bestseller: false },
              ].map(item => (
                <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F3F4F6' }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{item.name}</p>
                    {item.bestseller && <p style={{ fontSize: 10, color: color, fontWeight: 700, marginTop: 2 }}>⭐ الأكثر طلباً</p>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: color, fontFamily: 'Inter' }}>{item.price} ج</span>
                    <div style={{ width: 26, height: 26, borderRadius: 8, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 16, fontWeight: 700 }}>+</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Mock footer */}
            <div style={{ padding: '12px 16px', background: '#F9FAFB', display: 'flex', justifyContent: 'center' }}>
              <div style={{ padding: '10px 24px', borderRadius: 12, background: color, color: 'white', fontSize: 13, fontWeight: 700 }}>
                اطلب الآن
              </div>
            </div>
          </div>
          <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 12, textAlign: 'center' }}>
            منصة.com/مطعم-الشيف-أحمد
          </p>
        </div>
      </div>

      {toast && <Toast message={toast} />}
    </Layout>
  )
}
