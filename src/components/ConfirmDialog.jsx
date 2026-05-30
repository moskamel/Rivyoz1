import { createPortal } from 'react-dom'

export default function ConfirmDialog({ open, title, message, confirmLabel = 'تأكيد', onConfirm, onCancel, danger = true }) {
  if (!open) return null
  return createPortal(
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(3px)', zIndex: 999999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
      onMouseDown={onCancel}
    >
      <div
        dir="rtl"
        style={{ background: 'var(--surface)', border: '1px solid var(--border-strong)', borderRadius: 18, padding: '28px 24px', maxWidth: 360, width: '100%', boxShadow: '0 24px 64px rgba(0,0,0,0.3)' }}
        onMouseDown={e => e.stopPropagation()}
      >
        <p style={{ fontFamily: 'Zain, sans-serif', fontWeight: 800, fontSize: 17, color: 'var(--text)', marginBottom: message ? 8 : 24 }}>{title}</p>
        {message && <p style={{ fontFamily: 'Zain, sans-serif', fontSize: 14, color: 'var(--text-2)', marginBottom: 24, lineHeight: 1.6 }}>{message}</p>}
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={onConfirm}
            style={{ flex: 1, padding: '10px 0', borderRadius: 11, border: 'none', background: danger ? 'var(--red)' : 'var(--accent)', color: '#fff', fontFamily: 'Zain, sans-serif', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
          >{confirmLabel}</button>
          <button
            onClick={onCancel}
            style={{ flex: 1, padding: '10px 0', borderRadius: 11, border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text)', fontFamily: 'Zain, sans-serif', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
          >إلغاء</button>
        </div>
      </div>
    </div>,
    document.body
  )
}
