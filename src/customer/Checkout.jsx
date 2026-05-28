import { useNavigate } from 'react-router-dom'
import { getConfig } from '../lib/restaurantStore'

export default function Checkout() {
  const navigate = useNavigate()
  const config = getConfig()
  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center' }} dir="rtl">
      <div style={{ textAlign: 'center', padding: 32 }}>
        <p style={{ fontSize: 40, marginBottom: 16 }}>⏳</p>
        <p style={{ fontSize: 16, fontWeight: 700, color: '#111' }}>صفحة الدفع</p>
        <p style={{ color: '#6B7280', fontSize: 13, marginTop: 8, marginBottom: 20 }}>قيد الإنشاء...</p>
        <button onClick={() => navigate('/cart')} style={{ padding: '12px 28px', borderRadius: 14, background: config.color, color: 'white', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}>
          العودة للسلة
        </button>
      </div>
    </div>
  )
}
