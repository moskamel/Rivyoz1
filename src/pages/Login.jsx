import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap, Eye, EyeOff, LogIn } from 'lucide-react'

const roles = [
  { id: 'owner', label: 'صاحب المطعم', email: 'owner@restaurant.com', password: 'owner123' },
  { id: 'manager', label: 'مدير الفرع', email: 'manager@restaurant.com', password: 'manager123' },
  { id: 'cashier', label: 'كاشير', email: 'cashier@restaurant.com', password: 'cashier123' },
  { id: 'kitchen', label: 'مطبخ', email: 'kitchen@restaurant.com', password: 'kitchen123' },
]

const inputStyle = {
  width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid var(--border)',
  background: 'var(--surface-2)', color: 'var(--text)', fontSize: 14, outline: 'none',
  fontFamily: 'Cairo, sans-serif', boxSizing: 'border-box', transition: 'border-color 0.15s',
}

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedRole, setSelectedRole] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  function selectRole(role) {
    setSelectedRole(role.id)
    setEmail(role.email)
    setPassword(role.password)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      localStorage.setItem('auth_role', selectedRole || 'owner')
      navigate('/')
    }, 800)
  }

  function demoLogin() {
    setLoading(true)
    localStorage.setItem('auth_role', 'owner')
    setTimeout(() => navigate('/'), 600)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg)' }} dir="rtl">
      {/* Left panel — brand */}
      <div style={{ display: 'none', width: '50%', background: 'linear-gradient(135deg, #F97316 0%, #EA6C10 60%, #D97706 100%)', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 48, position: 'relative', overflow: 'hidden' }} className="lg:flex">
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', bottom: -100, left: -60, width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
            <Zap size={40} color="white" strokeWidth={2.5} />
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 900, color: 'white', marginBottom: 10, letterSpacing: '-0.02em' }}>ريڤيو</h1>
          <p style={{ fontSize: 18, fontWeight: 600, color: 'rgba(255,255,255,0.85)', marginBottom: 8 }}>نظام إدارة المطعم الذكي</p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, maxWidth: 280, margin: '0 auto 40px' }}>
            أدر طلباتك، قائمتك، وفريقك من مكان واحد بسهولة تامة
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {[
              { n: '+2340', l: 'ج مبيعات اليوم' },
              { n: '18', l: 'طلب اليوم' },
              { n: '4.9★', l: 'تقييم الزبائن' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 16, padding: '14px 10px', textAlign: 'center' }}>
                <p style={{ fontSize: 22, fontWeight: 900, color: 'white', fontFamily: 'Inter' }}>{s.n}</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div style={{ width: 38, height: 38, background: 'linear-gradient(135deg, #F97316, #EA6C10)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={20} color="white" strokeWidth={2.5} />
            </div>
            <p style={{ fontSize: 20, fontWeight: 900, color: 'var(--text)' }}>ريڤيو</p>
          </div>

          <h2 style={{ fontSize: 26, fontWeight: 900, color: 'var(--text)', marginBottom: 6, letterSpacing: '-0.02em' }}>أهلاً بعودتك 👋</h2>
          <p style={{ fontSize: 14, color: 'var(--text-2)', marginBottom: 28 }}>سجّل دخولك لإدارة مطعمك</p>

          {/* Role selector */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.08em', marginBottom: 10 }}>اختر دورك</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {roles.map(role => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => selectRole(role)}
                  style={{
                    padding: '10px 14px', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
                    border: `1px solid ${selectedRole === role.id ? 'var(--accent)' : 'var(--border)'}`,
                    background: selectedRole === role.id ? 'var(--accent-muted)' : 'var(--surface)',
                    color: selectedRole === role.id ? 'var(--accent)' : 'var(--text-2)',
                  }}
                >
                  {role.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6 }}>البريد الإلكتروني</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="example@restaurant.com"
                required
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6 }}>كلمة المرور</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{ ...inputStyle, paddingLeft: 44 }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-3)', display: 'flex' }}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '14px', background: 'var(--accent)', color: 'white', fontWeight: 700, borderRadius: 12, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.15s', opacity: loading ? 0.75 : 1, boxShadow: '0 4px 20px rgba(249,115,22,0.25)',
              }}
            >
              {loading ? (
                <span style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
              ) : (
                <>
                  <LogIn size={17} />
                  تسجيل الدخول
                </>
              )}
            </button>
          </form>

          <div style={{ position: 'relative', margin: '20px 0' }}>
            <div style={{ height: 1, background: 'var(--border)' }} />
            <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'var(--bg)', padding: '0 12px', fontSize: 12, color: 'var(--text-3)' }}>أو</span>
          </div>

          <button
            type="button"
            onClick={demoLogin}
            disabled={loading}
            style={{ width: '100%', padding: '12px', border: '2px dashed var(--border)', color: 'var(--accent)', fontWeight: 700, borderRadius: 12, fontSize: 14, background: 'transparent', cursor: 'pointer', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-muted)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'transparent' }}
          >
            تسجيل الدخول تجريبي بدون كلمة مرور
          </button>

          <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-3)', marginTop: 24 }}>
            نظام ريڤيو لإدارة المطاعم · جميع الحقوق محفوظة
          </p>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
