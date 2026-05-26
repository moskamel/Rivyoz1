import { useState } from 'react'
import { Download, QrCode } from 'lucide-react'
import Layout from '../components/layout/Layout'

const tabs = ['المطعم', 'التصميم', 'التوصيل', 'QR Code', 'الاشتراك']

function RestaurantTab() {
  const [form, setForm] = useState({
    name: 'مطعم الشيف أحمد', description: 'مطعم مشويات طازجة', category: 'مشويات',
    address: 'التجمع الخامس، القاهرة', phone: '01012345678', email: 'chef@email.com',
  })

  return (
    <div className="max-w-lg space-y-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
        {[
          { key: 'name', label: 'اسم المطعم' },
          { key: 'description', label: 'الوصف' },
          { key: 'address', label: 'العنوان' },
          { key: 'phone', label: 'رقم الموبايل' },
          { key: 'email', label: 'البريد الإلكتروني' },
        ].map(field => (
          <div key={field.key}>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{field.label}</label>
            <input
              type="text"
              value={form[field.key]}
              onChange={e => setForm({ ...form, [field.key]: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-orange-400"
            />
          </div>
        ))}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">ساعات العمل</label>
          <div className="space-y-2">
            {[
              { days: 'السبت – الخميس', from: '12:00', to: '23:00' },
              { days: 'الجمعة', from: '13:00', to: '00:00' },
            ].map((row, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="w-32 text-gray-600 flex-shrink-0">{row.days}</span>
                <span className="text-gray-400">من</span>
                <input type="time" defaultValue={row.from} className="border border-gray-200 rounded-lg px-2 py-1 text-sm outline-none focus:border-orange-400" />
                <span className="text-gray-400">إلى</span>
                <input type="time" defaultValue={row.to} className="border border-gray-200 rounded-lg px-2 py-1 text-sm outline-none focus:border-orange-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <button className="w-full max-w-xs py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600">
        حفظ التغييرات
      </button>
    </div>
  )
}

function DesignTab() {
  const colors = ['#f97316', '#6366f1', '#22c55e', '#ec4899', '#1f2937']
  const [color, setColor] = useState('#f97316')

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-3">اللون الرئيسي</p>
          <div className="flex gap-2 flex-wrap">
            {colors.map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                style={{ background: c }}
                className={`w-9 h-9 rounded-xl transition-all ${color === c ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : 'hover:scale-105'}`}
              />
            ))}
            <input
              type="color"
              value={color}
              onChange={e => setColor(e.target.value)}
              className="w-9 h-9 rounded-xl border-2 border-gray-200 cursor-pointer p-0.5"
            />
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">اللوجو</p>
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">🍽️</div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium hover:bg-gray-50">تغيير</button>
              <button className="px-3 py-1.5 border border-red-200 text-red-500 rounded-lg text-xs font-medium hover:bg-red-50">حذف</button>
            </div>
          </div>
        </div>
        <button className="w-full py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600">
          نشر التغييرات
        </button>
      </div>

      {/* Preview */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <p className="text-sm font-semibold text-gray-700 mb-3">معاينة مباشرة</p>
        <div className="border border-gray-200 rounded-2xl overflow-hidden">
          <div className="p-4 text-white" style={{ background: color }}>
            <p className="font-bold text-lg">مطعم الشيف أحمد</p>
            <p className="text-sm opacity-80">التجمع الخامس</p>
          </div>
          <div className="p-4 space-y-2">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">مشويات</p>
            {['كفتة مشوية — 85 ج', 'فراخ مشوية — 70 ج'].map(i => (
              <div key={i} className="flex justify-between text-sm border-b border-gray-100 pb-2">
                <span>{i.split(' — ')[0]}</span>
                <span className="font-bold" style={{ color }}>{i.split(' — ')[1]}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-3 text-center">منصة.com/مطعم-الشيف-أحمد</p>
      </div>
    </div>
  )
}

function DeliveryTab() {
  const [opts, setOpts] = useState({ delivery: true, pickup: true, table: false })
  const toggle = (k) => setOpts(p => ({ ...p, [k]: !p[k] }))

  return (
    <div className="max-w-lg space-y-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
        <p className="font-bold text-gray-900">خيارات الطلب</p>
        {[
          { key: 'delivery', label: 'توصيل (لديّ سواقين)' },
          { key: 'pickup', label: 'استلام من المطعم' },
          { key: 'table', label: 'طلب على الطاولة (QR طاولة)' },
        ].map(o => (
          <div key={o.key} className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">{o.label}</span>
            <button onClick={() => toggle(o.key)} className={`relative w-11 h-6 rounded-full transition-colors ${opts[o.key] ? 'bg-green-500' : 'bg-gray-200'}`}>
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${opts[o.key] ? 'right-1' : 'left-1'}`} />
            </button>
          </div>
        ))}
      </div>
      {opts.delivery && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
          <p className="font-bold text-gray-900">إعدادات التوصيل</p>
          {[
            { label: 'رسوم التوصيل', placeholder: '15', unit: 'ج' },
            { label: 'الحد الأدنى للطلب', placeholder: '50', unit: 'ج' },
            { label: 'وقت التوصيل المتوقع', placeholder: '30', unit: 'دقيقة' },
          ].map(f => (
            <div key={f.label} className="flex items-center gap-3">
              <label className="flex-1 text-sm font-medium text-gray-700">{f.label}</label>
              <div className="flex items-center gap-2">
                <input type="number" defaultValue={f.placeholder} className="w-20 px-3 py-2 border border-gray-200 rounded-xl text-sm text-center outline-none focus:border-orange-400" />
                <span className="text-sm text-gray-500">{f.unit}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      <button className="w-full max-w-xs py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600">
        حفظ
      </button>
    </div>
  )
}

function QRTab() {
  return (
    <div className="max-w-sm">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
        <div className="w-48 h-48 bg-gray-100 rounded-2xl mx-auto mb-5 flex items-center justify-center">
          <QrCode size={100} className="text-gray-300" />
        </div>
        <p className="text-sm text-gray-500 mb-5">منصة.com/مطعم-الشيف-أحمد</p>
        <div className="space-y-2">
          {['تحميل PNG عالي الدقة', 'تحميل PDF جاهز للطباعة A4', 'تحميل ملصق جاهز 10×10 سم'].map(label => (
            <button key={label} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50">
              <Download size={15} />
              {label}
            </button>
          ))}
        </div>
        <div className="mt-5 text-right bg-gray-50 rounded-xl p-4 text-xs text-gray-500 space-y-1">
          <p>✓ اطبع بدقة 300 DPI على الأقل</p>
          <p>✓ تأكد المسافة بين الكود والحافة 5مم</p>
        </div>
      </div>
    </div>
  )
}

function SubscriptionTab() {
  return (
    <div className="max-w-md space-y-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-bold text-gray-900">اشتراكك الحالي</p>
            <p className="text-sm text-gray-500 mt-0.5">تجدد في: 15 يوليو 2026</p>
          </div>
          <span className="bg-orange-100 text-orange-700 font-bold text-sm px-3 py-1.5 rounded-xl">Pro ✓</span>
        </div>
        <p className="text-sm text-gray-600 mb-4">طريقة الدفع: فيزا ****4242</p>
        <div className="flex gap-2">
          <button className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold hover:bg-gray-50">تغيير طريقة الدفع</button>
          <button className="flex-1 py-2.5 border border-red-200 text-red-500 rounded-xl text-sm font-semibold hover:bg-red-50">إلغاء الاشتراك</button>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-50">
          <p className="font-bold text-gray-900">تاريخ الفواتير</p>
        </div>
        {['يونيو 2026', 'مايو 2026', 'أبريل 2026'].map(m => (
          <div key={m} className="flex items-center justify-between px-5 py-3 border-b border-gray-50 last:border-0">
            <span className="text-sm text-gray-700">{m}</span>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-900">500 ج</span>
              <button className="text-xs text-orange-600 font-semibold hover:underline">تحميل</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const tabComponents = [RestaurantTab, DesignTab, DeliveryTab, QRTab, SubscriptionTab]

export default function Settings() {
  const [activeTab, setActiveTab] = useState(0)
  const TabComponent = tabComponents[activeTab]

  return (
    <Layout title="الإعدادات">
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {tabs.map((t, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === i ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-50'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <TabComponent />
    </Layout>
  )
}
