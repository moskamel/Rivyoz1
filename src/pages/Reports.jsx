import { useState } from 'react'
import {
  TrendUp, TrendDown, Import, Document, Check, DollarSquare, ShoppingBag,
  People, Star1, Flash, Tag, Chart1, Box, Chart, Diagram, PercentageSquare,
} from 'iconsax-react'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
  ComposedChart, Area,
} from 'recharts'
import Layout from '../components/layout/Layout'

/* ─── PALETTE ──────────────────────────────────────────────── */
const C = {
  accent: '#F97316', blue: '#60A5FA', green: '#22C55E',
  yellow: '#EAB308', red: '#F87171', purple: '#A78BFA',
  cyan: '#22D3EE',
}

/* ─── MOCK DATA ────────────────────────────────────────────── */
const weekly = [
  { day: 'السبت',   cur: 1800, prev: 1600, orders: 22 },
  { day: 'الأحد',   cur: 2100, prev: 1900, orders: 26 },
  { day: 'الاثنين', cur: 1650, prev: 1800, orders: 20 },
  { day: 'الثلاثاء',cur: 2400, prev: 2100, orders: 29 },
  { day: 'الأربعاء',cur: 2200, prev: 2000, orders: 27 },
  { day: 'الخميس',  cur: 2800, prev: 2500, orders: 34 },
  { day: 'الجمعة',  cur: 3340, prev: 2600, orders: 41 },
]
const monthly = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  cur: 1400 + Math.round(Math.sin(i / 3) * 600) + Math.round(Math.random() * 400),
  prev: 1200 + Math.round(Math.sin(i / 3) * 500) + Math.round(Math.random() * 300),
  orders: 15 + Math.round(Math.random() * 20),
}))

const hourlyData = [
  { h: '8ص',  v: 5  }, { h: '9ص',  v: 12 }, { h: '10ص', v: 18 },
  { h: '11ص', v: 22 }, { h: '12ظ', v: 48 }, { h: '1ظ',  v: 61 },
  { h: '2ظ',  v: 55 }, { h: '3ع',  v: 32 }, { h: '4ع',  v: 24 },
  { h: '5ع',  v: 28 }, { h: '6م',  v: 45 }, { h: '7م',  v: 72 },
  { h: '8م',  v: 85 }, { h: '9م',  v: 78 }, { h: '10م', v: 60 },
  { h: '11م', v: 35 },
]
const weekdayData = [
  { d: 'الجمعة',   v: 3340, pct: 100 },
  { d: 'الخميس',   v: 2800, pct: 84  },
  { d: 'الثلاثاء', v: 2400, pct: 72  },
  { d: 'الأربعاء', v: 2200, pct: 66  },
  { d: 'الأحد',    v: 2100, pct: 63  },
  { d: 'السبت',    v: 1800, pct: 54  },
  { d: 'الاثنين',  v: 1650, pct: 49  },
]
const categoryData = [
  { name: 'مشويات',    rev: 18400, orders: 210, color: C.accent  },
  { name: 'مشروبات',   rev: 9200,  orders: 180, color: C.blue    },
  { name: 'وجبات خفيفة', rev: 6800, orders: 145, color: C.green   },
  { name: 'بيتزا',     rev: 5400,  orders: 88,  color: C.yellow  },
  { name: 'حلويات',    rev: 3200,  orders: 67,  color: C.purple  },
]
const orderTypeData = [
  { name: 'توصيل', value: 52, color: C.accent },
  { name: 'طاولة',  value: 30, color: C.blue   },
  { name: 'استلام', value: 18, color: C.green  },
]
const cancellationData = [
  { reason: 'الطلب تأخر كثيراً', count: 28 },
  { reason: 'غلط في الطلب',       count: 17 },
  { reason: 'تغيير رأي العميل',   count: 12 },
  { reason: 'صنف نفد من المخزون', count: 9  },
  { reason: 'مشكلة في الدفع',     count: 5  },
]
const topCustomers = [
  { name: 'أحمد محمد السيد',     orders: 34, spent: 4820, tier: 'خبير',  clv: 9640  },
  { name: 'خالد محمود عبد الله', orders: 27, spent: 3510, tier: 'مساهم', clv: 7020  },
  { name: 'فاطمة حسن إبراهيم',  orders: 21, spent: 2940, tier: 'موثوق', clv: 5880  },
  { name: 'منى عبد الرحمن',      orders: 18, spent: 2160, tier: 'موثوق', clv: 4320  },
  { name: 'سارة علي محمود',      orders: 15, spent: 1875, tier: 'مبتدئ', clv: 3750  },
]
const topProducts = [
  { name: 'كفتة مشوية',    orders: 210, rev: 18900, trend: +12, margin: 62 },
  { name: 'فراخ مشوية',    orders: 185, rev: 16650, trend: +8,  margin: 58 },
  { name: 'شاورما دجاج',   orders: 142, rev: 11360, trend: -5,  margin: 55 },
  { name: 'عصير قصب',      orders: 138, rev: 4140,  trend: +22, margin: 80 },
  { name: 'أرز بالخضار',   orders: 98,  rev: 4900,  trend: -18, margin: 45 },
  { name: 'بيتزا مارغريتا', orders: 88, rev: 7920,  trend: +5,  margin: 50 },
]
const branchData = [
  { name: 'الفرع الرئيسي',   rev: 24200, orders: 178, rating: 4.8, growth: +15, pct: 100 },
  { name: 'فرع المعادي',      rev: 16800, orders: 124, rating: 4.6, growth: +8,  pct: 69  },
  { name: 'فرع الشيخ زايد',  rev: 12400, orders: 96,  rating: 4.5, growth: -3,  pct: 51  },
]
const couponPerf = [
  { code: 'WELCOME20', uses: 48, rev: 5760,  convRate: 68, roi: 240 },
  { code: 'SAVE15',    uses: 32, rev: 3840,  convRate: 54, roi: 180 },
  { code: 'SUMMER10',  uses: 19, rev: 1900,  convRate: 40, roi: 90  },
]
const retentionData = [
  { m: 'يناير',  new: 42, ret: 28 },
  { m: 'فبراير', new: 38, ret: 32 },
  { m: 'مارس',   new: 51, ret: 35 },
  { m: 'أبريل',  new: 45, ret: 40 },
  { m: 'مايو',   new: 49, ret: 44 },
]
const customerSegments = [
  { name: 'VIP',     value: 28,  color: C.purple },
  { name: 'أوفياء',  value: 89,  color: C.blue   },
  { name: 'جدد',     value: 45,  color: C.green  },
  { name: 'في خطر',  value: 23,  color: C.yellow },
  { name: 'مفقودون', value: 14,  color: C.red    },
]

