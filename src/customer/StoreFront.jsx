import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingCart, X, Search, ChevronLeft, ChevronRight, Tag, Flame, Menu, Moon, Sun } from 'lucide-react'
import { getConfig, getMenuItems, getCategories, getBanners, getCombos, getCustomerProfile, clearCustomerProfile, getCustomerPoints } from '../lib/restaurantStore'
import { useCart } from './CartContext'
import { useTheme } from '../lib/ThemeContext'
import CustomerFooter from './CustomerFooter'

/* ─── Banner Carousel ───────────────────────────────────────── */
function BannerCarousel({ accentColor }) {
  const banners = getBanners().filter(b => b.active)
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)

  useEffect(() => {
    if (banners.length < 2) return
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % banners.length), 4000)
    return () => clearInterval(timerRef.current)
  }, [banners.length])

  if (banners.length === 0) return null

  const go = (dir) => {
    clearInterval(timerRef.current)
    setCurrent(c => (c + dir + banners.length) % banners.length)
  }

  const b = banners[current]
  const hasImage = !!b.imageUrl

  return (
    <div style={{ position: 'relative', overflow: 'hidden', height: 200 }}>
      <div
        key={b.id}
        style={{
          width: '100%', height: '100%', position: 'relative',
          background: hasImage
            ? `url(${b.imageUrl}) center/cover no-repeat`
            : `linear-gradient(135deg, ${b.color[0]}, ${b.color[1]})`,
          transition: 'opacity 0.4s ease',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: hasImage ? 'rgba(0,0,0,0.38)' : 'transparent',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          {b.title && <p style={{ color: 'white', fontWeight: 900, fontSize: 22, textShadow: '0 2px 8px rgba(0,0,0,0.3)', textAlign: 'center', padding: '0 24px' }}>{b.title}</p>}
          {b.subtitle && <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14, marginTop: 6, fontWeight: 500, textAlign: 'center', padding: '0 24px' }}>{b.subtitle}</p>}
          {!hasImage && (
            <button style={{ marginTop: 16, background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '8px 20px', borderRadius: 20, fontSize: 13, fontWeight: 700, cursor: 'pointer', backdropFilter: 'blur(4px)' }}>
              اطلب الآن
            </button>
          )}
        </div>
      </div>

      <button onClick={() => go(-1)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', width: 32, height: 32, borderRadius: '50%', background: 'rgba(0,0,0,0.25)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', backdropFilter: 'blur(4px)' }}>
        <ChevronRight size={18} />
      </button>
      <button onClick={() => go(1)} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 32, height: 32, borderRadius: '50%', background: 'rgba(0,0,0,0.25)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', backdropFilter: 'blur(4px)' }}>
        <ChevronLeft size={18} />
      </button>

      <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
        {banners.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? 20 : 6, height: 6, borderRadius: 3, background: 'white', opacity: i === current ? 1 : 0.5, border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s' }} />
        ))}
      </div>
    </div>
  )
}

/* ─── Shared item card ───────────────────────────────────────── */
function ItemCard({ accentColor, onClick, image, emoji = '🍽️', title, subtitle, price, originalPrice, badgeText, badgeColor = '#F97316', disabled, actionLabel = 'أضف للسلة', onAction }) {
  return (
    <div
      onClick={onClick}
      style={{ background: 'var(--surface)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', cursor: disabled ? 'default' : 'pointer', border: '1px solid var(--border)', transition: 'transform 0.15s' }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.transform = 'scale(1.02)' }}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      <div style={{ height: 100, background: accentColor + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, position: 'relative' }}>
        {image ? <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : emoji}
        {badgeText && (
          <span style={{ position: 'absolute', top: 8, right: 8, background: badgeColor, color: 'white', fontSize: 9, fontWeight: 800, padding: '2px 7px', borderRadius: 8 }}>
            {badgeText}
          </span>
        )}
        {disabled && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af' }}>غير متاح</span>
          </div>
        )}
      </div>
      <div style={{ padding: '10px 10px 12px' }}>
        <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 13, lineHeight: 1.3, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</p>
        {subtitle && (
          <p style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{subtitle}</p>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 4 }}>
          <span style={{ fontWeight: 800, fontSize: 14, color: accentColor }}>{price} ج</span>
          {originalPrice && (
            <span style={{ fontSize: 11, color: 'var(--text-3)', textDecoration: 'line-through' }}>{originalPrice}</span>
          )}
        </div>
        <button
          disabled={disabled}
          onClick={onAction ? (e) => { e.stopPropagation(); onAction() } : undefined}
          style={{ width: '100%', marginTop: 8, padding: '7px', background: disabled ? 'var(--surface-2)' : accentColor, color: disabled ? 'var(--text-3)' : 'white', fontWeight: 700, fontSize: 13, borderRadius: 10, border: 'none', cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'Cairo, sans-serif' }}
        >
          {actionLabel}
        </button>
      </div>
    </div>
  )
}

