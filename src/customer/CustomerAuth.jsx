import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getConfig, getCustomerProfile, setCustomerProfile } from '../lib/restaurantStore'

function isValidEgyptPhone(p) {
  return /^(010|011|012|015)\d{8}$/.test(p.replace(/\s|-/g, ''))
}

export default function CustomerAuth() {
  const navigate = useNavigate()
  const location = useLocation()
  const config = getConfig()
  const color = config.color
  const from = location.state?.from || '/explore'

  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [errors, setErrors] = useState({})
  const [step, setStep] = useState('phone')

  if (getCustomerProfile()) {
    navigate(from, { replace: true })
    return null
  }

  const handlePhoneNext = () => {
    const e = {}
    if (!isValidEgyptPhone(phone)) e.phone = 'رقم هاتف غير صحيح (010/011/012/015 + 8 أرقام)'
    setErrors(e)
    if (!Object.keys(e).length) setStep('name')
  }

  const handleSubmit = () => {
    const e = {}
    if (!name.trim()) e.name = 'الاسم مطلوب'
    setErrors(e)
    if (!Object.keys(e).length) {
      setCustomerProfile({
        name: name.trim(),
        phone: phone.replace(/\s|-/g, ''),
        addresses: [],
        pointsSpent: 0,
        joinedAt: Date.now(),
      })
      navigate(from, { replace: true })
    }
  }

  const inputBase = {
    width: '100%', padding: '14px', borderRadius: 14,
    border: '1.5px solid #E5E7EB', fontSize: 15,
    fontFamily: 'Cairo, sans-serif', outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box', background: 'white', color: '#111827',
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #FFF7ED 0%, #F9FAFB 55%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '24px 20px', fontFamily: 'Cairo, sans-serif', direction: 'rtl',
    }}>
      {/* Logo */}
      <div style={{ marginBottom: 36, textAlign: 'center' }}>
        <div style={{
          width: 78, height: 78, borderRadius: 22, background: color,
          margin: '0 auto 16px', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: 38,
          boxShadow: `0 10px 36px ${color}55`,
        }}>
          🍽️
        </div>
        <h1 style={{ fontWeight: 900, fontSize: 24, color: '#111827', marginBottom: 6 }}>
          {step === 'phone' ? 'مرحباً بك' : 'أهلاً! 👋'}
        </h1>
        <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7 }}>
          {step === 'phone' ? 'أدخل رقم هاتفك المصري للمتابعة' : 'أخبرنا باسمك لنكمل طلبك'}
        </p>
      </div>

      <div style={{
        width: '100%', maxWidth: 390,
        background: 'white', borderRadius: 24,
        padding: '28px 24px', boxSizing: 'border-box',
        boxShadow: '0 8px 48px rgba(0,0,0,0.09)',
        border: '1px solid #F3F4F6',
      }}>
        {step === 'phone' ? (
          <>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 8 }}>
              رقم الهاتف
            </label>
            <input
              type="tel"
              value={phone}
              onChange={e => { setPhone(e.target.value); setErrors({}) }}
              onKeyDown={e => e.key === 'Enter' && handlePhoneNext()}
              placeholder="01xxxxxxxxx"
              autoFocus
              dir="ltr"
              style={{ ...inputBase, borderColor: errors.phone ? '#EF4444' : '#E5E7EB', textAlign: 'right' }}
              onFocus={e => { e.target.style.borderColor = color; e.target.style.boxShadow = `0 0 0 3px ${color}22` }}
              onBlur={e => { e.target.style.borderColor = errors.phone ? '#EF4444' : '#E5E7EB'; e.target.style.boxShadow = 'none' }}
            />
            {errors.phone && <p style={{ fontSize: 12, color: '#EF4444', marginTop: 6, fontWeight: 600 }}>{errors.phone}</p>}
            <button
              onClick={handlePhoneNext}
              style={{
                width: '100%', marginTop: 18, padding: '15px',
                borderRadius: 14, background: color, color: 'white',
                fontWeight: 800, fontSize: 15, border: 'none', cursor: 'pointer',
                fontFamily: 'Cairo, sans-serif', boxShadow: `0 6px 20px ${color}44`,
              }}
            >
              متابعة ←
            </button>
          </>
        ) : (
          <>
            <div style={{
              background: '#F9FAFB', borderRadius: 12, padding: '10px 14px',
              marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ fontSize: 18 }}>📱</span>
              <span style={{ fontSize: 14, color: '#374151', fontWeight: 600, fontFamily: 'Inter, monospace', direction: 'ltr' }}>
                {phone}
              </span>
            </div>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 8 }}>
              اسمك الكريم
            </label>
            <input
              type="text"
              value={name}
              onChange={e => { setName(e.target.value); setErrors({}) }}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="مثال: محمد أحمد"
              autoFocus
              style={{ ...inputBase, borderColor: errors.name ? '#EF4444' : '#E5E7EB' }}
              onFocus={e => { e.target.style.borderColor = color; e.target.style.boxShadow = `0 0 0 3px ${color}22` }}
              onBlur={e => { e.target.style.borderColor = errors.name ? '#EF4444' : '#E5E7EB'; e.target.style.boxShadow = 'none' }}
            />
            {errors.name && <p style={{ fontSize: 12, color: '#EF4444', marginTop: 6, fontWeight: 600 }}>{errors.name}</p>}
            <button
              onClick={handleSubmit}
              style={{
                width: '100%', marginTop: 18, padding: '15px',
                borderRadius: 14, background: color, color: 'white',
                fontWeight: 800, fontSize: 15, border: 'none', cursor: 'pointer',
                fontFamily: 'Cairo, sans-serif', boxShadow: `0 6px 20px ${color}44`,
              }}
            >
              ابدأ الطلب 🚀
            </button>
            <button
              onClick={() => setStep('phone')}
              style={{
                width: '100%', marginTop: 10, padding: '12px',
                borderRadius: 14, background: 'transparent', color: '#9CA3AF',
                fontWeight: 600, fontSize: 13, border: '1px solid #E5E7EB',
                cursor: 'pointer', fontFamily: 'Cairo, sans-serif',
              }}
            >
              تغيير الرقم
            </button>
          </>
        )}
      </div>

      <p style={{
        fontSize: 12, color: '#9CA3AF', marginTop: 24,
        textAlign: 'center', lineHeight: 1.7, maxWidth: 300,
      }}>
        بالمتابعة، أنت توافق على شروط الاستخدام وسياسة الخصوصية
      </p>
    </div>
  )
}
