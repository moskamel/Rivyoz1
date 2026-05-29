import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TrendUp, TrendDown, ShoppingBag, People, DollarSquare, ArrowLeft, ToggleOn, ExportSquare } from 'iconsax-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Layout from '../components/layout/Layout'
import { mockStats, mockSalesData, mockTopItems, statusMap } from '../lib/mock'
import { getOrders, getConfig, setConfig } from '../lib/restaurantStore'

function Skel({ w = '100%', h = 16, r = 8, mb = 0 }) {
  return <div style={{ width: w, height: h, borderRadius: r, marginBottom: mb, background: 'var(--surface-3)', animation: 'skel-pulse 1.5s ease-in-out infinite' }} />
}

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
    <div className="glass glass-interactive" style={{ padding: '20px' }}>
      <div className="flex items-start justify-between" style={{ marginBottom: 16 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10,
          background: color + '26',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0
        }}>
          <Icon size={17} color={color} strokeWidth={2.2} />
        </div>
        {change !== undefined && (
          <span className={`badge badge-pill badge-sm ${positive ? 'badge-green' : 'badge-red'}`}
            style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {positive ? <TrendUp size={10} /> : <TrendDown size={10} />}
            {Math.abs(change)}%
          </span>
        )}
      </div>
      <p className="num" style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 6 }}>
        {value.toLocaleString()}
      </p>
      <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
        {label}
      </p>
    </div>
  )
}

