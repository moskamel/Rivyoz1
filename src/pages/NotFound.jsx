import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div dir="rtl" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)', flexDirection: 'column', gap: 16, padding: 32, textAlign: 'center',
    }}>
      <div style={{ fontSize: 64, fontWeight: 900, color: 'var(--accent)', fontFamily: 'Inter, sans-serif', lineHeight: 1 }}>
        404
      </div>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', margin: 0, fontFamily: 'Zain, sans-serif' }}>
        الصفحة غير موجودة
      </h1>
      <p style={{ fontSize: 14, color: 'var(--text-3)', margin: 0, fontFamily: 'Zain, sans-serif', maxWidth: 360 }}>
        الرابط الذي تبحث عنه غير موجود أو تم حذفه.
      </p>
      <button
        onClick={() => navigate(-1)}
        style={{
          padding: '10px 24px', background: 'var(--accent)', color: 'white',
          border: 'none', borderRadius: 999, fontSize: 14, fontWeight: 700,
          cursor: 'pointer', fontFamily: 'Zain, sans-serif',
        }}
      >
        ← رجوع
      </button>
    </div>
  )
}
