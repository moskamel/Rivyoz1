import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const POINTS = 2450
const NEXT_REWARD = 2900
const PROGRESS = Math.round((POINTS / NEXT_REWARD) * 100)

const REWARDS = [
  { id: 1, icon: '🎁', title: 'خصم 10% على طلبك القادم', points: 500 },
  { id: 2, icon: '🍔', title: 'وجبة مجانية', points: 1500 },
  { id: 3, icon: '🚀', title: 'توصيل مجاني لشهر', points: 2000 },
]

const HISTORY = [
  { id: 1, delta: +120, label: 'طلب #1042', time: 'منذ 2 أيام' },
  { id: 2, delta: +80, label: 'طلب #1038', time: 'منذ 5 أيام' },
  { id: 3, delta: -500, label: 'استبدال خصم 10%', time: 'منذ أسبوع' },
  { id: 4, delta: +200, label: 'عيد ميلاد 🎂', time: 'منذ أسبوعين' },
  { id: 5, delta: +95, label: 'طلب #1021', time: 'منذ 3 أسابيع' },
]

export default function Loyalty() {
  const navigate = useNavigate()
  const [confirmReward, setConfirmReward] = useState(null)
  const [redeemedIds, setRedeemedIds] = useState([])

  const handleRedeem = (reward) => {
    setRedeemedIds(prev => [...prev, reward.id])
    setConfirmReward(null)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', fontFamily: 'Cairo, sans-serif', direction: 'rtl' }}>

      {/* ── HEADER ── */}
      <div style={{
        background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        position: 'sticky',
        top: 0,
        zIndex: 10,
        boxShadow: '0 2px 12px rgba(249,115,22,0.35)',
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            width: 38, height: 38, borderRadius: 12,
            background: 'rgba(255,255,255,0.2)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <ArrowRight size={20} color="white" />
        </button>
        <h1 style={{ fontWeight: 800, color: 'white', fontSize: 18, flex: 1, margin: 0 }}>
          نقاط المكافآت
        </h1>
      </div>

      <div style={{ maxWidth: 480, margin: '0 auto', padding: '16px 14px 40px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* ── POINTS HERO CARD ── */}
        <div style={{
          background: 'white', borderRadius: 20,
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          padding: '28px 20px 24px',
          textAlign: 'center',
        }}>
          {/* Big points circle */}
          <div style={{
            width: 110, height: 110, borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFF7ED, #FFEDD5)',
            border: '3px solid #FED7AA',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <span style={{ fontSize: 24 }}>★</span>
            <span style={{ fontSize: 26, fontWeight: 900, color: '#EA580C', lineHeight: 1.1, fontFamily: 'Inter, sans-serif' }}>
              2,450
            </span>
            <span style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 600 }}>نقطة</span>
          </div>

          {/* Level badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: '#FFF7ED', border: '1.5px solid #FED7AA',
            borderRadius: 20, padding: '5px 14px',
            fontSize: 13, fontWeight: 700, color: '#EA580C',
            marginBottom: 20,
          }}>
            عضو ذهبي 🥇
          </div>

          {/* Progress toward next reward */}
          <div style={{ marginTop: 4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: '#6B7280', fontWeight: 600 }}>450 نقطة حتى مكافأتك التالية</span>
              <span style={{ fontSize: 12, color: '#F97316', fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>{PROGRESS}%</span>
            </div>
            <div style={{ height: 10, background: '#F3F4F6', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: `${PROGRESS}%`,
                background: 'linear-gradient(90deg, #F97316, #EA580C)',
                borderRadius: 99,
                transition: 'width 0.8s ease',
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
              <span style={{ fontSize: 11, color: '#9CA3AF', fontFamily: 'Inter, sans-serif' }}>2,450</span>
              <span style={{ fontSize: 11, color: '#9CA3AF', fontFamily: 'Inter, sans-serif' }}>2,900</span>
            </div>
          </div>
        </div>

        {/* ── STATS ROW ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {[
            { label: 'إجمالي الطلبات', value: '12 طلب' },
            { label: 'نقاط مكتسبة', value: '2,450 نقطة' },
            { label: 'نقاط مستبدلة', value: '500 نقطة' },
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'white', borderRadius: 14,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              padding: '14px 10px',
              textAlign: 'center',
            }}>
              <p style={{ fontSize: 13, fontWeight: 800, color: '#1a1a1a', marginBottom: 4, lineHeight: 1.3 }}>{stat.value}</p>
              <p style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 600, lineHeight: 1.3 }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* ── AVAILABLE REWARDS ── */}
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 800, color: '#1a1a1a', marginBottom: 10, paddingRight: 2 }}>
            المكافآت المتاحة
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {REWARDS.map(reward => (
              <div key={reward.id} style={{
                background: 'white', borderRadius: 16,
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                padding: '14px 14px',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: '#FFF7ED',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, flexShrink: 0,
                }}>
                  {reward.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 700, color: '#1a1a1a', fontSize: 13, marginBottom: 3 }}>{reward.title}</p>
                  <p style={{ fontSize: 12, color: '#F97316', fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>
                    {reward.points.toLocaleString()} نقطة
                  </p>
                </div>
                <button
                  onClick={() => !redeemedIds.includes(reward.id) && setConfirmReward(reward)}
                  style={{
                    padding: '9px 16px', borderRadius: 12,
                    background: redeemedIds.includes(reward.id) ? '#F3F4F6' : '#F97316',
                    color: redeemedIds.includes(reward.id) ? '#9CA3AF' : 'white',
                    fontWeight: 700, fontSize: 12, border: 'none',
                    cursor: redeemedIds.includes(reward.id) ? 'default' : 'pointer',
                    fontFamily: 'Cairo, sans-serif',
                    flexShrink: 0,
                    transition: 'all 0.2s',
                  }}
                >
                  {redeemedIds.includes(reward.id) ? 'تم الاستبدال' : 'استبدل'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── HOW TO EARN ── */}
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 800, color: '#1a1a1a', marginBottom: 10, paddingRight: 2 }}>
            كيف تكسب النقاط
          </h2>
          <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
            {[
              { icon: '🛵', text: 'كل 10 جنيه = نقطة واحدة' },
              { icon: '⭐', text: 'اترك تقييم = 50 نقطة إضافية' },
              { icon: '🎂', text: 'عيد ميلادك = 200 نقطة هدية' },
            ].map((item, i, arr) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 14px',
                borderBottom: i < arr.length - 1 ? '1px solid #F9FAFB' : 'none',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: '#FFF7ED',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, flexShrink: 0,
                }}>
                  {item.icon}
                </div>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', flex: 1 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── TRANSACTION HISTORY ── */}
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 800, color: '#1a1a1a', marginBottom: 10, paddingRight: 2 }}>
            سجل النقاط
          </h2>
          <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
            {HISTORY.map((tx, i) => (
              <div key={tx.id} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '13px 14px',
                borderBottom: i < HISTORY.length - 1 ? '1px solid #F9FAFB' : 'none',
              }}>
                {/* Delta badge */}
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: tx.delta > 0 ? '#F0FDF4' : '#FEF2F2',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ fontSize: 18 }}>{tx.delta > 0 ? '💚' : '🔴'}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', marginBottom: 2 }}>{tx.label}</p>
                  <p style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 500 }}>{tx.time}</p>
                </div>
                <span style={{
                  fontSize: 14, fontWeight: 800,
                  color: tx.delta > 0 ? '#16A34A' : '#DC2626',
                  fontFamily: 'Inter, sans-serif',
                }}>
                  {tx.delta > 0 ? '+' : ''}{tx.delta}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── REDEEM CONFIRMATION BOTTOM SHEET ── */}
      {confirmReward && (
        <div
          onClick={() => setConfirmReward(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'white', borderRadius: '24px 24px 0 0',
              padding: '28px 20px 40px',
              width: '100%', maxWidth: 480,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 52, marginBottom: 14 }}>{confirmReward.icon}</div>
            <p style={{ fontWeight: 800, color: '#1a1a1a', fontSize: 18, marginBottom: 8 }}>
              استبدال المكافأة
            </p>
            <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 6 }}>{confirmReward.title}</p>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: '#FFF7ED', border: '1.5px solid #FED7AA',
              borderRadius: 20, padding: '5px 16px',
              fontSize: 13, fontWeight: 700, color: '#EA580C',
              marginBottom: 24,
            }}>
              ★ {confirmReward.points.toLocaleString()} نقطة
            </div>
            <p style={{ color: '#9CA3AF', fontSize: 13, marginBottom: 24 }}>
              هل أنت متأكد أنك تريد استبدال هذه المكافأة؟
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => setConfirmReward(null)}
                style={{
                  flex: 1, padding: '14px', borderRadius: 14,
                  border: '1.5px solid #E5E7EB',
                  fontSize: 14, fontWeight: 700, color: '#6B7280',
                  background: 'white', cursor: 'pointer',
                  fontFamily: 'Cairo, sans-serif',
                }}
              >
                إلغاء
              </button>
              <button
                onClick={() => handleRedeem(confirmReward)}
                style={{
                  flex: 1, padding: '14px', borderRadius: 14,
                  border: 'none',
                  fontSize: 14, fontWeight: 700, color: 'white',
                  background: '#F97316', cursor: 'pointer',
                  fontFamily: 'Cairo, sans-serif',
                  boxShadow: '0 4px 14px rgba(249,115,22,0.4)',
                }}
              >
                تأكيد الاستبدال
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
