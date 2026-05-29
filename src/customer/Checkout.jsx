import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, TickCircle } from 'iconsax-react'
import { getConfig, addOrder, getCoupons, getCustomerProfile, setCustomerProfile } from '../lib/restaurantStore'
import { useCart } from './CartContext'

// ── Input style ──────────────────────────────────────────────────────────────
function makeInputStyle() {
  return {
    width: '100%', padding: '13px 14px', borderRadius: 12,
    border: '1.5px solid var(--border-strong)', fontSize: 14, outline: 'none',
    fontFamily: 'Zain, sans-serif', background: 'var(--surface)', color: 'var(--text)',
    boxSizing: 'border-box', transition: 'border-color 0.2s, box-shadow 0.2s',
  }
}

function focusInput(e, color) {
  e.target.style.borderColor = color
  e.target.style.boxShadow = `0 0 0 3px ${color}22`
}
function blurInput(e) {
  e.target.style.borderColor = 'var(--border-strong)'
  e.target.style.boxShadow = 'none'
}

// ── Step Indicator ───────────────────────────────────────────────────────────
function StepIndicator({ step, color }) {
  const steps = [
    { num: 1, label: 'تفاصيل التوصيل' },
    { num: 2, label: 'الدفع' },
    { num: 3, label: 'تأكيد الطلب' },
  ]
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, padding: '14px 20px' }}>
      {steps.map((s, idx) => (
        <div key={s.num} style={{ display: 'flex', alignItems: 'center', flex: idx < steps.length - 1 ? 1 : 'none' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: 13, fontFamily: 'Inter, sans-serif',
              background: s.num < step ? '#22C55E' : s.num === step ? color : '#E5E7EB',
              color: s.num <= step ? 'white' : '#9CA3AF',
              transition: 'all 0.3s',
            }}>
              {s.num < step ? <TickCircle size={15} /> : s.num}
            </div>
            <span style={{
              fontSize: 10, fontWeight: 700,
              color: s.num === step ? color : s.num < step ? '#22C55E' : '#9CA3AF',
              whiteSpace: 'nowrap', fontFamily: 'Zain, sans-serif', transition: 'color 0.3s',
            }}>
              {s.label}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div style={{
              flex: 1, height: 2,
              background: s.num < step ? '#22C55E' : '#E5E7EB',
              margin: '0 6px', marginBottom: 20, transition: 'background 0.3s', minWidth: 20,
            }} />
          )}
        </div>
      ))}
    </div>
  )
}

// ── Compact order summary (used in step 2 & 3) ───────────────────────────────
function CompactSummary({ cartItems, total, deliveryFee, couponDiscount, couponApplied, color }) {
  const finalTotal = Math.max(0, total + deliveryFee - couponDiscount)
  return (
    <div style={{ background: 'var(--surface-2)', borderRadius: 14, padding: '12px 14px', marginBottom: 16 }}>
      <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 13, marginBottom: 10 }}>ملخص الطلب</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {cartItems.map(item => (
          <div key={item.cartId} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-2)' }}>
            <span>{item.name} × {item.qty}</span>
            <span style={{ fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{item.price * item.qty} ج</span>
          </div>
        ))}
        <div style={{ borderTop: '1px dashed var(--border-strong)', paddingTop: 8, marginTop: 4, display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-3)' }}>
            <span>المجموع الفرعي</span>
            <span style={{ fontFamily: 'Inter, sans-serif' }}>{total} ج</span>
          </div>
          {deliveryFee > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-3)' }}>
              <span>رسوم التوصيل</span>
              <span style={{ fontFamily: 'Inter, sans-serif' }}>{deliveryFee} ج</span>
            </div>
          )}
          {couponApplied && couponDiscount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#22C55E' }}>
              <span>الخصم</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>− {couponDiscount} ج</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 15, color: 'var(--text)', paddingTop: 4 }}>
            <span>الإجمالي</span>
            <span style={{ color: color, fontFamily: 'Inter, sans-serif' }}>{finalTotal} ج</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main Checkout Component ──────────────────────────────────────────────────
