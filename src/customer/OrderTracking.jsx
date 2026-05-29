import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getConfig, getOrders, rateOrder } from '../lib/restaurantStore'
import { ArrowRight, MessageCircle, Discover } from 'iconsax-react'
import CustomerNav from './CustomerNav'
import CustomerFooter from './CustomerFooter'

const steps = [
  { key: 'new', label: 'استلام الطلب', sub: 'المطعم راجع طلبك', icon: '📋' },
  { key: 'preparing', label: 'جاري التحضير', sub: 'الشيف بيشتغل على طلبك', icon: '👨‍🍳' },
  { key: 'ready_or_delivering', label: 'في الطريق 🛵', sub: 'طلبك قريب منك!', icon: '🛵' },
  { key: 'done', label: 'تم التسليم 🎉', sub: 'استمتع بوجبتك!', icon: '✅' },
]

const statusToStep = { new: 0, preparing: 1, ready: 2, delivering: 2, done: 3, cancelled: -1 }

const estimatedTime = (status) => {
  if (status === 'new') return '~30 دقيقة'
  if (status === 'preparing') return '~20 دقيقة'
  if (status === 'ready' || status === 'delivering') return '~10 دقائق'
  return null
}

export default function OrderTracking() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const config = getConfig()
  const [stars, setStars] = useState(() => {
    const orders = getOrders()
    return orders.find(o => String(o.id) === String(orderId))?.rating || 0
  })
  const [hoverStar, setHoverStar] = useState(0)

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
  const eta = order ? estimatedTime(order.status) : null

  const headerBg = isCancelled
    ? 'linear-gradient(135deg, #EF4444, #DC2626)'
    : isDone
    ? 'linear-gradient(135deg, #22C55E, #16A34A)'
    : `linear-gradient(135deg, ${config.color}, ${config.color}cc)`

  if (!order) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} dir="rtl">
        <div style={{ textAlign: 'center', padding: 32 }}>
          <p style={{ fontSize: 48, marginBottom: 16 }}>🔍</p>
          <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>لم نجد الطلب</p>
          <p style={{ color: 'var(--text-2)', fontSize: 13, marginBottom: 20 }}>تحقق من رقم الطلب وحاول مرة أخرى</p>
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
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'Zain, sans-serif' }} dir="rtl">
      <style>{`
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 ${config.color}60; }
          70% { box-shadow: 0 0 0 10px ${config.color}00; }
          100% { box-shadow: 0 0 0 0 ${config.color}00; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes confetti-fall {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(60px) rotate(360deg); opacity: 0; }
        }
        .step-current {
          animation: pulse-ring 1.5s ease-in-out infinite;
        }
        .confetti-piece {
          animation: confetti-fall 2s ease-in infinite;
        }
      `}</style>

      {/* Header */}
      <div style={{
        background: headerBg,
        padding: '20px 16px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -20, left: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -30, right: 40, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />

        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <button
            onClick={() => navigate(-1)}
            style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0, backdropFilter: 'blur(8px)' }}
          >
            <ArrowRight size={18} />
          </button>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 900, fontSize: 18, color: 'white', letterSpacing: '-0.02em' }}>تتبع طلبك</p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 2 }}>
              {isCancelled ? 'تم إلغاء الطلب' : isDone ? 'تم التسليم بنجاح ✓' : 'جاري التتبع...'}
            </p>
          </div>
          {/* Order badge */}
          <div style={{ padding: '6px 14px', borderRadius: 20, background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.3)' }}>
            <p style={{ fontSize: 13, fontWeight: 800, color: 'white', fontFamily: 'Inter, monospace', direction: 'ltr' }}>#{order.id}</p>
          </div>
        </div>

        {/* ETA pill */}
        {eta && !isCancelled && !isDone && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 20, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)' }}>
            <span style={{ fontSize: 16 }}>⏱</span>
            <span style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>{eta}</span>
          </div>
        )}
        {isDone && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 20, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)' }}>
            <span style={{ fontSize: 16 }}>🎉</span>
            <span style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>استمتع بوجبتك!</span>
          </div>
        )}
        {isCancelled && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 20, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)' }}>
            <span style={{ fontSize: 16 }}>😔</span>
            <span style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>تم إلغاء طلبك</span>
          </div>
        )}
      </div>

      <div style={{ padding: '16px 16px 40px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* ── CANCELLED STATE ── */}
        {isCancelled && (
          <div style={{ background: '#FEF2F2', border: '1.5px solid #FECACA', borderRadius: 20, padding: 24, textAlign: 'center' }}>
            <p style={{ fontSize: 56, marginBottom: 12 }}>😔</p>
            <p style={{ fontSize: 18, fontWeight: 900, color: '#DC2626', marginBottom: 6 }}>تم إلغاء طلبك</p>
            <p style={{ fontSize: 13, color: '#EF4444', marginBottom: 20, lineHeight: 1.6 }}>نأسف لذلك! تواصل مع المطعم لمزيد من التفاصيل</p>
            <button
              onClick={() => navigate('/')}
              style={{ padding: '13px 32px', background: config.color, color: 'white', borderRadius: 14, fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', fontFamily: 'Zain, sans-serif', boxShadow: `0 8px 24px ${config.color}44` }}
            >
              اطلب مرة أخرى 🔄
            </button>
          </div>
        )}

        {/* ── DONE — Rating card ── */}
        {isDone && (
          <div style={{ background: 'var(--surface)', borderRadius: 20, padding: 20, boxShadow: '0 4px 24px rgba(34,197,94,0.12)', border: '1.5px solid #BBF7D0', textAlign: 'center' }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#16A34A', marginBottom: 12 }}>🎉 كيف كانت تجربتك؟</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
              {[1, 2, 3, 4, 5].map(s => (
                <button
                  key={s}
                  onClick={() => { setStars(s); rateOrder(orderId, s) }}
                  onMouseEnter={() => setHoverStar(s)}
                  onMouseLeave={() => setHoverStar(0)}
                  style={{ fontSize: 28, background: 'none', border: 'none', cursor: 'pointer', padding: 2, transition: 'transform 0.1s', transform: s <= (hoverStar || stars) ? 'scale(1.2)' : 'scale(1)' }}
                >
                  {s <= (hoverStar || stars) ? '⭐' : '☆'}
                </button>
              ))}
            </div>
            {stars > 0 && (
              <p style={{ fontSize: 13, color: '#16A34A', fontWeight: 600 }}>
                {stars >= 5 ? 'رائع! شكراً جزيلاً 🙏' : stars >= 3 ? 'شكراً على تقييمك!' : 'نأسف لتجربتك، سنتحسن!'}
              </p>
            )}
          </div>
        )}

        {/* ── Progress Timeline ── */}
        {!isCancelled && (
          <div style={{ background: 'var(--surface)', borderRadius: 20, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)', border: '1px solid var(--border)' }}>
            <p style={{ fontWeight: 800, color: 'var(--text)', fontSize: 14, marginBottom: 20 }}>مراحل الطلب</p>
            <div>
              {steps.map((step, idx) => {
                const done = idx < currentStep
                const active = idx === currentStep
                const future = idx > currentStep
                const isLast = idx === steps.length - 1

                const dotBg = done ? '#22C55E' : active ? config.color : 'white'
                const dotBorder = done ? '#22C55E' : active ? config.color : '#E5E7EB'
                const lineColor = done ? '#22C55E' : '#E5E7EB'
                const lineDashed = future

                return (
                  <div key={step.key} style={{ display: 'flex', gap: 14, position: 'relative' }}>
                    {/* Circle + line column */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                      {/* Step circle */}
                      <div
                        className={active ? 'step-current' : ''}
                        style={{
                          width: 36, height: 36, borderRadius: '50%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: dotBg,
                          border: `2.5px solid ${dotBorder}`,
                          transition: 'all 0.4s',
                          position: 'relative',
                          zIndex: 1,
                          flexShrink: 0,
                        }}
                      >
                        {done ? (
                          <span style={{ color: 'white', fontWeight: 900, fontSize: 14 }}>✓</span>
                        ) : active ? (
                          <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'white', display: 'block' }} />
                        ) : (
                          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#D1D5DB', display: 'block' }} />
                        )}
                      </div>
                      {/* Connector line */}
                      {!isLast && (
                        <div style={{
                          width: 2,
                          height: 60,
                          marginTop: 4,
                          background: lineDashed
                            ? 'repeating-linear-gradient(to bottom, #E5E7EB 0px, #E5E7EB 4px, transparent 4px, transparent 8px)'
                            : lineColor,
                          transition: 'background 0.4s',
                          borderRadius: 2,
                        }} />
                      )}
                    </div>

                    {/* Step content */}
                    <div style={{ paddingBottom: isLast ? 0 : 20, flex: 1, paddingTop: 6 }}>
                      <p style={{
                        fontSize: 14, fontWeight: done || active ? 800 : 500,
                        color: done ? '#16A34A' : active ? '#111827' : '#9CA3AF',
                        transition: 'color 0.3s',
                        marginBottom: 3,
                      }}>
                        {step.label}
                      </p>
                      {(done || active) && (
                        <p style={{ fontSize: 12, color: active ? config.color : '#6B7280', transition: 'color 0.3s', lineHeight: 1.4 }}>
                          {active ? 'جاري الآن...' : step.sub}
                        </p>
                      )}
                      {future && (
                        <p style={{ fontSize: 11, color: '#D1D5DB' }}>في انتظار التحديث</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Order Info Card ── */}
        <div style={{ background: 'var(--surface)', borderRadius: 20, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)', border: '1px solid var(--border)' }}>
          {/* Restaurant header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: `linear-gradient(135deg, ${config.color}, ${config.color}cc)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 18, color: 'white', flexShrink: 0 }}>
              {config.name.charAt(0)}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)' }}>{config.name}</p>
              <p style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>رقم الطلب: <span style={{ fontFamily: 'Inter, monospace', direction: 'ltr', display: 'inline-block' }}>#{order.id}</span></p>
            </div>
            <div style={{
              padding: '5px 12px', borderRadius: 10,
              background: isCancelled ? '#FEF2F2' : isDone ? '#F0FDF4' : '#FFF7ED',
              border: `1px solid ${isCancelled ? '#FECACA' : isDone ? '#BBF7D0' : `${config.color}40`}`,
            }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: isCancelled ? '#DC2626' : isDone ? '#16A34A' : config.color }}>
                {isCancelled ? 'ملغي' : isDone ? 'مُسلَّم ✓' : 'جاري'}
              </p>
            </div>
          </div>

          {/* Items */}
          {order.details && order.details.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
              {order.details.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 24, height: 24, borderRadius: 6, background: `${config.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontSize: 10, fontWeight: 800, color: config.color, fontFamily: 'Inter', direction: 'ltr' }}>×{item.qty}</span>
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{item.name}</p>
                      {item.note && <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 1 }}>ملاحظة: {item.note}</p>}
                    </div>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', flexShrink: 0, fontFamily: 'Inter', direction: 'ltr' }}>{item.price} ج</span>
                </div>
              ))}
            </div>
          )}

          {/* Total + delivery */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14 }}>
            {order.address && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 14 }}>📍</span>
                <span style={{ fontSize: 12, color: 'var(--text-2)' }}>{order.address}</span>
              </div>
            )}
            {order.paymentMethod && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 14 }}>💳</span>
                <span style={{ fontSize: 12, color: 'var(--text-2)' }}>{order.paymentMethod}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>الإجمالي</span>
              <span style={{ fontSize: 18, fontWeight: 900, color: config.color, fontFamily: 'Inter', direction: 'ltr' }}>{order.total} ج</span>
            </div>
          </div>
        </div>

        {/* ── Action Buttons ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <a
            href={`tel:${config.phone}`}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '15px', borderRadius: 14, background: '#25D366', color: 'white',
              fontWeight: 700, fontSize: 14, textDecoration: 'none',
              boxShadow: '0 6px 20px rgba(37,211,102,0.35)',
              fontFamily: 'Zain, sans-serif',
            }}
          >
            <MessageCircle size={17} />
            تواصل مع المطعم
          </a>

          <button
            onClick={() => navigate('/explore')}
            style={{
              width: '100%', padding: '13px', borderRadius: 14, fontWeight: 700, fontSize: 14, cursor: 'pointer',
              background: 'var(--surface)', border: `2px solid ${config.color}`, color: config.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              fontFamily: 'Zain, sans-serif',
            }}
          >
            <Discover size={15} />
            اكتشف مطاعم تانية
          </button>
        </div>
      </div>
      <CustomerFooter />
      <CustomerNav />
    </div>
  )
}
