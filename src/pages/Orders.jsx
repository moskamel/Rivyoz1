import { useState, useEffect } from 'react'
import { CloseCircle, Check, Add, Minus } from 'iconsax-react'
import Layout from '../components/layout/Layout'
import { statusMap } from '../lib/mock'
import { getOrders, updateOrderStatus, addOrder, getMenuItems, getCategories } from '../lib/restaurantStore'

function Skel({ w = '100%', h = 16, r = 8, mb = 0 }) {
  return <div style={{ width: w, height: h, borderRadius: r, marginBottom: mb, background: 'var(--surface-3)', animation: 'skel-pulse 1.5s ease-in-out infinite' }} />
}

const tabs = [
  { key: 'all', label: 'الكل' },
  { key: 'new', label: 'جديد' },
  { key: 'preparing', label: 'تحضير' },
  { key: 'ready', label: 'جاهز' },
  { key: 'delivering', label: 'توصيل' },
  { key: 'done', label: 'مكتمل' },
  { key: 'cancelled', label: 'ملغي' },
]

const nextStatus = {
  new: 'preparing',
  preparing: 'ready',
  ready: 'delivering',
  delivering: 'done',
}

const actionLabel = {
  new: 'قبول الطلب',
  preparing: 'جاهز للاستلام',
  ready: 'تم التوصيل',
  delivering: 'اكتمل',
}

const statusStyle = {
  new: { bg: 'var(--red-muted)', color: 'var(--red)' },
  preparing: { bg: 'var(--blue-muted)', color: 'var(--blue)' },
  ready: { bg: 'var(--yellow-muted)', color: 'var(--yellow)' },
  delivering: { bg: 'var(--accent-muted)', color: 'var(--accent)' },
  done: { bg: 'var(--surface-2)', color: 'var(--text-3)' },
  cancelled: { bg: 'var(--surface-2)', color: 'var(--text-3)' },
}

function statusBadge(status) {
  switch (status) {
    case 'new':       return <span className="badge badge-red badge-pill badge-md">جديد</span>
    case 'preparing': return <span className="badge badge-blue badge-pill badge-md">تحضير</span>
    case 'ready':     return <span className="badge badge-yellow badge-pill badge-md">جاهز</span>
    case 'delivering':return <span className="badge badge-accent badge-pill badge-md">توصيل</span>
    case 'done':      return <span className="badge badge-green badge-pill badge-md">مكتمل</span>
    case 'cancelled': return <span className="badge badge-default badge-pill badge-md">ملغي</span>
    default:          return <span className="badge badge-default badge-pill badge-md">{status}</span>
  }
}

