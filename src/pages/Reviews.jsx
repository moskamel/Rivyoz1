import { useState } from 'react'
import { Message, Eye, EyeSlash, Send } from 'iconsax-react'
import Layout from '../components/layout/Layout'
import { getReviews, replyToReview, toggleReviewVisibility } from '../lib/restaurantStore'

function Stars({ rating, size = 14 }) {
  return (
    <span>
      {[1, 2, 3, 4, 5].map(s => (
        <span key={s} style={{ color: s <= rating ? '#F59E0B' : 'var(--border-strong)', fontSize: size }}>★</span>
      ))}
    </span>
  )
}

export default function Reviews() {
  const [reviews, setReviews] = useState(() => getReviews())
  const [activeTab, setActiveTab] = useState('all')
  const [replyingTo, setReplyingTo] = useState(null)
  const [replyText, setReplyText] = useState('')

  const total = reviews.length
  const avg = total ? reviews.reduce((s, r) => s + r.rating, 0) / total : 0
  const pendingCount = reviews.filter(r => !r.reply && r.isVisible).length
  const hiddenCount = reviews.filter(r => !r.isVisible).length

  const filtered = reviews.filter(r => {
    if (activeTab === 'pending') return !r.reply && r.isVisible
    if (activeTab === 'hidden') return !r.isVisible
    return true
  })

  const handleReply = (id) => {
    if (!replyText.trim()) return
    replyToReview(id, replyText.trim())
    setReviews(getReviews())
    setReplyingTo(null)
    setReplyText('')
  }

  const handleToggle = (id) => {
    toggleReviewVisibility(id)
    setReviews(getReviews())
  }

  const ratingLabel = (r) => ['', 'سيء جداً', 'سيء', 'متوسط', 'جيد', 'ممتاز'][r]

  return (
    <Layout>
      <div dir="rtl" style={{ fontFamily: 'Zain, sans-serif' }}>
        <h1 style={{ fontWeight: 800, fontSize: 22, color: 'var(--text)', marginBottom: 24 }}>التقييمات</h1>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
          {[
            { label: 'إجمالي التقييمات', value: total, emoji: '⭐', color: '#F59E0B' },
            { label: 'متوسط التقييم', value: avg.toFixed(1) + ' / 5', emoji: '📊', color: '#3B82F6' },
            { label: 'بانتظار الرد', value: pendingCount, emoji: '💬', color: '#F97316' },
            { label: 'مخفية', value: hiddenCount, emoji: '🙈', color: '#6B7280' },
          ].map(stat => (
            <div key={stat.label} style={{ background: 'var(--surface)', borderRadius: 16, padding: '18px 20px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: stat.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>{stat.emoji}</div>
                <span style={{ fontSize: 12, color: 'var(--text-2)', fontWeight: 600 }}>{stat.label}</span>
              </div>
              <p style={{ fontSize: 24, fontWeight: 900, color: 'var(--text)' }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Rating distribution */}
        <div style={{ background: 'var(--surface)', borderRadius: 16, padding: '20px', border: '1px solid var(--border)', marginBottom: 24, display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <div style={{ fontSize: 48, fontWeight: 900, color: '#F59E0B', lineHeight: 1 }}>{avg.toFixed(1)}</div>
            <div style={{ marginTop: 6 }}><Stars rating={Math.round(avg)} size={16} /></div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>{total} تقييم</div>
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            {[5, 4, 3, 2, 1].map(s => {
              const cnt = reviews.filter(r => r.rating === s).length
              const pct = total > 0 ? (cnt / total) * 100 : 0
              return (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-2)', width: 10, textAlign: 'right', flexShrink: 0 }}>{s}</span>
                  <span style={{ color: '#F59E0B', fontSize: 12, flexShrink: 0 }}>★</span>
                  <div style={{ flex: 1, height: 8, background: 'var(--surface-2)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: '#F59E0B', borderRadius: 4, transition: 'width 0.5s' }} />
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--text-3)', width: 22, flexShrink: 0 }}>{cnt}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {[
            { id: 'all', label: 'الكل', count: total },
            { id: 'pending', label: 'بانتظار الرد', count: pendingCount },
            { id: 'hidden', label: 'مخفية', count: hiddenCount },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{ padding: '8px 18px', borderRadius: 20, fontSize: 13, fontWeight: 700, cursor: 'pointer', border: 'none', fontFamily: 'Zain, sans-serif', transition: 'all 0.15s', background: activeTab === tab.id ? 'var(--accent)' : 'var(--surface-2)', color: activeTab === tab.id ? 'white' : 'var(--text-2)' }}>
              {tab.label}{tab.count > 0 ? ` (${tab.count})` : ''}
            </button>
          ))}
        </div>

        {/* Reviews list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.length === 0 ? (
            <div style={{ background: 'var(--surface)', borderRadius: 16, padding: '48px', textAlign: 'center', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
              <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-2)' }}>لا توجد تقييمات</p>
            </div>
          ) : filtered.map(review => (
            <div key={review.id} style={{ background: 'var(--surface)', borderRadius: 16, padding: '20px', border: '1px solid var(--border)', opacity: review.isVisible ? 1 : 0.65, transition: 'opacity 0.2s' }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--accent-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', fontWeight: 900, fontSize: 18, flexShrink: 0 }}>
                  {review.customerName?.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4, flexWrap: 'wrap', gap: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>{review.customerName}</p>
                      {!review.isVisible && (
                        <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 6, background: 'var(--surface-2)', color: 'var(--text-3)' }}>مخفي</span>
                      )}
                    </div>
                    <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{review.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Stars rating={review.rating} />
                    <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{ratingLabel(review.rating)}</span>
                  </div>
                </div>
              </div>

              {review.comment && (
                <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.75, marginBottom: 14 }}>{review.comment}</p>
              )}

              {/* Existing reply */}
              {review.reply && replyingTo !== review.id && (
                <div style={{ background: 'var(--accent-muted)', borderRight: '3px solid var(--accent)', padding: '12px 14px', borderRadius: '0 10px 10px 0', marginBottom: 14 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', marginBottom: 5 }}>رد المطعم · {review.replyDate}</p>
                  <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.65 }}>{review.reply}</p>
                </div>
              )}

              {/* Reply form */}
              {replyingTo === review.id && (
                <div style={{ marginBottom: 14 }}>
                  <textarea
                    autoFocus
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    placeholder="اكتب ردك على التقييم..."
                    rows={3}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1.5px solid var(--accent)', fontSize: 13, outline: 'none', resize: 'none', fontFamily: 'Zain, sans-serif', boxSizing: 'border-box', color: 'var(--text)', background: 'var(--surface-2)' }}
                  />
                  <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                    <button onClick={() => handleReply(review.id)}
                      style={{ padding: '8px 16px', borderRadius: 10, background: 'var(--accent)', color: 'white', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer', fontFamily: 'Zain, sans-serif', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Send size={13} /> إرسال الرد
                    </button>
                    <button onClick={() => { setReplyingTo(null); setReplyText('') }}
                      style={{ padding: '8px 14px', borderRadius: 10, background: 'var(--surface-2)', color: 'var(--text-2)', fontWeight: 600, fontSize: 13, border: 'none', cursor: 'pointer', fontFamily: 'Zain, sans-serif' }}>
                      إلغاء
                    </button>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {replyingTo !== review.id && (
                  !review.reply ? (
                    <button onClick={() => { setReplyingTo(review.id); setReplyText('') }}
                      style={{ padding: '7px 14px', borderRadius: 10, background: 'var(--surface-2)', color: 'var(--text-2)', fontWeight: 600, fontSize: 12, border: 'none', cursor: 'pointer', fontFamily: 'Zain, sans-serif', display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Message size={13} /> رد على التقييم
                    </button>
                  ) : (
                    <button onClick={() => { setReplyingTo(review.id); setReplyText(review.reply) }}
                      style={{ padding: '7px 14px', borderRadius: 10, background: 'var(--surface-2)', color: 'var(--text-2)', fontWeight: 600, fontSize: 12, border: 'none', cursor: 'pointer', fontFamily: 'Zain, sans-serif', display: 'flex', alignItems: 'center', gap: 5 }}>
                      ✏️ تعديل الرد
                    </button>
                  )
                )}
                <button onClick={() => handleToggle(review.id)}
                  style={{ padding: '7px 14px', borderRadius: 10, fontWeight: 600, fontSize: 12, border: 'none', cursor: 'pointer', fontFamily: 'Zain, sans-serif', display: 'flex', alignItems: 'center', gap: 5, background: review.isVisible ? '#FEF3C7' : '#DCFCE7', color: review.isVisible ? '#92400E' : '#166534' }}>
                  {review.isVisible ? <><EyeSlash size={13} /> إخفاء</> : <><Eye size={13} /> إظهار</>}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
