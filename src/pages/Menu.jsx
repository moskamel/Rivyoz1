import { useState, useEffect, useRef } from 'react'
import { Plus, MoreVertical, X, GripVertical, Star } from 'lucide-react'
import Layout from '../components/layout/Layout'
import { getMenuItems, setMenuItems, getCategories } from '../lib/restaurantStore'

const inputStyle = {
  width: '100%', padding: '10px 14px', borderRadius: 'var(--radius)', border: '1px solid var(--border)',
  background: 'var(--surface-2)', color: 'var(--text)', fontSize: 13, outline: 'none',
  fontFamily: 'Cairo, sans-serif', boxSizing: 'border-box',
  transition: 'border-color var(--dur-normal) var(--ease-default), box-shadow var(--dur-normal) var(--ease-default)',
}

export default function Menu() {
  const [categories, setCategories] = useState(getCategories)
  const [items, setItems] = useState(getMenuItems)
  const [activeCategory, setActiveCategory] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [form, setForm] = useState({ name: '', price: '', categoryId: 1, description: '', active: true, bestseller: false })
  const [openMenuId, setOpenMenuId] = useState(null)
  const menuRef = useRef(null)

  useEffect(() => {
    function handleOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpenMenuId(null)
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

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
      <div className="animate-fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, gap: 12 }}>
        <div className="no-scrollbar" style={{ display: 'flex', gap: 6, overflowX: 'auto' }}>
          {categories.map(cat => {
            const active = activeCategory === cat.id
            const count = items.filter(i => i.categoryId === cat.id).length
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '6px 14px', borderRadius: 'var(--radius-full)',
                  fontSize: 13, fontWeight: 600, cursor: 'pointer', border: '1px solid',
                  transition: 'all 0.15s var(--ease-default)', flexShrink: 0,
                  background: active ? 'var(--accent)' : 'var(--surface-2)',
                  borderColor: active ? 'var(--accent)' : 'var(--border)',
                  color: active ? 'white' : 'var(--text-2)',
                  boxShadow: active ? 'var(--shadow-accent-sm)' : 'none',
                }}
              >
                {cat.name}
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 'var(--radius-full)',
                  background: active ? 'rgba(255,255,255,0.25)' : 'var(--surface-4)',
                  color: active ? 'white' : 'var(--text-3)',
                }}>
                  {count}
                </span>
              </button>
            )
          })}
          <button
            style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 'var(--radius-full)', fontSize: 12, fontWeight: 600, cursor: 'pointer', border: '1px dashed var(--border)', background: 'transparent', color: 'var(--text-3)', flexShrink: 0, transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-3)' }}
          >
            <Plus size={12} /> قسم جديد
          </button>
        </div>
        <button onClick={openAdd} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <Plus size={14} />
          إضافة أكلة
        </button>
      </div>

      {/* Items table */}
      <div className="animate-slide-up">
        <div className="glass" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>
              {categories.find(c => c.id === activeCategory)?.name}
              <span style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 400, marginRight: 8 }}>({filteredItems.length} أكلة)</span>
            </p>
            <span style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 500 }}>اسحب للترتيب</span>
          </div>

          {filteredItems.length === 0 ? (
            <div className="empty-state" style={{ padding: '48px 24px' }}>
              <div className="empty-icon">🍽️</div>
              <p className="empty-title">لا توجد أكلات في هذا القسم</p>
              <p className="empty-desc">أضف أول أكلة لتظهر هنا</p>
              <button onClick={openAdd} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '12px auto 0' }}>
                <Plus size={14} /> إضافة أكلة
              </button>
            </div>
          ) : (
            <div className="stagger">
              {filteredItems.map((item, idx) => (
                <div key={item.id}
                  draggable
                  onDragStart={() => setDragIdx(idx)}
                  onDragOver={(e) => { e.preventDefault(); setDragOverIdx(idx) }}
                  onDrop={() => handleDrop(idx)}
                  onDragEnd={() => { setDragIdx(null); setDragOverIdx(null) }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14, padding: '12px 20px',
                    borderBottom: idx < filteredItems.length - 1 ? '1px solid var(--border)' : 'none',
                    transition: 'background var(--dur-fast) ease, opacity 0.15s',
                    background: dragOverIdx === idx && dragIdx !== idx ? 'var(--surface-3)' : 'transparent',
                    opacity: dragIdx === idx ? 0.4 : 1, userSelect: 'none',
                    borderRight: dragOverIdx === idx && dragIdx !== idx ? '2px solid var(--accent)' : '2px solid transparent',
                  }}
                  onMouseEnter={e => { if (dragIdx === null) e.currentTarget.style.background = 'var(--surface-2)' }}
                  onMouseLeave={e => { if (dragIdx === null) e.currentTarget.style.background = 'transparent' }}
                >
                  <GripVertical size={15} style={{ color: 'var(--text-3)', cursor: 'grab', flexShrink: 0 }} />
                  <div style={{ width: 40, height: 40, background: 'var(--surface-2)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--border)' }}>
                    <span style={{ fontSize: 18 }}>🍽️</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <p style={{ fontWeight: 600, color: item.active ? 'var(--text)' : 'var(--text-3)', fontSize: 13 }}>{item.name}</p>
                      {item.bestseller && <Star size={11} style={{ color: 'var(--yellow)', fill: 'var(--yellow)', flexShrink: 0 }} />}
                      {!item.active && <span className="badge badge-pill badge-sm badge-default">متوقف</span>}
                    </div>
                    {item.description && (
                      <p className="truncate-1" style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{item.description}</p>
                    )}
                    <p className="num" style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 700, marginTop: 2 }}>{item.price} ج</p>
                  </div>
                  {/* Active toggle */}
                  <button
                    onClick={() => toggleActive(item.id)}
                    title={item.active ? 'إيقاف' : 'تفعيل'}
                    style={{ position: 'relative', width: 40, height: 22, borderRadius: 11, background: item.active ? 'var(--green)' : 'var(--surface-3)', border: 'none', cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0 }}
                  >
                    <span style={{ position: 'absolute', top: 3, width: 16, height: 16, background: 'white', borderRadius: '50%', transition: 'all 0.2s', right: item.active ? 3 : 'auto', left: item.active ? 'auto' : 3 }} />
                  </button>
                  <div style={{ position: 'relative' }} ref={openMenuId === item.id ? menuRef : null}>
                    <button
                      onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === item.id ? null : item.id) }}
                      className="btn-icon sm"
                      style={{ background: openMenuId === item.id ? 'var(--surface-2)' : 'transparent', border: 'none', color: 'var(--text-3)' }}
                    >
                      <MoreVertical size={15} />
                    </button>
                    {openMenuId === item.id && (
                      <div style={{ position: 'absolute', left: 0, top: 36, background: 'var(--surface-3)', border: '1px solid var(--border-strong)', borderRadius: 10, overflow: 'hidden', zIndex: 20, minWidth: 120, boxShadow: 'var(--shadow-lg)' }}>
                        <button onClick={() => { openEdit(item); setOpenMenuId(null) }}
                          style={{ width: '100%', textAlign: 'right', padding: '9px 14px', fontSize: 13, color: 'var(--text-2)', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >تعديل</button>
                        <button
                          onClick={() => { setItems(prev => { const next = [...prev, { ...item, id: Date.now(), name: item.name + ' (نسخة)' }]; setMenuItems(next); return next }); setOpenMenuId(null) }}
                          style={{ width: '100%', textAlign: 'right', padding: '9px 14px', fontSize: 13, color: 'var(--text-2)', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >نسخ</button>
                        <div style={{ height: 1, background: 'var(--border)', margin: '2px 0' }} />
                        <button onClick={() => { deleteItem(item.id); setOpenMenuId(null) }}
                          style={{ width: '100%', textAlign: 'right', padding: '9px 14px', fontSize: 13, color: 'var(--red)', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'var(--red-muted)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >حذف</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Item form modal */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }} onClick={() => setShowForm(false)}>
          <div
            style={{ background: 'var(--surface)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-xl)', width: '100%', maxWidth: 420, boxShadow: 'var(--shadow-xl)' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
              <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 15 }}>{editItem ? 'تعديل الأكلة' : 'إضافة أكلة جديدة'}</p>
              <button onClick={() => setShowForm(false)} className="btn-icon sm" style={{ border: 'none', background: 'var(--surface-2)', color: 'var(--text-2)' }}>
                <X size={14} />
              </button>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Image placeholder */}
              <div style={{ width: 64, height: 64, background: 'var(--surface-2)', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px dashed var(--border)', gap: 4 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
              >
                <Plus size={18} style={{ color: 'var(--text-3)' }} />
                <p style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 500 }}>صورة</p>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6, letterSpacing: '0.04em', textTransform: 'uppercase' }}>اسم الأكلة *</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} placeholder="مثال: كفتة مشوية"
                  onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-muted)' }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6, letterSpacing: '0.04em', textTransform: 'uppercase' }}>السعر *</label>
                <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} style={inputStyle} placeholder="85"
                  onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-muted)' }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6, letterSpacing: '0.04em', textTransform: 'uppercase' }}>الوصف</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ ...inputStyle, resize: 'none' }} rows={2} placeholder="وصف مختصر..."
                  onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-muted)' }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                />
              </div>

              <div style={{ height: 1, background: 'var(--border)' }} />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>الأكلة نشطة</p>
                  <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>تظهر للزبائن في القائمة</p>
                </div>
                <button
                  onClick={() => setForm({ ...form, active: !form.active })}
                  style={{ position: 'relative', width: 44, height: 24, borderRadius: 12, background: form.active ? 'var(--green)' : 'var(--surface-3)', border: 'none', cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0 }}
                >
                  <span style={{ position: 'absolute', top: 4, width: 16, height: 16, background: 'white', borderRadius: '50%', transition: 'all 0.2s', right: form.active ? 4 : 'auto', left: form.active ? 'auto' : 4 }} />
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>الأكثر مبيعاً ⭐</p>
                  <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>يظهر نجمة مميزة على الصنف</p>
                </div>
                <button
                  onClick={() => setForm({ ...form, bestseller: !form.bestseller })}
                  style={{ position: 'relative', width: 44, height: 24, borderRadius: 12, background: form.bestseller ? 'var(--yellow)' : 'var(--surface-3)', border: 'none', cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0 }}
                >
                  <span style={{ position: 'absolute', top: 4, width: 16, height: 16, background: 'white', borderRadius: '50%', transition: 'all 0.2s', right: form.bestseller ? 4 : 'auto', left: form.bestseller ? 'auto' : 4 }} />
                </button>
              </div>

              <button
                onClick={saveItem}
                disabled={!form.name || !form.price}
                className={form.name && form.price ? 'btn-primary' : ''}
                style={{
                  padding: '12px', borderRadius: 'var(--radius)',
                  fontWeight: 700, fontSize: 14, border: 'none', cursor: form.name && form.price ? 'pointer' : 'not-allowed',
                  fontFamily: 'Cairo, sans-serif', transition: 'all 0.15s',
                  ...(!(form.name && form.price) ? { background: 'var(--surface-2)', color: 'var(--text-3)' } : {}),
                }}
              >
                {editItem ? 'حفظ التعديلات' : 'إضافة الأكلة'}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
