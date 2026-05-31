import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary:', error, info)
  }

  render() {
    if (!this.state.hasError) return this.props.children
    return (
      <div dir="rtl" style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg)', flexDirection: 'column', gap: 16, padding: 32, textAlign: 'center',
      }}>
        <div style={{ fontSize: 48 }}>⚠️</div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', margin: 0, fontFamily: 'Zain, sans-serif' }}>
          حدث خطأ غير متوقع
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text-3)', margin: 0, fontFamily: 'Zain, sans-serif', maxWidth: 400 }}>
          نأسف على هذا الخطأ. يمكنك تحديث الصفحة أو العودة للرئيسية.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          style={{
            padding: '10px 24px', background: 'var(--accent)', color: 'white',
            border: 'none', borderRadius: 999, fontSize: 14, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'Zain, sans-serif',
          }}
        >
          العودة للرئيسية
        </button>
      </div>
    )
  }
}
