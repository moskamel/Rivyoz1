/**
 * PageHeader — unified section title block used across all dashboard pages.
 * Renders title + optional subtitle on the right, and optional action slot on the left (RTL).
 */
export default function PageHeader({ title, sub, action, style = {} }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        gap: 12,
        flexWrap: 'wrap',
        ...style,
      }}
    >
      <div>
        <h2
          style={{
            fontSize: 15,
            fontWeight: 800,
            color: 'var(--text)',
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
          }}
        >
          {title}
        </h2>
        {sub && (
          <p style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 3, fontWeight: 500 }}>
            {sub}
          </p>
        )}
      </div>
      {action && <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>{action}</div>}
    </div>
  )
}
