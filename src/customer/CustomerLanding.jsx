import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Star1, Clock, ArrowLeft2, TickCircle } from 'iconsax-react'
import { getConfig, getCustomerProfile, getCustomerPoints, getCustomerOrders, getMenuItems } from '../lib/restaurantStore'
import CustomerNav from './CustomerNav'
import CustomerFooter from './CustomerFooter'

const mockRestaurants = [
  { name: 'مطعم الشيف أحمد', category: 'مشويات', rating: 4.9, time: 30, color: '#f97316', emoji: '🍖', slug: 'chef-ahmed', isOpen: true,  imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&h=200&fit=crop&q=80' },
  { name: 'بيتزا بلازا',      category: 'بيتزا',   rating: 4.7, time: 25, color: '#ef4444', emoji: '🍕', slug: 'pizza-plaza',  isOpen: true,  imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop&q=80' },
  { name: 'كافيه ميترو',      category: 'كافيه',   rating: 4.5, time: 20, color: '#8b5cf6', emoji: '☕', slug: 'metro-cafe',   isOpen: false, imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop&q=80' },
  { name: 'شاورما كروز',      category: 'مشويات', rating: 4.6, time: 35, color: '#22c55e', emoji: '🌯', slug: 'shawarma-king', isOpen: true,  imageUrl: null },
  { name: 'سويت هاوس',        category: 'حلويات',  rating: 4.4, time: 22, color: '#ec4899', emoji: '🍰', slug: 'burger-factory', isOpen: true, imageUrl: null },
]

const testimonials = [
  { name: 'سارة م.', text: 'أخيراً تطبيق يفهمني! طلبت وجبتي ووصلت في 28 دقيقة بالضبط وهي ساخنة 🔥', stars: 5, avatar: 'س' },
  { name: 'محمد ع.', text: 'برنامج النقاط رائع جداً، استبدلت نقاطي بوجبة مجانية بعد شهر واحد بس!', stars: 5, avatar: 'م' },
  { name: 'نور ك.',  text: 'تتبع الطلب مباشرة يعطيك راحة بال، بعرف وين طلبي في كل لحظة', stars: 5, avatar: 'ن' },
]

function getInitials(name = '') {
  const words = name.trim().split(' ').filter(Boolean)
  if (words.length >= 2) return words[0][0] + words[1][0]
  return name[0] || '؟'
}

function TestimonialsSlider({ testimonials, color }) {
  const [active, setActive] = useState(0)

  const prev = () => setActive(i => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setActive(i => (i + 1) % testimonials.length)

  const t = testimonials[active]

  return (
    <div style={{ paddingTop: 36 }}>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: '0.08em', marginBottom: 6 }}>آراء عملائنا</p>
        <h2 style={{ fontSize: 22, fontWeight: 900, color: 'var(--text)', margin: 0 }}>ماذا يقولون عنّا</h2>
      </div>

      <div style={{ position: 'relative' }}>
        {/* Card */}
        <div
          key={active}
          className="animate-fade-in"
          style={{ background: 'var(--surface)', borderRadius: 20, padding: '22px 18px', border: '1px solid var(--border)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', minHeight: 130 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: `${color}20`, color, fontWeight: 900, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {t.avatar}
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', margin: '0 0 4px' }}>{t.name}</p>
              <div style={{ display: 'flex', gap: 2 }}>
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star1 key={j} size={12} color="#F59E0B" fill="#F59E0B" />
                ))}
              </div>
            </div>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.8, margin: 0 }}>"{t.text}"</p>
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={prev}
          style={{ position: 'absolute', top: '50%', right: -14, transform: 'translateY(-50%)', width: 32, height: 32, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: '0 2px 8px rgba(0,0,0,0.10)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}
        >
          <ArrowLeft2 size={14} color="var(--text-2)" />
        </button>
        <button
          onClick={next}
          style={{ position: 'absolute', top: '50%', left: -14, transform: 'translateY(-50%) scaleX(-1)', width: 32, height: 32, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: '0 2px 8px rgba(0,0,0,0.10)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}
        >
          <ArrowLeft2 size={14} color="var(--text-2)" />
        </button>
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 16 }}>
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{ width: i === active ? 20 : 7, height: 7, borderRadius: 4, background: i === active ? color : 'var(--border-strong)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.25s ease' }}
          />
        ))}
      </div>
    </div>
  )
}

