import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, X } from 'lucide-react'
import { getConfig, getCoupons } from '../lib/restaurantStore'
import { useCart } from './CartContext'
import CustomerNav from './CustomerNav'

export default function Cart() {
  const navigate = useNavigate()
  const config = getConfig()
  const { cartItems, removeItem, updateQty, clearCart, total, itemCount } = useCart()

  const [orderType, setOrderType] = useState('delivery')
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponDiscount, setCouponDiscount] = useState(0)
  const [couponError, setCouponError] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [confirmClearAll, setConfirmClearAll] = useState(false)

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
  const minOrderOk = !(config.minOrder && total < config.minOrder && orderType === 'delivery')
  const canProceed = itemCount > 0 && minOrderOk

  const handleQtyChange = (cartId, newQty) => {
    if (newQty <= 0) setConfirmDelete(cartId)
    else updateQty(cartId, newQty)
  }

  const handleProceed = () => {
    if (!canProceed) return
    localStorage.setItem('cart_coupon', JSON.stringify({
      coupon: couponApplied ? coupon.trim().toUpperCase() : '',
      couponApplied,
      couponDiscount,
      orderType,
    }))
    navigate('/checkout')
  }

  if (itemCount === 0) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'Cairo, sans-serif', direction: 'rtl' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 48, textAlign: 'center', minHeight: 'calc(100vh - 64px)' }}>
          <div style={{ fontSize: 72, marginBottom: 20, lineHeight: 1 }}>🛒</div>
          <p style={{ fontWeight: 800, color: 'var(--text)', fontSize: 22, marginBottom: 8 }}>سلتك فارغة</p>
          <p style={{ color: 'var(--text-3)', fontSize: 14, marginBottom: 32 }}>لم تضف أي أصناف بعد</p>
          <button onClick={() => navigate(-1)} style={{ padding: '14px 32px', borderRadius: 16, background: config.color, color: 'white', fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer', fontFamily: 'Cairo, sans-serif', boxShadow: `0 6px 20px ${config.color}40` }}>
            تصفح القائمة
          </button>
        </div>
        <CustomerNav />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'Cairo, sans-serif', direction: 'rtl' }}>

      <div style={{ padding: '16px 14px 88px', display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* ── Items list ── */}
        <div style={{ background: 'var(--surface)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
          {cartItems.map((item, idx) => (
            <div key={item.cartId} style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{
                padding: '14px 14px', display: 'flex', alignItems: 'center', gap: 12,
                borderBottom: idx < cartItems.length - 1 ? '1px solid var(--border)' : 'none',
                background: 'var(--surface)',
              }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: config.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                  {item.image ? <img src={item.image} alt="" style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} /> : '🍽️'}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14, marginBottom: 2 }}>{item.name}</p>
                  {item.modifiers && item.modifiers.length > 0 && (
                    <p style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 3 }}>
                      {item.modifiers.map(m => m.name).filter(Boolean).join('، ')}
                    </p>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'Inter, sans-serif' }}>
                      {item.price} ج × {item.qty}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--text-3)' }}>=</span>
                    <span style={{ fontSize: 13, fontWeight: 800, color: config.color, fontFamily: 'Inter, sans-serif' }}>
                      {item.price * item.qty} ج
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                  <button
                    onClick={() => handleQtyChange(item.cartId, item.qty - 1)}
                    style={{ width: 30, height: 30, borderRadius: '50%', border: '1.5px solid var(--border-strong)', background: 'var(--surface)', cursor: 'pointer', fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text)' }}
                  >−</button>
                  <span style={{ fontWeight: 700, fontSize: 15, minWidth: 22, textAlign: 'center', fontFamily: 'Inter, sans-serif', color: 'var(--text)' }}>{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.cartId, item.qty + 1)}
                    style={{ width: 30, height: 30, borderRadius: '50%', background: config.color, border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 700, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >+</button>
                </div>
                <button
                  onClick={() => setConfirmDelete(item.cartId)}
                  style={{ width: 30, height: 30, borderRadius: '50%', background: '#FEF2F2', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginRight: -2 }}
                >
                  <X size={13} color="#EF4444" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ── Order summary card ── */}
        <div style={{ background: 'var(--surface)', borderRadius: '20px 20px 16px 16px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', overflow: 'hidden' }}>

          {/* Order type */}
          <div style={{ padding: '16px 14px 12px', borderBottom: '1px solid var(--border)' }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>طريقة الطلب</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {[
                { key: 'delivery', label: 'توصيل', icon: '🚗', enabled: config.allowDelivery },
                { key: 'pickup', label: 'استلام', icon: '🏃', enabled: config.allowPickup },
                { key: 'table', label: 'طاولة', icon: '🍽️', enabled: config.allowTable },
              ].map(opt => (
                <button
                  key={opt.key}
                  onClick={() => opt.enabled && setOrderType(opt.key)}
                  disabled={!opt.enabled}
                  style={{
                    padding: '10px 6px', borderRadius: 12, fontSize: 12, fontWeight: 700,
                    cursor: opt.enabled ? 'pointer' : 'not-allowed',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                    transition: 'all 0.15s',
                    border: `2px solid ${orderType === opt.key ? config.color : 'var(--border-strong)'}`,
                    background: orderType === opt.key ? config.color + '12' : 'var(--surface-2)',
                    color: orderType === opt.key ? config.color : 'var(--text-2)',
                    opacity: opt.enabled ? 1 : 0.4,
                    fontFamily: 'Cairo, sans-serif',
                  }}
                >
                  <span style={{ fontSize: 20 }}>{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Coupon */}
          <div style={{ padding: '14px 14px 12px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="text"
                value={coupon}
                onChange={e => { setCoupon(e.target.value); setCouponError('') }}
                placeholder="أدخل كود الخصم"
                style={{ flex: 1, padding: '11px 14px', borderRadius: 12, border: `1.5px solid ${couponApplied ? '#22C55E' : 'var(--border-strong)'}`, fontSize: 13, outline: 'none', fontFamily: 'Cairo, sans-serif', background: 'var(--surface)', color: 'var(--text)', boxSizing: 'border-box', direction: 'ltr' }}
                onFocus={e => { e.target.style.borderColor = config.color; e.target.style.boxShadow = `0 0 0 3px ${config.color}22` }}
                onBlur={e => { e.target.style.borderColor = couponApplied ? '#22C55E' : 'var(--border-strong)'; e.target.style.boxShadow = 'none' }}
              />
              <button
                onClick={applyCoupon}
                style={{ padding: '11px 18px', borderRadius: 12, background: config.color, color: 'white', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer', flexShrink: 0, fontFamily: 'Cairo, sans-serif' }}
              >تطبيق</button>
            </div>
            {couponError && <p style={{ color: '#EF4444', fontSize: 12, marginTop: 6, fontWeight: 600 }}>{couponError}</p>}
            {couponApplied && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, background: '#F0FDF4', padding: '6px 10px', borderRadius: 8 }}>
                <CheckCircle size={13} color="#22C55E" />
                <p style={{ color: '#16A34A', fontSize: 12, fontWeight: 700 }}>تم تطبيق خصم {couponDiscount} ج</p>
              </div>
            )}
          </div>

          {/* Summary rows */}
          <div style={{ padding: '14px 14px 8px', display: 'flex', flexDirection: 'column', gap: 10 }}>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--text-2)' }}>
                <span>الخصم</span>
                <span style={{ fontWeight: 700, color: '#22C55E', fontFamily: 'Inter, sans-serif' }}>− {couponDiscount} ج</span>
              </div>
            )}
            <div style={{ borderTop: '1.5px dashed var(--border-strong)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 18 }}>
              <span style={{ color: 'var(--text)' }}>الإجمالي</span>
              <span style={{ color: config.color, fontFamily: 'Inter, sans-serif' }}>{finalTotal} ج</span>
            </div>
          </div>

          {/* Min order warning */}
          {config.minOrder && total < config.minOrder && orderType === 'delivery' && (
            <div style={{ margin: '0 14px 14px', padding: '10px 14px', background: '#FEF2F2', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 16 }}>⚠️</span>
              <p style={{ color: '#DC2626', fontSize: 12, fontWeight: 700 }}>
                الحد الأدنى للطلب {config.minOrder} ج — أضف {config.minOrder - total} ج أكثر
              </p>
            </div>
          )}

          <div style={{ padding: '0 14px 16px' }}>
            <button
              onClick={handleProceed}
              disabled={!canProceed}
              style={{
                width: '100%', padding: '16px', borderRadius: 18,
                background: canProceed ? config.color : 'var(--surface-2)',
                color: canProceed ? 'white' : 'var(--text-3)',
                fontWeight: 800, fontSize: 16, border: 'none',
                cursor: canProceed ? 'pointer' : 'not-allowed',
                fontFamily: 'Cairo, sans-serif',
                boxShadow: canProceed ? `0 6px 20px ${config.color}40` : 'none',
                transition: 'all 0.2s',
              }}
            >
              متابعة للدفع
            </button>
          </div>
        </div>
      </div>

      {/* Delete item confirm */}
      {confirmDelete && (
        <div onClick={() => setConfirmDelete(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: 'var(--surface)', borderRadius: '20px 20px 0 0', padding: '24px 20px 32px', width: '100%', maxWidth: 480, textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🗑️</div>
            <p style={{ fontWeight: 800, color: 'var(--text)', fontSize: 17, marginBottom: 6 }}>تحذف هذا الصنف؟</p>
            <p style={{ color: 'var(--text-3)', fontSize: 13, marginBottom: 20 }}>سيتم إزالة الصنف من سلتك</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setConfirmDelete(null)} style={{ flex: 1, padding: '13px', borderRadius: 14, border: '1.5px solid var(--border-strong)', fontSize: 14, fontWeight: 700, color: 'var(--text-2)', background: 'var(--surface)', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}>إلغاء</button>
              <button onClick={() => { removeItem(confirmDelete); setConfirmDelete(null) }} style={{ flex: 1, padding: '13px', borderRadius: 14, border: 'none', fontSize: 14, fontWeight: 700, color: 'white', background: '#EF4444', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}>احذف</button>
            </div>
          </div>
        </div>
      )}

      {/* Clear all confirm */}
      {confirmClearAll && (
        <div onClick={() => setConfirmClearAll(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: 'var(--surface)', borderRadius: '20px 20px 0 0', padding: '24px 20px 32px', width: '100%', maxWidth: 480, textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🗑️</div>
            <p style={{ fontWeight: 800, color: 'var(--text)', fontSize: 17, marginBottom: 6 }}>تفريغ السلة؟</p>
            <p style={{ color: 'var(--text-3)', fontSize: 13, marginBottom: 20 }}>سيتم حذف جميع المنتجات من سلتك</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setConfirmClearAll(false)} style={{ flex: 1, padding: '13px', borderRadius: 14, border: '1.5px solid var(--border-strong)', fontSize: 14, fontWeight: 700, color: 'var(--text-2)', background: 'var(--surface)', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}>إلغاء</button>
              <button onClick={() => { clearCart(); setConfirmClearAll(false) }} style={{ flex: 1, padding: '13px', borderRadius: 14, border: 'none', fontSize: 14, fontWeight: 700, color: 'white', background: '#EF4444', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}>افرغ السلة</button>
            </div>
          </div>
        </div>
      )}
      <CustomerNav />
    </div>
  )
}
