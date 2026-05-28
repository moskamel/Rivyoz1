import { useState } from 'react'
import { UserPlus, X, MoreHorizontal, Edit, Phone } from 'lucide-react'
import Layout from '../components/layout/Layout'
import { getStaff, setStaff } from '../lib/restaurantStore'

const roleConfig = {
  admin: { label: 'أدمن', bg: 'rgba(168,85,247,0.12)', color: '#A855F7' },
  manager: { label: 'مدير', bg: 'var(--blue-muted)', color: 'var(--blue)' },
  cashier: { label: 'كاشير', bg: 'var(--accent-muted)', color: 'var(--accent)' },
  kitchen: { label: 'مطبخ', bg: 'var(--red-muted)', color: 'var(--red)' },
  delivery: { label: 'توصيل', bg: 'var(--green-muted)', color: 'var(--green)' },
}

const statusConfig = {
  available: { label: 'متاح', color: 'var(--green)', dot: 'var(--green)' },
  on_shift: { label: 'في وردية', color: 'var(--blue)', dot: 'var(--blue)' },
  vacation: { label: 'إجازة', color: 'var(--text-3)', dot: 'var(--text-3)' },
}

const initialStaff = [
  { id: 1, name: 'أحمد رضا', role: 'admin', status: 'on_shift', phone: '01012345678', initials: 'أر' },
  { id: 2, name: 'محمد حسين', role: 'manager', status: 'on_shift', phone: '01098765432', initials: 'مح' },
  { id: 3, name: 'سارة علي', role: 'cashier', status: 'available', phone: '01155443322', initials: 'سع' },
  { id: 4, name: 'كريم عبد الله', role: 'kitchen', status: 'on_shift', phone: '01234567890', initials: 'كع' },
  { id: 5, name: 'منى السيد', role: 'kitchen', status: 'available', phone: '01567891234', initials: 'من' },
  { id: 6, name: 'عمر خالد', role: 'delivery', status: 'vacation', phone: '01099887766', initials: 'عخ' },
]

const avatarGradients = [
  'linear-gradient(135deg, #F97316, #EA6C10)',
  'linear-gradient(135deg, #3B82F6, #2563EB)',
  'linear-gradient(135deg, #A855F7, #9333EA)',
  'linear-gradient(135deg, #EF4444, #DC2626)',
  'linear-gradient(135deg, #22C55E, #16A34A)',
  'linear-gradient(135deg, #F59E0B, #D97706)',
]

const inputStyle = {
  width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--border)',
  background: 'var(--surface-2)', color: 'var(--text)', fontSize: 13, outline: 'none',
  fontFamily: 'Cairo, sans-serif', boxSizing: 'border-box',
}

function AddStaffModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name: '', phone: '', role: 'cashier', password: '' })

  function handleSubmit(e) {
    e.preventDefault()
    onAdd({ id: Date.now(), name: form.name, role: form.role, phone: form.phone, status: 'available', initials: form.name.slice(0, 2) })
    onClose()
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 16 }} dir="rtl">
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border-strong)', borderRadius: 20, width: '100%', maxWidth: 400 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 16 }}>إضافة موظف جديد</p>
          <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: 8, border: 'none', background: 'var(--surface-2)', color: 'var(--text-2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={14} />
          </button>
        </div>
        <form onSubmit={handleSubmit} style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { label: 'الاسم الكامل', key: 'name', type: 'text', placeholder: 'مثال: أحمد محمد' },
            { label: 'رقم الهاتف', key: 'phone', type: 'text', placeholder: '01XXXXXXXXX' },
          ].map(f => (
            <div key={f.key}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6 }}>{f.label}</label>
              <input required value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder} type={f.type} style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
          ))}
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6 }}>الدور الوظيفي</label>
            <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} style={{ ...inputStyle, appearance: 'none' }}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            >
              {Object.entries(roleConfig).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6 }}>كلمة المرور</label>
            <input required type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••••" style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>
          <div className="flex gap-3" style={{ paddingTop: 4 }}>
            <button type="button" onClick={onClose} style={{ flex: 1, padding: '11px', border: '1px solid var(--border)', borderRadius: 12, fontSize: 13, fontWeight: 700, color: 'var(--text-2)', background: 'transparent', cursor: 'pointer' }}>
              إلغاء
            </button>
            <button type="submit" style={{ flex: 1, padding: '11px', background: 'var(--accent)', color: 'white', borderRadius: 12, fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
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

  return (
    <Layout title="الموظفون">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--text-2)' }}>{staff.length} موظف</p>
        <button
          onClick={() => setShowModal(true)}
          style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px', background: 'var(--accent)', color: 'white', borderRadius: 10, fontWeight: 600, fontSize: 13, border: 'none', cursor: 'pointer' }}
        >
          <UserPlus size={15} />
          إضافة موظف
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {staff.map((member, idx) => {
          const statusInfo = statusConfig[member.status]
          const roleInfo = roleConfig[member.role]
          const gradient = avatarGradients[idx % avatarGradients.length]

          return (
            <div key={member.id} className="glass" style={{ padding: 20, transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                <div className="flex items-center gap-3">
                  <div style={{ width: 44, height: 44, background: gradient, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: 15 }}>
                    {member.initials}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>{member.name}</p>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 6, background: roleInfo.bg, color: roleInfo.color, display: 'inline-block', marginTop: 3 }}>
                      {roleInfo.label}
                    </span>
                  </div>
                </div>
                <button style={{ padding: 5, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-3)' }}>
                  <MoreHorizontal size={16} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div className="flex items-center gap-2">
                  <Phone size={13} style={{ color: 'var(--text-3)' }} />
                  <span className="num" style={{ fontSize: 12, color: 'var(--text-2)' }}>{member.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: statusInfo.dot, display: 'inline-block', boxShadow: `0 0 6px ${statusInfo.dot}` }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: statusInfo.color }}>{statusInfo.label}</span>
                </div>
              </div>

              <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', background: 'var(--surface-2)', color: 'var(--text-2)', borderRadius: 8, fontSize: 12, fontWeight: 600, border: '1px solid var(--border)', cursor: 'pointer' }}>
                  <Edit size={12} />
                  تعديل
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {showModal && <AddStaffModal onClose={() => setShowModal(false)} onAdd={handleAdd} />}
    </Layout>
  )
}
