import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Plus, Trash2, Edit3 } from 'lucide-react'
import {
  getCustomerProfile, setCustomerProfile, clearCustomerProfile,
  getCustomerPoints, getCustomerOrders, getConfig,
} from '../lib/restaurantStore'
import CustomerNav from './CustomerNav'
import CustomerFooter from './CustomerFooter'

export default function CustomerProfile() {
  const navigate = useNavigate()
  const config = getConfig()
  const color = config.color
  const [profile, setProfileState] = useState(getCustomerProfile)
  const [editingName, setEditingName] = useState(false)
  const [newName, setNewName] = useState('')
  const [addingAddress, setAddingAddress] = useState(false)
  const [newAddress, setNewAddress] = useState('')

  if (!profile) {
    navigate('/customer-login', { state: { from: '/my-profile' } })
    return null
  }

  const pts = getCustomerPoints(profile.phone)
  const orders = getCustomerOrders(profile.phone)
  const totalSpent = orders.filter(o => o.status === 'done').reduce((s, o) => s + (o.total || 0), 0)

  const update = (patch) => {
    const updated = { ...profile, ...patch }
    setCustomerProfile(updated)
    setProfileState(updated)
  }

  const saveNameEdit = () => {
    if (!newName.trim()) return
    update({ name: newName.trim() })
    setEditingName(false)
  }

  const addAddress = () => {
    if (!newAddress.trim()) return
    update({ addresses: [...(profile.addresses || []), newAddress.trim()] })
    setNewAddress('')
    setAddingAddress(false)
  }

  const removeAddress = (idx) => {
    const addrs = [...(profile.addresses || [])]
    addrs.splice(idx, 1)
    update({ addresses: addrs })
  }

  const level =
    pts.balance >= 3000 ? { label: 'بلاتيني 💎' }
    : pts.balance >= 1500 ? { label: 'ذهبي 🥇' }
    : pts.balance >= 500  ? { label: 'فضي 🥈' }
    : { label: 'مبتدئ 🌟' }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'Cairo, sans-serif', direction: 'rtl' }}>
      {/* Gradient header */}
      <div style={{
        background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`,
        padding: '20px 16px 32px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -24, left: -24, width: 110, height: 110, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -30, right: 30, width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, position: 'relative', zIndex: 1 }}>
          <button
            onClick={() => navigate(-1)}
            style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}
          >
            <ArrowRight size={18} color="white" />
          </button>
          <h1 style={{ fontWeight: 900, fontSize: 18, color: 'white', flex: 1 }}>حسابي</h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative', zIndex: 1 }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'rgba(255,255,255,0.25)',
            border: '2.5px solid rgba(255,255,255,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, fontWeight: 900, color: 'white', flexShrink: 0,
          }}>
            {profile.name.charAt(0)}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <p style={{ fontWeight: 900, fontSize: 18, color: 'white' }}>{profile.name}</p>
              <button
                onClick={() => { setNewName(profile.name); setEditingName(true) }}
                style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Edit3 size={13} color="white" />
              </button>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.78)', fontFamily: 'Inter, monospace', direction: 'ltr', marginTop: 2 }}>
              {profile.phone}
            </p>
            <span style={{
              display: 'inline-flex', alignItems: 'center',
              background: 'rgba(255,255,255,0.2)', borderRadius: 20,
              padding: '3px 10px', fontSize: 11, fontWeight: 700, color: 'white', marginTop: 6,
            }}>
              {level.label}
            </span>
          </div>
        </div>
      </div>

      <div style={{ padding: '14px 14px 100px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {[
            { label: 'الطلبات', value: orders.length },
            { label: 'المصروف', value: `${totalSpent} ج` },
            { label: 'النقاط', value: pts.balance.toLocaleString() },
          ].map((s, i) => (
            <div key={i} style={{ background: 'var(--surface)', borderRadius: 16, padding: '14px 10px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid var(--border)' }}>
              <p style={{ fontSize: 17, fontWeight: 900, color: 'var(--text)', marginBottom: 3, fontFamily: 'Inter, sans-serif' }}>{s.value}</p>
              <p style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 600 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Loyalty card */}
        <div
          onClick={() => navigate('/loyalty')}
          style={{
            background: 'linear-gradient(135deg, #F59E0B, #F97316)',
            borderRadius: 20, padding: '20px 20px 18px', cursor: 'pointer',
            boxShadow: '0 6px 24px rgba(249,115,22,0.35)',
            position: 'relative', overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: -20, left: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
          <div style={{ position: 'absolute', bottom: -30, right: -10, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 28 }}>🎁</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.85)', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: 20 }}>
                برنامج المكافآت
              </span>
            </div>
            <p style={{ fontSize: 32, fontWeight: 900, color: 'white', fontFamily: 'Inter, sans-serif', marginBottom: 2 }}>
              {pts.balance.toLocaleString()}
            </p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginBottom: 14 }}>نقطة متاحة للاستبدال</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 16 }}>
                <div>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>المكتسبة</p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: 'white', fontFamily: 'Inter, sans-serif' }}>{pts.earned.toLocaleString()}</p>
                </div>
                <div>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>المستخدمة</p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: 'white', fontFamily: 'Inter, sans-serif' }}>{pts.spent.toLocaleString()}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.25)', padding: '8px 16px', borderRadius: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>استبدل</span>
                <span style={{ fontSize: 14, color: 'white' }}>←</span>
              </div>
            </div>
          </div>
        </div>

        {/* طلباتي link */}
        <div style={{ background: 'var(--surface)', borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid var(--border)' }}>
          <button
            onClick={() => navigate('/my-orders')}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '17px 16px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'right', fontFamily: 'Cairo, sans-serif' }}
          >
            <span style={{ fontSize: 22 }}>📋</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>طلباتي</p>
              <p style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>{orders.length} طلب</p>
            </div>
            <span style={{ fontSize: 16, color: '#D1D5DB' }}>←</span>
          </button>
        </div>

        {/* Saved addresses */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, padding: '0 2px' }}>
            <h2 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)' }}>عناويني المحفوظة</h2>
            <button
              onClick={() => setAddingAddress(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '6px 12px', borderRadius: 10,
                background: `${color}18`, color: color,
                fontWeight: 700, fontSize: 12, border: 'none',
                cursor: 'pointer', fontFamily: 'Cairo, sans-serif',
              }}
            >
              <Plus size={13} /> إضافة
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(profile.addresses || []).length === 0 && !addingAddress && (
              <div style={{ background: 'var(--surface)', borderRadius: 16, padding: '22px', textAlign: 'center', border: '1px dashed var(--border-strong)' }}>
                <p style={{ fontSize: 28, marginBottom: 8 }}>📍</p>
                <p style={{ fontSize: 13, color: 'var(--text-3)' }}>لم تضف أي عنوان بعد</p>
              </div>
            )}
            {(profile.addresses || []).map((addr, i) => (
              <div key={i} style={{ background: 'var(--surface)', borderRadius: 14, padding: '13px 14px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 2px 6px rgba(0,0,0,0.04)', border: '1px solid var(--border)' }}>
                <span style={{ fontSize: 20 }}>📍</span>
                <p style={{ flex: 1, fontSize: 13, fontWeight: 600, color: 'var(--text)', lineHeight: 1.4 }}>{addr}</p>
                <button onClick={() => removeAddress(i)} style={{ width: 32, height: 32, borderRadius: 8, background: '#FEF2F2', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Trash2 size={14} color="#EF4444" />
                </button>
              </div>
            ))}
            {addingAddress && (
              <div style={{ background: 'var(--surface)', borderRadius: 16, padding: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid var(--border)' }}>
                <input
                  autoFocus
                  value={newAddress}
                  onChange={e => setNewAddress(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addAddress()}
                  placeholder="مثال: 15 شارع البحر، المعادي"
                  style={{
                    width: '100%', padding: '11px 12px', borderRadius: 12,
                    border: `1.5px solid ${color}`, fontSize: 13,
                    fontFamily: 'Cairo, sans-serif', boxSizing: 'border-box', outline: 'none',
                  }}
                />
                <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                  <button
                    onClick={() => { setAddingAddress(false); setNewAddress('') }}
                    style={{ flex: 1, padding: '10px', borderRadius: 12, background: '#F9FAFB', border: '1px solid #E5E7EB', color: 'var(--text-2)', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={addAddress}
                    style={{ flex: 1, padding: '10px', borderRadius: 12, background: color, color: 'white', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}
                  >
                    حفظ
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={() => { clearCustomerProfile(); navigate('/explore') }}
          style={{
            width: '100%', padding: '14px', borderRadius: 14,
            background: '#FEF2F2', color: '#DC2626',
            fontWeight: 700, fontSize: 14, border: '1.5px solid #FECACA',
            cursor: 'pointer', fontFamily: 'Cairo, sans-serif',
          }}
        >
          تسجيل الخروج
        </button>
      </div>

      {/* Edit name bottom sheet */}
      {editingName && (
        <div
          onClick={() => setEditingName(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 150, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background: 'var(--surface)', borderRadius: '24px 24px 0 0', padding: '28px 20px 40px', width: '100%', maxWidth: 480 }}
          >
            <p style={{ fontWeight: 800, fontSize: 16, color: 'var(--text)', marginBottom: 16 }}>تعديل الاسم</p>
            <input
              autoFocus
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && saveNameEdit()}
              style={{ width: '100%', padding: '13px 14px', borderRadius: 14, border: `1.5px solid ${color}`, fontSize: 15, fontFamily: 'Cairo, sans-serif', boxSizing: 'border-box', outline: 'none' }}
            />
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              <button onClick={() => setEditingName(false)} style={{ flex: 1, padding: '13px', borderRadius: 14, background: '#F9FAFB', border: '1px solid #E5E7EB', color: 'var(--text-2)', fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}>إلغاء</button>
              <button onClick={saveNameEdit} style={{ flex: 1, padding: '13px', borderRadius: 14, background: color, color: 'white', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}>حفظ</button>
            </div>
          </div>
        </div>
      )}

      <CustomerFooter />
      <CustomerNav />
    </div>
  )
}
