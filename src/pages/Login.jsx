import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Flash, Sun, Moon } from 'iconsax-react'

const roles = [
  { id: 'owner', label: 'صاحب المطعم' },
  { id: 'manager', label: 'مدير الفرع' },
  { id: 'cashier', label: 'كاشير' },
  { id: 'kitchen', label: 'مطبخ' },
]

function Toast({ message, visible }) {
  return (
    <div style={{
      position: 'fixed', top: 24, left: '50%',
      transform: `translateX(-50%) translateY(${visible ? 0 : -80}px)`,
      opacity: visible ? 1 : 0,
      transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
      background: '#1A1A1A', border: '1px solid rgba(249,115,22,0.35)',
      borderRadius: 12, padding: '12px 20px', fontSize: 14, fontWeight: 600,
      color: '#F0F0F0', zIndex: 9999, boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      whiteSpace: 'nowrap', pointerEvents: 'none',
    }}>
      <span style={{ color: 'var(--accent)', marginLeft: 8 }}>✓</span>{message}
    </div>
  )
}

function OtpBox({ value, inputRef, onChange, onKeyDown, onPaste }) {
  return (
    <input
      ref={inputRef} type="text" inputMode="numeric" maxLength={1} value={value}
      onChange={onChange} onKeyDown={onKeyDown} onPaste={onPaste}
      style={{
        width: 52, height: 60, borderRadius: 12, border: '2px solid var(--border)',
        background: 'var(--surface-2)', color: 'var(--text)', fontSize: 26,
        fontWeight: 700, fontFamily: 'Inter, sans-serif', textAlign: 'center',
        outline: 'none', transition: 'border-color 0.15s, box-shadow 0.15s',
        caretColor: 'var(--accent)', flexShrink: 0,
      }}
      onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.15)' }}
      onBlur={e => { e.target.style.borderColor = value ? 'var(--border-strong)' : 'var(--border)'; e.target.style.boxShadow = 'none' }}
    />
  )
}

function FieldInput({ label, value, onChange, placeholder, type = 'text', dir, prefix }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6 }}>{label}</label>
      <div style={{ position: 'relative' }}>
        {prefix && (
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: 'var(--text-3)', fontFamily: 'Inter, sans-serif', pointerEvents: 'none' }}>
            {prefix}
          </span>
        )}
        <input
          type={type} value={value} onChange={onChange} placeholder={placeholder}
          style={{
            width: '100%', padding: prefix ? '12px 14px 12px 80px' : '12px 14px',
            borderRadius: 12, border: '1.5px solid var(--border)',
            background: 'var(--surface-2)', color: 'var(--text)', fontSize: 15,
            fontFamily: dir === 'ltr' ? 'Inter, sans-serif' : 'Zain, sans-serif',
            outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s',
            direction: dir || 'rtl',
          }}
          onFocus={e => e.target.style.borderColor = 'var(--accent)'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />
      </div>
    </div>
  )
}

