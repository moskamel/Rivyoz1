import { useState } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts'
import Layout from '../components/layout/Layout'
import { mockSalesData, mockTopItems } from '../lib/mock'

const periods = ['اليوم', 'أمس', '7 أيام', '30 يوم', 'هذا الشهر']

const orderTypeData = [
  { name: 'طاولة', value: 45 },
  { name: 'توصيل', value: 35 },
  { name: 'استلام', value: 20 },
]
const COLORS = ['#f97316', '#6366f1', '#22c55e']

const timeData = [
  { slot: 'الإفطار', value: 10 },
  { slot: 'الغداء', value: 52 },
  { slot: 'العشاء', value: 38 },
]

export default function Reports() {
  const [period, setPeriod] = useState('7 أيام')

  const stats = [
    { label: 'الإيراد الكلي', value: '45,600', unit: 'ج', change: 15 },
    { label: 'الطلبات الكلية', value: '312', unit: '', change: 8 },
    { label: 'الزبائن الجدد', value: '78', unit: '', change: 22 },
    { label: 'التقييم المتوسط', value: '4.8', unit: '⭐', change: null },
  ]

  return (
    <Layout title="التقارير">
      {/* Period filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {periods.map(p => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              period === p ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-50'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100">
            <p className="text-2xl font-bold text-gray-900">{s.value}<span className="text-sm font-medium text-gray-400 mr-1">{s.unit}</span></p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            {s.change !== null && s.change !== undefined && (
              <p className={`text-xs font-semibold mt-2 flex items-center gap-1 ${s.change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                {s.change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {Math.abs(s.change)}% مقارنة بالفترة السابقة
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Sales chart */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 mb-5">
        <p className="font-bold text-gray-900 mb-4">مبيعات {period}</p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={mockSalesData}>
            <XAxis dataKey="day" tick={{ fontSize: 12, fontFamily: 'Cairo' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              formatter={(v) => [`${v.toLocaleString('ar-EG')} ج`, 'المبيعات']}
              contentStyle={{ fontFamily: 'Cairo', borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
            />
            <Line type="monotone" dataKey="amount" stroke="#f97316" strokeWidth={2.5} dot={{ r: 4, fill: '#f97316' }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        {/* Order types */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <p className="font-bold text-gray-900 mb-4">توزيع الطلبات حسب النوع</p>
          <div className="flex items-center gap-6">
            <PieChart width={140} height={140}>
              <Pie data={orderTypeData} cx={65} cy={65} innerRadius={40} outerRadius={65} dataKey="value" paddingAngle={3}>
                {orderTypeData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
            </PieChart>
            <div className="space-y-3">
              {orderTypeData.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ background: COLORS[i] }} />
                  <span className="text-sm text-gray-700">{item.name}</span>
                  <span className="text-sm font-bold text-gray-900 mr-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Time distribution */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <p className="font-bold text-gray-900 mb-4">توزيع الطلبات حسب الوقت</p>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={timeData}>
              <XAxis dataKey="slot" tick={{ fontSize: 12, fontFamily: 'Cairo' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip formatter={(v) => [`${v}%`]} contentStyle={{ fontFamily: 'Cairo', borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="value" fill="#f97316" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top items */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-5">
        <div className="p-5 border-b border-gray-50">
          <p className="font-bold text-gray-900">أكثر الأكلات مبيعاً — Top 5</p>
        </div>
        <div className="divide-y divide-gray-50">
          {mockTopItems.map((item, i) => (
            <div key={i} className="flex items-center px-5 py-3 gap-4">
              <span className="w-6 h-6 bg-orange-100 text-orange-600 text-xs font-bold rounded-lg flex items-center justify-center flex-shrink-0">{i + 1}</span>
              <p className="flex-1 text-sm font-medium text-gray-800">{item.name}</p>
              <span className="text-sm text-gray-500">{item.orders} طلب</span>
              <span className="text-sm font-bold text-gray-900">{(item.orders * 85).toLocaleString('ar-EG')} ج</span>
              <span className="text-sm text-gray-400">{Math.round((item.orders / 144) * 100)}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Export */}
      <div className="flex gap-3">
        <button className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50">
          تصدير PDF
        </button>
        <button className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50">
          تصدير Excel
        </button>
      </div>
    </Layout>
  )
}
