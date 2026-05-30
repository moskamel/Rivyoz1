import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import ConfirmDialog from '../components/ConfirmDialog'
import { Add, More, CloseCircle, Sort, Star1 } from 'iconsax-react'
import Layout from '../components/layout/Layout'
import { getMenuItems, setMenuItems, getCategories, setCategories as setCategories_store } from '../lib/restaurantStore'

function Skel({ w = '100%', h = 16, r = 8, mb = 0 }) {
  return <div style={{ width: w, height: h, borderRadius: r, marginBottom: mb, background: 'var(--surface-3)', animation: 'skel-pulse 1.5s ease-in-out infinite' }} />
}

const inputStyle = {
  width: '100%', padding: '10px 14px', borderRadius: 'var(--radius)', border: '1px solid var(--border)',
  background: 'var(--surface-2)', color: 'var(--text)', fontSize: 13, outline: 'none',
  fontFamily: 'Zain, sans-serif', boxSizing: 'border-box',
  transition: 'border-color var(--dur-normal) var(--ease-default), box-shadow var(--dur-normal) var(--ease-default)',
}

export default function HambergerMenu() {
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState(getCategories)
  const [items, setItems] = useState(getMenuItems)
  const [activeCategory, setActiveCategory] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [form, setForm] = useState({ name: '', price: '', categoryId: 1, description: '', active: true, bestseller: false, discountTag: '' })
  const [openMenuId, setOpenMenuId] = useState(null)
  const [menuPos, setMenuPos] = useState(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)
  const [formErrors, setFormErrors] = useState({})
  const [showCatForm, setShowCatForm] = useState(false)
  const [newCatName, setNewCatName] = useState('')
  const [catNameError, setCatNameError] = useState('')
  const [deleteCatId, setDeleteCatId] = useState(null)
  const menuRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(t)
  }, [])

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
    setForm({ name: '', price: '', categoryId: activeCategory, description: '', active: true, bestseller: false, discountTag: '' })
    setEditItem(null)
    setFormErrors({})
    setShowForm(true)
  }

  const openEdit = (item) => {
    setForm({ name: item.name, price: item.price, categoryId: item.categoryId, description: item.description || '', active: item.active, bestseller: item.bestseller || false, discountTag: item.discountTag || '' })
    setEditItem(item.id)
    setFormErrors({})
    setShowForm(true)
  }

  const saveItem = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'اسم الأكلة مطلوب'
    if (!form.price || Number(form.price) <= 0) errs.price = 'السعر مطلوب ويجب أن يكون أكبر من صفر'
    setFormErrors(errs)
    if (Object.keys(errs).length) return
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

  const saveCategory = () => {
    if (!newCatName.trim()) { setCatNameError('اسم القسم مطلوب'); return }
    if (categories.some(c => c.name === newCatName.trim())) { setCatNameError('هذا القسم موجود بالفعل'); return }
    const newCat = { id: Date.now(), name: newCatName.trim(), count: 0 }
    setCategories(prev => {
      const next = [...prev, newCat]
      setCategories_store(next)
      return next
    })
    setActiveCategory(newCat.id)
    setShowCatForm(false)
    setNewCatName('')
    setCatNameError('')
  }

  const deleteCategory = (catId) => {
    const remaining = categories.filter(c => c.id !== catId)
    setCategories(prev => {
      const next = prev.filter(c => c.id !== catId)
      setCategories_store(next)
      return next
    })
    setItems(prev => {
      const next = prev.filter(i => i.categoryId !== catId)
      setMenuItems(next)
      return next
    })
    if (activeCategory === catId) setActiveCategory(remaining[0]?.id ?? null)
    setDeleteCatId(null)
  }

  if (loading) {
    return (
      <Layout title="إدارة القائمة">
        <style>{`@keyframes skel-pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }`}</style>

        {/* Category pill tabs + add button skeleton */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, gap: 12 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {[80, 70, 90, 75, 65].map((w, i) => (
              <Skel key={i} w={w} h={32} r={16} />
            ))}
          </div>
          <Skel w={100} h={34} r={8} />
        </div>

        {/* Table header skeleton */}
        <div className="glass" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
            <Skel w={120} h={14} r={4} />
            <Skel w={80} h={12} r={4} />
          </div>

          {/* 6 menu item row skeletons */}
          {[0, 1, 2, 3, 4, 5].map(i => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 20px', borderBottom: i < 5 ? '1px solid var(--border)' : 'none' }}>
              <Skel w={15} h={15} r={4} />
              <Skel w={40} h={40} r={10} />
              <div style={{ flex: 1 }}>
                <Skel w="45%" h={13} r={4} mb={6} />
                <Skel w="30%" h={11} r={4} mb={5} />
                <Skel w="20%" h={12} r={4} />
              </div>
              <Skel w={40} h={22} r={11} />
              <Skel w={30} h={30} r={6} />
            </div>
          ))}
        </div>
      </Layout>
    )
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
                <span
                  onClick={e => { e.stopPropagation(); setDeleteCatId(cat.id) }}
                  title="حذف القسم"
                  style={{ fontSize: 13, lineHeight: 1, fontWeight: 700, marginRight: -2, padding: '1px 3px', borderRadius: 4, color: active ? 'rgba(255,255,255,0.6)' : 'var(--text-3)', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.color = active ? 'white' : 'var(--red)'}
                  onMouseLeave={e => e.currentTarget.style.color = active ? 'rgba(255,255,255,0.6)' : 'var(--text-3)'}
                >×</span>
              </button>
            )
          })}
          <button
            onClick={() => { setNewCatName(''); setCatNameError(''); setShowCatForm(true) }}
            style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 'var(--radius-full)', fontSize: 12, fontWeight: 600, cursor: 'pointer', border: '1px dashed var(--border)', background: 'transparent', color: 'var(--text-3)', flexShrink: 0, transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-3)' }}
          >
            <Add size={12} /> قسم جديد
          </button>
        </div>
        <button onClick={openAdd} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <Add size={14} />
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
                <Add size={14} /> إضافة أكلة
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
                  <Sort size={15} style={{ color: 'var(--text-3)', cursor: 'grab', flexShrink: 0 }} />
                  <div style={{ width: 40, height: 40, background: 'var(--surface-2)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--border)' }}>
                    <span style={{ fontSize: 18 }}>🍽️</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <p style={{ fontWeight: 600, color: item.active ? 'var(--text)' : 'var(--text-3)', fontSize: 13 }}>{item.name}</p>
                      {item.bestseller && <Star1 size={11} style={{ color: 'var(--yellow)', fill: 'var(--yellow)', flexShrink: 0 }} />}
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
                  <div style={{ position: 'relative' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        if (openMenuId === item.id) {
                          setOpenMenuId(null)
                        } else {
                          const rect = e.currentTarget.getBoundingClientRect()
                          setMenuPos({ top: rect.bottom + 4, left: rect.left })
                          setOpenMenuId(item.id)
                        }
                      }}
                      className="btn-icon sm"
                      style={{ background: openMenuId === item.id ? 'var(--surface-2)' : 'transparent', border: 'none', color: 'var(--text-3)' }}
                    >
                      <More size={15} />
                    </button>
                  </div>
                  {openMenuId === item.id && menuPos && createPortal(
                    <div ref={menuRef} style={{ position: 'fixed', top: menuPos.top, left: menuPos.left, background: 'var(--surface)', border: '1px solid var(--border-strong)', borderRadius: 10, overflow: 'hidden', zIndex: 99999, minWidth: 130, boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
                      <button onClick={() => { openEdit(item); setOpenMenuId(null) }}
                        style={{ width: '100%', textAlign: 'right', padding: '10px 16px', fontSize: 13, color: 'var(--text)', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'Zain, sans-serif', display: 'flex', alignItems: 'center', gap: 8 }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >✏️ تعديل</button>
                      <button
                        onClick={() => { setItems(prev => { const next = [...prev, { ...item, id: Date.now(), name: item.name + ' (نسخة)' }]; setMenuItems(next); return next }); setOpenMenuId(null) }}
                        style={{ width: '100%', textAlign: 'right', padding: '10px 16px', fontSize: 13, color: 'var(--text)', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'Zain, sans-serif', display: 'flex', alignItems: 'center', gap: 8 }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >📋 نسخ</button>
                      <div style={{ height: 1, background: 'var(--border)', margin: '2px 0' }} />
                      <button onClick={() => { setConfirmDeleteId(item.id); setOpenMenuId(null) }}
                        style={{ width: '100%', textAlign: 'right', padding: '10px 16px', fontSize: 13, color: 'var(--red)', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'Zain, sans-serif', display: 'flex', alignItems: 'center', gap: 8 }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--red-muted)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >🗑️ حذف</button>
                    </div>,
                    document.body
                  )}
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
                <CloseCircle size={14} />
              </button>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Image placeholder */}
              <div style={{ width: 64, height: 64, background: 'var(--surface-2)', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px dashed var(--border)', gap: 4 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
              >
                <Add size={18} style={{ color: 'var(--text-3)' }} />
                <p style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 500 }}>صورة</p>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6, letterSpacing: '0.04em', textTransform: 'uppercase' }}>اسم الأكلة *</label>
                <input type="text" value={form.name} onChange={e => { setForm({ ...form, name: e.target.value }); setFormErrors(p => ({ ...p, name: '' })) }}
                  style={{ ...inputStyle, ...(formErrors.name ? { borderColor: 'var(--red)' } : {}) }} placeholder="مثال: كفتة مشوية"
                  onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-muted)' }}
                  onBlur={e => { e.target.style.borderColor = formErrors.name ? 'var(--red)' : 'var(--border)'; e.target.style.boxShadow = 'none' }}
                />
                {formErrors.name && <p style={{ color: 'var(--red)', fontSize: 11, marginTop: 4, fontWeight: 600 }}>{formErrors.name}</p>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6, letterSpacing: '0.04em', textTransform: 'uppercase' }}>السعر *</label>
                <input type="number" value={form.price} onChange={e => { setForm({ ...form, price: e.target.value }); setFormErrors(p => ({ ...p, price: '' })) }}
                  style={{ ...inputStyle, ...(formErrors.price ? { borderColor: 'var(--red)' } : {}) }} placeholder="85" min="0"
                  onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-muted)' }}
                  onBlur={e => { e.target.style.borderColor = formErrors.price ? 'var(--red)' : 'var(--border)'; e.target.style.boxShadow = 'none' }}
                />
                {formErrors.price && <p style={{ color: 'var(--red)', fontSize: 11, marginTop: 4, fontWeight: 600 }}>{formErrors.price}</p>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6, letterSpacing: '0.04em', textTransform: 'uppercase' }}>الوصف</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ ...inputStyle, resize: 'none' }} rows={2} placeholder="وصف مختصر..."
                  onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-muted)' }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6, letterSpacing: '0.04em', textTransform: 'uppercase' }}>بادج الخصم (اختياري)</label>
                <input type="text" value={form.discountTag} onChange={e => setForm({ ...form, discountTag: e.target.value })} style={inputStyle} placeholder="مثال: خصم 20٪ أو عرض محدود"
                  onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-muted)' }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                />
                <p style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 4 }}>يظهر كبادج أخضر على الكارت في صفحة العميل</p>
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
                  fontFamily: 'Zain, sans-serif', transition: 'all 0.15s',
                  ...(!(form.name && form.price) ? { background: 'var(--surface-2)', color: 'var(--text-3)' } : {}),
                }}
              >
                {editItem ? 'حفظ التعديلات' : 'إضافة الأكلة'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE CATEGORY CONFIRM ── */}
      {deleteCatId && (() => {
        const cat = categories.find(c => c.id === deleteCatId)
        const catItemCount = items.filter(i => i.categoryId === deleteCatId).length
        return (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', zIndex: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }} onClick={() => setDeleteCatId(null)}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border-strong)', borderRadius: 16, width: '100%', maxWidth: 380, padding: 24, textAlign: 'center', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }} onClick={e => e.stopPropagation()}>
              <div style={{ fontSize: 44, marginBottom: 14 }}>🗂️</div>
              <p style={{ fontWeight: 800, fontSize: 16, color: 'var(--text)', marginBottom: 10 }}>
                حذف قسم "{cat?.name}"؟
              </p>
              {catItemCount > 0 ? (
                <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 24, lineHeight: 1.75 }}>
                  يوجد{' '}
                  <span style={{ fontWeight: 800, color: 'var(--red)' }}>{catItemCount} أكلة</span>
                  {' '}في هذا القسم — ستُحذف جميعها عند تأكيد الحذف.
                </p>
              ) : (
                <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 24 }}>
                  القسم فارغ، هل أنت متأكد من الحذف؟
                </p>
              )}
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => setDeleteCatId(null)} style={{ flex: 1, padding: '12px', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text-2)', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Zain, sans-serif' }}>
                  إلغاء
                </button>
                <button onClick={() => deleteCategory(deleteCatId)} style={{ flex: 1, padding: '12px', borderRadius: 12, border: 'none', background: 'var(--red)', color: 'white', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Zain, sans-serif' }}>
                  {catItemCount > 0 ? `احذف القسم والـ ${catItemCount} أكلة` : 'تأكيد الحذف'}
                </button>
              </div>
            </div>
          </div>
        )
      })()}

      {/* ── NEW CATEGORY MODAL ── */}
      {showCatForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }} onClick={() => setShowCatForm(false)}>
          <div style={{ background: 'var(--surface)', borderRadius: 16, width: '100%', maxWidth: 380, boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', borderBottom: '1px solid var(--border)' }}>
              <p style={{ fontWeight: 800, fontSize: 16, color: 'var(--text)' }}>قسم جديد</p>
              <button onClick={() => setShowCatForm(false)} style={{ border: 'none', background: 'var(--surface-2)', color: 'var(--text-2)', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CloseCircle size={18} />
              </button>
            </div>
            <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-2)', marginBottom: 6 }}>اسم القسم</p>
                <input
                  autoFocus
                  value={newCatName}
                  onChange={e => { setNewCatName(e.target.value); if (catNameError) setCatNameError('') }}
                  onKeyDown={e => e.key === 'Enter' && saveCategory()}
                  placeholder="مثال: وجبات جانبية"
                  style={{ ...inputStyle, ...(catNameError ? { borderColor: 'var(--red)' } : {}) }}
                />
                {catNameError && <p style={{ color: 'var(--red)', fontSize: 12, marginTop: 4 }}>{catNameError}</p>}
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => setShowCatForm(false)} style={{ flex: 1, padding: '11px 0', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text-2)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>إلغاء</button>
                <button onClick={saveCategory} className="btn-primary" style={{ flex: 2, padding: '11px 0', fontSize: 14, fontWeight: 800 }}>إضافة القسم</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
    <ConfirmDialog
      open={confirmDeleteId !== null}
      title="حذف الأكلة؟"
      message="سيتم حذف هذه الأكلة نهائياً ولا يمكن التراجع."
      confirmLabel="احذف"
      onConfirm={() => { deleteItem(confirmDeleteId); setConfirmDeleteId(null) }}
      onCancel={() => setConfirmDeleteId(null)}
    />
  )
}
