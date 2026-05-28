import { useParams, useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function RestaurantPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', fontFamily: 'Cairo, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }} dir="rtl">
      <p style={{ fontSize: 48, marginBottom: 16 }}>🍽️</p>
      <h1 style={{ fontWeight: 900, fontSize: 20, color: '#1a1a1a', marginBottom: 8 }}>صفحة المطعم</h1>
      <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 24 }}>{slug || 'مطعم'}</p>
      <button
        onClick={() => navigate(-1)}
        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 20px', borderRadius: 12, background: '#F97316', color: 'white', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}
      >
        <ChevronRight size={16} />
        العودة
      </button>
    </div>
  )
}
