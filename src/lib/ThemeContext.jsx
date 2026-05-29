import { createContext, useContext, useState } from 'react'
import { Outlet } from 'react-router-dom'

const Ctx = createContext({ isDark: false, toggle: () => {} })
export const useTheme = () => useContext(Ctx)

export function CustomerThemeWrapper() {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('c_theme') === 'dark')

  const toggle = () => setIsDark(d => {
    const n = !d
    localStorage.setItem('c_theme', n ? 'dark' : 'light')
    return n
  })

  return (
    <Ctx.Provider value={{ isDark, toggle }}>
      <div
        data-theme={isDark ? undefined : 'light'}
        style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}
      >
        <Outlet />
      </div>
    </Ctx.Provider>
  )
}
