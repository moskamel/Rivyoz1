import { mockMenuItems, mockMenuCategories, mockOrders } from './mock'

const defaultConfig = {
  name: 'مطعم الشيف أحمد',
  slug: 'chef-ahmed',
  color: '#f97316',
  description: 'مطعم مشويات طازجة',
  address: 'التجمع الخامس، القاهرة',
  phone: '01012345678',
  isOpen: true,
  closesAt: '11 مساءً',
  opensAt: '12:00',
  deliveryFee: 15,
  minOrder: 50,
  deliveryTime: 30,
  bannerUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=300&fit=crop&q=80',
  logoUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200&h=200&fit=crop&q=80',
  allowDelivery: true,
  allowPickup: true,
  allowTable: false,
}

export function getConfig() {
  try {
    const raw = localStorage.getItem('restaurant_config')
    if (raw) return { ...defaultConfig, ...JSON.parse(raw) }
  } catch (e) { /* ignore */ }
  return { ...defaultConfig }
}

export function setConfig(updates) {
  const current = getConfig()
  const merged = { ...current, ...updates }
  localStorage.setItem('restaurant_config', JSON.stringify(merged))
}

export function getMenuItems() {
  try {
    const raw = localStorage.getItem('menu_items')
    if (raw) return JSON.parse(raw)
  } catch (e) { /* ignore */ }
  return mockMenuItems
}

export function setMenuItems(items) {
  localStorage.setItem('menu_items', JSON.stringify(items))
}

export function getCategories() {
  try {
    const raw = localStorage.getItem('menu_categories')
    if (raw) return JSON.parse(raw)
  } catch (e) { /* ignore */ }
  return mockMenuCategories
}

export function setCategories(categories) {
  localStorage.setItem('menu_categories', JSON.stringify(categories))
}

export function getOrders() {
  try {
    const raw = localStorage.getItem('orders_list')
    if (raw) return JSON.parse(raw)
  } catch (e) { /* ignore */ }
  return mockOrders
}

export function addOrder(order) {
  const orders = getOrders()
  const newOrder = {
    ...order,
    id: orders.length > 0 ? Math.max(...orders.map(o => Number(o.id))) + 1 : 1,
    time: 'الآن',
    status: 'new',
  }
  const updated = [newOrder, ...orders]
  localStorage.setItem('orders_list', JSON.stringify(updated))
  return newOrder
}

export function updateOrderStatus(id, status) {
  const orders = getOrders()
  const updated = orders.map(o => o.id === id ? { ...o, status } : o)
  localStorage.setItem('orders_list', JSON.stringify(updated))
}

