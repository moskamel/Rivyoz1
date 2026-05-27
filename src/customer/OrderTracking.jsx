import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getConfig, getOrders } from '../lib/restaurantStore'
import { ArrowRight, MessageCircle, Compass } from 'lucide-react'

const steps = [
  { key: 'new', label: 'تم استلام طلبك', sub: 'المطعم راجع طلبك', icon: '📋' },
  { key: 'preparing', label: 'جاري التحضير', sub: 'الشيف بيشتغل على طلبك', icon: '👨‍🍳' },
  { key: 'ready_or_delivering', label: 'في الطريق / جاهز', sub: 'طلبك قريب منك!', icon: '🛵' },
  { key: 'done', label: 'تم التسليم', sub: 'استمتع بوجبتك 😋', icon: '✅' },
]

const statusToStep = { new: 0, preparing: 1, ready: 2, delivering: 2, done: 3, cancelled: -1 }

export default function OrderTracking() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const config = getConfig()

  const [order, setOrder] = useState(() => {
    const orders = getOrders()
    return orders.find(o => String(o.id) === String(orderId)) || null
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const orders = getOrders()
      const found = orders.find(o => String(o.id) === String(orderId))
      if (found) setOrder(found)
    }, 5000)
    return () => clearInterval(interval)
  }, [orderId])

  const currentStep = order ? (statusToStep[order.status] ?? 0) : 0
  const isCancelled = order?.status === 'cancelled'
  const isDone = order?.status === 'done'

  if (!order) {
    return (
      <div style={{ minHeight: '100vh', background: '#F9FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center' }} dir="rtl">
        <div style={{ textAlign: 'center', padding: 32 }}>
          <p style={{ fontSize: 48, marginBottom: 16 }}>🔍</p>
          <p style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 8 }}>لم نجد الطلب</p>
          <p style={{ color: '#6B7280', fontSize: 13, marginBottom: 20 }}>تحقق من رقم الطلب وحاول مرة أخرى</p>
          <button
            onClick={() => navigate('/')}
            style={{ padding: '12px 28px', borderRadius: 14, color: 'white', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', background: config.color }}
          >
            رجوع للرئيسية
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB' }} dir="rtl">
      {/* Header */}
      <div style={{
        background: isCancelled ? '#EF4444' : config.color,
        padding: '16px 20px',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}
        >
          <ArrowRight size={18} />
        </button>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 17, color: 'white', flexShrink: 0 }}>
          {config.name.charAt(0)}
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: 800, fontSize: 15, color: 'white' }}>{config.name}</p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 1 }}>تتبع طلبك · #{order.id}</p>
        </div>
        {isDone && (
          <div style={{ padding: '5px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.2)' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>تم ✓</p>
          </div>
        )}
      </div>

      <div style={{ maxWidth: 480, margin: '0 auto', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Cancelled banner */}
        {isCancelled && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 16, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 22 }}>❌</span>
            <div>
              <p style={{ fontWeight: 700, color: '#DC2626', fontSize: 14 }}>تم إلغاء الطلب</p>
              <p style={{ fontSize: 12, color: '#EF4444', marginTop: 2 }}>تواصل مع المطعم لمزيد من التفاصيل</p>
            </div>
          </div>
        )}

        {/* Order summary */}
        <div style={{ background: 'white', borderRadius: 20, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)', border: '1px solid #F3F4F6' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid #F3F4F6' }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.06em', marginBottom: 2 }}>رقم الطلب</p>
              <p style={{ fontSize: 20, fontWeight: 900, color: '#111827', fontFamily: 'Inter, monospace', direction: 'ltr' }}>#{order.id}</p>
            </div>
            <div style={{
              padding: '6px 14px', borderRadius: 10,
              background: isCancelled ? '#FEF2F2' : '#F0FDF4',
              border: `1px solid ${isCancelled ? '#FECACA' : '#BBF7D0'}`,
            }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: isCancelled ? '#DC2626' : '#16A34A' }}>
                {isCancelled ? 'ملغي' : 'جاري التتبع'}
              </p>
            </div>
          </div>

          {/* Estimated time */}
          {!isCancelled && !isDone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 12, background: '#FFF7ED' }}>
              <span style={{ fontSize: 20 }}>⏱</span>
              <div>
                <p style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 2 }}>الوقت المتوقع للوصول</p>
                <p style={{ fontSize: 15, fontWeight: 800, color: config.color }}>{config.deliveryTime} دقيقة</p>
              </div>
            </div>
          )}
          {isDone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 12, background: '#F0FDF4' }}>
              <span style={{ fontSize: 20 }}>🎉</span>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#16A34A' }}>تم توصيل طلبك بنجاح!</p>
            </div>
          )}
        </div>

        {/* Timeline */}
        {!isCancelled && (
          <div style={{ background: 'white', borderRadius: 20, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)', border: '1px solid #F3F4F6' }}>
            <p style={{ fontWeight: 800, color: '#111827', fontSize: 14, marginBottom: 20 }}>مراحل الطلب</p>
            <div>
              {steps.map((step, idx) => {
                const done = idx < currentStep
                const active = idx === currentStep
                const future = idx > currentStep
                const isLast = idx === steps.length - 1

                return (
                  <div key={step.key} style={{ display: 'flex', gap: 14 }}>
                    {/* Dot + line */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                        background: done ? config.color : active ? 'white' : '#F9FAFB',
                        border: `2.5px solid ${done ? config.color : active ? config.color : '#E5E7EB'}`,
                        boxShadow: done ? `0 4px 12px ${config.color}35` : active ? `0 0 0 4px ${config.color}18` : 'none',
                        transition: 'all 0.3s',
                      }}>
                        {done ? '✓' : step.icon}
                      </div>
                      {!isLast && (
                        <div style={{
                          width: 2, height: 32, marginTop: 4, borderRadius: 2,
                          background: done ? config.color : '#E5E7EB',
                          transition: 'background 0.3s',
                        }} />
                      )}
                    </div>

                    {/* Content */}
                    <div style={{ paddingBottom: isLast ? 0 : 28, flex: 1, paddingTop: 8 }}>
                      <p style={{ fontSize: 14, fontWeight: done || active ? 700 : 500, color: done || active ? '#111827' : '#9CA3AF', transition: 'color 0.3s' }}>
                        {step.label}
                      </p>
                      {(done || active) && (
                        <p style={{ fontSize: 12, color: active ? config.color : '#6B7280', marginTop: 2, transition: 'color 0.3s' }}>
                          {active ? 'جاري الآن...' : step.sub}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Order items */}
        {order.details && order.details.length > 0 && (
          <div style={{ background: 'white', borderRadius: 20, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)', border: '1px solid #F3F4F6' }}>
            <p style={{ fontWeight: 800, color: '#111827', fontSize: 14, marginBottom: 14 }}>تفاصيل الطلب</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {order.details.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 24, height: 24, borderRadius: 6, background: `${config.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: config.color, fontFamily: 'Inter', direction: 'ltr' }}>×{item.qty}</span>
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#374151' }}>{item.name}</p>
                      {item.note && <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>ملاحظة: {item.note}</p>}
                    </div>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#111827', flexShrink: 0, fontFamily: 'Inter', direction: 'ltr' }}>{item.price} ج</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid #F3F4F6', marginTop: 14, paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>الإجمالي</span>
              <span style={{ fontSize: 18, fontWeight: 900, color: config.color, fontFamily: 'Inter', direction: 'ltr' }}>{order.total} ج</span>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <a
            href={`https://wa.me/${config.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '15px', borderRadius: 14, background: '#25D366', color: 'white',
              fontWeight: 700, fontSize: 14, textDecoration: 'none',
              boxShadow: '0 6px 20px rgba(37,211,102,0.35)',
            }}
          >
            <MessageCircle size={17} />
            تواصل مع المطعم واتساب
          </a>

          <button
            onClick={() => navigate('/explore')}
            style={{
              width: '100%', padding: '13px', borderRadius: 14, fontWeight: 700, fontSize: 14, cursor: 'pointer',
              background: 'white', border: `2px solid ${config.color}`, color: config.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            <Compass size={15} />
            اكتشف مطاعم تانية
          </button>
        </div>
      </div>
    </div>
  )
}
