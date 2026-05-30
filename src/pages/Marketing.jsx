import { useState } from 'react'
import { Add, Copy, Tag, People, TrendUp, Flash, Message, Gift, Check, Trash, Star1 } from 'iconsax-react'
import ConfirmDialog from '../components/ConfirmDialog'
import Layout from '../components/layout/Layout'
import { getCoupons, setCoupons } from '../lib/restaurantStore'

function Toast({ message }) {
  return (
    <div style={{ position: 'fixed', bottom: 24, left: 24, zIndex: 50, background: 'var(--green)', color: 'white', padding: '10px 18px', borderRadius: 12, fontWeight: 600, fontSize: 13, boxShadow: '0 8px 24px rgba(34,197,94,0.3)' }}>
      {message}
    </div>
  )
}

function useToast() {
  const [toast, setToast] = useState(null)
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500) }
  return { toast, showToast }
}

const tabs = [
  { label: 'برنامج الولاء',  icon: Gift    },
  { label: 'حملات واتساب',  icon: Message },
  { label: 'الكوبونات',      icon: Tag     },
  { label: 'الأتمتة',        icon: Flash   },
]

const inputStyle = {
  width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)',
  border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text)',
  fontSize: 13, outline: 'none', fontFamily: 'Zain, sans-serif', boxSizing: 'border-box',
  transition: 'border-color var(--dur-normal) ease, box-shadow var(--dur-normal) ease',
}

function Toggle({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      style={{ position: 'relative', width: 44, height: 24, borderRadius: 12, background: value ? 'var(--green)' : 'var(--surface-3)', border: 'none', cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0 }}
    >
      <span style={{ position: 'absolute', top: 4, width: 16, height: 16, background: 'white', borderRadius: '50%', transition: 'all 0.2s', right: value ? 4 : 'auto', left: value ? 'auto' : 4 }} />
    </button>
  )
}

const INSIGHTS = [
  { level: 'red',    emoji: '🔴', text: '45 عميل لم يطلبوا منذ 14+ يوم — فرصة استرجاع فورية',       cta: 'إرسال حملة',    tab: 1 },
  { level: 'yellow', emoji: '🟡', text: '8 عملاء على بُعد 200 نقطة من الوصول لمستوى "خبير"',         cta: 'أرسل تذكير',    tab: 1 },
  { level: 'green',  emoji: '🟢', text: 'الكوبون SAVE20 وصل 80% من الحد الأقصى — جدد أو أوقف',      cta: 'إدارة الكوبون', tab: 2 },
]

const SEGMENTS = [
  { key: 'vip',      label: 'VIP',      count: 28,  color: '#A78BFA', bg: 'rgba(167,139,250,0.12)' },
  { key: 'new',      label: 'جدد',      count: 45,  color: 'var(--green)', bg: 'var(--green-muted)' },
  { key: 'loyal',    label: 'أوفياء',   count: 89,  color: 'var(--accent)', bg: 'var(--accent-muted)' },
  { key: 'atrisk',   label: 'في خطر',   count: 23,  color: 'var(--yellow)', bg: 'var(--yellow-muted)' },
  { key: 'inactive', label: 'نائمون',   count: 45,  color: 'var(--text-3)', bg: 'var(--surface-3)' },
  { key: 'churned',  label: 'مفقودون',  count: 14,  color: 'var(--red)',  bg: 'var(--red-muted)' },
]

