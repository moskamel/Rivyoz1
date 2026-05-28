import { useState } from 'react'
import { Plus, MoreVertical, X, GripVertical, Star } from 'lucide-react'
import Layout from '../components/layout/Layout'
import { getMenuItems, setMenuItems, getCategories } from '../lib/restaurantStore'

const inputStyle = {
  width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--border)',
  background: 'var(--surface-2)', color: 'var(--text)', fontSize: 13, outline: 'none',
  fontFamily: 'Cairo, sans-serif', boxSizing: 'border-box', transition: 'border-color 0.15s',
}

export default function Menu() {
  const [categories, setCategories] = useState(getCategories)
  const [items, setItems] = useState(getMenuItems)
  const [activeCategory, setActiveCategory] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [form, setForm] = useState({ name: '', price: '', categoryId: 1, description: '', active: true, bestseller: false })

  const [dragIdx, setDragIdx] = useState(null)
  const [dragOverIdx, setDragOverIdx] = useState(null)

  const filteredItems = items.filter(i => i.categoryId === activeCategory)

  const handleDrop = (dropIdx) => {
    if (dragIdx === null || dragIdx === dropIdx) return
    const reordered = [...filteredItems]
    const [moved] = reordered.splice(dragIdx, 1)
    reordered.splice(dropIdx, 0, moved)
    let catIdx = 0
    const next = items.map(i => i.categoryId === activeCategory ? reordered[catIdx++] : i)
    setItems(next); setMenuItems(next)
    setDragIdx(null); setDragOverIdx(null)
  }

  const toggleActive = (id) => {
    setItems(prev => {
      const next = prev.map(i => i.id === id ? { ...i, active: !i.active } : i)
      setMenuItems(next)
      return next
    })
  }

  const openAdd = () => {
    setForm({ name: '', price: '', categoryId: activeCategory, description: '', active: true, bestseller: false })
    setEditItem(null)
    setShowForm(true)
  }

  const openEdit = (item) => {
    setForm({ name: item.name, price: item.price, categoryId: item.categoryId, description: item.description || '', active: item.active, bestseller: item.bestseller || false })
    setEditItem(item.id)
    setShowForm(true)
  }

  const saveItem = () => {
    if (!form.name || !form.price) return
    if (editItem) {
      setItems(prev => {
        const next = prev.map(i => i.id === editItem ? { ...i, ...form, price: Number(form.price) } : i)
        setMenuItems(next)
        return next
      })
    } else {
      setItems(prev => {
        const newItem = { id: Date.now(), ...form, price: Number(form.price), image: null }
        const next = [...prev, newItem]
        setMenuItems(next)
        return next
      })
    }
    setShowForm(false)
  }

  const deleteItem = (id) => {
    setItems(prev => {
      const next = prev.filter(i => i.id !== id)
      setMenuItems(next)
      return next
    })
  }

  return (
    <Layout title="إدارة القائمة">
      {/* Category tabs + add button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, gap: 12 }}>
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', flexWrap: 'wrap' }}>
          {categories.map(cat => {
            const active = activeCategory === cat.id
            const count = items.filter(i => i.categoryId === cat.id).length
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 10,
                  fontSize: 13, fontWeight: 600, cursor: 'pointer', border: '1px solid', transition: 'all 0.15s', flexShrink: 0,
                  background: active ? 'var(--accent)' : 'var(--surface)',
                  borderColor: active ? 'var(--accent)' : 'var(--border)',
                  color: active ? 'white' : 'var(--text-2)',
                }}
              >
                {cat.name}
                <span style={{
                  fontSize: 11, fontWeight: 700, padding: '1px 6px', borderRadius: 6,
                  background: active ? 'rgba(255,255,255,0.25)' : 'var(--surface-3)',
                  color: active ? 'white' : 'var(--text-3)',
                }}>
                  {count}
                </span>
              </button>
            )
          })}
          <button
            style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 12px', borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: '1px dashed var(--border)', background: 'transparent', color: 'var(--text-3)', flexShrink: 0, transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-3)' }}
          >
            <Plus size={12} /> قسم جديد
          </button>
        </div>
        <button
          onClick={openAdd}
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--accent)', color: 'white', padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', flexShrink: 0 }}
        >
          <Plus size={14} />
          إضافة أكلة
        </button>
      </div>

      {/* Items table */}
      <div>
        <div className="glass" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>
              {categories.find(c => c.id === activeCategory)?.name}
              <span style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 400, marginRight: 8 }}>({filteredItems.length} أكلة)</span>
            </p>
          </div>

            {filteredItems.length === 0 ? (
              <div style={{ padding: 48, textAlign: 'center' }}>
                <p style={{ color: 'var(--text-3)', fontWeight: 500, fontSize: 14 }}>لا توجد أكلات في هذا القسم</p>
                <button onClick={openAdd} style={{ marginTop: 10, color: 'var(--accent)', fontSize: 13, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>إضافة أولى أكلة</button>
              </div>
            ) : (
              filteredItems.map((item, idx) => (
                <div key={item.id}
                  draggable
                  onDragStart={() => setDragIdx(idx)}
                  onDragOver={(e) => { e.preventDefault(); setDragOverIdx(idx) }}
                  onDrop={() => handleDrop(idx)}
                  onDragEnd={() => { setDragIdx(null); setDragOverIdx(null) }}
                  style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 20px', borderBottom: '1px solid var(--border)', transition: 'background 0.15s, opacity 0.15s', background: dragOverIdx === idx && dragIdx !== idx ? 'var(--surface-3)' : 'transparent', opacity: dragIdx === idx ? 0.4 : 1, userSelect: 'none' }}
                  onMouseEnter={e => { if (dragIdx === null) e.currentTarget.style.background = 'var(--surface-2)' }}
                  onMouseLeave={e => { if (dragIdx === null) e.currentTarget.style.background = 'transparent' }}
                >
                  <GripVertical size={15} style={{ color: 'var(--text-3)', cursor: 'grab', flexShrink: 0 }} />
                  <div style={{ width: 38, height: 38, background: 'var(--surface-2)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--border)' }}>
                    <span style={{ fontSize: 18 }}>🍽️</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="flex items-center gap-2">
                      <p style={{ fontWeight: 600, color: 'var(--text)', fontSize: 13 }}>{item.name}</p>
                      {item.bestseller && <Star size={12} style={{ color: 'var(--yellow)', fill: 'var(--yellow)' }} />}
                    </div>
                    <p className="num" style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 700, marginTop: 2 }}>{item.price} ج</p>
                  </div>
                  {/* Toggle */}
                  <button
                    onClick={() => toggleActive(item.id)}
                    style={{ position: 'relative', width: 40, height: 22, borderRadius: 11, background: item.active ? 'var(--green)' : 'var(--surface-3)', border: 'none', cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0 }}
                  >
                    <span style={{ position: 'absolute', top: 3, width: 16, height: 16, background: 'white', borderRadius: '50%', transition: 'all 0.2s', right: item.active ? 3 : 'auto', left: item.active ? 'auto' : 3 }} />
                  </button>
                  <div style={{ position: 'relative' }} className="group">
                    <button style={{ padding: 6, borderRadius: 8, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-3)' }}>
                      <MoreVertical size={15} />
                    </button>
                    <div style={{ position: 'absolute', left: 0, top: 30, background: 'var(--surface-3)', border: '1px solid var(--border-strong)', borderRadius: 10, overflow: 'hidden', zIndex: 10, minWidth: 120, boxShadow: '0 8px 24px rgba(0,0,0,0.4)', display: 'none' }} className="group-hover:!block">
                      <button onClick={() => openEdit(item)} style={{ width: '100%', textAlign: 'right', padding: '8px 14px', fontSize: 13, color: 'var(--text-2)', background: 'transparent', border: 'none', cursor: 'pointer' }}>تعديل</button>
                      <button
                        onClick={() => setItems(prev => { const next = [...prev, { ...item, id: Date.now(), name: item.name + ' (نسخة)' }]; setMenuItems(next); return next })}
                        style={{ width: '100%', textAlign: 'right', padding: '8px 14px', fontSize: 13, color: 'var(--text-2)', background: 'transparent', border: 'none', cursor: 'pointer' }}
                      >نسخ</button>
                      <button onClick={() => deleteItem(item.id)} style={{ width: '100%', textAlign: 'right', padding: '8px 14px', fontSize: 13, color: 'var(--red)', background: 'transparent', border: 'none', cursor: 'pointer' }}>حذف</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      {/* Item form modal */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }} onClick={() => setShowForm(false)}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border-strong)', borderRadius: 20, width: '100%', maxWidth: 420 }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
              <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 16 }}>{editItem ? 'تعديل الأكلة' : 'إضافة أكلة جديدة'}</p>
              <button onClick={() => setShowForm(false)} style={{ width: 28, height: 28, borderRadius: 8, border: 'none', background: 'var(--surface-2)', color: 'var(--text-2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={14} />
              </button>
            </div>
            <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ width: 64, height: 64, background: 'var(--surface-2)', borderRadius: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px dashed var(--border)', gap: 4 }}>
                <Plus size={18} style={{ color: 'var(--text-3)' }} />
                <p style={{ fontSize: 10, color: 'var(--text-3)' }}>صورة</p>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6 }}>اسم الأكلة *</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} placeholder="مثال: كفتة مشوية"
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6 }}>السعر *</label>
                <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} style={inputStyle} placeholder="85"
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6 }}>الوصف</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ ...inputStyle, resize: 'none' }} rows={2} placeholder="وصف مختصر..."
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>الأكلة نشطة</span>
                <button
                  onClick={() => setForm({ ...form, active: !form.active })}
                  style={{ position: 'relative', width: 44, height: 24, borderRadius: 12, background: form.active ? 'var(--green)' : 'var(--surface-3)', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  <span style={{ position: 'absolute', top: 4, width: 16, height: 16, background: 'white', borderRadius: '50%', transition: 'all 0.2s', right: form.active ? 4 : 'auto', left: form.active ? 'auto' : 4 }} />
                </button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>الأكثر مبيعاً ⭐</span>
                <button
                  onClick={() => setForm({ ...form, bestseller: !form.bestseller })}
                  style={{ position: 'relative', width: 44, height: 24, borderRadius: 12, background: form.bestseller ? 'var(--yellow)' : 'var(--surface-3)', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  <span style={{ position: 'absolute', top: 4, width: 16, height: 16, background: 'white', borderRadius: '50%', transition: 'all 0.2s', right: form.bestseller ? 4 : 'auto', left: form.bestseller ? 'auto' : 4 }} />
                </button>
              </div>
              <button
                onClick={saveItem}
                disabled={!form.name || !form.price}
                style={{ padding: '12px', background: form.name && form.price ? 'var(--accent)' : 'var(--surface-2)', color: form.name && form.price ? 'white' : 'var(--text-3)', borderRadius: 12, fontWeight: 600, fontSize: 14, border: 'none', cursor: form.name && form.price ? 'pointer' : 'not-allowed', transition: 'all 0.15s' }}
              >
                حفظ الأكلة
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
