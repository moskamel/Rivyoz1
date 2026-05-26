import { useState } from 'react'
import { Search, Users, TrendingUp, ShoppingBag, Star, X, MessageCircle, Eye, Send } from 'lucide-react'
import Layout from '../components/layout/Layout'

const mockCustomers = [
  { id: 1, name: 'أحمد محمد السيد', phone: '01012345678', orders: 24, spent: 3240, lastOrder: 'أمس', level: 'expert', joinDate: '15 يناير 2024', points: 324, avgOrder: 135, recentOrders: [{ id: 42, items: 'كفتة + عصير', total: 135, date: 'أمس' }, { id: 38, items: 'لحم مشوي', total: 110, date: '3 أيام' }, { id: 30, items: 'وجبة عائلية', total: 280, date: 'أسبوع' }] },
  { id: 2, name: 'فاطمة حسن إبراهيم', phone: '01098765432', orders: 12, spent: 1580, lastOrder: 'منذ يومين', level: 'trusted', joinDate: '3 مارس 2024', points: 158, avgOrder: 132, recentOrders: [{ id: 40, items: 'بيتزا مارغريتا', total: 90, date: 'يومين' }, { id: 35, items: 'سلطة + مشروب', total: 65, date: 'أسبوع' }, { id: 29, items: 'فراخ مشوية', total: 140, date: '2 أسبوع' }] },
  { id: 3, name: 'محمد علي كريم', phone: '01155443322', orders: 6, spent: 720, lastOrder: 'منذ أسبوع', level: 'contributor', joinDate: '10 أبريل 2024', points: 72, avgOrder: 120, recentOrders: [{ id: 39, items: 'شاورما دجاج', total: 55, date: 'أسبوع' }, { id: 31, items: 'عصير + سلطة', total: 65, date: '2 أسبوع' }, { id: 22, items: 'كفتة', total: 85, date: 'شهر' }] },
  { id: 4, name: 'سارة أحمد مصطفى', phone: '01234567890', orders: 2, spent: 180, lastOrder: 'منذ 3 أيام', level: 'beginner', joinDate: '20 مايو 2024', points: 18, avgOrder: 90, recentOrders: [{ id: 41, items: 'فراخ × 2', total: 140, date: '3 أيام' }, { id: 37, items: 'مشروب', total: 40, date: 'أسبوع' }, { id: 28, items: 'سلطة', total: 35, date: '3 أسابيع' }] },
  { id: 5, name: 'خالد محمود عبد الله', phone: '01567891234', orders: 18, spent: 2760, lastOrder: 'اليوم', level: 'expert', joinDate: '5 فبراير 2024', points: 276, avgOrder: 153, recentOrders: [{ id: 43, items: 'وجبة عائلية', total: 280, date: 'اليوم' }, { id: 36, items: 'مشويات مشكلة', total: 310, date: '4 أيام' }, { id: 25, items: 'كفتة + فراخ', total: 155, date: 'أسبوع' }] },
  { id: 6, name: 'منى عبد الرحمن', phone: '01099887766', orders: 9, spent: 1050, lastOrder: 'منذ 5 أيام', level: 'trusted', joinDate: '12 مارس 2024', points: 105, avgOrder: 117, recentOrders: [{ id: 38, items: 'سلطة + مشروب', total: 65, date: '5 أيام' }, { id: 32, items: 'شاورما', total: 110, date: 'أسبوعين' }, { id: 20, items: 'فراخ مشوية', total: 70, date: 'شهر' }] },
  { id: 7, name: 'عمر حسين علي', phone: '01011223344', orders: 3, spent: 295, lastOrder: 'منذ أسبوعين', level: 'beginner', joinDate: '1 مايو 2024', points: 30, avgOrder: 98, recentOrders: [{ id: 35, items: 'بيتزا صغيرة', total: 70, date: 'أسبوعين' }, { id: 27, items: 'عصائر', total: 75, date: 'شهر' }, { id: 15, items: 'كفتة', total: 85, date: 'شهرين' }] },
  { id: 8, name: 'نورهان سامي فوزي', phone: '01055667788', orders: 15, spent: 1980, lastOrder: 'منذ يومين', level: 'trusted', joinDate: '28 يناير 2024', points: 198, avgOrder: 132, recentOrders: [{ id: 40, items: 'وجبة عائلية', total: 280, date: 'يومين' }, { id: 33, items: 'مشويات', total: 220, date: 'أسبوع' }, { id: 21, items: 'سلطات + مشروبات', total: 120, date: '3 أسابيع' }] },
]