function InsightsStrip({ onTabChange }) {
  const [dismissed, setDismissed] = useState([])
  const visible = INSIGHTS.filter((_, i) => !dismissed.includes(i))
  if (!visible.length) return null

  const colors = { red: 'var(--red)', yellow: 'var(--yellow)', green: 'var(--green)' }
  const bgs    = { red: 'var(--red-muted)', yellow: 'var(--yellow-muted)', green: 'var(--green-muted)' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
      {visible.map(ins => {
        const idx = INSIGHTS.indexOf(ins)
        const col = colors[ins.level]
        return (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', borderRadius: 'var(--radius-lg)', background: bgs[ins.level], border: `1px solid ${col}44` }}>
            <span style={{ fontSize: 15, flexShrink: 0 }}>{ins.emoji}</span>
            <p style={{ flex: 1, fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{ins.text}</p>
            <button onClick={() => onTabChange(ins.tab)} style={{ fontSize: 12, fontWeight: 700, color: col, background: 'none', border: `1px solid ${col}55`, borderRadius: 8, padding: '4px 12px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              {ins.cta}
            </button>
            <button onClick={() => setDismissed(d => [...d, idx])} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-3)', fontSize: 18, lineHeight: 1, padding: '0 2px' }}>×</button>
          </div>
        )
      })}
    </div>
  )
}

function SegmentsBar({ active, onSelect }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
      <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>شريحة العملاء:</span>
      {SEGMENTS.map(s => {
        const on = active === s.key
        return (
          <button
            key={s.key}
            onClick={() => onSelect(on ? null : s.key)}
            style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 12px', borderRadius: 20, border: `1.5px solid ${on ? s.color : 'var(--border)'}`, background: on ? s.bg : 'transparent', cursor: 'pointer', transition: 'all 0.15s' }}
          >
            <span style={{ fontSize: 12, fontWeight: 700, color: on ? s.color : 'var(--text-2)' }}>{s.label}</span>
            <span style={{ fontSize: 10, fontWeight: 800, color: on ? s.color : 'var(--text-3)', background: 'var(--surface-2)', padding: '1px 5px', borderRadius: 8 }}>{s.count}</span>
          </button>
        )
      })}
    </div>
  )
}

/* ──── LOYALTY TAB ──── */
function LoyaltyTab() {
  const [enabled, setEnabled] = useState(true)
  const [spendPer, setSpendPer]     = useState(10)
  const [pointsPer, setPointsPer]   = useState(1)
  const [redeemAt, setRedeemAt]     = useState(100)
  const [discountVal, setDiscountVal] = useState(10)
  const [expiryDays, setExpiryDays] = useState(365)
  const [multipliers, setMultipliers] = useState({ weekends: 2, firstOrder: 3, birthday: 5 })
  const { toast, showToast } = useToast()

  const tiers = [
    { name: 'مبتدئ', color: '#9CA3AF', min: 0,    max: 500,  icon: '🥉', members: 89, perk: 'الوصول للبرنامج' },
    { name: 'موثوق', color: '#60A5FA', min: 500,  max: 1500, icon: '🥈', members: 67, perk: 'شحن مجاني فوق 150ج' },
    { name: 'مساهم', color: '#F97316', min: 1500, max: 3000, icon: '🥇', members: 45, perk: 'خصم 10% تلقائي على كل طلب' },
    { name: 'خبير',  color: '#A78BFA', min: 3000, max: null, icon: '💎', members: 28, perk: 'أولوية التوصيل + هدية شهرية' },
  ]
  const totalMembers = tiers.reduce((s, t) => s + t.members, 0)

  const achievements = [
    { icon: '🎯', label: '5 طلبات متتالية', earned: 45 },
    { icon: '🔥', label: 'سلسلة 7 أيام',    earned: 12 },
    { icon: '⭐', label: 'أول تقييم 5 نجوم', earned: 89 },
    { icon: '💫', label: 'ترقية المستوى',    earned: 34 },
  ]

  const focus = e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-muted)' }
  const blur  = e => { e.target.style.borderColor = 'var(--border)';  e.target.style.boxShadow = 'none' }

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      {/* Left */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="glass-accent" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 28 }}>🎁</span>
              <div>
                <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>برنامج النقاط</p>
                <p style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 3 }}>اكسب ولاء زبائنك بنظام مكافآت</p>
              </div>
            </div>
            <Toggle value={enabled} onChange={setEnabled} />
          </div>

          {enabled && (
            <div style={{ paddingTop: 16, borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Earning formula */}
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 8 }}>معادلة الكسب الأساسية</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 13, color: 'var(--text-2)' }}>كل</span>
                  <input type="number" value={spendPer} onChange={e => setSpendPer(e.target.value)} style={{ ...inputStyle, width: 60, textAlign: 'center' }} onFocus={focus} onBlur={blur} />
                  <span style={{ fontSize: 13, color: 'var(--text-2)' }}>ج =</span>
                  <input type="number" value={pointsPer} onChange={e => setPointsPer(e.target.value)} style={{ ...inputStyle, width: 60, textAlign: 'center' }} onFocus={focus} onBlur={blur} />
                  <span style={{ fontSize: 13, color: 'var(--text-2)' }}>نقطة</span>
                </div>
              </div>

              {/* Multipliers */}
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 8 }}>مضاعفات النقاط</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { key: 'weekends',   label: 'نهاية الأسبوع' },
                    { key: 'firstOrder', label: 'أول طلب للعميل' },
                    { key: 'birthday',   label: 'عيد ميلاد العميل' },
                  ].map(m => (
                    <div key={m.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 12, color: 'var(--text-2)' }}>{m.label}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <input type="number" min={1} max={10} value={multipliers[m.key]}
                          onChange={e => setMultipliers(p => ({ ...p, [m.key]: +e.target.value }))}
                          style={{ ...inputStyle, width: 52, textAlign: 'center' }} onFocus={focus} onBlur={blur} />
                        <span style={{ fontSize: 11, color: 'var(--text-3)' }}>×</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Redemption */}
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 8 }}>معادلة الاسترداد</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <input type="number" value={redeemAt} onChange={e => setRedeemAt(e.target.value)} style={{ ...inputStyle, width: 72, textAlign: 'center' }} onFocus={focus} onBlur={blur} />
                  <span style={{ fontSize: 13, color: 'var(--text-2)' }}>نقطة = خصم</span>
                  <input type="number" value={discountVal} onChange={e => setDiscountVal(e.target.value)} style={{ ...inputStyle, width: 60, textAlign: 'center' }} onFocus={focus} onBlur={blur} />
                  <span style={{ fontSize: 13, color: 'var(--text-2)' }}>ج</span>
                </div>
              </div>

              {/* Expiry */}
              <div>
                <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 8 }}>صلاحية النقاط</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input type="number" value={expiryDays} onChange={e => setExpiryDays(e.target.value)} style={{ ...inputStyle, width: 72, textAlign: 'center' }} onFocus={focus} onBlur={blur} />
                  <span style={{ fontSize: 13, color: 'var(--text-2)' }}>يوم من تاريخ الكسب</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Achievements */}
        {enabled && (
          <div className="glass" style={{ padding: 20 }}>
            <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14, marginBottom: 14 }}>إنجازات الزبائن</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {achievements.map(a => (
                <div key={a.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 10, background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 20 }}>{a.icon}</span>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)', lineHeight: 1.3 }}>{a.label}</p>
                    <p style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 3 }}>{a.earned} زبون</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button onClick={() => showToast('تم حفظ إعدادات الولاء ✓')} className="btn-primary">حفظ الإعدادات</button>
        {toast && <Toast message={toast} />}
      </div>

      {/* Right */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Tier breakdown */}
        <div className="glass" style={{ padding: 20 }}>
          <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14, marginBottom: 16 }}>مستويات الولاء</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {tiers.map(t => {
              const pct = Math.round((t.members / totalMembers) * 100)
              return (
                <div key={t.name}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: 16 }}>{t.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{t.name}</span>
                          <span style={{ fontSize: 10, color: t.color, fontWeight: 600 }}>
                            {t.min.toLocaleString()}{t.max ? `–${t.max.toLocaleString()}` : '+'} نقطة
                          </span>
                        </div>
                        <span className="num" style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-2)' }}>{t.members} عضو</span>
                      </div>
                      <div style={{ height: 4, background: 'var(--surface-3)', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ width: `${pct}%`, height: '100%', background: t.color, borderRadius: 4, transition: 'width 0.6s ease' }} />
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: 11, color: 'var(--text-3)', marginRight: 26 }}>{t.perk}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Monthly stats */}
        <div className="glass" style={{ padding: 20 }}>
          <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14, marginBottom: 14 }}>إحصائيات هذا الشهر</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { label: 'أعضاء البرنامج',   value: '234',  icon: People,  color: 'var(--accent)', trend: '+12' },
              { label: 'نقاط محصودة',       value: '12,400', icon: Flash, color: 'var(--yellow)', trend: '+8%' },
              { label: 'خصومات مستخدمة',   value: '89',   icon: Tag,     color: 'var(--green)',  trend: '+5' },
              { label: 'طلب/عضو/شهر',       value: '3.2',  icon: TrendUp, color: 'var(--blue)',   trend: '+0.3' },
            ].map(s => {
              const Icon = s.icon
              return (
                <div key={s.label} style={{ background: 'var(--surface-2)', borderRadius: 12, padding: 14, border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <Icon size={15} style={{ color: s.color }} />
                    <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--green)' }}>▲ {s.trend}</span>
                  </div>
                  <p className="num" style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', lineHeight: 1 }}>{s.value}</p>
                  <p style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 4 }}>{s.label}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top redeemers */}
        <div className="glass" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
            <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>أعلى مستخدمي النقاط</p>
          </div>
          {[
            { name: 'أحمد محمد السيد',      pts: 2840, tier: 'خبير',  color: '#A78BFA', clv: '1,240ج' },
            { name: 'خالد محمود عبد الله',  pts: 1920, tier: 'مساهم', color: '#F97316', clv: '890ج'   },
            { name: 'فاطمة حسن إبراهيم',   pts: 1240, tier: 'موثوق', color: '#60A5FA', clv: '560ج'   },
            { name: 'منى عبد الرحمن',       pts: 680,  tier: 'موثوق', color: '#60A5FA', clv: '340ج'   },
          ].map((u, i) => (
            <div key={u.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 20px', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
              <span style={{ width: 24, height: 24, borderRadius: 7, background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'var(--text-2)', fontFamily: 'Zain, sans-serif', flexShrink: 0 }}>{i + 1}</span>
              <p style={{ flex: 1, fontSize: 13, fontWeight: 500, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.name}</p>
              <span style={{ fontSize: 10, color: 'var(--text-3)', flexShrink: 0 }}>CLV {u.clv}</span>
              <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 6, background: 'var(--surface-2)', color: u.color, fontWeight: 600, flexShrink: 0 }}>{u.tier}</span>
              <span className="num" style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-3)', flexShrink: 0 }}>{u.pts.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ──── WHATSAPP TAB ──── */
function WhatsappTab() {
  const [target, setTarget]   = useState('inactive')
  const [message, setMessage] = useState('عزيزي {الاسم}،\nاشتقنالك! 😊 عندنا عرض خاص ليك النهارده 🍖\nاطلب دلوقتي واحصل على خصم 15%')
  const [sent, setSent]       = useState(false)
  const [scheduled, setScheduled] = useState(false)
  const preview = message.replace('{الاسم}', 'أحمد').replace('{آخر_طلب}', 'برجر كلاسيك')

  const targets = [
    { key: 'all',      label: 'كل الزبائن',              count: 234, icon: '👥', desc: 'جميع العملاء النشطين' },
    { key: 'inactive', label: 'خاملون 14+ يوم',           count: 45,  icon: '😴', desc: 'لم يطلبوا منذ أكثر من 14 يوم' },
    { key: 'neartier', label: 'قريبون من الترقية',        count: 8,   icon: '⬆️', desc: 'على بُعد 200 نقطة من المستوى التالي' },
    { key: 'birthday', label: 'أعياد ميلاد هذا الشهر',   count: 11,  icon: '🎂', desc: 'يحتفلون بأعياد ميلادهم خلال 30 يوم' },
    { key: 'expiring', label: 'نقاط توشك على الانتهاء',   count: 19,  icon: '⏰', desc: 'نقاطهم تنتهي خلال 30 يوم' },
    { key: 'top',      label: 'الأكثر طلباً (5+ طلبات)',  count: 28,  icon: '⭐', desc: 'أفضل عملائك بأكثر من 5 طلبات' },
    { key: 'new',      label: 'زبائن جدد (آخر 7 أيام)',   count: 12,  icon: '🆕', desc: 'انضموا خلال الأسبوع الماضي' },
  ]

  const sel = targets.find(t => t.key === target)

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      {/* Left */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="glass" style={{ padding: 20 }}>
          <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14, marginBottom: 12 }}>اختر الجمهور</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {targets.map(t => (
              <button
                key={t.key}
                onClick={() => setTarget(t.key)}
                style={{
                  width: '100%', textAlign: 'right', padding: '8px 12px', borderRadius: 10, fontSize: 13, fontWeight: 500,
                  display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', transition: 'all 0.15s',
                  border: `1px solid ${target === t.key ? 'var(--accent)' : 'var(--border)'}`,
                  background: target === t.key ? 'var(--accent-muted)' : 'transparent',
                  color: target === t.key ? 'var(--accent)' : 'var(--text-2)',
                }}
              >
                <span style={{ fontSize: 13 }}>{t.icon}</span>
                <span style={{ flex: 1 }}>{t.label}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', background: 'var(--surface-2)', padding: '2px 7px', borderRadius: 6, flexShrink: 0 }}>{t.count}</span>
                {target === t.key && <Check size={12} style={{ flexShrink: 0 }} />}
              </button>
            ))}
          </div>
          {sel && (
            <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 10, padding: '8px 10px', background: 'var(--surface-2)', borderRadius: 8 }}>
              💡 {sel.desc}
            </p>
          )}
        </div>

        <div className="glass" style={{ padding: 20 }}>
          <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14, marginBottom: 14 }}>آخر حملة</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { label: 'رسائل أُرسلت', value: '1,240', trend: '+22%' },
              { label: 'نسبة الفتح',   value: '68%',   trend: '+4%'  },
              { label: 'طلبات ناتجة',  value: '89',    trend: '+11'  },
              { label: 'عائد الحملة',  value: '4,200ج', trend: '+18%' },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--surface-2)', borderRadius: 10, padding: '10px 12px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <p className="num" style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)' }}>{s.value}</p>
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--green)' }}>▲ {s.trend}</span>
                </div>
                <p style={{ fontSize: 11, color: 'var(--text-2)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="glass" style={{ padding: 20 }}>
          <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14, marginBottom: 10 }}>الرسالة</p>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={5}
            placeholder="اكتب رسالتك..."
            style={{ ...inputStyle, resize: 'none', marginBottom: 6, borderRadius: 'var(--radius-lg)', padding: 12, lineHeight: 1.6 }}
            onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-muted)' }}
            onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
          />
          <p style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 14 }}>المتغيرات: &#123;الاسم&#125; &#123;آخر_طلب&#125; &#123;النقاط&#125; &#123;المستوى&#125;</p>
          <div style={{ background: '#0B141A', borderRadius: 12, padding: 14 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#8696A0', marginBottom: 8 }}>معاينة واتساب</p>
            <div style={{ background: '#005C4B', borderRadius: '12px 12px 12px 0', padding: '8px 12px', display: 'inline-block', maxWidth: '90%' }}>
              <p style={{ fontSize: 13, color: '#E9EDEF', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>{preview}</p>
              <p style={{ fontSize: 10, color: '#8696A0', marginTop: 4, textAlign: 'left' }}>✓✓ الآن</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => { setScheduled(true); setTimeout(() => setScheduled(false), 3000) }}
            style={{ flex: 1, height: 40, background: scheduled ? 'var(--green)' : 'var(--surface-2)', color: scheduled ? 'white' : 'var(--text-2)', borderRadius: 'var(--radius-lg)', fontWeight: 600, fontSize: 13, border: '1px solid var(--border)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'all var(--dur-normal) var(--ease-default)' }}
          >
            {scheduled ? <Check size={14} /> : '🕐'}
            {scheduled ? 'تمت الجدولة ✓' : 'جدولة لوقت معين'}
          </button>
          <button
            onClick={() => { setSent(true); setTimeout(() => setSent(false), 3000) }}
            style={{ flex: 1, height: 40, background: sent ? 'var(--green)' : '#25D366', color: 'white', borderRadius: 'var(--radius-lg)', fontWeight: 600, fontSize: 13, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'all var(--dur-normal) var(--ease-default)' }}
          >
            {sent ? <Check size={14} /> : <Message size={14} />}
            {sent ? 'تم الإرسال ✓' : `إرسال الآن (${sel?.count ?? 0})`}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ──── COUPONS TAB ──── */
function CouponsTab() {
  const [coupons, setCouponsState] = useState(getCoupons)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ code: '', type: 'percent', value: '', maxUses: '', minOrder: '', expiry: '' })
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    setForm(f => ({ ...f, code: Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('') }))
  }

  const save = () => {
    if (!form.code || !form.value) return
    const updated = [...coupons, {
      id: Date.now(), code: form.code, type: form.type,
      value: +form.value,
      discount: form.type === 'percent' ? `${form.value}%` : `${form.value} ج`,
      used: 0, max: form.maxUses ? +form.maxUses : null,
      minOrder: form.minOrder ? +form.minOrder : null,
      expiry: form.expiry || null,
    }]
    setCouponsState(updated)
    setCoupons(updated)
    setShowForm(false)
    setForm({ code: '', type: 'percent', value: '', maxUses: '', minOrder: '', expiry: '' })
  }

  const remove = (id) => {
    const updated = coupons.filter(c => c.id !== id)
    setCouponsState(updated)
    setCoupons(updated)
  }

  const mockRevenue = [1200, 890, 450, 220, 0, 0, 0, 0]
  const totalRevenue = coupons.reduce((a, _, i) => a + (mockRevenue[i] || 0), 0)

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      {/* Left: list */}
      <div className="glass" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>الكوبونات ({coupons.length})</p>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary" style={{ height: 36, padding: '0 14px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Add size={14} /> كوبون جديد
          </button>
        </div>

        {coupons.map((c, i) => {
          const pct = c.max ? Math.round((c.used / c.max) * 100) : null
          const isExpired = c.expiry && new Date(c.expiry) < new Date()
          const rev = mockRevenue[i] || 0
          return (
            <div key={c.id}
              style={{ padding: '14px 20px', borderBottom: i < coupons.length - 1 ? '1px solid var(--border)' : 'none', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <button onClick={() => navigator.clipboard?.writeText(c.code)} style={{ fontFamily: 'Inter, monospace', fontWeight: 800, fontSize: 15, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: 4 }}>
                  {c.code} <Copy size={11} style={{ color: 'var(--text-3)' }} />
                </button>
                <span className="badge badge-green badge-pill badge-lg">{c.discount}</span>
                {isExpired && <span className="badge badge-red badge-pill badge-sm">منتهي</span>}
                <button onClick={() => setConfirmDeleteId(c.id)} style={{ marginRight: 'auto', background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
                  <Trash size={13} style={{ color: 'var(--text-3)' }} />
                </button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: c.max ? 8 : 0 }}>
                <span style={{ fontSize: 12, color: 'var(--text-3)' }}>
                  {c.used}{c.max ? `/${c.max}` : ''} استخدام
                  {c.expiry && ` · ينتهي ${c.expiry}`}
                  {c.minOrder && ` · حد أدنى ${c.minOrder}ج`}
                </span>
                {rev > 0 && (
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--green)', background: 'var(--green-muted)', padding: '2px 8px', borderRadius: 6 }}>
                    عائد {rev.toLocaleString()}ج
                  </span>
                )}
              </div>
              {c.max && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ flex: 1, height: 4, background: 'var(--surface-3)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: pct >= 80 ? 'var(--red)' : 'var(--accent)', borderRadius: 4 }} />
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: pct >= 80 ? 'var(--red)' : 'var(--text-3)', flexShrink: 0 }}>{pct}%</span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Right: stats / form */}
      <div className="glass" style={{ padding: 20 }}>
        <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14, marginBottom: 16 }}>
          {showForm ? 'إضافة كوبون جديد' : 'إحصائيات الكوبونات'}
        </p>

        {!showForm ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'كوبونات نشطة',       value: coupons.filter(c => !c.expiry || new Date(c.expiry) >= new Date()).length, unit: '', color: 'var(--green)',  sub: 'غير منتهية الصلاحية' },
              { label: 'إجمالي الاستخدامات', value: coupons.reduce((a, c) => a + (c.used || 0), 0),                           unit: '', color: 'var(--accent)', sub: 'استخدام إجمالي' },
              { label: 'إجمالي العائد',       value: totalRevenue.toLocaleString(),                                            unit: 'ج', color: 'var(--yellow)', sub: 'من الطلبات بالكوبون' },
              { label: 'خصومات ممنوحة',      value: '890',                                                                    unit: 'ج', color: 'var(--blue)',   sub: 'خصم ممنوح هذا الشهر' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: 10, background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                <div>
                  <p style={{ fontSize: 13, color: 'var(--text-2)' }}>{s.label}</p>
                  <p style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{s.sub}</p>
                </div>
                <p className="num" style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}{s.unit}</p>
              </div>
            ))}
            <button onClick={() => setShowForm(true)} className="btn-primary" style={{ marginTop: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Add size={14} /> إضافة كوبون
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 5 }}>كود الخصم</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <input type="text" value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value.toUpperCase() }))} placeholder="PROMO20"
                  style={{ ...inputStyle, flex: 1 }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
                <button onClick={generateCode} style={{ padding: '9px 12px', border: '1px solid var(--border)', borderRadius: 10, fontSize: 12, fontWeight: 600, background: 'transparent', color: 'var(--text-2)', cursor: 'pointer', whiteSpace: 'nowrap' }}>توليد</button>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 5 }}>قيمة الخصم</label>
              <div style={{ display: 'flex' }}>
                <input type="number" value={form.value} onChange={e => setForm(f => ({ ...f, value: e.target.value }))} placeholder="20"
                  style={{ ...inputStyle, flex: 1, borderRadius: '10px 0 0 10px' }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
                <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} style={{ padding: '9px 10px', border: '1px solid var(--border)', borderRight: 'none', borderRadius: '0 10px 10px 0', background: 'var(--surface-3)', color: 'var(--text-2)', fontSize: 12, outline: 'none' }}>
                  <option value="percent">%</option>
                  <option value="fixed">ج</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 5 }}>أقصى عدد استخدامات</label>
                <input type="number" value={form.maxUses} onChange={e => setForm(f => ({ ...f, maxUses: e.target.value }))} placeholder="50"
                  style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 5 }}>حد أدنى للطلب (ج)</label>
                <input type="number" value={form.minOrder} onChange={e => setForm(f => ({ ...f, minOrder: e.target.value }))} placeholder="100"
                  style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--accent)'} onBlur={e => e.target.style.borderColor = 'var(--border)'} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 5 }}>تاريخ الانتهاء</label>
              <input type="date" value={form.expiry} onChange={e => setForm(f => ({ ...f, expiry: e.target.value }))}
                style={{ ...inputStyle, colorScheme: 'dark' }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setShowForm(false)} className="btn-ghost" style={{ flex: 1 }}>إلغاء</button>
              <button onClick={save} disabled={!form.code || !form.value} className="btn-primary" style={{ flex: 1 }}>حفظ</button>
            </div>
          </div>
        )}
      </div>
    </div>
    <ConfirmDialog
      open={confirmDeleteId !== null}
      title="حذف الكوبون؟"
      message="سيتم حذف هذا الكوبون نهائياً."
      confirmLabel="احذف"
      onConfirm={() => { remove(confirmDeleteId); setConfirmDeleteId(null) }}
      onCancel={() => setConfirmDeleteId(null)}
    />
  )
}

