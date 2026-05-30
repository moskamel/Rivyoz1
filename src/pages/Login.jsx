import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Flash, Sun, Moon } from 'iconsax-react'

const roles = [
  { id: 'owner', label: 'صاحب المطعم' },
  { id: 'manager', label: 'مدير الفرع' },
  { id: 'cashier', label: 'كاشير' },
  { id: 'kitchen', label: 'مطبخ' },
]

// Toast component
function Toast({ message, visible }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 24,
        left: '50%',
        transform: `translateX(-50%) translateY(${visible ? 0 : -80}px)`,
        opacity: visible ? 1 : 0,
        transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        background: '#1A1A1A',
        border: '1px solid rgba(249,115,22,0.35)',
        borderRadius: 12,
        padding: '12px 20px',
        fontSize: 14,
        fontWeight: 600,
        color: '#F0F0F0',
        zIndex: 9999,
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
      }}
    >
      <span style={{ color: 'var(--accent)', marginLeft: 8 }}>✓</span>
      {message}
    </div>
  )
}

// OTP single digit input box
function OtpBox({ value, inputRef, onChange, onKeyDown, onPaste }) {
  return (
    <input
      ref={inputRef}
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onPaste={onPaste}
      style={{
        width: 56,
        height: 64,
        borderRadius: 12,
        border: '2px solid var(--border)',
        background: 'var(--surface-2)',
        color: 'var(--text)',
        fontSize: 28,
        fontWeight: 700,
        fontFamily: 'Inter, sans-serif',
        textAlign: 'center',
        outline: 'none',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        caretColor: 'var(--accent)',
        flexShrink: 0,
      }}
      onFocus={e => {
        e.target.style.borderColor = 'var(--accent)'
        e.target.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.15)'
      }}
      onBlur={e => {
        e.target.style.borderColor = value ? 'var(--border-strong)' : 'var(--border)'
        e.target.style.boxShadow = 'none'
      }}
    />
  )
}

