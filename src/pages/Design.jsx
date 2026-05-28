import { useState } from 'react'
import { Plus, Trash2, Edit3, X, Check, Palette, Image, Tag, LayoutTemplate, Smartphone } from 'lucide-react'
import Layout from '../components/layout/Layout'
import {
  getConfig, setConfig,
  getBanners, setBanners,
  getCombos, setCombos,
  getFooterSettings, setFooterSettings,
  getMenuItems, setMenuItems,
  getCategories,
} from '../lib/restaurantStore'

/* ─── Shared helpers ───────────────────────────────────────── */
function Toast({ message }) {
  return (
    <div style={{ position: 'fixed', bottom: 24, left: 24, zIndex: 999, background: 'var(--green)', color: 'white', padding: '10px 18px', borderRadius: 12, fontWeight: 600, fontSize: 13, boxShadow: '0 8px 24px rgba(34,197,94,0.3)' }}>
      {message}
    </div>
  )
}
function useToast() {
  const [toast, setToast] = useState(null)
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2000) }
  return { toast, showToast }
}

const inputStyle = {
  width: '100%', padding: '9px 12px', borderRadius: 10, border: '1px solid var(--border)',
  background: 'var(--surface-2)', color: 'var(--text)', fontSize: 13, outline: 'none',
  fontFamily: 'Cairo, sans-serif', boxSizing: 'border-box', transition: 'border-color 0.15s',
}

function Toggle({ value, onChange }) {
  return (
    <button onClick={() => onChange(!value)} style={{ position: 'relative', width: 40, height: 22, borderRadius: 11, background: value ? 'var(--green)' : 'var(--surface-3)', border: 'none', cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0 }}>
      <span style={{ position: 'absolute', top: 3, width: 16, height: 16, background: 'white', borderRadius: '50%', transition: 'all 0.2s', right: value ? 3 : 'auto', left: value ? 'auto' : 3 }} />
    </button>
  )
}

const tabs = [
  { label: 'اللون والهوية', icon: Palette },
  { label: 'البانرات', icon: Image },
  { label: 'العروض والكومبو', icon: Tag },
  { label: 'الأقسام والمنتجات', icon: LayoutTemplate },
  { label: 'الفوتر', icon: Smartphone },
]

/* ─── Tab 1: Color & Identity ──────────────────────────────── */
const presetColors = [
  { color: '#F97316' }, { color: '#6366F1' }, { color: '#22C55E' }, { color: '#EC4899' },
  { color: '#3B82F6' }, { color: '#EF4444' }, { color: '#F59E0B' }, { color: '#14B8A6' },
]