/* ──── AUTOMATION TAB ──── */
const AUTOMATIONS = [
  { id: 'winback',   icon: '💔', title: 'استرجاع العملاء الخاملين',   desc: 'أرسل رسالة + كوبون 15% لمن لم يطلبوا منذ 14 يوم',          trigger: 'بعد 14 يوم من آخر طلب',     action: 'واتساب + كوبون',     impact: 'يستعيد ~18% من العملاء',   color: 'var(--red)'    },
  { id: 'birthday',  icon: '🎂', title: 'هدية عيد الميلاد',           desc: 'رسالة واتساب + 200 نقطة مجانية في يوم الميلاد',              trigger: 'يوم عيد الميلاد',            action: 'واتساب + 200 نقطة',  impact: 'يرفع CLV بنسبة 25%',      color: '#F97316'       },
  { id: 'tierup',    icon: '⬆️', title: 'تهنئة ترقية المستوى',        desc: 'أبلغ العميل عند وصوله لمستوى جديد مع شرح المميزات',          trigger: 'عند الوصول للمستوى الجديد', action: 'واتساب تهنئة',       impact: 'يقلل التراجع 40%',        color: '#A78BFA'       },
  { id: 'expiring',  icon: '⏰', title: 'تذكير انتهاء النقاط',        desc: 'تنبيه 7 أيام قبل انتهاء صلاحية نقاط العميل',                 trigger: 'قبل 7 أيام من الانتهاء',    action: 'واتساب تذكير',       impact: 'يزيد الاسترداد 35%',      color: 'var(--yellow)' },
  { id: 'referral',  icon: '🤝', title: 'برنامج إحالة الأصدقاء',      desc: '100 نقطة للمحيل و50 نقطة للصديق عند أول طلب',                trigger: 'عند تسجيل صديق جديد',       action: 'نقاط مضاعفة',        impact: 'يخفض تكلفة الاستحواذ 60%', color: 'var(--green)'  },
  { id: 'welcome',   icon: '👋', title: 'ترحيب بالعميل الجديد',       desc: 'سلسلة 3 رسائل خلال أول أسبوع تعرّف العميل بالمنصة',         trigger: 'عند التسجيل الأول',         action: '3 رسائل خلال 7 أيام', impact: 'يرفع أول طلب بنسبة 45%', color: 'var(--blue)'   },
]

