import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Notification, ShoppingBag, CloseCircle, Warning2, Speaker, UserAdd } from 'iconsax-react'
import { getNotifications, setNotifications } from '../lib/restaurantStore'

const typeIconMap = {
  order: { icon: ShoppingBag, iconBg: 'var(--accent-muted)', iconColor: 'var(--accent)' },
  cancel: { icon: CloseCircle, iconBg: 'var(--red-muted)', iconColor: 'var(--red)' },
  inventory: { icon: Warning2, iconBg: 'var(--yellow-muted)', iconColor: 'var(--yellow)' },
  campaign: { icon: Speaker, iconBg: 'var(--blue-muted)', iconColor: 'var(--blue)' },
  customer: { icon: UserAdd, iconBg: 'var(--green-muted)', iconColor: 'var(--green)' },
}

export default function NotificationBell() {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifState] = useState(getNotifications)
  const ref = useRef(null)
  const navigate = useNavigate()

  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function markAllRead() {
    const updated = notifications.map(n => ({ ...n, read: true }))
    setNotifState(updated)
    setNotifications(updated)
  }

  function handleNotifClick(n) {
    const updated = notifications.map(x => x.id === n.id ? { ...x, read: true } : x)
    setNotifState(updated)
    setNotifications(updated)
    setOpen(false)
    if (n.link) navigate(n.link)
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        style={{ position: 'relative', padding: 8, borderRadius: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-2)', transition: 'all 0.15s' }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface-2)'; e.currentTarget.style.color = 'var(--text)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-2)' }}
      >
        <Notification size={18} />
        {unreadCount > 0 && (
          <span style={{ position: 'absolute', top: 4, right: 4, width: 16, height: 16, background: 'var(--red)', color: 'white', fontSize: 9, fontWeight: 700, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Zain, sans-serif' }}>
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div style={{ position: 'absolute', left: 0, top: 'calc(100% + 8px)', width: 320, background: 'var(--surface-2)', border: '1px solid var(--border-strong)', borderRadius: 14, zIndex: 50, overflow: 'hidden', boxShadow: '0 16px 40px rgba(0,0,0,0.5)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
            <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 13 }}>الإشعارات</p>
            {unreadCount > 0 && (
              <button onClick={markAllRead} style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
                تحديد الكل كمقروء
              </button>
            )}
          </div>
          <div style={{ maxHeight: 320, overflowY: 'auto' }}>
            {notifications.map(n => {
              const iconCfg = typeIconMap[n.type] || typeIconMap.order
              const Icon = iconCfg.icon
              return (
                <div
                  key={n.id}
                  onClick={() => handleNotifClick(n)}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 16px', borderBottom: '1px solid var(--border)', background: !n.read ? 'rgba(249,115,22,0.04)' : 'transparent', transition: 'background 0.15s', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-3)'}
                  onMouseLeave={e => e.currentTarget.style.background = !n.read ? 'rgba(249,115,22,0.04)' : 'transparent'}
                >
                  <div style={{ width: 32, height: 32, borderRadius: 9, background: iconCfg.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <Icon size={14} color={iconCfg.iconColor} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.5 }}>{n.text}</p>
                    <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 3 }}>{n.time}</p>
                  </div>
                  {!n.read && (
                    <span style={{ width: 6, height: 6, background: 'var(--accent)', borderRadius: '50%', flexShrink: 0, marginTop: 6 }} />
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
