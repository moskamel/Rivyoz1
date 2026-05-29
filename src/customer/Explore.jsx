import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Star, Clock, MapPin, List, Map } from 'lucide-react'
import CustomerNav from './CustomerNav'
import CustomerFooter from './CustomerFooter'

const mockRestaurants = [
  { id: 1, name: 'مطعم الشيف أحمد', category: 'مشويات', rating: 4.9, reviews: 312, deliveryTime: 30, deliveryFee: 15, color: '#f97316', emoji: '🍖', slug: 'chef-ahmed', isOpen: true, tags: ['مشهور', 'طازج'], x: 62, y: 38 },
  { id: 2, name: 'بيتزا بلازا', category: 'بيتزا', rating: 4.7, reviews: 218, deliveryTime: 25, deliveryFee: 10, color: '#ef4444', emoji: '🍕', slug: 'pizza-plaza', isOpen: true, tags: ['أكثر طلباً'], x: 72, y: 58 },
  { id: 3, name: 'كافيه ميترو', category: 'كافيه', rating: 4.5, reviews: 184, deliveryTime: 20, deliveryFee: 0, color: '#8b5cf6', emoji: '☕', slug: 'metro-cafe', isOpen: true, tags: ['توصيل مجاني'], x: 38, y: 28 },
  { id: 4, name: 'شاورما كينج', category: 'مشويات', rating: 4.8, reviews: 267, deliveryTime: 30, deliveryFee: 12, color: '#f59e0b', emoji: '🌯', slug: 'shawarma-king', isOpen: false, tags: [], x: 80, y: 72 },
  { id: 5, name: 'سوشي هاوس', category: 'سوشي', rating: 4.6, reviews: 143, deliveryTime: 40, deliveryFee: 20, color: '#10b981', emoji: '🍣', slug: 'sushi-house', isOpen: true, tags: ['جديد'], x: 25, y: 52 },
  { id: 6, name: 'برجر فاكتوري', category: 'مشويات', rating: 4.4, reviews: 195, deliveryTime: 35, deliveryFee: 15, color: '#6366f1', emoji: '🍔', slug: 'burger-factory', isOpen: true, tags: [], x: 50, y: 70 },
]

const categoryFilters = [
  { key: 'الكل', icon: '🍽️' },
  { key: 'مشويات', icon: '🍖' },
  { key: 'بيتزا', icon: '🍕' },
  { key: 'كافيه', icon: '☕' },
  { key: 'سوشي', icon: '🍣' },
]

const featured = mockRestaurants.filter(r => r.isOpen).slice(0, 3)

