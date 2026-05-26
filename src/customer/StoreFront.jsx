import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingCart, Menu, X, Search, Star } from 'lucide-react'
import { getConfig, getMenuItems, getCategories } from '../lib/restaurantStore'
import { useCart } from './CartContext'

const mockNearbyRestaurants = [
  { id: 1, name: 'بيتزا بلازا', category: 'بيتزا', rating: 4.7, deliveryTime: 25, color: '#ef4444', slug: 'pizza-plaza' },
  { id: 2, name: 'كافيه ميترو', category: 'كافيه', rating: 4.5, deliveryTime: 20, color: '#8b5cf6', slug: 'metro-cafe' },
  { id: 3, name: 'شاورما كينج', category: 'مشويات', rating: 4.8, deliveryTime: 30, color: '#f59e0b', slug: 'shawarma-king' },
  { id: 4, name: 'سوشي هاوس', category: 'سوشي', rating: 4.6, deliveryTime: 40, color: '#10b981', slug: 'sushi-house' },
  { id: 5, name: 'برجر فاكتوري', category: 'مشويات', rating: 4.4, deliveryTime: 35, color: '#f97316', slug: 'burger-factory' },
]

const categoryFilters = ['الكل', 'مشويات', 'بيتزا', 'كافيه']

export default function StoreFront() {
  const navigate = useNavigate()
  const config = getConfig()
  const menuItems = getMenuItems()
  const categories = getCategories()
  const { cartItems, addItem, itemCount, total } = useCart()

  const [selectedItem, setSelectedItem] = useState(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [qty, setQty] = useState(1)
  const [note, setNote] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('الكل')
  const [activeTab, setActiveTab] = useState(categories[0]?.id)

  const sectionRefs = useRef({})

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
    addItem({
      itemId: selectedItem.id,
      name: selectedItem.name,
      price: selectedItem.price,
      qty,
      note,
    })
    closeSheet()
  }

  const scrollToSection = (catId) => {
    setActiveTab(catId)
    const el = sectionRefs.current[catId]
    if (el) {
      const offset = 110
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const filteredNearby = activeCategoryFilter === 'الكل'
    ? mockNearbyRestaurants
    : mockNearbyRestaurants.filter(r => r.category === activeCategoryFilter)

  const filteredNearbyBySearch = searchQuery
    ? filteredNearby.filter(r => r.name.includes(searchQuery))
    : filteredNearby

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40">
        <div className="text-white px-4 py-3 flex items-center justify-between" style={{ background: config.color }}>
          {/* Right: logo + name + status */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg flex-shrink-0">
              {config.name.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-sm leading-tight">{config.name}</p>
              <p className="text-xs opacity-90">
                {config.isOpen
                  ? <span>● مفتوح · يغلق {config.closesAt}</span>
                  : <span>● مغلق · يفتح {config.opensAt}</span>
                }
              </p>
            </div>
          </div>
          {/* Left: actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-sm font-medium opacity-90 hover:opacity-100 hidden sm:block"
            >
              اكتشف مطاعم
            </button>
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl hover:bg-white/10"
            >
              <Menu size={20} />
            </button>
            <button
              onClick={() => navigate('/cart')}
              className="p-2 rounded-xl hover:bg-white/10 relative"
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -left-1 bg-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center" style={{ color: config.color }}>
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Closed warning */}
        {!config.isOpen && (
          <div className="bg-orange-100 text-orange-800 text-sm font-medium text-center py-2 px-4">
            المطعم مغلق حالياً — يفتح الساعة {config.opensAt} ظهر
          </div>
        )}

        {/* Category Tabs */}
        <div className="bg-white border-b border-gray-100 px-2 flex overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => scrollToSection(cat.id)}
              className="flex-shrink-0 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap"
              style={activeTab === cat.id
                ? { color: config.color, borderBottom: `2px solid ${config.color}` }
                : { color: '#6b7280', borderBottom: '2px solid transparent' }
              }
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Banner */}
      <div className="relative overflow-hidden" style={{ height: 180 }}>
        {config.bannerUrl ? (
          <img src={config.bannerUrl} alt="banner" className="w-full h-full object-cover" />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${config.color}, ${config.color}cc)` }}
          >
            <p className="text-white font-bold text-2xl">{config.name}</p>
            <p className="text-white/80 text-sm mt-1">{config.description}</p>
            <p className="text-white/60 text-xs mt-1">📍 {config.address}</p>
          </div>
        )}
      </div>

      {/* Menu Sections */}
      <div className="max-w-lg mx-auto px-3 pb-32 mt-4 space-y-6">
        {categories.map(cat => {
          const catItems = menuItems.filter(i => i.categoryId === cat.id)
          if (catItems.length === 0) return null
          return (
            <div key={cat.id} ref={el => sectionRefs.current[cat.id] = el}>
              <h2 className="font-bold text-gray-800 text-base mb-3 px-1">{cat.name}</h2>
              <div className="grid grid-cols-2 gap-3">
                {catItems.map(item => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm relative"
                    onClick={() => openItem(item)}
                  >
                    {/* Image / placeholder */}
                    <div
                      className="w-full h-28 flex items-center justify-center text-3xl relative"
                      style={{ background: `${config.color}22` }}
                    >
                      {item.image
                        ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        : <span>🍽️</span>
                      }
                      {item.bestseller && (
                        <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-lg">
                          🔥 الأكثر طلباً
                        </span>
                      )}
                      {!item.active && (
                        <div className="absolute inset-0 bg-gray-200/80 flex items-center justify-center">
                          <span className="text-gray-500 text-xs font-semibold">غير متاح</span>
                        </div>
                      )}
                    </div>
                    <div className="p-2.5">
                      <p className="font-bold text-gray-800 text-sm leading-tight">{item.name}</p>
                      {item.description && (
                        <p className="text-xs text-gray-400 mt-0.5 truncate">{item.description}</p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-sm" style={{ color: config.color }}>{item.price} ج</span>
                      </div>
                      <button
                        disabled={!item.active}
                        className="w-full mt-2 py-1.5 text-white text-sm font-semibold rounded-xl disabled:opacity-40 transition-opacity"
                        style={{ background: config.color }}
                        onClick={(e) => { e.stopPropagation(); openItem(item) }}
                      >
                        أضف +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Floating Cart Button */}
      {itemCount > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 px-4 w-full max-w-lg">
          <button
            onClick={() => navigate('/cart')}
            className="w-full py-3.5 rounded-2xl text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
            style={{ background: config.color }}
          >
            <ShoppingCart size={18} />
            عرض السلة · {itemCount} أصناف · {total} ج
          </button>
        </div>
      )}

      {/* Item Detail Bottom Sheet */}
      {selectedItem && (
        <>
          <div
            className={`fixed inset-0 bg-black/50 z-50 transition-opacity ${sheetOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={closeSheet}
          />
          <div
            className={`fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl max-w-lg mx-auto transition-transform duration-300 ${sheetOpen ? 'translate-y-0' : 'translate-y-full'}`}
          >
            {/* Swipe indicator */}
            <div className="flex justify-center pt-3 pb-1 cursor-pointer" onClick={closeSheet}>
              <div className="w-10 h-1 bg-gray-200 rounded-full" />
            </div>
            <div className="px-5 pb-8 pt-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{selectedItem.name}</h3>
                  {selectedItem.description && (
                    <p className="text-sm text-gray-500 mt-1">{selectedItem.description}</p>
                  )}
                  <p className="font-bold text-lg mt-2" style={{ color: config.color }}>{selectedItem.price} ج</p>
                </div>
                <button onClick={closeSheet} className="p-2 rounded-xl hover:bg-gray-100 flex-shrink-0">
                  <X size={18} />
                </button>
              </div>

              {/* Qty stepper */}
              <div className="flex items-center justify-center gap-5 my-5">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center font-bold text-lg hover:border-gray-400"
                >
                  −
                </button>
                <span className="font-bold text-xl w-8 text-center">{qty}</span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg text-white"
                  style={{ background: config.color }}
                >
                  +
                </button>
              </div>

              {/* Note */}
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="ملاحظات... (اختياري)"
                rows={2}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400 resize-none mb-4"
              />

              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 rounded-xl text-white font-bold text-sm"
                style={{ background: config.color }}
              >
                أضف للسلة · {selectedItem.price * qty} ج
              </button>
            </div>
          </div>
        </>
      )}

      {/* Marketplace Sidebar (left side) */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed top-0 left-0 bottom-0 z-50 bg-white w-80 shadow-2xl flex flex-col" dir="rtl">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900 text-base">المطاعم القريبة</h2>
              <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-xl hover:bg-gray-100">
                <X size={18} />
              </button>
            </div>

            {/* Search */}
            <div className="p-3 border-b border-gray-50">
              <div className="relative">
                <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="ابحث عن مطعم..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pr-9 pl-3 py-2.5 bg-gray-50 rounded-xl text-sm outline-none"
                />
              </div>
            </div>

            {/* Category chips */}
            <div className="px-3 py-2 flex gap-2 overflow-x-auto no-scrollbar border-b border-gray-50">
              {categoryFilters.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveCategoryFilter(f)}
                  className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                  style={activeCategoryFilter === f
                    ? { background: config.color, color: 'white' }
                    : { background: '#f3f4f6', color: '#6b7280' }
                  }
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Restaurant list */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {filteredNearbyBySearch.map(r => (
                <div
                  key={r.id}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer relative"
                  onClick={() => { setSidebarOpen(false); navigate(`/${r.slug}`) }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0"
                    style={{ background: r.color }}
                  >
                    {r.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-800">{r.name}</p>
                    <p className="text-xs text-gray-400">{r.category} · {r.deliveryTime} دقيقة</p>
                    <p className="text-xs text-yellow-500 font-semibold">⭐ {r.rating}</p>
                  </div>
                  {r.slug === config.slug && (
                    <span
                      className="text-white text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ background: config.color }}
                    >
                      أنت هنا
                    </span>
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
