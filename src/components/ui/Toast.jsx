import { useState, useCallback } from 'react'
import { TickCircle, CloseCircle, InfoCircle, Warning2 } from 'iconsax-react'

/**
 * useToast — platform-wide toast notification hook.
 *
 * Usage:
 *   const { toasts, toast } = useToast()
 *   toast.success('تم الحفظ بنجاح')
 *   toast.error('حدث خطأ')
 *   toast.info('معلومة')
 *   toast.warn('تحذير')
 *
 *   // Then render: <ToastContainer toasts={toasts} />
 */
export function useToast() {
  const [toasts, setToasts] = useState([])

  const push = useCallback((message, type = 'success', duration = 2800) => {
    const id = Date.now() + Math.random()
    setToasts(t => [...t, { id, message, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), duration)
  }, [])

  return {
    toasts,
    toast: {
      success: msg => push(msg, 'success'),
      error:   msg => push(msg, 'error'),
      info:    msg => push(msg, 'info'),
      warn:    msg => push(msg, 'warn'),
    },
  }
}

const ICONS  = { success: TickCircle, error: CloseCircle, info: InfoCircle, warn: Warning2 }
const COLORS = {
  success: { color: 'var(--green)',  bg: 'var(--green-muted)',  border: 'rgba(34,197,94,0.25)'   },
  error:   { color: 'var(--red)',    bg: 'var(--red-muted)',    border: 'rgba(248,113,113,0.25)' },
  info:    { color: 'var(--blue)',   bg: 'var(--blue-muted)',   border: 'rgba(96,165,250,0.25)'  },
  warn:    { color: 'var(--yellow)', bg: 'var(--yellow-muted)', border: 'rgba(251,191,36,0.25)'  },
}

export function ToastContainer({ toasts }) {
  if (!toasts.length) return null
  return (
    <div style={{
      position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
      zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center',
      pointerEvents: 'none',
    }}>
      {toasts.map(t => {
        const { color, bg, border } = COLORS[t.type] || COLORS.success
        const Icon = ICONS[t.type] || TickCircle
        return (
          <div
            key={t.id}
            className="animate-slide-up"
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'var(--surface-3)', border: `1px solid ${border}`,
              borderRadius: 'var(--radius-full)',
              padding: '9px 16px', pointerEvents: 'auto',
              boxShadow: 'var(--shadow-lg)',
              whiteSpace: 'nowrap',
            }}
          >
            <Icon size={14} style={{ color, flexShrink: 0 }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{t.message}</span>
          </div>
        )
      })}
    </div>
  )
}
