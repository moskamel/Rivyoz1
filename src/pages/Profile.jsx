import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import { Camera, Save, Lock, Shield, LogOut, ChevronLeft } from 'lucide-react'

const roleLabels = {
  owner: 'صاحب المطعم',
  manager: 'مدير الفرع',
  cashier: 'كاشير',
  kitchen: 'مطبخ',
}

const roleInitials = {
  owner: 'ص م',
  manager: 'م ف',
  cashier: 'ك',
  kitchen: 'م',
}

const roleColors = {
  owner: '#F97316',
  manager: '#8B5CF6',
  cashier: '#06B6D4',
  kitchen: '#22C55E',
}

const inputStyle = {
  width: '100%',
  padding: '11px 14px',
  borderRadius: 10,
  border: '1px solid var(--border)',
  background: 'var(--surface-2)',
  color: 'var(--text)',
  fontSize: 14,
  fontFamily: 'Cairo, sans-serif',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.15s',
}

function SectionCard({ title, children }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 16,
      padding: 24,
      marginBottom: 16,
    }}>
      {title && (
        <h3 style={{
          fontSize: 14,
          fontWeight: 700,
          color: 'var(--text)',
          marginBottom: 20,
          paddingBottom: 14,
          borderBottom: '1px solid var(--border)',
          letterSpacing: '-0.01em',
        }}>
          {title}
        </h3>
      )}
      {children}
    </div>
  )
}

function FormField({ label, value, onChange, type = 'text', placeholder = '' }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6 }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={inputStyle}
        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
        onBlur={e => e.target.style.borderColor = 'var(--border)'}
      />
    </div>
  )
}

function Toggle({ label, description, enabled, onToggle }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 0',
      borderBottom: '1px solid var(--border)',
    }}>
      <div>
        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{label}</p>
        {description && <p style={{ fontSize: 12, color: 'var(--text-2)' }}>{description}</p>}
      </div>
      <button
        onClick={onToggle}
        style={{
          width: 44,
          height: 24,
          borderRadius: 12,
          background: enabled ? 'var(--accent)' : 'var(--surface-3)',
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
          transition: 'background 0.2s',
          flexShrink: 0,
        }}
      >
        <span style={{
          position: 'absolute',
          top: 3,
          right: enabled ? 3 : 23,
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: 'white',
          transition: 'right 0.2s',
          display: 'block',
          boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
        }} />
      </button>
    </div>
  )
}

