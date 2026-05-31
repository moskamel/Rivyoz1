import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { TrendUp, TrendDown, ShoppingBag, People, DollarSquare, ArrowLeft, ToggleOn, ExportSquare } from 'iconsax-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Layout from '../components/layout/Layout'
import { mockStats, mockSalesData, mockTopItems, mockBranchStats, mockBranchSalesData, statusMap } from '../lib/mock'
import { getOrders, getOrdersByBranch, getConfig, setConfig, updateOrderStatus, getBranches } from '../lib/restaurantStore'
import { useBranch } from '../lib/BranchContext'

function Skel({ w = '100%', h = 16, r = 8, mb = 0 }) {
  return <div style={{ width: w, height: h, borderRadius: r, marginBottom: mb, background: 'var(--surface-3)', animation: 'skel-pulse 1.5s ease-in-out infinite' }} />
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: 'var(--surface-3)', border: '1px solid var(--border-strong)', borderRadius: 10, padding: '8px 12px', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
        <p style={{ fontSize: 11, color: 'var(--text-2)', marginBottom: 2 }}>{label}</p>
        <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', fontFamily: 'Zain, sans-serif' }}>{payload[0].value.toLocaleString('ar-EG')} ج</p>
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
  const [refreshKey, setRefreshKey] = useState(0)
  const [dismissed, setDismissed] = useState(new Set())
  const { activeBranch } = useBranch()
  const branches = getBranches()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(t)
  }, [])

  // ── New-order sound ──────────────────────────────────────────────
  const knownIds = useRef(null)

  function playOrderSound() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      const playNote = (freq, start, dur) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, start)
        gain.gain.setValueAtTime(0, start)
        gain.gain.linearRampToValueAtTime(0.45, start + 0.012)
        gain.gain.exponentialRampToValueAtTime(0.001, start + dur)
        osc.start(start)
        osc.stop(start + dur)
      }
      const t = ctx.currentTime
      playNote(880, t, 0.45)
      playNote(1108, t + 0.12, 0.35)
      playNote(1320, t + 0.22, 0.30)
      setTimeout(() => ctx.close(), 1200)
    } catch (_) {}
  }

  useEffect(() => {
    const check = () => {
      const current = getOrders().filter(o => o.status === 'new').map(o => o.id)
      if (knownIds.current === null) {
        knownIds.current = new Set(current)
        return
      }
      const hasNew = current.some(id => !knownIds.current.has(id))
      if (hasNew) {
        playOrderSound()
        setRefreshKey(k => k + 1)
      }
      knownIds.current = new Set(current)
    }
    const interval = setInterval(check, 4000)
    check()
    return () => clearInterval(interval)
  }, [])
  // ────────────────────────────────────────────────────────────────

  const orders = getOrdersByBranch(activeBranch?.id)
  const newOrders = orders.filter(o => o.status === 'new' && !dismissed.has(o.id))
  const firstNew = newOrders[0]
  const branchStats = activeBranch ? (mockBranchStats[activeBranch.id] || mockStats) : mockStats
  const salesData = activeBranch ? (mockBranchSalesData[activeBranch.id] || mockSalesData) : mockSalesData

  const handleAccept = (id) => {
    updateOrderStatus(id, 'preparing')
    setRefreshKey(k => k + 1)
  }
  const handleDismiss = (id) => setDismissed(prev => new Set([...prev, id]))
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
      <div className="flex gap-3 animate-fade-in" style={{ flexWrap: 'wrap', marginBottom: 20, direction: 'rtl' }}>

        {/* New orders alert — interactive card */}
        {newOrders.length > 0 && firstNew && (
          <div
            className="glass-accent"
            style={{ flex: 1, minWidth: 240, borderRadius: 'var(--radius-lg)', overflow: 'hidden', position: 'relative' }}
          >
            <style>{`
              @keyframes bell-ring {
                0%,60%,100% { transform: rotate(0); }
                10%,30%,50% { transform: rotate(14deg); }
                20%,40% { transform: rotate(-14deg); }
              }
              @keyframes order-dot-pulse {
                0%,100% { box-shadow: 0 0 0 0 rgba(249,115,22,0.45); }
                60% { box-shadow: 0 0 0 7px rgba(249,115,22,0); }
              }
            `}</style>

            {/* Header strip */}
            <div style={{
              padding: '8px 14px',
              background: 'var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <span style={{ fontSize: 15, display: 'inline-block', animation: 'bell-ring 1.2s ease-in-out infinite' }}>🔔</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: 'white' }}>
                  {newOrders.length} {newOrders.length === 1 ? 'طلب جديد' : 'طلبات جديدة'}
                </span>
              </div>
              <Link to="/orders" style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 3, fontWeight: 600 }}>
                عرض الكل <ArrowLeft size={11} />
              </Link>
            </div>

            {/* Order preview row */}
            <div style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                background: 'var(--accent-muted)', border: '1.5px solid var(--border-accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 800, color: 'var(--accent)',
                animation: 'order-dot-pulse 1.5s ease-in-out infinite',
              }}>
                #{firstNew.id}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p className="truncate-1" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>
                  {firstNew.items}
                </p>
                <p style={{ fontSize: 11, color: 'var(--text-3)' }}>
                  {firstNew.table} · <span style={{ fontWeight: 700, color: 'var(--accent)', fontFamily: 'Zain, sans-serif' }}>{firstNew.total} ج</span>
                </p>
              </div>
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                <button
                  onClick={() => handleAccept(firstNew.id)}
                  style={{
                    padding: '7px 13px', borderRadius: 'var(--radius-full)',
                    background: 'var(--accent)', color: 'white',
                    border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700,
                    whiteSpace: 'nowrap', transition: 'opacity 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  ✓ استلام
                </button>
                <button
                  onClick={() => handleDismiss(firstNew.id)}
                  style={{
                    width: 30, height: 30, borderRadius: 'var(--radius-full)',
                    background: 'var(--surface-3)', border: '1px solid var(--border)',
                    cursor: 'pointer', fontSize: 16, lineHeight: 1, color: 'var(--text-3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-3)')}
                >
                  ×
                </button>
              </div>
            </div>

            {/* Extra order chips when multiple new orders */}
            {newOrders.length > 1 && (
              <div style={{ padding: '0 14px 10px', display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                {newOrders.slice(1).map(o => (
                  <button
                    key={o.id}
                    onClick={() => handleAccept(o.id)}
                    style={{
                      fontSize: 11, fontWeight: 700, padding: '3px 9px',
                      borderRadius: 'var(--radius-full)', cursor: 'pointer',
                      background: 'var(--accent-muted)', color: 'var(--accent)',
                      border: '1px solid var(--border-accent)',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent)', e.currentTarget.style.color = 'white')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'var(--accent-muted)', e.currentTarget.style.color = 'var(--accent)')}
                    title="استلام"
                  >
                    #{o.id} ✓
                  </button>
                ))}
              </div>
            )}
          </div>
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
              {isOpen ? 'مفتوح · لحد ١١ بالليل' : 'مغلق دلوقتي'}
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
              borderRadius: 999,
              cursor: 'pointer',
              border: 'none',
              background: isOpen ? 'var(--red-muted)' : 'var(--green-muted)',
              color: isOpen ? 'var(--red)' : 'var(--green)',
              transition: 'all 0.15s'
            }}
          >
            <ToggleOn size={12} />
            {isOpen ? 'اقفل دلوقتي' : 'افتح المطعم'}
          </button>
        </div>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        <StatCard label="مبيعات اليوم"  value={branchStats.revenue}      change={branchStats.revenueChange ?? branchStats.change} icon={DollarSquare}   color="#f97316" />
        <StatCard label="طلبات اليوم"   value={branchStats.orders}        change={branchStats.ordersChange}  icon={ShoppingBag}  color="#f97316" />
        <StatCard label="متوسط الطلب"   value={branchStats.avgOrder}                                         icon={ExportSquare}  color="#f97316" />
        <StatCard label="زبائن جدد"     value={mockStats.newCustomers}                                       icon={People}         color="#f97316" />
      </div>

      {/* ── BRANCH COMPARISON (all branches view) ── */}
      {!activeBranch && branches.length > 1 && (
        <div className="glass animate-fade-in" style={{ overflow: 'hidden', marginBottom: 20 }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>أداء الفروع</p>
            <Link to="/branches" style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              إدارة الفروع <ArrowLeft size={13} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${branches.length}, 1fr)` }}>
            {branches.map((b, i) => {
              const bs = mockBranchStats[b.id] || { revenue: 0, orders: 0, avgOrder: 0, change: 0 }
              const maxRev = Math.max(...branches.map(br => (mockBranchStats[br.id] || {}).revenue || 1))
              const pct = (bs.revenue / maxRev) * 100
              return (
                <div key={b.id} style={{ padding: '16px 20px', borderRight: i < branches.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>{b.name}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <span className={`status-dot ${b.isOpen ? 'live' : 'idle'}`} />
                        <span style={{ fontSize: 11, color: b.isOpen ? 'var(--green)' : 'var(--text-3)', fontWeight: 500 }}>
                          {b.isOpen ? 'مفتوح' : 'مغلق'}
                        </span>
                      </div>
                    </div>
                    <span className={`badge badge-pill badge-sm ${bs.change >= 0 ? 'badge-green' : 'badge-red'}`}
                      style={{ display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0 }}>
                      {bs.change >= 0 ? <TrendUp size={10} /> : <TrendDown size={10} />}
                      {Math.abs(bs.change)}%
                    </span>
                  </div>
                  <p className="num" style={{ fontSize: 22, fontWeight: 800, color: 'var(--accent)', lineHeight: 1, marginBottom: 3 }}>
                    {bs.revenue.toLocaleString()} ج
                  </p>
                  <p style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 12 }}>
                    {bs.orders} طلب · متوسط {bs.avgOrder} ج
                  </p>
                  <div style={{ height: 4, background: 'var(--surface-3)', borderRadius: 2 }}>
                    <div style={{ height: 4, borderRadius: 2, background: 'var(--accent)', width: `${pct}%`, transition: 'width 0.7s var(--ease-default)' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── CHART + TOP ITEMS ── */}
      <div className="animate-slide-up" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 12, marginBottom: 20 }}>

        {/* Area chart */}
        <div className="glass" style={{ padding: '20px' }}>
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>المبيعات</p>
            <div className="flex items-center gap-1" style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-full)', padding: 3, width: 'fit-content' }}>
              {periodOptions.map(opt => (
                <button key={opt} onClick={() => setPeriod(opt)}
                  style={{
                    flexShrink: 0, fontSize: 11, fontWeight: 600, padding: '5px 14px',
                    borderRadius: 'var(--radius-full)', border: 'none', cursor: 'pointer',
                    transition: 'all 0.15s', fontFamily: 'Zain, sans-serif',
                    background: period === opt ? 'var(--accent)' : 'transparent',
                    color: period === opt ? 'white' : 'var(--text-3)',
                  }}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={salesData}>
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
                  flexShrink: 0, fontFamily: 'Zain, sans-serif'
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

        <div style={{ overflowX: 'auto' }}>
          <table className="table-base">
            <thead>
              <tr>
                <th style={{ width: 48 }}>#</th>
                <th>الطلب</th>
                <th style={{ width: 80, textAlign: 'center' }}>الأصناف</th>
                <th style={{ width: 90, textAlign: 'center' }}>الإجمالي</th>
                <th style={{ width: 110, textAlign: 'center' }}>الحالة</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td style={{ padding: '10px 16px' }}>
                    <div style={{
                      minWidth: 34, height: 28, borderRadius: 8, display: 'inline-flex',
                      alignItems: 'center', justifyContent: 'center', padding: '0 6px',
                      background: 'var(--surface-2)', border: '1px solid var(--border)',
                      fontSize: 11, fontWeight: 800, color: 'var(--text-2)', fontFamily: 'Zain, sans-serif',
                    }}>
                      #{order.id}
                    </div>
                  </td>
                  <td style={{ padding: '10px 16px' }}>
                    <p className="truncate-1" style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{order.items}</p>
                    <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{order.table} · {order.time}</p>
                  </td>
                  <td style={{ padding: '10px 16px', textAlign: 'center' }}>
                    <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{order.details?.length ?? '—'} أصناف</span>
                  </td>
                  <td style={{ padding: '10px 16px', textAlign: 'center' }}>
                    <span className="num" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{order.total} ج</span>
                  </td>
                  <td style={{ padding: '10px 16px', textAlign: 'center' }}>
                    <span className={`badge badge-pill ${statusBadgeClass[order.status] ?? 'badge-default'}`}>
                      {statusMap[order.status]?.label}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </Layout>
  )
}
