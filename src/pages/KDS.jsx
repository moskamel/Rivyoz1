import { useState, useEffect } from 'react'
import { Monitor, ChefHat } from 'lucide-react'
import { mockOrders } from '../lib/mock'

// Generate a fake createdAt timestamp based on the time string in mock data
function parseFakeCreatedAt(timeStr) {
  const now = Date.now()
  const match = timeStr.match(/(\d+)/)
  if (!match) return now - 60000
  const n = parseInt(match[1])
  if (timeStr.includes('ساعة')) return now - n * 60 * 60 * 1000
  if (timeStr.includes('دقيقة') || timeStr.includes('دقيقتين')) return now - n * 60 * 1000
  return now - 2 * 60 * 1000
}

function useTimer(createdAt) {
  const [elapsed, setElapsed] = useState(Math.floor((Date.now() - createdAt) / 1000))
  useEffect(() => {
    const id = setInterval(() => setElapsed(Math.floor((Date.now() - createdAt) / 1000)), 1000)
    return () => clearInterval(id)
  }, [createdAt])
  return elapsed
}

function formatElapsed(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

const categoryFilters = ['الكل', 'مشويات', 'مشروبات', 'حلويات']

function OrderCard({ order, onAction }) {
  const createdAt = parseFakeCreatedAt(order.time)
  const elapsed = useTimer(createdAt)
  const isOverdue = elapsed > 600
  const isNew = order.status === 'new'

  let borderClass = isNew
    ? 'border-red-500'
    : 'border-blue-500'

  if (isOverdue) borderClass = 'border-orange-400 animate-pulse'

  return (
    <div className={`bg-gray-800 rounded-2xl border-2 ${borderClass} flex flex-col overflow-hidden`}>
      {/* Header */}
      <div className="flex items-start justify-between p-4 pb-3">
        <div>
          <p className="text-gray-400 text-xs font-medium">{order.table}</p>
          <p className={`text-sm font-bold mt-0.5 ${isNew ? 'text-red-400' : 'text-blue-400'}`}>
            {isNew ? '🔴 جديد' : '🔵 جاري التحضير'}
          </p>
        </div>
        <div className="text-left">
          <p className="text-2xl font-black text-white">#{order.id}</p>
          <p className={`text-xs font-mono font-bold text-left ${isOverdue ? 'text-orange-400' : 'text-gray-400'}`}>
            {formatElapsed(elapsed)}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-700 mx-4" />

      {/* Items */}
      <div className="flex-1 p-4 space-y-2">
        {order.details.map((item, i) => (
          <div key={i} className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <p className="text-white text-sm font-semibold">{item.name}</p>
              {item.note && (
                <p className="text-xs mt-0.5 bg-yellow-400/20 text-yellow-300 px-2 py-0.5 rounded-lg inline-block">
                  ملاحظة: {item.note}
                </p>
              )}
            </div>
            <span className="text-gray-300 font-black text-base bg-gray-700 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
              {item.qty}
            </span>
          </div>
        ))}
      </div>

      {/* Action button */}
      <div className="p-4 pt-0">
        <button
          onClick={() => onAction(order.id, isNew ? 'preparing' : 'ready')}
          className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
            isNew
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isNew ? 'بدأ التحضير' : 'جاهز ✓'}
        </button>
      </div>
    </div>
  )
}

export default function KDS() {
  const [activeFilter, setActiveFilter] = useState('الكل')
  const [orders, setOrders] = useState(
    mockOrders
      .filter(o => o.status === 'new' || o.status === 'preparing')
      .map(o => ({ ...o }))
  )
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  function handleAction(orderId, newStatus) {
    if (newStatus === 'ready') {
      setOrders(prev => prev.filter(o => o.id !== orderId))
    } else {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
    }
  }

  const filteredOrders = orders.filter(order => {
    if (activeFilter === 'الكل') return true
    const catMap = {
      'مشويات': ['كفتة', 'فراخ', 'لحم', 'شاورما'],
      'مشروبات': ['عصير', 'مياه', 'كولا'],
      'حلويات': ['حلو', 'أم علي', 'بسبوسة'],
    }
    const keywords = catMap[activeFilter] || []
    return keywords.some(kw => order.items.includes(kw))
  })

  const timeStr = time.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

  return (
    <div className="min-h-screen bg-gray-900 text-white" dir="rtl" style={{ fontFamily: "'Cairo', sans-serif" }}>
      {/* Title bar */}
      <div className="bg-gray-950 border-b border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center">
            <ChefHat size={20} />
          </div>
          <div>
            <p className="font-black text-lg leading-tight">شاشة المطبخ</p>
            <p className="text-gray-400 text-xs">{filteredOrders.length} طلبات نشطة</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Filter tabs */}
          <div className="flex items-center gap-1 bg-gray-800 rounded-xl p-1">
            {categoryFilters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                  activeFilter === f
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Clock */}
          <div className="text-left">
            <p className="text-2xl font-mono font-black text-orange-400">{timeStr}</p>
          </div>
        </div>
      </div>

      {/* Orders grid */}
      <div className="p-6">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-600">
            <Monitor size={64} className="mb-4 opacity-30" />
            <p className="text-xl font-bold">لا توجد طلبات نشطة</p>
            <p className="text-sm mt-1">ستظهر الطلبات الجديدة هنا تلقائياً</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOrders.map(order => (
              <OrderCard key={order.id} order={order} onAction={handleAction} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
