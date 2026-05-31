import { useState } from 'react'
import { Add, CloseCircle, Trash, Edit2, Location, Call, Clock, SearchNormal1, ShoppingBag, DollarSquare, TrendUp, TrendDown, Flash } from 'iconsax-react'
import ConfirmDialog from '../components/ConfirmDialog'
import Layout from '../components/layout/Layout'
import { getBranches, setBranches, getOrdersByBranch } from '../lib/restaurantStore'
import { mockBranchStats } from '../lib/mock'
import { useBranch } from '../lib/BranchContext'

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
      dir="rtl" className="animate-fade-in"
    >
      <div className="glass animate-scale-in" style={{ width: '100%', maxWidth: 460, borderRadius: 'var(--radius-2xl)', border: '1px solid var(--border-strong)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', borderBottom: '1px solid var(--border)' }}>
          <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: 16 }}>{branch ? 'تعديل الفرع' : 'إضافة فرع جديد'}</p>
          <button className="btn-icon md" onClick={onClose}><CloseCircle size={14} /></button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>اسم الفرع *</label>
            <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="مثال: فرع المعادي"
              style={{ ...inputStyle, ...(errors.name ? { borderColor: 'var(--red)' } : {}) }} onFocus={focus} onBlur={blur} />
            {errors.name && <p style={{ color: 'var(--red)', fontSize: 11, marginTop: 4, fontWeight: 600 }}>{errors.name}</p>}
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-2)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>العنوان *</label>
            <input value={form.address} onChange={e => set('address', e.target.value)} placeholder="مثال: المعادي، شارع 9، القاهرة"
              style={{ ...inputStyle, ...(errors.address ? { borderColor: 'var(--red)' } : {}) }} onFocus={focus} onBlur={blur} />
            {errors.address && <p style={{ color: 'var(--red)', fontSize: 11, marginTop: 4, fontWeight: 600 }}>{errors.address}</p>}
          </div>
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

function BranchCard({ branch, onEdit, onDelete, onToggle, onSelect, isActive }) {
  const bs = mockBranchStats[branch.id] || { revenue: 0, orders: 0, avgOrder: 0, change: 0 }
  const branchOrders = getOrdersByBranch(branch.id)
  const activeOrders = branchOrders.filter(o => ['new','preparing','ready','delivering'].includes(o.status)).length

  return (
    <div
      className="glass"
      style={{
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        border: isActive ? '1px solid var(--border-accent)' : '1px solid var(--border)',
        background: isActive ? 'var(--accent-muted)' : 'var(--surface)',
        transition: 'all var(--dur-normal) var(--ease-default)',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Card header */}
      <div style={{ padding: '16px 18px 14px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 6 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{branch.name}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <span className={`status-dot ${branch.isOpen ? 'live' : 'idle'}`} />
              <span style={{ fontSize: 12, color: branch.isOpen ? 'var(--green)' : 'var(--text-3)', fontWeight: 600 }}>
                {branch.isOpen ? 'مفتوح' : 'مغلق'}
              </span>
              {activeOrders > 0 && (
                <span style={{ fontSize: 11, fontWeight: 700, padding: '1px 8px', borderRadius: 'var(--radius-full)', background: 'var(--red-muted)', color: 'var(--red)', border: '1px solid rgba(239,68,68,0.25)' }}>
                  {activeOrders} طلب نشط
                </span>
              )}
            </div>
          </div>
          {/* Toggle open/close */}
          <button
            onClick={() => onToggle(branch)}
            style={{
              flexShrink: 0, height: 30, padding: '0 12px', borderRadius: 'var(--radius-full)',
              background: branch.isOpen ? 'var(--red-muted)' : 'var(--green-muted)',
              color: branch.isOpen ? 'var(--red)' : 'var(--green)',
              border: branch.isOpen ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(34,197,94,0.3)',
              fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'Zain, sans-serif',
              transition: 'all 0.15s',
            }}
          >
            {branch.isOpen ? 'إغلاق' : 'فتح'}
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: '1px solid var(--border)' }}>
        {[
          { label: 'مبيعات اليوم', value: `${bs.revenue.toLocaleString()} ج`, color: 'var(--accent)', change: bs.change },
          { label: 'طلبات اليوم', value: bs.orders, color: 'var(--blue)' },
          { label: 'متوسط الطلب', value: `${bs.avgOrder} ج`, color: 'var(--green)' },
        ].map((s, i) => (
          <div key={i} style={{ padding: '12px 14px', borderRight: i < 2 ? '1px solid var(--border)' : 'none', textAlign: 'center' }}>
            <p className="num" style={{ fontSize: 16, fontWeight: 800, color: s.color, lineHeight: 1, marginBottom: 3 }}>{s.value}</p>
            <p style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Info + actions */}
      <div style={{ padding: '12px 18px', display: 'flex', flexDirection: 'column', gap: 7, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Location size={12} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
          <span style={{ fontSize: 12, color: 'var(--text-2)' }}>{branch.address}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Call size={12} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
            <span className="num" style={{ fontSize: 12, color: 'var(--text-2)' }}>{branch.phone}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Clock size={12} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
            <span className="num" style={{ fontSize: 12, color: 'var(--text-2)' }}>{branch.opensAt} – {branch.closesAt}</span>
          </div>
        </div>
        {branch.manager && (
          <p style={{ fontSize: 12, color: 'var(--text-3)' }}>
            المدير: <span style={{ color: 'var(--text-2)', fontWeight: 600 }}>{branch.manager}</span>
          </p>
        )}
      </div>

      {/* Card footer */}
      <div style={{ padding: '10px 18px', borderTop: '1px solid var(--border)', display: 'flex', gap: 8 }}>
        <button
          onClick={() => onSelect(branch)}
          style={{
            flex: 1, height: 36, borderRadius: 'var(--radius)', fontFamily: 'Zain, sans-serif',
            fontSize: 12, fontWeight: 700, cursor: 'pointer', border: 'none',
            background: isActive ? 'var(--accent)' : 'var(--surface-2)',
            color: isActive ? 'white' : 'var(--text-2)',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = 'var(--accent-muted)'; e.currentTarget.style.color = 'var(--accent)' } }}
          onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'var(--surface-2)'; e.currentTarget.style.color = 'var(--text-2)' } }}
        >
          {isActive ? '✓ محدد' : 'عرض البيانات'}
        </button>
        <button
          className="btn-icon sm"
          onClick={() => onEdit(branch)}
          title="تعديل"
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-muted)'; e.currentTarget.style.borderColor = 'rgba(249,115,22,0.3)'; e.currentTarget.style.color = 'var(--accent)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface-2)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-2)' }}
        >
          <Edit2 size={13} />
        </button>
        <button
          className="btn-icon sm"
          onClick={() => onDelete(branch.id)}
          title="حذف"
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--red-muted)'; e.currentTarget.style.borderColor = 'rgba(248,113,113,0.30)'; e.currentTarget.style.color = 'var(--red)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface-2)'; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-2)' }}
        >
          <Trash size={13} />
        </button>
      </div>
    </div>
  )
}

