import { useState } from 'react'
import { UserPlus, X, MoreHorizontal, Edit, Phone } from 'lucide-react'
import Layout from '../components/layout/Layout'

const roleConfig = {
  admin: { label: 'أدمن', class: 'bg-purple-100 text-purple-700' },
  manager: { label: 'مدير', class: 'bg-blue-100 text-blue-700' },
  cashier: { label: 'كاشير', class: 'bg-orange-100 text-orange-700' },
  kitchen: { label: 'مطبخ', class: 'bg-red-100 text-red-700' },
  delivery: { label: 'توصيل', class: 'bg-green-100 text-green-700' },
}

const statusConfig = {
  available: { label: 'متاح', class: 'text-green-600', dot: 'bg-green-500' },
  on_shift: { label: 'في وردية', class: 'text-blue-600', dot: 'bg-blue-500' },
  vacation: { label: 'إجازة', class: 'text-gray-500', dot: 'bg-gray-400' },
}

const initialStaff = [
  { id: 1, name: 'أحمد رضا', role: 'admin', status: 'on_shift', phone: '01012345678', initials: 'أر' },
  { id: 2, name: 'محمد حسين', role: 'manager', status: 'on_shift', phone: '01098765432', initials: 'مح' },
  { id: 3, name: 'سارة علي', role: 'cashier', status: 'available', phone: '01155443322', initials: 'سع' },
  { id: 4, name: 'كريم عبد الله', role: 'kitchen', status: 'on_shift', phone: '01234567890', initials: 'كع' },
  { id: 5, name: 'منى السيد', role: 'kitchen', status: 'available', phone: '01567891234', initials: 'من' },
  { id: 6, name: 'عمر خالد', role: 'delivery', status: 'vacation', phone: '01099887766', initials: 'عخ' },
]

const avatarColors = [
  'bg-orange-500',
  'bg-blue-500',
  'bg-purple-500',
  'bg-red-500',
  'bg-green-500',
  'bg-amber-500',
]

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
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50" dir="rtl">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <p className="font-bold text-gray-900">إضافة موظف جديد</p>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl text-gray-400">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">الاسم الكامل</label>
            <input
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="مثال: أحمد محمد"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">رقم الهاتف</label>
            <input
              required
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              placeholder="01XXXXXXXXX"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">الدور الوظيفي</label>
            <select
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
            >
              {Object.entries(roleConfig).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">كلمة المرور</label>
            <input
              required
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
              إلغاء
            </button>
            <button type="submit" className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-bold transition-colors">
              إضافة الموظف
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Staff() {
  const [staff, setStaff] = useState(initialStaff)
  const [showModal, setShowModal] = useState(false)

  function handleAdd(member) {
    setStaff(prev => [...prev, member])
  }

  return (
    <Layout title="الموظفون">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-gray-500 text-sm">{staff.length} موظف</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-sm transition-colors shadow-sm shadow-orange-200"
        >
          <UserPlus size={17} />
          إضافة موظف
        </button>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {staff.map((member, idx) => {
          const statusInfo = statusConfig[member.status]
          const roleInfo = roleConfig[member.role]
          const avatarColor = avatarColors[idx % avatarColors.length]

          return (
            <div key={member.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${avatarColor} rounded-2xl flex items-center justify-center text-white font-black text-base`}>
                    {member.initials}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{member.name}</p>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${roleInfo.class}`}>
                      {roleInfo.label}
                    </span>
                  </div>
                </div>
                <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreHorizontal size={17} />
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={14} className="text-gray-400" />
                  <span className="font-mono">{member.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className={`w-2 h-2 rounded-full ${statusInfo.dot}`} />
                  <span className={`font-semibold ${statusInfo.class}`}>{statusInfo.label}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-bold transition-colors">
                  <Edit size={13} />
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
