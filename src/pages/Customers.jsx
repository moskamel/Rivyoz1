import { useState } from 'react'
import { Search, Users, Activity, ShoppingBag, X, MessageCircle, Send, Download } from 'lucide-react'
import Layout from '../components/layout/Layout'

const mockCustomers = [
  { id: 1, name: 'أحمد محمد السيد', phone: '01012345678', orders: 24, spent: 3240, lastOrder: 'أمس', level: 'expert', joinDate: '15 يناير 2024', points: 324, avgOrder: 135, recentOrders: [{ id: 42, items: 'كفتة + عصير', total: 135, date: 'أمس' }, { id: 38, items: 'لحم مشوي', total: 110, date: '3 أيام' }, { id: 30, items: 'وجبة عائلية', total: 280, date: 'أسبوع' }] },
  { id: 2, name: 'فاطمة حسن إبراهيم', phone: '01098765432', orders: 12, spent: 1580, lastOrder: 'منذ يومين', level: 'trusted', joinDate: '3 مارس 2024', points: 158, avgOrder: 132, recentOrders: [{ id: 40, items: 'بيتزا مارغريتا', total: 90, date: 'يومين' }, { id: 35, items: 'سلطة + مشروب', total: 65, date: 'أسبوع' }, { id: 29, items: 'فراخ مشوية', total: 140, date: '2 أسبوع' }] },
  { id: 3, name: 'محمد علي كريم', phone: '01155443322', orders: 6, spent: 720, lastOrder: 'منذ أسبوع', level: 'contributor', joinDate: '10 أبريل 2024', points: 72, avgOrder: 120, recentOrders: [{ id: 39, items: 'شاورما دجاج', total: 55, date: 'أسبوع' }, { id: 31, items: 'عصير + سلطة', total: 65, date: '2 أسبوع' }, { id: 22, items: 'كفتة', total: 85, date: 'شهر' }] },
  { id: 4, name: 'سارة أحمد مصطفى', phone: '01234567890', orders: 2, spent: 180, lastOrder: 'منذ 3 أيام', level: 'beginner', joinDate: '20 مايو 2024', points: 18, avgOrder: 90, recentOrders: [{ id: 41, items: 'فراخ × 2', total: 140, date: '3 أيام' }, { id: 37, items: 'مشروب', total: 40, date: 'أسبوع' }, { id: 28, items: 'سلطة', total: 35, date: '3 أسابيع' }] },
  { id: 5, name: 'خالد محمود عبد الله', phone: '01567891234', orders: 18, spent: 2760, lastOrder: 'اليوم', level: 'expert', joinDate: '5 فبراير 2024', points: 276, avgOrder: 153, recentOrders: [{ id: 43, items: 'وجبة عائلية', total: 280, date: 'اليوم' }, { id: 36, items: 'مشويات مشكلة', total: 310, date: '4 أيام' }, { id: 25, items: 'كفتة + فراخ', total: 155, date: 'أسبوع' }] },
  { id: 6, name: 'منى عبد الرحمن', phone: '01099887766', orders: 9, spent: 1050, lastOrder: 'منذ 5 أيام', level: 'trusted', joinDate: '12 مارس 2024', points: 105, avgOrder: 117, recentOrders: [{ id: 38, items: 'سلطة + مشروب', total: 65, date: '5 أيام' }, { id: 32, items: 'شاورما', total: 110, date: 'أسبوعين' }, { id: 20, items: 'فراخ مشوية', total: 70, date: 'شهر' }] },
  { id: 7, name: 'عمر حسين علي', phone: '01011223344', orders: 3, spent: 295, lastOrder: 'منذ أسبوعين', level: 'beginner', joinDate: '1 مايو 2024', points: 30, avgOrder: 98, recentOrders: [{ id: 35, items: 'بيتزا صغيرة', total: 70, date: 'أسبوعين' }, { id: 27, items: 'عصائر', total: 75, date: 'شهر' }, { id: 15, items: 'كفتة', total: 85, date: 'شهرين' }] },
  { id: 8, name: 'نورهان سامي فوزي', phone: '01055667788', orders: 15, spent: 1980, lastOrder: 'منذ يومين', level: 'trusted', joinDate: '28 يناير 2024', points: 198, avgOrder: 132, recentOrders: [{ id: 40, items: 'وجبة عائلية', total: 280, date: 'يومين' }, { id: 33, items: 'مشويات', total: 220, date: 'أسبوع' }, { id: 21, items: 'سلطات + مشروبات', total: 120, date: '3 أسابيع' }] },
]