export default function Branches() {
  const [branches, setBranchesState] = useState(getBranches)
  const [search, setSearch]         = useState('')
  const [modal, setModal]           = useState(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)
  const { activeBranch, setActiveBranch } = useBranch()

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
    if (activeBranch?.id === id) setActiveBranch(null)
  }

  const toggle = (branch) => {
    const updated = branches.map(b => b.id === branch.id ? { ...b, isOpen: !b.isOpen } : b)
    setBranchesState(updated)
    setBranches(updated)
    if (activeBranch?.id === branch.id) setActiveBranch({ ...branch, isOpen: !branch.isOpen })
  }

  const filtered = branches.filter(b =>
    b.name.includes(search) || b.address.includes(search) || b.manager?.includes(search)
  )

  const openCount   = branches.filter(b => b.isOpen).length
  const closedCount = branches.length - openCount
  const totalRevenue = branches.reduce((s, b) => s + (mockBranchStats[b.id]?.revenue || 0), 0)
  const totalOrders  = branches.reduce((s, b) => s + (mockBranchStats[b.id]?.orders || 0), 0)

  return (
    <>
    <Layout title="الفروع">

      {/* Summary stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'إجمالي الفروع', value: branches.length, color: 'var(--accent)',  bg: 'var(--accent-muted)',  icon: '🏪' },
          { label: 'فروع مفتوحة',   value: openCount,       color: 'var(--green)',   bg: 'var(--green-muted)',   icon: '✅' },
          { label: 'مبيعات اليوم',  value: `${totalRevenue.toLocaleString()} ج`, color: 'var(--blue)', bg: 'var(--blue-muted)', icon: '💰' },
          { label: 'طلبات اليوم',   value: totalOrders,     color: 'var(--yellow)',  bg: 'var(--yellow-muted)', icon: '📦' },
        ].map((s, i) => (
          <div key={i} className="glass" style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
              {s.icon}
            </div>
            <div>
              <p className="num" style={{ fontSize: 22, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <p style={{ fontSize: 13, color: 'var(--text-2)' }}>
            <span className="num" style={{ color: 'var(--text)', fontWeight: 700 }}>{branches.length}</span> فرع
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--green)', fontWeight: 600 }}>
              <span className="status-dot live" />{openCount} مفتوح
            </span>
            {closedCount > 0 && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-3)', fontWeight: 600 }}>
                <span className="status-dot idle" />{closedCount} مغلق
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
              style={{ height: 40, width: 220, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '0 40px 0 14px', fontSize: 13, color: 'var(--text)', outline: 'none', fontFamily: 'Zain, sans-serif', transition: 'border-color var(--dur-normal) ease' }}
              onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-muted)' }}
              onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
            />
          </div>
          <button className="btn-primary" onClick={() => setModal('add')}>
            <Add size={15} /> إضافة فرع
          </button>
        </div>
      </div>

      {/* Branch cards grid */}
      {filtered.length === 0 ? (
        <div className="glass">
          <div className="empty-state">
            <div className="empty-icon">🏪</div>
            <p className="empty-title">لا يوجد فروع</p>
            <p className="empty-desc">أضف أول فرع لبدء إدارة مواقع مطعمك</p>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }} className="stagger">
          {filtered.map(branch => (
            <BranchCard
              key={branch.id}
              branch={branch}
              isActive={activeBranch?.id === branch.id}
              onEdit={b => setModal(b)}
              onDelete={id => setConfirmDeleteId(id)}
              onToggle={toggle}
              onSelect={b => setActiveBranch(activeBranch?.id === b.id ? null : b)}
            />
          ))}
        </div>
      )}

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
    </>
  )
}
