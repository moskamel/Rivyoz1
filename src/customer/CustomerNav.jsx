import { useLocation, useNavigate } from 'react-router-dom'
import { Compass, ClipboardList, ShoppingCart, User } from 'lucide-react'
import { useCart } from './CartContext'
import { getConfig } from '../lib/restaurantStore'

const tabs = [
  { label: 'استكشف', icon: Compass, path: '/explore' },
  { label: 'طلباتي', icon: ClipboardList, path: '/my-orders' },
  { label: 'السلة', icon: ShoppingCart, path: '/cart' },
  { label: 'حسابي', icon: User, path: '/my-profile' },
]

export default function CustomerNav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { itemCount } = useCart()
  const config = getConfig()
  const color = config.color

  const isActive = (path) => pathname === path

  return (
    <nav
      dir="rtl"
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
        background: 'white',
        borderTop: '1px solid #F3F4F6',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
        display: 'flex',
        fontFamily: 'Cairo, sans-serif',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {tabs.map(({ label, icon: Icon, path }) => {
        const active = isActive(path)
        const isCart = path === '/cart'
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: 3, padding: '10px 4px 8px',
              background: 'none', border: 'none', cursor: 'pointer',
              color: active ? color : '#9CA3AF',
              transition: 'color 0.15s',
              position: 'relative',
            }}
          >
            <div style={{ position: 'relative' }}>
              <Icon
                size={20}
                strokeWidth={active ? 2.5 : 1.8}
                fill={active && !isCart ? `${color}18` : 'none'}
              />
              {isCart && itemCount > 0 && (
                <span style={{
                  position: 'absolute', top: -6, left: -6,
                  background: color, color: 'white',
                  fontSize: 9, fontWeight: 800, borderRadius: '50%',
                  width: 16, height: 16,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1.5px solid white',
                }}>
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </div>
            <span style={{ fontSize: 10, fontWeight: active ? 700 : 500 }}>{label}</span>
            {active && (
              <span style={{
                position: 'absolute', bottom: 0, left: '50%',
                transform: 'translateX(-50%)',
                width: 20, height: 3, borderRadius: '3px 3px 0 0',
                background: color,
              }} />
            )}
          </button>
        )
      })}
    </nav>
  )
}
