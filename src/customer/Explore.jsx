import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Star, Clock, MapPin } from 'lucide-react'

const mockRestaurants = [
  { id: 1, name: 'مطعم الشيف أحمد', category: 'مشويات', rating: 4.9, reviews: 312, deliveryTime: 30, deliveryFee: 15, color: '#f97316', emoji: '🍖', slug: 'chef-ahmed', isOpen: true, tags: ['مشهور', 'طازج'] },
  { id: 2, name: 'بيتزا بلازا', category: 'بيتزا', rating: 4.7, reviews: 218, deliveryTime: 25, deliveryFee: 10, color: '#ef4444', emoji: '🍕', slug: 'pizza-plaza', isOpen: true, tags: ['أكثر طلباً'] },
  { id: 3, name: 'كافيه ميترو', category: 'كافيه', rating: 4.5, reviews: 184, deliveryTime: 20, deliveryFee: 0, color: '#8b5cf6', emoji: '☕', slug: 'metro-cafe', isOpen: true, tags: ['توصيل مجاني'] },
  { id: 4, name: 'شاورما كينج', category: 'مشويات', rating: 4.8, reviews: 267, deliveryTime: 30, deliveryFee: 12, color: '#f59e0b', emoji: '🌯', slug: 'shawarma-king', isOpen: false, tags: [] },
  { id: 5, name: 'سوشي هاوس', category: 'سوشي', rating: 4.6, reviews: 143, deliveryTime: 40, deliveryFee: 20, color: '#10b981', emoji: '🍣', slug: 'sushi-house', isOpen: true, tags: ['جديد'] },
  { id: 6, name: 'برجر فاكتوري', category: 'مشويات', rating: 4.4, reviews: 195, deliveryTime: 35, deliveryFee: 15, color: '#6366f1', emoji: '🍔', slug: 'burger-factory', isOpen: true, tags: [] },
]

const categoryFilters = [
  { key: 'الكل', icon: '🍽️' },
  { key: 'مشويات', icon: '🍖' },
  { key: 'بيتزا', icon: '🍕' },
  { key: 'كافيه', icon: '☕' },
  { key: 'سوشي', icon: '🍣' },
]

const featured = mockRestaurants.filter(r => r.isOpen).slice(0, 3)