const levelConfig = {
  beginner: { label: 'مبتدئ', class: 'bg-gray-100 text-gray-600' },
  contributor: { label: 'مساهم', class: 'bg-blue-100 text-blue-700' },
  trusted: { label: 'موثوق', class: 'bg-green-100 text-green-700' },
  expert: { label: 'خبير', class: 'bg-amber-100 text-amber-700' },
}

function CustomerDrawer({ customer, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex" dir="rtl">
      <div className="flex-1 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="w-96 bg-white shadow-2xl flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 font-black text-lg">
              {customer.name[0]}
            </div>
            <div>
              <p className="font-bold text-gray-900">{customer.name}</p>
              <p className="text-sm text-gray-500">{customer.phone}</p>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${levelConfig[customer.level].class}`}>
                {levelConfig[customer.level].label}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl text-gray-400">
            <X size={18} />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 p-5">
          {[
            { label: 'إجمالي الطلبات', value: customer.orders },
            { label: 'إجمالي الإنفاق', value: `${customer.spent} ج` },
            { label: 'متوسط الطلب', value: `${customer.avgOrder} ج` },
            { label: 'النقاط المكتسبة', value: customer.points },
          ].map((s, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-3">
              <p className="text-xl font-black text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Last 3 orders */}
        <div className="px-5 pb-5">
          <p className="font-bold text-gray-900 mb-3 text-sm">آخر الطلبات</p>
          <div className="space-y-2">
            {customer.recentOrders.map((order, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 px-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-sm font-semibold text-gray-800">#{order.id} · {order.items}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{order.date}</p>
                </div>
                <p className="font-bold text-gray-900 text-sm">{order.total} ج</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="p-5 border-t border-gray-100 mt-auto space-y-2">
          <button className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all">
            <Send size={16} />
            إرسال كوبون
          </button>
          <button className="w-full py-3 bg-green-50 text-green-700 hover:bg-green-100 font-bold rounded-xl flex items-center justify-center gap-2 transition-all">
            <MessageCircle size={16} />
            رسالة واتساب
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Customers() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = mockCustomers.filter(c =>
    c.name.includes(search) || c.phone.includes(search)
  )

  return (
    <Layout title="زبائني">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'إجمالي الزبائن', value: '234', icon: Users, color: 'bg-orange-100 text-orange-600' },
          { label: 'زبائن جدد هذا الشهر', value: '45', icon: TrendingUp, color: 'bg-green-100 text-green-600' },
          { label: 'متوسط الطلبات', value: '3.2', icon: ShoppingBag, color: 'bg-blue-100 text-blue-600' },
          { label: 'أعلى قيمة عميل', value: '580 ج', icon: Star, color: 'bg-amber-100 text-amber-600' },
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

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="ابحث بالاسم أو رقم الهاتف..."
              className="w-full pr-9 pl-4 py-2.5 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 border border-transparent"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                {['الاسم', 'الهاتف', 'عدد الطلبات', 'إجمالي الإنفاق', 'آخر طلب', 'المستوى', 'الإجراءات'].map(h => (
                  <th key={h} className="text-right px-5 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 font-black text-sm flex-shrink-0">
                        {c.name[0]}
                      </div>
                      <p className="font-semibold text-gray-900 text-sm">{c.name}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-600 font-mono">{c.phone}</td>
                  <td className="px-5 py-3.5 text-sm font-bold text-gray-900">{c.orders}</td>
                  <td className="px-5 py-3.5 text-sm font-bold text-gray-900">{c.spent.toLocaleString('ar-EG')} ج</td>
                  <td className="px-5 py-3.5 text-sm text-gray-500">{c.lastOrder}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${levelConfig[c.level].class}`}>
                      {levelConfig[c.level].label}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelected(c)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-600 rounded-lg text-xs font-bold hover:bg-orange-100 transition-colors"
                      >
                        <Eye size={13} />
                        عرض
                      </button>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-bold hover:bg-green-100 transition-colors">
                        <MessageCircle size={13} />
                        واتساب
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && <CustomerDrawer customer={selected} onClose={() => setSelected(null)} />}
    </Layout>
  )
}
