// Phone screen mockups for the Reviyoz landing
// Each is sized for a 280x600-ish phone viewport

const PhoneFrame = ({ children, tilt = 0, glow = false, style = {} }) => (
  <div style={{
    width: 280,
    height: 580,
    borderRadius: 44,
    background: '#0a0510',
    padding: 8,
    boxShadow: glow
      ? '0 40px 80px -20px rgba(67,36,103,0.45), 0 0 0 1px rgba(255,255,255,0.05), inset 0 0 0 1.5px rgba(255,255,255,0.08)'
      : '0 25px 50px -15px rgba(43,15,73,0.35), 0 0 0 1px rgba(0,0,0,0.05)',
    transform: `rotate(${tilt}deg)`,
    position: 'relative',
    ...style,
  }}>
    {/* notch */}
    <div style={{
      position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)',
      width: 90, height: 24, background: '#0a0510', borderRadius: 14, zIndex: 10,
    }} />
    <div style={{
      width: '100%', height: '100%', borderRadius: 36, overflow: 'hidden', position: 'relative',
      background: 'linear-gradient(180deg, #FCDDD0 0%, #FDF8FF 40%, #E5D4F2 100%)',
    }}>
      {children}
    </div>
  </div>
);

const StatusBar = ({ dark = false }) => (
  <div style={{
    height: 44, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
    padding: '0 22px 6px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 600,
    color: dark ? '#fff' : '#1B0E2B', direction: 'ltr',
  }}>
    <span>9:41</span>
    <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
      <span style={{ display: 'inline-block', width: 16, height: 10, border: `1.5px solid ${dark ? '#fff' : '#1B0E2B'}`, borderRadius: 2, position: 'relative' }}>
        <span style={{ position: 'absolute', inset: 1, background: dark ? '#fff' : '#1B0E2B', width: '80%' }} />
      </span>
    </span>
  </div>
);

