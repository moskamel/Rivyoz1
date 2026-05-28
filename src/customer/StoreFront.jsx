import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingCart, Menu, X, Search, Star, ChevronLeft, ChevronRight, Smartphone, Tag, Flame } from 'lucide-react'
import { getConfig, getMenuItems, getCategories, getBanners, getCombos, getFooterSettings } from '../lib/restaurantStore'
import { useCart } from './CartContext'

/* ─── Nearby restaurants ────────────────────────────────────── */
const mockNearbyRestaurants = [
  { id: 1, name: 'بيتزا بلازا', category: 'بيتزا', rating: 4.7, deliveryTime: 25, color: '#ef4444', slug: 'pizza-plaza' },
  { id: 2, name: 'كافيه ميترو', category: 'كافيه', rating: 4.5, deliveryTime: 20, color: '#8b5cf6', slug: 'metro-cafe' },
  { id: 3, name: 'شاورما كينج', category: 'مشويات', rating: 4.8, deliveryTime: 30, color: '#f59e0b', slug: 'shawarma-king' },
  { id: 4, name: 'سوشي هاوس', category: 'سوشي', rating: 4.6, deliveryTime: 40, color: '#10b981', slug: 'sushi-house' },
  { id: 5, name: 'برجر فاكتوري', category: 'مشويات', rating: 4.4, deliveryTime: 35, color: '#f97316', slug: 'burger-factory' },
]

const categoryFilters = ['الكل', 'مشويات', 'بيتزا', 'كافيه']

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
      {/* Slide */}
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
        {/* Overlay (always shown for images, transparent for gradients) */}
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

      {/* Arrows */}
      <button onClick={() => go(-1)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', width: 32, height: 32, borderRadius: '50%', background: 'rgba(0,0,0,0.25)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', backdropFilter: 'blur(4px)' }}>
        <ChevronRight size={18} />
      </button>
      <button onClick={() => go(1)} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 32, height: 32, borderRadius: '50%', background: 'rgba(0,0,0,0.25)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', backdropFilter: 'blur(4px)' }}>
        <ChevronLeft size={18} />
      </button>

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
        {banners.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? 20 : 6, height: 6, borderRadius: 3, background: 'white', opacity: i === current ? 1 : 0.5, border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s' }} />
        ))}
      </div>
    </div>
  )
}

