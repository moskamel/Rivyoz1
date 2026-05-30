import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TickCircle, CloseCircle, HambergerMenu, Eye, EyeSlash } from 'iconsax-react'
import { getConfig, getCoupons, addOrder, getCustomerProfile, setCustomerProfile } from '../lib/restaurantStore'
import { useCart } from './CartContext'
import { useSidebar } from '../lib/ThemeContext'
import CustomerNav from './CustomerNav'
import CustomerFooter from './CustomerFooter'

const baseInput = {
  width: '100%', padding: '13px 14px', borderRadius: 12,
  border: '1.5px solid var(--border-strong)', fontSize: 14, outline: 'none',
  fontFamily: 'Zain, sans-serif', background: 'var(--surface)', color: 'var(--text)',
  boxSizing: 'border-box', transition: 'border-color 0.2s, box-shadow 0.2s',
}
const focusInput = (e, color) => { e.target.style.borderColor = color; e.target.style.boxShadow = `0 0 0 3px ${color}22` }
const blurInput  = e => { e.target.style.borderColor = 'var(--border-strong)'; e.target.style.boxShadow = 'none' }

const Card = ({ children, style }) => (
  <div style={{ background: 'var(--surface)', borderRadius: 16, boxShadow: '0 2px 10px rgba(0,0,0,0.06)', overflow: 'hidden', ...style }}>
    {children}
  </div>
)
const CardHead = ({ title }) => (
  <div style={{ padding: '14px 16px 10px', borderBottom: '1px solid var(--border)' }}>
    <p style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)', margin: 0 }}>{title}</p>
  </div>
)
const Label = ({ children, error }) => (
  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: error ? '#EF4444' : 'var(--text-2)', marginBottom: 6 }}>
    {children}
  </label>
)
const ErrorMsg = ({ msg }) => msg
  ? <p style={{ color: '#EF4444', fontSize: 11, marginTop: 5, fontWeight: 600 }}>{msg}</p>
  : null

