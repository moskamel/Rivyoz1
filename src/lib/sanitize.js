export function sanitizeText(input) {
  if (typeof input !== 'string') return ''
  return input.trim().replace(/[<>]/g, '')
}

export function sanitizePhone(input) {
  if (typeof input !== 'string') return ''
  return input.replace(/[^0-9+\s\-()]/g, '').slice(0, 20)
}

export function sanitizeInteger(input, min = 0, max = Number.MAX_SAFE_INTEGER) {
  const n = parseInt(input, 10)
  if (isNaN(n)) return min
  return Math.min(max, Math.max(min, n))
}

export function sanitizePrice(input) {
  const n = parseFloat(input)
  if (isNaN(n) || n < 0) return 0
  return Math.round(n * 100) / 100
}