const AI_INSIGHTS = [
  { level: 'red',    icon: '📉', title: 'انخفاض في مبيعات يوم الاثنين', body: 'الاثنين أضعف أيامك — إيراده أقل بنسبة 51% من الجمعة. ابدأ عرضاً أسبوعياً خاصاً بالاثنين لرفع الطلب.', action: 'إنشاء عرض يوم الاثنين', tab: 0 },
  { level: 'red',    icon: '⚠️', title: 'منتج "أرز بالخضار" ينخفض بسرعة', body: 'انخفضت مبيعاته 18% هذا الشهر — قد يكون بسبب الجودة أو السعر. راجع المنتج أو استبدله.', action: 'مراجعة المنتج', tab: 4 },
  { level: 'yellow', icon: '🕗', title: 'فرصة: الفترة 3-6 مساءً ضعيفة', body: 'الطلبات تنخفض 60% بين 3 و6 مساءً. عرض Happy Hour في هذه الفترة يمكن أن يرفع الإيراد +18%.', action: 'تفعيل Happy Hour', tab: 1 },
  { level: 'yellow', icon: '🚚', title: 'وقت التوصيل فوق الهدف', body: 'متوسط وقت التوصيل 42 دقيقة — الهدف 30 دقيقة. العملاء الذين انتظروا أكثر لم يعودوا للطلب.', action: 'تحسين عمليات التوصيل', tab: 0 },
  { level: 'green',  icon: '🏆', title: 'الجمعة أقوى أيامك — استثمر فيه', body: 'الجمعة يحقق 48% إيراداً أعلى من متوسط الأسبوع. زد ساعات العمل أو الطاقم أو أطلق عروضاً حصرية.', action: 'تحسين استراتيجية الجمعة', tab: 1 },
  { level: 'green',  icon: '💎', title: 'عملاء الولاء ينفقون 2.4x أكثر', body: 'أعضاء برنامج الولاء متوسط إنفاقهم 198ج/طلب مقابل 82ج للعملاء العاديين. ركّز على تنمية البرنامج.', action: 'تطوير برنامج الولاء', tab: 6 },
  { level: 'green',  icon: '📈', title: 'التوصيل يقود النمو', body: 'طلبات التوصيل نمت 22% هذا الشهر وتمثل 52% من الإيراد. فكر في توسيع نطاق التوصيل.', action: 'توسيع نطاق التوصيل', tab: 2 },
]

/* ─── HELPERS ──────────────────────────────────────────────── */
const PERIODS = ['اليوم', 'أمس', '7 أيام', '30 يوم', 'هذا الشهر', 'هذه السنة']
const TABS = [
  { label: 'لمحة تنفيذية', icon: Chart1       },
  { label: 'المبيعات',      icon: DollarSquare },
  { label: 'الطلبات',       icon: ShoppingBag  },
  { label: 'العملاء',       icon: People       },
  { label: 'المنتجات',      icon: Tag          },
  { label: 'الفروع',        icon: Diagram      },
  { label: 'التسويق',       icon: PercentageSquare },
  { label: 'ذكاء اصطناعي',  icon: Flash        },
]

function Tip({ active, payload, label, unit = 'ج' }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'var(--surface-3)', border: '1px solid var(--border-strong)', borderRadius: 10, padding: '8px 12px', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
      <p style={{ fontSize: 11, color: 'var(--text-2)', marginBottom: 4 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ fontSize: 13, fontWeight: 700, color: p.color || C.accent, fontFamily: 'Inter' }}>
          {p.name && <span style={{ color: 'var(--text-3)', fontWeight: 400, marginLeft: 4 }}>{p.name}</span>}
          {typeof p.value === 'number' ? (unit === 'ج' ? `${p.value.toLocaleString()} ج` : p.value) : p.value}
        </p>
      ))}
    </div>
  )
}

function KpiCard({ label, value, unit, change, icon: Icon, color, bg, sub }) {
  const up = change >= 0
  return (
    <div className="glass glass-interactive" style={{ padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ width: 34, height: 34, borderRadius: 'var(--radius-lg)', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={15} style={{ color }} />
        </div>
        {change != null && (
          <span style={{ fontSize: 10, fontWeight: 700, color: up ? 'var(--green)' : 'var(--red)', background: up ? 'var(--green-muted)' : 'var(--red-muted)', padding: '3px 8px', borderRadius: 8 }}>
            {up ? '▲' : '▼'} {Math.abs(change)}%
          </span>
        )}
      </div>
      <p className="num" style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)', lineHeight: 1, letterSpacing: '-0.02em' }}>
        {value}{unit && <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-2)', marginRight: 3 }}>{unit}</span>}
      </p>
      <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', marginTop: 5 }}>{label}</p>
      {sub && <p style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{sub}</p>}
    </div>
  )
}

function SectionTitle({ children, sub }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{children}</p>
      {sub && <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{sub}</p>}
    </div>
  )
}

