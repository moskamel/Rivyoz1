import { useState, useEffect } from 'react'
import { getOrders, updateOrderStatus } from '../lib/restaurantStore'

// Generate a fake createdAt timestamp based on the time string in mock data
function parseFakeCreatedAt(timeStr) {
  const now = Date.now()
  const match = timeStr.match(/(\d+)/)
  if (!match) return now - 60000
  const n = parseInt(match[1])
  if (timeStr.includes('ساعة')) return now - n * 60 * 60 * 1000
  if (timeStr.includes('دقيقة') || timeStr.includes('دقيقتين')) return now - n * 60 * 1000
  return now - 2 * 60 * 1000
}

function useTimer(createdAt) {
  const [elapsed, setElapsed] = useState(Math.floor((Date.now() - createdAt) / 1000))
  useEffect(() => {
    const id = setInterval(() => setElapsed(Math.floor((Date.now() - createdAt) / 1000)), 1000)
    return () => clearInterval(id)
  }, [createdAt])
  return elapsed
}

function formatElapsed(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

const categoryFilters = ['الكل', 'مشويات', 'مشروبات', 'حلويات']

function OrderCard({ order, onAction }) {
  const createdAt = parseFakeCreatedAt(order.time)
  const elapsed = useTimer(createdAt)
  const isOverdue = elapsed > 600
  const isWarning = elapsed >= 300 && elapsed <= 600
  const isNew = order.status === 'new'

  let borderColor = 'var(--border)'
  let boxShadow = 'none'
  if (isOverdue) {
    borderColor = 'rgba(248,113,113,0.5)'
    boxShadow = '0 0 0 1px rgba(248,113,113,0.3)'
  } else if (isWarning) {
    borderColor = 'rgba(251,191,36,0.4)'
  }

  let timerColor = 'var(--text-3)'
  if (isWarning) timerColor = 'var(--yellow)'
  if (isOverdue) timerColor = 'var(--red)'

  return (
    <div
      style={{
        background: 'var(--surface)',
        border: `1px solid ${borderColor}`,
        borderRadius: 'var(--radius-xl)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'box-shadow var(--dur-normal) var(--ease-default), border-color var(--dur-normal) var(--ease-default)',
        boxShadow,
      }}
    >
      {/* Card Header */}
      <div style={{
        padding: '14px 16px 12px',
        borderBottom: '1px solid var(--border)',
      }}>
        {/* Row 1: Order # + timer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{
            fontSize: 18,
            fontWeight: 900,
            color: 'var(--text)',
            fontFamily: 'Inter, sans-serif',
            direction: 'ltr',
          }}>
            #{order.id}
          </span>
          <span className="num" style={{
            fontSize: 15,
            fontWeight: 700,
            color: timerColor,
            fontFamily: 'Inter, monospace',
            letterSpacing: '0.03em',
          }}>
            {formatElapsed(elapsed)}
          </span>
        </div>
        {/* Row 2: table/type + status badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 500 }}>
            {order.table}
          </span>
          {isNew
            ? <span className="badge badge-red badge-pill badge-sm">جديد</span>
            : <span className="badge badge-blue badge-pill badge-sm">جاري التحضير</span>
          }
        </div>
      </div>

      {/* Card Items */}
      <div style={{
        padding: '12px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        flex: 1,
      }}>
        {order.details.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            {/* Qty bubble */}
            <div style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: 'var(--surface-3)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
              fontWeight: 800,
              color: 'var(--text-2)',
              fontFamily: 'Inter, sans-serif',
              flexShrink: 0,
            }}>
              {item.qty}
            </div>
            {/* Name + note */}
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', margin: 0 }}>
                {item.name}
              </p>
              {item.note && (
                <span style={{
                  display: 'inline-block',
                  marginTop: 3,
                  fontSize: 11,
                  fontStyle: 'italic',
                  color: 'var(--yellow)',
                  background: 'rgba(251,191,36,0.08)',
                  borderRadius: 6,
                  padding: '2px 8px',
                }}>
                  {item.note}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Card Footer */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        {order.total && (
          <span className="num" style={{
            fontSize: 14,
            fontWeight: 800,
            color: 'var(--accent)',
            whiteSpace: 'nowrap',
          }}>
            {order.total} ج
          </span>
        )}
        <button
          onClick={() => onAction(order.id, isNew ? 'preparing' : 'ready')}
          style={{
            flex: 1,
            height: 38,
            fontSize: 13,
            fontWeight: 700,
            border: 'none',
            borderRadius: 'var(--radius-lg)',
            cursor: 'pointer',
            transition: 'all var(--dur-normal) var(--ease-default)',
            fontFamily: 'Cairo, sans-serif',
            ...(isNew
              ? { background: 'var(--accent)', color: 'white' }
              : { background: 'var(--green)', color: 'white' }
            ),
          }}
          onMouseEnter={e => {
            e.currentTarget.style.opacity = '0.88'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.opacity = '1'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          {isNew ? 'ابدأ التحضير →' : 'تم التحضير ✓'}
        </button>
      </div>
    </div>
  )
}

export default function KDS() {
  const [activeFilter, setActiveFilter] = useState('الكل')
  const [orders, setOrders] = useState(() =>
    getOrders().filter(o => o.status === 'new' || o.status === 'preparing').map(o => ({ ...o }))
  )
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const clockId = setInterval(() => setTime(new Date()), 1000)
    const pollId = setInterval(() => {
      setOrders(getOrders().filter(o => o.status === 'new' || o.status === 'preparing').map(o => ({ ...o })))
    }, 5000)
    return () => { clearInterval(clockId); clearInterval(pollId) }
  }, [])

  function handleAction(orderId, newStatus) {
    updateOrderStatus(orderId, newStatus)
    if (newStatus === 'ready') {
      setOrders(prev => prev.filter(o => o.id !== orderId))
    } else {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
    }
  }

  const filteredOrders = orders.filter(order => {
    if (activeFilter === 'الكل') return true
    const catMap = {
      'مشويات': ['كفتة', 'فراخ', 'لحم', 'شاورما'],
      'مشروبات': ['عصير', 'مياه', 'كولا'],
      'حلويات': ['حلو', 'أم علي', 'بسبوسة'],
    }
    const keywords = catMap[activeFilter] || []
    return keywords.some(kw => order.items.includes(kw))
  })

  const timeStr = time.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

  return (
    <div
      dir="rtl"
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        fontFamily: "'Cairo', sans-serif",
        color: 'var(--text)',
      }}
    >
      {/* Header Bar */}
      <div style={{
        height: 64,
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* RIGHT: Brand area */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'var(--accent-muted)',
            border: '1px solid var(--border-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            fontWeight: 900,
            color: 'var(--accent)',
            fontFamily: 'Inter, sans-serif',
          }}>
            K
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', margin: 0, lineHeight: 1.2 }}>
              KDS — شاشة المطبخ
            </p>
            <p style={{ fontSize: 11, color: 'var(--text-2)', margin: 0, marginTop: 1 }}>
              مطعم الشيف أحمد
            </p>
          </div>
        </div>

        {/* CENTER: Live clock (absolute) */}
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
        }}>
          <span className="num" style={{
            fontSize: 22,
            fontWeight: 800,
            color: 'var(--accent)',
            fontFamily: 'Inter, monospace',
            letterSpacing: '0.04em',
          }}>
            {timeStr}
          </span>
        </div>

        {/* LEFT: Live indicator + count + divider + back */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Live indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span className="status-dot live" />
            <span style={{ fontSize: 11, color: 'var(--green)', fontWeight: 600 }}>مباشر</span>
          </div>

          {/* Active orders count badge */}
          <span className="badge badge-accent badge-pill badge-sm">
            {orders.length}
          </span>

          {/* Divider */}
          <div style={{ width: 1, height: 20, background: 'var(--border)' }} />

          {/* Back link */}
          <a
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              height: 32,
              padding: '0 12px',
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--text-2)',
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              textDecoration: 'none',
              transition: 'all var(--dur-normal) var(--ease-default)',
              fontFamily: 'Cairo, sans-serif',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--text)'
              e.currentTarget.style.borderColor = 'var(--border-strong)'
              e.currentTarget.style.background = 'var(--surface-2)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--text-2)'
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            لوحة التحكم
          </a>
        </div>
      </div>

      {/* Category Filter */}
      <div style={{
        padding: '12px 24px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--surface)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        overflowX: 'auto',
      }}
        className="no-scrollbar"
      >
        {categoryFilters.map(f => {
          const isActive = activeFilter === f
          return (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                flexShrink: 0,
                height: 32,
                borderRadius: 'var(--radius-full)',
                padding: '0 14px',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'Cairo, sans-serif',
                transition: 'all var(--dur-normal) var(--ease-default)',
                border: isActive ? 'none' : '1px solid var(--border)',
                background: isActive ? 'var(--accent)' : 'var(--surface-2)',
                color: isActive ? 'white' : 'var(--text-2)',
              }}
            >
              {f}
            </button>
          )
        })}
      </div>

      {/* Orders Grid */}
      <div style={{
        padding: 20,
        minHeight: 'calc(100vh - 120px)',
      }}>
        {filteredOrders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👨‍🍳</div>
            <p className="empty-title">لا توجد طلبات نشطة</p>
            <p className="empty-desc">في انتظار طلبات جديدة...</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: 16,
          }}>
            {filteredOrders.map(order => (
              <OrderCard key={order.id} order={order} onAction={handleAction} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
