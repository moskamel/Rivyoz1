export const mockRestaurant = {
  name: 'مطعم الشيف أحمد',
  isOpen: true,
  closesAt: '11 مساءً',
  subscription: 'Pro',
}

export const mockStats = {
  revenue: 2340,
  orders: 18,
  avgOrder: 130,
  newCustomers: 5,
  revenueChange: 12,
  ordersChange: 8,
}

export const mockOrders = [
  { id: 42, table: 'طاولة 4', items: 'كفتة + عصير', total: 135, status: 'new', time: 'منذ دقيقتين', customer: 'أحمد محمد', phone: '01012345678', payment: 'كاش عند الاستلام', details: [{ name: 'كفتة مشوية', qty: 1, price: 85, note: 'بدون فلفل' }, { name: 'عصير قصب', qty: 2, price: 50, note: '' }] },
  { id: 41, table: 'طاولة 2', items: 'فراخ × 2', total: 140, status: 'preparing', time: 'منذ 8 دقائق', customer: 'محمد علي', phone: '01098765432', payment: 'كاش عند الاستلام', details: [{ name: 'فراخ مشوية', qty: 2, price: 70, note: '' }] },
  { id: 40, table: 'استلام', items: 'بيتزا', total: 90, status: 'ready', time: 'منذ 15 دقيقة', customer: 'سارة أحمد', phone: '01155443322', payment: 'بطاقة', details: [{ name: 'بيتزا مارغريتا', qty: 1, price: 90, note: '' }] },
  { id: 39, table: 'توصيل', items: 'وجبة عائلية', total: 280, status: 'delivering', time: 'منذ 22 دقيقة', customer: 'خالد محمود', phone: '01234567890', payment: 'كاش عند الاستلام', details: [{ name: 'كفتة مشوية', qty: 2, price: 85, note: '' }, { name: 'فراخ مشوية', qty: 1, price: 70, note: '' }, { name: 'عصير قصب', qty: 2, price: 25, note: '' }] },
  { id: 38, table: 'طاولة 7', items: 'سلطة + مشروب', total: 65, status: 'done', time: 'منذ 40 دقيقة', customer: 'فاطمة حسن', phone: '01567891234', payment: 'بطاقة', details: [{ name: 'سلطة خضراء', qty: 1, price: 35, note: '' }, { name: 'عصير برتقال', qty: 1, price: 30, note: '' }] },
  { id: 37, table: 'توصيل', items: 'شاورما', total: 55, status: 'cancelled', time: 'منذ ساعة', customer: 'عمر كريم', phone: '01099887766', payment: 'كاش عند الاستلام', details: [{ name: 'شاورما دجاج', qty: 1, price: 55, note: '' }] },
]

export const mockMenuCategories = [
  { id: 1, name: 'مشويات', count: 5 },
  { id: 2, name: 'مشروبات', count: 4 },
  { id: 3, name: 'حلويات', count: 3 },
  { id: 4, name: 'سلطات', count: 3 },
]

const grillModifiers = [
  {
    id: 'size',
    name: 'الحجم',
    type: 'single',
    required: true,
    options: [
      { id: 's', name: 'صغير', price: 0 },
      { id: 'm', name: 'وسط', price: 10 },
      { id: 'l', name: 'كبير', price: 20 },
    ]
  },
  {
    id: 'extras',
    name: 'إضافات',
    type: 'multi',
    required: false,
    options: [
      { id: 'cheese', name: 'جبنة إضافية', price: 5 },
      { id: 'sauce', name: 'صوص حار', price: 3 },
      { id: 'pickles', name: 'مخلل', price: 0 },
    ]
  }
]

export const mockMenuItems = [
  { id: 1, categoryId: 1, name: 'كفتة مشوية', price: 85, active: true, image: 'https://images.unsplash.com/photo-1529042355636-b6e6a74e86f6?w=400&h=300&fit=crop&q=80', bestseller: true, modifiers: grillModifiers },
  { id: 2, categoryId: 1, name: 'فراخ مشوية', price: 70, active: true, image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&h=300&fit=crop&q=80', bestseller: false, modifiers: grillModifiers },
  { id: 3, categoryId: 1, name: 'لحم مشوي', price: 110, active: true, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&q=80', bestseller: false, modifiers: grillModifiers },
  { id: 4, categoryId: 1, name: 'سلطة خضراء', price: 35, active: false, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop&q=80', bestseller: false, modifiers: grillModifiers },
  { id: 5, categoryId: 1, name: 'شاورما دجاج', price: 55, active: true, image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=400&h=300&fit=crop&q=80', bestseller: true, modifiers: [] },
  { id: 6, categoryId: 2, name: 'عصير قصب', price: 25, active: true, image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=300&fit=crop&q=80', bestseller: false, modifiers: [] },
  { id: 7, categoryId: 2, name: 'عصير برتقال', price: 30, active: true, image: 'https://images.unsplash.com/photo-1600718374662-0483d2b9da44?w=400&h=300&fit=crop&q=80', bestseller: false, modifiers: [] },
  { id: 8, categoryId: 2, name: 'مياه معدنية', price: 10, active: true, image: null, bestseller: false, modifiers: [] },
  { id: 9, categoryId: 2, name: 'كولا', price: 15, active: true, image: null, bestseller: false, modifiers: [] },
  { id: 10, categoryId: 3, name: 'أم علي', price: 45, active: true, image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop&q=80', bestseller: false, modifiers: [] },
]

export const mockSalesData = [
  { day: 'السبت', amount: 1800 },
  { day: 'الأحد', amount: 2100 },
  { day: 'الاثنين', amount: 1650 },
  { day: 'الثلاثاء', amount: 2400 },
  { day: 'الأربعاء', amount: 2200 },
  { day: 'الخميس', amount: 2800 },
  { day: 'الجمعة', amount: 2340 },
]

export const mockTopItems = [
  { name: 'كفتة مشوية', orders: 45 },
  { name: 'فراخ مشوية', orders: 32 },
  { name: 'عصير قصب', orders: 28 },
  { name: 'شاورما دجاج', orders: 21 },
  { name: 'بيتزا مارغريتا', orders: 18 },
]

export const mockCoupons = [
  { id: 1, code: 'WELCOME20', discount: '20%', used: 12, max: 50, expiry: '30/6' },
  { id: 2, code: 'SUMMER10', discount: '10 ج', used: 5, max: null, expiry: null },
]

export const statusMap = {
  new: { label: 'جديد', color: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
  preparing: { label: 'جاري التحضير', color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
  ready: { label: 'جاهز', color: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
  delivering: { label: 'في التوصيل', color: 'bg-orange-100 text-orange-700', dot: 'bg-orange-500' },
  done: { label: 'مكتمل', color: 'bg-gray-100 text-gray-600', dot: 'bg-gray-400' },
  cancelled: { label: 'ملغي', color: 'bg-gray-100 text-gray-400', dot: 'bg-gray-300' },
}
