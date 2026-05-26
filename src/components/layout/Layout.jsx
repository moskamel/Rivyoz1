import Sidebar from './Sidebar'
import TopBar from './TopBar'

export default function Layout({ title, children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <Sidebar />
      <div style={{ flex: 1, marginRight: 220 }}>
        <TopBar title={title} />
        <main style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>{children}</main>
      </div>
    </div>
  )
}