const periodOptions = ['7 أيام', '30 يوم', '3 أشهر']

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(() => getConfig().isOpen)
  const [period, setPeriod] = useState('7 أيام')

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(t)
  }, [])
  const orders = getOrders()
  const newOrders = orders.filter(o => o.status === 'new')
  const recentOrders = orders.slice(0, 4)

  const statusBadgeClass = {
    new:        'badge-yellow',
    preparing:  'badge-accent',
    ready:      'badge-green',
    delivering: 'badge-accent',
    done:       'badge-green',
    cancelled:  'badge-red',
  }

  if (loading) {
    return (
      <Layout title="الرئيسية">
        <style>{`@keyframes skel-pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }`}</style>

        {/* Hero row skeleton */}
        <div style={{ marginBottom: 20 }}>
          <Skel h={56} r={12} />
        </div>

        {/* 4 stat card skeletons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} className="glass" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <Skel w={38} h={38} r={10} />
                <Skel w={44} h={20} r={10} />
              </div>
              <Skel w="60%" h={28} r={6} mb={8} />
              <Skel w="80%" h={12} r={4} />
            </div>
          ))}
        </div>

        {/* Chart + top items skeletons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 12, marginBottom: 20 }}>
          <div className="glass" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <Skel w={60} h={16} r={4} />
              <Skel w={120} h={28} r={14} />
            </div>
            <Skel h={160} r={8} />
          </div>
          <div className="glass" style={{ padding: '20px' }}>
            <Skel w={80} h={16} r={4} mb={18} />
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <Skel w={22} h={22} r={6} />
                <div style={{ flex: 1 }}>
                  <Skel w="70%" h={12} r={4} mb={6} />
                  <Skel h={3} r={2} />
                </div>
                <Skel w={24} h={12} r={4} />
              </div>
            ))}
          </div>
        </div>

        {/* Recent orders skeleton */}
        <div className="glass" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
            <Skel w={80} h={14} r={4} />
            <Skel w={60} h={14} r={4} />
          </div>
          {[0, 1, 2, 3].map(i => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
              <Skel w={34} h={34} r={8} />
              <div style={{ flex: 1 }}>
                <Skel w="55%" h={13} r={4} mb={6} />
                <Skel w="35%" h={11} r={4} />
              </div>
              <Skel w={40} h={11} r={4} />
              <Skel w={50} h={13} r={4} />
              <Skel w={56} h={20} r={10} />
            </div>
          ))}
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="الرئيسية">

      {/* ── HERO ROW ── */}
      <div className="flex gap-3 animate-fade-in" style={{ flexWrap: 'wrap', marginBottom: 20 }}>

        {/* New orders alert — first (rightmost in RTL), full flex width */}
        {newOrders.length > 0 && (
          <Link to="/orders" className="glass-accent pulse-accent"
            style={{
              padding: '14px 22px', textDecoration: 'none',
              flex: 1, minWidth: 220,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="badge badge-pill badge-accent" style={{ fontSize: 15, padding: '5px 13px', fontWeight: 800 }}>
                {newOrders.length}
              </span>
              <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--accent)' }}>طلب جديد</span>
            </div>
            <ArrowLeft size={16} style={{ color: 'var(--accent)' }} />
          </Link>
        )}

        {/* Status card */}
        <div className="glass flex items-center gap-3"
          style={{
            padding: '14px 18px', flex: 1, minWidth: 260,
            background: isOpen ? 'rgba(34,197,94,0.06)' : 'var(--surface)',
            border: isOpen ? '1px solid rgba(34,197,94,0.20)' : '1px solid var(--border)',
            transition: 'all 0.25s var(--ease-default)'
          }}>
          <span className={`status-dot ${isOpen ? 'live' : 'idle'}`} />
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', lineHeight: 1.3 }}>{getConfig().name}</p>
            <p style={{ fontSize: 11, fontWeight: 500, color: isOpen ? 'var(--green)' : 'var(--text-3)', marginTop: 2 }}>
              {isOpen ? 'مفتوح · حتى 11 مساءً' : 'مغلق مؤقتاً'}
            </p>
          </div>
          <button
            onClick={() => {
              setIsOpen(prev => {
                const next = !prev
                setConfig({ isOpen: next })
                return next
              })
            }}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: 12, fontWeight: 700, padding: '7px 16px',
              borderRadius: 'var(--radius-full)', cursor: 'pointer',
              border: isOpen ? 'none' : '1px solid var(--border)',
              background: isOpen ? 'rgba(34,197,94,0.15)' : 'var(--surface-2)',
              color: isOpen ? 'var(--green)' : 'var(--text-2)',
              transition: 'all 0.2s var(--ease-default)',
              whiteSpace: 'nowrap'
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: isOpen ? 'var(--green)' : 'var(--text-3)', flexShrink: 0 }} />
            {isOpen ? 'مفتوح' : 'مغلق'}
          </button>
          <button
            onClick={() => {
              setIsOpen(prev => {
                const next = !prev
                setConfig({ isOpen: next })
                return next
              })
            }}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              fontSize: 11, fontWeight: 600, padding: '5px 10px',
              borderRadius: 'var(--radius)',
              cursor: 'pointer',
              border: 'none',
              background: isOpen ? 'var(--red-muted)' : 'var(--green-muted)',
              color: isOpen ? 'var(--red)' : 'var(--green)',
              transition: 'all 0.15s'
            }}
          >
            <ToggleOn size={12} />
            {isOpen ? 'إغلاق مؤقت' : 'فتح المطعم'}
          </button>
        </div>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard label="مبيعات اليوم"  value={mockStats.revenue}      change={mockStats.revenueChange} icon={DollarSquare}   color="#F97316" />
        <StatCard label="طلبات اليوم"   value={mockStats.orders}       change={mockStats.ordersChange}  icon={ShoppingBag}  color="#3B82F6" />
        <StatCard label="متوسط الطلب"   value={mockStats.avgOrder}                                      icon={ExportSquare}  color="#8B5CF6" />
        <StatCard label="زبائن جدد"     value={mockStats.newCustomers}                                  icon={People}         color="#22C55E" />
      </div>

      {/* ── CHART + TOP ITEMS ── */}
      <div className="animate-slide-up" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 12, marginBottom: 20 }}>

        {/* Area chart */}
        <div className="glass" style={{ padding: '20px' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>المبيعات</p>
            <div className="flex items-center gap-1" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-full)', padding: 3 }}>
              {periodOptions.map(opt => (
                <button key={opt} onClick={() => setPeriod(opt)}
                  style={{
                    fontSize: 11, fontWeight: 600, padding: '4px 12px',
                    borderRadius: 'var(--radius-full)', border: 'none', cursor: 'pointer',
                    transition: 'all 0.15s',
                    background: period === opt ? 'var(--accent)' : 'transparent',
                    color: period === opt ? 'white' : 'var(--text-3)',
                  }}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={mockSalesData}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="var(--accent)" stopOpacity={0.20} />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--text-3)', fontFamily: 'Zain' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone" dataKey="amount"
                stroke="var(--accent)" strokeWidth={2}
                fill="url(#salesGrad)" dot={false}
                activeDot={{ r: 4, fill: 'var(--accent)', stroke: 'var(--bg)', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top items */}
        <div className="glass" style={{ padding: '20px' }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 18 }}>الأكثر مبيعاً</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {mockTopItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span style={{
                  width: 22, height: 22, borderRadius: 6,
                  background: i === 0 ? 'var(--accent-muted)' : 'var(--surface-2)',
                  border: i === 0 ? '1px solid var(--border-accent)' : '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 800, color: i === 0 ? 'var(--accent)' : 'var(--text-2)',
                  flexShrink: 0, fontFamily: 'Inter'
                }}>{i + 1}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p className="truncate-1" style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', marginBottom: 5 }}>{item.name}</p>
                  <div style={{ height: 3, background: 'var(--surface-3)', borderRadius: 2 }}>
                    <div style={{
                      height: 3, borderRadius: 2,
                      background: i === 0 ? 'var(--accent)' : 'var(--surface-4)',
                      width: `${(item.orders / mockTopItems[0].orders) * 100}%`,
                      transition: 'width 0.6s var(--ease-default)'
                    }} />
                  </div>
                </div>
                <span className="num" style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-2)', flexShrink: 0 }}>{item.orders}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RECENT ORDERS ── */}
      <div className="glass animate-fade-in" style={{ overflow: 'hidden' }}>
        <div className="flex items-center justify-between" style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>آخر الطلبات</p>
          <Link to="/orders" style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
            عرض الكل <ArrowLeft size={13} />
          </Link>
        </div>

        <div>
          {recentOrders.map((order, i) => (
            <div
              key={order.id}
              className="flex items-center"
              style={{
                padding: '12px 20px',
                borderBottom: i < recentOrders.length - 1 ? '1px solid var(--border)' : 'none',
                transition: 'background var(--dur-fast) ease',
                gap: 12
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {/* Order # */}
              <div style={{
                width: 34, height: 34, borderRadius: 8, flexShrink: 0,
                background: 'var(--surface-2)', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 800, color: 'var(--text-2)', fontFamily: 'Inter'
              }}>
                #{order.id}
              </div>

              {/* Customer & table */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p className="truncate-1" style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{order.items}</p>
                <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{order.table} · {order.time}</p>
              </div>

              {/* Items count */}
              <span style={{ fontSize: 11, color: 'var(--text-3)', flexShrink: 0 }}>
                {order.details?.length ?? '—'} أصناف
              </span>

              {/* Total */}
              <p className="num" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', flexShrink: 0 }}>
                {order.total} ج
              </p>

              {/* Status badge */}
              <span className={`badge badge-pill ${statusBadgeClass[order.status] ?? 'badge-default'}`}>
                {statusMap[order.status]?.label}
              </span>
            </div>
          ))}
        </div>
      </div>

    </Layout>
  )
}