const levelConfig = {
  beginner:    { label: 'مبتدئ',  bg: 'var(--surface-2)',  color: 'var(--text-2)',  badgeClass: 'badge-default' },
  contributor: { label: 'مساهم',  bg: 'var(--blue-muted)', color: 'var(--blue)',    badgeClass: 'badge-blue'    },
  trusted:     { label: 'موثوق',  bg: 'var(--green-muted)',color: 'var(--green)',   badgeClass: 'badge-green'   },
  expert:      { label: 'خبير',   bg: 'var(--yellow-muted)',color: 'var(--yellow)', badgeClass: 'badge-yellow'  },
}

function CustomerDrawer({ customer, onClose }) {
  const lvl = levelConfig[customer.level]
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50 }} dir="rtl" className="animate-fade-in">
      {/* Backdrop */}
      <div
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}
        onClick={onClose}
      />
      {/* Panel */}
      <div
        className="animate-slide-up"
        style={{
          position: 'absolute', right: 0, top: 0,
          height: '100vh', width: 360,
          background: 'var(--surface)',
          borderLeft: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column',
          boxShadow: 'var(--shadow-xl)',
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 20px 16px',
          borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 16 }}>{customer.name}</p>
          <button className="btn-icon md" onClick={onClose}>
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 20 }} className="no-scrollbar">
          {/* Avatar + name centered */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'var(--accent-muted)', border: '2px solid var(--border-accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--accent)', fontWeight: 800, fontSize: 24, marginBottom: 10,
            }}>
              {customer.name[0]}
            </div>
            <p className="num" style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 8 }}>{customer.phone}</p>
            <span className={`badge badge-pill badge-sm ${lvl.badgeClass}`}>{lvl.label}</span>
          </div>

          {/* Stats grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
            {[
              { label: 'إجمالي الطلبات', value: customer.orders },
              { label: 'إجمالي الإنفاق', value: `${customer.spent} ج` },
              { label: 'متوسط الطلب', value: `${customer.avgOrder} ج` },
              { label: 'النقاط المكتسبة', value: customer.points },
            ].map((s, i) => (
              <div key={i} className="glass-2" style={{ padding: '12px 14px' }}>
                <p className="num" style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Recent orders */}
          <p style={{ fontWeight: 600, fontSize: 11, color: 'var(--text-3)', marginBottom: 10, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            آخر الطلبات
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {customer.recentOrders.map((order, i) => (
              <div key={i} className="glass-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px' }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>#{order.id} · {order.items}</p>
                  <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{order.date}</p>
                </div>
                <p className="num" style={{ fontWeight: 700, color: 'var(--accent)', fontSize: 13 }}>{order.total} ج</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
          <button
            style={{
              width: '100%', height: 44,
              background: 'var(--accent)', color: 'white',
              fontWeight: 700, borderRadius: 'var(--radius-lg)',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              fontSize: 14, fontFamily: 'Cairo, sans-serif',
              transition: 'all var(--dur-normal) var(--ease-default)',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-hover)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
          >
            <Send size={15} />
            إرسال كوبون
          </button>
          <button
            onClick={() => window.open(`https://wa.me/2${customer.phone}`, '_blank')}
            style={{
              width: '100%', height: 44,
              background: '#25D366', color: 'white',
              fontWeight: 700, borderRadius: 'var(--radius-lg)',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              fontSize: 14, fontFamily: 'Cairo, sans-serif',
              transition: 'opacity var(--dur-normal) ease',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <MessageCircle size={15} />
            رسالة واتساب
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Customers() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = mockCustomers.filter(c =>
    c.name.includes(search) || c.phone.includes(search)
  )

  const activeCustomers = mockCustomers.filter(c => c.orders >= 5).length
  const avgOrders = (mockCustomers.reduce((s, c) => s + c.orders, 0) / mockCustomers.length).toFixed(1)

  return (
    <Layout title="الزبائن">
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--text-2)' }}>
          إجمالي{' '}
          <span className="num" style={{ color: 'var(--text)', fontWeight: 700 }}>
            {mockCustomers.length}
          </span>{' '}
          زبون
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <Search
              size={14}
              style={{
                position: 'absolute', right: 13, top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-3)', pointerEvents: 'none',
              }}
            />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="ابحث بالاسم أو الهاتف..."
              style={{
                height: 40, width: 240,
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '0 40px 0 14px',
                fontSize: 13, color: 'var(--text)', outline: 'none',
                fontFamily: 'Cairo, sans-serif',
                transition: 'border-color var(--dur-normal) ease, box-shadow var(--dur-normal) ease',
              }}
              onFocus={e => {
                e.target.style.borderColor = 'var(--accent)'
                e.target.style.boxShadow = '0 0 0 3px var(--accent-muted)'
              }}
              onBlur={e => {
                e.target.style.borderColor = 'var(--border)'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>
          <button className="btn-ghost" style={{ gap: 6 }}>
            <Download size={14} />
            تصدير
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'إجمالي الزبائن', value: mockCustomers.length, icon: Users,       color: 'var(--blue)',   muted: 'var(--blue-muted)'   },
          { label: 'زبائن نشطون',    value: activeCustomers,      icon: Activity,    color: 'var(--green)',  muted: 'var(--green-muted)'  },
          { label: 'متوسط الطلبات',  value: avgOrders,            icon: ShoppingBag, color: 'var(--accent)', muted: 'var(--accent-muted)' },
        ].map((s, i) => (
          <div key={i} className="glass" style={{ flex: 1, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: s.muted,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <s.icon size={16} style={{ color: s.color }} />
            </div>
            <div>
              <p className="num" style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Customers table */}
      <div className="glass" style={{ overflow: 'hidden' }}>
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <p className="empty-title">لا يوجد زبائن</p>
            <p className="empty-desc">لم يتم العثور على أي زبون يطابق بحثك</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="table-base">
              <thead>
                <tr>
                  {['الزبون', 'الهاتف', 'الطلبات', 'الإجمالي', 'آخر طلب', 'تواصل'].map(h => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="stagger">
                {filtered.map((c) => {
                  const lvl = levelConfig[c.level]
                  return (
                    <tr
                      key={c.id}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSelected(c)}
                    >
                      {/* Customer col */}
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{
                            width: 36, height: 36, borderRadius: '50%',
                            background: 'var(--accent-muted)',
                            border: '1px solid var(--border-accent)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'var(--accent)', fontWeight: 700, fontSize: 13,
                            flexShrink: 0,
                          }}>
                            {c.name[0]}
                          </div>
                          <div>
                            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3 }}>{c.name}</p>
                            <span className={`badge badge-pill badge-sm ${lvl.badgeClass}`} style={{ marginTop: 3 }}>{lvl.label}</span>
                          </div>
                        </div>
                      </td>

                      {/* Phone col */}
                      <td style={{ padding: '12px 16px' }}>
                        <span className="num" style={{ fontSize: 12, color: 'var(--text-2)' }}>{c.phone}</span>
                      </td>

                      {/* Orders col */}
                      <td style={{ padding: '12px 16px' }}>
                        <span className="badge badge-default">{c.orders} طلب</span>
                      </td>

                      {/* Spent col */}
                      <td style={{ padding: '12px 16px' }}>
                        <span className="num" style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)' }}>
                          {c.spent.toLocaleString('ar-EG')} ج
                        </span>
                      </td>

                      {/* Last order col */}
                      <td style={{ padding: '12px 16px', fontSize: 11, color: 'var(--text-3)' }}>{c.lastOrder}</td>

                      {/* WhatsApp col */}
                      <td style={{ padding: '12px 16px' }}>
                        <button
                          className="btn-icon sm"
                          onClick={e => { e.stopPropagation(); window.open(`https://wa.me/2${c.phone}`, '_blank') }}
                          title="واتساب"
                          style={{ color: '#25D366', borderColor: 'rgba(37,211,102,0.20)', background: 'rgba(37,211,102,0.07)' }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = 'rgba(37,211,102,0.15)'
                            e.currentTarget.style.borderColor = 'rgba(37,211,102,0.35)'
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = 'rgba(37,211,102,0.07)'
                            e.currentTarget.style.borderColor = 'rgba(37,211,102,0.20)'
                          }}
                        >
                          <MessageCircle size={13} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && <CustomerDrawer customer={selected} onClose={() => setSelected(null)} />}
    </Layout>
  )
}
