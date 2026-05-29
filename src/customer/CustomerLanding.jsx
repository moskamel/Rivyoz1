import { useNavigate } from 'react-router-dom'
import { Star, Clock, ChevronLeft } from 'lucide-react'
import { getConfig, getCustomerProfile } from '../lib/restaurantStore'
import CustomerNav from './CustomerNav'
import CustomerFooter from './CustomerFooter'

const mockRestaurants = [
  { name: 'مطعم الشيف أحمد', category: 'مشويات', rating: 4.9, time: 30, color: '#f97316', emoji: '🍖', slug: 'chef-ahmed' },
  { name: 'بيتزا بلازا',      category: 'بيتزا',   rating: 4.7, time: 25, color: '#ef4444', emoji: '🍕', slug: 'pizza-plaza' },
  { name: 'كافيه ميترو',      category: 'كافيه',   rating: 4.5, time: 20, color: '#8b5cf6', emoji: '☕', slug: 'metro-cafe' },
]

const testimonials = [
  { name: 'سارة م.', text: 'أخيراً تطبيق يفهمني! طلبت وجبتي ووصلت في 28 دقيقة بالضبط وهي ساخنة 🔥', stars: 5, avatar: 'س' },
  { name: 'محمد ع.', text: 'برنامج النقاط رائع جداً، استبدلت نقاطي بوجبة مجانية بعد شهر واحد بس!', stars: 5, avatar: 'م' },
  { name: 'نور ك.',  text: 'تتبع الطلب مباشرة يعطيك راحة بال، بعرف وين طلبي في كل لحظة', stars: 5, avatar: 'ن' },
]