// ====================================================================
// SCREEN 1: HOME — banner, top rated, categories
// ====================================================================
const HomeScreen = () => (
  <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
    <StatusBar />
    {/* Header */}
    <div style={{ padding: '4px 18px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <div style={{ fontSize: 12, color: '#6B5575' }}>أهلاً، نور</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#1B0E2B' }}>اكتشف اليوم</div>
      </div>
      <div style={{
        width: 36, height: 36, borderRadius: '50%',
        background: 'linear-gradient(135deg, #F58762, #C95FA0)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontWeight: 800, fontSize: 14,
      }}>ن</div>
    </div>

    {/* Search bar */}
    <div style={{ padding: '0 18px 14px' }}>
      <div style={{
        background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)',
        borderRadius: 16, padding: '11px 14px', display: 'flex', alignItems: 'center', gap: 10,
        border: '1px solid rgba(67,36,103,0.08)',
      }}>
        <Icon name="search" size={16} color="#6B5575" strokeWidth={1.8} />
        <span style={{ flex: 1, fontSize: 14, color: '#6B5575' }}>ابحث عن منتج، علامة، متجر…</span>
        <div style={{
          width: 28, height: 28, borderRadius: 10,
          background: 'linear-gradient(135deg, #F58762, #C95FA0)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="camera" size={15} color="#fff" strokeWidth={1.8} />
        </div>
      </div>
    </div>

    {/* Hero banner */}
    <div style={{ padding: '0 18px 16px' }}>
      <div style={{
        height: 130, borderRadius: 20, padding: 16, position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, #432467 0%, #C95FA0 80%, #F58762 100%)',
        color: '#fff',
      }}>
        <div style={{ fontSize: 10, opacity: 0.85, letterSpacing: 1 }}>عرض حصري</div>
        <div style={{ fontSize: 22, fontWeight: 900, marginTop: 4, lineHeight: 1.1 }}>خصم حتى<br />٤٠٪ هذا الأسبوع</div>
        <div style={{
          position: 'absolute', bottom: 12, right: 16,
          background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)',
          padding: '5px 11px', borderRadius: 99, fontSize: 11, fontWeight: 700,
        }}>تسوّق الآن ←</div>
        <div style={{
          position: 'absolute', top: -20, left: -20, width: 80, height: 80,
          borderRadius: '50%', background: 'rgba(245,135,98,0.4)', filter: 'blur(20px)',
        }} />
        <div style={{
          position: 'absolute', top: 14, left: 18, display: 'flex', gap: 4,
        }}>
          {[0,1,2].map(i => (
            <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: i===0 ? '#fff' : 'rgba(255,255,255,0.4)' }} />
          ))}
        </div>
      </div>
    </div>

    {/* Top rated section */}
    <div style={{ padding: '0 18px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: '#1B0E2B' }}>الأكثر تقييماً</div>
        <div style={{ fontSize: 11, color: '#C95FA0', fontWeight: 700 }}>عرض الكل ←</div>
      </div>
      <div style={{ display: 'flex', gap: 10, overflow: 'hidden' }}>
        {[
          { name: 'AirPods Pro', price: '٩٩٠٠', store: 'Amazon', color: '#FCDDD0' },
          { name: 'Galaxy Buds', price: '٤٢٠٠', store: 'noon', color: '#E5D4F2' },
        ].map((p, i) => (
          <div key={i} style={{
            flex: 1, background: '#fff', borderRadius: 16, padding: 10,
            border: '1px solid rgba(67,36,103,0.06)',
          }}>
            <div style={{
              height: 70, borderRadius: 12, background: p.color, marginBottom: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'JetBrains Mono', fontSize: 9, color: '#6B5575',
            }}>[ صورة منتج ]</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#1B0E2B', marginBottom: 2 }}>{p.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: 4 }}>
              <Icon name="star" size={9} color="#F58762" bold />
              <span style={{ fontSize: 10, color: '#6B5575', fontWeight: 600 }}>٤٫٨</span>
              <span style={{ fontSize: 10, color: '#6B5575' }}>({i===0 ? '٢٤٣' : '١٥٦'})</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#432467' }}>
              <span className="mono">{p.price}</span> ج.م
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Bottom nav */}
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(67,36,103,0.08)',
      padding: '10px 20px 18px', display: 'flex', justifyContent: 'space-around',
    }}>
      {[
        { icon: 'home', label: 'الرئيسية', active: true },
        { icon: 'searchNormal', label: 'البحث' },
        { icon: 'bag', label: 'مشترياتي' },
        { icon: 'userOctagon', label: 'حسابي' },
      ].map((t, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <Icon name={t.icon} size={20} color={t.active ? '#C95FA0' : '#9E8AAE'} strokeWidth={1.8} />
          <div style={{ fontSize: 9, fontWeight: 700, color: t.active ? '#C95FA0' : '#9E8AAE' }}>{t.label}</div>
        </div>
      ))}
    </div>
  </div>
);

// ====================================================================
// SCREEN 2: CAMERA SCAN
// ====================================================================
const ScanScreen = () => (
  <div style={{
    width: '100%', height: '100%', position: 'relative',
    background: '#1a0a25',
  }}>
    <StatusBar dark />
    {/* faux camera feed */}
    <div style={{
      position: 'absolute', inset: 0,
      background: 'radial-gradient(circle at 50% 45%, #4a2870 0%, #1a0a25 70%)',
    }}>
      {/* product silhouette */}
      <div style={{
        position: 'absolute', top: '32%', left: '50%', transform: 'translateX(-50%)',
        width: 140, height: 180, borderRadius: 20,
        background: 'linear-gradient(160deg, rgba(255,255,255,0.15), rgba(255,255,255,0.02))',
        border: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'JetBrains Mono', fontSize: 9, color: 'rgba(255,255,255,0.5)',
      }}>[ المنتج ]</div>
    </div>

    {/* top header */}
    <div style={{ position: 'relative', padding: '0 18px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <button style={{
        width: 34, height: 34, borderRadius: 12,
        background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)',
        color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name="arrowRight" size={16} color="#fff" strokeWidth={2.2} />
      </button>
      <div style={{ fontSize: 15, fontWeight: 800 }}>المسح بالكاميرا</div>
      <div style={{ width: 34 }} />
    </div>

    {/* scan corners */}
    <div style={{ position: 'absolute', inset: '26% 14% 32%', pointerEvents: 'none' }}>
      {[
        { top: 0, right: 0, borderTop: '3px solid #F58762', borderRight: '3px solid #F58762', borderTopRightRadius: 14 },
        { top: 0, left: 0, borderTop: '3px solid #F58762', borderLeft: '3px solid #F58762', borderTopLeftRadius: 14 },
        { bottom: 0, right: 0, borderBottom: '3px solid #F58762', borderRight: '3px solid #F58762', borderBottomRightRadius: 14 },
        { bottom: 0, left: 0, borderBottom: '3px solid #F58762', borderLeft: '3px solid #F58762', borderBottomLeftRadius: 14 },
      ].map((s, i) => (
        <div key={i} style={{ position: 'absolute', width: 28, height: 28, ...s }} />
      ))}
      {/* scan line */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: '50%',
        height: 2, background: 'linear-gradient(90deg, transparent, #F58762, transparent)',
        boxShadow: '0 0 12px #F58762',
      }} />
    </div>

    {/* AI badge */}
    <div style={{
      position: 'absolute', top: 90, right: 18,
      background: 'rgba(245,135,98,0.95)', color: '#fff',
      padding: '6px 11px', borderRadius: 99, fontSize: 11, fontWeight: 700,
      display: 'flex', alignItems: 'center', gap: 6,
    }}>
      <Icon name="magicStar" size={12} color="#fff" strokeWidth={1.8} />
      مدعوم بالذكاء الاصطناعي
    </div>

    {/* Result card sliding up */}
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(20px)',
      borderRadius: '24px 24px 0 0', padding: '18px 18px 24px',
    }}>
      <div style={{ width: 36, height: 4, borderRadius: 2, background: '#D9CDE3', margin: '0 auto 12px' }} />
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{
          width: 64, height: 64, borderRadius: 14,
          background: 'linear-gradient(135deg, #FCDDD0, #E5D4F2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'JetBrains Mono', fontSize: 8, color: '#6B5575',
        }}>[ منتج ]</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, color: '#C95FA0', fontWeight: 700, marginBottom: 2 }}>تم التعرّف ✓</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#1B0E2B' }}>سماعات سماعات سوني WH-1000XM5</div>
          <div style={{ fontSize: 11, color: '#6B5575' }}>إلكترونيات • سماعات</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#432467', marginTop: 3 }}>
            <span className="mono">١٧٠٠٠ – ١٩٥٠٠</span> ج.م
          </div>
        </div>
      </div>
      <button style={{
        width: '100%', marginTop: 12,
        background: 'linear-gradient(135deg, #F58762, #C95FA0)',
        color: '#fff', padding: '11px', borderRadius: 12, fontSize: 13, fontWeight: 800,
      }}>
        مقارنة الأسعار في المتاجر
      </button>
    </div>
  </div>
);