/* ─── Shared item card used by all sections ─────────────────── */
function ItemCard({ accentColor, onClick, image, emoji = '🍽️', title, subtitle, price, originalPrice, badgeText, badgeColor = '#F97316', disabled, actionLabel = 'أضف +', onAction }) {
  return (
    <div
      onClick={onClick}
      style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', cursor: disabled ? 'default' : 'pointer', border: '1px solid #f3f4f6', transition: 'transform 0.15s' }}
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
        <p style={{ fontWeight: 700, color: '#1a1a1a', fontSize: 13, lineHeight: 1.3, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</p>
        {subtitle && (
          <p style={{ fontSize: 11, color: '#9ca3af', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{subtitle}</p>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 4 }}>
          <span style={{ fontWeight: 800, fontSize: 14, color: accentColor }}>{price} ج</span>
          {originalPrice && (
            <span style={{ fontSize: 11, color: '#9ca3af', textDecoration: 'line-through' }}>{originalPrice}</span>
          )}
        </div>
        <button
          disabled={disabled}
          onClick={onAction ? (e) => { e.stopPropagation(); onAction() } : undefined}
          style={{ width: '100%', marginTop: 8, padding: '7px', background: disabled ? '#e5e7eb' : accentColor, color: 'white', fontWeight: 700, fontSize: 13, borderRadius: 10, border: 'none', cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'Cairo, sans-serif' }}
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
    <div style={{ maxWidth: 480, margin: '8px auto 0', paddingBottom: 32 }}>
      <div style={{ background: 'white' }}>
        <h2 style={{ fontWeight: 800, color: '#1a1a1a', fontSize: 15, padding: '14px 16px 10px', borderBottom: '1px solid #f9fafb', display: 'flex', alignItems: 'center', gap: 6 }}>
          {Icon && <Icon size={16} style={{ color: accentColor }} />}
          {title}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: 12 }}>
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
          badgeText="🔥 بيستر"
          badgeColor="#F97316"
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
    <ItemGrid title="العروض والكومبو" icon={Tag} accentColor={accentColor}>
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

/* ─── Footer ────────────────────────────────────────────────── */
function Footer({ accentColor }) {
  const navigate = useNavigate()
  const f = getFooterSettings()
  return (
    <div style={{ background: '#1a1a1a', color: 'white', padding: '32px 20px', direction: 'rtl' }}>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900 }}>ر</div>
          <div>
            <p style={{ fontWeight: 900, fontSize: 16 }}>ريڤيو</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 1 }}>{f.tagline}</p>
          </div>
        </div>

        {f.showAppButtons && (
          <>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 14 }}>حمّل التطبيق واطلب بسهولة أكبر</p>
            <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
              <a href={f.iosUrl} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px 16px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12, color: 'white', fontSize: 13, fontWeight: 700, cursor: 'pointer', backdropFilter: 'blur(4px)', textDecoration: 'none' }}>
                <span style={{ fontSize: 20 }}>🍎</span> App Store
              </a>
              <a href={f.androidUrl} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px 16px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12, color: 'white', fontSize: 13, fontWeight: 700, cursor: 'pointer', backdropFilter: 'blur(4px)', textDecoration: 'none' }}>
                <span style={{ fontSize: 20 }}>🤖</span> Google Play
              </a>
            </div>
          </>
        )}

        <div style={{ display: 'flex', gap: 20, marginBottom: 20, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 20 }}>
          {f.showExploreLink && (
            <button onClick={() => navigate('/explore')} style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}>
              🗺️ قائمة المطاعم
            </button>
          )}
          <button style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}>📞 تواصل معنا</button>
          <button style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}>❓ المساعدة</button>
        </div>

        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>{f.copyright}</p>
      </div>
    </div>
  )
}

