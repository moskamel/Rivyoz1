import { useState } from 'react'
import { TrendingUp, TrendingDown, Download, FileText, Check, DollarSign, ShoppingBag, Users, Star } from 'lucide-react'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts'
import Layout from '../components/layout/Layout'
import { mockSalesData, mockTopItems } from '../lib/mock'

const periods = ['اليوم', 'أمس', '7 أيام', '30 يوم', 'هذا الشهر']

const orderTypeData = [
  { name: 'طاولة', value: 45 },
  { name: 'توصيل', value: 35 },
  { name: 'استلام', value: 20 },
]
const COLORS = ['#F97316', '#60A5FA', '#22C55E']

const timeData = [
  { slot: 'الإفطار', value: 10 },
  { slot: 'الغداء', value: 52 },
  { slot: 'العشاء', value: 38 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: 'var(--surface-3)', border: '1px solid var(--border-strong)', borderRadius: 10, padding: '8px 12px', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
        <p style={{ fontSize: 11, color: 'var(--text-2)', marginBottom: 2 }}>{label}</p>
        <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', fontFamily: 'Inter' }}>
          {typeof payload[0].value === 'number' && payload[0].value > 100
            ? `${payload[0].value.toLocaleString('ar-EG')} ج`
            : `${payload[0].value}%`}
        </p>
      </div>
    )
  }
  return null
}

