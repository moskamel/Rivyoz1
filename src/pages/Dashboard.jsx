import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, TrendingDown, ShoppingBag, Users, DollarSign, BarChart2, ArrowLeft, Power } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import Layout from '../components/layout/Layout'
import { mockStats, mockOrders, mockSalesData, mockTopItems, statusMap } from '../lib/mock'

function StatCard({ label, value, unit, change, icon: Icon, color }) {
  const positive = change >= 0
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={20} />
        </div>
        {change !== undefined && (
          <span className={`flex items-center gap-1 text-xs font-semibold ${positive ? 'text-green-600' : 'text-red-500'}`}>
            {positive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
            {Math.abs(change)}% أمس
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value.toLocaleString('ar-EG')}<span className="text-sm font-medium text-gray-400 mr-1">{unit}</span></p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  )
}

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(true)
  const newOrders = mockOrders.filter(o => o.status === 'new')
  const recentOrders = mockOrders.slice(0, 3)

  return (
    <Layout title="الرئيسية">
      {/* Status strip */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`w-2.5 h-2.5 rounded-full ${isOpen ? 'bg-green-500' : 'bg-gray-400'}`} />
          <div>
            <p className="font-bold text-gray-900">مطعم الشيف أحمد</p>
            <p className={`text-sm ${isOpen ? 'text-green-600' : 'text-gray-500'}`}>
              {isOpen ? `مفتوح دلوقتي · حتى ${mockStats.closesAt || '11 مساءً'}` : 'مغلق مؤقتاً'}
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            isOpen
              ? 'bg-red-50 text-red-600 hover:bg-red-100'
              : 'bg-green-50 text-green-600 hover:bg-green-100'
          }`}
        >
          <Power size={15} />
          {isOpen ? 'إغلاق مؤقت' : 'فتح المطعم'}
        </button>
      </div>

      {/* New orders banner */}
      {newOrders.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-5 flex items-center justify-between pulse-new-order">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <p className="font-bold text-red-700">{newOrders.length} {newOrders.length === 1 ? 'طلب ينتظر' : 'طلبات تنتظر'} موافقتك</p>
          </div>
          <Link to="/orders" className="flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700">
            شوف الطلبات
            <ArrowLeft size={15} />
          </Link>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="مبيعات اليوم" value={mockStats.revenue} unit="ج" change={mockStats.revenueChange} icon={DollarSign} color="bg-orange-100 text-orange-600" />
        <StatCard label="طلبات اليوم" value={mockStats.orders} unit="" change={mockStats.ordersChange} icon={ShoppingBag} color="bg-blue-100 text-blue-600" />
        <StatCard label="متوسط الطلب" value={mockStats.avgOrder} unit="ج" icon={BarChart2} color="bg-purple-100 text-purple-600" />
        <StatCard label="زبائن جدد" value={mockStats.newCustomers} unit="" icon={Users} color="bg-green-100 text-green-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        {/* Sales chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-gray-100">
          <p className="font-bold text-gray-900 mb-4">مبيعات آخر 7 أيام</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={mockSalesData}>
              <XAxis dataKey="day" tick={{ fontSize: 12, fontFamily: 'Cairo' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                formatter={(v) => [`${v.toLocaleString('ar-EG')} ج`, 'المبيعات']}
                contentStyle={{ fontFamily: 'Cairo', borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
              />
              <Line type="monotone" dataKey="amount" stroke="#f97316" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top items */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100">
          <p className="font-bold text-gray-900 mb-4">الأكثر مبيعاً اليوم</p>
          <div className="space-y-3">
            {mockTopItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-800 truncate">{item.name}</span>
                    <span className="text-gray-500 flex-shrink-0 mr-2">{item.orders} طلب</span>
                  </div>
                  <div className="mt-1 bg-gray-100 rounded-full h-1.5">
                    <div className="bg-orange-400 h-1.5 rounded-full" style={{ width: `${(item.orders / mockTopItems[0].orders) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-50 flex items-center justify-between">
          <p className="font-bold text-gray-900">آخر الطلبات</p>
          <Link to="/orders" className="text-sm text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-1">
            شوف كل الطلبات <ArrowLeft size={14} />
          </Link>
        </div>
        <div className="divide-y divide-gray-50">
          {recentOrders.map(order => (
            <div key={order.id} className="flex items-center justify-between px-5 py-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-500">#{order.id}</span>
                <div>
                  <p className="text-sm font-medium text-gray-800">{order.items}</p>
                  <p className="text-xs text-gray-400">{order.table} · {order.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-900">{order.total} ج</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusMap[order.status].color}`}>
                  {statusMap[order.status].label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