export default function Checkout() {
  const navigate = useNavigate()
  const config = getConfig()
  const { cartItems, clearCart, total, itemCount } = useCart()
  const inputStyle = makeInputStyle()
  const accentColor = config.color

  // redirect if cart is empty
  useEffect(() => {
    if (itemCount === 0) navigate('/cart')
  }, [itemCount, navigate])

  // load coupon/orderType saved from Cart
  const savedCart = (() => {
    try { return JSON.parse(localStorage.getItem('cart_coupon') || '{}') } catch (e) { return {} }
  })()

  const customerProfile = getCustomerProfile()

  const [step, setStep] = useState(1)
  const [animating, setAnimating] = useState(false)

  // Step 1 fields — auto-fill from customer profile if logged in
  const [name, setName] = useState(() => customerProfile?.name || localStorage.getItem('customer_name') || '')
  const [phone, setPhone] = useState(() => customerProfile?.phone || localStorage.getItem('customer_phone') || '')
  const [orderType, setOrderType] = useState(savedCart.orderType || 'delivery')
  const [governorate, setGovernorate] = useState('')
  const [address, setAddress] = useState('')
  const [driverNote, setDriverNote] = useState('')
  const [tableNumber, setTableNumber] = useState('')
  const [step1Errors, setStep1Errors] = useState({})
  const [showSavedAddresses, setShowSavedAddresses] = useState(false)

  // Step 2
  const [payment, setPayment] = useState('cash')

  // Coupon (step 3)
  const [coupon, setCoupon] = useState(savedCart.coupon || '')
  const [couponApplied, setCouponApplied] = useState(savedCart.couponApplied || false)
  const [couponDiscount, setCouponDiscount] = useState(savedCart.couponDiscount || 0)
  const [couponError, setCouponError] = useState('')

  const deliveryFee = orderType === 'delivery' ? config.deliveryFee : 0
  const finalTotal = Math.max(0, total + deliveryFee - couponDiscount)

  const goToStep = (target) => {
    setAnimating(true)
    setTimeout(() => {
      setStep(target)
      setAnimating(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 180)
  }

  // ── Coupon logic ──
  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase()
    const coupons = getCoupons()
    const match = coupons.find(c => c.code === code)
    if (!match) {
      setCouponError('كود غير صحيح'); setCouponApplied(false); setCouponDiscount(0); return
    }
    if (match.max && match.used >= match.max) {
      setCouponError('هذا الكوبون وصل لأقصى عدد استخدامات'); setCouponApplied(false); setCouponDiscount(0); return
    }
    if (match.expiry && new Date(match.expiry) < new Date()) {
      setCouponError('هذا الكوبون منتهي الصلاحية'); setCouponApplied(false); setCouponDiscount(0); return
    }
    if (match.minOrder && total < match.minOrder) {
      setCouponError(`الحد الأدنى للطلب ${match.minOrder} ج`); setCouponApplied(false); setCouponDiscount(0); return
    }
    const discount = match.type === 'percent' ? Math.round(total * match.value / 100) : match.value
    setCouponApplied(true); setCouponDiscount(discount); setCouponError('')
  }

  // ── Step 1 validation ──
  const validateStep1 = () => {
    const errors = {}
    if (!name.trim()) errors.name = 'الاسم مطلوب'
    if (!phone.trim()) errors.phone = 'رقم الهاتف مطلوب'
    else if (!/^(010|011|012|015)\d{8}$/.test(phone.replace(/\s|-/g, '')))
      errors.phone = 'رقم هاتف غير صحيح (010/011/012/015 + 8 أرقام)'
    if (orderType === 'delivery') {
      if (!governorate) errors.governorate = 'المحافظة مطلوبة'
      if (!address.trim()) errors.address = 'العنوان التفصيلي مطلوب'
    }
    if (orderType === 'table' && !tableNumber) errors.tableNumber = 'رقم الطاولة مطلوب'
    setStep1Errors(errors)
    return Object.keys(errors).length === 0
  }

  // ── Final order submission ──
  const handleConfirmOrder = () => {
    const paymentLabels = { cash: 'كاش عند الاستلام', card: 'بطاقة بنكية', fawry: 'فوري' }
    const fullAddress = orderType === 'delivery' ? `${governorate}، ${address}` : ''
    const order = {
      customer: name, phone,
      table: orderType === 'table' ? `طاولة ${tableNumber}` : orderType === 'delivery' ? 'توصيل' : 'استلام',
      items: cartItems.map(i => i.name).join(' + '),
      total: finalTotal,
      payment: paymentLabels[payment],
      paymentMethod: paymentLabels[payment],
      details: cartItems.map(i => ({ name: i.name, qty: i.qty, price: i.price, note: i.note })),
      address: fullAddress,
      note: orderType === 'delivery' ? driverNote : '',
      coupon: couponApplied ? coupon.trim().toUpperCase() : '',
      orderType, deliveryFee,
    }
    const savedOrder = addOrder(order)
    localStorage.setItem('customer_name', name)
    localStorage.setItem('customer_phone', phone)
    if (customerProfile) setCustomerProfile({ ...customerProfile, name })
    localStorage.removeItem('cart_coupon')
    clearCart()
    navigate('/order-confirm', { state: { order: savedOrder } })
  }

  // ── Shared UI helpers ──
  const Label = ({ children, error }) => (
    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: error ? '#EF4444' : 'var(--text-2)', marginBottom: 6 }}>
      {children}
    </label>
  )

  const ErrorMsg = ({ msg }) => msg
    ? <p style={{ color: '#EF4444', fontSize: 11, marginTop: 5, fontWeight: 600 }}>{msg}</p>
    : null

  const BackBtn = ({ onClick }) => (
    <button onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '10px 0', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-2)', fontWeight: 700, fontSize: 14, fontFamily: 'Zain, sans-serif' }}>
      <ArrowRight size={16} />
      رجوع
    </button>
  )

  const NextBtn = ({ onClick, label, disabled }) => (
    <button
      onClick={onClick}
      disabled={!!disabled}
      style={{
        width: '100%', padding: '16px', borderRadius: 18,
        background: disabled ? '#E5E7EB' : accentColor,
        color: disabled ? '#9CA3AF' : 'white',
        fontWeight: 800, fontSize: 16, border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'Zain, sans-serif',
        boxShadow: disabled ? 'none' : `0 6px 20px ${accentColor}40`,
        transition: 'all 0.2s',
        marginTop: 8,
      }}
    >{label || 'متابعة'}</button>
  )

  const orderTypeOpts = [
    { key: 'delivery', label: 'توصيل', icon: '🚗', enabled: config.allowDelivery },
    { key: 'pickup', label: 'استلام', icon: '🏃', enabled: config.allowPickup },
    { key: 'table', label: 'طاولة', icon: '🍽️', enabled: config.allowTable },
  ]

  const paymentOptions = [
    { key: 'cash', label: 'كاش عند الاستلام', icon: '💵' },
    { key: 'card', label: 'بطاقة بنكية', icon: '💳' },
    { key: 'fawry', label: 'فوري', icon: '📱' },
  ]

  // ── RENDER ───────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'Zain, sans-serif', direction: 'rtl' }}>

      {/* Step content */}
      <div style={{ padding: '16px 14px 100px', opacity: animating ? 0 : 1, transition: 'opacity 0.18s ease' }}>
        <StepIndicator step={step} color={accentColor} />

        {/* ── STEP 1: Delivery details ── */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* Name & phone */}
            <div style={{ background: 'var(--surface)', borderRadius: 16, padding: '16px 16px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
              <p style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)', marginBottom: 14 }}>بياناتك الشخصية</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <Label error={step1Errors.name}>الاسم الكامل *</Label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => { setName(e.target.value); setStep1Errors(p => ({ ...p, name: '' })) }}
                    placeholder="اسمك الكامل"
                    style={{ ...inputStyle, borderColor: step1Errors.name ? '#EF4444' : '#E5E7EB' }}
                    onFocus={e => focusInput(e, accentColor)}
                    onBlur={blurInput}
                  />
                  <ErrorMsg msg={step1Errors.name} />
                </div>
                <div>
                  <Label error={step1Errors.phone}>رقم الهاتف *</Label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => { setPhone(e.target.value); setStep1Errors(p => ({ ...p, phone: '' })) }}
                    placeholder="01XXXXXXXXX"
                    dir="ltr"
                    style={{ ...inputStyle, borderColor: step1Errors.phone ? '#EF4444' : '#E5E7EB', fontFamily: 'Inter, sans-serif' }}
                    onFocus={e => focusInput(e, accentColor)}
                    onBlur={blurInput}
                  />
                  <ErrorMsg msg={step1Errors.phone} />
                </div>
              </div>
            </div>

            {/* Order type */}
            <div style={{ background: 'var(--surface)', borderRadius: 16, padding: '16px 16px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
              <p style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)', marginBottom: 12 }}>نوع الطلب</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                {orderTypeOpts.map(opt => (
                  <button
                    key={opt.key}
                    onClick={() => opt.enabled && setOrderType(opt.key)}
                    disabled={!opt.enabled}
                    style={{
                      padding: '12px 6px', borderRadius: 14, fontSize: 12, fontWeight: 700,
                      cursor: opt.enabled ? 'pointer' : 'not-allowed',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                      transition: 'all 0.15s',
                      border: `2px solid ${orderType === opt.key ? accentColor : 'var(--border-strong)'}`,
                      background: orderType === opt.key ? accentColor + '12' : 'var(--surface-2)',
                      color: orderType === opt.key ? accentColor : '#6B7280',
                      opacity: opt.enabled ? 1 : 0.4,
                      fontFamily: 'Zain, sans-serif',
                    }}
                  >
                    <span style={{ fontSize: 22 }}>{opt.icon}</span>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery address */}
            {orderType === 'delivery' && (
              <div style={{ background: 'var(--surface)', borderRadius: 16, padding: '16px 16px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
                <p style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)', marginBottom: 14 }}>بيانات التوصيل</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

                  {/* Saved addresses shortcut */}
                  {customerProfile?.addresses?.length > 0 && (
                    <div>
                      <button
                        onClick={() => setShowSavedAddresses(!showSavedAddresses)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', borderRadius: 10, background: `${accentColor}12`, border: `1px solid ${accentColor}30`, color: accentColor, fontWeight: 700, fontSize: 12, cursor: 'pointer', fontFamily: 'Zain, sans-serif' }}
                      >
                        📍 استخدم عنوان محفوظ {showSavedAddresses ? '▲' : '▼'}
                      </button>
                      {showSavedAddresses && (
                        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {customerProfile.addresses.map((addr, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                const parts = addr.split('، ')
                                if (parts.length >= 2) { setGovernorate(parts[0]); setAddress(parts.slice(1).join('، ')) }
                                else setAddress(addr)
                                setShowSavedAddresses(false)
                                setStep1Errors(p => ({ ...p, governorate: '', address: '' }))
                              }}
                              style={{ textAlign: 'right', padding: '10px 12px', borderRadius: 10, background: '#F9FAFB', border: '1px solid #F3F4F6', fontSize: 13, color: '#374151', fontWeight: 600, cursor: 'pointer', fontFamily: 'Zain, sans-serif' }}
                            >
                              📍 {addr}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Governorate */}
                  <div>
                    <Label error={step1Errors.governorate}>المحافظة *</Label>
                    <select
                      value={governorate}
                      onChange={e => { setGovernorate(e.target.value); setStep1Errors(p => ({ ...p, governorate: '' })) }}
                      style={{ ...inputStyle, borderColor: step1Errors.governorate ? '#EF4444' : '#E5E7EB', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'left 14px center' }}
                      onFocus={e => focusInput(e, accentColor)}
                      onBlur={blurInput}
                    >
                      <option value="">اختر المحافظة...</option>
                      {['القاهرة','الجيزة','الإسكندرية','الشرقية','الدقهلية','القليوبية','البحيرة','المنوفية','الغربية','كفر الشيخ','دمياط','الإسماعيلية','بورسعيد','السويس','شمال سيناء','جنوب سيناء','الفيوم','بني سويف','المنيا','أسيوط','سوهاج','قنا','الأقصر','أسوان','البحر الأحمر','الوادي الجديد','مطروح'].map(g => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                    <ErrorMsg msg={step1Errors.governorate} />
                  </div>

                  {/* Detailed address */}
                  <div>
                    <Label error={step1Errors.address}>العنوان التفصيلي *</Label>
                    <textarea
                      value={address}
                      onChange={e => { setAddress(e.target.value); setStep1Errors(p => ({ ...p, address: '' })) }}
                      placeholder="الحي / المنطقة، الشارع، رقم المبنى، الشقة..."
                      rows={3}
                      style={{ ...inputStyle, resize: 'none', borderColor: step1Errors.address ? '#EF4444' : '#E5E7EB' }}
                      onFocus={e => focusInput(e, accentColor)}
                      onBlur={blurInput}
                    />
                    <ErrorMsg msg={step1Errors.address} />
                  </div>

                  <div>
                    <Label>ملاحظات للسائق (اختياري)</Label>
                    <input
                      type="text"
                      value={driverNote}
                      onChange={e => setDriverNote(e.target.value)}
                      placeholder="مثال: الدور الثاني، جنب المسجد"
                      style={inputStyle}
                      onFocus={e => focusInput(e, accentColor)}
                      onBlur={blurInput}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Table number */}
            {orderType === 'table' && (
              <div style={{ background: 'var(--surface)', borderRadius: 16, padding: '16px 16px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
                <p style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)', marginBottom: 12 }}>رقم الطاولة</p>
                <div>
                  <input
                    type="number"
                    value={tableNumber}
                    onChange={e => { setTableNumber(e.target.value); setStep1Errors(p => ({ ...p, tableNumber: '' })) }}
                    placeholder="مثال: 5"
                    style={{ ...inputStyle, borderColor: step1Errors.tableNumber ? '#EF4444' : '#E5E7EB', fontFamily: 'Inter, sans-serif' }}
                    onFocus={e => focusInput(e, accentColor)}
                    onBlur={blurInput}
                  />
                  <ErrorMsg msg={step1Errors.tableNumber} />
                </div>
              </div>
            )}

            <NextBtn
              onClick={() => { if (validateStep1()) goToStep(2) }}
              label="متابعة للدفع"
            />
          </div>
        )}

        {/* ── STEP 2: Payment ── */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <CompactSummary
              cartItems={cartItems} total={total}
              deliveryFee={deliveryFee} couponDiscount={couponDiscount}
              couponApplied={couponApplied} color={accentColor}
            />

            {/* Payment cards */}
            <div style={{ background: 'var(--surface)', borderRadius: 16, padding: '16px 16px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
              <p style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)', marginBottom: 14 }}>طريقة الدفع</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {paymentOptions.map(opt => (
                  <button
                    key={opt.key}
                    onClick={() => setPayment(opt.key)}
                    style={{
                      padding: '16px 18px', borderRadius: 14,
                      border: `2px solid ${payment === opt.key ? accentColor : '#E5E7EB'}`,
                      background: payment === opt.key ? accentColor + '08' : 'white',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14,
                      transition: 'all 0.15s', fontFamily: 'Zain, sans-serif', textAlign: 'right',
                    }}
                  >
                    <div style={{ width: 22, height: 22, borderRadius: '50%', border: `2.5px solid ${payment === opt.key ? accentColor : '#D1D5DB'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'border-color 0.15s' }}>
                      {payment === opt.key && <div style={{ width: 10, height: 10, borderRadius: '50%', background: accentColor }} />}
                    </div>
                    <span style={{ fontSize: 26 }}>{opt.icon}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: payment === opt.key ? accentColor : '#374151' }}>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <BackBtn onClick={() => goToStep(1)} />
              <NextBtn onClick={() => goToStep(3)} label="متابعة للمراجعة" />
            </div>
          </div>
        )}

        {/* ── STEP 3: Review & Confirm ── */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* Items list */}
            <div style={{ background: 'var(--surface)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
              <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)' }}>
                <p style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)' }}>أصناف الطلب</p>
              </div>
              {cartItems.map((item, idx) => (
                <div key={item.cartId} style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: idx < cartItems.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, color: '#1a1a1a', fontSize: 13 }}>{item.name}</p>
                    {item.modifiers && item.modifiers.length > 0 && (
                      <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>
                        {item.modifiers.map(m => m.name).filter(Boolean).join('، ')}
                      </p>
                    )}
                  </div>
                  <div style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 12, color: '#9CA3AF', fontFamily: 'Inter, sans-serif' }}>× {item.qty}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: accentColor, fontFamily: 'Inter, sans-serif' }}>{item.price * item.qty} ج</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon */}
            <div style={{ background: 'var(--surface)', borderRadius: 16, padding: '16px 16px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
              <p style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)', marginBottom: 12 }}>كود الخصم</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="text"
                  value={coupon}
                  onChange={e => { setCoupon(e.target.value); setCouponError('') }}
                  placeholder="أدخل كود الخصم"
                  style={{ ...inputStyle, flex: 1, borderColor: couponApplied ? '#22C55E' : '#E5E7EB', direction: 'ltr' }}
                  onFocus={e => focusInput(e, accentColor)}
                  onBlur={e => { e.target.style.borderColor = couponApplied ? '#22C55E' : '#E5E7EB'; e.target.style.boxShadow = 'none' }}
                />
                <button
                  onClick={applyCoupon}
                  style={{ padding: '11px 18px', borderRadius: 12, background: accentColor, color: 'white', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer', flexShrink: 0, fontFamily: 'Zain, sans-serif' }}
                >تطبيق</button>
              </div>
              {couponError && <p style={{ color: '#EF4444', fontSize: 12, marginTop: 6, fontWeight: 600 }}>{couponError}</p>}
              {couponApplied && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, background: '#F0FDF4', padding: '7px 12px', borderRadius: 10 }}>
                  <TickCircle size={13} color="#22C55E" />
                  <p style={{ color: '#16A34A', fontSize: 12, fontWeight: 700 }}>تم تطبيق خصم {couponDiscount} ج</p>
                </div>
              )}
            </div>

            {/* Totals breakdown */}
            <div style={{ background: 'var(--surface)', borderRadius: 16, padding: '16px 16px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
              <p style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)', marginBottom: 12 }}>ملخص المدفوعات</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--text-2)' }}>
                  <span>المجموع الفرعي</span>
                  <span style={{ fontFamily: 'Inter, sans-serif' }}>{total} ج</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--text-2)' }}>
                  <span>رسوم التوصيل</span>
                  <span style={{ fontFamily: 'Inter, sans-serif' }}>
                    {orderType === 'delivery' ? `${config.deliveryFee} ج` : 'مجاني'}
                  </span>
                </div>
                {couponApplied && couponDiscount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#22C55E' }}>
                    <span>الخصم</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}>− {couponDiscount} ج</span>
                  </div>
                )}
                <div style={{ borderTop: '1.5px dashed var(--border-strong)', paddingTop: 10, display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 18 }}>
                  <span style={{ color: 'var(--text)' }}>الإجمالي</span>
                  <span style={{ color: accentColor, fontFamily: 'Inter, sans-serif' }}>{finalTotal} ج</span>
                </div>
              </div>
            </div>

            {/* Delivery address summary */}
            {orderType === 'delivery' && address && (
              <div style={{ background: 'var(--surface)', borderRadius: 16, padding: '14px 16px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
                <p style={{ fontWeight: 800, fontSize: 13, color: '#374151', marginBottom: 6 }}>📍 عنوان التوصيل</p>
                {governorate && <p style={{ fontSize: 12, color: accentColor, fontWeight: 700, marginBottom: 2 }}>{governorate}</p>}
                <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>{address}</p>
                {driverNote && <p style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4 }}>ملاحظة: {driverNote}</p>}
              </div>
            )}

            {/* Payment method summary */}
            <div style={{ background: 'var(--surface)', borderRadius: 16, padding: '14px 16px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
              <p style={{ fontWeight: 800, fontSize: 13, color: '#374151', marginBottom: 6 }}>💳 طريقة الدفع</p>
              <p style={{ fontSize: 14, color: '#1a1a1a', fontWeight: 600 }}>
                {paymentOptions.find(p => p.key === payment)?.icon}{' '}
                {paymentOptions.find(p => p.key === payment)?.label}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <BackBtn onClick={() => goToStep(2)} />
              <NextBtn
                onClick={handleConfirmOrder}
                label={`تأكيد الطلب · ${finalTotal} ج`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