function AutomationTab() {
  const [enabled, setEnabled] = useState({ winback: true, birthday: true, tierup: false, expiring: true, referral: false, welcome: true })
  const { toast, showToast } = useToast()
  const activeCount = Object.values(enabled).filter(Boolean).length

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', background: 'var(--surface-2)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 22 }}>⚡</span>
          <div>
            <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>أتمتة التسويق</p>
            <p style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2 }}>{activeCount} من {AUTOMATIONS.length} سير عمل نشطة</p>
          </div>
        </div>
        <button onClick={() => showToast('تم حفظ إعدادات الأتمتة ✓')} className="btn-primary" style={{ height: 36, padding: '0 18px', fontSize: 13 }}>حفظ التغييرات</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {AUTOMATIONS.map(a => {
          const on = enabled[a.id]
          return (
            <div key={a.id} className="glass" style={{ padding: 20, borderRight: `3px solid ${on ? a.color : 'var(--border)'}`, transition: 'opacity 0.2s', opacity: on ? 1 : 0.55 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 20 }}>{a.icon}</span>
                  <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 13, lineHeight: 1.3 }}>{a.title}</p>
                </div>
                <Toggle value={on} onChange={v => setEnabled(p => ({ ...p, [a.id]: v }))} />
              </div>
              <p style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 12, lineHeight: 1.6 }}>{a.desc}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span style={{ fontSize: 11, color: 'var(--text-3)', whiteSpace: 'nowrap' }}>🔔 الشرط:</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-2)' }}>{a.trigger}</span>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span style={{ fontSize: 11, color: 'var(--text-3)', whiteSpace: 'nowrap' }}>✉️ الإجراء:</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-2)' }}>{a.action}</span>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span style={{ fontSize: 11, color: 'var(--text-3)', whiteSpace: 'nowrap' }}>📈 الأثر:</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: a.color }}>{a.impact}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {toast && <Toast message={toast} />}
    </div>
  )
}