// ====================================================================
// SCREEN 3: PRICE COMPARISON
// ====================================================================
const CompareScreen = () => {
  const stores = [
    { name: 'Amazon EG', price: '١٧٢٥٠', orig: '٢٠٤٩٠', discount: '١٦٪', color: '#FF9900', logo: 'a' },
    { name: 'noon', price: '١٧٨٩٩', orig: '١٩٩٥٠', discount: '١٠٪', color: '#FEEE00', dark: true, logo: 'n' },
    { name: 'B.TECH', price: '١٨٢٠٠', orig: '١٩٤٠٠', discount: '٦٪', color: '#E2231A', logo: 'B' },
    { name: 'Jumia', price: '١٨٥٤٥', orig: null, discount: null, color: '#F68B1E', logo: 'J' },
  ];
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '4px 18px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button style={{
          width: 32, height: 32, borderRadius: 10, background: '#fff',
          border: '1px solid rgba(67,36,103,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="arrowRight" size={14} color="#1B0E2B" strokeWidth={2.2} />
        </button>
        <div style={{ fontSize: 14, fontWeight: 800, color: '#1B0E2B' }}>مقارنة الأسعار</div>
      </div>

      {/* product card */}
      <div style={{ padding: '0 18px 12px' }}>
        <div style={{
          background: '#fff', borderRadius: 16, padding: 12, display: 'flex', gap: 12,
          border: '1px solid rgba(67,36,103,0.06)',
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 12,
            background: 'linear-gradient(135deg, #FCDDD0, #E5D4F2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'JetBrains Mono', fontSize: 8, color: '#6B5575',
          }}>[ منتج ]</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#1B0E2B' }}>سماعات سوني WH-1000XM5</div>
            <div style={{ fontSize: 11, color: '#6B5575' }}>سماعات لاسلكية</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
              <Icon name="star" size={10} color="#F58762" bold />
              <span style={{ fontSize: 10, fontWeight: 700, color: '#6B5575' }}>٤٫٩ <span className="mono">(٥٢٣)</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* "best price" banner */}
      <div style={{ padding: '0 18px 10px' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(245,135,98,0.15), rgba(201,95,160,0.1))',
          border: '1px dashed rgba(201,95,160,0.4)',
          borderRadius: 12, padding: '8px 12px',
          fontSize: 12, color: '#432467', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontWeight: 700 }}>💸 توفير حتى</span>
          <span style={{ fontWeight: 900 }}><span className="mono">٢٤٠٠</span> ج.م</span>
        </div>
      </div>

      {/* stores list */}
      <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {stores.map((s, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: 14, padding: '10px 12px',
            display: 'flex', alignItems: 'center', gap: 10,
            border: i === 0 ? '2px solid #C95FA0' : '1px solid rgba(67,36,103,0.06)',
            position: 'relative',
          }}>
            {i === 0 && (
              <div style={{
                position: 'absolute', top: -7, right: 10,
                background: 'linear-gradient(135deg, #F58762, #C95FA0)',
                color: '#fff', fontSize: 9, fontWeight: 800,
                padding: '2px 8px', borderRadius: 99,
              }}>الأفضل</div>
            )}
            <div style={{
              width: 38, height: 38, borderRadius: 10, background: s.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: s.dark ? '#1B0E2B' : '#fff', fontWeight: 900, fontSize: 18,
              fontFamily: 'JetBrains Mono',
            }}>{s.logo}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#1B0E2B' }}>{s.name}</div>
              {s.discount && (
                <div style={{ fontSize: 10, color: '#C95FA0', fontWeight: 700 }}>
                  خصم {s.discount} <span style={{ color: '#9E8AAE', textDecoration: 'line-through', marginRight: 4 }} className="mono">{s.orig}</span>
                </div>
              )}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 16, fontWeight: 900, color: '#432467' }}>
                <span className="mono">{s.price}</span>
              </div>
              <div style={{ fontSize: 9, color: '#6B5575' }}>ج.م</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, { PhoneFrame, HomeScreen, ScanScreen, CompareScreen });
