import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import {
  getCustomerProfile, getCustomerPoints, redeemPoints, getConfig,
} from '../lib/restaurantStore'
import CustomerNav from './CustomerNav'

const REWARDS = [
  { id: 1, icon: '🎁', title: 'خصم 10% على طلبك القادم', points: 500 },
  { id: 2, icon: '🍔', title: 'وجبة مجانية', points: 1500 },
  { id: 3, icon: '🚀', title: 'توصيل مجاني لشهر', points: 2000 },
]

export default function Loyalty() {
  const navigate = useNavigate()
  const config = getConfig()
  const color = config.color
  const [profile] = useState(getCustomerProfile)
  const [pts, setPts] = useState({ earned: 0, spent: 0, balance: 0, history: [] })
  const [confirmReward, setConfirmReward] = useState(null)
  const [redeemedIds, setRedeemedIds] = useState([])
  const [justRedeemed, setJustRedeemed] = useState(null)

  useEffect(() => {
    if (!profile) {
      navigate('/customer-login', { state: { from: '/loyalty' } })
      return
    }
    setPts(getCustomerPoints(profile.phone))
  }, [])

  if (!profile) return null

  const NEXT_MILESTONE = REWARDS.find(r => r.points > pts.balance)
  const PROGRESS = NEXT_MILESTONE
    ? Math.min(100, Math.round((pts.balance / NEXT_MILESTONE.points) * 100))
    : 100

  const handleRedeem = (reward) => {
    if (pts.balance < reward.points) return
    redeemPoints(reward.points)
    setRedeemedIds(prev => [...prev, reward.id])
    setConfirmReward(null)
    setJustRedeemed(reward)
    setPts(getCustomerPoints(profile.phone))
    setTimeout(() => setJustRedeemed(null), 3000)
  }

  const EARN_RULES = [
    { icon: '🛵', text: 'كل 10 جنيه = نقطة واحدة' },
    { icon: '⭐', text: 'اترك تقييم = 50 نقطة إضافية' },
    { icon: '🎂', text: 'عيد ميلادك = 200 نقطة هدية' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', fontFamily: 'Cairo, sans-serif', direction: 'rtl' }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`,
        padding: '14px 16px',
        display: 'flex', alignItems: 'center', gap: 10,
        position: 'sticky', top: 0, zIndex: 10,
        boxShadow: `0 2px 12px ${color}55`,
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
        >
          <ArrowRight size={20} color="white" />
        </button>
        <h1 style={{ fontWeight: 800, color: 'white', fontSize: 18, flex: 1, margin: 0 }}>
          نقاط المكافآت
        </h1>
      </div>

      {/* Just redeemed toast */}
      {justRedeemed && (
        <div style={{
          position: 'fixed', top: 70, left: '50%', transform: 'translateX(-50%)',
          zIndex: 200, background: '#22C55E', color: 'white',
          padding: '10px 20px', borderRadius: 14, fontWeight: 700, fontSize: 13,
          boxShadow: '0 8px 24px rgba(34,197,94,0.35)',
          display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: 'Cairo, sans-serif', whiteSpace: 'nowrap',
        }}>
          ✓ تم استبدال {justRedeemed.title}
        </div>
      )}

      <div style={{ maxWidth: 480, margin: '0 auto', padding: '16px 14px 88px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Points hero card */}
        <div style={{ background: 'white', borderRadius: 20, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', padding: '28px 20px 24px', textAlign: 'center' }}>
          <div style={{
            width: 110, height: 110, borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFF7ED, #FFEDD5)',
            border: '3px solid #FED7AA',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <span style={{ fontSize: 24 }}>★</span>
            <span style={{ fontSize: 26, fontWeight: 900, color: '#EA580C', lineHeight: 1.1, fontFamily: 'Inter, sans-serif' }}>
              {pts.balance.toLocaleString()}
            </span>
            <span style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 600 }}>نقطة</span>
          </div>

          {pts.balance === 0 ? (
            <p style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 16 }}>
              اطلب وجبتك الأولى لتبدأ في جمع النقاط!
            </p>
          ) : (
            <>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#FFF7ED', border: '1.5px solid #FED7AA', borderRadius: 20, padding: '5px 14px', fontSize: 13, fontWeight: 700, color: '#EA580C', marginBottom: 20 }}>
                عضو {pts.balance >= 3000 ? 'بلاتيني 💎' : pts.balance >= 1500 ? 'ذهبي 🥇' : pts.balance >= 500 ? 'فضي 🥈' : 'مبتدئ 🌟'}
              </div>
              {NEXT_MILESTONE && (
                <div style={{ marginTop: 4 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 12, color: '#6B7280', fontWeight: 600 }}>
                      {NEXT_MILESTONE.points - pts.balance} نقطة لمكافأتك التالية
                    </span>
                    <span style={{ fontSize: 12, color: color, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>{PROGRESS}%</span>
                  </div>
                  <div style={{ height: 10, background: '#F3F4F6', borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${PROGRESS}%`, background: `linear-gradient(90deg, ${color}, ${color}cc)`, borderRadius: 99, transition: 'width 0.8s ease' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                    <span style={{ fontSize: 11, color: '#9CA3AF', fontFamily: 'Inter, sans-serif' }}>{pts.balance.toLocaleString()}</span>
                    <span style={{ fontSize: 11, color: '#9CA3AF', fontFamily: 'Inter, sans-serif' }}>{NEXT_MILESTONE.points.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {[
            { label: 'مكتسبة', value: pts.earned.toLocaleString() },
            { label: 'متاحة', value: pts.balance.toLocaleString() },
            { label: 'مُستبدلة', value: pts.spent.toLocaleString() },
          ].map((stat, i) => (
            <div key={i} style={{ background: 'white', borderRadius: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '14px 10px', textAlign: 'center' }}>
              <p style={{ fontSize: 14, fontWeight: 800, color: '#1a1a1a', marginBottom: 4, fontFamily: 'Inter, sans-serif' }}>{stat.value}</p>
              <p style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 600 }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Available rewards */}
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 800, color: '#1a1a1a', marginBottom: 10, paddingRight: 2 }}>المكافآت المتاحة</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {REWARDS.map(reward => {
              const canAfford = pts.balance >= reward.points
              const redeemed = redeemedIds.includes(reward.id)
              return (
                <div key={reward.id} style={{
                  background: 'white', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  padding: '14px', display: 'flex', alignItems: 'center', gap: 12,
                  opacity: !canAfford && !redeemed ? 0.6 : 1,
                }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                    {reward.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 700, color: '#1a1a1a', fontSize: 13, marginBottom: 3 }}>{reward.title}</p>
                    <p style={{ fontSize: 12, color: color, fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>
                      {reward.points.toLocaleString()} نقطة
                    </p>
                  </div>
                  <button
                    onClick={() => !redeemed && canAfford && setConfirmReward(reward)}
                    style={{
                      padding: '9px 16px', borderRadius: 12, flexShrink: 0,
                      background: redeemed ? '#F0FDF4' : canAfford ? color : '#F3F4F6',
                      color: redeemed ? '#16A34A' : canAfford ? 'white' : '#9CA3AF',
                      fontWeight: 700, fontSize: 12, border: 'none',
                      cursor: redeemed || !canAfford ? 'default' : 'pointer',
                      fontFamily: 'Cairo, sans-serif', transition: 'all 0.2s',
                    }}
                  >
                    {redeemed ? 'تم ✓' : canAfford ? 'استبدل' : `${(reward.points - pts.balance).toLocaleString()} نقطة`}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        {/* How to earn */}
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 800, color: '#1a1a1a', marginBottom: 10, paddingRight: 2 }}>كيف تكسب النقاط</h2>
          <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
            {EARN_RULES.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px', borderBottom: i < EARN_RULES.length - 1 ? '1px solid #F9FAFB' : 'none' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                  {item.icon}
                </div>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', flex: 1 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction history */}
        {pts.history.length > 0 && (
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 800, color: '#1a1a1a', marginBottom: 10, paddingRight: 2 }}>سجل النقاط</h2>
            <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
              {pts.history.slice(0, 10).map((tx, i) => (
                <div key={tx.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px', borderBottom: i < pts.history.length - 1 ? '1px solid #F9FAFB' : 'none' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: tx.delta > 0 ? '#F0FDF4' : '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 18 }}>{tx.delta > 0 ? '💚' : '🔴'}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', marginBottom: 2 }}>{tx.label}</p>
                    <p style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 500 }}>{tx.time}</p>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 800, color: tx.delta > 0 ? '#16A34A' : '#DC2626', fontFamily: 'Inter, sans-serif' }}>
                    {tx.delta > 0 ? '+' : ''}{tx.delta}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {pts.history.length === 0 && (
          <div style={{ background: 'white', borderRadius: 16, padding: '28px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <p style={{ fontSize: 32, marginBottom: 10 }}>📭</p>
            <p style={{ fontSize: 13, color: '#9CA3AF' }}>لا يوجد سجل بعد — اطلب وجبتك الأولى!</p>
          </div>
        )}
      </div>

      <CustomerNav />

      {/* Confirm redeem bottom sheet */}
      {confirmReward && (
        <div
          onClick={() => setConfirmReward(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background: 'white', borderRadius: '24px 24px 0 0', padding: '28px 20px 40px', width: '100%', maxWidth: 480, textAlign: 'center' }}
          >
            <div style={{ fontSize: 52, marginBottom: 14 }}>{confirmReward.icon}</div>
            <p style={{ fontWeight: 800, color: '#1a1a1a', fontSize: 18, marginBottom: 8 }}>استبدال المكافأة</p>
            <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 6 }}>{confirmReward.title}</p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#FFF7ED', border: '1.5px solid #FED7AA', borderRadius: 20, padding: '5px 16px', fontSize: 13, fontWeight: 700, color: '#EA580C', marginBottom: 8 }}>
              ★ {confirmReward.points.toLocaleString()} نقطة
            </div>
            <p style={{ color: '#9CA3AF', fontSize: 12, marginBottom: 24 }}>
              رصيدك الحالي: {pts.balance.toLocaleString()} نقطة → بعد الاستبدال: {(pts.balance - confirmReward.points).toLocaleString()} نقطة
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setConfirmReward(null)} style={{ flex: 1, padding: '14px', borderRadius: 14, border: '1.5px solid #E5E7EB', fontSize: 14, fontWeight: 700, color: '#6B7280', background: 'white', cursor: 'pointer', fontFamily: 'Cairo, sans-serif' }}>
                إلغاء
              </button>
              <button onClick={() => handleRedeem(confirmReward)} style={{ flex: 1, padding: '14px', borderRadius: 14, border: 'none', fontSize: 14, fontWeight: 700, color: 'white', background: color, cursor: 'pointer', fontFamily: 'Cairo, sans-serif', boxShadow: `0 4px 14px ${color}44` }}>
                تأكيد الاستبدال
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
