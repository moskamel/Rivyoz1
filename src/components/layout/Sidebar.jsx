import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, ClipboardList, UtensilsCrossed,
  Megaphone, BarChart3, Settings, ExternalLink,
  Users, UserCheck, Package, Monitor, ChevronDown,
  Check, Zap, ArrowUpRight, Palette
} from 'lucide-react'
import { getConfig } from '../../lib/restaurantStore'

const navMain = [
  { to: '/', label: 'الرئيسية', icon: LayoutDashboard, exact: true },
  { to: '/orders', label: 'الطلبات', icon: ClipboardList, badge: 3 },
  { to: '/menu', label: 'القائمة', icon: UtensilsCrossed },
  { to: '/inventory', label: 'المخزون', icon: Package },
]
const navGrowth = [
  { to: '/customers', label: 'الزبائن', icon: Users },
  { to: '/marketing', label: 'التسويق', icon: Megaphone },
  { to: '/reports', label: 'التقارير', icon: BarChart3 },
]
const navSystem = [
  { to: '/staff', label: 'الموظفون', icon: UserCheck },
  { to: '/design', label: 'تصميم الموقع', icon: Palette },
  { to: '/settings', label: 'الإعدادات', icon: Settings },
]

const branches = ['الفرع الرئيسي', 'فرع المعادي', 'فرع الشيخ زايد']

function NavGroup({ label, items }) {
  return (
    <div className="mb-1">
      <p style={{ color: 'var(--text-3)', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }} className="px-3 py-2">{label}</p>
      {items.map(({ to, label, icon: Icon, badge, exact }) => (
        <NavLink key={to} to={to} end={exact}
          className={({ isActive }) => `flex items-center gap-2.5 px-3 py-2 rounded-[10px] text-sm font-medium transition-all mb-0.5 relative group ${isActive ? '' : ''}`}
          style={({ isActive }) => isActive
            ? { background: 'var(--accent-muted)', color: 'var(--accent)' }
            : { color: 'var(--text-2)' }
          }
        >
          {({ isActive }) => (
            <>
              {isActive && <span style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: 3, height: 16, background: 'var(--accent)', borderRadius: 4 }} />}
              <Icon size={16} strokeWidth={isActive ? 2.5 : 1.8} />
              <span>{label}</span>
              {badge > 0 && (
                <span style={{ background: 'var(--red)', color: 'white', fontSize: 10, fontWeight: 700, minWidth: 18, height: 18, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 'auto', padding: '0 5px' }}>
                  {badge}
                </span>
              )}
            </>
          )}
        </NavLink>
      ))}
    </div>
  )
}

export default function Sidebar() {
  const [selectedBranch, setSelectedBranch] = useState(branches[0])
  const [branchOpen, setBranchOpen] = useState(false)
  const config = getConfig()

  return (
    <aside style={{ width: 220, background: 'var(--surface)', borderLeft: '1px solid var(--border)', display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'fixed', right: 0, top: 0, zIndex: 30 }}>

      {/* Logo */}
      <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2.5">
          <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg, #F97316, #EA6C10)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 12px rgba(249,115,22,0.3)' }}>
            <Zap size={16} color="white" strokeWidth={2.5} />
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', lineHeight: 1.2 }}>منصة المطعم</p>
            <p style={{ fontSize: 11, color: 'var(--green)', fontWeight: 500, marginTop: 1 }}>● مفتوح الآن</p>
          </div>
        </div>
      </div>

      {/* Branch selector */}
      <div style={{ padding: '10px 12px 0' }}>
        <div className="relative">
          <button onClick={() => setBranchOpen(!branchOpen)}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', borderRadius: 8, background: 'var(--surface-2)', border: '1px solid var(--border)', cursor: 'pointer', transition: 'all 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-strong)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <span style={{ fontSize: 12, color: 'var(--text-2)', fontWeight: 500 }}>{selectedBranch}</span>
            <ChevronDown size={13} style={{ color: 'var(--text-3)', transform: branchOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
          </button>
          {branchOpen && (
            <div style={{ position: 'absolute', top: 'calc(100% + 4px)', right: 0, left: 0, background: 'var(--surface-3)', border: '1px solid var(--border-strong)', borderRadius: 10, overflow: 'hidden', zIndex: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
              {branches.map(b => (
                <button key={b} onClick={() => { setSelectedBranch(b); setBranchOpen(false) }}
                  style={{ width: '100%', textAlign: 'right', padding: '9px 12px', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', color: selectedBranch === b ? 'var(--accent)' : 'var(--text-2)', background: 'transparent', border: 'none', transition: 'background 0.1s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span>{b}</span>
                  {selectedBranch === b && <Check size={13} color="var(--accent)" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
        <NavGroup label="التشغيل" items={navMain} />
        <div style={{ height: 1, background: 'var(--border)', margin: '8px 4px' }} />
        <NavGroup label="النمو" items={navGrowth} />
        <div style={{ height: 1, background: 'var(--border)', margin: '8px 4px' }} />
        <NavGroup label="الإدارة" items={navSystem} />

        {/* KDS link */}
        <div style={{ marginTop: 4 }}>
          <a href="/kds" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3 py-2 rounded-[10px] text-sm font-medium transition-all"
            style={{ color: 'var(--text-2)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface-2)'; e.currentTarget.style.color = 'var(--text)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-2)' }}
          >
            <Monitor size={16} strokeWidth={1.8} />
            <span>شاشة المطبخ</span>
            <ArrowUpRight size={12} style={{ marginRight: 'auto', opacity: 0.5 }} />
          </a>
        </div>
      </nav>

      {/* Bottom */}
      <div style={{ padding: '12px', borderTop: '1px solid var(--border)' }}>
        <a href={`/${config.slug || 'chef-ahmed'}`} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-3 py-2 rounded-[10px] text-sm font-medium w-full transition-all"
          style={{ color: 'var(--text-2)', background: 'var(--accent-muted)', border: '1px solid rgba(249,115,22,0.15)' }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-2)' }}
        >
          <ExternalLink size={14} />
          <span style={{ fontSize: 12, fontWeight: 600 }}>معاينة صفحتي</span>
          <ArrowUpRight size={11} style={{ marginRight: 'auto' }} />
        </a>
      </div>
    </aside>
  )
}
