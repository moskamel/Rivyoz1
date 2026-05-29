import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Compass, ShoppingCart, User, Menu, X, Moon, Sun } from 'lucide-react'
import { useCart } from './CartContext'
import { useTheme } from '../lib/ThemeContext'
import { useSidebar } from '../lib/ThemeContext'
import { getConfig, getCustomerProfile, getCustomerPoints, clearCustomerProfile } from '../lib/restaurantStore'

export default function CustomerNav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { itemCount } = useCart()
  const { isDark, toggle } = useTheme()
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const config = getConfig()
  const color = config.color

  const customerProfile = getCustomerProfile()
  const pts = customerProfile ? getCustomerPoints(customerProfile.phone) : null

  const tabs = [
    { label: 'الرئيسية', icon: Home,        path: '/landing'    },
    { label: 'استكشف',  icon: Compass,      path: '/explore'    },
    { label: 'السلة',   icon: ShoppingCart, path: '/cart'       },
    { label: 'حسابي',   icon: User,         path: '/my-profile' },
  ]

  return (
    <>
      {/* ── Sidebar overlay ── */}
      {sidebarOpen && (
        <>
          <div
            onClick={() => setSidebarOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200 }}
          />
          <div
            dir="rtl"
            style={{
              position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 201,
              background: 'var(--surface)', width: 300,
              boxShadow: '4px 0 24px rgba(0,0,0,0.15)',
              display: 'flex', flexDirection: 'column',
              fontFamily: 'Zain, sans-serif',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid var(--border)' }}>
              <h2 style={{ fontWeight: 800, fontSize: 16, color: 'var(--text)' }}>حسابي</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button
                  onClick={toggle}
                  style={{ padding: 8, borderRadius: 8, background: 'var(--surface-2)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-2)' }}
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
                <button
                  onClick={() => setSidebarOpen(false)}
                  style={{ padding: 8, borderRadius: 8, background: 'var(--surface-2)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-2)' }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {customerProfile ? (
              <>
                {/* Profile card */}
                <div style={{ padding: '20px 16px', background: `${color}0D`, borderBottom: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 48, height: 48, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: 20, flexShrink: 0 }}>
                      {customerProfile.name?.charAt(0) || '؟'}
                    </div>
                    <div>
                      <p style={{ fontWeight: 800, fontSize: 15, color: 'var(--text)' }}>{customerProfile.name}</p>
                      <p style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2, direction: 'ltr', textAlign: 'right' }}>{customerProfile.phone}</p>
                    </div>
                  </div>
                  {pts && pts.balance > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface)', padding: '8px 12px', borderRadius: 12, border: '1px solid var(--border)' }}>
                      <span style={{ fontSize: 16 }}>🎁</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#F59E0B' }}>{pts.balance.toLocaleString()} نقطة</span>
                      <button
                        onClick={() => { setSidebarOpen(false); navigate('/loyalty') }}
                        style={{ marginRight: 'auto', fontSize: 11, color, fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Zain, sans-serif' }}
                      >استبدل ←</button>
                    </div>
                  )}
                </div>

                {/* Nav links */}
                <div style={{ flex: 1, overflowY: 'auto' }}>
                  {[
                    { icon: '📋', label: 'طلباتي',          path: '/my-orders'  },
                    { icon: '🎁', label: 'نقاط المكافآت',   path: '/loyalty'    },
                    { icon: '👤', label: 'ملفي الشخصي',     path: '/my-profile' },
                    { icon: '🗺️', label: 'استكشف المطاعم', path: '/explore'    },
                  ].map(link => (
                    <button
                      key={link.path}
                      onClick={() => { setSidebarOpen(false); navigate(link.path) }}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: 'transparent', border: 'none', borderBottom: '1px solid var(--border)', cursor: 'pointer', fontFamily: 'Zain, sans-serif', textAlign: 'right' }}
                    >
                      <span style={{ fontSize: 18 }}>{link.icon}</span>
                      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{link.label}</span>
                    </button>
                  ))}

                  <div style={{ margin: '8px 16px', height: 1, background: 'var(--border)' }} />

                  {/* App download */}
                  <div style={{ padding: '4px 12px 12px' }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', padding: '8px 4px', letterSpacing: '0.05em' }}>حمّل التطبيق</p>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px', borderRadius: 10, background: 'var(--surface-2)', color: 'var(--text)', fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'Zain, sans-serif' }}>🍎 App Store</button>
                      <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px', borderRadius: 10, background: 'var(--surface-2)', color: 'var(--text)', fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'Zain, sans-serif' }}>🤖 Google Play</button>
                    </div>
                  </div>

                  {/* Contact info */}
                  <div style={{ padding: '0 16px 16px' }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', marginBottom: 8, letterSpacing: '0.05em' }}>تواصل معنا</p>
                    {config.phone && <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 4 }}>📞 {config.phone}</p>}
                    <p style={{ fontSize: 13, color: 'var(--text-2)' }}>🕐 {config.isOpen ? 'مفتوح الآن' : `يفتح ${config.opensAt}`}</p>
                  </div>
                </div>

                {/* Logout */}
                <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)' }}>
                  <button
                    onClick={() => { clearCustomerProfile(); setSidebarOpen(false) }}
                    style={{ width: '100%', padding: '11px', borderRadius: 12, background: '#FEF2F2', color: '#DC2626', fontWeight: 700, fontSize: 13, border: '1px solid #FECACA', cursor: 'pointer', fontFamily: 'Zain, sans-serif' }}
                  >
                    تسجيل الخروج
                  </button>
                </div>
              </>
            ) : (
              /* Not logged in */
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 20px', textAlign: 'center' }}>
                  <div style={{ width: 72, height: 72, borderRadius: '50%', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, marginBottom: 16 }}>👤</div>
                  <p style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>أهلاً بك!</p>
                  <p style={{ fontSize: 13, color: 'var(--text-2)', marginBottom: 24, lineHeight: 1.7 }}>سجّل دخولك لتتبع طلباتك وتجميع النقاط والاستمتاع بالعروض</p>
                  <button
                    onClick={() => { setSidebarOpen(false); navigate('/customer-login') }}
                    style={{ width: '100%', padding: '13px', borderRadius: 14, background: color, color: 'white', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', fontFamily: 'Zain, sans-serif', boxShadow: `0 6px 20px ${color}40`, marginBottom: 10 }}
                  >
                    تسجيل الدخول
                  </button>
                  <button
                    onClick={() => { setSidebarOpen(false); navigate('/customer-login') }}
                    style={{ width: '100%', padding: '11px', borderRadius: 14, background: 'var(--surface)', color, fontWeight: 700, fontSize: 14, border: `2px solid ${color}`, cursor: 'pointer', fontFamily: 'Zain, sans-serif' }}
                  >
                    إنشاء حساب جديد
                  </button>
                </div>
                <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)' }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', marginBottom: 10, textAlign: 'center', letterSpacing: '0.05em' }}>حمّل التطبيق</p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px', borderRadius: 10, background: 'var(--surface-2)', color: 'var(--text)', fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'Zain, sans-serif' }}>🍎 App Store</button>
                    <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px', borderRadius: 10, background: 'var(--surface-2)', color: 'var(--text)', fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: 'Zain, sans-serif' }}>🤖 Google Play</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* ── Bottom tab bar ── */}
      <nav
        dir="rtl"
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
          background: 'var(--surface)', borderTop: '1px solid var(--border)',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
          display: 'flex', fontFamily: 'Zain, sans-serif',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {tabs.map(({ label, icon: Icon, path }) => {
          const isCart   = path === '/cart'
          const active   = path ? pathname === path : false

          return (
            <button
              key={label}
              onClick={() => navigate(path)}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', gap: 3, padding: '10px 4px 8px',
                background: 'none', border: 'none', cursor: 'pointer',
                color: active ? color : 'var(--text-3)',
                transition: 'color 0.15s', position: 'relative',
              }}
            >
              <div style={{ position: 'relative' }}>
                <Icon size={20} strokeWidth={active ? 2.5 : 1.8} fill={active && !isCart ? `${color}18` : 'none'} />
                {isCart && itemCount > 0 && (
                  <span style={{ position: 'absolute', top: -6, left: -6, background: color, color: 'white', fontSize: 9, fontWeight: 800, borderRadius: '50%', width: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid var(--surface)' }}>
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </div>
              <span style={{ fontSize: 10, fontWeight: active ? 700 : 500 }}>{label}</span>
              {active && (
                <span style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 20, height: 3, borderRadius: '3px 3px 0 0', background: color }} />
              )}
            </button>
          )
        })}
      </nav>
    </>
  )
}
