import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Trash2, MapPin, MessageSquare, Tag, CheckCircle } from 'lucide-react'
import { getConfig, addOrder, getCoupons } from '../lib/restaurantStore'
import { useCart } from './CartContext'

const inputStyle = {
  width: '100%', padding: '11px 14px', borderRadius: 12, border: '1.5px solid #e5e7eb',
  fontSize: 14, outline: 'none', fontFamily: 'Cairo, sans-serif', background: 'white',
  color: '#1a1a1a', boxSizing: 'border-box', transition: 'border-color 0.15s',
}

export default function Cart() {
  const navigate = useNavigate()
  const config = getConfig()
  const { cartItems, removeItem, updateQty, clearCart, total, itemCount } = useCart()

  const [orderType, setOrderType] = useState('delivery')
  const [address, setAddress] = useState('')
  const [driverNote, setDriverNote] = useState('')
  const [tableNumber, setTableNumber] = useState('')
  const [name, setName] = useState(() => localStorage.getItem('customer_name') || '')
  const [phone, setPhone] = useState(() => localStorage.getItem('customer_phone') || '')
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponDiscount, setCouponDiscount] = useState(0)
  const [couponError, setCouponError] = useState('')
  const [payment, setPayment] = useState('cash')
  const [confirmDelete, setConfirmDelete] = useState(null)

  useEffect(() => { localStorage.setItem('customer_name', name) }, [name])
  useEffect(() => { localStorage.setItem('customer_phone', phone) }, [phone])

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase()
    const coupons = getCoupons()
    const match = coupons.find(c => c.code === code)
    if (!match) {
      setCouponError('كود غير صحيح'); setCouponApplied(false); setCouponDiscount(0)
      return
    }
    if (match.max && match.used >= match.max) {
      setCouponError('هذا الكوبون وصل لأقصى عدد استخدامات'); setCouponApplied(false); setCouponDiscount(0)
      return
    }
    if (match.expiry && new Date(match.expiry) < new Date()) {
      setCouponError('هذا الكوبون منتهي الصلاحية'); setCouponApplied(false); setCouponDiscount(0)
      return
    }
    if (match.minOrder && total < match.minOrder) {
      setCouponError(`الحد الأدنى للطلب ${match.minOrder} ج لاستخدام هذا الكوبون`); setCouponApplied(false); setCouponDiscount(0)
      return
    }
    const discount = match.type === 'percent' ? Math.round(total * match.value / 100) : match.value
    setCouponApplied(true); setCouponDiscount(discount); setCouponError('')
  }

  const deliveryFee = orderType === 'delivery' ? config.deliveryFee : 0
  const finalTotal = Math.max(0, total + deliveryFee - couponDiscount)
  const canOrder = !!(name && phone &&
    (orderType !== 'delivery' || address.trim()) &&
    (orderType !== 'table' || tableNumber) &&
    !(config.minOrder && total < config.minOrder && orderType === 'delivery'))

  const handleQtyChange = (cartId, newQty) => {
    if (newQty <= 0) setConfirmDelete(cartId)
    else updateQty(cartId, newQty)
  }

  const handleConfirmOrder = () => {
    if (!canOrder) return
    const paymentLabels = { cash: 'كاش عند الاستلام', card: 'بطاقة بنكية', fawry: 'فوري' }
    const order = {
      customer: name, phone,
      table: orderType === 'table' ? `طاولة ${tableNumber}` : orderType === 'delivery' ? 'توصيل' : 'استلام',
      items: cartItems.map(i => i.name).join(' + '),
      total: finalTotal, payment: paymentLabels[payment],
      details: cartItems.map(i => ({ name: i.name, qty: i.qty, price: i.price, note: i.note })),
      address: orderType === 'delivery' ? address : '',
      note: orderType === 'delivery' ? driverNote : '',
      coupon: couponApplied ? coupon.trim().toUpperCase() : '',
      orderType, deliveryFee,
    }
    const savedOrder = addOrder(order)
    clearCart()
    navigate('/order-confirm', { state: { order: savedOrder } })
  }

  const Card = ({ children, style = {} }) => (
    <div style={{ background: 'white', borderRadius: 20, overflow: 'hidden', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', border: '1px solid #f3f4f6', ...style }}>
      {children}
    </div>
  )

  const CardHeader = ({ title }) => (
    <div style={{ padding: '14px 18px', borderBottom: '1px solid #f9fafb' }}>
      <p style={{ fontWeight: 800, fontSize: 14, color: '#1a1a1a' }}>{title}</p>
    </div>
  )

  if (itemCount === 0) {
    return (
      <div style={{ minHeight: '100vh', background: '#f9fafb', fontFamily: 'Cairo, sans-serif', direction: 'rtl' }}>
        <div style={{ background: 'white', borderBottom: '1px solid #f3f4f6', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10, position: 'sticky', top: 0, zIndex: 10 }}>
          <button onClick={() => navigate(-1)} style={{ padding: 8, borderRadius: 10, background: '#f9fafb', border: 'none', cursor: 'pointer', display: 'flex' }}>
            <ArrowLeft size={18} color="#374151" />
          </button>
          <h1 style={{ fontWeight: 800, color: '#1a1a1a', fontSize: 17 }}>سلتك</h1>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 48, textAlign: 'center', minHeight: 'calc(100vh - 60px)' }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>🛒</div>
          <p style={{ fontWeight: 800, color: '#1a1a1a', fontSize: 20, marginBottom: 8 }}>سلتك فارغة</p>
          <p style={{ color: '#9ca3af', fontSize: 14, marginBottom: 28 }}>لم تضف أي أصناف بعد</p>
          <button onClick={() => navigate(-1)} style={{ padding: '12px 28px', borderRadius: 14, background: config.color, color: 'white', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}>
            تصفح القائمة
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', fontFamily: 'Cairo, sans-serif', direction: 'rtl' }}>
      {/* Header */}
      <div style={{ background: 'white', borderBottom: '1px solid #f3f4f6', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10, position: 'sticky', top: 0, zIndex: 10 }}>
        <button onClick={() => navigate(-1)} style={{ padding: 8, borderRadius: 10, background: '#f9fafb', border: 'none', cursor: 'pointer', display: 'flex' }}>
          <ArrowLeft size={18} color="#374151" />
        </button>
        <h1 style={{ fontWeight: 800, color: '#1a1a1a', fontSize: 17 }}>سلتك</h1>
        <span style={{ fontSize: 13, color: '#9ca3af' }}>({itemCount} أصناف)</span>
      </div>

      <div style={{ maxWidth: 480, margin: '0 auto', padding: '16px 16px 140px', display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* Cart Items */}
        <Card>
          {cartItems.map((item, idx) => (
            <div key={item.cartId} style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: idx < cartItems.length - 1 ? '1px solid #f9fafb' : 'none' }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, background: config.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>🍽️</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 700, color: '#1a1a1a', fontSize: 14 }}>{item.name}</p>
                {item.note && <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 2 }}>ملاحظة: {item.note}</p>}
                <p style={{ fontWeight: 800, fontSize: 14, color: config.color, marginTop: 3 }}>{item.price * item.qty} ج</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                <button onClick={() => handleQtyChange(item.cartId, item.qty - 1)} style={{ width: 28, height: 28, borderRadius: '50%', border: '1.5px solid #e5e7eb', background: 'white', cursor: 'pointer', fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                <span style={{ fontWeight: 700, fontSize: 15, minWidth: 20, textAlign: 'center' }}>{item.qty}</span>
                <button onClick={() => updateQty(item.cartId, item.qty + 1)} style={{ width: 28, height: 28, borderRadius: '50%', background: config.color, border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 700, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                <button onClick={() => setConfirmDelete(item.cartId)} style={{ width: 28, height: 28, borderRadius: '50%', background: '#fef2f2', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 4 }}>
                  <Trash2 size={13} color="#ef4444" />
                </button>
              </div>
            </div>
          ))}
        </Card>

        {/* Order type */}
        <Card>
          <CardHeader title="طريقة الطلب" />
          <div style={{ padding: '14px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            {[
              { key: 'delivery', label: 'توصيل', icon: '🛵', enabled: config.allowDelivery },
              { key: 'pickup', label: 'استلام', icon: '🏪', enabled: config.allowPickup },
              { key: 'table', label: 'طاولة', icon: '🪑', enabled: config.allowTable },
            ].map(opt => (
              <button key={opt.key} onClick={() => opt.enabled && setOrderType(opt.key)} disabled={!opt.enabled}
                style={{ padding: '12px 8px', borderRadius: 14, fontSize: 13, fontWeight: 700, cursor: opt.enabled ? 'pointer' : 'not-allowed', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, transition: 'all 0.15s', border: `2px solid ${orderType === opt.key ? config.color : '#e5e7eb'}`, background: orderType === opt.key ? config.color + '10' : 'white', color: orderType === opt.key ? config.color : '#6b7280', opacity: opt.enabled ? 1 : 0.4, fontFamily: 'Cairo, sans-serif' }}
              >
                <span style={{ fontSize: 22 }}>{opt.icon}</span>
                {opt.label}
              </button>
            ))}
          </div>
        </Card>

        {/* Delivery fields */}
        {orderType === 'delivery' && (
          <Card>
            <CardHeader title="بيانات التوصيل" />
            <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6 }}>عنوانك *</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={15} style={{ position: 'absolute', right: 12, top: 14, color: '#9ca3af' }} />
                  <textarea value={address} onChange={e => setAddress(e.target.value)} placeholder="الشارع، المنطقة، المبنى..." rows={2}
                    style={{ ...inputStyle, paddingRight: 36, resize: 'none' }}
                    onFocus={e => e.target.style.borderColor = config.color}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6 }}>ملاحظة للسواق</label>
                <div style={{ position: 'relative' }}>
                  <MessageSquare size={15} style={{ position: 'absolute', right: 12, top: 13, color: '#9ca3af' }} />
                  <input type="text" value={driverNote} onChange={e => setDriverNote(e.target.value)} placeholder="مثال: الدور الثاني، جنب المسجد"
                    style={{ ...inputStyle, paddingRight: 36 }}
                    onFocus={e => e.target.style.borderColor = config.color}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Table number */}
        {orderType === 'table' && (
          <Card>
            <CardHeader title="رقم الطاولة" />
            <div style={{ padding: '14px 16px' }}>
              <input type="number" value={tableNumber} onChange={e => setTableNumber(e.target.value)} placeholder="مثال: 5"
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = config.color}
                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
          </Card>
        )}

        {/* Customer info */}
        <Card>
          <CardHeader title="بياناتك" />
          <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'اسمك *', value: name, onChange: e => setName(e.target.value), placeholder: 'اسمك الكامل', type: 'text' },
              { label: 'موبايلك *', value: phone, onChange: e => setPhone(e.target.value), placeholder: '01XXXXXXXXX', type: 'tel' },
            ].map(f => (
              <div key={f.label}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#374151', marginBottom: 6 }}>{f.label}</label>
                <input type={f.type} value={f.value} onChange={f.onChange} placeholder={f.placeholder}
                  style={{ ...inputStyle, direction: f.type === 'tel' ? 'ltr' : 'rtl' }}
                  onFocus={e => e.target.style.borderColor = config.color}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Coupon */}
        <Card>
          <CardHeader title="كود الخصم" />
          <div style={{ padding: '14px 16px' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <input type="text" value={coupon} onChange={e => { setCoupon(e.target.value); setCouponError('') }} placeholder="أدخل الكود هنا"
                style={{ ...inputStyle, flex: 1, direction: 'ltr' }}
                onFocus={e => e.target.style.borderColor = config.color}
                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
              />
              <button onClick={applyCoupon} style={{ padding: '11px 16px', borderRadius: 12, background: config.color, color: 'white', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer', flexShrink: 0, fontFamily: 'Cairo, sans-serif' }}>
                تطبيق
              </button>
            </div>
            {couponError && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 6 }}>{couponError}</p>}
            {couponApplied && <p style={{ color: '#22c55e', fontSize: 12, fontWeight: 600, marginTop: 6, display: 'flex', alignItems: 'center', gap: 5 }}><CheckCircle size={13} /> تم تطبيق خصم {couponDiscount} ج</p>}
          </div>
        </Card>

        {/* Payment */}
        <Card>
          <CardHeader title="طريقة الدفع" />
          <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { key: 'cash', label: 'كاش عند الاستلام', icon: '💵' },
              { key: 'card', label: 'بطاقة بنكية', icon: '💳' },
              { key: 'fawry', label: 'فوري', icon: '📱' },
            ].map(opt => (
              <label key={opt.key} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 14, border: `1.5px solid ${payment === opt.key ? config.color : '#e5e7eb'}`, background: payment === opt.key ? config.color + '08' : 'white', cursor: 'pointer', transition: 'all 0.15s' }}>
                <input type="radio" name="payment" value={opt.key} checked={payment === opt.key} onChange={() => setPayment(opt.key)} style={{ display: 'none' }} />
                <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${payment === opt.key ? config.color : '#d1d5db'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {payment === opt.key && <div style={{ width: 8, height: 8, borderRadius: '50%', background: config.color }} />}
                </div>
                <span style={{ fontSize: 20 }}>{opt.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>{opt.label}</span>
              </label>
            ))}
          </div>
        </Card>

        {/* Summary */}
        <Card>
          <CardHeader title="ملخص الطلب" />
          <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { label: 'المجموع', value: `${total} ج`, color: '#374151' },
              ...(orderType === 'delivery' ? [{ label: 'رسوم التوصيل', value: `${config.deliveryFee} ج`, color: '#374151' }] : []),
              ...(couponApplied ? [{ label: 'خصم الكوبون', value: `− ${couponDiscount} ج`, color: '#22c55e' }] : []),
            ].map(r => (
              <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#6b7280' }}>
                <span>{r.label}</span>
                <span style={{ fontWeight: 600, color: r.color }}>{r.value}</span>
              </div>
            ))}
            <div style={{ borderTop: '1.5px solid #f3f4f6', paddingTop: 10, display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 17, color: '#1a1a1a' }}>
              <span>الإجمالي</span>
              <span style={{ color: config.color }}>{finalTotal} ج</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Sticky confirm */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'white', borderTop: '1px solid #f3f4f6', padding: '14px 16px', zIndex: 20 }}>
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <button onClick={handleConfirmOrder} disabled={!canOrder}
            style={{ width: '100%', padding: '16px', borderRadius: 16, background: canOrder ? config.color : '#e5e7eb', color: canOrder ? 'white' : '#9ca3af', fontWeight: 800, fontSize: 15, border: 'none', cursor: canOrder ? 'pointer' : 'not-allowed', fontFamily: 'Cairo, sans-serif', boxShadow: canOrder ? `0 6px 24px ${config.color}40` : 'none', transition: 'all 0.2s' }}
          >
            تأكيد الطلب · {finalTotal} ج
          </button>
        </div>
      </div>

      {/* Delete confirm */}
      {confirmDelete && (
        <div onClick={() => setConfirmDelete(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: 'white', borderRadius: 20, padding: '24px 20px', width: '100%', maxWidth: 300, textAlign: 'center' }}>
            <p style={{ fontWeight: 800, color: '#1a1a1a', fontSize: 16, marginBottom: 16 }}>تحذف هذا الصنف؟</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setConfirmDelete(null)} style={{ flex: 1, padding: '11px', borderRadius: 12, border: '1.5px solid #e5e7eb', fontSize: 14, fontWeight: 700, color: '#6b7280', background: 'white', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}>إلغاء</button>
              <button onClick={() => { removeItem(confirmDelete); setConfirmDelete(null) }} style={{ flex: 1, padding: '11px', borderRadius: 12, border: 'none', fontSize: 14, fontWeight: 700, color: 'white', background: '#ef4444', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}>احذف</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