/* ─── Shared grid wrapper ───────────────────────────────────── */
function ItemGrid({ title, icon: Icon, accentColor, children }) {
  return (
    <div style={{ paddingBottom: 32 }}>
      <div style={{ background: 'var(--surface)' }}>
        <h2 style={{ fontWeight: 800, color: 'var(--text)', fontSize: 15, padding: '14px 16px 10px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 6 }}>
          {Icon && <Icon size={16} style={{ color: accentColor }} />}
          {title}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12, padding: 12 }}>
          {children}
        </div>
      </div>
    </div>
  )
}

/* ─── Popular Section ───────────────────────────────────────── */
function PopularSlider({ items, accentColor, onOpen }) {
  const popular = items.filter(i => i.active && i.bestseller).slice(0, 8)
  if (popular.length === 0) return null

  return (
    <ItemGrid title="الأكثر طلباً" icon={Flame} accentColor={accentColor}>
      {popular.map(item => (
        <ItemCard
          key={item.id}
          accentColor={accentColor}
          onClick={() => onOpen(item)}
          onAction={() => onOpen(item)}
          image={item.image}
          title={item.name}
          subtitle={item.description}
          price={item.price}
          badgeText={item.discountTag || '🔥 بيستر'}
          badgeColor={item.discountTag ? '#22C55E' : '#F97316'}
        />
      ))}
    </ItemGrid>
  )
}

/* ─── Offers/Combos Section ─────────────────────────────────── */
function OffersSection({ accentColor, onAddCombo }) {
  const combos = getCombos().filter(c => c.active)
  if (combos.length === 0) return null

  return (
    <ItemGrid title="العروض" icon={Tag} accentColor={accentColor}>
      {combos.map(combo => {
        const discount = Math.round((1 - combo.price / combo.originalPrice) * 100)
        return (
          <ItemCard
            key={combo.id}
            accentColor={accentColor}
            emoji={combo.image}
            title={combo.name}
            subtitle={combo.items}
            price={combo.price}
            originalPrice={combo.originalPrice}
            badgeText={`خصم ${discount}%`}
            badgeColor="#22C55E"
            onAction={() => onAddCombo(combo)}
          />
        )
      })}
    </ItemGrid>
  )
}