function ColorTab() {
  const [color, setColor] = useState(() => getConfig().color || '#F97316')
  const { toast, showToast } = useToast()

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="glass" style={{ padding: 24 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>اللون الرئيسي</p>
          <p style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 20 }}>يظهر في الأزرار وعناوين الصفحة وأكواد QR</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 16 }}>
            {presetColors.map(p => (
              <button key={p.color} onClick={() => setColor(p.color)} style={{ height: 44, borderRadius: 12, background: p.color, border: 'none', cursor: 'pointer', outline: color === p.color ? `3px solid ${p.color}` : '3px solid transparent', outlineOffset: 2, transform: color === p.color ? 'scale(1.05)' : 'scale(1)', transition: 'all 0.15s', boxShadow: color === p.color ? `0 4px 12px ${p.color}50` : 'none' }} />
            ))}
          </div>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface-2)' }}>
            <div style={{ width: 20, height: 20, borderRadius: 6, background: color, flexShrink: 0 }} />
            <span style={{ fontSize: 13, fontFamily: 'Inter, monospace', color: 'var(--text)', flex: 1 }}>{color.toUpperCase()}</span>
            <input type="color" value={color} onChange={e => setColor(e.target.value)} style={{ position: 'absolute', inset: 0, opacity: 0, width: '100%', cursor: 'pointer' }} />
          </div>
        </div>
        <div className="glass" style={{ padding: 24 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>اللوجو</p>
          <p style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 16 }}>يظهر في أعلى صفحة المطعم</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 64, height: 64, background: 'var(--surface-2)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, border: '2px dashed var(--border)' }}>🍽️</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button style={{ padding: '7px 16px', border: '1px solid var(--border)', borderRadius: 10, fontSize: 13, fontWeight: 600, color: 'var(--text-2)', background: 'transparent', cursor: 'pointer' }}>رفع لوجو جديد</button>
              <button style={{ padding: '7px 16px', border: '1px solid var(--red-muted)', borderRadius: 10, fontSize: 13, fontWeight: 600, color: 'var(--red)', background: 'transparent', cursor: 'pointer' }}>حذف</button>
            </div>
          </div>
        </div>
        <button onClick={() => { setConfig({ color }); showToast('تم نشر التغييرات ✓') }} style={{ padding: '13px', background: 'var(--accent)', color: 'white', borderRadius: 12, fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer' }}>نشر التغييرات</button>
      </div>

      {/* Live preview */}
      <div className="glass" style={{ padding: 20 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>معاينة مباشرة</p>
        <div style={{ border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ background: color, padding: '16px 14px' }}>
            <p style={{ fontWeight: 800, fontSize: 15, color: 'white' }}>مطعم الشيف أحمد</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>مشويات · التجمع الخامس</p>
            <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
              {['مشويات', 'مشروبات', 'حلويات'].map(c => <div key={c} style={{ padding: '4px 10px', borderRadius: 20, background: 'rgba(255,255,255,0.2)', fontSize: 11, color: 'white', fontWeight: 600 }}>{c}</div>)}
            </div>
          </div>
          <div style={{ background: 'white', padding: 12 }}>
            {[{ n: 'كفتة مشوية', p: 85, b: true }, { n: 'فراخ مشوية', p: 70, b: false }].map(i => (
              <div key={i.n} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #F3F4F6' }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#111' }}>{i.n}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color, fontFamily: 'Inter' }}>{i.p} ج</span>
                  <div style={{ width: 24, height: 24, borderRadius: 7, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 14, fontWeight: 700 }}>+</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: '#F9FAFB', padding: '10px 12px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ padding: '9px 28px', borderRadius: 12, background: color, color: 'white', fontSize: 12, fontWeight: 700 }}>اطلب الآن</div>
          </div>
        </div>
      </div>
      {toast && <Toast message={toast} />}
    </div>
  )
}

/* ─── Tab 2: Banners ───────────────────────────────────────── */
const gradientPresets = [
  ['#F97316', '#EA580C'], ['#8B5CF6', '#7C3AED'], ['#10B981', '#059669'],
  ['#3B82F6', '#1D4ED8'], ['#EC4899', '#BE185D'], ['#F59E0B', '#D97706'],
]

function BannersTab() {
  const [banners, setBannersState] = useState(getBanners)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: '', subtitle: '', color: ['#F97316', '#EA580C'], active: true })
  const { toast, showToast } = useToast()

  const save = () => {
    let next
    if (editing === 'new') {
      next = [...banners, { id: Date.now(), ...form }]
    } else {
      next = banners.map(b => b.id === editing ? { ...b, ...form } : b)
    }
    setBannersState(next); setBanners(next); setEditing(null); showToast('تم الحفظ ✓')
  }

  const remove = (id) => {
    const next = banners.filter(b => b.id !== id)
    setBannersState(next); setBanners(next)
  }

  const toggle = (id) => {
    const next = banners.map(b => b.id === id ? { ...b, active: !b.active } : b)
    setBannersState(next); setBanners(next)
  }

  const startEdit = (b) => {
    setForm({ title: b.title, subtitle: b.subtitle, color: b.color, active: b.active })
    setEditing(b.id)
  }

  const startNew = () => {
    setForm({ title: '', subtitle: '', color: ['#F97316', '#EA580C'], active: true })
    setEditing('new')
  }

  const activeBanners = banners.filter(b => b.active)
  const previewBanner = editing && editing !== 'new'
    ? banners.find(b => b.id === editing)
    : editing === 'new' ? { title: form.title, subtitle: form.subtitle, color: form.color }
    : activeBanners[0] || banners[0]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
      {/* Left: storefront preview */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Hero banner preview (storefront style) */}
        {previewBanner && (
          <div style={{ borderRadius: 16, overflow: 'hidden', background: `linear-gradient(135deg, ${(editing === 'new' ? form.color : previewBanner.color)[0]}, ${(editing === 'new' ? form.color : previewBanner.color)[1]})`, padding: '28px 24px', position: 'relative', minHeight: 140 }}>
            <div style={{ position: 'absolute', top: 12, left: 14, right: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', fontWeight: 600, letterSpacing: '0.05em' }}>معاينة البانر</span>
              <div style={{ display: 'flex', gap: 5 }}>
                {banners.filter(b => b.active).map((b, i) => (
                  <span key={b.id} style={{ width: editing !== 'new' && b.id === editing ? 16 : 6, height: 6, borderRadius: 3, background: editing !== 'new' && b.id === editing ? 'white' : 'rgba(255,255,255,0.4)', transition: 'width 0.2s' }} />
                ))}
              </div>
            </div>
            <p style={{ color: 'white', fontWeight: 800, fontSize: 22, lineHeight: 1.2, marginTop: 16 }}>
              {editing === 'new' ? (form.title || 'عنوان البانر') : previewBanner.title}
            </p>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, marginTop: 8, lineHeight: 1.5 }}>
              {editing === 'new' ? (form.subtitle || 'وصف العرض...') : previewBanner.subtitle}
            </p>
            <button style={{ marginTop: 16, padding: '8px 20px', background: 'white', color: (editing === 'new' ? form.color : previewBanner.color)[0], borderRadius: 20, fontSize: 12, fontWeight: 700, border: 'none', cursor: 'pointer' }}>اطلب الآن</button>
          </div>
        )}

        {/* All banners as mini cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {banners.map(b => (
            <div
              key={b.id}
              onClick={() => startEdit(b)}
              style={{
                borderRadius: 14, overflow: 'hidden', cursor: 'pointer', opacity: b.active ? 1 : 0.45,
                outline: editing === b.id ? `2px solid var(--accent)` : '2px solid transparent',
                outlineOffset: 2, transition: 'all 0.15s',
              }}
            >
              <div style={{ background: `linear-gradient(135deg, ${b.color[0]}, ${b.color[1]})`, padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ flex: 1, minWidth: 0, marginLeft: 10 }}>
                  <p style={{ color: 'white', fontWeight: 700, fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.title}</p>
                  <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11, marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.subtitle}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                  <div onClick={e => { e.stopPropagation(); toggle(b.id) }}>
                    <Toggle value={b.active} onChange={() => toggle(b.id)} />
                  </div>
                  <button onClick={e => { e.stopPropagation(); remove(b.id) }} style={{ padding: 5, borderRadius: 7, background: 'rgba(0,0,0,0.25)', border: 'none', cursor: 'pointer', color: 'white', display: 'flex' }}><Trash2 size={12} /></button>
                </div>
              </div>
            </div>
          ))}
          <button onClick={startNew} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px', border: '2px dashed var(--border)', borderRadius: 12, fontSize: 13, fontWeight: 600, color: 'var(--text-2)', background: 'transparent', cursor: 'pointer', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-2)' }}
          >
            <Plus size={14} /> بانر جديد
          </button>
        </div>
      </div>

      {/* Right: edit form */}
      {editing !== null ? (
        <div className="glass" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>{editing === 'new' ? 'بانر جديد' : 'تعديل البانر'}</p>
            <button onClick={() => setEditing(null)} style={{ padding: 6, borderRadius: 8, background: 'var(--surface-2)', border: 'none', cursor: 'pointer', color: 'var(--text-2)', display: 'flex' }}><X size={13} /></button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 5 }}>العنوان</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} style={inputStyle} placeholder="🔥 عرض اليوم"
                onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 5 }}>الوصف</label>
              <input value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} style={inputStyle} placeholder="تفاصيل العرض..."
                onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 8 }}>لون التدرج</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {gradientPresets.map((g, i) => (
                  <button key={i} onClick={() => setForm({ ...form, color: g })} style={{ height: 40, borderRadius: 10, background: `linear-gradient(135deg, ${g[0]}, ${g[1]})`, border: 'none', cursor: 'pointer', outline: JSON.stringify(form.color) === JSON.stringify(g) ? `2.5px solid var(--text)` : '2.5px solid transparent', outlineOffset: 2, transition: 'all 0.15s' }} />
                ))}
              </div>
            </div>
            <button onClick={save} disabled={!form.title} style={{ padding: '11px', background: form.title ? 'var(--accent)' : 'var(--surface-3)', color: form.title ? 'white' : 'var(--text-3)', borderRadius: 10, fontWeight: 700, fontSize: 13, border: 'none', cursor: form.title ? 'pointer' : 'not-allowed', marginTop: 4 }}>
              حفظ البانر
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 40, border: '2px dashed var(--border)', borderRadius: 16 }}>
          <p style={{ fontSize: 13, color: 'var(--text-3)' }}>اضغط على بانر للتعديل</p>
        </div>
      )}
      {toast && <Toast message={toast} />}
    </div>
  )
}

