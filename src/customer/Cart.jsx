import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ShoppingCart, Trash2, MapPin, MessageSquare } from 'lucide-react'
import { getConfig, addOrder } from '../lib/restaurantStore'
import { useCart } from './CartContext'

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

  useEffect(() => {
    localStorage.setItem('customer_name', name)
  }, [name])
  useEffect(() => {
    localStorage.setItem('customer_phone', phone)
  }, [phone])

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'WELCOME20') {
      setCouponApplied(true)
      setCouponDiscount(20)
      setCouponError('')
    } else {
      setCouponError('كود غير صحيح')
      setCouponApplied(false)
      setCouponDiscount(0)
    }
  }

  const deliveryFee = orderType === 'delivery' ? config.deliveryFee : 0
  const finalTotal = total + deliveryFee - couponDiscount

  const handleQtyChange = (cartId, newQty) => {
    if (newQty <= 0) {
      setConfirmDelete(cartId)
    } else {
      updateQty(cartId, newQty)
    }
  }

  const handleConfirmOrder = () => {
    if (!name || !phone) return

    const typeLabels = { delivery: 'توصيل', pickup: 'استلام', table: 'طاولة' }
    const paymentLabels = { cash: 'كاش عند الاستلام', card: 'بطاقة بنكية', fawry: 'فوري' }

    const orderDetails = cartItems.map(i => ({
      name: i.name,
      qty: i.qty,
      price: i.price,
      note: i.note,
    }))

    const order = {
      customer: name,
      phone,
      table: orderType === 'table' ? `طاولة ${tableNumber}` : orderType === 'delivery' ? 'توصيل' : 'استلام',
      items: cartItems.map(i => i.name).join(' + '),
      total: finalTotal,
      payment: paymentLabels[payment],
      details: orderDetails,
      address: orderType === 'delivery' ? address : '',
      note: orderType === 'delivery' ? driverNote : '',
      coupon: couponApplied ? coupon.trim().toUpperCase() : '',
      orderType,
      deliveryFee,
    }

    const savedOrder = addOrder(order)
    clearCart()
    navigate('/order-confirm', { state: { order: savedOrder } })
  }

  if (itemCount === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col" dir="rtl">
        <div className="bg-white border-b border-gray-100 px-4 py-4 flex items-center gap-3 sticky top-0 z-10">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-gray-100">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="font-bold text-gray-900 text-lg">سلتك</h1>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
          <div className="text-6xl">🛒</div>
          <p className="font-bold text-gray-700 text-xl">سلتك فارغة</p>
          <p className="text-gray-400 text-sm">لم تضف أي أصناف بعد</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-3 rounded-xl text-white font-bold"
            style={{ background: config.color }}
          >
            تصفح القائمة
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 flex items-center gap-3 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-gray-100">
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="font-bold text-gray-900 text-lg">سلتك</h1>
        <span className="text-gray-400 text-sm">({itemCount} أصناف)</span>
      </div>

      <div className="max-w-lg mx-auto px-4 pb-32 space-y-4 mt-4">
        {/* Cart Items */}
        <div className="bg-white rounded-2xl overflow-hidden">
          {cartItems.map((item, idx) => (
            <div key={item.cartId} className={`p-4 flex items-start gap-3 ${idx < cartItems.length - 1 ? 'border-b border-gray-50' : ''}`}>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: `${config.color}22` }}
              >
                🍽️
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                {item.note && <p className="text-xs text-gray-400 mt-0.5">ملاحظة: {item.note}</p>}
                <p className="font-bold text-sm mt-1" style={{ color: config.color }}>{item.price * item.qty} ج</p>
              </div>
              {/* Qty stepper */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => handleQtyChange(item.cartId, item.qty - 1)}
                  className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-sm font-bold hover:bg-gray-50"
                >
                  −
                </button>
                <span className="text-sm font-bold w-5 text-center">{item.qty}</span>
                <button
                  onClick={() => updateQty(item.cartId, item.qty + 1)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: config.color }}
                >
                  +
                </button>
                <button
                  onClick={() => setConfirmDelete(item.cartId)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-red-400 hover:bg-red-50 mr-1"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order type */}
        <div className="bg-white rounded-2xl p-4">
          <p className="font-bold text-gray-800 mb-3">طريقة الطلب</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { key: 'delivery', label: 'توصيل', icon: '🛵', enabled: config.allowDelivery },
              { key: 'pickup', label: 'استلام', icon: '🏪', enabled: config.allowPickup },
              { key: 'table', label: 'طاولة', icon: '🪑', enabled: config.allowTable },
            ].map(opt => (
              <button
                key={opt.key}
                onClick={() => opt.enabled && setOrderType(opt.key)}
                disabled={!opt.enabled}
                className={`py-3 rounded-xl border-2 text-sm font-semibold transition-all flex flex-col items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed`}
                style={orderType === opt.key
                  ? { borderColor: config.color, background: `${config.color}11`, color: config.color }
                  : { borderColor: '#e5e7eb', color: '#6b7280' }
                }
              >
                <span className="text-xl">{opt.icon}</span>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Delivery fields */}
        {orderType === 'delivery' && (
          <div className="bg-white rounded-2xl p-4 space-y-3">
            <p className="font-bold text-gray-800">بيانات التوصيل</p>
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1.5 block">عنوانك *</label>
              <div className="relative">
                <MapPin size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <textarea
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="الشارع، المنطقة، المبنى..."
                  rows={2}
                  className="w-full pr-9 pl-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400 resize-none"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1.5 block">ملاحظة للسواق</label>
              <div className="relative">
                <MessageSquare size={16} className="absolute right-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={driverNote}
                  onChange={e => setDriverNote(e.target.value)}
                  placeholder="مثال: الدور الثاني، جنب المسجد"
                  className="w-full pr-9 pl-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* Table number */}
        {orderType === 'table' && (
          <div className="bg-white rounded-2xl p-4">
            <label className="text-sm font-semibold text-gray-600 mb-1.5 block">رقم الطاولة *</label>
            <input
              type="number"
              value={tableNumber}
              onChange={e => setTableNumber(e.target.value)}
              placeholder="مثال: 5"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400"
            />
          </div>
        )}

        {/* Customer info */}
        <div className="bg-white rounded-2xl p-4 space-y-3">
          <p className="font-bold text-gray-800">بياناتك</p>
          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1.5 block">اسمك *</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="اسمك الكامل"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1.5 block">موبايلك *</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="01XXXXXXXXX"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400"
              dir="ltr"
            />
          </div>
        </div>

        {/* Coupon */}
        <div className="bg-white rounded-2xl p-4">
          <p className="font-bold text-gray-800 mb-3">كود الخصم</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={coupon}
              onChange={e => { setCoupon(e.target.value); setCouponError('') }}
              placeholder="أدخل الكود هنا"
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-orange-400"
              dir="ltr"
            />
            <button
              onClick={applyCoupon}
              className="px-4 py-2.5 rounded-xl text-white text-sm font-bold flex-shrink-0"
              style={{ background: config.color }}
            >
              تطبيق
            </button>
          </div>
          {couponError && <p className="text-red-500 text-xs mt-1.5">{couponError}</p>}
          {couponApplied && <p className="text-green-600 text-xs mt-1.5 font-semibold">✓ تم تطبيق خصم 20 ج</p>}
        </div>

        {/* Payment method */}
        <div className="bg-white rounded-2xl p-4">
          <p className="font-bold text-gray-800 mb-3">طريقة الدفع</p>
          <div className="space-y-2">
            {[
              { key: 'cash', label: 'كاش عند الاستلام', icon: '💵' },
              { key: 'card', label: 'بطاقة بنكية', icon: '💳' },
              { key: 'fawry', label: 'فوري', icon: '📱' },
            ].map(opt => (
              <label
                key={opt.key}
                className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all"
                style={payment === opt.key
                  ? { borderColor: config.color, background: `${config.color}0d` }
                  : { borderColor: '#e5e7eb' }
                }
              >
                <input
                  type="radio"
                  name="payment"
                  value={opt.key}
                  checked={payment === opt.key}
                  onChange={() => setPayment(opt.key)}
                  className="hidden"
                />
                <div
                  className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                  style={payment === opt.key
                    ? { borderColor: config.color }
                    : { borderColor: '#d1d5db' }
                  }
                >
                  {payment === opt.key && (
                    <div className="w-2 h-2 rounded-full" style={{ background: config.color }} />
                  )}
                </div>
                <span className="text-lg">{opt.icon}</span>
                <span className="text-sm font-semibold text-gray-700">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl p-4 space-y-2">
          <p className="font-bold text-gray-800 mb-3">ملخص الطلب</p>
          <div className="flex justify-between text-sm text-gray-600">
            <span>المجموع</span>
            <span>{total} ج</span>
          </div>
          {orderType === 'delivery' && (
            <div className="flex justify-between text-sm text-gray-600">
              <span>رسوم التوصيل</span>
              <span>{config.deliveryFee} ج</span>
            </div>
          )}
          {couponApplied && (
            <div className="flex justify-between text-sm text-green-600">
              <span>خصم الكوبون</span>
              <span>− {couponDiscount} ج</span>
            </div>
          )}
          <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-gray-900 text-lg">
            <span>الإجمالي</span>
            <span>{finalTotal} ج</span>
          </div>
        </div>
      </div>

      {/* Fixed confirm button */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-100 p-4">
        <div className="max-w-lg mx-auto">
          <button
            onClick={handleConfirmOrder}
            disabled={!name || !phone}
            className="w-full py-4 rounded-xl text-white font-bold text-base disabled:opacity-40 transition-opacity"
            style={{ background: config.color }}
          >
            تأكيد الطلب · {finalTotal} ج
          </button>
        </div>
      </div>

      {/* Delete confirmation */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setConfirmDelete(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-xs" onClick={e => e.stopPropagation()}>
            <p className="font-bold text-gray-900 text-center mb-4">تحذف هذا الصنف؟</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600"
              >
                إلغاء
              </button>
              <button
                onClick={() => { removeItem(confirmDelete); setConfirmDelete(null) }}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold"
              >
                احذف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