/* ── Pure-CSS pin map — no external dependencies ── */
function PinMap({ restaurants, selected, onSelect }) {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: '#e8f0e4',
    }}>
      {/* Road grid */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.55 }}>
        {/* Horizontal roads */}
        {[20, 35, 50, 65, 80].map(y => (
          <rect key={`h${y}`} x="0" y={`${y}%`} width="100%" height="6" fill="#fff" />
        ))}
        {/* Vertical roads */}
        {[15, 30, 48, 65, 82].map(x => (
          <rect key={`v${x}`} x={`${x}%`} y="0" width="6" height="100%" fill="#fff" />
        ))}
        {/* Diagonal accent */}
        <line x1="0" y1="100%" x2="100%" y2="0" stroke="#d4e6cc" strokeWidth="18" />
        {/* Park blobs */}
        <ellipse cx="20%" cy="20%" rx="9%" ry="7%" fill="#c8dfc0" />
        <ellipse cx="78%" cy="78%" rx="7%" ry="6%" fill="#c8dfc0" />
        <rect x="42%" y="40%" width="12%" height="12%" rx="4" fill="#d0e8f0" />
      </svg>

      {/* Block textures */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      {/* Restaurant pins */}
      {restaurants.map(r => {
        const isSelected = selected?.id === r.id
        return (
          <div
            key={r.id}
            onClick={() => onSelect(isSelected ? null : r)}
            style={{
              position: 'absolute',
              left: `${r.x}%`, top: `${r.y}%`,
              transform: 'translate(-50%, -100%)',
              cursor: 'pointer',
              zIndex: isSelected ? 20 : 10,
              transition: 'transform 0.15s',
            }}
          >
            {/* Pin bubble */}
            <div style={{
              width: isSelected ? 54 : 44, height: isSelected ? 54 : 44,
              borderRadius: '50%',
              background: r.isOpen ? r.color : '#9CA3AF',
              border: `3px solid ${isSelected ? 'white' : 'rgba(255,255,255,0.8)'}`,
              boxShadow: isSelected
                ? `0 6px 20px ${r.color}80, 0 0 0 4px ${r.color}30`
                : `0 3px 10px rgba(0,0,0,0.22)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: isSelected ? 26 : 20,
              opacity: r.isOpen ? 1 : 0.55,
              transition: 'all 0.2s',
            }}>
              {r.emoji}
            </div>
            {/* Pin tail */}
            <div style={{
              width: 0, height: 0,
              borderLeft: '6px solid transparent', borderRight: '6px solid transparent',
              borderTop: `8px solid ${r.isOpen ? r.color : '#9CA3AF'}`,
              margin: '0 auto',
              filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.18))',
            }} />
            {/* Name label when selected */}
            {isSelected && (
              <div style={{
                position: 'absolute', bottom: '110%', left: '50%', transform: 'translateX(-50%)',
                background: 'white', borderRadius: 10, padding: '5px 10px',
                fontSize: 11, fontWeight: 700, color: '#111827', whiteSpace: 'nowrap',
                boxShadow: '0 4px 14px rgba(0,0,0,0.14)',
                border: `1.5px solid ${r.color}40`,
                fontFamily: 'Cairo, sans-serif',
              }}>
                {r.name}
              </div>
            )}
          </div>
        )
      })}

      {/* Compass rose */}
      <div style={{
        position: 'absolute', top: 12, left: 12, width: 32, height: 32,
        background: 'white', borderRadius: '50%',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 16,
      }}>
        🧭
      </div>

      {/* Scale bar */}
      <div style={{
        position: 'absolute', bottom: 12, left: 12,
        background: 'white', borderRadius: 8, padding: '4px 10px',
        fontSize: 10, fontWeight: 700, color: '#6B7280',
        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        fontFamily: 'Inter, sans-serif',
      }}>
        1 km
      </div>
    </div>
  )
}

function MapBottomSheet({ restaurant, onClose, onNavigate }) {
  if (!restaurant) return null
  return (
    <div
      style={{
        position: 'absolute', bottom: 64, left: 0, right: 0, zIndex: 1000,
        background: 'white', borderRadius: '20px 20px 0 0',
        padding: '12px 16px 24px',
        boxShadow: '0 -8px 32px rgba(0,0,0,0.14)',
        animation: 'slideUp 0.22s cubic-bezier(0.16,1,0.3,1)',
        fontFamily: 'Cairo, sans-serif',
      }}
      dir="rtl"
    >
      <div style={{ width: 36, height: 4, borderRadius: 2, background: '#E5E7EB', margin: '0 auto 14px' }} />

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{
          width: 56, height: 56, borderRadius: 16, flexShrink: 0,
          background: `linear-gradient(135deg,${restaurant.color}22,${restaurant.color}44)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
          border: `2px solid ${restaurant.color}30`,
        }}>
          {restaurant.emoji}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontSize: 16, fontWeight: 800, color: '#111827' }}>{restaurant.name}</p>
            <span style={{
              fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 8,
              background: restaurant.isOpen ? '#F0FDF4' : '#FEF2F2',
              color: restaurant.isOpen ? '#16A34A' : '#DC2626',
              border: `1px solid ${restaurant.isOpen ? '#BBF7D0' : '#FECACA'}`,
            }}>
              {restaurant.isOpen ? 'مفتوح' : 'مغلق'}
            </span>
          </div>
          <p style={{ fontSize: 12, color: '#9CA3AF', marginTop: 1 }}>{restaurant.category}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 5 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Star size={12} color="#F59E0B" fill="#F59E0B" />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#111827', fontFamily: 'Inter' }}>{restaurant.rating}</span>
            </div>
            <span style={{ color: '#D1D5DB' }}>·</span>
            <Clock size={11} color="#9CA3AF" />
            <span style={{ fontSize: 12, color: '#6B7280' }}>{restaurant.deliveryTime} دقيقة</span>
            <span style={{ color: '#D1D5DB' }}>·</span>
            <span style={{ fontSize: 12, color: restaurant.deliveryFee === 0 ? '#16A34A' : '#6B7280', fontWeight: restaurant.deliveryFee === 0 ? 700 : 400 }}>
              {restaurant.deliveryFee === 0 ? 'توصيل مجاني' : `${restaurant.deliveryFee} ج`}
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
        <button
          onClick={onClose}
          style={{
            flex: 1, padding: '13px', borderRadius: 12, fontSize: 13, fontWeight: 700,
            border: '1.5px solid #E5E7EB', background: 'white', color: '#6B7280',
            cursor: 'pointer', fontFamily: 'Cairo, sans-serif',
          }}
        >إغلاق</button>
        <button
          onClick={() => onNavigate(restaurant.slug)}
          style={{
            flex: 2, padding: '13px', borderRadius: 12, fontSize: 14, fontWeight: 700,
            border: 'none', background: restaurant.color, color: 'white',
            cursor: 'pointer', fontFamily: 'Cairo, sans-serif',
            boxShadow: `0 6px 20px ${restaurant.color}44`,
          }}
        >
          {restaurant.isOpen ? 'اطلب الآن 🛵' : 'عرض المطعم'}
        </button>
      </div>
    </div>
  )
}

export default function Explore() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('الكل')
  const [searchFocused, setSearchFocused] = useState(false)
  const [filterTab, setFilterTab] = useState('الكل')
  const [viewMode, setViewMode] = useState('list')
  const [selectedOnMap, setSelectedOnMap] = useState(null)

  const filtered = mockRestaurants.filter(r => {
    const matchSearch = !search || r.name.includes(search) || r.category.includes(search)
    const matchCat = activeFilter === 'الكل' || r.category === activeFilter
    const matchTab = filterTab === 'الكل' ||
      (filterTab === 'مفتوح' && r.isOpen) ||
      (filterTab === 'سريع' && r.deliveryTime <= 25) ||
      (filterTab === 'مجاني' && r.deliveryFee === 0)
    return matchSearch && matchCat && matchTab
  })

  return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', background: 'var(--bg)', fontFamily: 'Cairo, sans-serif', overflow: 'hidden' }} dir="rtl">
      <style>{`@keyframes slideUp { from { transform:translateY(100%); opacity:0; } to { transform:translateY(0); opacity:1; } }`}</style>

      {/* ── Sticky header ── */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
        <div style={{ padding: '14px 16px 0' }}>

          {/* Top bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #F97316, #EA580C)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>🍽️</div>
              <div>
                <h1 style={{ fontSize: 17, fontWeight: 900, color: 'var(--text)', letterSpacing: '-0.02em' }}>اكتشف المطاعم</h1>
                <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 1 }}>{mockRestaurants.filter(r => r.isOpen).length} مطعم مفتوح</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'var(--surface-2)', border: '1px solid var(--border-strong)', borderRadius: 10, padding: '7px 11px', cursor: 'pointer' }}>
                <MapPin size={13} color="#F97316" />
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: '#374151' }}>التجمع الخامس</p>
                  <p style={{ fontSize: 9, color: '#9CA3AF' }}>القاهرة</p>
                </div>
              </button>

              {/* View toggle */}
              <div style={{ display: 'flex', background: '#F3F4F6', borderRadius: 10, padding: 3, gap: 2 }}>
                {[{ mode: 'list', Icon: List }, { mode: 'map', Icon: Map }].map(({ mode, Icon }) => (
                  <button
                    key={mode}
                    onClick={() => { setViewMode(mode); setSelectedOnMap(null) }}
                    style={{
                      padding: '6px 9px', borderRadius: 8, border: 'none', cursor: 'pointer',
                      background: viewMode === mode ? 'white' : 'transparent',
                      color: viewMode === mode ? '#F97316' : '#9CA3AF',
                      boxShadow: viewMode === mode ? '0 1px 4px rgba(0,0,0,0.10)' : 'none',
                      transition: 'all 0.15s', display: 'flex', alignItems: 'center',
                    }}
                  >
                    <Icon size={15} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Search */}
          <div style={{
            position: 'relative', marginBottom: 12,
            borderRadius: 50, border: `1.5px solid ${searchFocused ? '#F97316' : '#E5E7EB'}`,
            background: searchFocused ? 'white' : '#F9FAFB',
            boxShadow: searchFocused ? '0 0 0 3px rgba(249,115,22,0.12)' : 'none',
            transition: 'all 0.2s',
          }}>
            <Search size={15} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: searchFocused ? '#F97316' : '#9CA3AF', transition: 'color 0.2s' }} />
            <input
              type="text" placeholder="ابحث عن مطعم أو أكلة..."
              value={search} onChange={e => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)}
              style={{
                width: '100%', padding: '12px 46px 12px 16px', border: 'none', outline: 'none',
                background: 'transparent', fontSize: 13, color: '#374151',
                fontFamily: 'Cairo, sans-serif', boxSizing: 'border-box', borderRadius: 50,
              }}
            />
          </div>

          {/* Category pills */}
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 12, scrollbarWidth: 'none' }}>
            {categoryFilters.map(f => (
              <button
                key={f.key} onClick={() => setActiveFilter(f.key)}
                style={{
                  flexShrink: 0, display: 'flex', alignItems: 'center', gap: 5,
                  padding: '7px 14px', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  border: `1.5px solid ${activeFilter === f.key ? '#F97316' : 'var(--border-strong)'}`,
                  background: activeFilter === f.key ? '#FFF7ED' : 'var(--surface)',
                  color: activeFilter === f.key ? '#EA580C' : '#6B7280',
                  transition: 'all 0.15s', fontFamily: 'Cairo, sans-serif',
                }}
              >
                <span style={{ fontSize: 15 }}>{f.icon}</span>{f.key}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Map view ── */}
      {viewMode === 'map' ? (
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          {/* Floating filter tabs */}
          <div style={{ position: 'absolute', top: 12, right: 0, left: 0, zIndex: 500, display: 'flex', gap: 8, justifyContent: 'center', padding: '0 16px', pointerEvents: 'none' }}>
            {['الكل', 'مفتوح الآن', 'توصيل سريع', 'توصيل مجاني'].map(tab => {
              const tabKey = tab === 'مفتوح الآن' ? 'مفتوح' : tab === 'توصيل سريع' ? 'سريع' : tab === 'توصيل مجاني' ? 'مجاني' : 'الكل'
              const active = filterTab === tabKey
              return (
                <button
                  key={tab} onClick={() => setFilterTab(tabKey)}
                  style={{
                    pointerEvents: 'all', flexShrink: 0, padding: '8px 14px', borderRadius: 20,
                    fontSize: 12, fontWeight: 700, cursor: 'pointer', border: 'none',
                    background: active ? '#F97316' : 'white', color: active ? 'white' : '#6B7280',
                    transition: 'all 0.15s', fontFamily: 'Cairo, sans-serif',
                    boxShadow: active ? '0 4px 14px rgba(249,115,22,0.40)' : '0 2px 8px rgba(0,0,0,0.14)',
                  }}
                >{tab}</button>
              )
            })}
          </div>

          {/* Count badge */}
          <div style={{
            position: 'absolute', bottom: selectedOnMap ? 260 : 84, right: 16, zIndex: 500,
            background: 'white', borderRadius: 12, padding: '7px 13px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.14)', fontSize: 12, fontWeight: 700, color: '#374151',
            fontFamily: 'Cairo, sans-serif', transition: 'bottom 0.25s',
            display: 'flex', alignItems: 'center', gap: 5,
          }}>
            <span style={{ color: '#F97316' }}>📍</span>{filtered.length} مطعم
          </div>

          <PinMap
            restaurants={filtered}
            selected={selectedOnMap}
            onSelect={r => setSelectedOnMap(r)}
          />

          <MapBottomSheet
            restaurant={selectedOnMap}
            onClose={() => setSelectedOnMap(null)}
            onNavigate={slug => navigate(`/${slug}`)}
          />
        </div>
      ) : (
        /* ── List view ── */
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <div style={{ padding: '16px 16px 0' }}>

            {/* Filter tabs */}
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none', marginBottom: 16, paddingBottom: 2 }}>
              {['الكل', 'مفتوح الآن', 'توصيل سريع', 'توصيل مجاني'].map(tab => {
                const tabKey = tab === 'مفتوح الآن' ? 'مفتوح' : tab === 'توصيل سريع' ? 'سريع' : tab === 'توصيل مجاني' ? 'مجاني' : 'الكل'
                const active = filterTab === tabKey
                return (
                  <button
                    key={tab} onClick={() => setFilterTab(tabKey)}
                    style={{
                      flexShrink: 0, padding: '8px 16px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                      cursor: 'pointer', border: 'none',
                      background: active ? '#F97316' : 'var(--surface-2)', color: active ? 'white' : 'var(--text-2)',
                      transition: 'all 0.15s', fontFamily: 'Cairo, sans-serif',
                      boxShadow: active ? '0 4px 12px rgba(249,115,22,0.3)' : 'none',
                    }}
                  >{tab}</button>
                )
              })}
            </div>

            {/* Featured */}
            {!search && activeFilter === 'الكل' && filterTab === 'الكل' && (
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: 14, fontWeight: 800, color: '#111827', marginBottom: 12 }}>⭐ مميزون</p>
                <div style={{ display: 'flex', gap: 12, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 4 }}>
                  {featured.map(r => (
                    <div
                      key={r.id} onClick={() => navigate(`/${r.slug}`)}
                      style={{
                        flexShrink: 0, width: 200, height: 140, borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
                        background: `linear-gradient(135deg, ${r.color}, ${r.color}bb)`,
                        position: 'relative', boxShadow: `0 8px 24px ${r.color}40`, transition: 'transform 0.15s, box-shadow 0.15s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 14px 32px ${r.color}55` }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 24px ${r.color}40` }}
                    >
                      <div style={{ position: 'absolute', top: -15, left: -15, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', pointerEvents: 'none' }} />
                      <div style={{ position: 'absolute', top: 12, right: 12, fontSize: 36 }}>{r.emoji}</div>
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '8px 12px 10px', background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(4px)' }}>
                        <p style={{ color: 'white', fontWeight: 800, fontSize: 13, marginBottom: 2 }}>{r.name}</p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Star size={10} color="#FCD34D" fill="#FCD34D" />
                            <span style={{ fontSize: 11, color: 'white', fontFamily: 'Inter', fontWeight: 700 }}>{r.rating}</span>
                            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', fontFamily: 'Inter' }}>· {r.deliveryTime} د</span>
                          </div>
                          <button
                            onClick={e => { e.stopPropagation(); navigate(`/${r.slug}`) }}
                            style={{ padding: '3px 10px', background: 'rgba(255,255,255,0.25)', border: '1px solid rgba(255,255,255,0.5)', borderRadius: 8, color: 'white', fontSize: 10, fontWeight: 700, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', backdropFilter: 'blur(4px)' }}
                          >اطلب الآن</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section title */}
            <p style={{ fontSize: 14, fontWeight: 800, color: '#111827', marginBottom: 12 }}>
              {search ? `نتائج البحث (${filtered.length})` : activeFilter !== 'الكل' ? activeFilter : 'جميع المطاعم'}
            </p>

            {/* Restaurant list */}
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 24px' }}>
                <p style={{ fontSize: 48, marginBottom: 12 }}>🔍</p>
                <p style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 6 }}>لم نجد نتائج</p>
                <p style={{ fontSize: 13, color: '#9CA3AF' }}>جرب كلمة بحث مختلفة</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {filtered.map(r => (
                  <div
                    key={r.id} onClick={() => navigate(`/${r.slug}`)}
                    style={{
                      background: 'var(--surface)', borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
                      border: '1px solid var(--border)',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)',
                      opacity: r.isOpen ? 1 : 0.7, transition: 'transform 0.15s, box-shadow 0.15s',
                      display: 'flex', alignItems: 'stretch',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.09)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)' }}
                  >
                    <div style={{ width: 80, flexShrink: 0, background: `linear-gradient(135deg, ${r.color}22, ${r.color}44)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, borderLeft: `3px solid ${r.color}30` }}>
                      {r.emoji}
                    </div>
                    <div style={{ flex: 1, padding: '12px 14px 12px 12px', minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 3 }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 1 }}>{r.name}</p>
                          <p style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 5 }}>{r.category}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0, marginRight: 8 }}>
                          <Star size={12} color="#F59E0B" fill="#F59E0B" />
                          <span style={{ fontSize: 12, fontWeight: 700, color: '#111827', fontFamily: 'Inter' }}>{r.rating}</span>
                          <span style={{ fontSize: 10, color: '#9CA3AF', fontFamily: 'Inter' }}>({r.reviews})</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                          <Clock size={11} color="#9CA3AF" />
                          <span style={{ fontSize: 11, color: '#6B7280' }}>{r.deliveryTime} دقيقة</span>
                        </div>
                        <span style={{ color: '#D1D5DB', fontSize: 10 }}>·</span>
                        <span style={{ fontSize: 11, color: r.deliveryFee === 0 ? '#16A34A' : '#6B7280', fontWeight: r.deliveryFee === 0 ? 700 : 400 }}>
                          {r.deliveryFee === 0 ? 'توصيل مجاني' : `${r.deliveryFee} ج توصيل`}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                          {r.tags.map(tag => (
                            <span key={tag} style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 6, background: `${r.color}18`, color: r.color }}>{tag}</span>
                          ))}
                        </div>
                        <span style={{
                          fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 8,
                          background: r.isOpen ? '#F0FDF4' : '#FEF2F2',
                          color: r.isOpen ? '#16A34A' : '#DC2626',
                          border: `1px solid ${r.isOpen ? '#BBF7D0' : '#FECACA'}`, flexShrink: 0,
                        }}>
                          {r.isOpen ? 'مفتوح' : 'مغلق الآن'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <CustomerFooter />
          <div style={{ height: 80 }} />
        </div>
      )}

      <CustomerNav />
    </div>
  )
}
