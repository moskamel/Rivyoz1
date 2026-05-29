import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { ArrowRight } from 'iconsax-react'
import { getConfig } from '../lib/restaurantStore'

const mockRestaurants = [
  { id: 1, name: 'مطعم الشيف أحمد', category: 'مشويات', rating: 4.9, reviews: 312, deliveryTime: 30, deliveryFee: 15, color: '#f97316', emoji: '🍖', slug: 'chef-ahmed', isOpen: true, tags: ['مشهور', 'طازج'] },
  { id: 2, name: 'بيتزا بلازا', category: 'بيتزا', rating: 4.7, reviews: 218, deliveryTime: 25, deliveryFee: 10, color: '#ef4444', emoji: '🍕', slug: 'pizza-plaza', isOpen: true, tags: ['أكثر طلباً'] },
  { id: 3, name: 'كافيه ميترو', category: 'كافيه', rating: 4.5, reviews: 184, deliveryTime: 20, deliveryFee: 0, color: '#8b5cf6', emoji: '☕', slug: 'metro-cafe', isOpen: true, tags: ['توصيل مجاني'] },
  { id: 4, name: 'شاورما كينج', category: 'مشويات', rating: 4.8, reviews: 267, deliveryTime: 30, deliveryFee: 12, color: '#f59e0b', emoji: '🌯', slug: 'shawarma-king', isOpen: false, tags: [] },
  { id: 5, name: 'سوشي هاوس', category: 'سوشي', rating: 4.6, reviews: 143, deliveryTime: 40, deliveryFee: 20, color: '#10b981', emoji: '🍣', slug: 'sushi-house', isOpen: true, tags: ['جديد'] },
  { id: 6, name: 'برجر فاكتوري', category: 'مشويات', rating: 4.4, reviews: 195, deliveryTime: 35, deliveryFee: 15, color: '#6366f1', emoji: '🍔', slug: 'burger-factory', isOpen: true, tags: [] },
]