export default function Login() {
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState(null)
  const [step, setStep] = useState(1) // 1 = phone, 2 = otp
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ message: '', visible: false })
  const [timerSecs, setTimerSecs] = useState(120)
  const [timerActive, setTimerActive] = useState(false)
  const otpRefs = useRef([])
  const timerRef = useRef(null)

  // Timer countdown
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
    if (d.length >= 7) {
      return '+966 ' + d.slice(1, 3) + 'XXXX' + d.slice(-2)
    }
    return '+966 ' + d
  }

  function sendOtp() {
    if (phone.replace(/\D/g, '').length < 10) return
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
    if (digit && index < 5) {
      otpRefs.current[index + 1]?.focus()
    }
  }

  function handleOtpKeyDown(index, e) {
    if (e.key === 'Backspace') {
      if (otp[index]) {
        const newOtp = [...otp]
        newOtp[index] = ''
        setOtp(newOtp)
      } else if (index > 0) {
        otpRefs.current[index - 1]?.focus()
      }
    } else if (e.key === 'ArrowLeft' && index < 5) {
      otpRefs.current[index + 1]?.focus()
    } else if (e.key === 'ArrowRight' && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  function handleOtpPaste(e) {
    e.preventDefault()
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    const newOtp = ['', '', '', '', '', '']
    for (let i = 0; i < text.length; i++) newOtp[i] = text[i]
    setOtp(newOtp)
    const nextEmpty = text.length < 6 ? text.length : 5
    otpRefs.current[nextEmpty]?.focus()
  }

  function verifyOtp() {
    if (otp.join('').length < 6) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      localStorage.setItem('auth_role', selectedRole || 'owner')
      navigate('/')
    }, 800)
  }

  function demoLogin() {
    localStorage.setItem('auth_role', selectedRole || 'owner')
    navigate('/')
  }

  const [isDark, setIsDark] = useState(() => localStorage.getItem('c_theme') === 'dark')
  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    localStorage.setItem('c_theme', next ? 'dark' : 'light')
  }

  const phoneValid = phone.replace(/\D/g, '').length >= 10
  const otpComplete = otp.join('').length === 6

  return (
    <div data-theme={isDark ? undefined : 'light'} style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg)' }} dir="rtl">
      <button
        onClick={toggleTheme}
        style={{
          position: 'fixed',
          top: 16,
          left: 16,
          width: 38,
          height: 38,
          borderRadius: 10,
          background: 'var(--surface-2)',
          border: '1.5px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 100,
          transition: 'all .15s',
        }}
      >
        {isDark ? <Sun size={18} color="#F97316" /> : <Moon size={18} color="#6C757D" />}
      </button>
      <Toast message={toast.message} visible={toast.visible} />

      {/* Left panel — brand (hidden on mobile, shown on desktop) */}
      <div
        style={{
          display: 'none',
          width: '50%',
          background: 'linear-gradient(135deg, #F97316 0%, #EA6C10 60%, #D97706 100%)',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 48,
          position: 'relative',
          overflow: 'hidden',
        }}
        className="lg:flex"
      >
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', bottom: -100, left: -60, width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
            <Flash size={40} color="white" strokeWidth={2.5} />
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
        <div style={{ width: '100%', maxWidth: 420 }}>
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div style={{ width: 38, height: 38, background: 'linear-gradient(135deg, #F97316, #EA6C10)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Flash size={20} color="white" strokeWidth={2.5} />
            </div>
            <p style={{ fontSize: 20, fontWeight: 900, color: 'var(--text)' }}>ريڤيو</p>
          </div>

          <h2 style={{ fontSize: 26, fontWeight: 900, color: 'var(--text)', marginBottom: 6, letterSpacing: '-0.02em' }}>
            {step === 1 ? 'أهلاً بعودتك 👋' : 'أدخل رمز التحقق'}
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text-2)', marginBottom: 28 }}>
            {step === 1
              ? 'سجّل دخولك لإدارة مطعمك'
              : `أدخل الرمز المُرسَل إلى ${maskedPhone()}`}
          </p>

          {/* Role selector — visible on both steps */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.08em', marginBottom: 10 }}>اختر دورك</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {roles.map(role => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    border: `1px solid ${selectedRole === role.id ? 'var(--accent)' : 'var(--border)'}`,
                    background: selectedRole === role.id ? 'var(--accent-muted)' : 'var(--surface)',
                    color: selectedRole === role.id ? 'var(--accent)' : 'var(--text-2)',
                    fontFamily: 'Zain, sans-serif',
                  }}
                >
                  {role.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 1: Call entry */}
          {step === 1 && (
            <div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6 }}>
                  رقم الجوال
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(formatPhone(e.target.value))}
                    placeholder="05xxxxxxxx"
                    onKeyDown={e => e.key === 'Enter' && phoneValid && !loading && sendOtp()}
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 52px',
                      borderRadius: 12,
                      border: '1px solid var(--border)',
                      background: 'var(--surface-2)',
                      color: 'var(--text)',
                      fontSize: 16,
                      fontFamily: 'Inter, sans-serif',
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.15s',
                      direction: 'ltr',
                      textAlign: 'left',
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                  <span style={{
                    position: 'absolute',
                    left: 14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: 13,
                    color: 'var(--text-3)',
                    fontFamily: 'Inter, sans-serif',
                    pointerEvents: 'none',
                  }}>
                    🇸🇦 +966
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={sendOtp}
                disabled={loading || !phoneValid}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: phoneValid ? 'var(--accent)' : 'var(--surface-3)',
                  color: phoneValid ? 'white' : 'var(--text-3)',
                  fontWeight: 700,
                  borderRadius: 12,
                  border: 'none',
                  cursor: loading || !phoneValid ? 'not-allowed' : 'pointer',
                  fontSize: 15,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transition: 'all 0.15s',
                  opacity: loading ? 0.75 : 1,
                  boxShadow: phoneValid ? '0 4px 20px rgba(249,115,22,0.25)' : 'none',
                  fontFamily: 'Zain, sans-serif',
                }}
              >
                {loading ? (
                  <span style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                ) : (
                  'إرسال رمز التحقق'
                )}
              </button>
            </div>
          )}

          {/* Step 2: OTP entry */}
          {step === 2 && (
            <div>
              {/* 6 OTP boxes */}
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 24, direction: 'ltr' }}>
                {otp.map((digit, i) => (
                  <OtpBox
                    key={i}
                    value={digit}
                    inputRef={el => otpRefs.current[i] = el}
                    onChange={e => handleOtpChange(i, e.target.value)}
                    onKeyDown={e => handleOtpKeyDown(i, e)}
                    onPaste={i === 0 ? handleOtpPaste : undefined}
                  />
                ))}
              </div>

              {/* Timer */}
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                {timerSecs > 0 ? (
                  <p style={{ fontSize: 13, color: 'var(--text-2)', fontFamily: 'Zain, sans-serif' }}>
                    انتهاء صلاحية الرمز خلال{' '}
                    <span style={{ color: 'var(--accent)', fontFamily: 'Inter', fontWeight: 700 }}>
                      {formatTimer(timerSecs)}
                    </span>
                  </p>
                ) : (
                  <p style={{ fontSize: 13, color: 'var(--text-2)', fontFamily: 'Zain, sans-serif' }}>
                    لم تستلم الرمز؟{' '}
                    <button
                      type="button"
                      onClick={resendOtp}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--accent)',
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontSize: 13,
                        fontFamily: 'Zain, sans-serif',
                        textDecoration: 'underline',
                        padding: 0,
                      }}
                    >
                      إعادة إرسال الرمز
                    </button>
                  </p>
                )}
              </div>

              {/* Verify button */}
              <button
                type="button"
                onClick={verifyOtp}
                disabled={loading || !otpComplete}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: otpComplete ? 'var(--accent)' : 'var(--surface-3)',
                  color: otpComplete ? 'white' : 'var(--text-3)',
                  fontWeight: 700,
                  borderRadius: 12,
                  border: 'none',
                  cursor: loading || !otpComplete ? 'not-allowed' : 'pointer',
                  fontSize: 15,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transition: 'all 0.15s',
                  opacity: loading ? 0.75 : 1,
                  boxShadow: otpComplete ? '0 4px 20px rgba(249,115,22,0.25)' : 'none',
                  fontFamily: 'Zain, sans-serif',
                  marginBottom: 12,
                }}
              >
                {loading ? (
                  <span style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                ) : (
                  'تحقق والدخول'
                )}
              </button>

              {/* Back to phone step */}
              <button
                type="button"
                onClick={() => { setStep(1); setTimerActive(false) }}
                style={{
                  width: '100%',
                  padding: '10px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-3)',
                  fontSize: 13,
                  cursor: 'pointer',
                  fontFamily: 'Zain, sans-serif',
                }}
              >
                ← تغيير رقم الجوال
              </button>
            </div>
          )}

          {/* Divider */}
          <div style={{ position: 'relative', margin: '20px 0' }}>
            <div style={{ height: 1, background: 'var(--border)' }} />
            <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'var(--bg)', padding: '0 12px', fontSize: 12, color: 'var(--text-3)' }}>أو</span>
          </div>

          {/* Demo login button */}
          <button
            type="button"
            onClick={demoLogin}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px dashed var(--border)',
              color: 'var(--accent)',
              fontWeight: 700,
              borderRadius: 12,
              fontSize: 14,
              background: 'transparent',
              cursor: 'pointer',
              transition: 'all 0.15s',
              fontFamily: 'Zain, sans-serif',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-muted)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'transparent' }}
          >
            دخول تجريبي بدون رمز
          </button>

          <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-3)', marginTop: 24 }}>
            نظام ريڤيو لإدارة المطاعم · جميع الحقوق محفوظة
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
