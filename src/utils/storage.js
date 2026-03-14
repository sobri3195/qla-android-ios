const STORAGE_KEY = 'qla-bookings'

export function getBookings() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []

  try {
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function createBookingId() {
  if (typeof globalThis.crypto !== 'undefined' && typeof globalThis.crypto.randomUUID === 'function') {
    return globalThis.crypto.randomUUID()
  }

  return `qla-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function saveBooking(payload) {
  const existing = getBookings()
  const booking = {
    id: createBookingId(),
    createdAt: new Date().toISOString(),
    status: 'Confirmed',
    ...payload,
  }

  const updated = [booking, ...existing]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))

  return booking
}