export default function RestaurantPage() {
  const { slug: paramSlug } = useParams()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  // Detect slug from param (/r/:slug) or directly from the path (/pizza-plaza)
  const slug = paramSlug || pathname.replace(/^\//, '')

  const restaurant = mockRestaurants.find(r => r.slug === slug) ||
    { name: 'مطعم', color: '#F97316', emoji: '🍽️', category: '', rating: 0, deliveryTime: 30, deliveryFee: 15, isOpen: true, slug: '' }

  const others = mockRestaurants.filter(r => r.slug !== slug)

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', fontFamily: 'Zain, sans-serif' }} dir="rtl">

      {/* ── Header ── */}
      <div style={{
        background: `linear-gradient(135deg, ${restaurant.color}, ${restaurant.color}cc)`,
        paddingBottom: 0,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -20, left: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -30, right: 60, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />

        {/* Top row: back + name + status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 16px 14px' }}>
          <button
            onClick={() => navigate(-1)}
            style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 10, padding: 8, color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', flexShrink: 0 }}
          >
            <ArrowRight size={18} />
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ color: 'white', fontWeight: 800, fontSize: 18, letterSpacing: '-0.02em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{restaurant.name}</p>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 2 }}>
              {restaurant.category}{restaurant.category ? ' · ' : ''}⭐ {restaurant.rating}
            </p>
          </div>
          <div style={{ padding: '5px 12px', borderRadius: 20, background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.3)', flexShrink: 0 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'white' }}>
              {restaurant.isOpen ? 'مفتوح ✓' : 'مغلق'}
            </p>
          </div>
        </div>

        {/* ── Restaurant slider ── */}
        <div style={{ padding: '4px 0 16px' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.06em', padding: '0 16px', marginBottom: 10 }}>
            مطاعم أخرى على ريڤيو
          </p>
          <div style={{
            display: 'flex', gap: 10, overflowX: 'auto', scrollbarWidth: 'none',
            padding: '4px 16px 4px',
            WebkitOverflowScrolling: 'touch',
          }}>
            {/* Current restaurant — highlighted */}
            <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, width: 60 }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: 'rgba(255,255,255,0.25)',
                border: '2.5px solid white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 26,
                boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
              }}>
                {restaurant.emoji}
              </div>
              <p style={{
                fontSize: 10, fontWeight: 800, color: 'white',
                textAlign: 'center', lineHeight: 1.2,
                width: 60, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {restaurant.name.split(' ').slice(-1)[0]}
              </p>
            </div>

            {/* Other restaurants */}
            {others.map(r => (
              <div
                key={r.id}
                onClick={() => navigate(`/${r.slug}`)}
                style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, width: 60, cursor: 'pointer', opacity: r.isOpen ? 1 : 0.6 }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.15)',
                  border: '2px solid rgba(255,255,255,0.35)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24,
                  transition: 'transform 0.15s, border-color 0.15s',
                  position: 'relative',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.75)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)' }}
                >
                  {r.emoji}
                  {!r.isOpen && (
                    <div style={{
                      position: 'absolute', inset: 0, borderRadius: '50%',
                      background: 'rgba(0,0,0,0.35)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, color: 'white', fontWeight: 700,
                    }}>
                      مغلق
                    </div>
                  )}
                </div>
                <p style={{
                  fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.85)',
                  textAlign: 'center', lineHeight: 1.2,
                  width: 60, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {r.name.split(' ').slice(-1)[0]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px 40px', textAlign: 'center', maxWidth: 480, margin: '0 auto' }}>

        {/* Emoji hero */}
        <div style={{
          width: 110, height: 110, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: `linear-gradient(135deg, ${restaurant.color}18, ${restaurant.color}30)`,
          border: `2px solid ${restaurant.color}30`,
          fontSize: 58, marginBottom: 20,
          boxShadow: `0 12px 40px ${restaurant.color}20`,
        }}>
          {restaurant.emoji}
        </div>

        <p style={{ fontSize: 22, fontWeight: 900, color: '#111827', marginBottom: 6, letterSpacing: '-0.02em' }}>{restaurant.name}</p>
        <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 12, fontWeight: 600 }}>{restaurant.category}</p>

        {/* Delivery info pills */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 24, flexWrap: 'wrap' }}>
          <div style={{ padding: '6px 14px', borderRadius: 20, background: '#F3F4F6', display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ fontSize: 13 }}>🕐</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>{restaurant.deliveryTime} دقيقة</span>
          </div>
          <div style={{ padding: '6px 14px', borderRadius: 20, background: restaurant.deliveryFee === 0 ? '#F0FDF4' : '#F3F4F6', display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ fontSize: 13 }}>🛵</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: restaurant.deliveryFee === 0 ? '#16A34A' : '#374151' }}>
              {restaurant.deliveryFee === 0 ? 'توصيل مجاني' : `${restaurant.deliveryFee} ج توصيل`}
            </span>
          </div>
        </div>

        {/* Coming soon card */}
        <div style={{ background: 'white', borderRadius: 20, padding: '20px 24px', marginBottom: 20, width: '100%', boxSizing: 'border-box', boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)', border: '1px solid #F3F4F6' }}>
          <p style={{ fontSize: 28, marginBottom: 10 }}>🚀</p>
          <p style={{ fontSize: 16, fontWeight: 800, color: '#111827', marginBottom: 8 }}>قريباً على ريڤيو</p>
          <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.7 }}>
            هذا المطعم متاح قريباً على منصة ريڤيو<br />سجّل اهتمامك وسنخطرك عند الإطلاق
          </p>
        </div>

        <button
          style={{
            width: '100%', padding: '14px 32px', background: restaurant.color, color: 'white',
            borderRadius: 14, fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer',
            fontFamily: 'Zain, sans-serif', boxShadow: `0 8px 24px ${restaurant.color}44`,
            marginBottom: 12,
          }}
        >
          أخطرني عند الإطلاق 🔔
        </button>

        <button
          onClick={() => navigate('/explore')}
          style={{
            background: 'none', border: 'none', color: '#9CA3AF', fontSize: 13, cursor: 'pointer',
            fontFamily: 'Zain, sans-serif', padding: '8px',
          }}
        >
          العودة لاستكشاف المطاعم
        </button>
      </div>
    </div>
  )
}
