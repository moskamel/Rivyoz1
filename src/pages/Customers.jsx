import { useState } from 'react'
import { Search, Users, TrendingUp, ShoppingBag, Star, X, MessageCircle, Eye, Send } from 'lucide-react'
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
  beginner: { label: 'مبتدئ', bg: 'var(--surface-2)', color: 'var(--text-2)' },
  contributor: { label: 'مساهم', bg: 'var(--blue-muted)', color: 'var(--blue)' },
  trusted: { label: 'موثوق', bg: 'var(--green-muted)', color: 'var(--green)' },
  expert: { label: 'خبير', bg: 'var(--yellow-muted)', color: 'var(--yellow)' },
}

function CustomerDrawer({ customer, onClose }) {
  const lvl = levelConfig[customer.level]
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex' }} dir="rtl">
      <div style={{ flex: 1, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={onClose} />
      <div style={{ width: 380, background: 'var(--surface)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div className="flex items-center gap-3">
            <div style={{ width: 44, height: 44, background: 'var(--accent-muted)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontWeight: 900, fontSize: 17, border: '1px solid rgba(249,115,22,0.2)' }}>
              {customer.name[0]}
            </div>
            <div>
              <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>{customer.name}</p>
              <p className="num" style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2 }}>{customer.phone}</p>
              <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 6, background: lvl.bg, color: lvl.color, display: 'inline-block', marginTop: 4 }}>
                {lvl.label}
              </span>
            </div>
          </div>
          <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: 8, border: 'none', background: 'var(--surface-2)', color: 'var(--text-2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={14} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: 16 }}>
          {[
            { label: 'إجمالي الطلبات', value: customer.orders },
            { label: 'إجمالي الإنفاق', value: `${customer.spent} ج` },
            { label: 'متوسط الطلب', value: `${customer.avgOrder} ج` },
            { label: 'النقاط المكتسبة', value: customer.points },
          ].map((s, i) => (
            <div key={i} style={{ background: 'var(--surface-2)', borderRadius: 12, padding: '12px 14px', border: '1px solid var(--border)' }}>
              <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)', fontFamily: 'Inter' }}>{s.value}</p>
              <p style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>{s.label}</p>
            </div>
          ))}
        </div>

        <div style={{ padding: '0 16px 16px' }}>
          <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 13, marginBottom: 10 }}>آخر الطلبات</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {customer.recentOrders.map((order, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--surface-2)', borderRadius: 10, border: '1px solid var(--border)' }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>#{order.id} · {order.items}</p>
                  <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{order.date}</p>
                </div>
                <p className="num" style={{ fontWeight: 700, color: 'var(--text)', fontSize: 13 }}>{order.total} ج</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: 16, borderTop: '1px solid var(--border)', marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button style={{ width: '100%', padding: '12px', background: 'var(--accent)', color: 'white', fontWeight: 700, borderRadius: 12, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 14 }}>
            <Send size={15} />
            إرسال كوبون
          </button>
          <button onClick={() => window.open(`https://wa.me/2${customer.phone}`, '_blank')} style={{ width: '100%', padding: '12px', background: 'var(--green-muted)', color: 'var(--green)', fontWeight: 700, borderRadius: 12, border: '1px solid rgba(34,197,94,0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 14 }}>
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

  return (
    <Layout title="زبائني">
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'إجمالي الزبائن', value: '234', icon: Users, color: 'var(--accent)' },
          { label: 'زبائن جدد هذا الشهر', value: '45', icon: TrendingUp, color: 'var(--green)' },
          { label: 'متوسط الطلبات', value: '3.2', icon: ShoppingBag, color: 'var(--blue)' },
          { label: 'أعلى قيمة عميل', value: '580 ج', icon: Star, color: 'var(--yellow)' },
        ].map((s, i) => (
          <div key={i} className="glass" style={{ padding: 20 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: s.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              <s.icon size={17} style={{ color: s.color }} />
            </div>
            <p className="num" style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 5 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="glass" style={{ overflow: 'hidden' }}>
        <div style={{ padding: 14, borderBottom: '1px solid var(--border)' }}>
          <div style={{ position: 'relative' }}>
            <Search size={15} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="ابحث بالاسم أو رقم الهاتف..."
              style={{ width: '100%', padding: '9px 38px 9px 14px', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text)', fontSize: 13, outline: 'none', boxSizing: 'border-box', fontFamily: 'Cairo, sans-serif' }}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['الاسم', 'الهاتف', 'عدد الطلبات', 'إجمالي الإنفاق', 'آخر طلب', 'المستوى', 'الإجراءات'].map(h => (
                  <th key={h} style={{ textAlign: 'right', padding: '10px 16px', fontSize: 11, fontWeight: 700, color: 'var(--text-3)', letterSpacing: '0.05em', background: 'var(--surface-2)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, idx) => {
                const lvl = levelConfig[c.level]
                return (
                  <tr key={c.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '12px 16px' }}>
                      <div className="flex items-center gap-2.5">
                        <div style={{ width: 30, height: 30, background: 'var(--accent-muted)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontWeight: 800, fontSize: 12, flexShrink: 0 }}>
                          {c.name[0]}
                        </div>
                        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{c.name}</p>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span className="num" style={{ fontSize: 12, color: 'var(--text-2)' }}>{c.phone}</span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span className="num" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{c.orders}</span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span className="num" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{c.spent.toLocaleString('ar-EG')} ج</span>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--text-2)' }}>{c.lastOrder}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 6, background: lvl.bg, color: lvl.color }}>
                        {lvl.label}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelected(c)}
                          style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 10px', background: 'var(--accent-muted)', color: 'var(--accent)', borderRadius: 8, fontSize: 11, fontWeight: 700, border: 'none', cursor: 'pointer' }}
                        >
                          <Eye size={12} />
                          عرض
                        </button>
                        <button onClick={() => window.open(`https://wa.me/2${c.phone}`, '_blank')} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '5px 10px', background: 'var(--green-muted)', color: 'var(--green)', borderRadius: 8, fontSize: 11, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                          <MessageCircle size={12} />
                          واتساب
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selected && <CustomerDrawer customer={selected} onClose={() => setSelected(null)} />}
    </Layout>
  )
}