/* ─── Tab 3: Combos / Offers ───────────────────────────────── */
const EMOJIS = ['🍔', '🥩', '🍗', '🍕', '🌯', '🍝', '🍣', '🥗', '🍽️', '🥤', '🍰', '🍟']

function CombosTab() {
  const [combos, setCombosState] = useState(getCombos)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', items: '', price: '', originalPrice: '', image: '🍔', active: true })
  const { toast, showToast } = useToast()

  const save = () => {
    if (!form.name || !form.price) return
    const entry = { id: editing === 'new' ? Date.now() : editing, ...form, price: Number(form.price), originalPrice: Number(form.originalPrice) }
    const next = editing === 'new' ? [...combos, entry] : combos.map(c => c.id === editing ? entry : c)
    setCombosState(next); setCombos(next); setEditing(null); showToast('تم الحفظ ✓')
  }

  const remove = (id) => { const next = combos.filter(c => c.id !== id); setCombosState(next); setCombos(next) }
  const toggle = (id) => { const next = combos.map(c => c.id === id ? { ...c, active: !c.active } : c); setCombosState(next); setCombos(next) }

  const startEdit = (c) => {
    setForm({ name: c.name, items: c.items, price: String(c.price), originalPrice: String(c.originalPrice), image: c.image, active: c.active })
    setEditing(c.id)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
      {/* List */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>العروض ({combos.length})</p>
          <button onClick={() => { setForm({ name: '', items: '', price: '', originalPrice: '', image: '🍔', active: true }); setEditing('new') }} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', background: 'var(--accent)', color: 'white', borderRadius: 10, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer' }}>
            <Plus size={13} /> عرض جديد
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {combos.map(c => {
            const pct = c.originalPrice ? Math.round((1 - c.price / c.originalPrice) * 100) : 0
            return (
              <div key={c.id} className="glass" style={{ padding: 14, display: 'flex', gap: 12, alignItems: 'center', opacity: c.active ? 1 : 0.5 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0, border: '1px solid var(--border)' }}>{c.image}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', fontFamily: 'Inter' }}>{c.price} ج</span>
                    {c.originalPrice > 0 && <span style={{ fontSize: 10, color: 'var(--text-3)', textDecoration: 'line-through', fontFamily: 'Inter' }}>{c.originalPrice}</span>}
                    {pct > 0 && <span style={{ fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 5, background: 'var(--green-muted)', color: 'var(--green)' }}>خصم {pct}%</span>}
                  </div>
                </div>
                <Toggle value={c.active} onChange={() => toggle(c.id)} />
                <button onClick={() => startEdit(c)} style={{ padding: 6, borderRadius: 8, background: 'var(--surface-2)', border: 'none', cursor: 'pointer', color: 'var(--text-2)', display: 'flex' }}><Edit3 size={13} /></button>
                <button onClick={() => remove(c.id)} style={{ padding: 6, borderRadius: 8, background: 'var(--red-muted)', border: 'none', cursor: 'pointer', color: 'var(--red)', display: 'flex' }}><Trash2 size={13} /></button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Form */}
      {editing !== null ? (
        <div className="glass" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>{editing === 'new' ? 'عرض جديد' : 'تعديل العرض'}</p>
            <button onClick={() => setEditing(null)} style={{ padding: 6, borderRadius: 8, background: 'var(--surface-2)', border: 'none', cursor: 'pointer', color: 'var(--text-2)', display: 'flex' }}><X size={13} /></button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 5 }}>اسم العرض</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} placeholder="كومبو برجر مع عصير"
                onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 5 }}>محتويات العرض</label>
              <input value={form.items} onChange={e => setForm({ ...form, items: e.target.value })} style={inputStyle} placeholder="1 برجر + عصير + بطاطس"
                onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 5 }}>السعر الجديد ج</label>
                <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} style={inputStyle} placeholder="89"
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 5 }}>السعر الأصلي ج</label>
                <input type="number" value={form.originalPrice} onChange={e => setForm({ ...form, originalPrice: e.target.value })} style={inputStyle} placeholder="115"
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 8 }}>أيقونة</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {EMOJIS.map(e => (
                  <button key={e} onClick={() => setForm({ ...form, image: e })} style={{ width: 36, height: 36, borderRadius: 8, fontSize: 18, border: `2px solid ${form.image === e ? 'var(--accent)' : 'var(--border)'}`, background: form.image === e ? 'var(--accent-muted)' : 'var(--surface-2)', cursor: 'pointer', transition: 'all 0.15s' }}>{e}</button>
                ))}
              </div>
            </div>
            {form.name && form.price && (
              <div style={{ padding: '10px 14px', borderRadius: 10, background: 'var(--surface-2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>{form.image}</span>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{form.name}</p>
                  <p style={{ fontSize: 11, color: 'var(--text-3)' }}>{form.items}</p>
                  <p style={{ fontSize: 13, fontWeight: 800, color: 'var(--accent)', fontFamily: 'Inter' }}>{form.price} ج {form.originalPrice && <span style={{ fontSize: 11, color: 'var(--text-3)', textDecoration: 'line-through' }}>{form.originalPrice}</span>}</p>
                </div>
              </div>
            )}
            <button onClick={save} disabled={!form.name || !form.price} style={{ padding: '11px', background: form.name && form.price ? 'var(--accent)' : 'var(--surface-3)', color: form.name && form.price ? 'white' : 'var(--text-3)', borderRadius: 10, fontWeight: 700, fontSize: 13, border: 'none', cursor: form.name && form.price ? 'pointer' : 'not-allowed' }}>
              حفظ العرض
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 40, border: '2px dashed var(--border)', borderRadius: 16 }}>
          <Tag size={28} style={{ color: 'var(--text-3)' }} />
          <p style={{ fontSize: 13, color: 'var(--text-3)' }}>اختر عرضاً للتعديل أو أضف جديداً</p>
        </div>
      )}
      {toast && <Toast message={toast} />}
    </div>
  )
}

