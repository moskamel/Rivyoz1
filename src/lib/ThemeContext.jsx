import { createContext, useContext, useState } from 'react'
import { Outlet } from 'react-router-dom'

const ThemeCtx = createContext({ isDark: false, toggle: () => {} })
export const useTheme = () => useContext(ThemeCtx)

const SidebarCtx = createContext({ sidebarOpen: false, setSidebarOpen: () => {} })
export const useSidebar = () => useContext(SidebarCtx)

export function CustomerThemeWrapper() {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('c_theme') === 'dark')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggle = () => setIsDark(d => {
    const n = !d
    localStorage.setItem('c_theme', n ? 'dark' : 'light')
    return n
  })

  return (
    <ThemeCtx.Provider value={{ isDark, toggle }}>
      <SidebarCtx.Provider value={{ sidebarOpen, setSidebarOpen }}>
        <div
          data-theme={isDark ? undefined : 'light'}
          style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}
        >
          <Outlet />
        </div>
      </SidebarCtx.Provider>
    </ThemeCtx.Provider>
  )
}