export default function Cart() {
  const navigate = useNavigate()
  const config  = getConfig()
  const color   = config.color
  const { cartItems, removeItem, updateQty, clearCart, total, itemCount } = useCart()
  const { setSidebarOpen } = useSidebar()

  const [orderType, setOrderType] = useState(() => {
    if (config.allowDelivery) return 'delivery'
    if (config.allowPickup)   return 'pickup'
    return 'table'
  })

  const [coupon,         setCoupon]         = useState('')
  const [couponApplied,  setCouponApplied]  = useState(false)
  const [couponDiscount, setCouponDiscount] = useState(0)
  const [couponError,    setCouponError]    = useState('')
  const [confirmDelete,  setConfirmDelete]  = useState(null)
  const [confirmClear,   setConfirmClear]   = useState(false)

  const profile = getCustomerProfile()
  const [name,        setName]        = useState(() => profile?.name  || localStorage.getItem('customer_name')  || '')
  const [phone,       setPhone]       = useState(() => profile?.phone || localStorage.getItem('customer_phone') || '')
  const [governorate, setGovernorate] = useState('')
  const [address,     setAddress]     = useState('')
  const [driverNote,  setDriverNote]  = useState('')
  const [tableNumber, setTableNumber] = useState('')
  const [errors,      setErrors]      = useState({})
  const [showSaved,   setShowSaved]   = useState(false)

  const [payment, setPayment] = useState('cash')

  /* ─── card fields ─── */
  const [cardNumber, setCardNumber] = useState('')
  const [cardName,   setCardName]   = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv,    setCardCvv]    = useState('')
  const [showCvv,    setShowCvv]    = useState(false)

  const formatCardNumber = v => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  const formatExpiry     = v => { const d = v.replace(/\D/g, '').slice(0, 4); return d.length >= 3 ? d.slice(0, 2) + '/' + d.slice(2) : d }
  const cardBrand = cardNumber.replace(/\s/g, '').startsWith('4') ? 'visa'
    : ['51','52','53','54','55'].some(p => cardNumber.replace(/\s/g, '').startsWith(p)) ? 'mc' : null

  const deliveryFee = orderType === 'delivery' ? config.deliveryFee : 0
  const finalTotal  = Math.max(0, total + deliveryFee - couponDiscount)
  const minOrderOk  = !(config.minOrder && total < config.minOrder && orderType === 'delivery')

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase()
    const match = getCoupons().find(c => c.code === code)
    if (!match) { setCouponError('كود غير صحيح'); setCouponApplied(false); setCouponDiscount(0); return }
    if (match.max && match.used >= match.max) { setCouponError('الكوبون وصل لأقصى عدد استخدامات'); setCouponApplied(false); setCouponDiscount(0); return }
    if (match.expiry && new Date(match.expiry) < new Date()) { setCouponError('الكوبون منتهي الصلاحية'); setCouponApplied(false); setCouponDiscount(0); return }
    if (match.minOrder && total < match.minOrder) { setCouponError(`الحد الأدنى ${match.minOrder} ج`); setCouponApplied(false); setCouponDiscount(0); return }
    const disc = match.type === 'percent' ? Math.round(total * match.value / 100) : match.value
    setCouponApplied(true); setCouponDiscount(disc); setCouponError('')
  }

  const handleConfirm = () => {
    const e = {}
    if (!name.trim()) e.name = 'الاسم مطلوب'
    if (!phone.trim()) e.phone = 'رقم الهاتف مطلوب'
    else if (!/^(010|011|012|015)\d{8}$/.test(phone.replace(/\s|-/g, ''))) e.phone = 'رقم غير صحيح'
    if (orderType === 'delivery') {
      if (!governorate) e.governorate = 'المحافظة مطلوبة'
      if (!address.trim()) e.address = 'العنوان التفصيلي مطلوب'
    }
    if (orderType === 'table' && !tableNumber) e.tableNumber = 'رقم الطاولة مطلوب'
    if (payment === 'card') {
      if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) e.cardNumber = 'رقم البطاقة غير مكتمل'
      if (!cardName.trim()) e.cardName = 'اسم حامل البطاقة مطلوب'
      if (!cardExpiry || !/^\d{2}\/\d{2}$/.test(cardExpiry)) e.cardExpiry = 'تاريخ انتهاء غير صحيح'
      if (!cardCvv || cardCvv.length < 3) e.cardCvv = 'CVV غير صحيح'
    }
    setErrors(e)
    if (Object.keys(e).length) { window.scrollTo({ top: 0, behavior: 'smooth' }); return }

    const payLabels = { cash: 'كاش عند الاستلام', card: 'بطاقة بنكية', fawry: 'فوري' }
    const saved = addOrder({
      customer: name, phone,
      table: orderType === 'table' ? `طاولة ${tableNumber}` : orderType === 'delivery' ? 'توصيل' : 'استلام',
      items: cartItems.map(i => i.name).join(' + '),
      total: finalTotal,
      payment: payLabels[payment],
      paymentMethod: payLabels[payment],
      details: cartItems.map(i => ({ name: i.name, qty: i.qty, price: i.price, note: i.note })),
      address: orderType === 'delivery' ? `${governorate}، ${address}` : '',
      note: orderType === 'delivery' ? driverNote : '',
      coupon: couponApplied ? coupon.trim().toUpperCase() : '',
      orderType, deliveryFee,
    })
    localStorage.setItem('customer_name', name)
    localStorage.setItem('customer_phone', phone)
    if (profile) setCustomerProfile({ ...profile, name })
    clearCart()
    navigate('/order-confirm', { state: { order: saved } })
  }

  const orderTypeOpts = [
    { key: 'delivery', label: 'توصيل', icon: '🚗', enabled: config.allowDelivery },
    { key: 'pickup',   label: 'استلام', icon: '🏃', enabled: config.allowPickup   },
    { key: 'table',    label: 'طاولة',  icon: '🍽️', enabled: config.allowTable    },
  ]
  const payOpts = [
    { key: 'cash',  label: 'كاش عند الاستلام', icon: '💵' },
    { key: 'card',  label: 'بطاقة بنكية',       icon: '💳' },
    { key: 'fawry', label: 'فوري',               icon: '📱' },
  ]

  /* ── Empty cart ───────────────────────────────────────────────────── */
  if (itemCount === 0) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'Zain, sans-serif', direction: 'rtl' }}>
        <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '12px 16px', display: 'flex', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <h1 style={{ flex: 1, fontWeight: 800, fontSize: 18, color: 'var(--text)', margin: 0 }}>السلة</h1>
          <button onClick={() => setSidebarOpen(true)} style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--surface-2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <HambergerMenu size={18} color="var(--text-2)" />
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 48, textAlign: 'center', minHeight: 'calc(100vh - 64px)' }}>
          <div style={{ fontSize: 72, marginBottom: 20 }}>🛒</div>
          <p style={{ fontWeight: 800, color: 'var(--text)', fontSize: 22, marginBottom: 8 }}>سلتك فارغة</p>
          <p style={{ color: 'var(--text-3)', fontSize: 14, marginBottom: 32 }}>لم تضف أي أصناف بعد</p>
          <button onClick={() => navigate(-1)} style={{ padding: '14px 32px', borderRadius: 16, background: color, color: 'white', fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer', fontFamily: 'Zain, sans-serif', boxShadow: `0 6px 20px ${color}40` }}>
            تصفح القائمة
          </button>
        </div>
        <CustomerFooter /><CustomerNav />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'Zain, sans-serif', direction: 'rtl' }}>

      {/* Header */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '12px 16px', display: 'flex', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <h1 style={{ flex: 1, fontWeight: 800, fontSize: 18, color: 'var(--text)', margin: 0 }}>
          السلة {itemCount > 0 && <span style={{ fontSize: 14, color: 'var(--text-3)', fontWeight: 600 }}>({itemCount})</span>}
        </h1>
        <button onClick={() => setSidebarOpen(true)} style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--surface-2)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <HambergerMenu size={18} color="var(--text-2)" />
        </button>
      </div>

      <div style={{ padding: '14px 14px 110px', display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* ── 1. Items ── */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px 10px', borderBottom: '1px solid var(--border)' }}>
            <p style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)', margin: 0 }}>الأصناف</p>
            <button onClick={() => setConfirmClear(true)} style={{ fontSize: 12, color: '#EF4444', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Zain, sans-serif', padding: 0 }}>
              تفريغ السلة
            </button>
          </div>
          {cartItems.map((item, idx) => (
            <div key={item.cartId} style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: idx < cartItems.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                {item.image ? <img src={item.image} alt="" style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} /> : '🍽️'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14, marginBottom: 2 }}>{item.name}</p>
                {item.modifiers?.length > 0 && (
                  <p style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 3 }}>{item.modifiers.map(m => m.name).filter(Boolean).join('، ')}</p>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'Inter, sans-serif' }}>{item.price} ج × {item.qty}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-3)' }}>=</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color, fontFamily: 'Inter, sans-serif' }}>{item.price * item.qty} ج</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                <button onClick={() => { if (item.qty - 1 <= 0) setConfirmDelete(item.cartId); else updateQty(item.cartId, item.qty - 1) }}
                  style={{ width: 30, height: 30, borderRadius: '50%', border: '1.5px solid var(--border-strong)', background: 'var(--surface)', cursor: 'pointer', fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text)' }}>−</button>
                <span style={{ fontWeight: 700, fontSize: 15, minWidth: 22, textAlign: 'center', fontFamily: 'Inter, sans-serif', color: 'var(--text)' }}>{item.qty}</span>
                <button onClick={() => updateQty(item.cartId, item.qty + 1)}
                  style={{ width: 30, height: 30, borderRadius: '50%', background: color, border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 700, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
              </div>
              <button onClick={() => setConfirmDelete(item.cartId)}
                style={{ width: 30, height: 30, borderRadius: '50%', background: '#FEF2F2', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <CloseCircle size={13} color="#EF4444" />
              </button>
            </div>
          ))}
        </Card>

        {/* ── 2. Order type ── */}
        <Card>
          <CardHead title="طريقة الطلب" />
          <div style={{ padding: '12px 16px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {orderTypeOpts.map(opt => (
              <button key={opt.key} onClick={() => opt.enabled && setOrderType(opt.key)} disabled={!opt.enabled}
                style={{ padding: '10px 6px', borderRadius: 12, fontSize: 12, fontWeight: 700, cursor: opt.enabled ? 'pointer' : 'not-allowed', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, transition: 'all 0.15s', border: `2px solid ${orderType === opt.key ? color : 'var(--border-strong)'}`, background: orderType === opt.key ? color + '12' : 'var(--surface-2)', color: orderType === opt.key ? color : 'var(--text-2)', opacity: opt.enabled ? 1 : 0.4, fontFamily: 'Zain, sans-serif' }}>
                <span style={{ fontSize: 20 }}>{opt.icon}</span>
                {opt.label}
              </button>
            ))}
          </div>
        </Card>

        {/* ── 3. Personal info ── */}
        <Card>
          <CardHead title="بياناتك الشخصية" />
          <div style={{ padding: '12px 16px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <Label error={errors.name}>الاسم الكامل *</Label>
              <input type="text" value={name} onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })) }}
                placeholder="اسمك الكامل"
                style={{ ...baseInput, borderColor: errors.name ? '#EF4444' : 'var(--border-strong)' }}
                onFocus={e => focusInput(e, color)} onBlur={blurInput} />
              <ErrorMsg msg={errors.name} />
            </div>
            <div>
              <Label error={errors.phone}>رقم الهاتف *</Label>
              <input type="tel" value={phone} dir="ltr" onChange={e => { setPhone(e.target.value); setErrors(p => ({ ...p, phone: '' })) }}
                placeholder="01XXXXXXXXX"
                style={{ ...baseInput, borderColor: errors.phone ? '#EF4444' : 'var(--border-strong)', fontFamily: 'Inter, sans-serif' }}
                onFocus={e => focusInput(e, color)} onBlur={blurInput} />
              <ErrorMsg msg={errors.phone} />
            </div>
          </div>
        </Card>

        {/* ── 4a. Delivery address ── */}
        {orderType === 'delivery' && (
          <Card>
            <CardHead title="عنوان التوصيل" />
            <div style={{ padding: '12px 16px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {profile?.addresses?.length > 0 && (
                <div>
                  <button onClick={() => setShowSaved(!showSaved)}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', borderRadius: 10, background: `${color}12`, border: `1px solid ${color}30`, color, fontWeight: 700, fontSize: 12, cursor: 'pointer', fontFamily: 'Zain, sans-serif' }}>
                    📍 استخدم عنوان محفوظ {showSaved ? '▲' : '▼'}
                  </button>
                  {showSaved && (
                    <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {profile.addresses.map((addr, i) => (
                        <button key={i} onClick={() => {
                          const parts = addr.split('، ')
                          if (parts.length >= 2) { setGovernorate(parts[0]); setAddress(parts.slice(1).join('، ')) }
                          else setAddress(addr)
                          setShowSaved(false)
                          setErrors(p => ({ ...p, governorate: '', address: '' }))
                        }}
                          style={{ textAlign: 'right', padding: '10px 12px', borderRadius: 10, background: 'var(--surface-2)', border: '1px solid var(--border)', fontSize: 13, color: 'var(--text)', fontWeight: 600, cursor: 'pointer', fontFamily: 'Zain, sans-serif' }}>
                          📍 {addr}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
              <div>
                <Label error={errors.governorate}>المحافظة *</Label>
                <select value={governorate} onChange={e => { setGovernorate(e.target.value); setErrors(p => ({ ...p, governorate: '' })) }}
                  style={{ ...baseInput, borderColor: errors.governorate ? '#EF4444' : 'var(--border-strong)', appearance: 'none' }}
                  onFocus={e => focusInput(e, color)} onBlur={blurInput}>
                  <option value="">اختر المحافظة...</option>
                  {['القاهرة','الجيزة','الإسكندرية','الشرقية','الدقهلية','القليوبية','البحيرة','المنوفية','الغربية','كفر الشيخ','دمياط','الإسماعيلية','بورسعيد','السويس','شمال سيناء','جنوب سيناء','الفيوم','بني سويف','المنيا','أسيوط','سوهاج','قنا','الأقصر','أسوان','البحر الأحمر','الوادي الجديد','مطروح'].map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
                <ErrorMsg msg={errors.governorate} />
              </div>
              <div>
                <Label error={errors.address}>العنوان التفصيلي *</Label>
                <textarea value={address} onChange={e => { setAddress(e.target.value); setErrors(p => ({ ...p, address: '' })) }}
                  placeholder="الحي / المنطقة، الشارع، رقم المبنى..." rows={3}
                  style={{ ...baseInput, resize: 'none', borderColor: errors.address ? '#EF4444' : 'var(--border-strong)' }}
                  onFocus={e => focusInput(e, color)} onBlur={blurInput} />
                <ErrorMsg msg={errors.address} />
              </div>
              <div>
                <Label>ملاحظات للسائق (اختياري)</Label>
                <input type="text" value={driverNote} onChange={e => setDriverNote(e.target.value)}
                  placeholder="مثال: الدور الثاني، جنب المسجد" style={baseInput}
                  onFocus={e => focusInput(e, color)} onBlur={blurInput} />
              </div>
            </div>
          </Card>
        )}

        {/* ── 4b. Table number ── */}
        {orderType === 'table' && (
          <Card>
            <CardHead title="رقم الطاولة" />
            <div style={{ padding: '12px 16px 16px' }}>
              <input type="number" value={tableNumber} onChange={e => { setTableNumber(e.target.value); setErrors(p => ({ ...p, tableNumber: '' })) }}
                placeholder="مثال: 5"
                style={{ ...baseInput, borderColor: errors.tableNumber ? '#EF4444' : 'var(--border-strong)', fontFamily: 'Inter, sans-serif' }}
                onFocus={e => focusInput(e, color)} onBlur={blurInput} />
              <ErrorMsg msg={errors.tableNumber} />
            </div>
          </Card>
        )}

        {/* ── 4c. Pickup notice ── */}
        {orderType === 'pickup' && (
          <div style={{ background: `${color}10`, border: `1px solid ${color}30`, borderRadius: 14, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 22 }}>🏃</span>
            <p style={{ fontSize: 13, color: 'var(--text)', fontWeight: 600 }}>سيتم إعداد طلبك وإبلاغك عند جاهزيته للاستلام</p>
          </div>
        )}

        {/* ── 5. Coupon ── */}
        <Card>
          <CardHead title="كود الخصم" />
          <div style={{ padding: '12px 16px 16px' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <input type="text" value={coupon}
                onChange={e => { setCoupon(e.target.value); setCouponError('') }}
                placeholder="أدخل كود الخصم"
                style={{ ...baseInput, flex: 1, borderColor: couponApplied ? '#22C55E' : 'var(--border-strong)', direction: 'ltr' }}
                onFocus={e => focusInput(e, color)} onBlur={blurInput} />
              <button onClick={applyCoupon} style={{ padding: '11px 18px', borderRadius: 12, background: color, color: 'white', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer', flexShrink: 0, fontFamily: 'Zain, sans-serif' }}>
                تطبيق
              </button>
            </div>
            {couponError && <p style={{ color: '#EF4444', fontSize: 12, marginTop: 6, fontWeight: 600 }}>{couponError}</p>}
            {couponApplied && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, background: '#F0FDF4', padding: '6px 10px', borderRadius: 8 }}>
                <TickCircle size={13} color="#22C55E" />
                <p style={{ color: '#16A34A', fontSize: 12, fontWeight: 700 }}>تم تطبيق خصم {couponDiscount} ج</p>
              </div>
            )}
          </div>
        </Card>

        {/* ── 6. Payment ── */}
        <Card>
          <CardHead title="طريقة الدفع" />
          <div style={{ padding: '12px 16px 16px', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
            {payOpts.map(opt => (
              <button key={opt.key} onClick={() => setPayment(opt.key)}
                style={{ padding: '14px 10px', borderRadius: 14, border: `2px solid ${payment === opt.key ? color : 'var(--border-strong)'}`, background: payment === opt.key ? color + '10' : 'var(--surface-2)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, transition: 'all 0.15s', fontFamily: 'Zain, sans-serif', textAlign: 'center' }}>
                <span style={{ fontSize: 28 }}>{opt.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: payment === opt.key ? color : 'var(--text-2)', lineHeight: 1.3 }}>{opt.label}</span>
              </button>
            ))}

            {/* ── Card form ── */}
            {payment === 'card' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 4 }}>

                {/* Visual card mockup */}
                <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 55%, #0c2a4a 100%)', borderRadius: 18, padding: '20px 20px 16px', position: 'relative', overflow: 'hidden', minHeight: 150, boxShadow: '0 10px 36px rgba(0,0,0,0.35)' }}>
                  <div style={{ position: 'absolute', top: -28, right: -28, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
                  <div style={{ position: 'absolute', bottom: -40, left: 20, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
                  {/* Chip */}
                  <div style={{ width: 38, height: 28, borderRadius: 6, background: 'linear-gradient(135deg, #c8a84b, #f0d060)', marginBottom: 18, boxShadow: '0 2px 6px rgba(0,0,0,0.4)', position: 'relative', zIndex: 1 }} />
                  {/* Number */}
                  <p dir="ltr" style={{ fontFamily: 'Inter, monospace', fontSize: 17, color: 'rgba(255,255,255,0.92)', letterSpacing: '0.18em', marginBottom: 14, fontWeight: 600, position: 'relative', zIndex: 1 }}>
                    {(() => { const d = cardNumber.replace(/\s/g, '').padEnd(16, '•'); return `${d.slice(0,4)} ${d.slice(4,8)} ${d.slice(8,12)} ${d.slice(12,16)}` })()}
                  </p>
                  {/* Footer row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative', zIndex: 1 }}>
                    <div>
                      <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginBottom: 3, letterSpacing: '0.1em' }}>CARDHOLDER</p>
                      <p dir="ltr" style={{ fontSize: 13, color: 'white', fontFamily: 'Inter, sans-serif', fontWeight: 700, letterSpacing: '0.06em' }}>{cardName || 'YOUR NAME'}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginBottom: 3, letterSpacing: '0.1em' }}>EXPIRES</p>
                        <p dir="ltr" style={{ fontSize: 13, color: 'white', fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>{cardExpiry || 'MM/YY'}</p>
                      </div>
                      {cardBrand === 'visa' && (
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 22, fontWeight: 900, color: 'white', fontStyle: 'italic', letterSpacing: '-1px', lineHeight: 1 }}>VISA</p>
                      )}
                      {cardBrand === 'mc' && (
                        <div style={{ position: 'relative', width: 40, height: 24 }}>
                          <div style={{ position: 'absolute', left: 0, width: 24, height: 24, borderRadius: '50%', background: '#EB001B' }} />
                          <div style={{ position: 'absolute', right: 0, width: 24, height: 24, borderRadius: '50%', background: '#F79E1B', mixBlendMode: 'screen' }} />
                        </div>
                      )}
                      {!cardBrand && <div style={{ width: 40 }} />}
                    </div>
                  </div>
                </div>

                {/* Card number */}
                <div>
                  <Label error={errors.cardNumber}>رقم البطاقة *</Label>
                  <input
                    type="text" inputMode="numeric" dir="ltr"
                    value={cardNumber}
                    onChange={e => { setCardNumber(formatCardNumber(e.target.value)); setErrors(p => ({ ...p, cardNumber: '' })) }}
                    placeholder="0000 0000 0000 0000"
                    style={{ ...baseInput, fontFamily: 'Inter, monospace', letterSpacing: '0.12em', borderColor: errors.cardNumber ? '#EF4444' : 'var(--border-strong)' }}
                    onFocus={e => focusInput(e, color)} onBlur={blurInput}
                  />
                  <ErrorMsg msg={errors.cardNumber} />
                </div>

                {/* Cardholder name */}
                <div>
                  <Label error={errors.cardName}>اسم حامل البطاقة *</Label>
                  <input
                    type="text" dir="ltr"
                    value={cardName}
                    onChange={e => { setCardName(e.target.value.toUpperCase()); setErrors(p => ({ ...p, cardName: '' })) }}
                    placeholder="FULL NAME"
                    style={{ ...baseInput, fontFamily: 'Inter, sans-serif', letterSpacing: '0.04em', borderColor: errors.cardName ? '#EF4444' : 'var(--border-strong)' }}
                    onFocus={e => focusInput(e, color)} onBlur={blurInput}
                  />
                  <ErrorMsg msg={errors.cardName} />
                </div>

                {/* Expiry + CVV */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <Label error={errors.cardExpiry}>تاريخ الانتهاء *</Label>
                    <input
                      type="text" inputMode="numeric" dir="ltr"
                      value={cardExpiry}
                      onChange={e => { setCardExpiry(formatExpiry(e.target.value)); setErrors(p => ({ ...p, cardExpiry: '' })) }}
                      placeholder="MM/YY"
                      style={{ ...baseInput, fontFamily: 'Inter, sans-serif', borderColor: errors.cardExpiry ? '#EF4444' : 'var(--border-strong)' }}
                      onFocus={e => focusInput(e, color)} onBlur={blurInput}
                    />
                    <ErrorMsg msg={errors.cardExpiry} />
                  </div>
                  <div>
                    <Label error={errors.cardCvv}>CVV *</Label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showCvv ? 'text' : 'password'} inputMode="numeric" dir="ltr"
                        value={cardCvv}
                        onChange={e => { setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4)); setErrors(p => ({ ...p, cardCvv: '' })) }}
                        placeholder="•••"
                        style={{ ...baseInput, fontFamily: 'Inter, sans-serif', paddingLeft: 40, borderColor: errors.cardCvv ? '#EF4444' : 'var(--border-strong)' }}
                        onFocus={e => focusInput(e, color)} onBlur={blurInput}
                      />
                      <button
                        type="button"
                        onClick={() => setShowCvv(v => !v)}
                        style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', color: 'var(--text-3)' }}
                      >
                        {showCvv ? <Eye size={16} /> : <EyeSlash size={16} />}
                      </button>
                    </div>
                    <ErrorMsg msg={errors.cardCvv} />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 12px', background: '#F0F9FF', borderRadius: 10, border: '1px solid #BAE6FD' }}>
                  <span style={{ fontSize: 14 }}>🔒</span>
                  <p style={{ fontSize: 11, color: '#0369A1', fontWeight: 600 }}>بياناتك محمية بتشفير SSL آمن</p>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* ── 7. Summary ── */}
        <Card>
          <CardHead title="ملخص الطلب" />
          <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--text-2)' }}>
              <span>المجموع الفرعي</span>
              <span style={{ fontWeight: 600, color: 'var(--text)', fontFamily: 'Inter, sans-serif' }}>{total} ج</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--text-2)' }}>
              <span>رسوم التوصيل</span>
              <span style={{ fontWeight: 600, color: 'var(--text)', fontFamily: 'Inter, sans-serif' }}>
                {orderType === 'delivery' ? `${config.deliveryFee} ج` : 'مجاني'}
              </span>
            </div>
            {couponApplied && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#22C55E' }}>
                <span>الخصم</span>
                <span style={{ fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>− {couponDiscount} ج</span>
              </div>
            )}
            <div style={{ borderTop: '1.5px dashed var(--border-strong)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 18 }}>
              <span style={{ color: 'var(--text)' }}>الإجمالي</span>
              <span style={{ color, fontFamily: 'Inter, sans-serif' }}>{finalTotal} ج</span>
            </div>
          </div>
          {config.minOrder && total < config.minOrder && orderType === 'delivery' && (
            <div style={{ margin: '0 14px 14px', padding: '10px 14px', background: '#FEF2F2', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 16 }}>⚠️</span>
              <p style={{ color: '#DC2626', fontSize: 12, fontWeight: 700 }}>الحد الأدنى للطلب {config.minOrder} ج — أضف {config.minOrder - total} ج أكثر</p>
            </div>
          )}
        </Card>

        {/* ── 8. Confirm button ── */}
        <button
          onClick={handleConfirm}
          disabled={!minOrderOk}
          style={{ width: '100%', padding: '17px', borderRadius: 18, background: minOrderOk ? color : 'var(--surface-2)', color: minOrderOk ? 'white' : 'var(--text-3)', fontWeight: 800, fontSize: 16, border: 'none', cursor: minOrderOk ? 'pointer' : 'not-allowed', fontFamily: 'Zain, sans-serif', boxShadow: minOrderOk ? `0 6px 20px ${color}40` : 'none', transition: 'all 0.2s' }}
        >
          تأكيد الطلب · {finalTotal} ج
        </button>
      </div>

      {/* Confirm delete item */}
      {confirmDelete && (
        <div onClick={() => setConfirmDelete(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 150, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: 'var(--surface)', borderRadius: '20px 20px 0 0', padding: '24px 20px 32px', width: '100%', maxWidth: 480, textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🗑️</div>
            <p style={{ fontWeight: 800, color: 'var(--text)', fontSize: 17, marginBottom: 6 }}>تحذف هذا الصنف؟</p>
            <p style={{ color: 'var(--text-3)', fontSize: 13, marginBottom: 20 }}>سيتم إزالة الصنف من سلتك</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setConfirmDelete(null)} style={{ flex: 1, padding: '13px', borderRadius: 14, border: '1.5px solid var(--border-strong)', fontSize: 14, fontWeight: 700, color: 'var(--text-2)', background: 'var(--surface)', cursor: 'pointer', fontFamily: 'Zain, sans-serif' }}>إلغاء</button>
              <button onClick={() => { removeItem(confirmDelete); setConfirmDelete(null) }} style={{ flex: 1, padding: '13px', borderRadius: 14, border: 'none', fontSize: 14, fontWeight: 700, color: 'white', background: 'var(--red)', cursor: 'pointer', fontFamily: 'Zain, sans-serif' }}>احذف</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm clear all */}
      {confirmClear && (
        <div onClick={() => setConfirmClear(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 150, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: 'var(--surface)', borderRadius: '20px 20px 0 0', padding: '24px 20px 32px', width: '100%', maxWidth: 480, textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🗑️</div>
            <p style={{ fontWeight: 800, color: 'var(--text)', fontSize: 17, marginBottom: 6 }}>تفريغ السلة؟</p>
            <p style={{ color: 'var(--text-3)', fontSize: 13, marginBottom: 20 }}>سيتم حذف جميع الأصناف من سلتك</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setConfirmClear(false)} style={{ flex: 1, padding: '13px', borderRadius: 14, border: '1.5px solid var(--border-strong)', fontSize: 14, fontWeight: 700, color: 'var(--text-2)', background: 'var(--surface)', cursor: 'pointer', fontFamily: 'Zain, sans-serif' }}>إلغاء</button>
              <button onClick={() => { clearCart(); setConfirmClear(false) }} style={{ flex: 1, padding: '13px', borderRadius: 14, border: 'none', fontSize: 14, fontWeight: 700, color: 'white', background: 'var(--red)', cursor: 'pointer', fontFamily: 'Zain, sans-serif' }}>افرغ السلة</button>
            </div>
          </div>
        </div>
      )}

      <CustomerFooter />
      <CustomerNav />
    </div>
  )
}
