import { useState } from 'react'
import { UserPlus, X, Trash2, Phone } from 'lucide-react'
import Layout from '../components/layout/Layout'
import { getStaff, setStaff } from '../lib/restaurantStore'

const roleConfig = {
  admin:    { label: 'أدمن',   avatarBg: 'rgba(168,85,247,0.12)',   avatarColor: '#A855F7',          badgeClass: 'badge-purple' },
  manager:  { label: 'مدير',   avatarBg: 'var(--accent-muted)',     avatarColor: 'var(--accent)',     badgeClass: 'badge-accent' },
  cashier:  { label: 'كاشير',  avatarBg: 'var(--blue-muted)',       avatarColor: 'var(--blue)',       badgeClass: 'badge-blue'   },
  kitchen:  { label: 'مطبخ',   avatarBg: 'var(--green-muted)',      avatarColor: 'var(--green)',      badgeClass: 'badge-green'  },
  delivery: { label: 'توصيل',  avatarBg: 'var(--yellow-muted)',     avatarColor: 'var(--yellow)',     badgeClass: 'badge-yellow' },
}

const statusConfig = {
  available: { label: 'متاح',     dotClass: 'active',  color: 'var(--green)'  },
  on_shift:  { label: 'في وردية', dotClass: 'live',    color: 'var(--blue)'   },
  vacation:  { label: 'إجازة',    dotClass: 'idle',    color: 'var(--text-3)' },
}

const initialStaff = [
  { id: 1, name: 'أحمد رضا',     role: 'admin',    status: 'on_shift', phone: '01012345678', initials: 'أر' },
  { id: 2, name: 'محمد حسين',    role: 'manager',  status: 'on_shift', phone: '01098765432', initials: 'مح' },
  { id: 3, name: 'سارة علي',     role: 'cashier',  status: 'available', phone: '01155443322', initials: 'سع' },
  { id: 4, name: 'كريم عبد الله',role: 'kitchen',  status: 'on_shift', phone: '01234567890', initials: 'كع' },
  { id: 5, name: 'منى السيد',    role: 'kitchen',  status: 'available', phone: '01567891234', initials: 'من' },
  { id: 6, name: 'عمر خالد',     role: 'delivery', status: 'vacation', phone: '01099887766', initials: 'عخ' },
]

const inputStyle = {
  width: '100%', height: 42, padding: '0 12px',
  borderRadius: 'var(--radius-md)', border: '1px solid var(--border)',
  background: 'var(--surface-2)', color: 'var(--text)',
  fontSize: 13, outline: 'none',
  fontFamily: 'Zain, sans-serif', boxSizing: 'border-box',
  transition: 'border-color var(--dur-normal) ease, box-shadow var(--dur-normal) ease',
}

function AddStaffModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name: '', phone: '', role: 'cashier', password: '' })

  function handleSubmit(e) {
    e.preventDefault()
    onAdd({
      id: Date.now(),
      name: form.name,
      role: form.role,
      phone: form.phone,
      status: 'available',
      initials: form.name.slice(0, 2),
    })
    onClose()
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 50, padding: 16,
      }}
      dir="rtl"
      className="animate-fade-in"
    >
      <div
        className="glass animate-scale-in"
        style={{
          width: '100%', maxWidth: 400,
          borderRadius: 'var(--radius-2xl)',
          border: '1px solid var(--border-strong)',
          overflow: 'hidden',
        }}
      >
        {/* Modal header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 20px', borderBottom: '1px solid var(--border)',
        }}>
          <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 16 }}>إضافة موظف جديد</p>
          <button className="btn-icon md" onClick={onClose}>
            <X size={14} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { label: 'الاسم الكامل', key: 'name',  type: 'text',     placeholder: 'مثال: أحمد محمد' },
            { label: 'رقم الهاتف',   key: 'phone', type: 'text',     placeholder: '01XXXXXXXXX'      },
          ].map(f => (
            <div key={f.key}>
              <label style={{
                display: 'block', fontSize: 11, fontWeight: 600,
                color: 'var(--text-2)', marginBottom: 6,
                textTransform: 'uppercase', letterSpacing: '0.04em',
              }}>
                {f.label}
              </label>
              <input
                required
                value={form[f.key]}
                onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                placeholder={f.placeholder}
                type={f.type}
                style={inputStyle}
                onFocus={e => {
                  e.target.style.borderColor = 'var(--accent)'
                  e.target.style.boxShadow = '0 0 0 3px var(--accent-muted)'
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'var(--border)'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </div>
          ))}

          <div>
            <label style={{
              display: 'block', fontSize: 11, fontWeight: 600,
              color: 'var(--text-2)', marginBottom: 6,
              textTransform: 'uppercase', letterSpacing: '0.04em',
            }}>
              الدور الوظيفي
            </label>
            <select
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
              style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
              onFocus={e => {
                e.target.style.borderColor = 'var(--accent)'
                e.target.style.boxShadow = '0 0 0 3px var(--accent-muted)'
              }}
              onBlur={e => {
                e.target.style.borderColor = 'var(--border)'
                e.target.style.boxShadow = 'none'
              }}
            >
              {Object.entries(roleConfig).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{
              display: 'block', fontSize: 11, fontWeight: 600,
              color: 'var(--text-2)', marginBottom: 6,
              textTransform: 'uppercase', letterSpacing: '0.04em',
            }}>
              كلمة المرور
            </label>
            <input
              required
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              style={inputStyle}
              onFocus={e => {
                e.target.style.borderColor = 'var(--accent)'
                e.target.style.boxShadow = '0 0 0 3px var(--accent-muted)'
              }}
              onBlur={e => {
                e.target.style.borderColor = 'var(--border)'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: 10, paddingTop: 4 }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-ghost"
              style={{ flex: 1, height: 44 }}
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="btn-primary"
              style={{ flex: 1, height: 44 }}
            >
              إضافة الموظف
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Staff() {
  const [staff, setStaffState] = useState(getStaff)
  const [showModal, setShowModal] = useState(false)

  const handleAdd = (member) => {
    const updated = [...staff, member]
    setStaffState(updated)
    setStaff(updated)
  }

  const handleDelete = (id) => {
    const updated = staff.filter(m => m.id !== id)
    setStaffState(updated)
    setStaff(updated)
  }

  return (
    <Layout title="الموظفون">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--text-2)' }}>
          <span className="num" style={{ color: 'var(--text)', fontWeight: 700 }}>{staff.length}</span> موظف
        </p>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <UserPlus size={15} />
          إضافة موظف
        </button>
      </div>

      {/* Staff grid */}
      {staff.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">👥</div>
          <p className="empty-title">لا يوجد موظفون</p>
          <p className="empty-desc">أضف أول موظف للبدء في إدارة فريق عملك</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }} className="stagger">
          {staff.map((member) => {
            const statusInfo = statusConfig[member.status] || statusConfig.available
            const roleInfo   = roleConfig[member.role]    || roleConfig.cashier

            return (
              <div
                key={member.id}
                className="glass-interactive"
                style={{ padding: 18 }}
              >
                {/* Top row: avatar + name + actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  {/* Avatar */}
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: roleInfo.avatarBg,
                    border: `1px solid ${roleInfo.avatarColor}33`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: roleInfo.avatarColor,
                    fontWeight: 800, fontSize: 18, flexShrink: 0,
                  }}>
                    {member.initials}
                  </div>

                  {/* Name + role */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', lineHeight: 1.3 }} className="truncate-1">
                      {member.name}
                    </p>
                    <span className={`badge badge-pill badge-sm ${roleInfo.badgeClass}`} style={{ marginTop: 4 }}>
                      {roleInfo.label}
                    </span>
                  </div>

                  {/* Delete action */}
                  <button
                    className="btn-icon sm"
                    onClick={() => handleDelete(member.id)}
                    title="حذف"
                    style={{ flexShrink: 0 }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'var(--red-muted)'
                      e.currentTarget.style.borderColor = 'rgba(248,113,113,0.30)'
                      e.currentTarget.style.color = 'var(--red)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'var(--surface-2)'
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.color = 'var(--text-2)'
                    }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

                {/* Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Phone size={12} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
                    <span className="num" style={{ fontSize: 12, color: 'var(--text-2)' }}>{member.phone}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span className={`status-dot ${statusInfo.dotClass}`} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: statusInfo.color }}>{statusInfo.label}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {showModal && <AddStaffModal onClose={() => setShowModal(false)} onAdd={handleAdd} />}
    </Layout>
  )
}
