import { useState } from 'react'
import { X, ChevronDown } from 'lucide-react'
import Layout from '../components/layout/Layout'
import { mockOrders, statusMap } from '../lib/mock'

const tabs = [
  { key: 'all', label: 'الكل' },
  { key: 'new', label: 'جديد' },
  { key: 'preparing', label: 'تحضير' },
  { key: 'ready', label: 'جاهز' },
  { key: 'delivering', label: 'توصيل' },
  { key: 'done', label: 'مكتمل' },
  { key: 'cancelled', label: 'ملغي' },
]

const nextStatus = {
  new: 'preparing',
  preparing: 'ready',
  ready: 'delivering',
  delivering: 'done',
}

const actionLabel = {
  new: 'قبول الطلب',
  preparing: 'جاهز للاستلام',
  ready: 'تم التوصيل',
  delivering: 'اكتمل',
}

export default function Orders() {
  const [activeTab, setActiveTab] = useState('all')
  const [orders, setOrders] = useState(mockOrders)
  const [selected, setSelected] = useState(null)
  const [rejectModal, setRejectModal] = useState(null)
  const [rejectReason, setRejectReason] = useState('')

  const filtered = activeTab === 'all' ? orders : orders.filter(o => o.status === activeTab)
  const count = (key) => key === 'all' ? orders.length : orders.filter(o => o.status === key).length

  const advance = (id) => {
    setOrders(prev => prev.map(o => o.id === id && nextStatus[o.status] ? { ...o, status: nextStatus[o.status] } : o))
    setSelected(null)
  }

  const reject = (id) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'cancelled' } : o))
    setRejectModal(null)
    setSelected(null)
  }

  return (
    <Layout title="الطلبات">
      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-5 no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === tab.key
                ? 'bg-orange-500 text-white shadow-sm'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
            }`}
          >
            {tab.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
              activeTab === tab.key ? 'bg-white/20' : 'bg-gray-100'
            } ${tab.key === 'new' && count('new') > 0 ? '!bg-red-500 !text-white' : ''}`}>
              {count(tab.key)}
            </span>
          </button>
        ))}
      </div>

      {/* Orders list */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl p-12 border border-gray-100 text-center">
            <p className="text-gray-400 font-medium">لا توجد طلبات</p>
          </div>
        )}
        {filtered.map(order => (
          <div
            key={order.id}
            onClick={() => setSelected(order)}
            className={`bg-white rounded-2xl border p-4 cursor-pointer hover:shadow-md transition-all ${
              order.status === 'new' ? 'border-red-200 shadow-sm pulse-new-order' : 'border-gray-100'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-700">#{order.id}</span>
                <span className="text-gray-400">·</span>
                <span className="text-sm text-gray-600">{order.table}</span>
                <span className="text-gray-400">·</span>
                <span className="text-xs text-gray-400">{order.time}</span>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusMap[order.status].color}`}>
                {statusMap[order.status].label}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700">{order.items}</p>
              <p className="font-bold text-gray-900">{order.total} ج</p>
            </div>
            {order.status === 'new' && (
              <div className="flex gap-2 mt-3">
                <button
                  onClick={(e) => { e.stopPropagation(); setRejectModal(order) }}
                  className="flex-1 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  رفض
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); advance(order.id) }}
                  className="flex-1 py-2 rounded-xl bg-green-500 text-white text-sm font-semibold hover:bg-green-600"
                >
                  قبول الطلب ✓
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Order detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end sm:items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-3xl w-full max-w-md max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <p className="font-bold text-gray-900 text-lg">طلب #{selected.id}</p>
              <button onClick={() => setSelected(null)} className="p-2 rounded-xl hover:bg-gray-100">
                <X size={18} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex gap-4 text-sm text-gray-600">
                <span>👤 {selected.customer}</span>
                <span>📞 {selected.phone}</span>
              </div>
              <div className="flex gap-4 text-sm text-gray-600">
                <span>📍 {selected.table}</span>
                <span>💳 {selected.payment}</span>
              </div>
              <div className="border-t border-gray-100 pt-4 space-y-3">
                {selected.details.map((item, i) => (
                  <div key={i} className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-800">× {item.qty} {item.name}</p>
                      {item.note && <p className="text-xs text-gray-400 mt-0.5">ملاحظة: {item.note}</p>}
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{item.price} ج</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-gray-900">
                <span>الإجمالي</span>
                <span>{selected.total} ج</span>
              </div>
              {nextStatus[selected.status] && (
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setRejectModal(selected)}
                    className="flex-1 py-3 rounded-xl border border-gray-200 font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    رفض الطلب
                  </button>
                  <button
                    onClick={() => advance(selected.id)}
                    className="flex-1 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600"
                  >
                    {actionLabel[selected.status]}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reject modal */}
      {rejectModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setRejectModal(null)}>
          <div className="bg-white rounded-3xl w-full max-w-sm p-6" onClick={e => e.stopPropagation()}>
            <p className="font-bold text-gray-900 text-lg mb-4">سبب الرفض؟</p>
            <div className="space-y-2 mb-4">
              {['الأكلة دي خلصت', 'المطعم مش شغال دلوقتي', 'العنوان بعيد جداً'].map(reason => (
                <button
                  key={reason}
                  onClick={() => setRejectReason(reason)}
                  className={`w-full text-right px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    rejectReason === reason ? 'border-orange-400 bg-orange-50 text-orange-700' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {reason}
                </button>
              ))}
              <input
                type="text"
                placeholder="سبب تاني..."
                value={['الأكلة دي خلصت', 'المطعم مش شغال دلوقتي', 'العنوان بعيد جداً'].includes(rejectReason) ? '' : rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400"
              />
            </div>
            <button
              onClick={() => reject(rejectModal.id)}
              disabled={!rejectReason}
              className="w-full py-3 bg-red-500 text-white rounded-xl font-semibold disabled:opacity-40"
            >
              تأكيد الرفض
            </button>
          </div>
        </div>
      )}
    </Layout>
  )
}