export default function Profile() {
  const navigate = useNavigate()
  const role = localStorage.getItem('auth_role') || 'owner'
  const roleLabel = roleLabels[role] || 'صاحب المطعم'
  const initials = roleInitials[role] || 'ص'
  const accentColor = roleColors[role] || '#F97316'

  const [personalInfo, setPersonalInfo] = useState({
    name: 'أحمد العمري',
    email: 'ahmed@restaurant.com',
    phone: '0512345678',
  })

  const [restaurantInfo, setRestaurantInfo] = useState({
    name: 'مطعم الشيف أحمد',
    address: 'الرياض، حي العليا، شارع التحلية',
    phone: '0112223344',
  })

  const [security, setSecurity] = useState({
    twoFactor: false,
    notifications: true,
  })

  const [savedPersonal, setSavedPersonal] = useState(false)
  const [savedRestaurant, setSavedRestaurant] = useState(false)

  function handleSavePersonal() {
    setSavedPersonal(true)
    setTimeout(() => setSavedPersonal(false), 2000)
  }

  function handleSaveRestaurant() {
    setSavedRestaurant(true)
    setTimeout(() => setSavedRestaurant(false), 2000)
  }

  function handleLogout() {
    localStorage.removeItem('auth_role')
    navigate('/login')
  }

  return (
    <Layout title="الملف الشخصي">
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '24px 24px 48px' }} dir="rtl">

        {/* Profile header card */}
        <SectionCard>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            {/* Avatar */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${accentColor}33, ${accentColor}66)`,
                border: `2px solid ${accentColor}55`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                fontWeight: 900,
                color: accentColor,
                fontFamily: 'Cairo, sans-serif',
                letterSpacing: '-0.02em',
              }}>
                {initials}
              </div>
              <button
                style={{
                  position: 'absolute',
                  bottom: -2,
                  left: -2,
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  border: '2px solid var(--bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'white',
                }}
                title="تعديل الصورة"
              >
                <Camera size={12} strokeWidth={2.5} />
              </button>
            </div>

            {/* Name + role */}
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: 20, fontWeight: 900, color: 'var(--text)', marginBottom: 6, letterSpacing: '-0.02em' }}>
                {personalInfo.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '4px 12px',
                  borderRadius: 20,
                  background: `${accentColor}18`,
                  border: `1px solid ${accentColor}35`,
                  color: accentColor,
                  fontSize: 12,
                  fontWeight: 700,
                  fontFamily: 'Cairo, sans-serif',
                }}>
                  {roleLabel}
                </span>
                <span style={{ fontSize: 12, color: 'var(--text-3)' }}>
                  {personalInfo.email}
                </span>
              </div>
            </div>

            {/* Edit avatar button (desktop) */}
            <button
              style={{
                padding: '8px 16px',
                borderRadius: 10,
                border: '1px solid var(--border)',
                background: 'var(--surface-2)',
                color: 'var(--text-2)',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontFamily: 'Cairo, sans-serif',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-2)' }}
            >
              <Camera size={14} strokeWidth={2} />
              تعديل الصورة
            </button>
          </div>
        </SectionCard>

        {/* Personal info form */}
        <SectionCard title="المعلومات الشخصية">
          <FormField
            label="الاسم الكامل"
            value={personalInfo.name}
            onChange={v => setPersonalInfo(p => ({ ...p, name: v }))}
            placeholder="الاسم الكامل"
          />
          <FormField
            label="البريد الإلكتروني"
            type="email"
            value={personalInfo.email}
            onChange={v => setPersonalInfo(p => ({ ...p, email: v }))}
            placeholder="example@restaurant.com"
          />
          <FormField
            label="رقم الجوال"
            type="tel"
            value={personalInfo.phone}
            onChange={v => setPersonalInfo(p => ({ ...p, phone: v }))}
            placeholder="05xxxxxxxx"
          />
          <button
            onClick={handleSavePersonal}
            style={{
              padding: '10px 24px',
              borderRadius: 10,
              background: savedPersonal ? '#22C55E' : 'var(--accent)',
              border: 'none',
              color: 'white',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.2s',
              fontFamily: 'Cairo, sans-serif',
              boxShadow: '0 4px 14px rgba(249,115,22,0.2)',
            }}
          >
            <Save size={14} strokeWidth={2.5} />
            {savedPersonal ? 'تم الحفظ ✓' : 'حفظ التغييرات'}
          </button>
        </SectionCard>

        {/* Restaurant info */}
        <SectionCard title="معلومات المطعم">
          <FormField
            label="اسم المطعم"
            value={restaurantInfo.name}
            onChange={v => setRestaurantInfo(r => ({ ...r, name: v }))}
            placeholder="اسم المطعم"
          />
          <FormField
            label="العنوان"
            value={restaurantInfo.address}
            onChange={v => setRestaurantInfo(r => ({ ...r, address: v }))}
            placeholder="المدينة، الحي، الشارع"
          />
          <FormField
            label="رقم هاتف المطعم"
            type="tel"
            value={restaurantInfo.phone}
            onChange={v => setRestaurantInfo(r => ({ ...r, phone: v }))}
            placeholder="011xxxxxxx"
          />
          <button
            onClick={handleSaveRestaurant}
            style={{
              padding: '10px 24px',
              borderRadius: 10,
              background: savedRestaurant ? '#22C55E' : 'var(--accent)',
              border: 'none',
              color: 'white',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.2s',
              fontFamily: 'Cairo, sans-serif',
              boxShadow: '0 4px 14px rgba(249,115,22,0.2)',
            }}
          >
            <Save size={14} strokeWidth={2.5} />
            {savedRestaurant ? 'تم الحفظ ✓' : 'حفظ التغييرات'}
          </button>
        </SectionCard>

        {/* Security section */}
        <SectionCard title="الأمان والخصوصية">
          <Toggle
            label="تغيير كلمة المرور"
            description="تحديث كلمة المرور الخاصة بحسابك"
            enabled={false}
            onToggle={() => {}}
          />
          <Toggle
            label="رمز التحقق الثنائي"
            description="حماية إضافية عند تسجيل الدخول"
            enabled={security.twoFactor}
            onToggle={() => setSecurity(s => ({ ...s, twoFactor: !s.twoFactor }))}
          />
          <Toggle
            label="إشعارات الأمان"
            description="تلقّي تنبيهات عند الدخول من جهاز جديد"
            enabled={security.notifications}
            onToggle={() => setSecurity(s => ({ ...s, notifications: !s.notifications }))}
          />

          <button
            style={{
              marginTop: 16,
              padding: '10px 20px',
              borderRadius: 10,
              border: '1px solid var(--border)',
              background: 'var(--surface-2)',
              color: 'var(--text-2)',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.15s',
              fontFamily: 'Cairo, sans-serif',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-2)' }}
          >
            <Lock size={14} strokeWidth={2} />
            تغيير كلمة المرور
          </button>
        </SectionCard>

        {/* Session info */}
        <SectionCard title="الجلسة الحالية">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: `${accentColor}18`,
                border: `1px solid ${accentColor}35`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Shield size={18} color={accentColor} strokeWidth={2} />
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>
                  جلسة نشطة
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{
                    display: 'inline-flex',
                    padding: '2px 10px',
                    borderRadius: 20,
                    background: `${accentColor}18`,
                    border: `1px solid ${accentColor}35`,
                    color: accentColor,
                    fontSize: 11,
                    fontWeight: 700,
                    fontFamily: 'Cairo, sans-serif',
                  }}>
                    {roleLabel}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--text-3)' }}>متصل الآن</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              style={{
                padding: '10px 20px',
                borderRadius: 10,
                border: '1px solid rgba(239,68,68,0.3)',
                background: 'rgba(239,68,68,0.08)',
                color: '#EF4444',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'all 0.15s',
                fontFamily: 'Cairo, sans-serif',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.15)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)' }}
            >
              <LogOut size={14} strokeWidth={2} />
              تسجيل الخروج
            </button>
          </div>
        </SectionCard>

      </div>
    </Layout>
  )
}