/* ─── Tab 4: Categories & Popular ──────────────────────────── */
function CategoriesTab() {
  const [categories] = useState(getCategories)
  const [items, setItemsState] = useState(getMenuItems)
  const { toast, showToast } = useToast()

  const toggleBestseller = (id) => {
    const next = items.map(i => i.id === id ? { ...i, bestseller: !i.bestseller } : i)
    setItemsState(next); setMenuItems(next)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
      {/* Categories */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>الأقسام (التبويبات)</p>
          <a href="/menu" style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>إدارة الأقسام ←</a>
        </div>
        <div className="glass" style={{ overflow: 'hidden' }}>
          {categories.map((cat, i, arr) => (
            <div key={cat.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{cat.name}</p>
              </div>
              <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{items.filter(it => it.categoryId === cat.id).length} أكلة</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 10 }}>لإضافة أو حذف أقسام، اذهب لصفحة إدارة القائمة</p>
      </div>

      {/* Popular slider items */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>الأكثر طلباً (سلايدر)</p>
          <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{items.filter(i => i.bestseller).length} محدد</span>
        </div>
        <div className="glass" style={{ overflow: 'hidden', maxHeight: 420, overflowY: 'auto' }}>
          {items.map((item, i, arr) => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0, border: '1px solid var(--border)' }}>🍽️</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                <p style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700, fontFamily: 'Inter' }}>{item.price} ج</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {item.bestseller && <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 6, background: 'var(--yellow-muted)', color: 'var(--yellow)', fontWeight: 700 }}>🔥 بيستر</span>}
                <Toggle value={!!item.bestseller} onChange={() => toggleBestseller(item.id)} />
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 10 }}>الأصناف المفعّلة تظهر في سلايدر "الأكثر طلباً"</p>
        <button onClick={() => showToast('تم الحفظ ✓')} style={{ marginTop: 10, padding: '10px 20px', background: 'var(--accent)', color: 'white', borderRadius: 10, fontWeight: 600, fontSize: 13, border: 'none', cursor: 'pointer' }}>حفظ التغييرات</button>
      </div>
      {toast && <Toast message={toast} />}
    </div>
  )
}

