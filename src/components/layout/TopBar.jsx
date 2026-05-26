import NotificationBell from '../NotificationBell'

const roleLabels = {
  owner: 'صاحب المطعم',
  manager: 'مدير الفرع',
  cashier: 'كاشير',
  kitchen: 'مطبخ',
}

export default function TopBar({ title }) {
  const role = localStorage.getItem('auth_role') || 'owner'
  const roleLabel = roleLabels[role] || 'صاحب المطعم'

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-20">
      <h1 className="text-lg font-bold text-gray-900">{title}</h1>
      <div className="flex items-center gap-3">
        <NotificationBell />
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-2.5 py-1 bg-orange-100 text-orange-700 rounded-full">
            {roleLabel}
          </span>
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
            أ
          </div>
        </div>
      </div>
    </header>
  )
}