export default function Orders() {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const [orders, setOrders] = useState(getOrders)
  const [selected, setSelected] = useState(null)
  const [rejectModal, setRejectModal] = useState(null)
  const [rejectReason, setRejectReason] = useState('')

  const emptyNO = { type: 'طاولة', table: '', customer: '', phone: '', payment: 'كاش عند الاستلام' }
  const [showNewOrder, setShowNewOrder] = useState(false)
  const [noForm, setNoForm] = useState(emptyNO)
  const [noQtys, setNoQtys] = useState({})
  const [noErrors, setNoErrors] = useState({})
  const [noSearch, setNoSearch] = useState('')
  const [noActiveCat, setNoActiveCat] = useState('all')

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(t)
  }, [])

  // Poll for new customer orders every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(getOrders())
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const filtered = activeTab === 'all' ? orders : orders.filter(o => o.status === activeTab)
  const count = (key) => key === 'all' ? orders.length : orders.filter(o => o.status === key).length

  const advance = (id) => {
    setOrders(prev => {
      const next = prev.map(o => o.id === id && nextStatus[o.status] ? { ...o, status: nextStatus[o.status] } : o)
      const updated = next.find(o => o.id === id)
      if (updated) updateOrderStatus(id, updated.status)
      return next
    })
    setSelected(null)
  }

  const reject = (id) => {
    setOrders(prev => {
      const next = prev.map(o => o.id === id ? { ...o, status: 'cancelled' } : o)
      updateOrderStatus(id, 'cancelled')
      return next
    })
    setRejectModal(null)
    setSelected(null)
  }

  const submitNewOrder = () => {
    const errs = {}
    if (noForm.type === 'طاولة' && !noForm.table.trim()) errs.table = 'رقم الطاولة مطلوب'
    if (noForm.phone.trim() && !/^(010|011|012|015)\d{8}$/.test(noForm.phone.replace(/\s|-/g, ''))) errs.phone = 'رقم غير صحيح (010/011/012/015)'
    const allItems = getMenuItems()
    const details = Object.entries(noQtys)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => {
        const item = allItems.find(i => i.id === Number(id))
        return item ? { name: item.name, qty, price: item.price, note: '' } : null
      })
      .filter(Boolean)
    if (!details.length) errs.items = 'أضف صنفاً واحداً على الأقل'
    setNoErrors(errs)
    if (Object.keys(errs).length) return
    const total = details.reduce((s, i) => s + i.price * i.qty, 0)
    const itemsSummary = details.map(i => `${i.name}${i.qty > 1 ? ' ×' + i.qty : ''}`).join(' + ')
    const tableLabel = noForm.type === 'طاولة' ? `طاولة ${noForm.table}` : noForm.type
    const created = addOrder({ table: tableLabel, items: itemsSummary, total, customer: noForm.customer || 'زبون', phone: noForm.phone, payment: noForm.payment, details })
    setOrders(getOrders())
    setShowNewOrder(false)
    setNoForm(emptyNO)
    setNoQtys({})
    setNoErrors({})
    setNoSearch('')
    setNoActiveCat('all')
    setActiveTab('new')
  }

  if (loading) {
    return (
      <Layout title="الطلبات">
        <style>{`@keyframes skel-pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }`}</style>

        {/* Top bar skeleton */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Skel w={36} h={26} r={13} />
            <Skel w={60} h={14} r={4} />
          </div>
          <Skel w={100} h={36} r={8} />
        </div>

        {/* Filter tab skeletons */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
          {[70, 55, 65, 55, 70, 65, 55].map((w, i) => (
            <Skel key={i} w={w} h={34} r={17} />
          ))}
        </div>

        {/* 8 order row skeletons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
            <div key={i} className="glass" style={{ padding: 0, overflow: 'hidden' }}>
              {/* Card header */}
              <div style={{ padding: '14px 16px 12px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
                <Skel w={36} h={36} r={8} />
                <div style={{ flex: 1 }}>
                  <Skel w="40%" h={13} r={4} mb={6} />
                  <Skel w="25%" h={11} r={4} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Skel w={50} h={16} r={4} />
                  <Skel w={60} h={22} r={11} />
                </div>
              </div>
              {/* Card body */}
              <div style={{ padding: '10px 16px 14px', display: 'flex', gap: 6 }}>
                <Skel w={80} h={22} r={6} />
                <Skel w={100} h={22} r={6} />
                <Skel w={70} h={22} r={6} />
              </div>
              {/* Card footer */}
              <div style={{ padding: '10px 16px', borderTop: '1px solid var(--border)', display: 'flex', gap: 8 }}>
                <Skel h={34} r={8} />
                <Skel w={70} h={34} r={8} />
                <Skel w={80} h={34} r={8} />
              </div>
            </div>
          ))}
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="الطلبات">

      {/* TOP BAR */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="badge badge-accent badge-pill badge-lg num">{orders.length}</span>
          <span style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 500 }}>طلب نشط</span>
        </div>
        <button
          className="btn-primary"
          style={{ height: 36, fontSize: 13, padding: '0 14px' }}
          onClick={() => { setNoForm(emptyNO); setNoQtys({}); setNoErrors({}); setNoSearch(''); setNoActiveCat('all'); setShowNewOrder(true) }}
        >
          طلب جديد +
        </button>
      </div>

      {/* FILTER TABS */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          marginBottom: 16,
        }}
      >
        {tabs.map(tab => {
          const isActive = activeTab === tab.key
          const cnt = count(tab.key)
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                flex: 1,
                height: 34,
                borderRadius: 'var(--radius-full)',
                padding: '0 4px',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                border: isActive ? 'none' : '1px solid var(--border)',
                background: isActive ? 'var(--accent)' : 'var(--surface-2)',
                color: isActive ? 'white' : 'var(--text-2)',
                transition: 'all 150ms',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                fontFamily: 'Zain, sans-serif',
              }}
            >
              {tab.label}
              {cnt > 0 && (
                <span style={{
                  fontSize: 10,
                  fontWeight: 800,
                  fontFamily: 'Inter, sans-serif',
                  minWidth: 16,
                  height: 16,
                  borderRadius: 'var(--radius-full)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 4px',
                  background: tab.key === 'new' && cnt > 0
                    ? 'var(--red)'
                    : isActive
                      ? 'rgba(255,255,255,0.25)'
                      : 'var(--surface-3)',
                  color: tab.key === 'new' && cnt > 0
                    ? 'white'
                    : isActive
                      ? 'white'
                      : 'var(--text-3)',
                }}>
                  {cnt}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* ORDERS LIST */}
      <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <p className="empty-title">لا توجد طلبات</p>
            <p className="empty-desc">
              {activeTab === 'all' ? 'في انتظار طلبات جديدة...' : `لا توجد طلبات بحالة "${tabs.find(t => t.key === activeTab)?.label || activeTab}"`}
            </p>
          </div>
        )}
        {filtered.map(order => {
          const isNew = order.status === 'new'
          const isPreparing = order.status === 'preparing'
          const canCancel = isNew || isPreparing
          return (
            <div
              key={order.id}
              className="glass"
              style={{
                padding: 0,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all var(--dur-normal) var(--ease-default)',
                borderColor: isNew ? 'rgba(248,113,113,0.3)' : 'var(--border)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = isNew ? 'rgba(248,113,113,0.5)' : 'var(--border-strong)'
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.background = 'var(--surface-2)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = isNew ? 'rgba(248,113,113,0.3)' : 'var(--border)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.background = 'var(--surface)'
              }}
              onClick={() => setSelected(order)}
            >
              {/* CARD HEADER */}
              <div style={{
                padding: '14px 16px 12px',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}>
                {/* Order# box */}
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span className="num" style={{
                    fontSize: 12,
                    fontWeight: 800,
                    color: 'var(--text-2)',
                    fontFamily: 'Inter, sans-serif',
                    direction: 'ltr',
                  }}>
                    #{order.id}
                  </span>
                </div>

                {/* Middle: table + time */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', margin: 0, lineHeight: 1.3 }}>
                    {order.table}
                  </p>
                  <p style={{ fontSize: 11, color: 'var(--text-3)', margin: 0, marginTop: 2, lineHeight: 1 }}>
                    {order.time}
                  </p>
                </div>

                {/* Right: total + badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                  <span className="num" style={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: 'var(--accent)',
                    fontFamily: 'Inter, sans-serif',
                  }}>
                    {order.total} ج
                  </span>
                  {statusBadge(order.status)}
                </div>
              </div>

              {/* CARD BODY */}
              <div style={{ padding: '10px 16px 14px' }}>
                {/* Item chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {order.details && order.details.length > 0
                    ? order.details.map((item, i) => (
                        <span key={i} style={{
                          background: 'var(--surface-2)',
                          border: '1px solid var(--border)',
                          borderRadius: 6,
                          padding: '3px 8px',
                          fontSize: 11,
                          color: 'var(--text-2)',
                          fontWeight: 500,
                          whiteSpace: 'nowrap',
                        }}>
                          ×{item.qty} {item.name}
                        </span>
                      ))
                    : (
                        <span style={{
                          background: 'var(--surface-2)',
                          border: '1px solid var(--border)',
                          borderRadius: 6,
                          padding: '3px 8px',
                          fontSize: 11,
                          color: 'var(--text-2)',
                        }}>
                          {order.items}
                        </span>
                      )
                  }
                </div>
                {/* Notes */}
                {order.notes && (
                  <p style={{ fontSize: 11, fontStyle: 'italic', color: 'var(--text-3)', marginTop: 6, marginBottom: 0 }}>
                    {order.notes}
                  </p>
                )}
              </div>

              {/* CARD FOOTER */}
              <div
                style={{
                  padding: '10px 16px',
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  gap: 8,
                }}
                onClick={e => e.stopPropagation()}
              >
                {nextStatus[order.status] && (
                  <button
                    onClick={() => advance(order.id)}
                    className="btn-primary"
                    style={{ height: 34, fontSize: 12, flex: canCancel ? 1 : undefined, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}
                  >
                    <Check size={13} />
                    {actionLabel[order.status]}
                  </button>
                )}
                {canCancel && (
                  <button
                    onClick={() => setRejectModal(order)}
                    className="btn-danger"
                    style={{ height: 34, fontSize: 12, padding: '0 14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontFamily: 'Zain, sans-serif', fontWeight: 600, borderRadius: 'var(--radius)', transition: 'all var(--dur-normal) var(--ease-default)' }}
                  >
                    إلغاء
                  </button>
                )}
                <button
                  onClick={() => setSelected(order)}
                  className="btn-ghost"
                  style={{ height: 34, fontSize: 12, padding: '0 14px', marginRight: 'auto', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  التفاصيل
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* ORDER DETAIL MODAL */}
      {selected && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.65)',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
          }}
          onClick={() => setSelected(null)}
        >
          <div
            className="glass animate-fade-in"
            style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--border-strong)',
              borderRadius: 20,
              width: '100%',
              maxWidth: 440,
              maxHeight: '85vh',
              overflowY: 'auto',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              borderBottom: '1px solid var(--border)',
            }}>
              <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 15, margin: 0 }}>
                طلب <span className="num">#{selected.id}</span>
              </p>
              <button
                onClick={() => setSelected(null)}
                className="btn-icon sm"
                style={{ cursor: 'pointer' }}
              >
                <CloseCircle size={15} />
              </button>
            </div>

            <div style={{ padding: '16px 20px' }}>
              {/* Customer info grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                {[
                  { label: 'الزبون', value: selected.customer, isNum: false },
                  { label: 'الهاتف', value: selected.phone, isNum: true },
                  { label: 'الموقع', value: selected.table, isNum: false },
                  { label: 'الدفع', value: selected.payment, isNum: false },
                ].map(({ label, value, isNum }) => (
                  <div key={label} style={{ background: 'var(--surface-3)', borderRadius: 10, padding: '10px 12px' }}>
                    <p style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 600, marginBottom: 4, margin: '0 0 4px 0' }}>{label}</p>
                    <p
                      className={isNum ? 'num' : ''}
                      style={{ fontSize: 13, color: 'var(--text)', fontWeight: 600, margin: 0, direction: isNum ? 'ltr' : undefined }}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Items */}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, marginBottom: 16 }}>
                <p style={{
                  fontSize: 11,
                  color: 'var(--text-3)',
                  fontWeight: 600,
                  marginBottom: 10,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}>
                  الأصناف
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {selected.details.map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', margin: 0 }}>× {item.qty} {item.name}</p>
                        {item.note && (
                          <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2, marginBottom: 0, fontStyle: 'italic' }}>
                            ملاحظة: {item.note}
                          </p>
                        )}
                      </div>
                      <span className="num" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{item.price} ج</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div style={{
                borderTop: '1px solid var(--border)',
                paddingTop: 12,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
              }}>
                <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>الإجمالي</span>
                <span className="num" style={{ fontWeight: 800, color: 'var(--accent)', fontSize: 18 }}>{selected.total} ج</span>
              </div>

              {/* Actions */}
              {nextStatus[selected.status] && (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => setRejectModal(selected)}
                    className="btn-ghost"
                    style={{ flex: 1 }}
                  >
                    رفض الطلب
                  </button>
                  <button
                    onClick={() => advance(selected.id)}
                    className="btn-primary"
                    style={{ flex: 1 }}
                  >
                    {actionLabel[selected.status]}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* REJECT MODAL */}
      {rejectModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.65)',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
          }}
          onClick={() => setRejectModal(null)}
        >
          <div
            className="glass animate-fade-in"
            style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--border-strong)',
              borderRadius: 20,
              width: '100%',
              maxWidth: 360,
              padding: 24,
            }}
            onClick={e => e.stopPropagation()}
          >
            <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 15, marginBottom: 16 }}>سبب الرفض؟</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {['الأكلة دي خلصت', 'المطعم مش شغال دلوقتي', 'العنوان بعيد جداً'].map(reason => (
                <button
                  key={reason}
                  onClick={() => setRejectReason(reason)}
                  style={{
                    width: '100%',
                    textAlign: 'right',
                    padding: '10px 14px',
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    border: rejectReason === reason ? '1px solid rgba(249,115,22,0.4)' : '1px solid var(--border)',
                    background: rejectReason === reason ? 'var(--accent-muted)' : 'var(--surface-3)',
                    color: rejectReason === reason ? 'var(--accent)' : 'var(--text-2)',
                    fontFamily: 'Zain, sans-serif',
                  }}
                >
                  {reason}
                </button>
              ))}
              <input
                type="text"
                placeholder="سبب تاني..."
                value={['الأكلة دي خلصت', 'المطعم مش شغال دلوقتي', 'العنوان بعيد جداً'].includes(rejectReason) ? '' : rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 10,
                  border: '1px solid var(--border)',
                  background: 'var(--surface-3)',
                  color: 'var(--text)',
                  fontSize: 13,
                  outline: 'none',
                  fontFamily: 'Zain, sans-serif',
                  transition: 'border-color 0.15s',
                  boxSizing: 'border-box',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = 'var(--accent)' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
              />
            </div>
            <button
              onClick={() => reject(rejectModal.id)}
              disabled={!rejectReason}
              style={{
                width: '100%',
                padding: '11px',
                background: rejectReason ? 'var(--red)' : 'var(--surface-3)',
                color: rejectReason ? 'white' : 'var(--text-3)',
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 14,
                border: 'none',
                cursor: rejectReason ? 'pointer' : 'not-allowed',
                transition: 'all 0.15s',
                fontFamily: 'Zain, sans-serif',
              }}
            >
              تأكيد الرفض
            </button>
          </div>
        </div>
      )}

      {/* ── NEW ORDER MODAL ── */}
      {showNewOrder && (() => {
        const allMenuItems = getMenuItems().filter(i => i.active)
        const cats = getCategories()
        const orderTotal = Object.entries(noQtys)
          .filter(([, q]) => q > 0)
          .reduce((s, [id, q]) => {
            const item = allMenuItems.find(i => i.id === Number(id))
            return s + (item ? item.price * q : 0)
          }, 0)
        const F = { fontFamily: 'Zain, sans-serif' }
        const inp = { ...F, width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text)', fontSize: 14, outline: 'none', boxSizing: 'border-box' }
        return (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', zIndex: 60, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '24px 16px', overflowY: 'auto' }} onClick={() => setShowNewOrder(false)}>
            <div style={{ background: 'var(--surface)', borderRadius: 16, width: '100%', maxWidth: 520, boxShadow: '0 24px 60px rgba(0,0,0,0.5)', overflow: 'hidden' }} onClick={e => e.stopPropagation()}>

              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', borderBottom: '1px solid var(--border)' }}>
                <p style={{ ...F, fontWeight: 800, fontSize: 16, color: 'var(--text)' }}>طلب جديد</p>
                <button onClick={() => setShowNewOrder(false)} style={{ border: 'none', background: 'var(--surface-2)', color: 'var(--text-2)', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CloseCircle size={18} />
                </button>
              </div>

              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 20 }}>

                {/* Order type */}
                <div>
                  <p style={{ ...F, fontSize: 13, fontWeight: 700, color: 'var(--text-2)', marginBottom: 8 }}>نوع الطلب</p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {['طاولة', 'استلام', 'توصيل'].map(t => (
                      <button key={t} onClick={() => setNoForm(f => ({ ...f, type: t }))}
                        style={{ ...F, flex: 1, padding: '9px 0', borderRadius: 10, border: '1.5px solid', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s', background: noForm.type === t ? 'var(--accent)' : 'var(--surface-2)', borderColor: noForm.type === t ? 'var(--accent)' : 'var(--border)', color: noForm.type === t ? 'white' : 'var(--text-2)' }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Table number */}
                {noForm.type === 'طاولة' && (
                  <div>
                    <p style={{ ...F, fontSize: 13, fontWeight: 700, color: 'var(--text-2)', marginBottom: 6 }}>رقم الطاولة</p>
                    <input style={{ ...inp, ...(noErrors.table ? { borderColor: 'var(--red)' } : {}) }} placeholder="مثال: 5" value={noForm.table} onChange={e => setNoForm(f => ({ ...f, table: e.target.value }))} />
                    {noErrors.table && <p style={{ ...F, color: 'var(--red)', fontSize: 12, marginTop: 4 }}>{noErrors.table}</p>}
                  </div>
                )}

                {/* Customer info */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <p style={{ ...F, fontSize: 13, fontWeight: 700, color: 'var(--text-2)', marginBottom: 6 }}>اسم الزبون <span style={{ color: 'var(--text-3)', fontWeight: 400 }}>(اختياري)</span></p>
                    <input style={inp} placeholder="الاسم" value={noForm.customer} onChange={e => setNoForm(f => ({ ...f, customer: e.target.value }))} />
                  </div>
                  <div>
                    <p style={{ ...F, fontSize: 13, fontWeight: 700, color: 'var(--text-2)', marginBottom: 6 }}>رقم الهاتف <span style={{ color: 'var(--text-3)', fontWeight: 400 }}>(اختياري)</span></p>
                    <input style={{ ...inp, ...(noErrors.phone ? { borderColor: 'var(--red)' } : {}) }} placeholder="01XXXXXXXXX" value={noForm.phone} onChange={e => { setNoForm(f => ({ ...f, phone: e.target.value })); setNoErrors(p => ({ ...p, phone: '' })) }} dir="ltr" />
                    {noErrors.phone && <p style={{ ...F, color: 'var(--red)', fontSize: 12, marginTop: 4 }}>{noErrors.phone}</p>}
                  </div>
                </div>

                {/* Items */}
                <div>
                  <p style={{ ...F, fontSize: 13, fontWeight: 700, color: 'var(--text-2)', marginBottom: 8 }}>الأصناف</p>
                  {noErrors.items && <p style={{ ...F, color: 'var(--red)', fontSize: 12, marginBottom: 8 }}>{noErrors.items}</p>}

                  {/* Search */}
                  <input
                    type="text"
                    placeholder="🔍  ابحث عن صنف..."
                    value={noSearch}
                    onChange={e => setNoSearch(e.target.value)}
                    style={{ ...inp, marginBottom: 8 }}
                  />

                  {/* Category filter tabs */}
                  <div className="no-scrollbar" style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4, marginBottom: 10 }}>
                    {[{ id: 'all', name: 'الكل' }, ...cats.filter(c => allMenuItems.some(i => i.categoryId === c.id))].map(cat => (
                      <button key={cat.id} onClick={() => setNoActiveCat(cat.id)}
                        style={{ ...F, flexShrink: 0, height: 28, padding: '0 12px', borderRadius: 14, fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s', border: noActiveCat === cat.id ? 'none' : '1px solid var(--border)', background: noActiveCat === cat.id ? 'var(--accent)' : 'var(--surface-2)', color: noActiveCat === cat.id ? 'white' : 'var(--text-2)' }}>
                        {cat.name}
                      </button>
                    ))}
                  </div>

                  {/* Filtered items */}
                  <div style={{ border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', maxHeight: 260, overflowY: 'auto' }}>
                    {(() => {
                      const visibleItems = allMenuItems.filter(i => {
                        const matchCat = noActiveCat === 'all' || i.categoryId === noActiveCat
                        const matchSearch = !noSearch.trim() || i.name.includes(noSearch.trim())
                        return matchCat && matchSearch
                      })
                      if (!visibleItems.length) return (
                        <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-3)', ...F, fontSize: 13 }}>لا توجد أصناف</div>
                      )
                      return visibleItems.map((item, ii) => {
                        const qty = noQtys[item.id] || 0
                        return (
                          <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderTop: ii > 0 ? '1px solid var(--border)' : 'none', background: qty > 0 ? 'rgba(249,115,22,0.04)' : 'transparent', transition: 'background 0.15s' }}>
                            <div style={{ flex: 1 }}>
                              <p style={{ ...F, fontSize: 13, fontWeight: qty > 0 ? 700 : 500, color: 'var(--text)', marginBottom: 1 }}>{item.name}</p>
                              <p style={{ ...F, fontSize: 12, color: 'var(--accent)', fontWeight: 600 }}>{item.price} ج</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              {qty > 0 && (
                                <button onClick={() => setNoQtys(q => ({ ...q, [item.id]: Math.max(0, qty - 1) }))}
                                  style={{ width: 28, height: 28, borderRadius: 8, border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text-2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <Minus size={13} />
                                </button>
                              )}
                              {qty > 0 && <span style={{ ...F, fontSize: 14, fontWeight: 700, color: 'var(--text)', minWidth: 20, textAlign: 'center' }}>{qty}</span>}
                              <button onClick={() => setNoQtys(q => ({ ...q, [item.id]: qty + 1 }))}
                                style={{ width: 28, height: 28, borderRadius: 8, border: 'none', background: qty > 0 ? 'var(--accent)' : 'var(--surface-2)', color: qty > 0 ? 'white' : 'var(--text-2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }}>
                                <Add size={13} />
                              </button>
                            </div>
                          </div>
                        )
                      })
                    })()}
                  </div>
                </div>

                {/* Payment */}
                <div>
                  <p style={{ ...F, fontSize: 13, fontWeight: 700, color: 'var(--text-2)', marginBottom: 8 }}>طريقة الدفع</p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {['كاش عند الاستلام', 'بطاقة'].map(p => (
                      <button key={p} onClick={() => setNoForm(f => ({ ...f, payment: p }))}
                        style={{ ...F, flex: 1, padding: '9px 0', borderRadius: 10, border: '1.5px solid', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s', background: noForm.payment === p ? 'var(--accent)' : 'var(--surface-2)', borderColor: noForm.payment === p ? 'var(--accent)' : 'var(--border)', color: noForm.payment === p ? 'white' : 'var(--text-2)' }}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <p style={{ ...F, fontSize: 11, color: 'var(--text-3)', fontWeight: 500 }}>الإجمالي</p>
                  <p style={{ ...F, fontSize: 20, fontWeight: 800, color: 'var(--accent)', fontFamily: 'Inter, sans-serif' }}>{orderTotal} <span style={{ fontSize: 13, fontWeight: 600 }}>ج</span></p>
                </div>
                <button onClick={submitNewOrder} className="btn-primary" style={{ ...F, padding: '12px 28px', fontSize: 14, fontWeight: 800 }}>
                  تأكيد الطلب
                </button>
              </div>

            </div>
          </div>
        )
      })()}
    </Layout>
  )
}
