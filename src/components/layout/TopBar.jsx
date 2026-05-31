import { useState, useEffect } from 'react'
import { Sun, Moon, SearchNormal1 } from 'iconsax-react'
import { useNavigate } from 'react-router-dom'
import NotificationBell from '../NotificationBell'
import { getConfig } from '../../lib/restaurantStore'
import { useBranch } from '../../lib/BranchContext'

const roleLabels = {
  owner:   'صاحب المطعم',
  manager: 'مدير الفرع',
  cashier: 'كاشير',
  kitchen: 'مطبخ',
}

function useClock() {
  const [time, setTime] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 60000)
    return () => clearInterval(id)
  }, [])
  return time
}

export default function TopBar({ title }) {
  const navigate  = useNavigate()
  const role      = localStorage.getItem('auth_role') || 'owner'
  const roleLabel = roleLabels[role] || 'صاحب المطعم'
  const config    = getConfig()
  const { activeBranch } = useBranch()

  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const now = useClock()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'light' ? 'light' : '')
    localStorage.setItem('theme', theme)
    localStorage.setItem('c_theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))
  const isLight     = theme === 'light'

  const weekdays = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
  const dayName   = weekdays[now.getDay()]
  const timeStr   = now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })

  const restaurantInitial = (config.name || 'م').charAt(0)

  return (
    <header
      style={{
        height: 56,
        background: isLight ? 'rgba(255,255,255,0.90)' : 'rgba(8,8,8,0.90)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px 0 16px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        gap: 12,
      }}
    >
      {/* Right: title + branch chip + clock */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, flex: 1 }}>
        <h1
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: 'var(--text)',
            letterSpacing: '-0.01em',
            margin: 0,
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </h1>
        {activeBranch && (
          <span style={{
            fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap',
            padding: '3px 10px', borderRadius: 'var(--radius-full)',
            background: 'var(--accent-muted)', color: 'var(--accent)',
            border: '1px solid var(--border-accent)',
          }}>
            {activeBranch.name}
          </span>
        )}
        <span
          style={{
            fontSize: 11,
            color: 'var(--text-3)',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span
            className={`status-dot ${config.isOpen ? 'live' : 'idle'}`}
            style={{ width: 6, height: 6 }}
          />
          {config.isOpen ? 'مفتوح' : 'مغلق'}
          <span style={{ color: 'var(--border-strong)' }}>·</span>
          {dayName} {timeStr}
        </span>
      </div>

      {/* Left: controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
        {/* Search */}
        <button className="btn-icon md" title="بحث" style={{ cursor: 'pointer' }}>
          <SearchNormal1 size={15} strokeWidth={2} />
        </button>

        {/* Notifications */}
        <NotificationBell />

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="btn-icon md"
          title={isLight ? 'الوضع الداكن' : 'الوضع الفاتح'}
          style={{ cursor: 'pointer', color: isLight ? '#F59E0B' : '#60A5FA' }}
        >
          {isLight ? <Sun size={15} strokeWidth={2} /> : <Moon size={15} strokeWidth={2} />}
        </button>

        <div style={{ width: 1, height: 20, background: 'var(--border)', margin: '0 2px' }} />

        {/* Role chip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '0 10px',
            height: 34,
            borderRadius: 'var(--radius-lg)',
            background: 'var(--surface-2)',
            border: '1px solid var(--border)',
            cursor: 'pointer',
            transition: 'border-color var(--dur-normal) ease',
          }}
          onClick={() => navigate('/settings')}
          title="الإعدادات"
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
        >
          {/* Avatar circle */}
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: '50%',
              background: 'var(--accent-muted)',
              border: '1px solid var(--border-accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent)',
              fontSize: 11,
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            {restaurantInitial}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)', whiteSpace: 'nowrap' }}>
              {config.name?.split(' ').slice(0, 2).join(' ') || 'المطعم'}
            </span>
            <span style={{ fontSize: 10, color: 'var(--text-3)', whiteSpace: 'nowrap' }}>
              {roleLabel}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
