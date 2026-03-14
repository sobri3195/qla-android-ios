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

function writeBookings(bookings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
}

function createBookingId() {
  if (typeof globalThis.crypto !== 'undefined' && typeof globalThis.crypto.randomUUID === 'function') {
    return globalThis.crypto.randomUUID()
  }

  return `qla-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function createTransactionCode() {
  return `TX-${Date.now().toString().slice(-8)}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`
}

export function saveBooking(payload) {
  const existing = getBookings()
  const booking = {
    id: createBookingId(),
    createdAt: new Date().toISOString(),
    status: 'Confirmed',
    paymentStatus: 'Paid',
    transactionCode: createTransactionCode(),
    ...payload,
  }

  const updated = [booking, ...existing]
  writeBookings(updated)

  return booking
}

export function updateBooking(id, updates) {
  const existing = getBookings()
  let updatedBooking = null

  const updated = existing.map((booking) => {
    if (booking.id !== id) return booking

    updatedBooking = {
      ...booking,
      ...updates,
      status: 'Updated',
      updatedAt: new Date().toISOString(),
    }

    return updatedBooking
  })

  writeBookings(updated)
  return updatedBooking
}

export function deleteBooking(id) {
  const existing = getBookings()
  const updated = existing.filter((booking) => booking.id !== id)
  writeBookings(updated)
  return updated
}
