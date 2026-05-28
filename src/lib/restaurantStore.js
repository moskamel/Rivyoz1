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
  bannerUrl: null,
  logoUrl: null,
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
    id: Date.now(),
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
  { id: 1, title: '🔥 عرض اليوم', subtitle: 'كفتة مشوية × 2 بـ 120 ج بدل 170!', color: ['#F97316', '#EA580C'], active: true },
  { id: 2, title: '🎉 عرض العيد', subtitle: 'وجبة عائلية كاملة بـ 299 ج', color: ['#8B5CF6', '#7C3AED'], active: true },
  { id: 3, title: '🚀 توصيل مجاني', subtitle: 'على الطلبات فوق 150 ج', color: ['#10B981', '#059669'], active: true },
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
