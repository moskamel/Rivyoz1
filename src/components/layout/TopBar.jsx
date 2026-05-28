import { useState, useEffect } from 'react'
import { Sun, Moon, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import NotificationBell from '../NotificationBell'

const roleLabels = {
  owner: 'صاحب المطعم',
  manager: 'مدير الفرع',
  cashier: 'كاشير',
  kitchen: 'مطبخ',
}

export default function TopBar({ title }) {
  const navigate = useNavigate()
  const role = localStorage.getItem('auth_role') || 'owner'
  const roleLabel = roleLabels[role] || 'صاحب المطعم'
  const userInitial = roleLabel.charAt(0)

  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'light' ? 'light' : '')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))
  const isLight = theme === 'light'

  return (
    <header
      style={{
        height: 56,
        background: 'rgba(8,8,8,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Page title — left side in RTL = visual left */}
      <h1
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: 'var(--text)',
          letterSpacing: '-0.01em',
          margin: 0,
        }}
      >
        {title}
      </h1>

      {/* Right controls */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <button
          className="btn-icon md"
          title="بحث"
          style={{ cursor: 'pointer' }}
        >
          <Search size={15} strokeWidth={2} />
        </button>

        {/* Notification bell */}
        <NotificationBell />

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="btn-icon md"
          title={isLight ? 'تفعيل الوضع الداكن' : 'تفعيل الوضع الفاتح'}
          style={{
            cursor: 'pointer',
            color: isLight ? '#F59E0B' : '#60A5FA',
          }}
        >
          {isLight ? <Sun size={15} strokeWidth={2} /> : <Moon size={15} strokeWidth={2} />}
        </button>

        {/* Separator */}
        <div style={{ width: 1, height: 20, background: 'var(--border)', margin: '0 2px' }} />

        {/* Avatar — navigates to /profile */}
        <div
          onClick={() => navigate('/profile')}
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'var(--accent-muted)',
            border: '1px solid var(--border-accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent)',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'border-color 0.15s, box-shadow 0.15s',
          }}
          title={`${roleLabel} — الملف الشخصي`}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 0 0 2px rgba(249,115,22,0.2)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-accent)'; e.currentTarget.style.boxShadow = 'none' }}
        >
          {userInitial}
        </div>
      </div>
    </header>
  )
}
