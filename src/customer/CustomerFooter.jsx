import { useNavigate } from 'react-router-dom'
import { getConfig, getFooterSettings } from '../lib/restaurantStore'

export default function CustomerFooter({ noNav = false }) {
  const navigate = useNavigate()
  const config = getConfig()
  const f = getFooterSettings()
  const accentColor = config.color

  return (
    <div style={{ background: '#1a1a1a', color: 'white', padding: `32px 20px ${noNav ? '32px' : '100px'}`, direction: 'rtl', fontFamily: 'Zain, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900 }}>ر</div>
        <div>
          <p style={{ fontWeight: 900, fontSize: 16 }}>ريڤيو</p>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 1 }}>{f.tagline}</p>
        </div>
      </div>

      {f.showAppButtons && (
        <>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 14 }}>حمّل التطبيق واطلب بسهولة أكبر</p>
          <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
            <a href={f.iosUrl} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px 16px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12, color: 'white', fontSize: 13, fontWeight: 700, cursor: 'pointer', backdropFilter: 'blur(4px)', textDecoration: 'none' }}>
              <span style={{ fontSize: 20 }}>🍎</span> App Store
            </a>
            <a href={f.androidUrl} target="_blank" rel="noopener noreferrer" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px 16px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12, color: 'white', fontSize: 13, fontWeight: 700, cursor: 'pointer', backdropFilter: 'blur(4px)', textDecoration: 'none' }}>
              <span style={{ fontSize: 20 }}>🤖</span> Google Play
            </a>
          </div>
        </>
      )}

      <div style={{ display: 'flex', gap: 20, marginBottom: 20, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 20 }}>
        {f.showExploreLink && (
          <button onClick={() => navigate('/explore')} style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Zain, sans-serif' }}>
            🗺️ قائمة المطاعم
          </button>
        )}
        <button style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Zain, sans-serif' }}>📞 تواصل معنا</button>
        <button style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Zain, sans-serif' }}>❓ المساعدة</button>
      </div>

      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>{f.copyright}</p>
    </div>
  )
}
