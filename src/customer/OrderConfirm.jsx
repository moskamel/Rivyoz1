import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getConfig } from '../lib/restaurantStore'

export default function OrderConfirm() {
  const navigate = useNavigate()
  const location = useLocation()
  const config = getConfig()
  const order = location.state?.order

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <p className="text-gray-500 mb-4">لم يتم العثور على الطلب</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-xl text-white font-bold"
            style={{ background: config.color }}
          >
            رجوع
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12" dir="rtl">
      <div className="max-w-sm w-full space-y-6 text-center">
        {/* Animated checkmark */}
        <div
          className="mx-auto w-24 h-24 rounded-full bg-green-100 flex items-center justify-center transition-all duration-500"
          style={{
            transform: visible ? 'scale(1)' : 'scale(0)',
            opacity: visible ? 1 : 0,
          }}
        >
          <svg viewBox="0 0 52 52" className="w-12 h-12" fill="none">
            <circle cx="26" cy="26" r="25" fill="#22c55e" />
            <path
              d="M14 26l8 8 16-16"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: 40,
                strokeDashoffset: visible ? 0 : 40,
                transition: 'stroke-dashoffset 0.6s ease 0.3s',
              }}
            />
          </svg>
        </div>

        <div>
          <h1 className="font-bold text-gray-900 text-2xl">تم استلام طلبك! 🎉</h1>
          <p className="text-gray-500 text-sm mt-2">سيتواصل معك المطعم قريباً</p>
        </div>

        {/* Order details card */}
        <div className="bg-white rounded-2xl p-5 text-right space-y-3 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">رقم الطلب</span>
            <span className="font-bold text-gray-900">#{order.id}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">المطعم</span>
            <span className="font-semibold text-gray-800 text-sm">{config.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">الإجمالي</span>
            <span className="font-bold" style={{ color: config.color }}>{order.total} ج</span>
          </div>
          <div className="flex justify-between items-center border-t border-gray-100 pt-3">
            <span className="text-gray-500 text-sm">الوقت المتوقع</span>
            <span className="font-semibold text-gray-800 text-sm">⏱ {config.deliveryTime} دقيقة</span>
          </div>
        </div>

        {/* Track button */}
        <button
          onClick={() => navigate(`/track/${order.id}`)}
          className="w-full py-3.5 rounded-xl text-white font-bold text-sm"
          style={{ background: config.color }}
        >
          تتبع طلبك
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-xs">بينما تنتظر...</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Discover more */}
        <button
          onClick={() => navigate('/explore')}
          className="w-full py-3 rounded-xl border-2 text-sm font-bold transition-all hover:bg-gray-50"
          style={{ borderColor: config.color, color: config.color }}
        >
          اكتشف مطاعم تانية →
        </button>

        {/* Back to menu */}
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-400 hover:text-gray-600 underline"
        >
          رجوع للقائمة
        </button>
      </div>
    </div>
  )
}
