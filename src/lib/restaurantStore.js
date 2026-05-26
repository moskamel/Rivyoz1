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