export default function Login() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [selectedRole, setSelectedRole] = useState('owner')
  const [step, setStep] = useState(1) // 1 = form, 2 = otp
  const [phone, setPhone] = useState('')
  // sign-up extra fields
  const [restaurantName, setRestaurantName] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ message: '', visible: false })
  const [timerSecs, setTimerSecs] = useState(120)
  const [timerActive, setTimerActive] = useState(false)
  const otpRefs = useRef([])
  const timerRef = useRef(null)

  const [isDark, setIsDark] = useState(() => localStorage.getItem('c_theme') === 'dark')
  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    localStorage.setItem('c_theme', next ? 'dark' : 'light')
  }

  useEffect(() => {
    if (timerActive && timerSecs > 0) {
      timerRef.current = setTimeout(() => setTimerSecs(s => s - 1), 1000)
    }
    return () => clearTimeout(timerRef.current)
  }, [timerActive, timerSecs])

  const showToast = useCallback((msg) => {
    setToast({ message: msg, visible: true })
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3500)
  }, [])

  const formatPhone = (raw) => {
    const digits = raw.replace(/\D/g, '')
    if (digits.startsWith('05') && digits.length <= 10) return digits
    if (digits.startsWith('5') && digits.length <= 9) return '0' + digits
    return raw
  }

  const formatTimer = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, '0')
    const s = String(secs % 60).padStart(2, '0')
    return `${m}:${s}`
  }

  const maskedPhone = () => {
    const d = phone.replace(/\D/g, '')
    if (d.length >= 7) return '+966 ' + d.slice(1, 3) + 'XXXX' + d.slice(-2)
    return '+966 ' + d
  }

  const phoneValid = phone.replace(/\D/g, '').length >= 10
  const signupValid = mode === 'signup' ? (restaurantName.trim().length >= 2 && ownerName.trim().length >= 2 && phoneValid) : phoneValid
  const otpComplete = otp.join('').length === 6

  function sendOtp() {
    if (!signupValid || loading) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep(2)
      setTimerSecs(120)
      setTimerActive(true)
      setOtp(['', '', '', '', '', ''])
      showToast(`تم إرسال الرمز إلى ${maskedPhone()}`)
      setTimeout(() => otpRefs.current[0]?.focus(), 100)
    }, 1000)
  }

  function resendOtp() {
    if (timerSecs > 0) return
    setTimerSecs(120)
    setTimerActive(true)
    setOtp(['', '', '', '', '', ''])
    showToast(`تم إرسال الرمز إلى ${maskedPhone()}`)
    setTimeout(() => otpRefs.current[0]?.focus(), 100)
  }

  function handleOtpChange(index, val) {
    const digit = val.replace(/\D/g, '').slice(-1)
    const newOtp = [...otp]
    newOtp[index] = digit
    setOtp(newOtp)
    if (digit && index < 5) otpRefs.current[index + 1]?.focus()
  }

  function handleOtpKeyDown(index, e) {
    if (e.key === 'Backspace') {
      if (otp[index]) { const n = [...otp]; n[index] = ''; setOtp(n) }
      else if (index > 0) otpRefs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowLeft' && index < 5) otpRefs.current[index + 1]?.focus()
    else if (e.key === 'ArrowRight' && index > 0) otpRefs.current[index - 1]?.focus()
  }

  function handleOtpPaste(e) {
    e.preventDefault()
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    const newOtp = ['', '', '', '', '', '']
    for (let i = 0; i < text.length; i++) newOtp[i] = text[i]
    setOtp(newOtp)
    otpRefs.current[text.length < 6 ? text.length : 5]?.focus()
  }

  function verifyOtp() {
    if (!otpComplete || loading) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      localStorage.setItem('auth_role', selectedRole)
      navigate('/')
    }, 800)
  }

  function demoLogin() {
    localStorage.setItem('auth_role', selectedRole)
    navigate('/')
  }

  function switchMode(m) {
    setMode(m)
    setStep(1)
    setPhone('')
    setOtp(['', '', '', '', '', ''])
    setTimerActive(false)
    setRestaurantName('')
    setOwnerName('')
    if (m === 'login') setSelectedRole('owner')
  }

  // Brand panel bullets
  const loginBullets = [
    { icon: '⚡', t: 'وصول فوري لإدارة طلباتك' },
    { icon: '📊', t: 'تقارير مبيعاتك لحظة بلحظة' },
    { icon: '🔐', t: 'حسابك محمي بالكامل' },
  ]
  const signupBullets = [
    { icon: '🚀', t: 'إعداد مطعمك في أقل من 5 دقائق' },
    { icon: '💰', t: 'صفر عمولة على طلباتك' },
    { icon: '📈', t: 'أدوات تسويق وولاء مدمجة' },
  ]
  const bullets = mode === 'login' ? loginBullets : signupBullets

  return (
    <div data-theme={isDark ? undefined : 'light'} style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg)' }} dir="rtl">
      {/* Theme toggle */}
      <button onClick={toggleTheme} style={{
        position: 'fixed', top: 16, left: 16, width: 38, height: 38, borderRadius: 999,
        background: 'var(--surface-2)', border: '1.5px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', zIndex: 100, transition: 'all .15s',
      }}>
        {isDark ? <Sun size={18} color="#F97316" /> : <Moon size={18} color="#6C757D" />}
      </button>

      <Toast message={toast.message} visible={toast.visible} />

      {/* ── Left brand panel ── */}
      <div style={{
        display: 'none', width: '46%',
        background: 'linear-gradient(145deg, #F97316 0%, #EA6C10 55%, #C25905 100%)',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: 52, position: 'relative', overflow: 'hidden',
      }} className="lg:flex">
        <div style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ position: 'absolute', bottom: -100, left: -60, width: 360, height: 360, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', width: '100%' }}>
          <div style={{ width: 76, height: 76, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
            <Flash size={38} color="white" />
          </div>
          <h1 style={{ fontSize: 40, fontWeight: 900, color: 'white', marginBottom: 8, letterSpacing: '-0.02em', fontFamily: 'Zain, sans-serif' }}>Fazz</h1>
          <p style={{ fontSize: 16, fontWeight: 600, color: 'rgba(255,255,255,0.85)', marginBottom: 6, fontFamily: 'Zain, sans-serif' }}>
            {mode === 'login' ? 'مرحباً بعودتك 👋' : 'انضم لـ +٥٠٠ مطعم 🚀'}
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, maxWidth: 260, margin: '0 auto 36px', fontFamily: 'Zain, sans-serif' }}>
            {mode === 'login'
              ? 'أدر طلباتك، قائمتك، وفريقك من مكان واحد'
              : 'نظام إدارة ذكي بدون عمولة — ابدأ مجانًا اليوم'}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'right' }}>
            {bullets.map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.10)', borderRadius: 14, padding: '12px 16px' }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{b.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'white', fontFamily: 'Zain, sans-serif' }}>{b.t}</span>
              </div>
            ))}
          </div>

          {mode === 'signup' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginTop: 28 }}>
              {[{ n: '٠%', l: 'عمولة' }, { n: '+٥٠٠', l: 'مطعم' }, { n: '٢٤/٧', l: 'دعم' }].map((s, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 14, padding: '14px 8px', textAlign: 'center' }}>
                  <p style={{ fontSize: 20, fontWeight: 900, color: 'white', fontFamily: 'Zain, sans-serif' }}>{s.n}</p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 4, fontFamily: 'Zain, sans-serif' }}>{s.l}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 24px', overflowY: 'auto' }}>
        <div style={{ width: '100%', maxWidth: 430 }}>

          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #F97316, #EA6C10)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Flash size={18} color="white" />
            </div>
            <p style={{ fontSize: 20, fontWeight: 900, color: 'var(--text)', fontFamily: 'Zain, sans-serif' }}>Fazz</p>
          </div>

          {/* Mode tabs */}
          <div style={{ display: 'flex', background: 'var(--surface-2)', borderRadius: 14, padding: 4, marginBottom: 28, border: '1.5px solid var(--border)' }}>
            {[{ k: 'login', l: 'تسجيل الدخول' }, { k: 'signup', l: 'إنشاء حساب' }].map(t => (
              <button key={t.k} onClick={() => switchMode(t.k)} style={{
                flex: 1, padding: '10px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
                fontFamily: 'Zain, sans-serif', fontSize: 14, fontWeight: 700,
                background: mode === t.k ? 'var(--accent)' : 'transparent',
                color: mode === t.k ? 'white' : 'var(--text-3)',
                transition: 'all 0.2s',
                boxShadow: mode === t.k ? '0 4px 14px rgba(249,115,22,0.3)' : 'none',
              }}>{t.l}</button>
            ))}
          </div>

          {/* Heading */}
          <h2 style={{ fontSize: 24, fontWeight: 900, color: 'var(--text)', marginBottom: 4, letterSpacing: '-0.02em', fontFamily: 'Zain, sans-serif' }}>
            {step === 2
              ? 'أدخل رمز التحقق'
              : mode === 'login' ? 'أهلاً بعودتك 👋' : 'أنشئ حسابك الآن 🚀'}
          </h2>
          <p style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 24, fontFamily: 'Zain, sans-serif' }}>
            {step === 2
              ? `أدخل الرمز المُرسَل إلى ${maskedPhone()}`
              : mode === 'login' ? 'سجّل دخولك لإدارة مطعمك' : 'أنضم إلى مئات المطاعم المستخدمة لـ Fazz'}
          </p>

          {/* ── Step 1: Form ── */}
          {step === 1 && (
            <div>
              {/* Sign-up extra fields */}
              {mode === 'signup' && (
                <>
                  <FieldInput
                    label="اسم المطعم *"
                    value={restaurantName}
                    onChange={e => setRestaurantName(e.target.value)}
                    placeholder="مثال: مطعم الشيف أحمد"
                  />
                  <FieldInput
                    label="اسم صاحب المطعم *"
                    value={ownerName}
                    onChange={e => setOwnerName(e.target.value)}
                    placeholder="الاسم الكامل"
                  />
                </>
              )}

              {/* Role selector — login only */}
              {mode === 'login' && (
                <div style={{ marginBottom: 20 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.07em', marginBottom: 10, fontFamily: 'Zain, sans-serif' }}>اختر دورك</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {roles.map(role => (
                      <button key={role.id} type="button" onClick={() => setSelectedRole(role.id)} style={{
                        padding: '10px 14px', borderRadius: 999, fontSize: 13, fontWeight: 600,
                        cursor: 'pointer', transition: 'all 0.15s',
                        border: `1.5px solid ${selectedRole === role.id ? 'var(--accent)' : 'var(--border)'}`,
                        background: selectedRole === role.id ? 'var(--accent-muted)' : 'var(--surface)',
                        color: selectedRole === role.id ? 'var(--accent)' : 'var(--text-2)',
                        fontFamily: 'Zain, sans-serif',
                      }}>{role.label}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* Phone field */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6, fontFamily: 'Zain, sans-serif' }}>رقم الجوال *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="tel" value={phone}
                    onChange={e => setPhone(formatPhone(e.target.value))}
                    placeholder="05xxxxxxxx"
                    onKeyDown={e => e.key === 'Enter' && signupValid && !loading && sendOtp()}
                    style={{
                      width: '100%', padding: '12px 14px 12px 84px',
                      borderRadius: 12, border: '1.5px solid var(--border)',
                      background: 'var(--surface-2)', color: 'var(--text)',
                      fontSize: 15, fontFamily: 'Inter, sans-serif',
                      outline: 'none', boxSizing: 'border-box',
                      transition: 'border-color 0.15s', direction: 'ltr', textAlign: 'left',
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                  <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: 'var(--text-3)', fontFamily: 'Inter, sans-serif', pointerEvents: 'none' }}>
                    🇸🇦 +966
                  </span>
                </div>
              </div>

              <button type="button" onClick={sendOtp} disabled={loading || !signupValid} style={{
                width: '100%', padding: '14px',
                background: signupValid ? 'var(--accent)' : 'var(--surface-3)',
                color: signupValid ? 'white' : 'var(--text-3)',
                fontWeight: 700, borderRadius: 999, border: 'none',
                cursor: loading || !signupValid ? 'not-allowed' : 'pointer',
                fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'all 0.15s', opacity: loading ? 0.75 : 1,
                boxShadow: signupValid ? '0 4px 20px rgba(249,115,22,0.28)' : 'none',
                fontFamily: 'Zain, sans-serif',
              }}>
                {loading
                  ? <span style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                  : 'إرسال رمز التحقق'}
              </button>
            </div>
          )}

          {/* ── Step 2: OTP ── */}
          {step === 2 && (
            <div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 24, direction: 'ltr' }}>
                {otp.map((digit, i) => (
                  <OtpBox key={i} value={digit}
                    inputRef={el => otpRefs.current[i] = el}
                    onChange={e => handleOtpChange(i, e.target.value)}
                    onKeyDown={e => handleOtpKeyDown(i, e)}
                    onPaste={i === 0 ? handleOtpPaste : undefined}
                  />
                ))}
              </div>

              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                {timerSecs > 0 ? (
                  <p style={{ fontSize: 13, color: 'var(--text-2)', fontFamily: 'Zain, sans-serif' }}>
                    انتهاء صلاحية الرمز خلال{' '}
                    <span style={{ color: 'var(--accent)', fontFamily: 'Inter', fontWeight: 700 }}>{formatTimer(timerSecs)}</span>
                  </p>
                ) : (
                  <p style={{ fontSize: 13, color: 'var(--text-2)', fontFamily: 'Zain, sans-serif' }}>
                    لم تستلم الرمز؟{' '}
                    <button type="button" onClick={resendOtp} style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 700, cursor: 'pointer', fontSize: 13, fontFamily: 'Zain, sans-serif', textDecoration: 'underline', padding: 0 }}>
                      إعادة إرسال الرمز
                    </button>
                  </p>
                )}
              </div>

              <button type="button" onClick={verifyOtp} disabled={loading || !otpComplete} style={{
                width: '100%', padding: '14px',
                background: otpComplete ? 'var(--accent)' : 'var(--surface-3)',
                color: otpComplete ? 'white' : 'var(--text-3)',
                fontWeight: 700, borderRadius: 999, border: 'none',
                cursor: loading || !otpComplete ? 'not-allowed' : 'pointer',
                fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'all 0.15s', opacity: loading ? 0.75 : 1,
                boxShadow: otpComplete ? '0 4px 20px rgba(249,115,22,0.25)' : 'none',
                fontFamily: 'Zain, sans-serif', marginBottom: 12,
              }}>
                {loading
                  ? <span style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                  : mode === 'login' ? 'تحقق والدخول' : 'إنشاء الحساب والدخول'}
              </button>

              <button type="button" onClick={() => { setStep(1); setTimerActive(false) }} style={{
                width: '100%', padding: '10px', background: 'none', border: 'none',
                color: 'var(--text-3)', fontSize: 13, cursor: 'pointer', fontFamily: 'Zain, sans-serif',
              }}>
                ← تغيير رقم الجوال
              </button>
            </div>
          )}

          {/* Divider */}
          <div style={{ position: 'relative', margin: '22px 0' }}>
            <div style={{ height: 1, background: 'var(--border)' }} />
            <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'var(--bg)', padding: '0 12px', fontSize: 12, color: 'var(--text-3)', fontFamily: 'Zain, sans-serif' }}>أو</span>
          </div>

          {/* Demo login */}
          <button type="button" onClick={demoLogin} style={{
            width: '100%', padding: '12px', border: '2px dashed var(--border)',
            color: 'var(--accent)', fontWeight: 700, borderRadius: 999, fontSize: 14,
            background: 'transparent', cursor: 'pointer', transition: 'all 0.15s',
            fontFamily: 'Zain, sans-serif',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-muted)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'transparent' }}
          >
            دخول تجريبي بدون رمز
          </button>

          <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-3)', marginTop: 22, fontFamily: 'Zain, sans-serif' }}>
            Fazz · نظام إدارة المطاعم · جميع الحقوق محفوظة
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
