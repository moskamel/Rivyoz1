import { useState, useEffect } from 'react'
import { X, Check } from 'lucide-react'
import Layout from '../components/layout/Layout'
import { statusMap } from '../lib/mock'
import { getOrders, updateOrderStatus } from '../lib/restaurantStore'

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

export default function Orders() {
  const [activeTab, setActiveTab] = useState('all')
  const [orders, setOrders] = useState(getOrders)
  const [selected, setSelected] = useState(null)
  const [rejectModal, setRejectModal] = useState(null)
  const [rejectReason, setRejectReason] = useState('')

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

  return (
    <Layout title="الطلبات">
      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-5" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
        {tabs.map(tab => {
          const isActive = activeTab === tab.key
          const cnt = count(tab.key)
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                flexShrink: 0,
                padding: '7px 14px',
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                border: isActive ? '1px solid rgba(249,115,22,0.25)' : '1px solid var(--border)',
                background: isActive ? 'var(--accent-muted)' : 'var(--surface)',
                color: isActive ? 'var(--accent)' : 'var(--text-2)',
              }}
            >
              {tab.label}
              <span style={{
                fontSize: 10,
                fontWeight: 700,
                minWidth: 18,
                height: 18,
                borderRadius: 9,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 5px',
                fontFamily: 'Inter',
                background: tab.key === 'new' && cnt > 0 ? 'var(--red)' : isActive ? 'rgba(249,115,22,0.2)' : 'var(--surface-2)',
                color: tab.key === 'new' && cnt > 0 ? 'white' : isActive ? 'var(--accent)' : 'var(--text-3)',
              }}>
                {cnt}
              </span>
            </button>
          )
        })}
      </div>

      {/* Orders list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.length === 0 && (
          <div className="glass" style={{ padding: '48px 24px', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-3)', fontWeight: 500, fontSize: 14 }}>لا توجد طلبات</p>
          </div>
        )}
        {filtered.map(order => {
          const ss = statusStyle[order.status] || statusStyle.done
          return (
            <div
              key={order.id}
              onClick={() => setSelected(order)}
              className="glass"
              style={{
                padding: '16px',
                cursor: 'pointer',
                transition: 'all 0.15s',
                borderColor: order.status === 'new' ? 'rgba(248,113,113,0.3)' : 'var(--border)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = order.status === 'new' ? 'rgba(248,113,113,0.5)' : 'var(--border-strong)'; e.currentTarget.style.background = 'var(--surface-2)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = order.status === 'new' ? 'rgba(248,113,113,0.3)' : 'var(--border)'; e.currentTarget.style.background = 'var(--surface)' }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                <div className="flex items-center gap-2">
                  <span style={{ fontWeight: 700, color: 'var(--text)', fontFamily: 'Inter', fontSize: 13 }}>#{order.id}</span>
                  <span style={{ color: 'var(--text-3)', fontSize: 12 }}>·</span>
                  <span style={{ fontSize: 13, color: 'var(--text-2)' }}>{order.table}</span>
                  <span style={{ color: 'var(--text-3)', fontSize: 12 }}>·</span>
                  <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{order.time}</span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 6, background: ss.bg, color: ss.color }}>
                  {statusMap[order.status]?.label}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p style={{ fontSize: 13, color: 'var(--text-2)' }}>{order.items}</p>
                <p className="num" style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>{order.total} ج</p>
              </div>
              {order.status === 'new' && (
                <div className="flex gap-2" style={{ marginTop: 12 }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); setRejectModal(order) }}
                    style={{ flex: 1, padding: '8px', borderRadius: 8, border: '1px solid var(--border)', fontSize: 13, fontWeight: 600, color: 'var(--text-2)', background: 'transparent', cursor: 'pointer', transition: 'all 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--red-muted)'; e.currentTarget.style.color = 'var(--red)'; e.currentTarget.style.borderColor = 'rgba(248,113,113,0.3)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-2)'; e.currentTarget.style.borderColor = 'var(--border)' }}
                  >
                    رفض
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); advance(order.id) }}
                    className="btn-primary"
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                  >
                    <Check size={14} />
                    قبول الطلب
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Order detail modal */}
      {selected && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
          onClick={() => setSelected(null)}
        >
          <div
            style={{ background: 'var(--surface-2)', border: '1px solid var(--border-strong)', borderRadius: 20, width: '100%', maxWidth: 440, maxHeight: '85vh', overflowY: 'auto' }}
            onClick={e => e.stopPropagation()}
            className="animate-scale-in"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
              <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 15 }}>طلب <span className="num">#{selected.id}</span></p>
              <button
                onClick={() => setSelected(null)}
                style={{ width: 30, height: 30, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-3)', border: '1px solid var(--border)', cursor: 'pointer', color: 'var(--text-2)', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.color = 'var(--text)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface-3)'; e.currentTarget.style.color = 'var(--text-2)' }}
              >
                <X size={15} />
              </button>
            </div>
            <div style={{ padding: '16px 20px' }}>
              {/* Customer info */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                <div style={{ background: 'var(--surface-3)', borderRadius: 10, padding: '10px 12px' }}>
                  <p style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 600, marginBottom: 4 }}>الزبون</p>
                  <p style={{ fontSize: 13, color: 'var(--text)', fontWeight: 600 }}>{selected.customer}</p>
                </div>
                <div style={{ background: 'var(--surface-3)', borderRadius: 10, padding: '10px 12px' }}>
                  <p style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 600, marginBottom: 4 }}>الهاتف</p>
                  <p className="num" style={{ fontSize: 13, color: 'var(--text)', fontWeight: 600, direction: 'ltr' }}>{selected.phone}</p>
                </div>
                <div style={{ background: 'var(--surface-3)', borderRadius: 10, padding: '10px 12px' }}>
                  <p style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 600, marginBottom: 4 }}>الموقع</p>
                  <p style={{ fontSize: 13, color: 'var(--text)', fontWeight: 600 }}>{selected.table}</p>
                </div>
                <div style={{ background: 'var(--surface-3)', borderRadius: 10, padding: '10px 12px' }}>
                  <p style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 600, marginBottom: 4 }}>الدفع</p>
                  <p style={{ fontSize: 13, color: 'var(--text)', fontWeight: 600 }}>{selected.payment}</p>
                </div>
              </div>

              {/* Items */}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, marginBottom: 16 }}>
                <p style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>الأصناف</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {selected.details.map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>× {item.qty} {item.name}</p>
                        {item.note && <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>ملاحظة: {item.note}</p>}
                      </div>
                      <span className="num" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{item.price} ج</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>الإجمالي</span>
                <span className="num" style={{ fontWeight: 800, color: 'var(--accent)', fontSize: 18 }}>{selected.total} ج</span>
              </div>

              {/* Actions */}
              {nextStatus[selected.status] && (
                <div className="flex gap-2">
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

      {/* Reject modal */}
      {rejectModal && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
          onClick={() => setRejectModal(null)}
        >
          <div
            style={{ background: 'var(--surface-2)', border: '1px solid var(--border-strong)', borderRadius: 20, width: '100%', maxWidth: 360, padding: 24 }}
            onClick={e => e.stopPropagation()}
            className="animate-scale-in"
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
                style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--surface-3)', color: 'var(--text)', fontSize: 13, outline: 'none', fontFamily: 'Cairo', transition: 'border-color 0.15s' }}
                onFocus={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
              />
            </div>
            <button
              onClick={() => reject(rejectModal.id)}
              disabled={!rejectReason}
              style={{ width: '100%', padding: '11px', background: rejectReason ? 'var(--red)' : 'var(--surface-3)', color: rejectReason ? 'white' : 'var(--text-3)', borderRadius: 10, fontWeight: 700, fontSize: 14, border: 'none', cursor: rejectReason ? 'pointer' : 'not-allowed', transition: 'all 0.15s', fontFamily: 'Cairo' }}
            >
              تأكيد الرفض
            </button>
          </div>
        </div>
      )}
    </Layout>
  )
}