/* ─── Banners ─────────────────────────────────────────────── */
const defaultBanners = [
  { id: 1, title: '🔥 عرض اليوم', subtitle: 'كفتة مشوية × 2 بـ 120 ج بدل 170!', color: ['#F97316', '#EA580C'], active: true, imageUrl: 'https://images.unsplash.com/photo-1529042355636-b6e6a74e86f6?w=800&h=400&fit=crop&q=80' },
  { id: 2, title: '🎉 عرض العيد', subtitle: 'وجبة عائلية كاملة بـ 299 ج', color: ['#8B5CF6', '#7C3AED'], active: true, imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=400&fit=crop&q=80' },
  { id: 3, title: '🚀 توصيل مجاني', subtitle: 'على الطلبات فوق 150 ج', color: ['#10B981', '#059669'], active: true, imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=400&fit=crop&q=80' },
]
export function getBanners() {
  try { const r = localStorage.getItem('store_banners'); if (r) return JSON.parse(r) } catch (e) {}
  return defaultBanners
}
export function setBanners(banners) { localStorage.setItem('store_banners', JSON.stringify(banners)) }

/* ─── Combos ──────────────────────────────────────────────── */
const defaultCombos = [
  { id: 101, name: 'كومبو برجر مع عصير', items: '1 برجر + عصير ليمون', price: 89, originalPrice: 115, image: '🍔', active: true },
  { id: 102, name: 'وجبة الكفتة الكاملة', items: '3 قطع كفتة + خبز + سلطة', price: 120, originalPrice: 155, image: '🥩', active: true },
  { id: 103, name: 'ترايو الفراخ', items: '2 قطعة فراخ + بطاطس + كولا', price: 145, originalPrice: 185, image: '🍗', active: true },
  { id: 104, name: 'وجبة عائلية', items: 'مشكل مشويات + أرز + سلطات × 4', price: 299, originalPrice: 370, image: '🍽️', active: true },
]
export function getCombos() {
  try { const r = localStorage.getItem('store_combos'); if (r) return JSON.parse(r) } catch (e) {}
  return defaultCombos
}
export function setCombos(combos) { localStorage.setItem('store_combos', JSON.stringify(combos)) }

/* ─── Footer settings ─────────────────────────────────────── */
const defaultFooter = {
  showAppButtons: true,
  iosUrl: '#',
  androidUrl: '#',
  showExploreLink: true,
  tagline: 'منصة طلبات الطعام',
  copyright: '© 2025 ريڤيو — جميع الحقوق محفوظة',
}
export function getFooterSettings() {
  try { const r = localStorage.getItem('store_footer'); if (r) return { ...defaultFooter, ...JSON.parse(r) } } catch (e) {}
  return defaultFooter
}
export function setFooterSettings(s) { localStorage.setItem('store_footer', JSON.stringify(s)) }

/* ─── Coupons ─────────────────────────────────────────────── */
const defaultCoupons = [
  { id: 1, code: 'WELCOME20', discount: '20%', type: 'percent', value: 20, used: 12, max: 50, minOrder: null, expiry: null },
  { id: 2, code: 'SUMMER10', discount: '10 ج', type: 'fixed', value: 10, used: 5, max: null, minOrder: null, expiry: null },
]
export function getCoupons() {
  try { const r = localStorage.getItem('store_coupons'); if (r) return JSON.parse(r) } catch (e) {}
  return defaultCoupons
}
export function setCoupons(coupons) { localStorage.setItem('store_coupons', JSON.stringify(coupons)) }

/* ─── Staff ───────────────────────────────────────────────── */
const defaultStaff = [
  { id: 1, name: 'أحمد رضا', role: 'admin', status: 'on_shift', phone: '01012345678', initials: 'أر' },
  { id: 2, name: 'محمد حسين', role: 'manager', status: 'on_shift', phone: '01098765432', initials: 'مح' },
  { id: 3, name: 'سارة علي', role: 'cashier', status: 'available', phone: '01155443322', initials: 'سع' },
  { id: 4, name: 'كريم عبد الله', role: 'kitchen', status: 'on_shift', phone: '01234567890', initials: 'كع' },
  { id: 5, name: 'منى السيد', role: 'kitchen', status: 'available', phone: '01567891234', initials: 'من' },
  { id: 6, name: 'عمر خالد', role: 'delivery', status: 'vacation', phone: '01099887766', initials: 'عخ' },
]
export function getStaff() {
  try { const r = localStorage.getItem('restaurant_staff'); if (r) return JSON.parse(r) } catch (e) {}
  return defaultStaff
}
export function setStaff(staff) { localStorage.setItem('restaurant_staff', JSON.stringify(staff)) }

/* ─── Notifications ───────────────────────────────────────── */
const defaultNotifications = [
  { id: 1, type: 'order', text: 'طلب جديد #43 من طاولة 5', time: 'منذ دقيقة', read: false, link: '/orders' },
  { id: 2, type: 'cancel', text: 'طلب #41 تم إلغاؤه من العميل', time: 'منذ 5 دقائق', read: false, link: '/orders' },
  { id: 3, type: 'inventory', text: 'صنف "الدجاج" على وشك النفاد (3 وحدات)', time: 'منذ 15 دقيقة', read: false, link: '/inventory' },
  { id: 4, type: 'campaign', text: 'حملة "عروض رمضان" تم إرسالها بنجاح', time: 'منذ ساعة', read: true, link: '/marketing' },
  { id: 5, type: 'customer', text: 'زبون جديد مسجل: منى محمد', time: 'منذ ساعتين', read: true, link: '/customers' },
]
export function getNotifications() {
  try { const r = localStorage.getItem('app_notifications'); if (r) return JSON.parse(r) } catch (e) {}
  return defaultNotifications
}
export function setNotifications(n) { localStorage.setItem('app_notifications', JSON.stringify(n)) }

/* ─── Customer Profile ────────────────────────────────────── */
export function getCustomerProfile() {
  try { const r = localStorage.getItem('customer_profile'); if (r) return JSON.parse(r) } catch (e) {}
  return null
}
export function setCustomerProfile(profile) {
  localStorage.setItem('customer_profile', JSON.stringify(profile))
}
export function clearCustomerProfile() {
  localStorage.removeItem('customer_profile')
}

/* ─── Order Ratings ───────────────────────────────────────── */
export function rateOrder(orderId, stars) {
  const orders = getOrders()
  const updated = orders.map(o => String(o.id) === String(orderId) ? { ...o, rating: stars } : o)
  localStorage.setItem('orders_list', JSON.stringify(updated))
}

/* ─── Customer Loyalty ────────────────────────────────────── */
export function getCustomerPoints(phone) {
  if (!phone) return { earned: 0, spent: 0, balance: 0, history: [] }
  const done = getOrders().filter(o => o.phone === phone && o.status === 'done')
  const earned = done.reduce((s, o) => s + Math.floor((o.total || 0) / 10), 0)
  const spent = getCustomerProfile()?.pointsSpent || 0
  return {
    earned,
    spent,
    balance: Math.max(0, earned - spent),
    history: [...done].reverse().map(o => ({
      id: o.id,
      delta: Math.floor((o.total || 0) / 10),
      label: `طلب #${o.id}`,
      time: o.time || 'سابقاً',
    })),
  }
}

export function redeemPoints(amount) {
  const profile = getCustomerProfile()
  if (!profile) return
  setCustomerProfile({ ...profile, pointsSpent: (profile.pointsSpent || 0) + amount })
}

export function getCustomerOrders(phone) {
  if (!phone) return []
  return getOrders().filter(o => o.phone === phone)
}

/* ─── Reviews ─────────────────────────────────────────────── */
const mockReviews = [
  { id: 1, customerName: 'محمد عبد الله', customerPhone: '01012345678', rating: 5, comment: 'أكل رائع وتوصيل سريع! أنصح الجميع بتجربة الكفتة المشوية، طعمها لا يوصف.', date: '٢٠ مايو', reply: 'شكراً جزيلاً على كلماتك الطيبة! يسعدنا دائماً خدمتك.', replyDate: '٢٠ مايو', isVisible: true },
  { id: 2, customerName: 'فاطمة أحمد', customerPhone: '01098765432', rating: 4, comment: 'الطعام لذيذ جداً والأسعار معقولة. الخدمة ممتازة. التوصيل تأخر قليلاً.', date: '١٨ مايو', reply: null, replyDate: null, isVisible: true },
  { id: 3, customerName: 'أحمد محمود', customerPhone: '01155443322', rating: 3, comment: 'الأكل كويس بس الكمية قليلة شوية', date: '١٥ مايو', reply: null, replyDate: null, isVisible: true },
  { id: 4, customerName: 'سارة علي', customerPhone: '01234567890', rating: 5, comment: 'تجربة مميزة من كل النواحي! الكومبو قيمة جداً بسعره.', date: '١٢ مايو', reply: 'شكراً سارة! نسعد دائماً بزيارتك.', replyDate: '١٣ مايو', isVisible: true },
  { id: 5, customerName: 'عمر حسين', customerPhone: '01567891234', rating: 2, comment: 'الطلب وصل بارد وناقصين صنف', date: '١٠ مايو', reply: 'نأسف جداً على هذه التجربة. سنتواصل معك لتعويضك.', replyDate: '١٠ مايو', isVisible: true },
  { id: 6, customerName: 'نور إبراهيم', customerPhone: '01099887766', rating: 5, comment: 'من أحسن المطاعم اللي جربتها! كل شيء ممتاز.', date: '٨ مايو', reply: null, replyDate: null, isVisible: true },
  { id: 7, customerName: 'ياسمين خالد', customerPhone: '01011223344', rating: 4, comment: 'وجبة الكفتة الكاملة كانت رائعة. سأطلب مرة أخرى بالتأكيد.', date: '٥ مايو', reply: null, replyDate: null, isVisible: false },
]

export function getReviews() {
  try { const r = localStorage.getItem('store_reviews'); if (r) return JSON.parse(r) } catch (e) {}
  return mockReviews
}

export function addReview({ customerName, customerPhone, rating, comment }) {
  const reviews = getReviews()
  const newReview = { id: Date.now(), customerName, customerPhone, rating, comment, date: 'الآن', reply: null, replyDate: null, isVisible: true }
  localStorage.setItem('store_reviews', JSON.stringify([newReview, ...reviews]))
  return newReview
}

export function replyToReview(id, reply) {
  const reviews = getReviews()
  const updated = reviews.map(r => r.id === id ? { ...r, reply, replyDate: 'الآن' } : r)
  localStorage.setItem('store_reviews', JSON.stringify(updated))
}

export function toggleReviewVisibility(id) {
  const reviews = getReviews()
  const updated = reviews.map(r => r.id === id ? { ...r, isVisible: !r.isVisible } : r)
  localStorage.setItem('store_reviews', JSON.stringify(updated))
}
