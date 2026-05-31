const VALID_ROLES = ['owner', 'manager', 'cashier', 'kitchen', 'delivery']
const SESSION_KEY = 'rivyo_session'
const SESSION_TTL = 24 * 60 * 60 * 1000

function generateToken() {
  try {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
    const bytes = new Uint8Array(16)
    crypto.getRandomValues(bytes)
    return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('')
  } catch {
    return Math.random().toString(36).slice(2) + Date.now().toString(36)
  }
}

export function createSession(role) {
  if (!VALID_ROLES.includes(role)) return null
  const session = {
    token: generateToken(),
    role,
    createdAt: Date.now(),
    expiresAt: Date.now() + SESSION_TTL,
  }
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    localStorage.setItem('auth_role', role)
  } catch { /* storage full */ }
  return session
}

export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (raw) {
      const s = JSON.parse(raw)
      if (s?.token && VALID_ROLES.includes(s.role) && Date.now() < s.expiresAt) return s
      localStorage.removeItem(SESSION_KEY)
      return null
    }
    // Migrate legacy auth_role to proper session
    const legacyRole = localStorage.getItem('auth_role')
    if (legacyRole && VALID_ROLES.includes(legacyRole)) return createSession(legacyRole)
    return null
  } catch {
    return null
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(SESSION_KEY)
    localStorage.removeItem('auth_role')
  } catch { /* ignore */ }
}

export function getRole() {
  return getSession()?.role ?? null
}

export function isAuthenticated() {
  return getSession() !== null
}

export const ROLE_PERMISSIONS = {
  owner:    ['*'],
  manager:  ['orders', 'menu', 'customers', 'reports', 'staff', 'inventory', 'reviews'],
  cashier:  ['orders', 'menu', 'customers'],
  kitchen:  ['orders'],
  delivery: ['orders'],
}

export function hasPermission(role, resource) {
  const perms = ROLE_PERMISSIONS[role] || []
  return perms.includes('*') || perms.includes(resource)
}