export default function CustomerLanding() {
  const navigate = useNavigate()
  const config = getConfig()
  const color = config.color
  const profile = getCustomerProfile()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'Zain, sans-serif', direction: 'rtl', color: 'var(--text)' }}>
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .float-anim { animation: float 3.5s ease-in-out infinite; }
      `}</style>

      {/* ── Hero — full bleed ── */}
      <div style={{
        background: `linear-gradient(160deg, ${color} 0%, ${color}cc 55%, var(--bg) 100%)`,
        padding: '52px 20px 56px', position: 'relative', overflow: 'hidden', textAlign: 'center',
        width: '100%', boxSizing: 'border-box',
      }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -30, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', borderRadius: 20, padding: '5px 14px', marginBottom: 20, border: '1px solid rgba(255,255,255,0.3)' }}>
          <span style={{ fontSize: 14 }}>🍽️</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>منصة توصيل الطعام الأذكى</span>
        </div>

        <div className="float-anim" style={{ fontSize: 72, marginBottom: 12, lineHeight: 1 }}>🛵</div>
        <h1 style={{ fontSize: 30, fontWeight: 900, color: 'white', marginBottom: 12, lineHeight: 1.3, textShadow: '0 2px 12px rgba(0,0,0,0.15)' }}>
          طعامك المفضل<br />على بابك في دقائق
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.88)', marginBottom: 32, lineHeight: 1.8 }}>
          اكتشف أفضل المطاعم، اطلب بسهولة، وتتبع طلبك خطوة بخطوة — مع مكافآت تزداد مع كل وجبة 🎁
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button
            onClick={() => navigate('/explore')}
            style={{ width: '100%', padding: '16px', borderRadius: 16, background: 'white', color, fontWeight: 800, fontSize: 16, border: 'none', cursor: 'pointer', fontFamily: 'Zain, sans-serif', boxShadow: '0 8px 28px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxSizing: 'border-box' }}
          >
            🍴 اكتشف المطاعم
          </button>
          {!profile && (
            <button
              onClick={() => navigate('/customer-login')}
              style={{ width: '100%', padding: '14px', borderRadius: 16, background: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 700, fontSize: 15, border: '2px solid rgba(255,255,255,0.5)', cursor: 'pointer', fontFamily: 'Zain, sans-serif', backdropFilter: 'blur(8px)', boxSizing: 'border-box' }}
            >
              سجّل مجاناً
            </button>
          )}
        </div>
      </div>

      {/* ── Stats bar — full bleed ── */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '20px 20px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {[
            { value: '5+',  label: 'مطاعم متاحة',  icon: '🏪' },
            { value: '30د', label: 'متوسط التوصيل', icon: '⚡' },
            { value: '98%', label: 'رضا العملاء',   icon: '⭐' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
              <p style={{ fontSize: 20, fontWeight: 900, color, fontFamily: 'Inter, sans-serif' }}>{s.value}</p>
              <p style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 600 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── All sections — full width with 20px side padding ── */}
      <div style={{ padding: '0 20px 88px', width: '100%', boxSizing: 'border-box' }}>

        {/* How it works */}
        <div style={{ paddingTop: 36 }}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: '0.08em', marginBottom: 6 }}>كيف يعمل؟</p>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: 'var(--text)', margin: 0 }}>ثلاث خطوات بسيطة</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { step: '١', icon: '🔍', title: 'اكتشف', desc: 'تصفّح أفضل المطاعم في منطقتك، فلتر حسب التصنيف أو وقت التوصيل أو التقييم' },
              { step: '٢', icon: '🛒', title: 'اختار واطلب', desc: 'أضف ما تشتهيه للسلة، ادفع بأمان، وأكّد طلبك في ثوانٍ' },
              { step: '٣', icon: '📍', title: 'تتبّع وتمتّع', desc: 'تابع رحلة طلبك مباشرة من المطبخ حتى بابك، واستمتع بوجبتك الساخنة' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'var(--surface)', borderRadius: 20, padding: '18px 16px', display: 'flex', alignItems: 'flex-start', gap: 16, border: '1px solid var(--border)', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                <div style={{ width: 48, height: 48, borderRadius: 16, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>
                  {s.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ width: 22, height: 22, borderRadius: '50%', background: color, color: 'white', fontSize: 11, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: 'Zain, sans-serif' }}>{s.step}</span>
                    <p style={{ fontWeight: 800, fontSize: 15, color: 'var(--text)', margin: 0 }}>{s.title}</p>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features grid */}
        <div style={{ paddingTop: 36 }}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: '0.08em', marginBottom: 6 }}>لماذا ريفيو؟</p>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: 'var(--text)', margin: 0 }}>تجربة طلب لا مثيل لها</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: '📍', title: 'تتبع مباشر',    desc: 'شاهد طلبك وهو في طريقه إليك لحظة بلحظة',            accent: '#3B82F6' },
              { icon: '🎁', title: 'نقاط مكافآت',   desc: 'اكسب نقاط مع كل طلب واستبدلها بوجبات مجانية',        accent: '#F59E0B' },
              { icon: '⚡', title: 'توصيل سريع',    desc: 'شبكة توصيل مدربة تضمن وصول طلبك ساخناً',             accent: '#22C55E' },
              { icon: '💳', title: 'دفع آمن',        desc: 'ادفع كاش أو إلكتروني بكل أمان وسهولة',               accent: '#8B5CF6' },
              { icon: '🏆', title: 'أفضل المطاعم',  desc: 'مطاعم مختارة بعناية بمعايير الجودة والنظافة',          accent: '#EF4444' },
              { icon: '🔔', title: 'إشعارات فورية', desc: 'ابق على اطلاع بكل مرحلة من مراحل طلبك',               accent: '#F97316' },
            ].map((f, i) => (
              <div key={i} style={{ background: 'var(--surface)', borderRadius: 18, padding: '18px 14px', border: '1px solid var(--border)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: f.accent + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 10 }}>
                  {f.icon}
                </div>
                <p style={{ fontWeight: 800, fontSize: 13, color: 'var(--text)', marginBottom: 4 }}>{f.title}</p>
                <p style={{ fontSize: 11, color: 'var(--text-2)', lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Loyalty highlight — full width */}
        <div style={{ marginTop: 36 }}>
          <div
            onClick={() => navigate(profile ? '/loyalty' : '/customer-login')}
            style={{ background: 'linear-gradient(135deg, #F59E0B, #F97316)', borderRadius: 24, padding: '28px 20px', cursor: 'pointer', position: 'relative', overflow: 'hidden', boxShadow: '0 8px 32px rgba(249,115,22,0.3)', width: '100%', boxSizing: 'border-box' }}
          >
            <div style={{ position: 'absolute', top: -20, left: -20, width: 130, height: 130, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -30, right: -10, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.25)', borderRadius: 20, padding: '4px 14px', fontSize: 11, fontWeight: 700, color: 'white', marginBottom: 14 }}>
                🌟 برنامج المكافآت
              </span>
              <h3 style={{ fontSize: 22, fontWeight: 900, color: 'white', marginBottom: 8, lineHeight: 1.35, marginTop: 0 }}>
                كل وجبة تقرّبك<br />من مكافأة مجانية
              </h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.88)', lineHeight: 1.75, marginBottom: 20, marginTop: 0 }}>
                اجمع نقاط مع كل طلب واستبدلها بخصومات، وجبات مجانية، وتوصيل بلا رسوم
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
                {[
                  { points: '500',  reward: 'خصم 10%'      },
                  { points: '1500', reward: 'وجبة مجانية'   },
                  { points: '2000', reward: 'توصيل مجاني'   },
                ].map((r, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: '10px 6px', textAlign: 'center' }}>
                    <p style={{ fontSize: 16, fontWeight: 900, color: 'white', fontFamily: 'Inter, sans-serif', margin: 0 }}>{r.points}</p>
                    <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.85)', fontWeight: 700, marginTop: 4, margin: '4px 0 0' }}>نقطة → {r.reward}</p>
                  </div>
                ))}
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.25)', borderRadius: 12, padding: '10px 16px' }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>{profile ? 'اعرض نقاطي' : 'ابدأ تجميع النقاط'}</span>
                <ChevronLeft size={14} color="white" />
              </div>
            </div>
          </div>
        </div>

        {/* Featured restaurants — full width */}
        <div style={{ paddingTop: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 style={{ fontSize: 18, fontWeight: 900, color: 'var(--text)', margin: 0 }}>⭐ مميزون</h2>
            <button
              onClick={() => navigate('/explore')}
              style={{ fontSize: 13, color, fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Zain, sans-serif', display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}
            >
              عرض الكل <ChevronLeft size={14} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {mockRestaurants.map((r, i) => (
              <div
                key={i}
                onClick={() => navigate(`/${r.slug}`)}
                style={{ background: 'var(--surface)', borderRadius: 18, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', border: '1px solid var(--border)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'transform 0.12s' }}
                onTouchStart={e => (e.currentTarget.style.transform = 'scale(0.98)')}
                onTouchEnd={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <div style={{ width: 52, height: 52, borderRadius: 16, background: `linear-gradient(135deg,${r.color}22,${r.color}44)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0, border: `2px solid ${r.color}30` }}>
                  {r.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 800, fontSize: 14, color: 'var(--text)', marginBottom: 3, margin: '0 0 3px' }}>{r.name}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Star size={11} color="#F59E0B" fill="#F59E0B" />
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', fontFamily: 'Inter' }}>{r.rating}</span>
                    </div>
                    <span style={{ color: 'var(--text-3)', fontSize: 12 }}>·</span>
                    <Clock size={11} color="var(--text-3)" />
                    <span style={{ fontSize: 12, color: 'var(--text-2)' }}>{r.time} دقيقة</span>
                  </div>
                </div>
                <button
                  onClick={e => { e.stopPropagation(); navigate(`/${r.slug}`) }}
                  style={{ padding: '8px 16px', borderRadius: 12, background: r.color, color: 'white', fontWeight: 700, fontSize: 12, border: 'none', cursor: 'pointer', fontFamily: 'Zain, sans-serif', flexShrink: 0 }}
                >
                  اطلب
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials — full width */}
        <div style={{ paddingTop: 36 }}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: '0.08em', marginBottom: 6 }}>آراء عملائنا</p>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: 'var(--text)', margin: 0 }}>ماذا يقولون عنّا</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ background: 'var(--surface)', borderRadius: 20, padding: '18px 16px', border: '1px solid var(--border)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${color}20`, color, fontWeight: 900, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', margin: '0 0 2px' }}>{t.name}</p>
                    <div style={{ display: 'flex', gap: 1 }}>
                      {Array.from({ length: t.stars }).map((_, j) => (
                        <Star key={j} size={11} color="#F59E0B" fill="#F59E0B" />
                      ))}
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.75, margin: 0 }}>"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* App download — full width */}
        <div style={{ marginTop: 36 }}>
          <div style={{ background: 'var(--surface)', borderRadius: 24, padding: '28px 20px', textAlign: 'center', border: '1px solid var(--border)', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: 52, marginBottom: 12 }}>📱</div>
            <h3 style={{ fontSize: 20, fontWeight: 900, color: 'var(--text)', marginBottom: 8, marginTop: 0 }}>حمّل التطبيق الآن</h3>
            <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.75, marginBottom: 24, marginTop: 0 }}>
              تجربة أسرع وأسهل — إشعارات فورية، تتبع مباشر، ووصول لعروض حصرية
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px', borderRadius: 14, background: '#1a1a1a', color: 'white', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer', fontFamily: 'Zain, sans-serif' }}>
                🍎 App Store
              </button>
              <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px', borderRadius: 14, background: '#1a1a1a', color: 'white', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer', fontFamily: 'Zain, sans-serif' }}>
                🤖 Google Play
              </button>
            </div>
          </div>
        </div>

      </div>

      <CustomerFooter />
      <CustomerNav />
    </div>
  )
}
