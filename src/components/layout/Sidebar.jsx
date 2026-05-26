import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, ClipboardList, UtensilsCrossed,
  Megaphone, BarChart3, Settings, ExternalLink, ChefHat,
  Users, UserCheck, Package, Monitor, ChevronDown, Check
} from 'lucide-react'

const nav = [
  { to: '/', label: 'الرئيسية', icon: LayoutDashboard, exact: true },
  { to: '/orders', label: 'الطلبات', icon: ClipboardList, badge: 3 },
  { to: '/menu', label: 'القائمة', icon: UtensilsCrossed },
  { to: '/marketing', label: 'التسويق', icon: Megaphone },
  { to: '/reports', label: 'التقارير', icon: BarChart3 },
  { to: '/settings', label: 'الإعدادات', icon: Settings },
]

const extraNav = [
  { to: '/customers', label: 'زبائني', icon: Users },
  { to: '/staff', label: 'الموظفون', icon: UserCheck },
  { to: '/inventory', label: 'المخزون', icon: Package },
]

const branches = ['الفرع الرئيسي', 'فرع المعادي', 'فرع الشيخ زايد']

export default function Sidebar() {
  const [selectedBranch, setSelectedBranch] = useState(branches[0])
  const [branchOpen, setBranchOpen] = useState(false)

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
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
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

        {/* Divider */}
        <div className="my-2 border-t border-gray-100" />

        {extraNav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
              ${isActive
                ? 'bg-orange-50 text-orange-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}

        {/* KDS link — opens in new tab */}
        <a
          href="/kds"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all"
        >
          <Monitor size={18} />
          <span>شاشة المطبخ</span>
          <ExternalLink size={13} className="mr-auto text-gray-400" />
        </a>
      </nav>

      {/* Branch selector */}
      <div className="p-3 border-t border-gray-100">
        <div className="relative">
          <button
            onClick={() => setBranchOpen(!branchOpen)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-semibold text-gray-700"
          >
            <span>{selectedBranch}</span>
            <ChevronDown
              size={15}
              className={`text-gray-400 transition-transform ${branchOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {branchOpen && (
            <div className="absolute bottom-full mb-1 right-0 left-0 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-10">
              {branches.map(branch => (
                <button
                  key={branch}
                  onClick={() => { setSelectedBranch(branch); setBranchOpen(false) }}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors text-right"
                >
                  <span>{branch}</span>
                  {selectedBranch === branch && <Check size={14} className="text-orange-500" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

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