function useToast() {
  const [toast, setToast] = useState(null)
  const show = msg => { setToast(msg); setTimeout(() => setToast(null), 2500) }
  return { toast, show }
}

/* ─── TAB: EXECUTIVE ───────────────────────────────────────── */
function ExecutiveTab({ period }) {
  const data = period === '30 يوم' || period === 'هذا الشهر' ? monthly : weekly
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* 8 KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        <KpiCard label="إجمالي الإيراد"     value="45,600"  unit="ج"  change={+15} icon={DollarSquare}     color="var(--accent)"  bg="var(--accent-muted)"  sub="vs الفترة السابقة" />
        <KpiCard label="إجمالي الطلبات"     value="312"              change={+8}  icon={ShoppingBag}      color="var(--blue)"    bg="var(--blue-muted)"    sub="معدل الإلغاء 6%" />
        <KpiCard label="متوسط قيمة الطلب"   value="146"     unit="ج"  change={+6}  icon={Chart}            color="var(--yellow)"  bg="var(--yellow-muted)"  sub="AOV" />
        <KpiCard label="تقدير الأرباح"       value="~13,680" unit="ج"  change={+11} icon={PercentageSquare} color="var(--green)"   bg="var(--green-muted)"   sub="هامش ~30%" />
        <KpiCard label="عملاء جدد"           value="78"               change={+22} icon={People}           color="var(--cyan)"    bg="rgba(34,211,238,0.12)" sub="هذه الفترة" />
        <KpiCard label="معدل الاحتفاظ"       value="68"      unit="%" change={+3}  icon={TrendUp}          color="var(--purple)"  bg="rgba(167,139,250,0.12)" sub="vs 62% متوسط الصناعة" />
        <KpiCard label="متوسط CLV"           value="240"     unit="ج" change={-5}  icon={Star1}            color={C.accent}       bg="var(--accent-muted)"  sub="قيمة العميل مدى الحياة" />
        <KpiCard label="التقييم المتوسط"     value="4.8"     unit="★" change={null} icon={Star1}           color="var(--yellow)"  bg="var(--yellow-muted)"  sub="من 5 — 87 تقييم" />
      </div>

      {/* Revenue comparison */}
      <div className="glass" style={{ padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <SectionTitle sub="المقارنة مع الفترة السابقة">الإيراد اليومي</SectionTitle>
          <div style={{ display: 'flex', gap: 16, fontSize: 11 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--text-2)' }}><span style={{ width: 10, height: 3, background: C.accent, borderRadius: 2, display: 'inline-block' }} />هذه الفترة</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--text-3)' }}><span style={{ width: 10, height: 3, background: 'var(--border-strong)', borderRadius: 2, display: 'inline-block', borderStyle: 'dashed' }} />الفترة السابقة</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <ComposedChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="fillCur" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={C.accent} stopOpacity={0.15} />
                <stop offset="95%" stopColor={C.accent} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--border)" strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 11, fontFamily: 'Zain', fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: 'var(--text-3)', fontFamily: 'Inter' }} axisLine={false} tickLine={false} width={44} />
            <Tooltip content={<Tip />} />
            <Area type="monotone" dataKey="cur" fill="url(#fillCur)" stroke="none" />
            <Line type="monotone" dataKey="prev" stroke="var(--border-strong)" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="سابق" />
            <Line type="monotone" dataKey="cur" stroke={C.accent} strokeWidth={2.5} dot={{ r: 3, fill: C.accent, stroke: 'var(--bg)', strokeWidth: 2 }} activeDot={{ r: 5 }} name="حالي" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Best + categories */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Top products */}
        <div className="glass" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
            <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 13 }}>أفضل المنتجات أداءً</p>
          </div>
          {topProducts.slice(0, 5).map((p, i) => (
            <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 20px', borderBottom: i < 4 ? '1px solid var(--border)' : 'none' }}>
              <span style={{ width: 22, height: 22, borderRadius: 7, background: i === 0 ? 'var(--accent-muted)' : 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: i === 0 ? 'var(--accent)' : 'var(--text-3)', flexShrink: 0 }}>{i + 1}</span>
              <p style={{ flex: 1, fontSize: 12, fontWeight: 500, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</p>
              <span style={{ fontSize: 10, fontWeight: 700, color: p.trend >= 0 ? 'var(--green)' : 'var(--red)' }}>{p.trend >= 0 ? '▲' : '▼'} {Math.abs(p.trend)}%</span>
              <span className="num" style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', flexShrink: 0 }}>{p.rev.toLocaleString()} ج</span>
            </div>
          ))}
        </div>

        {/* Branch comparison */}
        <div className="glass" style={{ padding: 20 }}>
          <SectionTitle sub="الإيراد والنمو">أداء الفروع</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {branchData.map(b => (
              <div key={b.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>{b.name}</span>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: b.growth >= 0 ? 'var(--green)' : 'var(--red)' }}>{b.growth >= 0 ? '▲' : '▼'} {Math.abs(b.growth)}%</span>
                    <span className="num" style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>{b.rev.toLocaleString()} ج</span>
                  </div>
                </div>
                <div style={{ height: 5, background: 'var(--surface-3)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${b.pct}%`, height: '100%', background: C.accent, borderRadius: 4, transition: 'width 0.6s' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category breakdown */}
      <div className="glass" style={{ padding: 20 }}>
        <SectionTitle sub="الإيراد والطلبات حسب الفئة">تحليل الفئات</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {categoryData.map(c => {
            const maxRev = categoryData[0].rev
            const pct = Math.round((c.rev / maxRev) * 100)
            return (
              <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', minWidth: 100, textAlign: 'right' }}>{c.name}</span>
                <div style={{ flex: 1, height: 6, background: 'var(--surface-3)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: c.color, borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: 11, color: 'var(--text-3)', minWidth: 60 }}>{c.orders} طلب</span>
                <span className="num" style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', minWidth: 80, textAlign: 'left' }}>{c.rev.toLocaleString()} ج</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ─── TAB: SALES ───────────────────────────────────────────── */
function SalesTab({ period }) {
  const data = period === '30 يوم' || period === 'هذا الشهر' ? monthly : weekly
  const total = data.reduce((s, d) => s + d.cur, 0)
  const prevTotal = data.reduce((s, d) => s + d.prev, 0)
  const growth = Math.round(((total - prevTotal) / prevTotal) * 100)

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        <KpiCard label="إجمالي الإيراد"   value={total.toLocaleString()}                    unit="ج"  change={growth} icon={DollarSquare} color="var(--accent)" bg="var(--accent-muted)" />
        <KpiCard label="متوسط يومي"        value={Math.round(total / data.length).toLocaleString()} unit="ج"  change={null}   icon={Chart}       color="var(--blue)"   bg="var(--blue-muted)" />
        <KpiCard label="أعلى يوم إيراداً"  value={Math.max(...data.map(d => d.cur)).toLocaleString()} unit="ج" change={null}  icon={TrendUp}     color="var(--green)"  bg="var(--green-muted)" sub="الجمعة" />
        <KpiCard label="أدنى يوم إيراداً"  value={Math.min(...data.map(d => d.cur)).toLocaleString()} unit="ج" change={null}  icon={TrendDown}   color="var(--yellow)" bg="var(--yellow-muted)" sub="الاثنين" />
      </div>

      {/* Revenue trend */}
      <div className="glass" style={{ padding: 20 }}>
        <SectionTitle sub="مقارنة مع الفترة السابقة">منحنى الإيراد</SectionTitle>
        <ResponsiveContainer width="100%" height={200}>
          <ComposedChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gradSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={C.accent} stopOpacity={0.2} />
                <stop offset="95%" stopColor={C.accent} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--border)" strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 11, fontFamily: 'Zain', fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: 'var(--text-3)', fontFamily: 'Inter' }} axisLine={false} tickLine={false} width={44} />
            <Tooltip content={<Tip />} />
            <Area type="monotone" dataKey="cur" fill="url(#gradSales)" stroke="none" />
            <Line type="monotone" dataKey="prev" stroke="var(--border-strong)" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="سابق" />
            <Line type="monotone" dataKey="cur" stroke={C.accent} strokeWidth={2.5} dot={{ r: 3, fill: C.accent, stroke: 'var(--bg)', strokeWidth: 2 }} name="حالي" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Hours + Weekday */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="glass" style={{ padding: 20 }}>
          <SectionTitle sub="أكثر الأوقات طلباً">توزيع الطلبات حسب الساعة</SectionTitle>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={hourlyData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="h" tick={{ fontSize: 10, fontFamily: 'Zain', fill: 'var(--text-3)' }} axisLine={false} tickLine={false} interval={1} />
              <YAxis hide />
              <Tooltip content={p => <Tip {...p} unit="طلب" />} />
              <Bar dataKey="v" radius={[4, 4, 0, 0]} name="طلبات">
                {hourlyData.map((d, i) => (
                  <Cell key={i} fill={d.v >= 70 ? C.accent : d.v >= 40 ? '#FDBA74' : 'var(--border-strong)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 8, textAlign: 'center' }}>🔥 ذروة الطلب: 7-9 مساءً</p>
        </div>

        <div className="glass" style={{ padding: 20 }}>
          <SectionTitle sub="مرتبة من الأعلى إيراداً">الإيراد حسب اليوم</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {weekdayData.map((d, i) => (
              <div key={d.d} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)', minWidth: 60 }}>{d.d}</span>
                <div style={{ flex: 1, height: 8, background: 'var(--surface-3)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${d.pct}%`, height: '100%', background: i === 0 ? C.accent : i === 1 ? '#FDBA74' : 'var(--border-strong)', borderRadius: 4 }} />
                </div>
                <span className="num" style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)', minWidth: 70, textAlign: 'left' }}>{d.v.toLocaleString()} ج</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sales by category */}
      <div className="glass" style={{ padding: 20 }}>
        <SectionTitle sub="الإيراد والطلبات">المبيعات حسب الفئة</SectionTitle>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={categoryData} layout="vertical" margin={{ top: 0, right: 60, left: 10, bottom: 0 }}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="4 4" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 10, fill: 'var(--text-3)', fontFamily: 'Inter' }} axisLine={false} tickLine={false} />
            <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fontFamily: 'Zain', fill: 'var(--text-2)' }} axisLine={false} tickLine={false} width={70} />
            <Tooltip content={<Tip />} />
            <Bar dataKey="rev" radius={[0, 4, 4, 0]} name="الإيراد">
              {categoryData.map((c, i) => <Cell key={i} fill={c.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

/* ─── TAB: ORDERS ──────────────────────────────────────────── */
function OrdersTab() {
  const funnel = [
    { label: 'طلبات واردة',  value: 333, color: C.blue   },
    { label: 'قيد التحضير',  value: 312, color: C.yellow },
    { label: 'مكتملة',       value: 294, color: C.green  },
    { label: 'ملغاة',        value: 19,  color: C.red    },
  ]
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        <KpiCard label="إجمالي الطلبات"    value="333"  change={+8}  icon={ShoppingBag}  color="var(--blue)"   bg="var(--blue-muted)" />
        <KpiCard label="طلبات مكتملة"       value="294"  change={+5}  icon={Check}        color="var(--green)"  bg="var(--green-muted)" sub="معدل الإنجاز 88%" />
        <KpiCard label="طلبات ملغاة"        value="19"   change={-12} icon={TrendDown}    color="var(--red)"    bg="var(--red-muted)" sub="معدل الإلغاء 6%" />
        <KpiCard label="متوسط وقت التحضير" value="22"   unit="دق"  change={-8}  icon={Flash}        color="var(--yellow)" bg="var(--yellow-muted)" sub="الهدف 20 دقيقة" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Order funnel */}
        <div className="glass" style={{ padding: 20 }}>
          <SectionTitle sub="مسار الطلب من الاستلام للإنجاز">قمع الطلبات</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {funnel.map((f, i) => {
              const pct = Math.round((f.value / funnel[0].value) * 100)
              return (
                <div key={f.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: 12, color: 'var(--text-2)' }}>{f.label}</span>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <span style={{ fontSize: 10, color: 'var(--text-3)' }}>{pct}%</span>
                      <span className="num" style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>{f.value}</span>
                    </div>
                  </div>
                  <div style={{ height: 8, background: 'var(--surface-3)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: f.color, borderRadius: 4, transition: 'width 0.6s' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Order types */}
        <div className="glass" style={{ padding: 20 }}>
          <SectionTitle sub="توزيع الطلبات حسب القناة">قنوات الطلب</SectionTitle>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 10 }}>
            <PieChart width={130} height={130}>
              <Pie data={orderTypeData} cx={60} cy={60} innerRadius={38} outerRadius={60} dataKey="value" paddingAngle={3}>
                {orderTypeData.map((_, i) => <Cell key={i} fill={orderTypeData[i].color} />)}
              </Pie>
            </PieChart>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {orderTypeData.map(t => (
                <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: t.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: 'var(--text-2)', flex: 1 }}>{t.name}</span>
                  <span className="num" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{t.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cancellation reasons */}
      <div className="glass" style={{ padding: 20 }}>
        <SectionTitle sub="لتحسين معدل الإنجاز">أسباب إلغاء الطلبات</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {cancellationData.map((c, i) => {
            const pct = Math.round((c.count / cancellationData[0].count) * 100)
            return (
              <div key={c.reason} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 12, color: 'var(--text-2)', minWidth: 160 }}>{c.reason}</span>
                <div style={{ flex: 1, height: 6, background: 'var(--surface-3)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: i === 0 ? C.red : C.yellow, borderRadius: 4 }} />
                </div>
                <span className="num" style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', minWidth: 28 }}>{c.count}</span>
                <span style={{ fontSize: 10, color: 'var(--text-3)', minWidth: 32 }}>{pct}%</span>
              </div>
            )
          })}
        </div>
        <div style={{ marginTop: 14, padding: '10px 14px', background: 'var(--red-muted)', borderRadius: 10, border: '1px solid rgba(248,113,113,0.25)' }}>
          <p style={{ fontSize: 12, color: 'var(--text-2)' }}>💡 <strong>إجراء موصى به:</strong> أكبر سبب للإلغاء هو التأخر — استهدف تقليل وقت التحضير إلى أقل من 20 دقيقة</p>
        </div>
      </div>
    </div>
  )
}

/* ─── TAB: CUSTOMERS ───────────────────────────────────────── */
function CustomersTab() {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        <KpiCard label="إجمالي العملاء"     value="234" change={+18} icon={People}  color="var(--accent)" bg="var(--accent-muted)" />
        <KpiCard label="عملاء جدد"           value="78"  change={+22} icon={TrendUp} color="var(--green)"  bg="var(--green-muted)" sub="هذه الفترة" />
        <KpiCard label="عملاء عائدون"        value="156" change={+14} icon={Star1}   color="var(--blue)"   bg="var(--blue-muted)"  sub="معدل العودة 67%" />
        <KpiCard label="عملاء في خطر الفقدان" value="45" change={+8} icon={TrendDown} color="var(--red)"  bg="var(--red-muted)"   sub="لم يطلبوا 14+ يوم" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Retention trend */}
        <div className="glass" style={{ padding: 20 }}>
          <SectionTitle sub="عملاء جدد vs عائدون">منحنى الاحتفاظ</SectionTitle>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={retentionData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="4 4" vertical={false} />
              <XAxis dataKey="m" tick={{ fontSize: 11, fontFamily: 'Zain', fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--text-3)', fontFamily: 'Inter' }} axisLine={false} tickLine={false} width={30} />
              <Tooltip content={p => <Tip {...p} unit="عميل" />} />
              <Bar dataKey="new" fill={C.green} radius={[4, 4, 0, 0]} name="جدد" stackId="a" />
              <Bar dataKey="ret" fill={C.blue}  radius={[4, 4, 0, 0]} name="عائدون" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 16, marginTop: 8, fontSize: 11 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--text-2)' }}><span style={{ width: 10, height: 10, borderRadius: 2, background: C.green, display: 'inline-block' }} />جدد</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--text-2)' }}><span style={{ width: 10, height: 10, borderRadius: 2, background: C.blue, display: 'inline-block' }} />عائدون</span>
          </div>
        </div>

        {/* Customer segments donut */}
        <div className="glass" style={{ padding: 20 }}>
          <SectionTitle sub="توزيع قاعدة العملاء">شرائح العملاء</SectionTitle>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <PieChart width={130} height={130}>
              <Pie data={customerSegments} cx={60} cy={60} innerRadius={36} outerRadius={60} dataKey="value" paddingAngle={2}>
                {customerSegments.map((s, i) => <Cell key={i} fill={s.color} />)}
              </Pie>
            </PieChart>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
              {customerSegments.map(s => (
                <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: s.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: 'var(--text-2)', flex: 1 }}>{s.name}</span>
                  <span className="num" style={{ fontSize: 11, fontWeight: 700, color: 'var(--text)' }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top customers table */}
      <div className="glass" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 13 }}>أفضل العملاء — بالإيراد والطلبات</p>
        </div>
        <table className="table-base">
          <thead>
            <tr>{['العميل', 'الطلبات', 'إجمالي الإنفاق', 'CLV المتوقع', 'المستوى'].map((h, i) => <th key={i}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {topCustomers.map((c, i) => (
              <tr key={c.name}>
                <td style={{ padding: '10px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 28, height: 28, borderRadius: 8, background: i === 0 ? 'var(--accent-muted)' : 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: i === 0 ? 'var(--accent)' : 'var(--text-2)', flexShrink: 0 }}>{i + 1}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{c.name}</span>
                  </div>
                </td>
                <td style={{ padding: '10px 16px' }}><span className="num" style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-2)' }}>{c.orders}</span></td>
                <td style={{ padding: '10px 16px' }}><span className="num" style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)' }}>{c.spent.toLocaleString()} ج</span></td>
                <td style={{ padding: '10px 16px' }}><span className="num" style={{ fontSize: 13, fontWeight: 600, color: 'var(--green)' }}>{c.clv.toLocaleString()} ج</span></td>
                <td style={{ padding: '10px 16px' }}>
                  <span className={`badge badge-pill badge-sm ${c.tier === 'خبير' ? 'badge-purple' : c.tier === 'مساهم' ? 'badge-accent' : 'badge-blue'}`}>{c.tier}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ─── TAB: PRODUCTS ────────────────────────────────────────── */
function ProductsTab() {
  const [view, setView] = useState('revenue')
  const sorted = [...topProducts].sort((a, b) => view === 'revenue' ? b.rev - a.rev : b.orders - a.orders)
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        <KpiCard label="أفضل منتج"      value="كفتة مشوية" change={null} icon={Star1}     color="var(--accent)" bg="var(--accent-muted)" sub="18,900 ج — 210 طلب" />
        <KpiCard label="أسرع نمو"       value="عصير قصب"  change={+22}  icon={TrendUp}   color="var(--green)"  bg="var(--green-muted)" sub="+22% هذه الفترة" />
        <KpiCard label="منتج في تراجع"  value="أرز بالخضار" change={-18} icon={TrendDown} color="var(--red)"    bg="var(--red-muted)"   sub="يحتاج مراجعة" />
        <KpiCard label="أعلى هامش ربح" value="عصير قصب"   change={null} icon={PercentageSquare} color="var(--yellow)" bg="var(--yellow-muted)" sub="80% هامش" />
      </div>

      <div className="glass" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 13 }}>أداء المنتجات</p>
          <div style={{ display: 'flex', gap: 6 }}>
            {[['revenue', 'الإيراد'], ['orders', 'الطلبات']].map(([k, l]) => (
              <button key={k} onClick={() => setView(k)} style={{ padding: '4px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, border: `1px solid ${view === k ? 'var(--accent)' : 'var(--border)'}`, background: view === k ? 'var(--accent-muted)' : 'transparent', color: view === k ? 'var(--accent)' : 'var(--text-2)', cursor: 'pointer' }}>{l}</button>
            ))}
          </div>
        </div>
        <table className="table-base">
          <thead>
            <tr>{['المنتج', 'الطلبات', 'الإيراد', 'هامش الربح', 'الاتجاه'].map((h, i) => <th key={i}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {sorted.map((p, i) => (
              <tr key={p.name}>
                <td style={{ padding: '10px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 22, height: 22, borderRadius: 7, background: i === 0 ? 'var(--accent-muted)' : 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: i === 0 ? 'var(--accent)' : 'var(--text-3)', flexShrink: 0 }}>{i + 1}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{p.name}</span>
                  </div>
                </td>
                <td style={{ padding: '10px 16px' }}><span className="num" style={{ fontSize: 13, color: 'var(--text-2)' }}>{p.orders}</span></td>
                <td style={{ padding: '10px 16px' }}><span className="num" style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)' }}>{p.rev.toLocaleString()} ج</span></td>
                <td style={{ padding: '10px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 60, height: 4, background: 'var(--surface-3)', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ width: `${p.margin}%`, height: '100%', background: p.margin >= 70 ? C.green : p.margin >= 50 ? C.yellow : C.red, borderRadius: 4 }} />
                    </div>
                    <span className="num" style={{ fontSize: 11, color: 'var(--text-2)' }}>{p.margin}%</span>
                  </div>
                </td>
                <td style={{ padding: '10px 16px' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: p.trend >= 0 ? 'var(--green)' : 'var(--red)' }}>
                    {p.trend >= 0 ? '▲' : '▼'} {Math.abs(p.trend)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ─── TAB: BRANCHES ────────────────────────────────────────── */
function BranchesTab() {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {branchData.map(b => (
          <div key={b.name} className="glass glass-interactive" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{b.name}</p>
              <span style={{ fontSize: 10, fontWeight: 700, color: b.growth >= 0 ? 'var(--green)' : 'var(--red)', background: b.growth >= 0 ? 'var(--green-muted)' : 'var(--red-muted)', padding: '3px 8px', borderRadius: 8 }}>
                {b.growth >= 0 ? '▲' : '▼'} {Math.abs(b.growth)}%
              </span>
            </div>
            <p className="num" style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)', lineHeight: 1 }}>{b.rev.toLocaleString()} <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-2)' }}>ج</span></p>
            <div style={{ display: 'flex', gap: 16, marginTop: 10 }}>
              <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{b.orders} طلب</span>
              <span style={{ fontSize: 11, color: 'var(--yellow)' }}>★ {b.rating}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison bars */}
      <div className="glass" style={{ padding: 20 }}>
        <SectionTitle sub="مقارنة الإيراد بين الفروع">مقارنة الفروع</SectionTitle>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={branchData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 11, fontFamily: 'Zain', fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: 'var(--text-3)', fontFamily: 'Inter' }} axisLine={false} tickLine={false} width={44} />
            <Tooltip content={<Tip />} />
            <Bar dataKey="rev" radius={[6, 6, 0, 0]} name="الإيراد">
              {branchData.map((_, i) => <Cell key={i} fill={[C.accent, C.blue, C.green][i]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Branch detail table */}
      <div className="glass" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 13 }}>مؤشرات الأداء التفصيلية</p>
        </div>
        <table className="table-base">
          <thead>
            <tr>{['الفرع', 'الإيراد', 'الطلبات', 'متوسط الطلب', 'التقييم', 'النمو'].map((h, i) => <th key={i}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {branchData.map(b => (
              <tr key={b.name}>
                <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text)', fontSize: 13 }}>{b.name}</td>
                <td style={{ padding: '12px 16px' }}><span className="num" style={{ fontWeight: 700, color: 'var(--accent)' }}>{b.rev.toLocaleString()} ج</span></td>
                <td style={{ padding: '12px 16px' }}><span className="num" style={{ color: 'var(--text-2)' }}>{b.orders}</span></td>
                <td style={{ padding: '12px 16px' }}><span className="num" style={{ color: 'var(--text-2)' }}>{Math.round(b.rev / b.orders)} ج</span></td>
                <td style={{ padding: '12px 16px' }}><span style={{ color: 'var(--yellow)', fontWeight: 700 }}>★ {b.rating}</span></td>
                <td style={{ padding: '12px 16px' }}><span style={{ fontSize: 12, fontWeight: 700, color: b.growth >= 0 ? 'var(--green)' : 'var(--red)' }}>{b.growth >= 0 ? '▲' : '▼'} {Math.abs(b.growth)}%</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ─── TAB: MARKETING ───────────────────────────────────────── */
function MarketingTab() {
  const loyaltyVsNot = [
    { m: 'يناير',  loyal: 198, regular: 82 },
    { m: 'فبراير', loyal: 210, regular: 85 },
    { m: 'مارس',   loyal: 225, regular: 80 },
    { m: 'أبريل',  loyal: 240, regular: 88 },
    { m: 'مايو',   loyal: 255, regular: 84 },
  ]
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        <KpiCard label="عائد التسويق"    value="8,400"  unit="ج" change={+18} icon={DollarSquare} color="var(--yellow)" bg="var(--yellow-muted)" />
        <KpiCard label="ROI الكوبونات"   value="186"    unit="%" change={+12} icon={Tag}          color="var(--green)"  bg="var(--green-muted)" sub="لكل 1ج يُصرف" />
        <KpiCard label="أعضاء الولاء"    value="234"           change={+15} icon={Star1}         color="var(--accent)" bg="var(--accent-muted)" />
        <KpiCard label="معدل تحويل الولاء" value="68"   unit="%" change={+3}  icon={TrendUp}      color="var(--blue)"   bg="var(--blue-muted)" sub="عملاء يستردون نقاط" />
      </div>

      {/* Loyalty vs non-loyalty spend */}
      <div className="glass" style={{ padding: 20 }}>
        <SectionTitle sub="متوسط إنفاق الطلب">أعضاء الولاء ينفقون أكثر بـ 2.4x</SectionTitle>
        <ResponsiveContainer width="100%" height={180}>
          <ComposedChart data={loyaltyVsNot} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="m" tick={{ fontSize: 11, fontFamily: 'Zain', fill: 'var(--text-3)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: 'var(--text-3)', fontFamily: 'Inter' }} axisLine={false} tickLine={false} width={40} />
            <Tooltip content={<Tip />} />
            <Line type="monotone" dataKey="loyal"   stroke={C.accent} strokeWidth={2.5} dot={{ r: 3, fill: C.accent, stroke: 'var(--bg)', strokeWidth: 2 }} name="أعضاء الولاء" />
            <Line type="monotone" dataKey="regular" stroke="var(--border-strong)" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="عملاء عاديون" />
          </ComposedChart>
        </ResponsiveContainer>
        <div style={{ display: 'flex', gap: 20, marginTop: 8, fontSize: 11 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-2)' }}><span style={{ width: 16, height: 3, background: C.accent, display: 'inline-block', borderRadius: 2 }} />أعضاء الولاء</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-3)' }}><span style={{ width: 16, height: 2, background: 'var(--border-strong)', display: 'inline-block', borderStyle: 'dashed' }} />عملاء عاديون</span>
        </div>
      </div>

      {/* Coupon performance */}
      <div className="glass" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 13 }}>أداء الكوبونات</p>
        </div>
        <table className="table-base">
          <thead>
            <tr>{['الكوبون', 'الاستخدامات', 'الإيراد الناتج', 'معدل التحويل', 'ROI'].map((h, i) => <th key={i}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {couponPerf.map(c => (
              <tr key={c.code}>
                <td style={{ padding: '10px 16px' }}><span style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: 13, color: 'var(--accent)', letterSpacing: '0.06em' }}>{c.code}</span></td>
                <td style={{ padding: '10px 16px' }}><span className="num" style={{ color: 'var(--text-2)' }}>{c.uses}</span></td>
                <td style={{ padding: '10px 16px' }}><span className="num" style={{ fontWeight: 700, color: 'var(--accent)' }}>{c.rev.toLocaleString()} ج</span></td>
                <td style={{ padding: '10px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 60, height: 4, background: 'var(--surface-3)', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ width: `${c.convRate}%`, height: '100%', background: C.green, borderRadius: 4 }} />
                    </div>
                    <span className="num" style={{ fontSize: 11, color: 'var(--text-2)' }}>{c.convRate}%</span>
                  </div>
                </td>
                <td style={{ padding: '10px 16px' }}><span className="num" style={{ fontWeight: 700, color: 'var(--green)' }}>{c.roi}%</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ─── TAB: AI INSIGHTS ─────────────────────────────────────── */
function AiTab({ onTabChange }) {
  const [dismissed, setDismissed] = useState([])
  const visible = AI_INSIGHTS.filter((_, i) => !dismissed.includes(i))
  const cols = { red: 'var(--red)', yellow: 'var(--yellow)', green: 'var(--green)' }
  const bgs  = { red: 'var(--red-muted)', yellow: 'var(--yellow-muted)', green: 'var(--green-muted)' }
  const priority = { red: 'عاجل', yellow: 'فرصة', green: 'نجاح' }

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ padding: '14px 18px', background: 'var(--surface-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 22 }}>🤖</span>
        <div>
          <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 13 }}>محرك الذكاء الاصطناعي — رؤى قابلة للتنفيذ</p>
          <p style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>{visible.length} رؤية نشطة تحتاج انتباهك • مُحدَّثة للتو</p>
        </div>
      </div>

      {visible.length === 0 && (
        <div className="glass" style={{ padding: 40, textAlign: 'center' }}>
          <p style={{ fontSize: 32, marginBottom: 12 }}>🎉</p>
          <p style={{ fontWeight: 700, color: 'var(--text)' }}>رائع! لا توجد رؤى عاجلة حالياً</p>
          <p style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 6 }}>سيتم إشعارك عند ظهور رؤى جديدة تستحق الانتباه</p>
        </div>
      )}

      {visible.map((ins, vi) => {
        const origIdx = AI_INSIGHTS.indexOf(ins)
        const col = cols[ins.level]
        const bg  = bgs[ins.level]
        return (
          <div key={origIdx} className="glass" style={{ padding: 20, borderRight: `4px solid ${col}` }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>{ins.icon}</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: col, background: bg, padding: '2px 8px', borderRadius: 6 }}>{priority[ins.level]}</span>
                    <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 13 }}>{ins.title}</p>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>{ins.body}</p>
                </div>
              </div>
              <button onClick={() => setDismissed(d => [...d, origIdx])} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-3)', fontSize: 18, padding: '0 4px', flexShrink: 0 }}>×</button>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
              <button onClick={() => onTabChange(ins.tab)} style={{ fontSize: 12, fontWeight: 700, color: col, background: bg, border: `1px solid ${col}44`, borderRadius: 8, padding: '5px 14px', cursor: 'pointer' }}>
                {ins.action} ←
              </button>
              <button onClick={() => setDismissed(d => [...d, origIdx])} style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-3)', background: 'transparent', border: '1px solid var(--border)', borderRadius: 8, padding: '5px 14px', cursor: 'pointer' }}>
                تجاهل
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ─── MAIN ─────────────────────────────────────────────────── */
export default function Reports() {
  const [period, setPeriod]     = useState('7 أيام')
  const [activeTab, setActiveTab] = useState(0)
  const { toast, show } = useToast()

  const handleExport = (type) => show(`تم تصدير التقرير بصيغة ${type} بنجاح ✓`)

  return (
    <Layout title="التقارير والتحليلات">
      {/* Period + Export */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 6, padding: 4, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', width: 'fit-content' }}>
          {PERIODS.map(p => {
            const active = period === p
            return (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                style={{ padding: '5px 14px', borderRadius: 'var(--radius-md)', fontSize: 12, fontWeight: 600, cursor: 'pointer', border: 'none', transition: 'all 0.15s', background: active ? 'var(--accent)' : 'transparent', color: active ? 'white' : 'var(--text-2)', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--surface-3)' }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
              >
                {p}
              </button>
            )
          })}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => handleExport('PDF')} className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 6, height: 36, fontSize: 12 }}>
            <Document size={13} /> تصدير PDF
          </button>
          <button onClick={() => handleExport('Excel')} className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 6, height: 36, fontSize: 12 }}>
            <Import size={13} /> تصدير Excel
          </button>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 4, padding: 4, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', marginBottom: 20, overflowX: 'auto', width: 'fit-content' }}>
        {TABS.map(({ label, icon: Icon }, i) => {
          const active = activeTab === i
          return (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, height: 34, padding: '0 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', border: 'none', borderRadius: 'var(--radius-md)', background: active ? 'var(--accent)' : 'transparent', color: active ? 'white' : 'var(--text-2)', transition: 'all 150ms var(--ease-default)', whiteSpace: 'nowrap', flexShrink: 0 }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--surface-3)' }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
            >
              <Icon size={13} />
              {label}
            </button>
          )
        })}
      </div>

      {activeTab === 0 && <ExecutiveTab period={period} />}
      {activeTab === 1 && <SalesTab period={period} />}
      {activeTab === 2 && <OrdersTab />}
      {activeTab === 3 && <CustomersTab />}
      {activeTab === 4 && <ProductsTab />}
      {activeTab === 5 && <BranchesTab />}
      {activeTab === 6 && <MarketingTab />}
      {activeTab === 7 && <AiTab onTabChange={setActiveTab} />}

      {toast && (
        <div style={{ position: 'fixed', bottom: 24, left: 24, zIndex: 50, background: 'var(--green)', color: 'white', padding: '10px 18px', borderRadius: 12, fontWeight: 600, fontSize: 13, boxShadow: '0 8px 24px rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Check size={14} /> {toast}
        </div>
      )}
    </Layout>
  )
}
