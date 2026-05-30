import { useState } from 'react'
import { UserAdd, CloseCircle, Trash, Call, SearchNormal1 } from 'iconsax-react'
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
  const [errors, setErrors] = useState({})

  const clearErr = (key) => setErrors(p => ({ ...p, [key]: '' }))

  function handleSubmit(e) {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim() || form.name.trim().length < 2) errs.name = 'الاسم مطلوب (حرفان على الأقل)'
    if (!form.phone.trim()) errs.phone = 'رقم الهاتف مطلوب'
    else if (!/^\d{10,15}$/.test(form.phone.replace(/[\s\-()]/g, ''))) errs.phone = 'رقم هاتف غير صحيح (10–15 رقم)'
    if (!form.password) errs.password = 'كلمة المرور مطلوبة'
    else if (form.password.length < 6) errs.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'
    setErrors(errs)
    if (Object.keys(errs).length) return
    onAdd({
      id: Date.now(),
      name: form.name.trim(),
      role: form.role,
      phone: form.phone.trim(),
      status: 'available',
      initials: form.name.trim().slice(0, 2),
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
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 20px', borderBottom: '1px solid var(--border)',
        }}>
          <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 16 }}>إضافة موظف جديد</p>
          <button className="btn-icon md" onClick={onClose}>
            <CloseCircle size={14} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { label: 'الاسم الكامل *', key: 'name',  type: 'text',     placeholder: 'مثال: أحمد محمد' },
            { label: 'رقم الهاتف *',   key: 'phone', type: 'text',     placeholder: '01XXXXXXXXX'      },
          ].map(f => (
            <div key={f.key}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {f.label}
              </label>
              <input
                value={form[f.key]}
                onChange={e => { setForm({ ...form, [f.key]: e.target.value }); clearErr(f.key) }}
                placeholder={f.placeholder}
                type={f.type}
                style={{ ...inputStyle, ...(errors[f.key] ? { borderColor: 'var(--red)' } : {}) }}
                onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-muted)' }}
                onBlur={e => { e.target.style.borderColor = errors[f.key] ? 'var(--red)' : 'var(--border)'; e.target.style.boxShadow = 'none' }}
              />
              {errors[f.key] && <p style={{ color: 'var(--red)', fontSize: 11, marginTop: 4, fontWeight: 600 }}>{errors[f.key]}</p>}
            </div>
          ))}

          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              الدور الوظيفي
            </label>
            <select
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
              style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
              onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-muted)' }}
              onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
            >
              {Object.entries(roleConfig).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              كلمة المرور *
            </label>
            <input
              type="password"
              value={form.password}
              onChange={e => { setForm({ ...form, password: e.target.value }); clearErr('password') }}
              placeholder="••••••••"
              style={{ ...inputStyle, ...(errors.password ? { borderColor: 'var(--red)' } : {}) }}
              onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-muted)' }}
              onBlur={e => { e.target.style.borderColor = errors.password ? 'var(--red)' : 'var(--border)'; e.target.style.boxShadow = 'none' }}
            />
            {errors.password && <p style={{ color: 'var(--red)', fontSize: 11, marginTop: 4, fontWeight: 600 }}>{errors.password}</p>}
          </div>

          <div style={{ display: 'flex', gap: 10, paddingTop: 4 }}>
            <button type="button" onClick={onClose} className="btn-ghost" style={{ flex: 1, height: 44 }}>إلغاء</button>
            <button type="submit" className="btn-primary" style={{ flex: 1, height: 44 }}>إضافة الموظف</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Staff() {
  const [staff, setStaffState] = useState(getStaff)
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch] = useState('')

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

  const filtered = staff.filter(m =>
    m.name.includes(search) || m.phone.includes(search)
  )

  return (
    <Layout title="الموظفون">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--text-2)' }}>
          <span className="num" style={{ color: 'var(--text)', fontWeight: 700 }}>{staff.length}</span> موظف
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ position: 'relative' }}>
            <SearchNormal1 size={14} style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)', pointerEvents: 'none' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="ابحث بالاسم أو الهاتف..."
              style={{
                height: 40, width: 220,
                background: 'var(--surface-2)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)', padding: '0 40px 0 14px',
                fontSize: 13, color: 'var(--text)', outline: 'none',
                fontFamily: 'Zain, sans-serif',
                transition: 'border-color var(--dur-normal) ease, box-shadow var(--dur-normal) ease',
              }}
              onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-muted)' }}
              onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
            />
          </div>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <UserAdd size={15} />
            إضافة موظف
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="glass" style={{ overflow: 'hidden' }}>
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <p className="empty-title">لا يوجد موظفون</p>
            <p className="empty-desc">أضف أول موظف للبدء في إدارة فريق عملك</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="table-base">
              <thead>
                <tr>
                  {['الموظف', 'الهاتف', 'الدور', 'الحالة', ''].map((h, i) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="stagger">
                {filtered.map((member) => {
                  const statusInfo = statusConfig[member.status] || statusConfig.available
                  const roleInfo   = roleConfig[member.role]    || roleConfig.cashier
                  return (
                    <tr key={member.id}>
                      {/* Name + avatar */}
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{
                            width: 36, height: 36, borderRadius: '50%',
                            background: roleInfo.avatarBg,
                            border: `1px solid ${roleInfo.avatarColor}33`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: roleInfo.avatarColor, fontWeight: 800, fontSize: 14, flexShrink: 0,
                          }}>
                            {member.initials}
                          </div>
                          <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: 14 }}>{member.name}</span>
                        </div>
                      </td>

                      {/* Phone */}
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Call size={12} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
                          <span className="num" style={{ fontSize: 13, color: 'var(--text-2)' }}>{member.phone}</span>
                        </div>
                      </td>

                      {/* Role badge */}
                      <td style={{ padding: '12px 16px' }}>
                        <span className={`badge badge-pill badge-sm ${roleInfo.badgeClass}`}>{roleInfo.label}</span>
                      </td>

                      {/* Status */}
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span className={`status-dot ${statusInfo.dotClass}`} />
                          <span style={{ fontSize: 13, fontWeight: 600, color: statusInfo.color }}>{statusInfo.label}</span>
                        </div>
                      </td>

                      {/* Delete */}
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <button
                          className="btn-icon sm"
                          onClick={() => handleDelete(member.id)}
                          title="حذف"
                          onMouseEnter={e => { e.currentTarget.style.background = 'var(--red-muted)'; e.currentTarget.style.borderColor = 'rgba(248,113,113,0.30)'; e.currentTarget.style.color = 'var(--red)' }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface-2)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-2)' }}
                        >
                          <Trash size={13} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && <AddStaffModal onClose={() => setShowModal(false)} onAdd={handleAdd} />}
    </Layout>
  )
}

