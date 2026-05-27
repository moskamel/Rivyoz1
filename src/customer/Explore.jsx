import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Star, Clock, ChevronLeft } from 'lucide-react'

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

  const filtered = mockRestaurants.filter(r => {
    const matchesSearch = !search || r.name.includes(search) || r.category.includes(search)
    const matchesFilter = activeFilter === 'الكل' || r.category === activeFilter
    return matchesSearch && matchesFilter
  })

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB' }} dir="rtl">
      {/* Sticky header */}
      <div style={{ background: 'white', borderBottom: '1px solid #F3F4F6', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 520, margin: '0 auto', padding: '16px 16px 0' }}>
          {/* Title */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #F97316, #EA580C)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                🍽️
              </div>
              <div>
                <h1 style={{ fontSize: 17, fontWeight: 900, color: '#111827', letterSpacing: '-0.02em' }}>اكتشف مطاعمنا</h1>
                <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 1 }}>{mockRestaurants.filter(r => r.isOpen).length} مطعم مفتوح الآن</p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div style={{
            position: 'relative', marginBottom: 12,
            borderRadius: 14, border: `1.5px solid ${searchFocused ? '#F97316' : '#E5E7EB'}`,
            background: searchFocused ? 'white' : '#F9FAFB',
            boxShadow: searchFocused ? '0 0 0 3px rgba(249,115,22,0.12)' : 'none',
            transition: 'all 0.2s',
          }}>
            <Search size={16} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: searchFocused ? '#F97316' : '#9CA3AF', transition: 'color 0.2s' }} />
            <input
              type="text"
              placeholder="ابحث عن مطعم أو أكلة..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              style={{
                width: '100%', padding: '12px 44px 12px 16px', border: 'none', outline: 'none', background: 'transparent',
                fontSize: 13, color: '#374151', fontFamily: 'Cairo, sans-serif', boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Category pills */}
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 12 }}>
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
                  transition: 'all 0.15s',
                }}
              >
                <span style={{ fontSize: 15 }}>{f.icon}</span>
                {f.key}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 520, margin: '0 auto', padding: '16px 16px 32px' }}>

        {/* Featured section — show only when no search/filter */}
        {!search && activeFilter === 'الكل' && (
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 13, fontWeight: 800, color: '#111827', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              🔥 الأكثر طلباً
            </p>
            <div style={{ display: 'flex', gap: 10, overflowX: 'auto' }}>
              {featured.map(r => (
                <div
                  key={r.id}
                  onClick={() => navigate(`/${r.slug}`)}
                  style={{
                    flexShrink: 0, width: 148, borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
                    background: 'white', border: '1px solid #F3F4F6',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)' }}
                >
                  <div style={{ height: 72, background: `linear-gradient(135deg, ${r.color}, ${r.color}cc)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>
                    {r.emoji}
                  </div>
                  <div style={{ padding: '10px 10px 12px' }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: '#111827', marginBottom: 4 }}>{r.name}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Star size={11} color="#F59E0B" fill="#F59E0B" />
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#111827', fontFamily: 'Inter' }}>{r.rating}</span>
                      <span style={{ fontSize: 10, color: '#9CA3AF', fontFamily: 'Inter' }}>({r.reviews})</span>
                    </div>
                    <p style={{ fontSize: 10, color: '#9CA3AF', marginTop: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Clock size={9} />
                      {r.deliveryTime} دقيقة
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All restaurants */}
        <div style={{ marginBottom: 8 }}>
          <p style={{ fontSize: 13, fontWeight: 800, color: '#111827', marginBottom: 12 }}>
            {search ? `نتائج البحث (${filtered.length})` : activeFilter !== 'الكل' ? activeFilter : 'جميع المطاعم'}
          </p>
        </div>

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
                onClick={() => r.isOpen && navigate(`/${r.slug}`)}
                style={{
                  background: 'white', borderRadius: 18, padding: 16, display: 'flex', alignItems: 'center', gap: 14,
                  cursor: r.isOpen ? 'pointer' : 'default', border: '1px solid #F3F4F6',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)',
                  opacity: r.isOpen ? 1 : 0.6, transition: 'transform 0.15s, box-shadow 0.15s',
                }}
                onMouseEnter={e => { if (r.isOpen) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.08)' } }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)' }}
              >
                {/* Avatar */}
                <div style={{
                  width: 58, height: 58, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 28, flexShrink: 0,
                  background: `linear-gradient(135deg, ${r.color}22, ${r.color}44)`,
                  border: `1px solid ${r.color}30`,
                }}>
                  {r.emoji}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3, flexWrap: 'wrap' }}>
                    <p style={{ fontSize: 14, fontWeight: 800, color: '#111827' }}>{r.name}</p>
                    {r.tags.map(tag => (
                      <span key={tag} style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 6, background: `${r.color}18`, color: r.color }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 6 }}>{r.category}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Star size={12} color="#F59E0B" fill="#F59E0B" />
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#111827', fontFamily: 'Inter' }}>{r.rating}</span>
                      <span style={{ fontSize: 11, color: '#9CA3AF', fontFamily: 'Inter' }}>({r.reviews})</span>
                    </div>
                    <span style={{ color: '#D1D5DB', fontSize: 10 }}>·</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Clock size={11} color="#9CA3AF" />
                      <span style={{ fontSize: 11, color: '#6B7280' }}>{r.deliveryTime} دقيقة</span>
                    </div>
                    <span style={{ color: '#D1D5DB', fontSize: 10 }}>·</span>
                    <span style={{ fontSize: 11, color: r.deliveryFee === 0 ? '#16A34A' : '#6B7280', fontWeight: r.deliveryFee === 0 ? 700 : 400 }}>
                      {r.deliveryFee === 0 ? 'توصيل مجاني' : `${r.deliveryFee} ج توصيل`}
                    </span>
                  </div>
                </div>

                {/* Status + arrow */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 8,
                    background: r.isOpen ? '#F0FDF4' : '#F3F4F6',
                    color: r.isOpen ? '#16A34A' : '#6B7280',
                    border: `1px solid ${r.isOpen ? '#BBF7D0' : '#E5E7EB'}`,
                  }}>
                    {r.isOpen ? 'مفتوح' : 'مغلق'}
                  </span>
                  {r.isOpen && <ChevronLeft size={16} color="#D1D5DB" />}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
