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

export function saveBooking(payload) {
  const existing = getBookings()
  const booking = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: 'Confirmed',
    ...payload,
  }

  const updated = [booking, ...existing]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))

  return booking
}
