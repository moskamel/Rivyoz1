import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getConfig, getOrders } from '../lib/restaurantStore'

const steps = [
  { key: 'new', label: 'تم استلام طلبك', icon: '📋' },
  { key: 'preparing', label: 'المطعم بدأ التحضير', icon: '👨‍🍳' },
  { key: 'ready_or_delivering', label: 'طلبك في الطريق / جاهز للاستلام', icon: '🛵' },
  { key: 'done', label: 'تم التسليم', icon: '✅' },
]

const statusToStep = {
  new: 0,
  preparing: 1,
  ready: 2,
  delivering: 2,
  done: 3,
  cancelled: -1,
}

export default function OrderTracking() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const config = getConfig()

  const [order, setOrder] = useState(() => {
    const orders = getOrders()
    return orders.find(o => String(o.id) === String(orderId)) || null
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const orders = getOrders()
      const found = orders.find(o => String(o.id) === String(orderId))
      if (found) setOrder(found)
    }, 5000)
    return () => clearInterval(interval)
  }, [orderId])

  const currentStep = order ? (statusToStep[order.status] ?? 0) : 0

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center p-8">
          <p className="text-gray-500 text-lg mb-4">لم يتم العثور على الطلب</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-xl text-white font-bold"
            style={{ background: config.color }}
          >
            رجوع للرئيسية
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="text-white px-4 py-4 flex items-center gap-3" style={{ background: config.color }}>
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg flex-shrink-0">
          {config.name.charAt(0)}
        </div>
        <div>
          <p className="font-bold text-sm">{config.name}</p>
          <p className="text-xs opacity-80">تتبع طلبك</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-5">
        {/* Order info */}
        <div className="bg-white rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-gray-900 text-lg">طلب #{order.id}</p>
              <p className="text-gray-500 text-sm">{config.name}</p>
            </div>
            {order.status === 'cancelled' ? (
              <span className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1.5 rounded-full">ملغي</span>
            ) : (
              <span className="text-white text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: config.color }}>
                جاري التتبع
              </span>
            )}
          </div>
        </div>

        {/* Status timeline */}
        <div className="bg-white rounded-2xl p-5">
          <p className="font-bold text-gray-800 mb-5">حالة الطلب</p>
          <div className="space-y-0">
            {steps.map((step, idx) => {
              const done = idx <= currentStep
              const active = idx === currentStep
              const isLast = idx === steps.length - 1
              return (
                <div key={step.key} className="flex gap-4">
                  {/* Timeline line + dot */}
                  <div className="flex flex-col items-center">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 border-2 transition-all"
                      style={done
                        ? { background: config.color, borderColor: config.color, color: 'white' }
                        : active
                          ? { background: 'white', borderColor: config.color, color: config.color }
                          : { background: '#f3f4f6', borderColor: '#e5e7eb', color: '#9ca3af' }
                      }
                    >
                      {done ? '✓' : step.icon}
                    </div>
                    {!isLast && (
                      <div
                        className="w-0.5 h-8 transition-all"
                        style={{ background: idx < currentStep ? config.color : '#e5e7eb' }}
                      />
                    )}
                  </div>

                  {/* Step content */}
                  <div className="pb-6 flex-1">
                    <p
                      className="font-semibold text-sm"
                      style={done || active ? { color: '#1f2937' } : { color: '#9ca3af' }}
                    >
                      {step.label}
                    </p>
                    {active && !done && (
                      <p className="text-xs mt-0.5" style={{ color: config.color }}>جاري الآن...</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Order items summary */}
        {order.details && order.details.length > 0 && (
          <div className="bg-white rounded-2xl p-5">
            <p className="font-bold text-gray-800 mb-3">تفاصيل الطلب</p>
            <div className="space-y-2">
              {order.details.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start text-sm">
                  <div>
                    <span className="text-gray-700 font-medium">× {item.qty} {item.name}</span>
                    {item.note && <p className="text-xs text-gray-400 mt-0.5">ملاحظة: {item.note}</p>}
                  </div>
                  <span className="font-semibold text-gray-900">{item.price} ج</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between font-bold text-gray-900">
              <span>الإجمالي</span>
              <span style={{ color: config.color }}>{order.total} ج</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <a
            href={`https://wa.me/${config.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-green-500 text-white font-bold text-sm"
          >
            <span>💬</span>
            تواصل مع المطعم عبر واتساب
          </a>

          <button
            onClick={() => navigate('/explore')}
            className="w-full py-3 rounded-xl border-2 text-sm font-bold hover:bg-gray-50 transition-all"
            style={{ borderColor: config.color, color: config.color }}
          >
            اكتشف مطاعم تانية →
          </button>
        </div>
      </div>
    </div>
  )
}
