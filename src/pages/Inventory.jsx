import { useState } from 'react'
import { Warning2, Box, TrendDown, CloseCircle, SearchNormal1, Add, Check, Edit2 } from 'iconsax-react'
import Layout from '../components/layout/Layout'

const initialItems = [
  { id: 1,  name: 'دقيق',         unit: 'كجم',    qty: 45, min: 20, lastUpdated: 'اليوم'       },
  { id: 2,  name: 'زيت طهي',      unit: 'لتر',    qty: 8,  min: 10, lastUpdated: 'أمس'         },
  { id: 3,  name: 'دجاج طازج',    unit: 'كجم',    qty: 12, min: 15, lastUpdated: 'اليوم'       },
  { id: 4,  name: 'لحم بقري',     unit: 'كجم',    qty: 7,  min: 10, lastUpdated: 'أمس'         },
  { id: 5,  name: 'طماطم',        unit: 'كجم',    qty: 20, min: 10, lastUpdated: 'اليوم'       },
  { id: 6,  name: 'بصل',          unit: 'كجم',    qty: 30, min: 10, lastUpdated: 'منذ يومين'   },
  { id: 7,  name: 'أرز',          unit: 'كجم',    qty: 3,  min: 15, lastUpdated: 'منذ 3 أيام'  },
  { id: 8,  name: 'زبدة',         unit: 'علبة',   qty: 6,  min: 5,  lastUpdated: 'أمس'         },
  { id: 9,  name: 'ملح وبهارات',  unit: 'كجم',    qty: 15, min: 5,  lastUpdated: 'منذ أسبوع'   },
  { id: 10, name: 'مياه معدنية',  unit: 'كرتون',  qty: 4,  min: 8,  lastUpdated: 'اليوم'       },
]

function getStatus(qty, min) {
  if (qty === 0)    return { label: 'نفذ',    badgeClass: 'badge-red',    qtyColor: 'var(--red)'    }
  if (qty < min)    return { label: 'منخفض',  badgeClass: 'badge-yellow', qtyColor: 'var(--yellow)' }
  return              { label: 'متاح',   badgeClass: 'badge-green',  qtyColor: qty > 20 ? 'var(--green)' : 'var(--text)' }
}

const modalInputStyle = {
  width: '100%', height: 42, padding: '0 12px',
  borderRadius: 'var(--radius-md)', border: '1px solid var(--border)',
  background: 'var(--surface-2)', color: 'var(--text)',
  fontSize: 13, outline: 'none',
  fontFamily: 'Zain, sans-serif', boxSizing: 'border-box',
  transition: 'border-color var(--dur-normal) ease, box-shadow var(--dur-normal) ease',
}

