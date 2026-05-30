/**
 * Confirm — unified destructive-action confirmation dialog.
 *
 * Usage:
 *   <Confirm
 *     open={confirm}
 *     title="حذف المنتج"
 *     message="هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع."
 *     confirmLabel="حذف"
 *     danger
 *     onConfirm={handleDelete}
 *     onCancel={() => setConfirm(false)}
 *   />
 */
export default function Confirm({ open, title, message, confirmLabel = 'تأكيد', cancelLabel = 'إلغاء', danger = false, onConfirm, onCancel }) {
  if (!open) return null

  return (
    <div
      onClick={onCancel}
      style={{
        position: 'fixed', inset: 0, zIndex: 300,
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
          width: '100%', maxWidth: 380,
          background: 'var(--surface)',
          border: '1px solid var(--border-strong)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          padding: '24px',
          animation: 'scaleInSpring 0.30s var(--ease-spring) both',
        }}
      >
        <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{title}</p>
        {message && (
          <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.65, marginBottom: 20 }}>{message}</p>
        )}
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={onCancel}
            className="btn-ghost"
            style={{ flex: 1, cursor: 'pointer' }}
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={danger ? 'btn-danger' : 'btn-primary'}
            style={{ flex: 1, cursor: 'pointer', fontWeight: 700 }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
