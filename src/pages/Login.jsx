import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChefHat, Eye, EyeOff, LogIn } from 'lucide-react'

const roles = [
  { id: 'owner', label: 'صاحب المطعم', email: 'owner@restaurant.com', password: 'owner123' },
  { id: 'manager', label: 'مدير الفرع', email: 'manager@restaurant.com', password: 'manager123' },
  { id: 'cashier', label: 'كاشير', email: 'cashier@restaurant.com', password: 'cashier123' },
  { id: 'kitchen', label: 'مطبخ', email: 'kitchen@restaurant.com', password: 'kitchen123' },
]

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
    <div className="min-h-screen flex" dir="rtl" style={{ fontFamily: "'Cairo', sans-serif" }}>
      {/* Left side — orange gradient */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 flex-col items-center justify-center p-12 text-white relative overflow-hidden">
        {/* Background circles */}
        <div className="absolute top-[-80px] right-[-80px] w-72 h-72 bg-white/10 rounded-full" />
        <div className="absolute bottom-[-100px] left-[-60px] w-96 h-96 bg-white/5 rounded-full" />

        <div className="relative z-10 text-center">
          <div className="w-24 h-24 bg-white/20 backdrop-blur rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <ChefHat size={48} className="text-white" />
          </div>
          <h1 className="text-4xl font-black mb-3">ريڤيو</h1>
          <p className="text-xl font-semibold text-orange-100 mb-2">نظام إدارة المطعم الذكي</p>
          <p className="text-orange-200 text-sm leading-relaxed max-w-xs mx-auto">
            أدر طلباتك، قائمتك، وفريقك من مكان واحد بسهولة تامة
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { n: '+2340', l: 'ج مبيعات اليوم' },
              { n: '18', l: 'طلب اليوم' },
              { n: '4.9★', l: 'تقييم الزبائن' },
            ].map((s, i) => (
              <div key={i} className="bg-white/10 rounded-2xl p-3 text-center">
                <p className="text-xl font-black">{s.n}</p>
                <p className="text-xs text-orange-200 mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side — login form */}
      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-orange-500 rounded-2xl flex items-center justify-center">
              <ChefHat size={22} className="text-white" />
            </div>
            <p className="text-xl font-black text-gray-900">ريڤيو</p>
          </div>

          <h2 className="text-2xl font-black text-gray-900 mb-1">أهلاً بعودتك 👋</h2>
          <p className="text-gray-500 text-sm mb-8">سجّل دخولك لإدارة مطعمك</p>

          {/* Role selector */}
          <div className="mb-6">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">اختر دورك</p>
            <div className="grid grid-cols-2 gap-2">
              {roles.map(role => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => selectRole(role)}
                  className={`py-2.5 px-4 rounded-xl text-sm font-bold border-2 transition-all ${
                    selectedRole === role.id
                      ? 'border-orange-500 bg-orange-50 text-orange-600'
                      : 'border-gray-200 text-gray-600 hover:border-orange-300 hover:bg-orange-50/50'
                  }`}
                >
                  {role.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">البريد الإلكتروني</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="example@restaurant.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm bg-gray-50 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">كلمة المرور</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm bg-gray-50 transition-all pl-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={18} />
                  تسجيل الدخول
                </>
              )}
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs text-gray-400">أو</span>
            </div>
          </div>

          <button
            type="button"
            onClick={demoLogin}
            disabled={loading}
            className="w-full py-3 border-2 border-dashed border-orange-300 text-orange-600 font-bold rounded-xl text-sm hover:bg-orange-50 transition-all disabled:opacity-70"
          >
            تسجيل الدخول تجريبي بدون كلمة مرور
          </button>

          <p className="text-center text-xs text-gray-400 mt-6">
            نظام ريڤيو لإدارة المطاعم · جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </div>
  )
}