function ItemModal({ item, onClose, onSave }) {
  const [form, setForm] = useState(
    item
      ? { name: item.name, unit: item.unit, qty: String(item.qty), min: String(item.min) }
      : { name: '', unit: 'كجم', qty: '', min: '' }
  )

  function handleSubmit(e) {
    e.preventDefault()
    const qty = parseInt(form.qty)
    const min = parseInt(form.min)
    if (isNaN(qty) || isNaN(min) || qty < 0 || min < 0) return
    onSave({
      id: item ? item.id : Date.now(),
      name: form.name,
      unit: form.unit,
      qty,
      min,
      lastUpdated: 'الآن',
    })
    onClose()
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 50, padding: 16,
      }}
      dir="rtl"
      className="animate-fade-in"
    >
      <div
        className="glass animate-scale-in"
        style={{
          width: '100%', maxWidth: 400,
          borderRadius: 'var(--radius-2xl)',
          border: '1px solid var(--border-strong)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 20px', borderBottom: '1px solid var(--border)',
        }}>
          <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 16 }}>
            {item ? 'تعديل الصنف' : 'إضافة صنف جديد'}
          </p>
          <button className="btn-icon md" onClick={onClose}>
            <CloseCircle size={14} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { label: 'اسم الصنف',   key: 'name', type: 'text',   placeholder: 'مثال: دقيق'  },
            { label: 'الوحدة',      key: 'unit', type: 'text',   placeholder: 'كجم / لتر / علبة' },
            { label: 'الكمية الحالية', key: 'qty', type: 'number', placeholder: '0' },
            { label: 'الحد الأدنى', key: 'min', type: 'number', placeholder: '0' },
          ].map(f => (
            <div key={f.key}>
              <label style={{
                display: 'block', fontSize: 11, fontWeight: 600,
                color: 'var(--text-2)', marginBottom: 6,
                textTransform: 'uppercase', letterSpacing: '0.04em',
              }}>
                {f.label}
              </label>
              <input
                required
                type={f.type}
                value={form[f.key]}
                onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                placeholder={f.placeholder}
                min={f.type === 'number' ? '0' : undefined}
                style={modalInputStyle}
                onFocus={e => {
                  e.target.style.borderColor = 'var(--accent)'
                  e.target.style.boxShadow = '0 0 0 3px var(--accent-muted)'
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'var(--border)'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>
          ))}

          <div style={{ display: 'flex', gap: 10, paddingTop: 4 }}>
            <button type="button" onClick={onClose} className="btn-ghost" style={{ flex: 1, height: 44 }}>
              إلغاء
            </button>
            <button type="submit" className="btn-primary" style={{ flex: 1, height: 44 }}>
              {item ? 'حفظ التعديلات' : 'إضافة الصنف'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Inventory() {
  const [items, setItems] = useState(initialItems)
  const [search, setSearch]       = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editQty, setEditQty]     = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editItem, setEditItem]   = useState(null)

  const lowItems   = items.filter(i => i.qty > 0 && i.qty < i.min)
  const outItems   = items.filter(i => i.qty === 0)

  const filtered = items.filter(i =>
    i.name.includes(search) || i.unit.includes(search)
  )

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

  function handleSaveModal(saved) {
    setItems(prev => {
      const exists = prev.find(i => i.id === saved.id)
      return exists
        ? prev.map(i => i.id === saved.id ? saved : i)
        : [...prev, saved]
    })
  }

  return (
    <Layout title="المخزون">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--text-2)' }}>
          إجمالي{' '}
          <span className="num" style={{ color: 'var(--text)', fontWeight: 700 }}>{items.length}</span>{' '}
          صنف
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* SearchNormal1 */}
          <div style={{ position: 'relative' }}>
            <SearchNormal1
              size={14}
              style={{
                position: 'absolute', right: 13, top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-3)', pointerEvents: 'none',
              }}
            />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="ابحث في المخزون..."
              style={{
                height: 40, width: 220,
                background: 'var(--surface-2)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)', padding: '0 40px 0 14px',
                fontSize: 13, color: 'var(--text)', outline: 'none',
                fontFamily: 'Zain, sans-serif',
                transition: 'border-color var(--dur-normal) ease, box-shadow var(--dur-normal) ease',
              }}
              onFocus={e => {
                e.target.style.borderColor = 'var(--accent)'
                e.target.style.boxShadow = '0 0 0 3px var(--accent-muted)'
              }}
              onBlur={e => {
                e.target.style.borderColor = 'var(--border)'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>
          <button className="btn-primary" onClick={() => { setEditItem(null); setShowModal(true) }}>
            <Add size={15} />
            إضافة صنف
          </button>
        </div>
      </div>

      {/* Low stock alert banner */}
      {(lowItems.length > 0 || outItems.length > 0) && (
        <div style={{
          background: 'rgba(248,113,113,0.08)',
          border: '1px solid rgba(248,113,113,0.20)',
          borderRadius: 'var(--radius-lg)',
          padding: '12px 16px', marginBottom: 16,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <Warning2 size={17} style={{ color: 'var(--red)', flexShrink: 0 }} />
          <p style={{ fontSize: 13, color: 'var(--text-2)', flex: 1 }}>
            <span style={{ fontWeight: 700, color: 'var(--red)' }}>
              {lowItems.length + outItems.length}
            </span>
            {' '}
            {lowItems.length + outItems.length === 1 ? 'صنف' : 'أصناف'} تحتاج انتباهاً —{' '}
            <span style={{ color: 'var(--text-3)', fontSize: 12 }}>
              {[...lowItems, ...outItems].map(i => i.name).join('، ')}
            </span>
          </p>
        </div>
      )}

      {/* Summary cards */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        {[
          { label: 'إجمالي الأصناف',   value: items.length,              icon: Box,      color: 'var(--accent)', muted: 'var(--accent-muted)' },
          { label: 'مخزون منخفض',      value: lowItems.length,           icon: TrendDown, color: 'var(--yellow)', muted: 'var(--yellow-muted)' },
          { label: 'نفذ المخزون',      value: outItems.length,           icon: CloseCircle,      color: 'var(--red)',    muted: 'var(--red-muted)'    },
        ].map((s, i) => (
          <div key={i} className="glass" style={{ flex: 1, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: s.muted,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <s.icon size={15} style={{ color: s.color }} />
            </div>
            <div>
              <p className="num" style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Inventory table */}
      <div className="glass" style={{ overflow: 'hidden' }}>
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <p className="empty-title">المخزون فارغ</p>
            <p className="empty-desc">لم يتم العثور على أصناف تطابق بحثك، أو أضف أول صنف للبدء</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="table-base">
              <thead>
                <tr>
                  {['الصنف', 'الكمية', 'الوحدة', 'الحد الأدنى', 'الحالة', 'آخر تحديث', 'إجراء'].map(h => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="stagger">
                {filtered.map(item => {
                  const status    = getStatus(item.qty, item.min)
                  const isEditing = editingId === item.id
                  const isLow     = item.qty < item.min

                  return (
                    <tr
                      key={item.id}
                      style={{
                        borderBottom: '1px solid var(--border)',
                        background: isLow && item.qty > 0
                          ? 'rgba(251,191,36,0.03)'
                          : item.qty === 0
                          ? 'rgba(248,113,113,0.03)'
                          : 'transparent',
                        transition: 'background var(--dur-fast) ease',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
                      onMouseLeave={e => e.currentTarget.style.background =
                        isLow && item.qty > 0
                          ? 'rgba(251,191,36,0.03)'
                          : item.qty === 0
                          ? 'rgba(248,113,113,0.03)'
                          : 'transparent'
                      }
                    >
                      {/* Name */}
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{item.name}</p>
                          {isLow && (
                            <Warning2
                              size={13}
                              style={{ color: item.qty === 0 ? 'var(--red)' : 'var(--yellow)', flexShrink: 0 }}
                            />
                          )}
                        </div>
                      </td>

                      {/* Qty */}
                      <td style={{ padding: '12px 16px' }}>
                        {isEditing ? (
                          <input
                            type="number"
                            value={editQty}
                            onChange={e => setEditQty(e.target.value)}
                            style={{
                              width: 70, padding: '5px 8px',
                              border: '1px solid var(--accent)',
                              borderRadius: 8, background: 'var(--surface-2)',
                              color: 'var(--text)', fontSize: 13, outline: 'none',
                            }}
                            autoFocus
                            min="0"
                          />
                        ) : (
                          <span
                            className="num"
                            style={{ fontSize: 13, fontWeight: 700, color: status.qtyColor }}
                          >
                            {item.qty}
                          </span>
                        )}
                      </td>

                      {/* Unit */}
                      <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--text-3)' }}>
                        {item.unit}
                      </td>

                      {/* Min */}
                      <td style={{ padding: '12px 16px' }}>
                        <span className="num" style={{ fontSize: 12, color: 'var(--text-3)' }}>{item.min}</span>
                      </td>

                      {/* Status */}
                      <td style={{ padding: '12px 16px' }}>
                        <span className={`badge badge-pill ${status.badgeClass}`}>{status.label}</span>
                      </td>

                      {/* Last updated */}
                      <td style={{ padding: '12px 16px', fontSize: 11, color: 'var(--text-3)' }}>
                        {item.lastUpdated}
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '12px 16px' }}>
                        {isEditing ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <button
                              onClick={() => saveEdit(item.id)}
                              style={{
                                width: 28, height: 28,
                                background: 'var(--green-muted)', color: 'var(--green)',
                                borderRadius: 8, border: '1px solid rgba(34,197,94,0.25)',
                                cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                              }}
                            >
                              <Check size={13} />
                            </button>
                            <button
                              onClick={cancelEdit}
                              style={{
                                width: 28, height: 28,
                                background: 'var(--surface-2)', color: 'var(--text-2)',
                                borderRadius: 8, border: '1px solid var(--border)',
                                cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                              }}
                            >
                              <CloseCircle size={13} />
                            </button>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <button
                              className="btn-icon sm"
                              onClick={() => startEdit(item)}
                              title="تحديث الكمية"
                            >
                              <Edit2 size={13} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <ItemModal
          item={editItem}
          onClose={() => { setShowModal(false); setEditItem(null) }}
          onSave={handleSaveModal}
        />
      )}
    </Layout>
  )
}
