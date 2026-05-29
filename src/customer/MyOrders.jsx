import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'iconsax-react'
import { getCustomerOrders, getCustomerProfile, getConfig } from '../lib/restaurantStore'
import CustomerNav from './CustomerNav'
import CustomerFooter from './CustomerFooter'

const STATUS_LABEL = {
  new: 'جديد 🔔', preparing: 'جاري التحضير 👨‍🍳',
  ready: 'جاهز 🟢', delivering: 'في الطريق 🛵',
  done: 'مُسلَّم ✓', cancelled: 'ملغي ✗',
}
const STATUS_BG = {
  new: '#FFF7ED', preparing: '#FFFBEB', ready: '#F0FDF4',
  delivering: '#EFF6FF', done: '#F0FDF4', cancelled: '#FEF2F2',
}
const STATUS_COLOR = {
  new: '#EA580C', preparing: '#D97706', ready: '#16A34A',
  delivering: '#2563EB', done: '#16A34A', cancelled: '#DC2626',
}

function OrderCard({ order, config, onClick }) {
  const status = order.status || 'new'
  const isActive = !['done', 'cancelled'].includes(status)
  const itemCount = order.details?.reduce((s, i) => s + (i.qty || 1), 0) || 0

  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--surface)', borderRadius: 18, padding: '16px', cursor: 'pointer',
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        border: isActive ? `1.5px solid ${config.color}35` : '1px solid var(--border)',
        position: 'relative', overflow: 'hidden', transition: 'transform 0.1s',
      }}
      onTouchStart={e => (e.currentTarget.style.transform = 'scale(0.985)')}
      onTouchEnd={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {isActive && (
        <div style={{ position: 'absolute', top: 0, right: 0, width: 4, height: '100%', background: config.color, borderRadius: '0 18px 18px 0' }} />
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 46, height: 46, borderRadius: 14, flexShrink: 0,
          background: `linear-gradient(135deg, ${config.color}, ${config.color}cc)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, color: 'white', fontWeight: 900,
        }}>
          {config.name.charAt(0)}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
            <p style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)' }}>{config.name}</p>
            <span style={{
              padding: '3px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700,
              background: STATUS_BG[status], color: STATUS_COLOR[status],
            }}>
              {STATUS_LABEL[status]}
            </span>
          </div>
          <p style={{ fontSize: 12, color: '#6B7280', marginBottom: 5 }}>
            {itemCount > 0 ? `${itemCount} عنصر · ` : ''}{order.total} ج
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 11, color: '#D1D5DB', fontFamily: 'Inter, monospace' }}>#{order.id}</span>
            {isActive
              ? <span style={{ fontSize: 12, color: config.color, fontWeight: 700 }}>تتبع الطلب ←</span>
              : order.rating
                ? <span style={{ fontSize: 12 }}>{'⭐'.repeat(order.rating)}</span>
                : <span style={{ fontSize: 11, color: '#D1D5DB' }}>لم يتم التقييم</span>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MyOrders() {
  const navigate = useNavigate()
  const config = getConfig()
  const [profile] = useState(getCustomerProfile)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (!profile) {
      navigate('/customer-login', { state: { from: '/my-orders' } })
      return
    }
    setOrders(getCustomerOrders(profile.phone))
  }, [])

  const active = orders.filter(o => !['done', 'cancelled'].includes(o.status))
  const past = orders.filter(o => ['done', 'cancelled'].includes(o.status))

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'Zain, sans-serif', direction: 'rtl' }}>
      {/* Header */}
      <div style={{
        background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '14px 16px',
        position: 'sticky', top: 0, zIndex: 10, display: 'flex', alignItems: 'center', gap: 12,
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{ width: 38, height: 38, borderRadius: 12, background: 'var(--surface-2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          <ArrowRight size={18} color="#374151" />
        </button>
        <h1 style={{ fontWeight: 800, fontSize: 18, color: 'var(--text)', flex: 1 }}>طلباتي</h1>
        {orders.length > 0 && (
          <span style={{ fontSize: 12, color: '#6B7280', background: '#F3F4F6', padding: '3px 10px', borderRadius: 20, fontFamily: 'Inter, sans-serif' }}>
            {orders.length}
          </span>
        )}
      </div>

      <div style={{ padding: '12px 14px 88px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '72px 20px' }}>
            <p style={{ fontSize: 56, marginBottom: 16 }}>🍽️</p>
            <p style={{ fontWeight: 800, fontSize: 17, color: 'var(--text)', marginBottom: 8 }}>لا توجد طلبات بعد</p>
            <p style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 28, lineHeight: 1.6 }}>
              اطلب وجبتك الأولى وستظهر هنا
            </p>
            <button
              onClick={() => navigate('/explore')}
              style={{
                padding: '14px 32px', borderRadius: 14, background: config.color,
                color: 'white', fontWeight: 700, fontSize: 14, border: 'none',
                cursor: 'pointer', fontFamily: 'Zain, sans-serif',
                boxShadow: `0 6px 20px ${config.color}44`,
              }}
            >
              استكشف المطاعم
            </button>
          </div>
        ) : (
          <>
            {active.length > 0 && (
              <>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.07em', padding: '4px 2px 2px' }}>
                  جاري التنفيذ
                </p>
                {active.map(order => (
                  <OrderCard key={order.id} order={order} config={config} onClick={() => navigate(`/track/${order.id}`)} />
                ))}
              </>
            )}
            {past.length > 0 && (
              <>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.07em', padding: '10px 2px 2px' }}>
                  الطلبات السابقة
                </p>
                {past.map(order => (
                  <OrderCard key={order.id} order={order} config={config} onClick={() => navigate(`/track/${order.id}`)} />
                ))}
              </>
            )}
          </>
        )}
      </div>

      <CustomerFooter />
      <CustomerNav />
    </div>
  )
}