/* ─── Main StoreFront ───────────────────────────────────────── */
export default function StoreFront() {
  const navigate = useNavigate()
  const { isDark, toggle } = useTheme()
  const config = getConfig()
  const menuItems = getMenuItems()
  const categories = getCategories()
  const { addItem, itemCount, total } = useCart()

  const customerProfile = getCustomerProfile()
  const pts = customerProfile ? getCustomerPoints(customerProfile.phone) : null

  const popularItems = menuItems.filter(i => i.active && i.bestseller)
  const activeCombos = getCombos().filter(c => c.active)

  const specialTabs = [
    ...(popularItems.length > 0 ? [{ id: 'popular', name: '🔥 الأكثر طلباً' }] : []),
    ...(activeCombos.length > 0 ? [{ id: 'combos', name: '🏷️ العروض' }] : []),
  ]
  const allTabs = [...specialTabs, ...categories]

  const [selectedItem, setSelectedItem] = useState(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [qty, setQty] = useState(1)
  const [note, setNote] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchMenuQuery, setSearchMenuQuery] = useState('')
  const [activeTab, setActiveTab] = useState(allTabs[0]?.id)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedModifiers, setSelectedModifiers] = useState({})

  const openItem = (item) => {
    if (!item.active) return
    setSelectedItem(item)
    setQty(1)
    setNote('')
    setSelectedModifiers({})
    setSheetOpen(true)
  }

  const closeSheet = () => {
    setSheetOpen(false)
    setTimeout(() => setSelectedItem(null), 300)
  }

  const modifierExtra = selectedItem ? Object.entries(selectedModifiers).reduce((sum, [groupId, val]) => {
    const group = selectedItem?.modifiers?.find(g => g.id === groupId)
    if (!group) return sum
    if (group.type === 'single') {
      const opt = group.options.find(o => o.id === val)
      return sum + (opt?.price || 0)
    } else {
      return sum + group.options.filter(o => val[o.id]).reduce((s, o) => s + o.price, 0)
    }
  }, 0) : 0

  const sheetTotal = selectedItem ? (selectedItem.price + modifierExtra) * qty : 0
  const requiredGroupsMissing = selectedItem?.modifiers?.filter(g => g.required && !selectedModifiers[g.id]) || []
  const canAddToCart = requiredGroupsMissing.length === 0

  const handleModifierSingle = (groupId, optId) => {
    setSelectedModifiers(prev => ({ ...prev, [groupId]: optId }))
  }

  const handleModifierMulti = (groupId, optId) => {
    setSelectedModifiers(prev => {
      const current = prev[groupId] || {}
      return { ...prev, [groupId]: { ...current, [optId]: !current[optId] } }
    })
  }

  const handleAddToCart = () => {
    if (!selectedItem || !canAddToCart) return
    const flatModifiers = selectedItem?.modifiers?.flatMap(group => {
      const sel = selectedModifiers[group.id]
      if (!sel) return []
      if (group.type === 'single') {
        const opt = group.options.find(o => o.id === sel)
        return opt ? [{ groupName: group.name, name: opt.name, price: opt.price }] : []
      } else {
        return group.options.filter(o => sel[o.id]).map(o => ({ groupName: group.name, name: o.name, price: o.price }))
      }
    }) || []

    addItem({ itemId: selectedItem.id, name: selectedItem.name, price: selectedItem.price, qty, note, modifiers: flatModifiers })
    closeSheet()
  }

  const handleAddCombo = (combo) => {
    addItem({ itemId: combo.id, name: combo.name, price: combo.price, qty: 1, note: combo.items })
  }

  const searchedMenuItems = searchMenuQuery.trim()
    ? menuItems.filter(i => i.active && i.name.includes(searchMenuQuery.trim()))
    : []

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'Cairo, sans-serif', color: 'var(--text)' }} dir="rtl">

      {/* ─── StoreFront Sidebar ─── */}
      {sidebarOpen && (
        <>
          <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200 }} />
          <div dir="rtl" style={{ position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 201, background: 'var(--surface)', width: 300, boxShadow: '-4px 0 24px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', fontFamily: 'Cairo, sans-serif' }}>
            {/* Sidebar header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid var(--border)' }}>
              <h2 style={{ fontWeight: 800, fontSize: 16, color: 'var(--text)' }}>{config.name}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button onClick={toggle} style={{ padding: 8, borderRadius: 8, background: 'var(--surface-2)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-2)' }}>
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
                <button onClick={() => setSidebarOpen(false)} style={{ padding: 8, borderRadius: 8, background: 'var(--surface-2)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-2)' }}>
                  <X size={16} />
                </button>
              </div>
            </div>

            {customerProfile ? (
              <>
                <div style={{ padding: '20px 16px', background: `${config.color}0D`, borderBottom: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 48, height: 48, borderRadius: '50%', background: config.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: 20, flexShrink: 0 }}>
                      {customerProfile.name?.charAt(0) || '؟'}
                    </div>
                    <div>
                      <p style={{ fontWeight: 800, fontSize: 15, color: 'var(--text)' }}>{customerProfile.name}</p>
                      <p style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2, direction: 'ltr', textAlign: 'right' }}>{customerProfile.phone}</p>
                    </div>
                  </div>
                  {pts && pts.balance > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface)', padding: '8px 12px', borderRadius: 12, border: '1px solid var(--border)' }}>
                      <span style={{ fontSize: 16 }}>🎁</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#F59E0B' }}>{pts.balance.toLocaleString()} نقطة</span>
                      <button onClick={() => { setSidebarOpen(false); navigate('/loyalty') }} style={{ marginRight: 'auto', fontSize: 11, color: config.color, fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}>استبدل ←</button>
                    </div>
                  )}
                </div>
                <div style={{ flex: 1, overflowY: 'auto' }}>
                  {[
                    { icon: '📋', label: 'طلباتي',          path: '/my-orders'  },
                    { icon: '🎁', label: 'نقاط المكافآت',   path: '/loyalty'    },
                    { icon: '👤', label: 'ملفي الشخصي',     path: '/my-profile' },
                    { icon: '🗺️', label: 'استكشف المطاعم', path: '/explore'    },
                  ].map(link => (
                    <button key={link.path} onClick={() => { setSidebarOpen(false); navigate(link.path) }}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border)', cursor: 'pointer', fontFamily: 'Cairo, sans-serif', textAlign: 'right' }}>
                      <span style={{ fontSize: 18 }}>{link.icon}</span>
                      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{link.label}</span>
                    </button>
                  ))}
                  <div style={{ margin: '8px 16px', height: 1, background: 'var(--border)' }} />
                  <div style={{ padding: '4px 12px 12px' }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', padding: '8px 4px', letterSpacing: '0.05em' }}>حمّل التطبيق</p>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px', borderRadius: 10, background: 'var(--surface-2)', color: 'var(--text)', fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}>🍎 App Store</button>
                      <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px', borderRadius: 10, background: 'var(--surface-2)', color: 'var(--text)', fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}>🤖 Google Play</button>
                    </div>
                  </div>
                  <div style={{ padding: '0 16px 16px' }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', marginBottom: 8, letterSpacing: '0.05em' }}>تواصل معنا</p>
                    {config.phone && <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 4 }}>📞 {config.phone}</p>}
                    <p style={{ fontSize: 13, color: 'var(--text-2)' }}>🕐 {config.isOpen ? 'مفتوح الآن' : `يفتح ${config.opensAt}`}</p>
                  </div>
                </div>
                <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)' }}>
                  <button onClick={() => { clearCustomerProfile(); setSidebarOpen(false) }}
                    style={{ width: '100%', padding: '11px', borderRadius: 12, background: '#FEF2F2', color: '#DC2626', fontWeight: 700, fontSize: 13, border: '1px solid #FECACA', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}>
                    تسجيل الخروج
                  </button>
                </div>
              </>
            ) : (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 20px', textAlign: 'center' }}>
                  <div style={{ width: 72, height: 72, borderRadius: '50%', background: `${config.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, marginBottom: 16 }}>👤</div>
                  <p style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>أهلاً بك!</p>
                  <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 24, lineHeight: 1.7 }}>سجّل دخولك لتتبع طلباتك وتجميع النقاط والاستمتاع بالعروض</p>
                  <button onClick={() => { setSidebarOpen(false); navigate('/customer-login') }}
                    style={{ width: '100%', padding: '13px', borderRadius: 14, background: config.color, color: 'white', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', fontFamily: 'Cairo, sans-serif', boxShadow: `0 6px 20px ${config.color}40`, marginBottom: 10 }}>
                    تسجيل الدخول
                  </button>
                  <button onClick={() => { setSidebarOpen(false); navigate('/customer-login') }}
                    style={{ width: '100%', padding: '11px', borderRadius: 14, background: 'var(--surface)', color: config.color, fontWeight: 700, fontSize: 14, border: `2px solid ${config.color}`, cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}>
                    إنشاء حساب جديد
                  </button>
                </div>
                <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)' }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', marginBottom: 10, textAlign: 'center', letterSpacing: '0.05em' }}>حمّل التطبيق</p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px', borderRadius: 10, background: 'var(--surface-2)', color: 'var(--text)', fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}>🍎 App Store</button>
                    <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px', borderRadius: 10, background: 'var(--surface-2)', color: 'var(--text)', fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}>🤖 Google Play</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* ─── Sticky Header (back | name | cart+menu) ─── */}
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--surface-2)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-2)', flexShrink: 0 }}
          >
            <ChevronRight size={20} />
          </button>

          {/* Restaurant name */}
          <div style={{ flex: 1, textAlign: 'center' }}>
            <p style={{ fontWeight: 900, fontSize: 15, color: 'var(--text)', lineHeight: 1.2 }}>{config.name}</p>
            <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 1 }}>⭐ 4.9 · {config.deliveryTime} دقيقة · توصيل 15ج</p>
          </div>

          {/* Cart + Menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <button
              onClick={() => { setSearchOpen(true); setSearchMenuQuery('') }}
              style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--surface-2)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-2)' }}
            >
              <Search size={17} />
            </button>
            <button
              onClick={() => navigate('/cart')}
              style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--surface-2)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-2)', position: 'relative' }}
            >
              <ShoppingCart size={17} />
              {itemCount > 0 && (
                <span style={{ position: 'absolute', top: -4, right: -4, background: config.color, color: 'white', fontSize: 9, fontWeight: 800, borderRadius: '50%', width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--surface)' }}>
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setSidebarOpen(true)}
              style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--surface-2)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-2)' }}
            >
              <Menu size={17} />
            </button>
          </div>
        </div>

        {!config.isOpen && (
          <div style={{ background: '#FEF3C7', color: '#92400E', fontSize: 12, fontWeight: 600, textAlign: 'center', padding: '8px 16px' }}>
            المطعم مغلق حالياً — يفتح الساعة {config.opensAt} ظهر
          </div>
        )}
      </div>

      {/* ─── Search Overlay ─── */}
      {searchOpen && (
        <>
          <div onClick={() => setSearchOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 110 }} />
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 111, background: 'var(--surface)', maxWidth: 480, margin: '0 auto', borderRadius: '0 0 20px 20px', boxShadow: '0 8px 32px rgba(0,0,0,0.15)', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <Search size={15} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: config.color }} />
                <input
                  autoFocus
                  type="text"
                  placeholder="ابحث في القائمة..."
                  value={searchMenuQuery}
                  onChange={e => setSearchMenuQuery(e.target.value)}
                  style={{ width: '100%', padding: '10px 36px 10px 12px', borderRadius: 12, border: `1.5px solid ${config.color}`, fontSize: 14, outline: 'none', fontFamily: 'Cairo, sans-serif', boxSizing: 'border-box', color: 'var(--text)', background: 'var(--surface)' }}
                />
              </div>
              <button onClick={() => setSearchOpen(false)} style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--surface-2)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--text-2)' }}>
                <X size={17} />
              </button>
            </div>
            <div style={{ overflowY: 'auto', padding: 12 }}>
              {searchMenuQuery.trim() === '' ? (
                <p style={{ textAlign: 'center', color: 'var(--text-3)', fontSize: 13, padding: '32px 0' }}>ابدأ الكتابة للبحث في القائمة</p>
              ) : searchedMenuItems.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--text-3)', fontSize: 13, padding: '32px 0' }}>لا توجد نتائج لـ "{searchMenuQuery}"</p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {searchedMenuItems.map(item => (
                    <ItemCard
                      key={item.id}
                      accentColor={config.color}
                      onClick={() => { setSearchOpen(false); openItem(item) }}
                      onAction={() => { setSearchOpen(false); openItem(item) }}
                      image={item.image}
                      title={item.name}
                      subtitle={item.description}
                      price={item.price}
                      badgeText={item.discountTag || (item.bestseller ? '🔥' : null)}
                      badgeColor={item.discountTag ? '#22C55E' : '#F97316'}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* ─── Banner Carousel ─── */}
      <BannerCarousel accentColor={config.color} />

      {/* ─── Category Tabs ─── */}
      <div style={{ position: 'sticky', top: 57, zIndex: 30, background: 'var(--surface)', borderBottom: '1px solid var(--border)', display: 'flex', overflowX: 'auto', scrollbarWidth: 'none', padding: '0 8px' }} className="no-scrollbar">
        {allTabs.map(tab => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flexShrink: 0, display: 'flex', alignItems: 'center', gap: 5,
                margin: '8px 4px', padding: '6px 14px', borderRadius: 20,
                fontSize: 13, fontWeight: 700, cursor: 'pointer', border: 'none',
                whiteSpace: 'nowrap', transition: 'all 0.2s',
                background: isActive ? config.color : 'var(--surface-2)',
                color: isActive ? 'white' : 'var(--text-2)',
                fontFamily: 'Cairo, sans-serif',
              }}
            >
              {tab.name}
              {tab.count != null && (
                <span style={{ fontSize: 10, fontWeight: 800, background: isActive ? 'rgba(255,255,255,0.25)' : 'var(--surface-3)', color: isActive ? 'white' : 'var(--text-3)', padding: '1px 5px', borderRadius: 8 }}>
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* ─── Tab Content ─── */}
      {activeTab === 'popular' && (
        <div style={{ background: 'var(--surface)', marginTop: 8 }}>
          <PopularSlider items={menuItems} accentColor={config.color} onOpen={openItem} />
        </div>
      )}

      {activeTab === 'combos' && (
        <div style={{ background: 'var(--surface)', marginTop: 8 }}>
          <OffersSection accentColor={config.color} onAddCombo={handleAddCombo} />
        </div>
      )}

      {activeTab !== 'popular' && activeTab !== 'combos' && (() => {
        const cat = categories.find(c => c.id === activeTab)
        if (!cat) return null
        const catItems = menuItems.filter(i => i.categoryId === cat.id)
        if (catItems.length === 0) return (
          <div style={{ textAlign: 'center', padding: '48px 16px', color: 'var(--text-3)', fontSize: 14 }}>لا توجد أصناف في هذا القسم</div>
        )
        return (
          <ItemGrid title={cat.name} accentColor={config.color}>
            {catItems.map(item => (
              <ItemCard
                key={item.id}
                accentColor={config.color}
                onClick={() => openItem(item)}
                onAction={() => openItem(item)}
                image={item.image}
                title={item.name}
                subtitle={item.description}
                price={item.price}
                badgeText={item.discountTag || (item.bestseller ? '🔥' : null)}
                badgeColor={item.discountTag ? '#22C55E' : '#F97316'}
                disabled={!item.active}
              />
            ))}
          </ItemGrid>
        )
      })()}

      {/* ─── Footer ─── */}
      <CustomerFooter noNav />

      {/* ─── Floating Cart Button ─── */}
      {itemCount > 0 && (
        <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 30, padding: '0 16px', width: '100%', maxWidth: 480 }}>
          <button
            onClick={() => navigate('/cart')}
            style={{ width: '100%', padding: '14px', borderRadius: 18, background: config.color, color: 'white', fontWeight: 800, fontSize: 14, boxShadow: `0 8px 30px ${config.color}60`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, border: 'none', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}
          >
            <ShoppingCart size={18} />
            عرض السلة · {itemCount} أصناف · {total} ج
          </button>
        </div>
      )}

      {/* ─── Item Detail Bottom Sheet ─── */}
      {selectedItem && (
        <>
          <div onClick={closeSheet} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 110, opacity: sheetOpen ? 1 : 0, transition: 'opacity 0.3s' }} />
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 111, background: 'var(--surface)', borderRadius: '24px 24px 0 0', maxWidth: 480, margin: '0 auto', maxHeight: '90vh', overflowY: 'auto', transform: sheetOpen ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.3s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, paddingBottom: 4, cursor: 'pointer' }} onClick={closeSheet}>
              <div style={{ width: 40, height: 4, background: 'var(--border-strong)', borderRadius: 2 }} />
            </div>
            <div style={{ height: 200, background: `linear-gradient(135deg, ${config.color}22, ${config.color}44)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 72, position: 'relative' }}>
              {selectedItem.image
                ? <img src={selectedItem.image} alt={selectedItem.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : '🍽️'}
              <button onClick={closeSheet} style={{ position: 'absolute', top: 12, left: 12, width: 32, height: 32, borderRadius: '50%', background: 'rgba(0,0,0,0.25)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', backdropFilter: 'blur(4px)' }}>
                <X size={16} />
              </button>
            </div>
            <div style={{ padding: '16px 20px 120px' }}>
              <h3 style={{ fontWeight: 800, color: 'var(--text)', fontSize: 18, marginBottom: 6 }}>{selectedItem.name}</h3>
              {selectedItem.description && (
                <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 12, lineHeight: 1.5 }}>{selectedItem.description}</p>
              )}
              <p style={{ fontWeight: 800, fontSize: 16, color: config.color, marginBottom: 20 }}>{selectedItem.price} ج</p>

              {selectedItem.modifiers && selectedItem.modifiers.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {selectedItem.modifiers.map(group => {
                    const isSingle = group.type === 'single'
                    const groupSel = selectedModifiers[group.id]
                    const isMissing = group.required && !groupSel
                    return (
                      <div key={group.id}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                          <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{group.name}</span>
                          {group.required && (
                            <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 8, background: isMissing ? '#FEF3C7' : '#DCFCE7', color: isMissing ? '#92400E' : '#166534' }}>
                              {isMissing ? 'مطلوب' : 'تم الاختيار ✓'}
                            </span>
                          )}
                        </div>
                        {isSingle && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {group.options.map(opt => {
                              const isSelected = groupSel === opt.id
                              return (
                                <button key={opt.id} onClick={() => handleModifierSingle(group.id, opt.id)}
                                  style={{ padding: '8px 16px', borderRadius: 20, border: `2px solid ${isSelected ? config.color : 'var(--border-strong)'}`, background: isSelected ? config.color + '15' : 'var(--surface)', color: isSelected ? config.color : 'var(--text)', fontWeight: isSelected ? 700 : 500, fontSize: 13, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 6 }}>
                                  {opt.name}
                                  {opt.price > 0 && <span style={{ fontSize: 11, fontWeight: 600, color: isSelected ? config.color : 'var(--text-3)' }}>+{opt.price}ج</span>}
                                </button>
                              )
                            })}
                          </div>
                        )}
                        {!isSingle && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {group.options.map(opt => {
                              const multiSel = groupSel || {}
                              const isChecked = !!multiSel[opt.id]
                              return (
                                <button key={opt.id} onClick={() => handleModifierMulti(group.id, opt.id)}
                                  style={{ padding: '8px 16px', borderRadius: 20, border: `2px solid ${isChecked ? config.color : 'var(--border-strong)'}`, background: isChecked ? config.color + '15' : 'var(--surface)', color: isChecked ? config.color : 'var(--text)', fontWeight: isChecked ? 700 : 500, fontSize: 13, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 6 }}>
                                  <span style={{ width: 16, height: 16, borderRadius: 4, border: `2px solid ${isChecked ? config.color : 'var(--border-strong)'}`, background: isChecked ? config.color : 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    {isChecked && <span style={{ color: 'white', fontSize: 10, fontWeight: 900 }}>✓</span>}
                                  </span>
                                  {opt.name}
                                  {opt.price > 0 && <span style={{ fontSize: 11, fontWeight: 600, color: isChecked ? config.color : 'var(--text-3)' }}>+{opt.price}ج</span>}
                                </button>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}

              <div style={{ marginTop: 24 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-2)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>ملاحظات خاصة</p>
                <textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="ملاحظات خاصة (اختياري)..."
                  rows={2}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1.5px solid var(--border-strong)', fontSize: 13, outline: 'none', resize: 'none', fontFamily: 'Cairo, sans-serif', boxSizing: 'border-box', color: 'var(--text)', background: 'var(--surface-2)' }}
                  onFocus={e => e.target.style.borderColor = config.color}
                  onBlur={e => e.target.style.borderColor = 'var(--border-strong)'}
                />
              </div>

              {!canAddToCart && sheetOpen && (
                <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 10, background: '#FEF3C7', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 15 }}>⚠️</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#92400E' }}>
                    يرجى اختيار: {requiredGroupsMissing.map(g => g.name).join('، ')}
                  </span>
                </div>
              )}
            </div>

            <div style={{ position: 'sticky', bottom: 0, background: 'var(--surface)', borderTop: '1px solid var(--border)', padding: '12px 20px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))}
                  style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid var(--border-strong)', background: 'none', cursor: 'pointer', fontSize: 18, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text)' }}>
                  −
                </button>
                <span style={{ fontWeight: 800, fontSize: 18, color: 'var(--text)', minWidth: 22, textAlign: 'center', fontFamily: 'Inter, Cairo, sans-serif' }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)}
                  style={{ width: 36, height: 36, borderRadius: '50%', background: config.color, border: 'none', cursor: 'pointer', fontSize: 18, fontWeight: 700, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!canAddToCart}
                style={{ flex: 1, padding: '13px 16px', background: canAddToCart ? config.color : 'var(--surface-2)', color: canAddToCart ? 'white' : 'var(--text-3)', fontWeight: 800, fontSize: 14, borderRadius: 14, border: 'none', cursor: canAddToCart ? 'pointer' : 'not-allowed', fontFamily: 'Cairo, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s' }}
              >
                <ShoppingCart size={16} />
                إضافة للسلة · {sheetTotal} ج
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
