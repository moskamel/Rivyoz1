import { useState, useEffect, useRef, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { SearchNormal1, CloseCircle } from 'iconsax-react'
import { getOrders, getMenuItems } from '../lib/restaurantStore'

const PAGES = [
  { id: 'p-dash',      label: 'الرئيسية',   sub: 'لوحة التحكم',          path: '/',           icon: '📊' },
  { id: 'p-orders',    label: 'الطلبات',     sub: 'استقبال وإدارة الطلبات', path: '/orders',    icon: '🛒' },
  { id: 'p-menu',      label: 'القائمة',     sub: 'الأصناف والتسعير',      path: '/menu',       icon: '📋' },
  { id: 'p-customers', label: 'العملاء',     sub: 'CRM وولاء',             path: '/customers',  icon: '👥' },
  { id: 'p-reports',   label: 'التقارير',    sub: 'مبيعات وتحليلات',       path: '/reports',    icon: '📈' },
  { id: 'p-marketing', label: 'التسويق',     sub: 'حملات وعروض',           path: '/marketing',  icon: '📣' },
  { id: 'p-branches',  label: 'الفروع',      sub: 'إدارة الفروع',          path: '/branches',   icon: '🏪' },
  { id: 'p-staff',     label: 'الفريق',      sub: 'الموظفون والأدوار',     path: '/staff',      icon: '👨‍💼' },
  { id: 'p-inventory', label: 'المخزون',     sub: 'المواد والكميات',       path: '/inventory',  icon: '📦' },
  { id: 'p-reviews',   label: 'التقييمات',   sub: 'آراء العملاء',          path: '/reviews',    icon: '⭐' },
  { id: 'p-design',    label: 'التصميم',     sub: 'مظهر المتجر',           path: '/design',     icon: '🎨' },
  { id: 'p-settings',  label: 'الإعدادات',   sub: 'إعدادات المطعم',        path: '/settings',   icon: '⚙️' },
]

const STATUS_LABELS = {
  new:        { label: 'جديد',           color: 'var(--accent)' },
  preparing:  { label: 'جاري التحضير',   color: '#3B82F6'       },
  ready:      { label: 'جاهز',           color: 'var(--green)'  },
  delivering: { label: 'في التوصيل',     color: '#F59E0B'       },
  done:       { label: 'مكتمل',          color: 'var(--text-3)' },
  cancelled:  { label: 'ملغي',           color: 'var(--text-3)' },
}

export default function SearchModal({ onClose }) {
  const navigate  = useNavigate()
  const inputRef  = useRef(null)
  const listRef   = useRef(null)
  const [query, setQuery]   = useState('')
  const [cursor, setCursor] = useState(-1)

  useEffect(() => { inputRef.current?.focus() }, [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()

    if (!q) {
      return [{ type: 'pages', label: 'الصفحات', items: PAGES }]
    }

    const groups = []

    const pages = PAGES.filter(p =>
      p.label.includes(q) || p.sub.includes(q) || p.path.includes(q)
    )
    if (pages.length) groups.push({ type: 'pages', label: 'الصفحات', items: pages })

    const orders = getOrders().filter(o =>
      String(o.id).includes(q) ||
      (o.customer || '').toLowerCase().includes(q) ||
      (o.items || '').toLowerCase().includes(q) ||
      (o.table || '').includes(q) ||
      (o.phone || '').includes(q)
    ).slice(0, 5)
    if (orders.length) groups.push({ type: 'orders', label: 'الطلبات', items: orders })

    const menu = getMenuItems().filter(m =>
      m.name.toLowerCase().includes(q)
    ).slice(0, 5)
    if (menu.length) groups.push({ type: 'menu', label: 'أصناف القائمة', items: menu })

    const seen = new Set()
    const customers = getOrders()
      .filter(o => o.customer && (
        (o.customer || '').toLowerCase().includes(q) ||
        (o.phone || '').includes(q)
      ))
      .filter(o => { if (seen.has(o.phone)) return false; seen.add(o.phone); return true })
      .slice(0, 4)
    if (customers.length) groups.push({ type: 'customers', label: 'العملاء', items: customers })

    return groups
  }, [query])

  const flat = results.flatMap(g => g.items)

  function navigate_to(item, type) {
    if (type === 'pages')     navigate(item.path)
    else if (type === 'orders')    navigate('/orders')
    else if (type === 'menu')      navigate('/menu')
    else if (type === 'customers') navigate('/customers')
    onClose()
  }

  function handleKey(e) {
    if (e.key === 'Escape') { onClose(); return }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setCursor(c => {
        const next = Math.min(c + 1, flat.length - 1)
        scrollItemIntoView(next)
        return next
      })
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setCursor(c => {
        const next = Math.max(c - 1, 0)
        scrollItemIntoView(next)
        return next
      })
    }
    if (e.key === 'Enter' && cursor >= 0) {
      const item = flat[cursor]
      const type = results.find(g => g.items.includes(item))?.type
      if (type) navigate_to(item, type)
    }
  }

  function scrollItemIntoView(idx) {
    if (!listRef.current) return
    const el = listRef.current.querySelectorAll('[data-result]')[idx]
    el?.scrollIntoView({ block: 'nearest' })
  }

  useEffect(() => { setCursor(-1) }, [query])

  let itemIndex = 0

  const Kbd = ({ children }) => (
    <kbd style={{
      background: 'var(--surface-2)', border: '1px solid var(--border)',
      borderRadius: 4, padding: '1px 5px', fontFamily: 'monospace',
      fontSize: 10, color: 'var(--text-3)',
    }}>{children}</kbd>
  )

  return createPortal(
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 'clamp(60px,10vh,100px) 16px 16px' }}
      onMouseDown={onClose}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }} />

      <div
        dir="rtl"
        style={{
          position: 'relative', zIndex: 1, width: '100%', maxWidth: 580,
          background: 'var(--surface)', borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.45)',
          overflow: 'hidden',
          animation: 'search-in 0.15s ease both',
        }}
        onMouseDown={e => e.stopPropagation()}
      >
        <style>{`
          @keyframes search-in {
            from { opacity:0; transform:scale(0.97) translateY(-8px) }
            to   { opacity:1; transform:scale(1)    translateY(0)     }
          }
        `}</style>

        {/* Input row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 16px', borderBottom: '1px solid var(--border)' }}>
          <SearchNormal1 size={17} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder="ابحث عن طلب، صنف، عميل، أو صفحة..."
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              fontSize: 14, color: 'var(--text)', fontFamily: 'var(--font-body)',
              direction: 'rtl',
            }}
          />
          {query
            ? <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-3)', padding: 0, display: 'flex', flexShrink: 0 }}><CloseCircle size={16} /></button>
            : <kbd style={{ fontSize: 10, color: 'var(--text-3)', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 4, padding: '2px 6px', fontFamily: 'monospace', flexShrink: 0, whiteSpace: 'nowrap' }}>Ctrl K</kbd>
          }
        </div>

        {/* Results */}
        <div ref={listRef} style={{ maxHeight: 400, overflowY: 'auto', padding: '6px 0' }}>
          {results.length > 0 ? results.map(group => {
            return (
              <div key={group.type}>
                <div style={{ padding: '8px 16px 4px', fontSize: 10, fontWeight: 800, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {group.label}
                </div>
                {group.items.map(item => {
                  const idx = itemIndex++
                  const isActive = cursor === idx

                  if (group.type === 'pages') return (
                    <button key={item.id} data-result onClick={() => navigate_to(item, 'pages')} onMouseEnter={() => setCursor(idx)}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 11, padding: '8px 16px', background: isActive ? 'var(--surface-2)' : 'transparent', border: 'none', cursor: 'pointer', textAlign: 'right', transition: 'background 0.08s' }}>
                      <span style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--surface-2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>{item.icon}</span>
                      <div style={{ flex: 1, minWidth: 0, textAlign: 'right' }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{item.label}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{item.sub}</div>
                      </div>
                      {isActive && <span style={{ fontSize: 11, color: 'var(--text-3)' }}>↩</span>}
                    </button>
                  )

                  if (group.type === 'orders') {
                    const st = STATUS_LABELS[item.status] || { label: item.status, color: 'var(--text-3)' }
                    return (
                      <button key={item.id} data-result onClick={() => navigate_to(item, 'orders')} onMouseEnter={() => setCursor(idx)}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 11, padding: '8px 16px', background: isActive ? 'var(--surface-2)' : 'transparent', border: 'none', cursor: 'pointer', textAlign: 'right', transition: 'background 0.08s' }}>
                        <span style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--accent-muted)', border: '1px solid var(--border-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, color: 'var(--accent)', flexShrink: 0 }}>#{item.id}</span>
                        <div style={{ flex: 1, minWidth: 0, textAlign: 'right' }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.customer || 'زبون'}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.items} · {item.total} ج</div>
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: st.color, flexShrink: 0 }}>{st.label}</span>
                      </button>
                    )
                  }

                  if (group.type === 'menu') return (
                    <button key={item.id} data-result onClick={() => navigate_to(item, 'menu')} onMouseEnter={() => setCursor(idx)}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 11, padding: '8px 16px', background: isActive ? 'var(--surface-2)' : 'transparent', border: 'none', cursor: 'pointer', textAlign: 'right', transition: 'background 0.08s' }}>
                      <span style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--surface-2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>🍽️</span>
                      <div style={{ flex: 1, minWidth: 0, textAlign: 'right' }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{item.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{item.price} ج{item.bestseller ? ' · 🔥 الأكثر طلباً' : ''}{!item.active ? ' · غير متاح' : ''}</div>
                      </div>
                    </button>
                  )

                  if (group.type === 'customers') return (
                    <button key={item.phone + item.id} data-result onClick={() => navigate_to(item, 'customers')} onMouseEnter={() => setCursor(idx)}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 11, padding: '8px 16px', background: isActive ? 'var(--surface-2)' : 'transparent', border: 'none', cursor: 'pointer', textAlign: 'right', transition: 'background 0.08s' }}>
                      <span style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent-muted)', border: '1px solid var(--border-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 900, color: 'var(--accent)', flexShrink: 0 }}>{(item.customer || '؟')[0]}</span>
                      <div style={{ flex: 1, minWidth: 0, textAlign: 'right' }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{item.customer}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{item.phone}</div>
                      </div>
                    </button>
                  )

                  return null
                })}
              </div>
            )
          }) : (
            <div style={{ padding: '36px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>🔍</div>
              <div style={{ fontSize: 13, color: 'var(--text-2)', fontWeight: 600 }}>لا توجد نتائج</div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 4 }}>جرب بحثاً آخر</div>
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div style={{ padding: '8px 16px', borderTop: '1px solid var(--border)', display: 'flex', gap: 16, fontSize: 11, color: 'var(--text-3)', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}><Kbd>↑↓</Kbd> تنقل</span>
          <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}><Kbd>↩</Kbd> فتح</span>
          <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}><Kbd>Esc</Kbd> إغلاق</span>
        </div>
      </div>
    </div>,
    document.body
  )
}
