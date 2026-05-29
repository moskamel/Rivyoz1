import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getConfig } from '../lib/restaurantStore'
import { MapPin, Clock, UtensilsCrossed } from 'lucide-react'
import CustomerNav from './CustomerNav'
import CustomerFooter from './CustomerFooter'

export default function OrderConfirm() {
  const navigate = useNavigate()
  const location = useLocation()
  const config = getConfig()
  const order = location.state?.order

  const [visible, setVisible] = useState(false)
  const [checkVisible, setCheckVisible] = useState(false)
  const [cardVisible, setCardVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 80)
    const t2 = setTimeout(() => setCheckVisible(true), 350)
    const t3 = setTimeout(() => setCardVisible(true), 500)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  if (!order) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} dir="rtl">
        <div style={{ textAlign: 'center', padding: 32 }}>
          <p style={{ fontSize: 48, marginBottom: 16 }}>😕</p>
          <p style={{ color: 'var(--text-2)', marginBottom: 20, fontSize: 15 }}>لم يتم العثور على الطلب</p>
          <button
            onClick={() => navigate(-1)}
            style={{ padding: '12px 28px', borderRadius: 14, color: 'white', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', background: config.color }}
          >
            رجوع
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px 60px', fontFamily: 'Zain, sans-serif' }} dir="rtl">
      <style>{`
        @keyframes spring-in {
          0% { transform: scale(0.3); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          80% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 12px 40px rgba(34,197,94,0.25); }
          50% { box-shadow: 0 12px 60px rgba(34,197,94,0.45); }
        }
        .confirm-circle {
          animation: spring-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards, glow-pulse 2.5s ease-in-out 0.8s infinite;
        }
        .confirm-card {
          animation: slide-up 0.5s ease forwards;
        }
      `}</style>

      <div style={{ width: '100%', maxWidth: 400 }}>

        {/* ── Success animation area ── */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          {/* Outer ring */}
          <div style={{
            width: 120, height: 120, borderRadius: '50%', margin: '0 auto 24px',
            background: 'linear-gradient(135deg, #22C55E, #16A34A)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: visible ? 1 : 0,
          }} className={visible ? 'confirm-circle' : ''}>
            <svg viewBox="0 0 52 52" style={{ width: 60, height: 60 }} fill="none">
              <path
                d="M12 26l9 9 18-18"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 50,
                  strokeDashoffset: checkVisible ? 0 : 50,
                  transition: 'stroke-dashoffset 0.55s ease 0.1s',
                }}
              />
            </svg>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 22, fontWeight: 900, color: 'var(--text)', marginBottom: 8,
            opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.4s ease 0.2s',
          }}>
            تم استلام طلبك! 🎉
          </h1>

          {/* Order number */}
          <p style={{
            fontSize: 15, color: config.color, fontWeight: 700, marginBottom: 12,
            opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease 0.3s',
          }}>
            رقم الطلب: <span style={{ fontFamily: 'Inter, monospace', direction: 'ltr', display: 'inline-block' }}>#{order.id}</span>
          </p>

          <p style={{
            fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 20,
            opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease 0.35s',
          }}>
            سيبدأ المطعم بتحضير طلبك الآن
          </p>

          {/* ETA pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 20px', borderRadius: 20,
            background: '#FFF7ED', border: `1.5px solid ${config.color}30`,
            opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease 0.4s',
          }}>
            <span style={{ fontSize: 16 }}>⏱</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: config.color }}>{config.deliveryTime}-{config.deliveryTime + 10} دقيقة</span>
          </div>
        </div>

        {/* ── Order details card ── */}
        <div
          className={cardVisible ? 'confirm-card' : ''}
          style={{
            background: 'var(--surface)', borderRadius: 20, padding: 20, marginBottom: 14,
            boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
            border: '1px solid var(--border)',
            opacity: cardVisible ? 1 : 0,
          }}
        >
          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.06em', marginBottom: 3 }}>رقم الطلب</p>
              <p style={{ fontSize: 22, fontWeight: 900, color: 'var(--text)', fontFamily: 'Inter, monospace', direction: 'ltr' }}>#{order.id}</p>
            </div>
            <div style={{ padding: '6px 14px', borderRadius: 10, background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#16A34A' }}>مؤكد ✓</p>
            </div>
          </div>

          {/* Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MapPin size={14} color={config.color} />
                </div>
                <span style={{ fontSize: 13, color: 'var(--text-2)' }}>المطعم</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{config.name}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Clock size={14} color={config.color} />
                </div>
                <span style={{ fontSize: 13, color: 'var(--text-2)' }}>الوقت المتوقع</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{config.deliveryTime}-{config.deliveryTime + 10} دقيقة</span>
            </div>

            {/* Order items */}
            {order.details && order.details.length > 0 && (
              <div style={{ paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                  <UtensilsCrossed size={13} color="#9CA3AF" />
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)' }}>الأصناف</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {order.details.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#374151' }}>
                      <span>{item.name} <span style={{ color: 'var(--text-3)' }}>× {item.qty}</span></span>
                      <span style={{ fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{item.price * item.qty} ج</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ paddingTop: 12, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>الإجمالي</span>
              <span style={{ fontSize: 20, fontWeight: 900, color: config.color, fontFamily: 'Inter, monospace', direction: 'ltr' }}>{order.total} ج</span>
            </div>
          </div>
        </div>

        {/* ── Mini progress strip ── */}
        <div style={{
          background: 'var(--surface)', borderRadius: 20, padding: '16px 20px', marginBottom: 20,
          boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
          border: '1px solid var(--border)',
          opacity: cardVisible ? 1 : 0, transition: 'opacity 0.4s ease 0.15s',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', textAlign: 'center' }}>
            {[
              { icon: '📋', label: 'استلمنا طلبك', done: true },
              { icon: '👨‍🍳', label: 'جاري التحضير', done: false },
              { icon: '🛵', label: 'في الطريق', done: false },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, position: 'relative' }}>
                {i < 2 && (
                  <div style={{ position: 'absolute', top: 16, right: '50%', left: 0, height: 2, background: i === 0 ? config.color : '#E5E7EB' }} />
                )}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%', margin: '0 auto 6px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                    background: s.done ? config.color : '#F3F4F6',
                    boxShadow: s.done ? `0 4px 12px ${config.color}40` : 'none',
                    transition: 'all 0.3s',
                  }}>
                    {s.icon}
                  </div>
                  <p style={{ fontSize: 10, color: s.done ? '#111827' : '#9CA3AF', fontWeight: s.done ? 700 : 500 }}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Action buttons ── */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 10,
          opacity: cardVisible ? 1 : 0, transition: 'opacity 0.4s ease 0.25s',
        }}>
          <button
            onClick={() => navigate(`/track/${order.id}`)}
            style={{
              width: '100%', padding: '15px', borderRadius: 14, color: 'white', fontWeight: 700,
              fontSize: 14, border: 'none', cursor: 'pointer', background: config.color,
              boxShadow: `0 6px 20px ${config.color}40`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              fontFamily: 'Zain, sans-serif',
            }}
          >
            📍 تتبع طلبك
          </button>

          <button
            onClick={() => navigate(`/${config.slug || 'chef-ahmed'}`)}
            style={{
              width: '100%', padding: '13px', borderRadius: 14, fontWeight: 700, fontSize: 14, cursor: 'pointer',
              background: 'white', border: `2px solid ${config.color}`, color: config.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              fontFamily: 'Zain, sans-serif',
            }}
          >
            العودة للقائمة
          </button>
        </div>
      </div>
      <CustomerFooter />
      <CustomerNav />
    </div>
  )
}
