import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, ClipboardList, UtensilsCrossed,
  Megaphone, BarChart3, Settings, ExternalLink, ChefHat
} from 'lucide-react'

const nav = [
  { to: '/', label: 'الرئيسية', icon: LayoutDashboard, exact: true },
  { to: '/orders', label: 'الطلبات', icon: ClipboardList, badge: 3 },
  { to: '/menu', label: 'القائمة', icon: UtensilsCrossed },
  { to: '/marketing', label: 'التسويق', icon: Megaphone },
  { to: '/reports', label: 'التقارير', icon: BarChart3 },
  { to: '/settings', label: 'الإعدادات', icon: Settings },
]

export default function Sidebar() {
  return (
    <aside className="w-60 bg-white border-l border-gray-100 flex flex-col min-h-screen fixed right-0 top-0 z-30 shadow-sm">
      {/* Logo */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center">
            <ChefHat size={20} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm leading-tight">مطعم الشيف أحمد</p>
            <p className="text-xs text-green-600 font-medium">● مفتوح الآن</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {nav.map(({ to, label, icon: Icon, badge, exact }) => (
          <NavLink
            key={to}
            to={to}
            end={exact}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative
              ${isActive
                ? 'bg-orange-50 text-orange-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`
            }
          >
            <Icon size={18} />
            <span>{label}</span>
            {badge > 0 && (
              <span className="mr-auto bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Preview link */}
      <div className="p-3 border-t border-gray-100">
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all"
        >
          <ExternalLink size={18} />
          <span>معاينة موقعي</span>
        </a>
      </div>
    </aside>
  )
}
