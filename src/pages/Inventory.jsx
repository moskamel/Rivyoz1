import { useState } from 'react'
import { AlertTriangle, Package, TrendingDown, ShoppingCart, Download, Check, X, Edit3 } from 'lucide-react'
import Layout from '../components/layout/Layout'

const initialItems = [
  { id: 1, name: 'دقيق', unit: 'كجم', qty: 45, min: 20, lastUpdated: 'اليوم' },
  { id: 2, name: 'زيت طهي', unit: 'لتر', qty: 8, min: 10, lastUpdated: 'أمس' },
  { id: 3, name: 'دجاج طازج', unit: 'كجم', qty: 12, min: 15, lastUpdated: 'اليوم' },
  { id: 4, name: 'لحم بقري', unit: 'كجم', qty: 7, min: 10, lastUpdated: 'أمس' },
  { id: 5, name: 'طماطم', unit: 'كجم', qty: 20, min: 10, lastUpdated: 'اليوم' },
  { id: 6, name: 'بصل', unit: 'كجم', qty: 30, min: 10, lastUpdated: 'منذ يومين' },
  { id: 7, name: 'أرز', unit: 'كجم', qty: 3, min: 15, lastUpdated: 'منذ 3 أيام' },
  { id: 8, name: 'زبدة', unit: 'علبة', qty: 6, min: 5, lastUpdated: 'أمس' },
  { id: 9, name: 'ملح وبهارات', unit: 'كجم', qty: 15, min: 5, lastUpdated: 'منذ أسبوع' },
  { id: 10, name: 'مياه معدنية', unit: 'كرتون', qty: 4, min: 8, lastUpdated: 'اليوم' },
]

function getStatus(qty, min) {
  if (qty === 0) return { label: 'نفد', class: 'bg-red-100 text-red-700' }
  if (qty < min) return { label: 'منخفض', class: 'bg-orange-100 text-orange-700' }
  return { label: 'متوفر', class: 'bg-green-100 text-green-700' }
}

function getLowItems(items) {
  return items.filter(i => i.qty < i.min)
}

export default function Inventory() {
  const [items, setItems] = useState(initialItems)
  const [editingId, setEditingId] = useState(null)
  const [editQty, setEditQty] = useState('')

  const lowItems = getLowItems(items)
  const totalValue = items.reduce((sum, i) => sum + i.qty * 10, 0) // mock value calculation
  const outOfStock = items.filter(i => i.qty === 0).length

  function startEdit(item) {
    setEditingId(item.id)
    setEditQty(String(item.qty))
  }

  function saveEdit(id) {
    const newQty = parseInt(editQty)
    if (!isNaN(newQty) && newQty >= 0) {
      setItems(prev => prev.map(i => i.id === id ? { ...i, qty: newQty, lastUpdated: 'الآن' } : i))
    }
    setEditingId(null)
    setEditQty('')
  }

  function cancelEdit() {
    setEditingId(null)
    setEditQty('')
  }

  return (
    <Layout title="المخزون">
      {/* Low stock alert */}
      {lowItems.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-5 flex items-center gap-3">
          <AlertTriangle size={20} className="text-red-500 flex-shrink-0" />
          <p className="font-bold text-red-700">
            {lowItems.length} {lowItems.length === 1 ? 'صنف على وشك النفاد' : 'أصناف على وشك النفاد'} —{' '}
            <span className="font-normal">{lowItems.map(i => i.name).join('، ')}</span>
          </p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'إجمالي الأصناف', value: items.length, icon: Package, color: 'bg-orange-100 text-orange-600' },
          { label: 'قيمة المخزون (تقريبي)', value: `${totalValue.toLocaleString('ar-EG')} ج`, icon: ShoppingCart, color: 'bg-blue-100 text-blue-600' },
          { label: 'أصناف منخفضة', value: lowItems.length, icon: TrendingDown, color: 'bg-red-100 text-red-600' },
          { label: 'طلبات اليوم', value: 3, icon: ShoppingCart, color: 'bg-green-100 text-green-600' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
              <s.icon size={20} />
            </div>
            <p className="text-2xl font-black text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <p className="font-bold text-gray-900">قائمة المخزون</p>
          <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-bold transition-colors">
            <Download size={15} />
            تصدير
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                {['الصنف', 'الوحدة', 'الكمية الحالية', 'الحد الأدنى', 'الحالة', 'آخر تحديث', 'الإجراءات'].map(h => (
                  <th key={h} className="text-right px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map(item => {
                const status = getStatus(item.qty, item.min)
                const isEditing = editingId === item.id
                const isLow = item.qty < item.min

                return (
                  <tr key={item.id} className={`transition-colors ${isLow ? 'bg-red-50/30 hover:bg-red-50/50' : 'hover:bg-gray-50/50'}`}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        {isLow && <AlertTriangle size={14} className="text-orange-500 flex-shrink-0" />}
                        <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-600">{item.unit}</td>
                    <td className="px-5 py-3.5">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editQty}
                          onChange={e => setEditQty(e.target.value)}
                          className="w-20 px-2 py-1 border border-orange-400 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                          autoFocus
                          min="0"
                        />
                      ) : (
                        <p className={`font-bold text-sm ${item.qty < item.min ? 'text-red-600' : 'text-gray-900'}`}>
                          {item.qty}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-500">{item.min}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${status.class}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-400">{item.lastUpdated}</td>
                    <td className="px-5 py-3.5">
                      {isEditing ? (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => saveEdit(item.id)}
                            className="p-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                          >
                            <Check size={13} />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="p-1.5 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors"
                          >
                            <X size={13} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => startEdit(item)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg text-xs font-bold hover:bg-orange-100 transition-colors"
                        >
                          <Edit3 size={13} />
                          تحديث الكمية
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}
