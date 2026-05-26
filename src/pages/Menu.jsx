import { useState } from 'react'
import { Plus, MoreVertical, X, GripVertical, Star } from 'lucide-react'
import Layout from '../components/layout/Layout'
import { getMenuItems, setMenuItems, getCategories } from '../lib/restaurantStore'

export default function Menu() {
  const [categories, setCategories] = useState(getCategories)
  const [items, setItems] = useState(getMenuItems)
  const [activeCategory, setActiveCategory] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [form, setForm] = useState({ name: '', price: '', categoryId: 1, description: '', active: true, bestseller: false })

  const filteredItems = items.filter(i => i.categoryId === activeCategory)

  const toggleActive = (id) => {
    setItems(prev => {
      const next = prev.map(i => i.id === id ? { ...i, active: !i.active } : i)
      setMenuItems(next)
      return next
    })
  }

  const openAdd = () => {
    setForm({ name: '', price: '', categoryId: activeCategory, description: '', active: true, bestseller: false })
    setEditItem(null)
    setShowForm(true)
  }

  const openEdit = (item) => {
    setForm({ name: item.name, price: item.price, categoryId: item.categoryId, description: '', active: item.active, bestseller: item.bestseller })
    setEditItem(item.id)
    setShowForm(true)
  }

  const saveItem = () => {
    if (!form.name || !form.price) return
    if (editItem) {
      setItems(prev => {
        const next = prev.map(i => i.id === editItem ? { ...i, ...form, price: Number(form.price) } : i)
        setMenuItems(next)
        return next
      })
    } else {
      setItems(prev => {
        const newItem = { id: Date.now(), ...form, price: Number(form.price), image: null }
        const next = [...prev, newItem]
        setMenuItems(next)
        return next
      })
    }
    setShowForm(false)
  }

  const deleteItem = (id) => {
    setItems(prev => {
      const next = prev.filter(i => i.id !== id)
      setMenuItems(next)
      return next
    })
  }

  return (
    <Layout title="إدارة القائمة">
      <div className="flex gap-5">
        {/* Categories sidebar */}
        <div className="w-48 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-50 flex items-center justify-between">
              <p className="font-bold text-sm text-gray-700">الأقسام</p>
              <button className="text-orange-500 hover:text-orange-600">
                <Plus size={16} />
              </button>
            </div>
            <div className="divide-y divide-gray-50">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full text-right px-4 py-3 text-sm font-medium flex items-center justify-between transition-colors ${
                    activeCategory === cat.id ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-xs text-gray-400">{items.filter(i => i.categoryId === cat.id).length}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Items list */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-50 flex items-center justify-between">
              <p className="font-bold text-gray-900">{categories.find(c => c.id === activeCategory)?.name}</p>
              <button
                onClick={openAdd}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-semibold"
              >
                <Plus size={16} />
                إضافة أكلة
              </button>
            </div>

            {filteredItems.length === 0 ? (
              <div className="p-12 text-center text-gray-400">
                <p className="font-medium">لا توجد أكلات في هذا القسم</p>
                <button onClick={openAdd} className="mt-3 text-orange-500 text-sm font-semibold hover:underline">إضافة أولى أكلة</button>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {filteredItems.map(item => (
                  <div key={item.id} className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50/50">
                    <GripVertical size={16} className="text-gray-300 cursor-grab flex-shrink-0" />
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">🍽️</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                        {item.bestseller && <Star size={12} className="text-yellow-500 fill-yellow-500" />}
                      </div>
                      <p className="text-sm text-orange-600 font-semibold mt-0.5">{item.price} ج</p>
                    </div>
                    <button
                      onClick={() => toggleActive(item.id)}
                      className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${item.active ? 'bg-green-500' : 'bg-gray-200'}`}
                    >
                      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${item.active ? 'right-1' : 'left-1'}`} />
                    </button>
                    <div className="relative group flex-shrink-0">
                      <button className="p-2 rounded-xl hover:bg-gray-100 text-gray-400">
                        <MoreVertical size={16} />
                      </button>
                      <div className="absolute left-0 top-8 bg-white border border-gray-100 rounded-xl shadow-lg z-10 min-w-[120px] hidden group-hover:block">
                        <button onClick={() => openEdit(item)} className="w-full text-right px-4 py-2 text-sm hover:bg-gray-50">تعديل</button>
                        <button
                          onClick={() => setItems(prev => {
                            const next = [...prev, { ...item, id: Date.now(), name: item.name + ' (نسخة)' }]
                            setMenuItems(next)
                            return next
                          })}
                          className="w-full text-right px-4 py-2 text-sm hover:bg-gray-50"
                        >نسخ</button>
                        <button onClick={() => deleteItem(item.id)} className="w-full text-right px-4 py-2 text-sm text-red-500 hover:bg-red-50">حذف</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Item form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-3xl w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <p className="font-bold text-lg text-gray-900">{editItem ? 'تعديل الأكلة' : 'إضافة أكلة جديدة'}</p>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-xl hover:bg-gray-100"><X size={18} /></button>
            </div>
            <div className="p-5 space-y-4">
              {/* Image upload */}
              <div className="w-20 h-20 bg-gray-100 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors border-2 border-dashed border-gray-300">
                <Plus size={20} className="text-gray-400" />
                <p className="text-xs text-gray-400 mt-1">صورة</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">اسم الأكلة *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400"
                  placeholder="مثال: كفتة مشوية"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">السعر *</label>
                <div className="relative">
                  <input
                    type="number"
                    value={form.price}
                    onChange={e => setForm({ ...form, price: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400"
                    placeholder="85"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">ج</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">الوصف</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400 resize-none"
                  rows={2}
                  placeholder="وصف مختصر..."
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">الأكلة نشطة</span>
                <button
                  onClick={() => setForm({ ...form, active: !form.active })}
                  className={`relative w-11 h-6 rounded-full transition-colors ${form.active ? 'bg-green-500' : 'bg-gray-200'}`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${form.active ? 'right-1' : 'left-1'}`} />
                </button>
              </div>
              <button
                onClick={saveItem}
                disabled={!form.name || !form.price}
                className="w-full py-3 bg-orange-500 text-white rounded-xl font-semibold disabled:opacity-40 hover:bg-orange-600"
              >
                حفظ الأكلة
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
