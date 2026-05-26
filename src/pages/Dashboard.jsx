import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TrendingUp, TrendingDown, ShoppingBag, Users, DollarSign, ArrowLeft, Power, ArrowUpRight } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import Layout from '../components/layout/Layout'
import { mockStats, mockSalesData, mockTopItems, statusMap } from '../lib/mock'
import { getOrders } from '../lib/restaurantStore'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: 'var(--surface-3)', border: '1px solid var(--border-strong)', borderRadius: 10, padding: '8px 12px', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
        <p style={{ fontSize: 11, color: 'var(--text-2)', marginBottom: 2 }}>{label}</p>
        <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', fontFamily: 'Inter' }}>{payload[0].value.toLocaleString('ar-EG')} ج</p>
      </div>
    )
  }
  return null
}

function StatCard({ label, value, change, icon: Icon, color }) {
  const positive = change >= 0
  return (
    <div className="glass animate-fade-in" style={{ padding: '20px', cursor: 'pointer', transition: 'all 0.2s' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div style={{ width: 36, height: 36, borderRadius: 10, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={17} color="white" strokeWidth={2} />
        </div>
        {change !== undefined && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, color: positive ? 'var(--green)' : 'var(--red)', background: positive ? 'var(--green-muted)' : 'var(--red-muted)', padding: '3px 8px', borderRadius: 6 }}>
            {positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {Math.abs(change)}%
          </span>
        )}
      </div>
      <p className="num" style={{ fontSize: 26, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1 }}>{value.toLocaleString()}</p>
      <p style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 6, fontWeight: 500 }}>{label}</p>
    </div>
  )
}

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(true)
  const orders = getOrders()
  const newOrders = orders.filter(o => o.status === 'new')
  const recentOrders = orders.slice(0, 4)

  return (
    <Layout title="الرئيسية">
      {/* Status + alert row */}
      <div className="flex gap-3 mb-6" style={{ flexWrap: 'wrap' }}>
        <div className="glass flex items-center gap-3" style={{ padding: '12px 16px', flex: 1, minWidth: 240 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: isOpen ? 'var(--green)' : 'var(--text-3)', boxShadow: isOpen ? '0 0 8px var(--green)' : 'none' }} />
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>مطعم الشيف أحمد</p>
            <p style={{ fontSize: 11, color: isOpen ? 'var(--green)' : 'var(--text-3)', fontWeight: 500 }}>{isOpen ? 'مفتوح · حتى 11 مساءً' : 'مغلق مؤقتاً'}</p>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} style={{ fontSize: 12, fontWeight: 600, padding: '6px 12px', borderRadius: 8, cursor: 'pointer', border: 'none', background: isOpen ? 'var(--red-muted)' : 'var(--green-muted)', color: isOpen ? 'var(--red)' : 'var(--green)', display: 'flex', alignItems: 'center', gap: 5, transition: 'all 0.15s' }}>
            <Power size={13} />
            {isOpen ? 'إغلاق مؤقت' : 'فتح المطعم'}
          </button>
        </div>

        {newOrders.length > 0 && (
          <Link to="/orders" className="flex items-center gap-3 pulse-accent" style={{ padding: '12px 16px', borderRadius: 16, background: 'var(--red-muted)', border: '1px solid rgba(248,113,113,0.2)', textDecoration: 'none', flexShrink: 0 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--red)', display: 'block' }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--red)' }}>{newOrders.length} طلب جديد</span>
            <ArrowLeft size={14} style={{ color: 'var(--red)' }} />
          </Link>
        )}
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard label="مبيعات اليوم" value={mockStats.revenue} change={mockStats.revenueChange} icon={DollarSign} color="var(--accent)" />
        <StatCard label="طلبات اليوم" value={mockStats.orders} change={mockStats.ordersChange} icon={ShoppingBag} color="#3B82F6" />
        <StatCard label="متوسط الطلب" value={mockStats.avgOrder} icon={ArrowUpRight} color="#8B5CF6" />
        <StatCard label="زبائن جدد" value={mockStats.newCustomers} icon={Users} color="#22C55E" />
      </div>

      {/* Chart + Top items */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 12, marginBottom: 20 }}>
        <div className="glass" style={{ padding: '20px' }}>
          <div className="flex items-center justify-between mb-5">
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>المبيعات — آخر 7 أيام</p>
            <span style={{ fontSize: 11, color: 'var(--text-2)', background: 'var(--surface-2)', padding: '4px 10px', borderRadius: 6, border: '1px solid var(--border)' }}>هذا الأسبوع</span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={mockSalesData}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F97316" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#F97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--text-3)', fontFamily: 'Cairo' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="amount" stroke="#F97316" strokeWidth={2} fill="url(#grad)" dot={false} activeDot={{ r: 4, fill: '#F97316', stroke: 'var(--bg)', strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass" style={{ padding: '20px' }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>الأكثر مبيعاً</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {mockTopItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span style={{ width: 22, height: 22, borderRadius: 6, background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'var(--accent)', flexShrink: 0, fontFamily: 'Inter' }}>{i + 1}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                  <div style={{ height: 3, background: 'var(--surface-3)', borderRadius: 2 }}>
                    <div style={{ height: 3, borderRadius: 2, background: 'var(--accent)', width: `${(item.orders / mockTopItems[0].orders) * 100}%`, transition: 'width 0.5s ease' }} />
                  </div>
                </div>
                <span className="num" style={{ fontSize: 11, color: 'var(--text-2)', flexShrink: 0 }}>{item.orders}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="glass" style={{ overflow: 'hidden' }}>
        <div className="flex items-center justify-between" style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>آخر الطلبات</p>
          <Link to="/orders" style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
            عرض الكل <ArrowLeft size={13} />
          </Link>
        </div>
        <div>
          {recentOrders.map((order, i) => (
            <div key={order.id} style={{ display: 'flex', alignItems: 'center', padding: '12px 20px', borderBottom: i < recentOrders.length - 1 ? '1px solid var(--border)' : 'none', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'var(--text-2)', fontFamily: 'Inter', border: '1px solid var(--border)', flexShrink: 0 }}>
                {order.id}
              </div>
              <div style={{ flex: 1, marginRight: 12, marginLeft: 12 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{order.items}</p>
                <p style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 1 }}>{order.table} · {order.time}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="num" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{order.total} ج</p>
                <span style={{
                  fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 6,
                  background: order.status === 'new' ? 'var(--red-muted)' : order.status === 'preparing' ? 'var(--blue-muted)' : order.status === 'ready' ? 'var(--yellow-muted)' : order.status === 'delivering' ? 'var(--accent-muted)' : 'var(--surface-2)',
                  color: order.status === 'new' ? 'var(--red)' : order.status === 'preparing' ? 'var(--blue)' : order.status === 'ready' ? 'var(--yellow)' : order.status === 'delivering' ? 'var(--accent)' : 'var(--text-3)'
                }}>
                  {statusMap[order.status]?.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
