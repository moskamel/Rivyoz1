import { useState } from 'react'
import { Add, CloseCircle, Trash, Edit2, Location, Call, Clock, SearchNormal1 } from 'iconsax-react'
import ConfirmDialog from '../components/ConfirmDialog'
import Layout from '../components/layout/Layout'
import { getBranches, setBranches } from '../lib/restaurantStore'

const inputStyle = {
  width: '100%', height: 42, padding: '0 12px',
  borderRadius: 'var(--radius-md)', border: '1px solid var(--border)',
  background: 'var(--surface-2)', color: 'var(--text)',
  fontSize: 13, outline: 'none', fontFamily: 'Zain, sans-serif', boxSizing: 'border-box',
  transition: 'border-color var(--dur-normal) ease, box-shadow var(--dur-normal) ease',
}
const focus = e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-muted)' }
const blur  = e => { e.target.style.borderColor = 'var(--border)';  e.target.style.boxShadow = 'none' }

const empty = { name: '', address: '', phone: '', manager: '', opensAt: '10:00', closesAt: '23:00', isOpen: true }

function BranchModal({ branch, onClose, onSave }) {
  const [form, setForm] = useState(branch ? { ...branch } : { ...empty })
  const [errors, setErrors] = useState({})

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })) }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim())    errs.name    = 'اسم الفرع مطلوب'
    if (!form.address.trim()) errs.address = 'العنوان مطلوب'
    if (!form.phone.trim())   errs.phone   = 'رقم الهاتف مطلوب'
    setErrors(errs)
    if (Object.keys(errs).length) return
    onSave(form)
    onClose()
  }

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: 16 }}
      dir="rtl"
      className="animate-fade-in"
    >
      <div className="glass animate-scale-in" style={{ width: '100%', maxWidth: 460, borderRadius: 'var(--radius-2xl)', border: '1px solid var(--border-strong)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 16 }}>{branch ? 'تعديل الفرع' : 'إضافة فرع جديد'}</p>
          <button className="btn-icon md" onClick={onClose}><CloseCircle size={14} /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Name */}
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>اسم الفرع *</label>
            <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="مثال: فرع المعادي"
              style={{ ...inputStyle, ...(errors.name ? { borderColor: 'var(--red)' } : {}) }} onFocus={focus} onBlur={blur} />
            {errors.name && <p style={{ color: 'var(--red)', fontSize: 11, marginTop: 4, fontWeight: 600 }}>{errors.name}</p>}
          </div>

          {/* Address */}
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>العنوان *</label>
            <input value={form.address} onChange={e => set('address', e.target.value)} placeholder="مثال: المعادي، شارع 9، القاهرة"
              style={{ ...inputStyle, ...(errors.address ? { borderColor: 'var(--red)' } : {}) }} onFocus={focus} onBlur={blur} />
            {errors.address && <p style={{ color: 'var(--red)', fontSize: 11, marginTop: 4, fontWeight: 600 }}>{errors.address}</p>}
          </div>

          {/* Phone + Manager */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>الهاتف *</label>
              <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="01XXXXXXXXX"
                style={{ ...inputStyle, ...(errors.phone ? { borderColor: 'var(--red)' } : {}) }} onFocus={focus} onBlur={blur} />
              {errors.phone && <p style={{ color: 'var(--red)', fontSize: 11, marginTop: 4, fontWeight: 600 }}>{errors.phone}</p>}
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>المدير</label>
              <input value={form.manager} onChange={e => set('manager', e.target.value)} placeholder="اسم المدير (اختياري)"
                style={inputStyle} onFocus={focus} onBlur={blur} />
            </div>
          </div>

          {/* Hours */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>وقت الفتح</label>
              <input type="time" value={form.opensAt} onChange={e => set('opensAt', e.target.value)}
                style={{ ...inputStyle, colorScheme: 'dark' }} onFocus={focus} onBlur={blur} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>وقت الإغلاق</label>
              <input type="time" value={form.closesAt} onChange={e => set('closesAt', e.target.value)}
                style={{ ...inputStyle, colorScheme: 'dark' }} onFocus={focus} onBlur={blur} />
            </div>
          </div>

          {/* Status toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 'var(--radius-md)', background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>الفرع مفتوح الآن</span>
            <button type="button" onClick={() => set('isOpen', !form.isOpen)}
              style={{ position: 'relative', width: 44, height: 24, borderRadius: 12, background: form.isOpen ? 'var(--green)' : 'var(--surface-3)', border: 'none', cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0 }}>
              <span style={{ position: 'absolute', top: 4, width: 16, height: 16, background: 'white', borderRadius: '50%', transition: 'all 0.2s', right: form.isOpen ? 4 : 'auto', left: form.isOpen ? 'auto' : 4 }} />
            </button>
          </div>

          <div style={{ display: 'flex', gap: 10, paddingTop: 4 }}>
            <button type="button" onClick={onClose} className="btn-ghost" style={{ flex: 1, height: 44 }}>إلغاء</button>
            <button type="submit" className="btn-primary" style={{ flex: 1, height: 44 }}>{branch ? 'حفظ التعديلات' : 'إضافة الفرع'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Branches() {
  const [branches, setBranchesState] = useState(getBranches)
  const [search, setSearch]         = useState('')
  const [modal, setModal]           = useState(null) // null | 'add' | branch-object
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)

  const save = (form) => {
    const updated = modal === 'add'
      ? [...branches, { ...form, id: Date.now() }]
      : branches.map(b => b.id === form.id ? form : b)
    setBranchesState(updated)
    setBranches(updated)
  }

  const remove = (id) => {
    const updated = branches.filter(b => b.id !== id)
    setBranchesState(updated)
    setBranches(updated)
  }

  const filtered = branches.filter(b =>
    b.name.includes(search) || b.address.includes(search) || b.manager?.includes(search)
  )

  const openCount   = branches.filter(b => b.isOpen).length
  const closedCount = branches.length - openCount

  return (
    <Layout title="الفروع">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <p style={{ fontSize: 13, color: 'var(--text-2)' }}>
            <span className="num" style={{ color: 'var(--text)', fontWeight: 700 }}>{branches.length}</span> فرع
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--green)', fontWeight: 600 }}>
              <span className="status-dot live" />
              {openCount} مفتوح
            </span>
            {closedCount > 0 && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-3)', fontWeight: 600 }}>
                <span className="status-dot idle" />
                {closedCount} مغلق
              </span>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ position: 'relative' }}>
            <SearchNormal1 size={14} style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-3)', pointerEvents: 'none' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="ابحث بالاسم أو العنوان..."
              style={{ height: 40, width: 220, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '0 40px 0 14px', fontSize: 13, color: 'var(--text)', outline: 'none', fontFamily: 'Zain, sans-serif', transition: 'border-color var(--dur-normal) ease, box-shadow var(--dur-normal) ease' }}
              onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-muted)' }}
              onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
            />
          </div>
          <button className="btn-primary" onClick={() => setModal('add')}>
            <Add size={15} /> إضافة فرع
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="glass" style={{ overflow: 'hidden' }}>
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🏪</div>
            <p className="empty-title">لا يوجد فروع</p>
            <p className="empty-desc">أضف أول فرع لبدء إدارة مواقع مطعمك</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="table-base">
              <thead>
                <tr>
                  {['الفرع', 'العنوان', 'الهاتف', 'المدير', 'أوقات العمل', 'الحالة', ''].map((h, i) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="stagger">
                {filtered.map(branch => (
                  <tr key={branch.id}>
                    {/* Name */}
                    <td style={{ padding: '12px 16px' }}>
                      <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 14 }}>{branch.name}</p>
                    </td>

                    {/* Address */}
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Location size={12} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
                        <span style={{ fontSize: 13, color: 'var(--text-2)' }}>{branch.address}</span>
                      </div>
                    </td>

                    {/* Phone */}
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Call size={12} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
                        <span className="num" style={{ fontSize: 13, color: 'var(--text-2)' }}>{branch.phone}</span>
                      </div>
                    </td>

                    {/* Manager */}
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontSize: 13, color: branch.manager ? 'var(--text-2)' : 'var(--text-3)' }}>
                        {branch.manager || '—'}
                      </span>
                    </td>

                    {/* Hours */}
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Clock size={12} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
                        <span className="num" style={{ fontSize: 13, color: 'var(--text-2)' }}>{branch.opensAt} – {branch.closesAt}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span className={`status-dot ${branch.isOpen ? 'live' : 'idle'}`} />
                        <span style={{ fontSize: 13, fontWeight: 600, color: branch.isOpen ? 'var(--green)' : 'var(--text-3)' }}>
                          {branch.isOpen ? 'مفتوح' : 'مغلق'}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
                        <button
                          className="btn-icon sm"
                          onClick={() => setModal(branch)}
                          title="تعديل"
                          onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-muted)'; e.currentTarget.style.borderColor = 'rgba(249,115,22,0.3)'; e.currentTarget.style.color = 'var(--accent)' }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface-2)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-2)' }}
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          className="btn-icon sm"
                          onClick={() => setConfirmDeleteId(branch.id)}
                          title="حذف"
                          onMouseEnter={e => { e.currentTarget.style.background = 'var(--red-muted)'; e.currentTarget.style.borderColor = 'rgba(248,113,113,0.30)'; e.currentTarget.style.color = 'var(--red)' }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface-2)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-2)' }}
                        >
                          <Trash size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal && (
        <BranchModal
          branch={modal === 'add' ? null : modal}
          onClose={() => setModal(null)}
          onSave={save}
        />
      )}
    </Layout>
    <ConfirmDialog
      open={confirmDeleteId !== null}
      title="حذف الفرع؟"
      message="سيتم حذف هذا الفرع نهائياً ولا يمكن التراجع."
      confirmLabel="احذف"
      onConfirm={() => { remove(confirmDeleteId); setConfirmDeleteId(null) }}
      onCancel={() => setConfirmDeleteId(null)}
    />
  )
}
