import { useState } from 'react'
import { AlertTriangle, Package, TrendingDown, ShoppingCart, Download, Check, X, Edit3 } from 'lucide-react'
import Layout from '../components/layout/Layout'

const initialItems = [
  { id: 1, name: 'دقيق', unit: 'كجم', qty: 45, min: 20, lastUpdated: 'اليوم' },
  { id: 2, name: 'زيت طهي', unit: 'لتر', qty: 8, min: 10, lastUpdated: 'أمس' },
  { id: 3, name: 'دجاج طازج', unit: 'كجم', qty: 12, min: 15, lastUpdated: 'اليوم' },
  { id: 4, name: 'لحم بقري', unit: 'كجم', qty: 7, min: 10, lastUpdated: 'أمس' },
  { id: 5, name: 'طماطم', unit: 'كجم', qty: 20, min: 10, lastUpdated: 'اليوم' },
  { id: 6, name: 'بصل', unit: 'كجم', qty: 30, min: 10, lastUpdated: 'منذ يومين' },
  { id: 7, name: 'أرز', unit: 'كجم', qty: 3, min: 15, lastUpdated: 'منذ 3 أيام' },
  { id: 8, name: 'زبدة', unit: 'علبة', qty: 6, min: 5, lastUpdated: 'أمس' },
  { id: 9, name: 'ملح وبهارات', unit: 'كجم', qty: 15, min: 5, lastUpdated: 'منذ أسبوع' },
  { id: 10, name: 'مياه معدنية', unit: 'كرتون', qty: 4, min: 8, lastUpdated: 'اليوم' },
]

function getStatus(qty, min) {
  if (qty === 0) return { label: 'نفد', bg: 'var(--red-muted)', color: 'var(--red)' }
  if (qty < min) return { label: 'منخفض', bg: 'var(--yellow-muted)', color: 'var(--yellow)' }
  return { label: 'متوفر', bg: 'var(--green-muted)', color: 'var(--green)' }
}

export default function Inventory() {
  const [items, setItems] = useState(initialItems)
  const [editingId, setEditingId] = useState(null)
  const [editQty, setEditQty] = useState('')

  const lowItems = items.filter(i => i.qty < i.min)
  const totalValue = items.reduce((sum, i) => sum + i.qty * 10, 0)
  const outOfStock = items.filter(i => i.qty === 0).length

  function startEdit(item) {
    setEditingId(item.id)
    setEditQty(String(item.qty))
  }

  function saveEdit(id) {
    const newQty = parseInt(editQty)
    if (!isNaN(newQty) && newQty >= 0) {
      setItems(prev => prev.map(i => i.id === id ? { ...i, qty: newQty, lastUpdated: 'الآن' } : i))
    }
    setEditingId(null)
    setEditQty('')
  }

  function cancelEdit() {
    setEditingId(null)
    setEditQty('')
  }

  return (
    <Layout title="المخزون">
      {/* Low stock alert */}
      {lowItems.length > 0 && (
        <div style={{ background: 'var(--red-muted)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 14, padding: '12px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
          <AlertTriangle size={18} style={{ color: 'var(--red)', flexShrink: 0 }} />
          <p style={{ fontWeight: 700, color: 'var(--red)', fontSize: 13 }}>
            {lowItems.length} {lowItems.length === 1 ? 'صنف على وشك النفاد' : 'أصناف على وشك النفاد'} —{' '}
            <span style={{ fontWeight: 400 }}>{lowItems.map(i => i.name).join('، ')}</span>
          </p>
        </div>
      )}

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'إجمالي الأصناف', value: items.length, icon: Package, color: 'var(--accent)' },
          { label: 'قيمة المخزون (تقريبي)', value: `${totalValue.toLocaleString('ar-EG')} ج`, icon: ShoppingCart, color: 'var(--blue)' },
          { label: 'أصناف منخفضة', value: lowItems.length, icon: TrendingDown, color: 'var(--red)' },
          { label: 'طلبات اليوم', value: 3, icon: ShoppingCart, color: 'var(--green)' },
        ].map((s, i) => (
          <div key={i} className="glass" style={{ padding: 20 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: s.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <s.icon size={17} style={{ color: s.color }} />
            </div>
            <p className="num" style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 5 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="glass" style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>قائمة المخزون</p>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', background: 'var(--surface-2)', color: 'var(--text-2)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
            <Download size={13} />
            تصدير
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface-2)' }}>
                {['الصنف', 'الوحدة', 'الكمية الحالية', 'الحد الأدنى', 'الحالة', 'آخر تحديث', 'الإجراءات'].map(h => (
                  <th key={h} style={{ textAlign: 'right', padding: '10px 16px', fontSize: 11, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map(item => {
                const status = getStatus(item.qty, item.min)
                const isEditing = editingId === item.id
                const isLow = item.qty < item.min

                return (
                  <tr key={item.id}
                    style={{ borderBottom: '1px solid var(--border)', background: isLow ? 'rgba(248,113,113,0.03)' : 'transparent', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = isLow ? 'rgba(248,113,113,0.06)' : 'var(--surface-2)'}
                    onMouseLeave={e => e.currentTarget.style.background = isLow ? 'rgba(248,113,113,0.03)' : 'transparent'}
                  >
                    <td style={{ padding: '12px 16px' }}>
                      <div className="flex items-center gap-2">
                        {isLow && <AlertTriangle size={13} style={{ color: 'var(--yellow)', flexShrink: 0 }} />}
                        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{item.name}</p>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--text-2)' }}>{item.unit}</td>
                    <td style={{ padding: '12px 16px' }}>
                      {isEditing ? (
                        <input
                          type="number"
                          value={editQty}
                          onChange={e => setEditQty(e.target.value)}
                          style={{ width: 70, padding: '5px 8px', border: '1px solid var(--accent)', borderRadius: 8, background: 'var(--surface-2)', color: 'var(--text)', fontSize: 13, outline: 'none' }}
                          autoFocus
                          min="0"
                        />
                      ) : (
                        <p className="num" style={{ fontSize: 13, fontWeight: 700, color: item.qty < item.min ? 'var(--red)' : 'var(--text)' }}>
                          {item.qty}
                        </p>
                      )}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span className="num" style={{ fontSize: 12, color: 'var(--text-3)' }}>{item.min}</span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 6, background: status.bg, color: status.color }}>
                        {status.label}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--text-3)' }}>{item.lastUpdated}</td>
                    <td style={{ padding: '12px 16px' }}>
                      {isEditing ? (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => saveEdit(item.id)}
                            style={{ width: 28, height: 28, background: 'var(--green)', color: 'white', borderRadius: 8, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            <Check size={13} />
                          </button>
                          <button
                            onClick={cancelEdit}
                            style={{ width: 28, height: 28, background: 'var(--surface-2)', color: 'var(--text-2)', borderRadius: 8, border: '1px solid var(--border)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            <X size={13} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEdit(item)}
                          style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', background: 'var(--accent-muted)', color: 'var(--accent)', borderRadius: 8, fontSize: 11, fontWeight: 700, border: 'none', cursor: 'pointer' }}
                        >
                          <Edit3 size={12} />
                          تحديث الكمية
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}