const SalesCustomTooltip = ({ active, payload, label }) => {
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

function Toast({ message }) {
  return (
    <div style={{ position: 'fixed', bottom: 24, left: 24, zIndex: 50, background: 'var(--green)', color: 'white', padding: '10px 18px', borderRadius: 12, fontWeight: 600, fontSize: 13, boxShadow: '0 8px 24px rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', gap: 8 }}>
      <Check size={14} /> {message}
    </div>
  )
}

export default function Reports() {
  const [period, setPeriod] = useState('7 أيام')
  const [exportToast, setExportToast] = useState(null)
  const [exportedType, setExportedType] = useState(null)

  const handleExport = (type) => {
    setExportedType(type)
    setExportToast(`تم تصدير ${type} بنجاح`)
    setTimeout(() => { setExportToast(null); setExportedType(null) }, 2000)
  }

  const stats = [
    { label: 'الإيراد الكلي', value: '45,600', unit: 'ج', change: 15, icon: DollarSign, color: 'var(--accent)', mutedBg: 'var(--accent-muted)' },
    { label: 'الطلبات الكلية', value: '312', unit: '', change: 8, icon: ShoppingBag, color: 'var(--blue)', mutedBg: 'var(--blue-muted)' },
    { label: 'الزبائن الجدد', value: '78', unit: '', change: 22, icon: Users, color: 'var(--green)', mutedBg: 'var(--green-muted)' },
    { label: 'التقييم المتوسط', value: '4.8', unit: '★', change: null, icon: Star, color: 'var(--yellow)', mutedBg: 'var(--yellow-muted)' },
  ]

  return (
    <Layout title="التقارير">
      {/* Period filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {periods.map(p => {
          const isActive = period === p
          return (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              style={{
                flexShrink: 0,
                padding: '7px 14px',
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s',
                border: isActive ? '1px solid rgba(249,115,22,0.25)' : '1px solid var(--border)',
                background: isActive ? 'var(--accent-muted)' : 'var(--surface)',
                color: isActive ? 'var(--accent)' : 'var(--text-2)',
              }}
            >
              {p}
            </button>
          )
        })}
      </div>

      {/* Summary cards */}
      <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        {stats.map(s => {
          const Icon = s.icon
          return (
            <div key={s.label} className="glass glass-interactive" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-lg)', background: s.mutedBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={16} style={{ color: s.color }} />
                </div>
                {s.change !== null && s.change !== undefined && (
                  <span className={`badge badge-pill badge-sm ${s.change >= 0 ? 'badge-green' : 'badge-red'}`} style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    {s.change >= 0 ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                    {Math.abs(s.change)}%
                  </span>
                )}
              </div>
              <p className="num" style={{ fontSize: 26, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                {s.value}
                {s.unit && <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-2)', marginRight: 4 }}>{s.unit}</span>}
              </p>
              <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', marginTop: 6, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{s.label}</p>
            </div>
          )
        })}
      </div>

      {/* Sales chart */}
      <div className="glass" style={{ padding: '20px', marginBottom: 16 }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>مبيعات {period}</p>
          <span style={{ fontSize: 11, color: 'var(--text-2)', background: 'var(--surface-2)', padding: '4px 10px', borderRadius: 6, border: '1px solid var(--border)' }}>المبالغ بالجنيه</span>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={mockSalesData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 11, fontFamily: 'Cairo', fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--text-3)', fontFamily: 'Inter' }} axisLine={false} tickLine={false} width={40} />
            <Tooltip content={<SalesCustomTooltip />} />
            <Line type="monotone" dataKey="amount" stroke="#F97316" strokeWidth={2.5} dot={{ r: 4, fill: '#F97316', stroke: 'var(--bg)', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#F97316', stroke: 'var(--bg)', strokeWidth: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Order types + time distribution */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Order types pie */}
        <div className="glass" style={{ padding: '20px' }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>توزيع الطلبات حسب النوع</p>
          <div className="flex items-center gap-6">
            <PieChart width={140} height={140}>
              <Pie data={orderTypeData} cx={65} cy={65} innerRadius={40} outerRadius={65} dataKey="value" paddingAngle={3}>
                {orderTypeData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
            </PieChart>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {orderTypeData.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: COLORS[i], flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: 'var(--text-2)' }}>{item.name}</span>
                  <span className="num" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginRight: 'auto' }}>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Time distribution bar */}
        <div className="glass" style={{ padding: '20px' }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>توزيع الطلبات حسب الوقت</p>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={timeData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="slot" tick={{ fontSize: 11, fontFamily: 'Cairo', fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill="#F97316" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top items table */}
      <div className="glass animate-fade-in" style={{ overflow: 'hidden', marginBottom: 20 }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>أكثر الأكلات مبيعاً — Top 5</p>
        </div>
        <div>
          {mockTopItems.map((item, i) => {
            const pct = Math.round((item.orders / mockTopItems[0].orders) * 100)
            const isFirst = i === 0
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '12px 20px', borderBottom: i < mockTopItems.length - 1 ? '1px solid var(--border)' : 'none', transition: 'background 0.15s', gap: 14 }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ width: 26, height: 26, borderRadius: 8, background: isFirst ? 'var(--accent-muted)' : 'var(--surface-3)', color: isFirst ? 'var(--accent)' : 'var(--text-2)', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: 'Inter', border: isFirst ? '1px solid var(--border-accent)' : '1px solid var(--border)' }}>{i + 1}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', marginBottom: 5 }}>{item.name}</p>
                  <div style={{ height: 4, background: 'var(--surface-3)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: isFirst ? 'var(--accent)' : 'var(--border-strong)', borderRadius: 4, transition: 'width 0.4s var(--ease-default)' }} />
                  </div>
                </div>
                <span style={{ fontSize: 12, color: 'var(--text-2)', fontFamily: 'Inter' }} className="num">{item.orders} طلب</span>
                <span className="num" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', minWidth: 72, textAlign: 'left' }}>{(item.orders * 85).toLocaleString('ar-EG')} ج</span>
                <span style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'Inter', minWidth: 36, textAlign: 'center' }} className="num">{pct}%</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Export buttons */}
      <div className="flex gap-3 animate-fade-in">
        <button onClick={() => handleExport('PDF')} className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 6, transition: 'all var(--dur-normal) var(--ease-default)' }}>
          {exportedType === 'PDF' ? <Check size={14} /> : <FileText size={14} />}
          {exportedType === 'PDF' ? '✓ تم التصدير' : 'تصدير PDF'}
        </button>
        <button onClick={() => handleExport('Excel')} className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 6, transition: 'all var(--dur-normal) var(--ease-default)' }}>
          {exportedType === 'Excel' ? <Check size={14} /> : <Download size={14} />}
          {exportedType === 'Excel' ? '✓ تم التصدير' : 'تصدير Excel'}
        </button>
      </div>
      {exportToast && <Toast message={exportToast} />}
    </Layout>
  )
}
