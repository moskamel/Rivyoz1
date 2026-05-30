import { useEffect } from 'react'
import { CloseCircle } from 'iconsax-react'

/**
 * Modal — unified overlay dialog used across all dashboard pages.
 *
 * Usage:
 *   <Modal open={open} onClose={() => setOpen(false)} title="عنوان">
 *     {children}
 *   </Modal>
 *
 * Props:
 *   open        boolean
 *   onClose     () => void
 *   title       string
 *   width       number (default 480)
 *   noPad       boolean — removes body padding for full-bleed content
 *   footer      ReactNode — rendered below body with border-top
 */
export default function Modal({ open, onClose, title, children, width = 480, noPad = false, footer }) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handler = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', handler)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px 16px',
        animation: 'fadeInOnly 0.15s ease both',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: width,
          background: 'var(--surface)',
          border: '1px solid var(--border-strong)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          display: 'flex', flexDirection: 'column',
          maxHeight: 'calc(100vh - 40px)',
          overflow: 'hidden',
          animation: 'scaleIn 0.18s var(--ease-default) both',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: '1px solid var(--border)',
          flexShrink: 0,
        }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{title}</p>
          <button
            onClick={onClose}
            className="btn-icon sm"
            style={{ cursor: 'pointer', flexShrink: 0 }}
          >
            <CloseCircle size={14} />
          </button>
        </div>

        {/* Body */}
        <div
          className="no-scrollbar"
          style={{
            flex: 1, overflowY: 'auto',
            padding: noPad ? 0 : '20px',
          }}
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div style={{
            padding: '14px 20px',
            borderTop: '1px solid var(--border)',
            display: 'flex', gap: 8, justifyContent: 'flex-end',
            flexShrink: 0,
          }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
