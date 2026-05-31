import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Category, Task, Cup, Speaker, Chart, Settings, Export, People, UserTick, Box, Monitor, ArrowDown2, Check, Flash, ExportSquare, ColorSwatch, Logout, Star1, Building } from 'iconsax-react'
import { getConfig, getOrders, getBranches } from '../../lib/restaurantStore'
import { useBranch } from '../../lib/BranchContext'

const navGrowth = [
  { to: '/customers', label: 'الزبائن', icon: People },
  { to: '/reviews', label: 'التقييمات', icon: Star1 },
  { to: '/marketing', label: 'التسويق', icon: Speaker },
  { to: '/reports', label: 'التقارير', icon: Chart },
]
const navSystem = [
  { to: '/staff',    label: 'الموظفون',     icon: UserTick   },
  { to: '/branches', label: 'الفروع',       icon: Building   },
  { to: '/design',   label: 'تصميم الموقع', icon: ColorSwatch },
  { to: '/settings', label: 'الإعدادات',    icon: Settings   },
]

function NavGroup({ label, items }) {
  return (
    <div className="mb-1">
      <p
        style={{
          color: 'var(--text-3)',
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
        className="px-2 pt-2 pb-1"
      >
        {label}
      </p>
      {items.map(({ to, label, icon: Icon, badge, exact }) => (
        <NavLink
          key={to}
          to={to}
          end={exact}
          className="flex items-center gap-2.5 relative mb-px"
          style={({ isActive }) => ({
            height: 38,
            borderRadius: 10,
            padding: '0 10px',
            fontSize: 13,
            fontWeight: isActive ? 600 : 500,
            background: isActive ? 'var(--accent-muted)' : 'transparent',
            color: isActive ? 'var(--accent)' : 'var(--text-2)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            transition: 'background var(--dur-normal) var(--ease-default), color var(--dur-normal) var(--ease-default)',
            textDecoration: 'none',
          })}
          onMouseEnter={e => {
            if (!e.currentTarget.classList.contains('active')) {
              e.currentTarget.style.background = 'var(--surface-2)'
              e.currentTarget.style.color = 'var(--text)'
            }
          }}
          onMouseLeave={e => {
            if (!e.currentTarget.classList.contains('active')) {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--text-2)'
            }
          }}
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 3,
                    height: '60%',
                    background: 'var(--accent)',
                    borderRadius: '0 0 0 var(--radius-full)',
                  }}
                />
              )}
              <Icon size={15} strokeWidth={isActive ? 2.2 : 1.6} />
              <span>{label}</span>
              {badge > 0 && (
                <span
                  style={{
                    background: 'var(--red)',
                    color: 'white',
                    fontSize: 10,
                    fontWeight: 700,
                    minWidth: 18,
                    height: 18,
                    borderRadius: 9,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 'auto',
                    padding: '0 5px',
                  }}
                >
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
  const [branchList, setBranchList] = useState(getBranches)
  const [branchOpen, setBranchOpen] = useState(false)
  const [config, setConfigState] = useState(getConfig)
  const [newOrderCount, setNewOrderCount] = useState(() => getOrders().filter(o => o.status === 'new').length)
  const { activeBranch, setActiveBranch } = useBranch()
  const navigate = useNavigate()

  useEffect(() => {
    const id = setInterval(() => {
      setNewOrderCount(getOrders().filter(o => o.status === 'new').length)
      setConfigState(getConfig())
      setBranchList(getBranches())
    }, 3000)
    return () => clearInterval(id)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('auth_role')
    navigate('/login')
  }

  const navMain = [
    { to: '/', label: 'الرئيسية', icon: Category, exact: true },
    { to: '/orders', label: 'الطلبات', icon: Task, badge: newOrderCount },
    { to: '/menu', label: 'القائمة', icon: Cup },
    { to: '/inventory', label: 'المخزون', icon: Box },
  ]

  const restaurantInitial = (config.name || 'م').charAt(0)

  return (
    <aside
      style={{
        width: 232,
        background: 'var(--surface)',
        borderLeft: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        position: 'fixed',
        right: 0,
        top: 0,
        zIndex: 30,
      }}
    >
      {/* Brand area */}
      <div style={{ padding: '16px 16px 12px' }}>
        <div className="flex items-center gap-2.5">
          {/* Restaurant initial circle */}
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'var(--accent-muted)',
              border: '1px solid var(--border-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--accent)' }}>
              {restaurantInitial}
            </span>
          </div>
          <div style={{ minWidth: 0 }}>
            <p
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: 'var(--text)',
                lineHeight: 1.2,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {config.name || 'منصة المطعم'}
            </p>
            <div className="flex items-center gap-1" style={{ marginTop: 3 }}>
              <span
                className={`status-dot ${config.isOpen ? 'live' : 'idle'}`}
                style={{ width: 6, height: 6, borderRadius: '50%', flexShrink: 0 }}
              />
              <span
                style={{
                  fontSize: 11,
                  color: config.isOpen ? 'var(--green)' : 'var(--red)',
                  fontWeight: 500,
                }}
              >
                {config.isOpen ? 'مفتوح' : 'مغلق'}
              </span>
            </div>
          </div>
        </div>

        {/* Branch selector */}
        <div style={{ marginTop: 10, position: 'relative' }}>
          <button
            onClick={() => setBranchOpen(!branchOpen)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '7px 10px',
              borderRadius: 8,
              background: activeBranch ? 'var(--accent-muted)' : 'var(--surface-2)',
              border: activeBranch ? '1px solid var(--border-accent)' : '1px solid var(--border)',
              cursor: 'pointer',
              transition: 'all var(--dur-normal) var(--ease-default)',
              fontFamily: 'Zain, sans-serif',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = activeBranch ? 'var(--accent)' : 'var(--border-strong)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = activeBranch ? 'var(--border-accent)' : 'var(--border)')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {activeBranch && <span className={`status-dot ${activeBranch.isOpen ? 'live' : 'idle'}`} style={{ width: 6, height: 6, flexShrink: 0 }} />}
              <span style={{ fontSize: 12, color: activeBranch ? 'var(--accent)' : 'var(--text-2)', fontWeight: activeBranch ? 600 : 500 }}>
                {activeBranch ? activeBranch.name : 'كل الفروع'}
              </span>
            </div>
            <ArrowDown2
              size={13}
              style={{
                color: 'var(--text-3)',
                transform: branchOpen ? 'rotate(180deg)' : 'none',
                transition: 'transform var(--dur-normal) var(--ease-default)',
                flexShrink: 0,
              }}
            />
          </button>
          {branchOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 4px)',
                right: 0,
                left: 0,
                background: 'var(--surface-3)',
                border: '1px solid var(--border-strong)',
                borderRadius: 10,
                overflow: 'hidden',
                zIndex: 10,
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              {/* All branches option */}
              <button
                onClick={() => { setActiveBranch(null); setBranchOpen(false) }}
                style={{
                  width: '100%', textAlign: 'right', padding: '9px 12px', fontSize: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  cursor: 'pointer',
                  color: activeBranch === null ? 'var(--accent)' : 'var(--text-2)',
                  background: 'transparent', border: 'none',
                  transition: 'background var(--dur-normal) var(--ease-default)',
                  fontFamily: 'Zain, sans-serif',
                  borderBottom: '1px solid var(--border)',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Building size={12} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
                  <span style={{ fontWeight: 600 }}>كل الفروع</span>
                </div>
                {activeBranch === null && <Check size={13} color="var(--accent)" />}
              </button>
              {branchList.map(b => (
                <button
                  key={b.id}
                  onClick={() => { setActiveBranch(b); setBranchOpen(false) }}
                  style={{
                    width: '100%', textAlign: 'right', padding: '9px 12px', fontSize: 12,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    cursor: 'pointer',
                    color: activeBranch?.id === b.id ? 'var(--accent)' : 'var(--text-2)',
                    background: 'transparent', border: 'none',
                    transition: 'background var(--dur-normal) var(--ease-default)',
                    fontFamily: 'Zain, sans-serif',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-2)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span className={`status-dot ${b.isOpen ? 'live' : 'idle'}`} style={{ width: 6, height: 6, flexShrink: 0 }} />
                    <span>{b.name}</span>
                  </div>
                  {activeBranch?.id === b.id && <Check size={13} color="var(--accent)" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'var(--border)', margin: '0 16px 4px' }} />

      {/* Nav */}
      <nav
        className="no-scrollbar"
        style={{ flex: 1, padding: '4px 8px', overflowY: 'auto' }}
      >
        <NavGroup label="التشغيل" items={navMain} />
        <div style={{ height: 1, background: 'var(--border)', margin: '6px 4px' }} />
        <NavGroup label="النمو" items={navGrowth} />
        <div style={{ height: 1, background: 'var(--border)', margin: '6px 4px' }} />
        <NavGroup label="الإدارة" items={navSystem} />
      </nav>

      {/* Bottom section */}
      <div
        style={{
          marginTop: 'auto',
          padding: '8px 8px 16px',
          borderTop: '1px solid var(--border)',
        }}
      >
        {/* View restaurant website */}
        <a
          href={`/${config.slug || 'chef-ahmed'}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
          style={{
            height: 32,
            borderRadius: 8,
            padding: '0 10px',
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--text-2)',
            background: 'transparent',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            textDecoration: 'none',
            transition: 'background var(--dur-normal) var(--ease-default), color var(--dur-normal) var(--ease-default), border-color var(--dur-normal) var(--ease-default)',
            marginBottom: 4,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--surface-2)'
            e.currentTarget.style.color = 'var(--text)'
            e.currentTarget.style.borderColor = 'var(--border-strong)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = 'var(--text-2)'
            e.currentTarget.style.borderColor = 'var(--border)'
          }}
        >
          <Export size={13} />
          <span>عرض موقع المطعم</span>
          <ExportSquare size={11} style={{ marginRight: 'auto', opacity: 0.5 }} />
        </a>

        {/* KDS link */}
        <a
          href="/kds"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
          style={{
            height: 32,
            borderRadius: 8,
            padding: '0 10px',
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--text-2)',
            background: 'transparent',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            textDecoration: 'none',
            transition: 'background var(--dur-normal) var(--ease-default), color var(--dur-normal) var(--ease-default), border-color var(--dur-normal) var(--ease-default)',
            marginBottom: 4,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--surface-2)'
            e.currentTarget.style.color = 'var(--text)'
            e.currentTarget.style.borderColor = 'var(--border-strong)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = 'var(--text-2)'
            e.currentTarget.style.borderColor = 'var(--border)'
          }}
        >
          <Monitor size={13} />
          <span>KDS شاشة المطبخ</span>
          <ExportSquare size={11} style={{ marginRight: 'auto', opacity: 0.5 }} />
        </a>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="btn-danger flex items-center gap-2 w-full"
          style={{
            height: 32,
            fontSize: 12,
            fontWeight: 600,
            borderRadius: 8,
            padding: '0 10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: 'Zain, sans-serif',
            marginBottom: 8,
          }}
        >
          <Logout size={13} />
          <span>تسجيل الخروج</span>
        </button>

        {/* User row */}
        <div
          className="flex items-center gap-2"
          style={{ paddingTop: 4 }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'var(--surface-3)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontSize: 11,
              fontWeight: 700,
              color: 'var(--text-2)',
            }}
          >
            {restaurantInitial}
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>
              {config.name || 'المطعم'}
            </p>
            <p style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 1 }}>صاحب المطعم</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
