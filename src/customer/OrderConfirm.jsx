import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getConfig } from '../lib/restaurantStore'
import { MapPin, Clock, ChevronLeft, Compass } from 'lucide-react'

export default function OrderConfirm() {
  const navigate = useNavigate()
  const location = useLocation()
  const config = getConfig()
  const order = location.state?.order

  const [visible, setVisible] = useState(false)
  const [checkVisible, setCheckVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 80)
    const t2 = setTimeout(() => setCheckVisible(true), 300)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (!order) {
    return (
      <div style={{ minHeight: '100vh', background: '#F9FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center' }} dir="rtl">
        <div style={{ textAlign: 'center', padding: 32 }}>
          <p style={{ fontSize: 48, marginBottom: 16 }}>😕</p>
          <p style={{ color: '#6B7280', marginBottom: 20, fontSize: 15 }}>لم يتم العثور على الطلب</p>
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
    <div style={{ minHeight: '100vh', background: '#F9FAFB', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 20px' }} dir="rtl">
      <div style={{ width: '100%', maxWidth: 380 }}>

        {/* Success icon */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{
            width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(135deg, #22C55E, #16A34A)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
            boxShadow: '0 16px 48px rgba(34,197,94,0.3)',
            transform: visible ? 'scale(1)' : 'scale(0.5)',
            opacity: visible ? 1 : 0,
            transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease',
          }}>
            <svg viewBox="0 0 52 52" style={{ width: 52, height: 52 }} fill="none">
              <path
                d="M14 26l8 8 16-16"
                stroke="white"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 44,
                  strokeDashoffset: checkVisible ? 0 : 44,
                  transition: 'stroke-dashoffset 0.5s ease 0.2s',
                }}
              />
            </svg>
          </div>

          <h1 style={{ fontSize: 24, fontWeight: 900, color: '#111827', marginBottom: 8, letterSpacing: '-0.02em' }}>
            تم استلام طلبك! 🎉
          </h1>
          <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.6 }}>
            سيبدأ المطعم بتحضير طلبك الآن
          </p>
        </div>

        {/* Order card */}
        <div style={{
          background: 'white', borderRadius: 20, padding: 20, marginBottom: 16,
          boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
          border: '1px solid #F3F4F6',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 0.4s ease 0.15s',
        }}>
          {/* Order number header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid #F3F4F6' }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.06em', marginBottom: 3 }}>رقم الطلب</p>
              <p style={{ fontSize: 22, fontWeight: 900, color: '#111827', fontFamily: 'Inter, monospace', direction: 'ltr' }}>#{order.id}</p>
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
                <span style={{ fontSize: 13, color: '#6B7280' }}>المطعم</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{config.name}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Clock size={14} color={config.color} />
                </div>
                <span style={{ fontSize: 13, color: '#6B7280' }}>الوقت المتوقع</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#111827' }}>{config.deliveryTime} دقيقة</span>
            </div>

            <div style={{ paddingTop: 12, borderTop: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>الإجمالي</span>
              <span style={{ fontSize: 20, fontWeight: 900, color: config.color, fontFamily: 'Inter, monospace', direction: 'ltr' }}>{order.total} ج</span>
            </div>
          </div>
        </div>

        {/* Estimated steps */}
        <div style={{
          background: 'white', borderRadius: 20, padding: '16px 20px', marginBottom: 20,
          boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
          border: '1px solid #F3F4F6',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 0.4s ease 0.25s',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', textAlign: 'center' }}>
            {[
              { icon: '📋', label: 'استلمنا طلبك', done: true },
              { icon: '👨‍🍳', label: 'جاري التحضير', done: false },
              { icon: '🛵', label: 'في الطريق', done: false },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, position: 'relative' }}>
                {i < 2 && (
                  <div style={{ position: 'absolute', top: 16, right: '50%', left: 0, height: 2, background: i === 0 ? config.color : '#E5E7EB', transition: 'background 0.3s' }} />
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

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 0.4s ease 0.35s',
        }}>
          <button
            onClick={() => navigate(`/track/${order.id}`)}
            style={{
              width: '100%', padding: '15px', borderRadius: 14, color: 'white', fontWeight: 700,
              fontSize: 14, border: 'none', cursor: 'pointer', background: config.color,
              boxShadow: `0 6px 20px ${config.color}40`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            <ChevronLeft size={16} />
            تتبع طلبك مباشرة
          </button>

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

          <button
            onClick={() => navigate(-1)}
            style={{ background: 'none', border: 'none', color: '#9CA3AF', fontSize: 13, cursor: 'pointer', padding: '8px', textDecoration: 'underline' }}
          >
            رجوع للقائمة
          </button>
        </div>
      </div>
    </div>
  )
}
