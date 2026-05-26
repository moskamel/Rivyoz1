import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'

const mockRestaurants = [
  { id: 1, name: 'مطعم الشيف أحمد', category: 'مشويات', rating: 4.9, deliveryTime: 30, deliveryFee: 15, color: '#f97316', slug: 'chef-ahmed', isOpen: true },
  { id: 2, name: 'بيتزا بلازا', category: 'بيتزا', rating: 4.7, deliveryTime: 25, deliveryFee: 10, color: '#ef4444', slug: 'pizza-plaza', isOpen: true },
  { id: 3, name: 'كافيه ميترو', category: 'كافيه', rating: 4.5, deliveryTime: 20, deliveryFee: 0, color: '#8b5cf6', slug: 'metro-cafe', isOpen: true },
  { id: 4, name: 'شاورما كينج', category: 'مشويات', rating: 4.8, deliveryTime: 30, deliveryFee: 12, color: '#f59e0b', slug: 'shawarma-king', isOpen: false },
  { id: 5, name: 'سوشي هاوس', category: 'سوشي', rating: 4.6, deliveryTime: 40, deliveryFee: 20, color: '#10b981', slug: 'sushi-house', isOpen: true },
  { id: 6, name: 'برجر فاكتوري', category: 'مشويات', rating: 4.4, deliveryTime: 35, deliveryFee: 15, color: '#6366f1', slug: 'burger-factory', isOpen: true },
]

const categoryFilters = ['الكل', 'مشويات', 'بيتزا', 'كافيه', 'سوشي']

export default function Explore() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('الكل')

  const filtered = mockRestaurants.filter(r => {
    const matchesSearch = !search || r.name.includes(search) || r.category.includes(search)
    const matchesFilter = activeFilter === 'الكل' || r.category === activeFilter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🍽️</span>
            <h1 className="font-bold text-gray-900 text-xl">منصتنا</h1>
          </div>
          {/* Search */}
          <div className="relative">
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث عن مطعم أو أكلة..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pr-9 pl-4 py-2.5 bg-gray-50 rounded-xl text-sm outline-none focus:bg-white focus:ring-1 focus:ring-orange-300 border border-gray-100 transition-all"
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto no-scrollbar max-w-lg mx-auto">
          {categoryFilters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
              style={activeFilter === f
                ? { background: '#f97316', color: 'white' }
                : { background: '#f3f4f6', color: '#6b7280' }
              }
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Restaurants list */}
      <div className="max-w-lg mx-auto px-4 py-4 space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-semibold">لم نجد نتائج</p>
            <p className="text-sm mt-1">جرب كلمة بحث مختلفة</p>
          </div>
        )}
        {filtered.map(r => (
          <div
            key={r.id}
            onClick={() => navigate(`/${r.slug}`)}
            className="bg-white rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all active:scale-98"
          >
            {/* Avatar */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
              style={{ background: r.color }}
            >
              {r.name.charAt(0)}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-bold text-gray-900 text-sm">{r.name}</p>
                {r.isOpen
                  ? <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">مفتوح</span>
                  : <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2 py-0.5 rounded-full">مغلق</span>
                }
              </div>
              <p className="text-xs text-gray-400 mt-0.5">{r.category}</p>
              <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                <span>⭐ {r.rating}</span>
                <span>·</span>
                <span>⏱ {r.deliveryTime} دقيقة</span>
                <span>·</span>
                <span>{r.deliveryFee === 0 ? 'توصيل مجاني' : `توصيل ${r.deliveryFee} ج`}</span>
              </div>
            </div>

            {/* Arrow */}
            <div className="text-gray-300 flex-shrink-0 rotate-180">›</div>
          </div>
        ))}
      </div>
    </div>
  )
}