/* ─── Main StoreFront ───────────────────────────────────────── */
export default function StoreFront() {
  const navigate = useNavigate()
  const config = getConfig()
  const menuItems = getMenuItems()
  const categories = getCategories()
  const { addItem, itemCount, total } = useCart()

  const popularItems = menuItems.filter(i => i.active && i.bestseller)
  const activeCombos = getCombos().filter(c => c.active)

  const specialTabs = [
    ...(popularItems.length > 0 ? [{ id: 'popular', name: '🔥 الأكثر طلباً' }] : []),
    ...(activeCombos.length > 0 ? [{ id: 'combos', name: '🏷️ العروض والكومبو' }] : []),
  ]
  const allTabs = [...specialTabs, ...categories]

  const [selectedItem, setSelectedItem] = useState(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [qty, setQty] = useState(1)
  const [note, setNote] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('الكل')
  const [activeTab, setActiveTab] = useState(allTabs[0]?.id)

  const openItem = (item) => {
    if (!item.active) return
    setSelectedItem(item)
    setQty(1)
    setNote('')
    setSheetOpen(true)
  }

  const closeSheet = () => {
    setSheetOpen(false)
    setTimeout(() => setSelectedItem(null), 300)
  }

  const handleAddToCart = () => {
    if (!selectedItem) return
    addItem({ itemId: selectedItem.id, name: selectedItem.name, price: selectedItem.price, qty, note })
    closeSheet()
  }

  const handleAddCombo = (combo) => {
    addItem({ itemId: combo.id, name: combo.name, price: combo.price, qty: 1, note: combo.items })
  }

  const filteredNearby = activeCategoryFilter === 'الكل'
    ? mockNearbyRestaurants
    : mockNearbyRestaurants.filter(r => r.category === activeCategoryFilter)

  const filteredNearbyBySearch = searchQuery
    ? filteredNearby.filter(r => r.name.includes(searchQuery))
    : filteredNearby

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', fontFamily: 'Cairo, sans-serif' }} dir="rtl">

      {/* ─── Sticky Header ─── */}
      <div style={{ position: 'sticky', top: 0, zIndex: 40 }}>
        <div style={{ background: config.color, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16, color: 'white', flexShrink: 0 }}>
              {config.name.charAt(0)}
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: 14, color: 'white', lineHeight: 1.2 }}>{config.name}</p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)' }}>
                {config.isOpen ? '● مفتوح · يغلق ' + config.closesAt : '● مغلق · يفتح ' + config.opensAt}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <button onClick={() => setSidebarOpen(true)} style={{ padding: '8px', borderRadius: 10, background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', color: 'white', display: 'flex' }}>
              <Menu size={19} />
            </button>
            <button onClick={() => navigate('/cart')} style={{ padding: '8px', borderRadius: 10, background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', color: 'white', display: 'flex', position: 'relative' }}>
              <ShoppingCart size={19} />
              {itemCount > 0 && (
                <span style={{ position: 'absolute', top: -4, left: -4, background: 'white', fontSize: 9, fontWeight: 800, borderRadius: '50%', width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', color: config.color }}>
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {!config.isOpen && (
          <div style={{ background: '#FEF3C7', color: '#92400E', fontSize: 12, fontWeight: 600, textAlign: 'center', padding: '8px 16px' }}>
            المطعم مغلق حالياً — يفتح الساعة {config.opensAt} ظهر
          </div>
        )}
      </div>

      {/* ─── Banner Carousel ─── */}
      <BannerCarousel accentColor={config.color} />

      {/* ─── Category Tabs (below banner) ─── */}
      <div style={{ position: 'sticky', top: 56, zIndex: 30, background: 'white', borderBottom: '1px solid #f3f4f6', display: 'flex', overflowX: 'auto', scrollbarWidth: 'none' }} className="no-scrollbar">
        {allTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flexShrink: 0, padding: '12px 16px', fontSize: 14, fontWeight: 600, cursor: 'pointer', background: 'none', border: 'none', whiteSpace: 'nowrap', transition: 'all 0.15s',
              color: activeTab === tab.id ? config.color : '#6b7280',
              borderBottom: `2px solid ${activeTab === tab.id ? config.color : 'transparent'}`,
              fontFamily: 'Cairo, sans-serif',
            }}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* ─── Tab Content ─── */}
      {activeTab === 'popular' && (
        <div style={{ background: 'white', marginTop: 8 }}>
          <PopularSlider items={menuItems} accentColor={config.color} onOpen={openItem} />
        </div>
      )}

      {activeTab === 'combos' && (
        <div style={{ background: 'white', marginTop: 8 }}>
          <OffersSection accentColor={config.color} onAddCombo={handleAddCombo} />
        </div>
      )}

      {activeTab !== 'popular' && activeTab !== 'combos' && (() => {
        const cat = categories.find(c => c.id === activeTab)
        if (!cat) return null
        const catItems = menuItems.filter(i => i.categoryId === cat.id)
        if (catItems.length === 0) return (
          <div style={{ textAlign: 'center', padding: '48px 16px', color: '#9ca3af', fontSize: 14 }}>لا توجد أصناف في هذا القسم</div>
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
                badgeText={item.bestseller ? '🔥' : null}
                badgeColor="#F97316"
                disabled={!item.active}
              />
            ))}
          </ItemGrid>
        )
      })()}

      {/* ─── Footer ─── */}
      <Footer accentColor={config.color} />

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
          <div onClick={closeSheet} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50, opacity: sheetOpen ? 1 : 0, transition: 'opacity 0.3s' }} />
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50, background: 'white', borderRadius: '24px 24px 0 0', maxWidth: 480, margin: '0 auto', transform: sheetOpen ? 'translateY(0)' : 'translateY(100%)', transition: 'transform 0.3s ease' }}>
            <div onClick={closeSheet} style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, paddingBottom: 4, cursor: 'pointer' }}>
              <div style={{ width: 40, height: 4, background: '#e5e7eb', borderRadius: 2 }} />
            </div>
            <div style={{ padding: '8px 20px 32px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                <div>
                  <h3 style={{ fontWeight: 800, color: '#1a1a1a', fontSize: 18 }}>{selectedItem.name}</h3>
                  {selectedItem.description && <p style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>{selectedItem.description}</p>}
                  <p style={{ fontWeight: 800, fontSize: 18, color: config.color, marginTop: 8 }}>{selectedItem.price} ج</p>
                </div>
                <button onClick={closeSheet} style={{ padding: 8, borderRadius: 10, background: '#f3f4f6', border: 'none', cursor: 'pointer', display: 'flex' }}>
                  <X size={17} />
                </button>
              </div>

              {/* Qty stepper */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, margin: '20px 0' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid #e5e7eb', background: 'none', cursor: 'pointer', fontSize: 20, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  −
                </button>
                <span style={{ fontWeight: 800, fontSize: 22, color: '#1a1a1a', minWidth: 28, textAlign: 'center' }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} style={{ width: 40, height: 40, borderRadius: '50%', background: config.color, border: 'none', cursor: 'pointer', fontSize: 20, fontWeight: 700, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  +
                </button>
              </div>

              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="ملاحظات... (اختياري)"
                rows={2}
                style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #e5e7eb', fontSize: 13, outline: 'none', resize: 'none', marginBottom: 16, fontFamily: 'Cairo, sans-serif', boxSizing: 'border-box' }}
              />
              <button
                onClick={handleAddToCart}
                style={{ width: '100%', padding: '14px', background: config.color, color: 'white', fontWeight: 800, fontSize: 14, borderRadius: 14, border: 'none', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}
              >
                أضف للسلة · {selectedItem.price * qty} ج
              </button>
            </div>
          </div>
        </>
      )}

      {/* ─── Marketplace Sidebar ─── */}
      {sidebarOpen && (
        <>
          <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50 }} />
          <div style={{ position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50, background: 'white', width: 300, boxShadow: '4px 0 24px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column' }} dir="rtl">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: '1px solid #f3f4f6' }}>
              <h2 style={{ fontWeight: 800, color: '#1a1a1a', fontSize: 15 }}>المطاعم القريبة</h2>
              <button onClick={() => setSidebarOpen(false)} style={{ padding: 6, borderRadius: 8, background: '#f3f4f6', border: 'none', cursor: 'pointer', display: 'flex' }}>
                <X size={16} />
              </button>
            </div>
            <div style={{ padding: 12, borderBottom: '1px solid #f9fafb' }}>
              <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                <input type="text" placeholder="ابحث عن مطعم..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  style={{ width: '100%', padding: '9px 34px 9px 12px', background: '#f9fafb', border: '1px solid #f3f4f6', borderRadius: 10, fontSize: 13, outline: 'none', fontFamily: 'Cairo, sans-serif', boxSizing: 'border-box' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, padding: '10px 12px', borderBottom: '1px solid #f9fafb', overflowX: 'auto', scrollbarWidth: 'none' }} className="no-scrollbar">
              {categoryFilters.map(f => (
                <button key={f} onClick={() => setActiveCategoryFilter(f)}
                  style={{ flexShrink: 0, padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'Cairo, sans-serif', background: activeCategoryFilter === f ? config.color : '#f3f4f6', color: activeCategoryFilter === f ? 'white' : '#6b7280' }}
                >
                  {f}
                </button>
              ))}
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {filteredNearbyBySearch.map(r => (
                <div key={r.id} onClick={() => { setSidebarOpen(false); navigate(`/${r.slug}`) }}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 12, cursor: 'pointer', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: 16, flexShrink: 0 }}>
                    {r.name.charAt(0)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 700, fontSize: 13, color: '#1a1a1a' }}>{r.name}</p>
                    <p style={{ fontSize: 11, color: '#9ca3af' }}>{r.category} · {r.deliveryTime} دقيقة</p>
                    <p style={{ fontSize: 11, color: '#F59E0B', fontWeight: 600 }}>⭐ {r.rating}</p>
                  </div>
                  {r.slug === config.slug && (
                    <span style={{ fontSize: 10, fontWeight: 800, padding: '3px 8px', borderRadius: 8, background: config.color, color: 'white', flexShrink: 0 }}>أنت هنا</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
