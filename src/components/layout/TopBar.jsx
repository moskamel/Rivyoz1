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
    <header style={{ height: 56, background: 'var(--surface)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', position: 'sticky', top: 0, zIndex: 20, backdropFilter: 'blur(8px)' }}>
      <h1 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.01em' }}>{title}</h1>
      <div className="flex items-center gap-2">
        <NotificationBell />
        <div style={{ width: 1, height: 20, background: 'var(--border)', margin: '0 4px' }} />
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 6, background: 'var(--surface-2)', color: 'var(--text-2)', border: '1px solid var(--border)' }}>
            {roleLabel}
          </span>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #F97316, #EA6C10)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer', boxShadow: '0 0 10px rgba(249,115,22,0.2)' }}>
            م
          </div>
        </div>
      </div>
    </header>
  )
}