/* ──── MAIN ──── */
export default function Marketing() {
  const [activeTab, setActiveTab]       = useState(0)
  const [activeSegment, setActiveSegment] = useState(null)

  const kpis = [
    { label: 'عائد التسويق',  value: '8,400 ج', trend: '+12%', up: true,  color: 'var(--yellow)', bg: 'var(--yellow-muted)', icon: TrendUp, sub: 'مقارنة بالشهر الماضي' },
    { label: 'معدل الاحتفاظ', value: '68%',     trend: '+3%',  up: true,  color: 'var(--green)',  bg: 'var(--green-muted)',  icon: People,  sub: 'عملاء يعودون للطلب' },
    { label: 'متوسط CLV',      value: '240 ج',   trend: '-5%',  up: false, color: 'var(--blue)',   bg: 'var(--blue-muted)',   icon: Star1,   sub: 'قيمة العميل مدى الحياة' },
    { label: 'عملاء في خطر',  value: '45',      trend: '+8',   up: false, color: 'var(--red)',    bg: 'var(--red-muted)',    icon: Flash,   sub: 'لم يطلبوا منذ 14+ يوم' },
  ]

  return (
    <Layout title="التسويق">
      {/* KPI strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        {kpis.map(s => {
          const Icon = s.icon
          return (
            <div key={s.label} className="glass glass-interactive animate-fade-in" style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 'var(--radius-lg)', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={15} style={{ color: s.color }} />
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: s.up ? 'var(--green)' : 'var(--red)', background: s.up ? 'var(--green-muted)' : 'var(--red-muted)', padding: '3px 8px', borderRadius: 8 }}>
                  {s.up ? '▲' : '▼'} {s.trend}
                </span>
              </div>
              <p className="num" style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)', lineHeight: 1, letterSpacing: '-0.02em' }}>{s.value}</p>
              <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', marginTop: 5 }}>{s.label}</p>
              <p style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{s.sub}</p>
            </div>
          )
        })}
      </div>

      {/* Insight alerts */}
      <InsightsStrip onTabChange={setActiveTab} />

      {/* Customer segments */}
      <SegmentsBar active={activeSegment} onSelect={setActiveSegment} />

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, padding: 4, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', marginBottom: 20, width: 'fit-content' }}>
        {tabs.map(({ label, icon: Icon }, i) => {
          const active = activeTab === i
          return (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, height: 36, padding: '0 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none', borderRadius: 'var(--radius-md)', background: active ? 'var(--accent)' : 'transparent', color: active ? 'white' : 'var(--text-2)', transition: 'all 150ms var(--ease-default)' }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--surface-3)' }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
            >
              <Icon size={14} />
              {label}
            </button>
          )
        })}
      </div>

      {activeTab === 0 && <LoyaltyTab />}
      {activeTab === 1 && <WhatsappTab />}
      {activeTab === 2 && <CouponsTab />}
      {activeTab === 3 && <AutomationTab />}
    </Layout>
  )
}