export default function CustomerLanding() {
  const navigate = useNavigate()
  const config  = getConfig()
  const color   = config.color
  const profile = getCustomerProfile()
  const isLoggedIn = !!profile

  const [dismissedBanner, setDismissedBanner] = useState(false)
  const [activeCategory,  setActiveCategory]  = useState('الكل')

  /* ── Loyalty + orders (logged-in only) ── */
  const loyalty = useMemo(() => {
    if (!profile?.phone) return null
    return getCustomerPoints(profile.phone)
  }, [profile])

  const lastOrder = useMemo(() => {
    if (!profile?.phone) return null
    const orders = getCustomerOrders(profile.phone)
    return orders[0] || null
  }, [profile])

  const menuItems = getMenuItems()

  const recommendedItems = useMemo(() => {
    const active = menuItems.filter(m => m.active)
    if (lastOrder?.details?.length) {
      const ids = lastOrder.details
        .map(d => menuItems.find(m => m.name === d.name)?.categoryId)
        .filter(Boolean)
      if (ids.length) {
        const matches = active.filter(m => ids.includes(m.categoryId))
        if (matches.length >= 2) return matches.slice(0, 4)
      }
    }
    return active.slice(0, 4)
  }, [menuItems, lastOrder])

  /* ── Derived lists ── */
  const categories       = ['الكل', 'مشويات', 'بيتزا', 'كافيه', 'حلويات']
  const filteredRestaurants = activeCategory === 'الكل'
    ? mockRestaurants
    : mockRestaurants.filter(r => r.category === activeCategory)
  const openRestaurants  = mockRestaurants.filter(r => r.isOpen)

  /* ── Loyalty progress ── */
  const NEXT_REWARD = 500
  const pointsBalance  = loyalty?.balance ?? 0
  const progressPct    = Math.min(100, Math.round((pointsBalance / NEXT_REWARD) * 100))
  const pointsToNext   = Math.max(0, NEXT_REWARD - pointsBalance)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'Zain, sans-serif', direction: 'rtl', color: 'var(--text)' }}>
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .float-anim { animation: float 3.5s ease-in-out infinite; }
        .hide-scroll::-webkit-scrollbar { display:none; }
        .hide-scroll { -ms-overflow-style:none; scrollbar-width:none; }
      `}</style>

      {/* ── Hero — full bleed ── */}
      <div style={{
        background: `linear-gradient(160deg, ${color} 0%, ${color}cc 55%, var(--bg) 100%)`,
        padding: '52px 20px 56px', position: 'relative', overflow: 'hidden', textAlign: 'center',
        width: '100%', boxSizing: 'border-box',
      }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -30, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', borderRadius: 20, padding: '5px 14px', marginBottom: 20, border: '1px solid rgba(255,255,255,0.3)' }}>
          <span style={{ fontSize: 14 }}>🍽️</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>منصة توصيل الطعام الأذكى</span>
        </div>

        <div className="float-anim" style={{ fontSize: 72, marginBottom: 12, lineHeight: 1 }}>🛵</div>

        {isLoggedIn ? (
          <h1 style={{ fontSize: 28, fontWeight: 900, color: 'white', marginBottom: 10, lineHeight: 1.3, textShadow: '0 2px 12px rgba(0,0,0,0.15)' }}>
            أهلاً، {profile.name?.split(' ')[0]} 👋<br />
            <span style={{ fontSize: 22, fontWeight: 700 }}>شو تحب تطلب اليوم؟</span>
          </h1>
        ) : (
          <h1 style={{ fontSize: 30, fontWeight: 900, color: 'white', marginBottom: 12, lineHeight: 1.3, textShadow: '0 2px 12px rgba(0,0,0,0.15)' }}>
            طعامك المفضل<br />على بابك في دقائق
          </h1>
        )}

        {/* Guest-only badge */}
        {!isLoggedIn && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.18)', borderRadius: 20, padding: '4px 12px', marginBottom: 12, border: '1px solid rgba(255,255,255,0.35)' }}>
            <TickCircle size={14} color="white" variant="Bold" />
            <span style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>اطلب بدون تسجيل</span>
          </div>
        )}

        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.88)', marginBottom: 32, lineHeight: 1.8 }}>
          اكتشف أفضل المطاعم، اطلب بسهولة، وتتبع طلبك خطوة بخطوة — مع مكافآت تزداد مع كل وجبة 🎁
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button
            onClick={() => navigate('/explore')}
            style={{ width: '100%', padding: '16px', borderRadius: 16, background: 'white', color, fontWeight: 800, fontSize: 16, border: 'none', cursor: 'pointer', fontFamily: 'Zain, sans-serif', boxShadow: '0 8px 28px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxSizing: 'border-box' }}
          >
            🍴 اكتشف المطاعم
          </button>
          {!isLoggedIn && (
            <button
              onClick={() => navigate('/customer-login')}
              style={{ width: '100%', padding: '14px', borderRadius: 16, background: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 700, fontSize: 15, border: '2px solid rgba(255,255,255,0.5)', cursor: 'pointer', fontFamily: 'Zain, sans-serif', backdropFilter: 'blur(8px)', boxSizing: 'border-box' }}
            >
              سجّل مجاناً
            </button>
          )}
        </div>
      </div>

      {/* ── Stats bar — full bleed ── */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '20px 20px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {[
            { value: '5+',  label: 'مطاعم متاحة',  icon: '🏪' },
            { value: '30د', label: 'متوسط التوصيل', icon: '⚡' },
            { value: '98%', label: 'رضا العملاء',   icon: '⭐' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
              <p style={{ fontSize: 20, fontWeight: 900, color, fontFamily: 'Inter, sans-serif' }}>{s.value}</p>
              <p style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 600 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── All sections — full width with 20px side padding ── */}
      <div style={{ padding: '0 20px 88px', width: '100%', boxSizing: 'border-box' }}>

        {/* ── LOGGED-IN: Loyalty card ── */}
        {isLoggedIn && loyalty && (
          <div style={{ paddingTop: 24 }}>
            <div
              onClick={() => navigate('/loyalty')}
              style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)`, borderRadius: 20, padding: '20px 18px', cursor: 'pointer', position: 'relative', overflow: 'hidden', boxShadow: `0 6px 24px ${color}40` }}
            >
              <div style={{ position: 'absolute', top: -24, left: -24, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.8)', marginBottom: 2 }}>نقاطك المتراكمة</p>
                    <p style={{ fontSize: 28, fontWeight: 900, color: 'white', fontFamily: 'Inter, sans-serif', lineHeight: 1 }}>{pointsBalance.toLocaleString('ar-EG')}</p>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', marginTop: 3 }}>نقطة</p>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: '8px 14px', textAlign: 'center' }}>
                    <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.85)', fontWeight: 700, marginBottom: 2 }}>المكافأة التالية</p>
                    <p style={{ fontSize: 13, fontWeight: 800, color: 'white' }}>خصم ١٠٪</p>
                    <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)' }}>{NEXT_REWARD} نقطة</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>
                      {pointsToNext > 0 ? `${pointsToNext} نقطة للمكافأة` : '🎉 مكافأة جاهزة!'}
                    </span>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontWeight: 700 }}>{progressPct}٪</span>
                  </div>
                  <div style={{ height: 6, background: 'rgba(255,255,255,0.25)', borderRadius: 99 }}>
                    <div style={{ height: '100%', width: `${progressPct}%`, background: 'white', borderRadius: 99, transition: 'width 0.6s ease' }} />
                  </div>
                </div>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.22)', borderRadius: 10, padding: '8px 14px' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>استخدم نقاطك</span>
                  <ArrowLeft2 size={14} color="white" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── LOGGED-IN: Reorder section ── */}
        {isLoggedIn && lastOrder && (
          <div style={{ paddingTop: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <h2 style={{ fontSize: 17, fontWeight: 900, color: 'var(--text)', margin: 0 }}>🔄 اطلب تاني؟</h2>
              <button
                onClick={() => navigate('/my-orders')}
                style={{ fontSize: 13, color, fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Zain, sans-serif', display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}
              >
                كل الطلبات <ArrowLeft2 size={14} />
              </button>
            </div>
            <div
              onClick={() => navigate(`/${lastOrder.table === 'توصيل' ? 'chef-ahmed' : 'chef-ahmed'}`)}
              style={{ background: 'var(--surface)', borderRadius: 18, padding: '16px', border: '1px solid var(--border)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14 }}
            >
              <div style={{ width: 52, height: 52, borderRadius: 14, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>
                🛵
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)', margin: '0 0 4px' }}>
                  {lastOrder.items || 'طلب سابق'}
                </p>
                <p style={{ fontSize: 12, color: 'var(--text-2)', margin: 0 }}>
                  {lastOrder.total} ج &nbsp;·&nbsp; {lastOrder.time}
                </p>
              </div>
              <button
                onClick={e => { e.stopPropagation(); navigate('/chef-ahmed') }}
                style={{ padding: '9px 16px', borderRadius: 12, background: color, color: 'white', fontWeight: 700, fontSize: 12, border: 'none', cursor: 'pointer', fontFamily: 'Zain, sans-serif', flexShrink: 0, whiteSpace: 'nowrap' }}
              >
                اطلب تاني
              </button>
            </div>
          </div>
        )}

        {/* ── LOGGED-IN: Recommended section ── */}
        {isLoggedIn && recommendedItems.length > 0 && (
          <div style={{ paddingTop: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <h2 style={{ fontSize: 17, fontWeight: 900, color: 'var(--text)', margin: 0 }}>✨ مقترح ليك</h2>
            </div>
            <div className="hide-scroll" style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }}>
              {recommendedItems.map((item, i) => (
                <div
                  key={i}
                  onClick={() => navigate('/chef-ahmed')}
                  style={{ flexShrink: 0, width: 140, background: 'var(--surface)', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                >
                  {item.image
                    ? <img src={item.image} alt={item.name} style={{ width: '100%', height: 90, objectFit: 'cover' }} />
                    : <div style={{ width: '100%', height: 90, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>🍽️</div>
                  }
                  <div style={{ padding: '10px 10px 12px' }}>
                    <p style={{ fontWeight: 700, fontSize: 12, color: 'var(--text)', margin: '0 0 4px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{item.name}</p>
                    <p style={{ fontSize: 12, fontWeight: 800, color, margin: 0 }}>{item.price} ج</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Categories row (both states) ── */}
        <div style={{ paddingTop: 28 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  flex: 1,
                  padding: '9px 4px',
                  borderRadius: 99,
                  fontFamily: 'Zain, sans-serif',
                  fontSize: 13,
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background .15s, color .15s',
                  background: activeCategory === cat ? color : 'var(--surface)',
                  color:      activeCategory === cat ? 'white' : 'var(--text-2)',
                  boxShadow:  activeCategory === cat ? `0 4px 12px ${color}40` : 'none',
                  outline: activeCategory === cat ? 'none' : '1px solid var(--border)',
                }}
              >{cat}</button>
            ))}
          </div>
        </div>

        {/* ── مفتوح دلوقتي (both states) ── */}
        {openRestaurants.length > 0 && (
          <div style={{ paddingTop: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <h2 style={{ fontSize: 17, fontWeight: 900, color: 'var(--text)', margin: 0 }}>
                مفتوح دلوقتي <span style={{ fontSize: 14 }}>🟢</span>
              </h2>
              <button
                onClick={() => navigate('/explore')}
                style={{ fontSize: 13, color, fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Zain, sans-serif', display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}
              >
                عرض الكل <ArrowLeft2 size={14} />
              </button>
            </div>
            <div className="hide-scroll" style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }}>
              {openRestaurants.map((r, i) => (
                <div
                  key={i}
                  onClick={() => navigate(`/${r.slug}`)}
                  style={{ flexShrink: 0, width: 130, background: 'var(--surface)', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                >
                  {/* Logo area */}
                  <div style={{ width: '100%', height: 72, background: `linear-gradient(135deg,${r.color}25,${r.color}45)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                    {r.imageUrl
                      ? <img src={r.imageUrl} alt={r.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <div style={{ width: 44, height: 44, borderRadius: '50%', background: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Zain, sans-serif', fontWeight: 900, fontSize: 16, color: 'white' }}>
                          {getInitials(r.name)}
                        </div>
                    }
                    <div style={{ position: 'absolute', top: 6, left: 6, width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 0 2px white' }} />
                  </div>
                  <div style={{ padding: '8px 10px 10px' }}>
                    <p style={{ fontWeight: 800, fontSize: 11, color: 'var(--text)', margin: '0 0 3px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{r.name}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={10} color="var(--text-3)" />
                      <span style={{ fontSize: 10, color: 'var(--text-2)' }}>{r.time} د</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Featured restaurants — full width ── */}
        <div style={{ paddingTop: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 style={{ fontSize: 18, fontWeight: 900, color: 'var(--text)', margin: 0 }}>⭐ مميزون</h2>
            <button
              onClick={() => navigate('/explore')}
              style={{ fontSize: 13, color, fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Zain, sans-serif', display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}
            >
              عرض الكل <ArrowLeft2 size={14} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filteredRestaurants.map((r, i) => (
              <div
                key={i}
                onClick={() => navigate(`/${r.slug}`)}
                style={{ background: 'var(--surface)', borderRadius: 18, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', border: '1px solid var(--border)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'transform 0.12s', opacity: r.isOpen ? 1 : 0.65 }}
                onTouchStart={e => (e.currentTarget.style.transform = 'scale(0.98)')}
                onTouchEnd={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                {/* Logo: image OR colored circle with initials */}
                <div style={{ width: 52, height: 52, borderRadius: 16, background: `linear-gradient(135deg,${r.color}22,${r.color}44)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `2px solid ${r.color}30`, overflow: 'hidden' }}>
                  {r.imageUrl
                    ? <img src={r.imageUrl} alt={r.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <div style={{ width: 36, height: 36, borderRadius: '50%', background: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Zain, sans-serif', fontWeight: 900, fontSize: 14, color: 'white' }}>
                        {getInitials(r.name)}
                      </div>
                  }
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                    <p style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)', margin: 0 }}>{r.name}</p>
                    {/* Open/closed badge */}
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 99,
                      background: r.isOpen ? '#22c55e18' : 'rgba(100,100,100,0.12)',
                      color:      r.isOpen ? '#16a34a'  : 'var(--text-3)',
                      flexShrink: 0,
                    }}>
                      {r.isOpen ? '🟢 مفتوح' : '🔴 مغلق'}
                    </span>
                  </div>
                  {/* Category + rating + time */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 11, color: 'var(--text-3)', background: 'var(--surface-2, var(--border))', borderRadius: 6, padding: '1px 6px', fontWeight: 600 }}>{r.category}</span>
                    <span style={{ color: 'var(--text-3)', fontSize: 10 }}>·</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Star1 size={11} color="#F59E0B" fill="#F59E0B" />
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', fontFamily: 'Inter' }}>{r.rating}</span>
                    </div>
                    <span style={{ color: 'var(--text-3)', fontSize: 10 }}>·</span>
                    <Clock size={11} color="var(--text-3)" />
                    <span style={{ fontSize: 12, color: 'var(--text-2)' }}>{r.time} دقيقة</span>
                  </div>
                </div>

                <button
                  onClick={e => { e.stopPropagation(); navigate(`/${r.slug}`) }}
                  style={{ padding: '8px 16px', borderRadius: 12, background: r.isOpen ? r.color : 'var(--border)', color: r.isOpen ? 'white' : 'var(--text-3)', fontWeight: 700, fontSize: 12, border: 'none', cursor: r.isOpen ? 'pointer' : 'default', fontFamily: 'Zain, sans-serif', flexShrink: 0 }}
                >
                  {r.isOpen ? 'اطلب' : 'مغلق'}
                </button>
              </div>
            ))}

            {filteredRestaurants.length === 0 && (
              <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-2)', fontSize: 14 }}>
                لا توجد مطاعم في هذه الفئة حالياً
              </div>
            )}
          </div>
        </div>

        {/* How it works */}
        <div style={{ paddingTop: 36 }}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: '0.08em', marginBottom: 6 }}>كيف يعمل؟</p>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: 'var(--text)', margin: 0 }}>ثلاث خطوات بسيطة</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { step: '١', icon: '🔍', title: 'اكتشف', desc: 'تصفّح أفضل المطاعم في منطقتك، فلتر حسب التصنيف أو وقت التوصيل أو التقييم' },
              { step: '٢', icon: '🛒', title: 'اختار واطلب', desc: 'أضف ما تشتهيه للسلة، ادفع بأمان، وأكّد طلبك في ثوانٍ' },
              { step: '٣', icon: '📍', title: 'تتبّع وتمتّع', desc: 'تابع رحلة طلبك مباشرة من المطبخ حتى بابك، واستمتع بوجبتك الساخنة' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'var(--surface)', borderRadius: 20, padding: '18px 16px', display: 'flex', alignItems: 'flex-start', gap: 16, border: '1px solid var(--border)', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                <div style={{ width: 48, height: 48, borderRadius: 16, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>
                  {s.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ width: 22, height: 22, borderRadius: '50%', background: color, color: 'white', fontSize: 11, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: 'Zain, sans-serif' }}>{s.step}</span>
                    <p style={{ fontWeight: 800, fontSize: 15, color: 'var(--text)', margin: 0 }}>{s.title}</p>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features grid */}
        <div style={{ paddingTop: 36 }}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: '0.08em', marginBottom: 6 }}>لماذا ريفيو؟</p>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: 'var(--text)', margin: 0 }}>تجربة طلب لا مثيل لها</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: '📍', title: 'تتبع مباشر',    desc: 'شاهد طلبك وهو في طريقه إليك لحظة بلحظة',            accent: '#3B82F6' },
              { icon: '🎁', title: 'نقاط مكافآت',   desc: 'اكسب نقاط مع كل طلب واستبدلها بوجبات مجانية',        accent: '#F59E0B' },
              { icon: '⚡', title: 'توصيل سريع',    desc: 'شبكة توصيل مدربة تضمن وصول طلبك ساخناً',             accent: '#22C55E' },
              { icon: '💳', title: 'دفع آمن',        desc: 'ادفع كاش أو إلكتروني بكل أمان وسهولة',               accent: '#8B5CF6' },
              { icon: '🏆', title: 'أفضل المطاعم',  desc: 'مطاعم مختارة بعناية بمعايير الجودة والنظافة',          accent: '#EF4444' },
              { icon: '🔔', title: 'إشعارات فورية', desc: 'ابق على اطلاع بكل مرحلة من مراحل طلبك',               accent: '#F97316' },
            ].map((f, i) => (
              <div key={i} style={{ background: 'var(--surface)', borderRadius: 18, padding: '18px 14px', border: '1px solid var(--border)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: f.accent + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 10 }}>
                  {f.icon}
                </div>
                <p style={{ fontWeight: 800, fontSize: 13, color: 'var(--text)', marginBottom: 4 }}>{f.title}</p>
                <p style={{ fontSize: 11, color: 'var(--text-2)', lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Loyalty highlight — full width */}
        <div style={{ marginTop: 36 }}>
          <div
            onClick={() => navigate(isLoggedIn ? '/loyalty' : '/customer-login')}
            style={{ background: 'linear-gradient(135deg, #F59E0B, #F97316)', borderRadius: 24, padding: '28px 20px', cursor: 'pointer', position: 'relative', overflow: 'hidden', boxShadow: '0 8px 32px rgba(249,115,22,0.3)', width: '100%', boxSizing: 'border-box' }}
          >
            <div style={{ position: 'absolute', top: -20, left: -20, width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -30, right: -10, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.25)', borderRadius: 20, padding: '4px 14px', fontSize: 11, fontWeight: 700, color: 'white', marginBottom: 14 }}>
                🌟 برنامج المكافآت
              </span>
              <h3 style={{ fontSize: 22, fontWeight: 900, color: 'white', marginBottom: 8, lineHeight: 1.35, marginTop: 0 }}>
                كل وجبة تقرّبك<br />من مكافأة مجانية
              </h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.88)', lineHeight: 1.75, marginBottom: 20, marginTop: 0 }}>
                اجمع نقاط مع كل طلب واستبدلها بخصومات، وجبات مجانية، وتوصيل بلا رسوم
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
                {[
                  { points: '500',  reward: 'خصم 10%'      },
                  { points: '1500', reward: 'وجبة مجانية'   },
                  { points: '2000', reward: 'توصيل مجاني'   },
                ].map((r, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: '10px 6px', textAlign: 'center' }}>
                    <p style={{ fontSize: 16, fontWeight: 900, color: 'white', fontFamily: 'Inter, sans-serif', margin: 0 }}>{r.points}</p>
                    <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.85)', fontWeight: 700, marginTop: 4, margin: '4px 0 0' }}>نقطة → {r.reward}</p>
                  </div>
                ))}
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.25)', borderRadius: 12, padding: '10px 16px' }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>{isLoggedIn ? 'اعرض نقاطي' : 'ابدأ تجميع النقاط'}</span>
                <ArrowLeft2 size={14} color="white" />
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials — slider */}
        <TestimonialsSlider testimonials={testimonials} color={color} />


      </div>

      <CustomerFooter />
      <CustomerNav />

      {/* ── GUEST: Sticky bottom login banner ── */}
      {!isLoggedIn && !dismissedBanner && (
        <div style={{
          position: 'fixed', bottom: 72, right: 0, left: 0, zIndex: 50,
          padding: '0 12px',
          pointerEvents: 'none',
        }}>
          <div style={{
            background: 'var(--surface)',
            border: `1.5px solid ${color}40`,
            borderRadius: 18,
            padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: 12,
            boxShadow: '0 -4px 24px rgba(0,0,0,0.14)',
            pointerEvents: 'all',
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>🎁</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontWeight: 800, fontSize: 13, color: 'var(--text)', margin: '0 0 2px' }}>سجّل دخول واكسب نقاط مع كل طلب</p>
              <p style={{ fontSize: 11, color: 'var(--text-2)', margin: 0 }}>مكافآت وخصومات حصرية للمسجلين</p>
            </div>
            <button
              onClick={() => navigate('/customer-login')}
              style={{ padding: '8px 14px', borderRadius: 10, background: color, color: 'white', fontWeight: 700, fontSize: 12, border: 'none', cursor: 'pointer', fontFamily: 'Zain, sans-serif', flexShrink: 0, whiteSpace: 'nowrap' }}
            >
              سجّل الآن
            </button>
            <button
              onClick={() => setDismissedBanner(true)}
              style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--border)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: 'var(--text-2)', flexShrink: 0 }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
