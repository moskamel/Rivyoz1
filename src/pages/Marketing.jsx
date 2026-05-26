import { useState } from 'react'
import { Plus, Copy } from 'lucide-react'
import Layout from '../components/layout/Layout'
import { mockCoupons } from '../lib/mock'

const tabs = ['برنامج الولاء', 'حملات واتساب', 'الكوبونات']

function LoyaltyTab() {
  const [enabled, setEnabled] = useState(true)
  const [spendPer, setSpendPer] = useState(10)
  const [pointsPer, setPointsPer] = useState(1)
  const [redeemAt, setRedeemAt] = useState(100)
  const [discountVal, setDiscountVal] = useState(10)

  return (
    <div className="max-w-lg space-y-5">
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-bold text-gray-900">برنامج النقاط</p>
            <p className="text-sm text-gray-500 mt-0.5">اكسب ولاء زبائنك بنظام مكافآت</p>
          </div>
          <button onClick={() => setEnabled(!enabled)} className={`relative w-12 h-6 rounded-full transition-colors ${enabled ? 'bg-green-500' : 'bg-gray-200'}`}>
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${enabled ? 'right-1' : 'left-1'}`} />
          </button>
        </div>

        {enabled && (
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 whitespace-nowrap">كل</span>
              <input type="number" value={spendPer} onChange={e => setSpendPer(e.target.value)} className="w-16 px-3 py-2 border border-gray-200 rounded-xl text-sm text-center outline-none focus:border-orange-400" />
              <span className="text-sm text-gray-600 whitespace-nowrap">ج = </span>
              <input type="number" value={pointsPer} onChange={e => setPointsPer(e.target.value)} className="w-16 px-3 py-2 border border-gray-200 rounded-xl text-sm text-center outline-none focus:border-orange-400" />
              <span className="text-sm text-gray-600 whitespace-nowrap">نقطة</span>
            </div>
            <div className="flex items-center gap-3">
              <input type="number" value={redeemAt} onChange={e => setRedeemAt(e.target.value)} className="w-20 px-3 py-2 border border-gray-200 rounded-xl text-sm text-center outline-none focus:border-orange-400" />
              <span className="text-sm text-gray-600 whitespace-nowrap">نقطة = خصم</span>
              <input type="number" value={discountVal} onChange={e => setDiscountVal(e.target.value)} className="w-16 px-3 py-2 border border-gray-200 rounded-xl text-sm text-center outline-none focus:border-orange-400" />
              <span className="text-sm text-gray-600">ج</span>
            </div>
          </div>
        )}
      </div>

      {enabled && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="font-bold text-gray-900 mb-4">إحصائيات هذا الشهر</p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'أعضاء البرنامج', value: '234' },
              { label: 'نقاط محصودة', value: '12,400' },
              { label: 'خصومات مستخدمة', value: '89 (890 ج)' },
              { label: 'متوسط الطلبات/عضو', value: '3.2 طلب/شهر' },
            ].map(s => (
              <div key={s.label} className="bg-gray-50 rounded-xl p-4">
                <p className="text-xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <button className="w-full max-w-xs py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600">
        حفظ الإعدادات
      </button>
    </div>
  )
}

function WhatsappTab() {
  const [target, setTarget] = useState('all')
  const [message, setMessage] = useState('عزيزي {الاسم}،\nعندنا عرض خاص النهارده! 🍖')
  const preview = message.replace('{الاسم}', 'أحمد')

  const targets = [
    { key: 'all', label: 'كل الزبائن', count: 234 },
    { key: 'inactive', label: 'لم يطلبوا منذ 7 أيام', count: 45 },
    { key: 'top', label: 'الأكثر طلباً (فوق 5 طلبات)', count: 28 },
  ]

  return (
    <div className="max-w-lg space-y-5">
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <p className="font-bold text-gray-900 mb-4">المستهدفون</p>
        <div className="space-y-2">
          {targets.map(t => (
            <button
              key={t.key}
              onClick={() => setTarget(t.key)}
              className={`w-full text-right px-4 py-3 rounded-xl border text-sm font-medium flex items-center justify-between transition-all ${
                target === t.key ? 'border-orange-400 bg-orange-50 text-orange-700' : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span>{t.label}</span>
              <span className="text-xs font-bold text-gray-400">{t.count} شخص</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <p className="font-bold text-gray-900 mb-3">الرسالة</p>
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-orange-400 resize-none"
          rows={4}
          placeholder="اكتب رسالتك..."
        />
        <p className="text-xs text-gray-400 mt-2">المتغيرات المتاحة: &#123;الاسم&#125; &#123;آخر_طلب&#125;</p>
        {preview && (
          <div className="mt-3 bg-green-50 border border-green-200 rounded-xl p-3">
            <p className="text-xs font-semibold text-green-700 mb-1">معاينة</p>
            <p className="text-sm text-green-800 whitespace-pre-wrap">{preview}</p>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button className="flex-1 py-3 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50">
          جدولة لوقت معين
        </button>
        <button className="flex-1 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600">
          إرسال الآن
        </button>
      </div>
    </div>
  )
}

function CouponsTab() {
  const [coupons, setCoupons] = useState(mockCoupons)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ code: '', type: 'percent', value: '', maxUses: '', minOrder: '' })

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    setForm({ ...form, code: Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('') })
  }

  const save = () => {
    if (!form.code || !form.value) return
    setCoupons(prev => [...prev, { id: Date.now(), code: form.code, discount: form.type === 'percent' ? `${form.value}%` : `${form.value} ج`, used: 0, max: form.maxUses || null, expiry: null }])
    setShowForm(false)
    setForm({ code: '', type: 'percent', value: '', maxUses: '', minOrder: '' })
  }

  return (
    <div className="max-w-2xl space-y-4">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-50 flex items-center justify-between">
          <p className="font-bold text-gray-900">الكوبونات</p>
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-orange-600">
            <Plus size={15} /> كوبون جديد
          </button>
        </div>
        {showForm && (
          <div className="p-5 border-b border-orange-100 bg-orange-50/50 space-y-3">
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">كود الخصم</label>
                <div className="flex gap-2">
                  <input type="text" value={form.code} onChange={e => setForm({ ...form, code: e.target.value.toUpperCase() })} placeholder="PROMO20" className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:border-orange-400" />
                  <button onClick={generateCode} className="px-3 py-2 border border-gray-200 rounded-xl text-xs font-medium hover:bg-white">توليد</button>
                </div>
              </div>
              <div className="w-28">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">القيمة</label>
                <div className="flex">
                  <input type="number" value={form.value} onChange={e => setForm({ ...form, value: e.target.value })} placeholder="20" className="flex-1 w-full px-3 py-2 border border-gray-200 rounded-r-none rounded-xl text-sm outline-none focus:border-orange-400" />
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className="px-2 py-2 border border-r-0 border-gray-200 rounded-l-xl text-xs bg-gray-50 outline-none">
                    <option value="percent">%</option>
                    <option value="fixed">ج</option>
                  </select>
                </div>
              </div>
            </div>
            <button onClick={save} disabled={!form.code || !form.value} className="w-full py-2.5 bg-orange-500 text-white rounded-xl text-sm font-semibold disabled:opacity-40 hover:bg-orange-600">
              حفظ الكوبون
            </button>
          </div>
        )}
        <div className="divide-y divide-gray-50">
          {coupons.map(c => (
            <div key={c.id} className="flex items-center px-5 py-3 gap-4">
              <button className="flex items-center gap-2 font-mono font-bold text-gray-800 hover:text-orange-600 transition-colors">
                {c.code}
                <Copy size={13} className="text-gray-400" />
              </button>
              <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-0.5 rounded-full">{c.discount}</span>
              <span className="text-sm text-gray-500 mr-auto">
                {c.used}{c.max ? `/${c.max}` : ''} استخدام
              </span>
              {c.expiry && <span className="text-xs text-gray-400">ينتهي {c.expiry}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Marketing() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <Layout title="التسويق">
      <div className="flex gap-2 mb-6">
        {tabs.map((t, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === i ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-50'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      {activeTab === 0 && <LoyaltyTab />}
      {activeTab === 1 && <WhatsappTab />}
      {activeTab === 2 && <CouponsTab />}
    </Layout>
  )
}
