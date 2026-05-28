import { useState, useEffect } from 'react'
import { X, Check } from 'lucide-react'
import Layout from '../components/layout/Layout'
import { statusMap } from '../lib/mock'
import { getOrders, updateOrderStatus } from '../lib/restaurantStore'

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
        >
          طلب جديد +
        </button>
      </div>

      {/* FILTER TABS */}
      <div
        className="no-scrollbar"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          overflowX: 'auto',
          marginBottom: 16,
          paddingBottom: 2,
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
                flexShrink: 0,
                height: 34,
                borderRadius: 'var(--radius-full)',
                padding: '0 14px',
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
                fontFamily: 'Cairo, sans-serif',
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
                    style={{ height: 34, fontSize: 12, padding: '0 14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontFamily: 'Cairo, sans-serif', fontWeight: 600, borderRadius: 'var(--radius)', transition: 'all var(--dur-normal) var(--ease-default)' }}
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
                <X size={15} />
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
                    fontFamily: 'Cairo, sans-serif',
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
                  fontFamily: 'Cairo, sans-serif',
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
                fontFamily: 'Cairo, sans-serif',
              }}
            >
              تأكيد الرفض
            </button>
          </div>
        </div>
      )}
    </Layout>
  )
}