/* ─── Tab 5: Footer ────────────────────────────────────────── */
function FooterTab() {
  const [settings, setSettings] = useState(getFooterSettings)
  const { toast, showToast } = useToast()

  const update = (key, val) => setSettings(s => ({ ...s, [key]: val }))
  const save = () => { setFooterSettings(settings); showToast('تم الحفظ ✓') }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* App buttons */}
        <div className="glass" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>أزرار التطبيق</p>
              <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>App Store و Google Play</p>
            </div>
            <Toggle value={settings.showAppButtons} onChange={v => update('showAppButtons', v)} />
          </div>
          {settings.showAppButtons && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 5 }}>رابط iOS (App Store)</label>
                <input value={settings.iosUrl} onChange={e => update('iosUrl', e.target.value)} style={inputStyle} placeholder="https://apps.apple.com/..."
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 5 }}>رابط Android (Google Play)</label>
                <input value={settings.androidUrl} onChange={e => update('androidUrl', e.target.value)} style={inputStyle} placeholder="https://play.google.com/..."
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
              </div>
            </div>
          )}
        </div>

        {/* Links */}
        <div className="glass" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>رابط قائمة المطاعم</p>
              <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>زر "قائمة المطاعم" في الفوتر</p>
            </div>
            <Toggle value={settings.showExploreLink} onChange={v => update('showExploreLink', v)} />
          </div>
        </div>

        {/* Text */}
        <div className="glass" style={{ padding: 20 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>نصوص الفوتر</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 5 }}>الشعار الوصفي</label>
              <input value={settings.tagline} onChange={e => update('tagline', e.target.value)} style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 5 }}>نص حقوق الملكية</label>
              <input value={settings.copyright} onChange={e => update('copyright', e.target.value)} style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
            </div>
          </div>
        </div>

        <button onClick={save} style={{ padding: '12px', background: 'var(--accent)', color: 'white', borderRadius: 12, fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer' }}>حفظ إعدادات الفوتر</button>
      </div>

      {/* Preview */}
      <div className="glass" style={{ padding: 20 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>معاينة الفوتر</p>
        <div style={{ background: '#1a1a1a', borderRadius: 14, padding: '20px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: '#F97316', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 900, color: 'white' }}>ر</div>
            <div>
              <p style={{ fontWeight: 800, fontSize: 13, color: 'white' }}>ريڤيو</p>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>{settings.tagline}</p>
            </div>
          </div>
          {settings.showAppButtons && (
            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
              {['🍎 App Store', '🤖 Google Play'].map(l => (
                <div key={l} style={{ flex: 1, padding: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'white', fontWeight: 600 }}>{l}</div>
              ))}
            </div>
          )}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 12, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            {settings.showExploreLink && <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>🗺️ قائمة المطاعم</span>}
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>📞 تواصل معنا</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>❓ المساعدة</span>
          </div>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', textAlign: 'center', marginTop: 12 }}>{settings.copyright}</p>
        </div>
      </div>
      {toast && <Toast message={toast} />}
    </div>
  )
}

/* ─── Main page ────────────────────────────────────────────── */
const tabComponents = [ColorTab, BannersTab, CombosTab, CategoriesTab, FooterTab]

export default function Design() {
  const [activeTab, setActiveTab] = useState(0)
  const TabComponent = tabComponents[activeTab]

  return (
    <Layout title="تصميم الموقع">
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, borderBottom: '1px solid var(--border)', paddingBottom: 0 }}>
        {tabs.map((t, i) => {
          const Icon = t.icon
          const active = activeTab === i
          return (
            <button key={i} onClick={() => setActiveTab(i)} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none', background: 'none', color: active ? 'var(--accent)' : 'var(--text-2)', transition: 'all 0.15s', borderBottom: `2px solid ${active ? 'var(--accent)' : 'transparent'}`, marginBottom: -1 }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'var(--text)' }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--text-2)' }}
            >
              <Icon size={14} />
              {t.label}
            </button>
          )
        })}
      </div>
      <TabComponent />
    </Layout>
  )
}