export default function Explore() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('الكل')
  const [searchFocused, setSearchFocused] = useState(false)
  const [filterTab, setFilterTab] = useState('الكل')

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
    <div style={{ minHeight: '100vh', background: '#F9FAFB', fontFamily: 'Cairo, sans-serif' }} dir="rtl">

      {/* ── Sticky header ── */}
      <div style={{ background: 'white', borderBottom: '1px solid #F3F4F6', position: 'sticky', top: 0, zIndex: 20 }}>
        <div style={{ maxWidth: 480, margin: '0 auto', padding: '14px 16px 0' }}>

          {/* Top bar: logo + title + location */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {/* Logo circle */}
              <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #F97316, #EA580C)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                🍽️
              </div>
              <div>
                <h1 style={{ fontSize: 17, fontWeight: 900, color: '#111827', letterSpacing: '-0.02em' }}>اكتشف المطاعم</h1>
                <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 1 }}>{mockRestaurants.filter(r => r.isOpen).length} مطعم مفتوح</p>
              </div>
            </div>

            {/* Location */}
            <button style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 10, padding: '7px 11px', cursor: 'pointer' }}>
              <MapPin size={13} color="#F97316" />
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 10, fontWeight: 700, color: '#374151' }}>التجمع الخامس</p>
                <p style={{ fontSize: 9, color: '#9CA3AF' }}>القاهرة</p>
              </div>
            </button>
          </div>

          {/* Search bar */}
          <div style={{
            position: 'relative', marginBottom: 12,
            borderRadius: 50, border: `1.5px solid ${searchFocused ? '#F97316' : '#E5E7EB'}`,
            background: searchFocused ? 'white' : '#F9FAFB',
            boxShadow: searchFocused ? '0 0 0 3px rgba(249,115,22,0.12)' : 'none',
            transition: 'all 0.2s',
          }}>
            <Search size={15} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: searchFocused ? '#F97316' : '#9CA3AF', transition: 'color 0.2s' }} />
            <input
              type="text"
              placeholder="ابحث عن مطعم أو أكلة..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              style={{
                width: '100%', padding: '12px 46px 12px 16px', border: 'none', outline: 'none', background: 'transparent',
                fontSize: 13, color: '#374151', fontFamily: 'Cairo, sans-serif', boxSizing: 'border-box', borderRadius: 50,
              }}
            />
          </div>

          {/* Category pills */}
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 12, scrollbarWidth: 'none' }}>
            {categoryFilters.map(f => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                style={{
                  flexShrink: 0, display: 'flex', alignItems: 'center', gap: 5,
                  padding: '7px 14px', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  border: `1.5px solid ${activeFilter === f.key ? '#F97316' : '#E5E7EB'}`,
                  background: activeFilter === f.key ? '#FFF7ED' : 'white',
                  color: activeFilter === f.key ? '#EA580C' : '#6B7280',
                  transition: 'all 0.15s', fontFamily: 'Cairo, sans-serif',
                }}
              >
                <span style={{ fontSize: 15 }}>{f.icon}</span>
                {f.key}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '16px 16px 40px' }}>

        {/* ── Featured Section ── */}
        {!search && activeFilter === 'الكل' && (
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 14, fontWeight: 800, color: '#111827', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              ⭐ مميزون
            </p>
            <div style={{ display: 'flex', gap: 12, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 4 }}>
              {featured.map(r => (
                <div
                  key={r.id}
                  onClick={() => navigate(`/${r.slug}`)}
                  style={{
                    flexShrink: 0, width: 200, height: 140, borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
                    background: `linear-gradient(135deg, ${r.color}, ${r.color}bb)`,
                    position: 'relative',
                    boxShadow: `0 8px 24px ${r.color}40`,
                    transition: 'transform 0.15s, box-shadow 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 14px 32px ${r.color}55` }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 24px ${r.color}40` }}
                >
                  {/* Decorative circle */}
                  <div style={{ position: 'absolute', top: -15, left: -15, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', pointerEvents: 'none' }} />

                  {/* Emoji */}
                  <div style={{ position: 'absolute', top: 12, right: 12, fontSize: 36 }}>{r.emoji}</div>

                  {/* Info bottom */}
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
                      >
                        اطلب الآن
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Filter tabs ── */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none', marginBottom: 16, paddingBottom: 2 }}>
          {['الكل', 'مفتوح الآن', 'توصيل سريع', 'توصيل مجاني'].map(tab => {
            const tabKey = tab === 'مفتوح الآن' ? 'مفتوح' : tab === 'توصيل سريع' ? 'سريع' : tab === 'توصيل مجاني' ? 'مجاني' : 'الكل'
            const active = filterTab === tabKey
            return (
              <button
                key={tab}
                onClick={() => setFilterTab(tabKey)}
                style={{
                  flexShrink: 0, padding: '8px 16px', borderRadius: 20, fontSize: 12, fontWeight: 700, cursor: 'pointer', border: 'none',
                  background: active ? '#F97316' : '#F3F4F6',
                  color: active ? 'white' : '#6B7280',
                  transition: 'all 0.15s', fontFamily: 'Cairo, sans-serif',
                  boxShadow: active ? '0 4px 12px rgba(249,115,22,0.3)' : 'none',
                }}
              >
                {tab}
              </button>
            )
          })}
        </div>

        {/* ── Section title ── */}
        <p style={{ fontSize: 14, fontWeight: 800, color: '#111827', marginBottom: 12 }}>
          {search ? `نتائج البحث (${filtered.length})` : activeFilter !== 'الكل' ? activeFilter : 'جميع المطاعم'}
        </p>

        {/* ── Restaurant list ── */}
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
                key={r.id}
                onClick={() => navigate(`/${r.slug}`)}
                style={{
                  background: 'white', borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
                  border: '1px solid #F3F4F6',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)',
                  opacity: r.isOpen ? 1 : 0.7,
                  transition: 'transform 0.15s, box-shadow 0.15s',
                  display: 'flex', alignItems: 'stretch',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.09)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)' }}
              >
                {/* Colored emoji box */}
                <div style={{
                  width: 80, flexShrink: 0,
                  background: `linear-gradient(135deg, ${r.color}22, ${r.color}44)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32,
                  borderLeft: `3px solid ${r.color}30`,
                }}>
                  {r.emoji}
                </div>

                {/* Content */}
                <div style={{ flex: 1, padding: '12px 14px 12px 12px', minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 3 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: 1 }}>{r.name}</p>
                      <p style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 5 }}>{r.category}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0, marginRight: 8 }}>
                      <Star size={12} color="#F59E0B" fill="#F59E0B" />
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#111827', fontFamily: 'Inter' }}>{r.rating}</span>
                      <span style={{ fontSize: 10, color: '#9CA3AF', fontFamily: 'Inter' }}>({r.reviews})</span>
                    </div>
                  </div>

                  {/* Delivery info row */}
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

                  {/* Tags + status row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                      {r.tags.map(tag => (
                        <span key={tag} style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 6, background: `${r.color}18`, color: r.color }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 8,
                      background: r.isOpen ? '#F0FDF4' : '#FEF2F2',
                      color: r.isOpen ? '#16A34A' : '#DC2626',
                      border: `1px solid ${r.isOpen ? '#BBF7D0' : '#FECACA'}`,
                      flexShrink: 0,
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
    </div>
  )
}
