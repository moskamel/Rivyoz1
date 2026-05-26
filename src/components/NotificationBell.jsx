import { useState, useRef, useEffect } from 'react'
import { Bell, ShoppingBag, XCircle, AlertTriangle, Megaphone, UserPlus } from 'lucide-react'

const mockNotifications = [
  { id: 1, icon: ShoppingBag, iconColor: 'text-orange-500 bg-orange-50', text: 'طلب جديد #43 من طاولة 5', time: 'منذ دقيقة', read: false },
  { id: 2, icon: XCircle, iconColor: 'text-red-500 bg-red-50', text: 'طلب #41 تم إلغاؤه من العميل', time: 'منذ 5 دقائق', read: false },
  { id: 3, icon: AlertTriangle, iconColor: 'text-amber-500 bg-amber-50', text: 'صنف "الدجاج" على وشك النفاد (3 وحدات)', time: 'منذ 15 دقيقة', read: false },
  { id: 4, icon: Megaphone, iconColor: 'text-purple-500 bg-purple-50', text: 'حملة "عروض رمضان" تم إرسالها بنجاح', time: 'منذ ساعة', read: true },
  { id: 5, icon: UserPlus, iconColor: 'text-green-500 bg-green-50', text: 'زبون جديد مسجل: منى محمد', time: 'منذ ساعتين', read: true },
]

export default function NotificationBell() {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState(mockNotifications)
  const ref = useRef(null)

  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function markAllRead() {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-xl hover:bg-gray-50 text-gray-500 transition-colors"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute left-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <p className="font-bold text-gray-900 text-sm">الإشعارات</p>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs text-orange-600 hover:text-orange-700 font-semibold"
              >
                تحديد الكل كمقروء
              </button>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.map(n => {
              const Icon = n.icon
              return (
                <div
                  key={n.id}
                  className={`flex items-start gap-3 px-4 py-3 border-b border-gray-50 transition-colors hover:bg-gray-50 ${!n.read ? 'bg-orange-50/50' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${n.iconColor}`}>
                    <Icon size={15} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800 leading-snug">{n.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                  </div>
                  {!n.read && (
                    <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-1.5" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
