const BOOKING_STORAGE_KEY = 'qla-bookings'
const SERVICE_STORAGE_KEY = 'qla-custom-services'

function readStorage(key) {
  const raw = localStorage.getItem(key)
  if (!raw) return []

  try {
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function writeStorage(key, payload) {
  localStorage.setItem(key, JSON.stringify(payload))
}

function createId(prefix = 'qla') {
  if (typeof globalThis.crypto !== 'undefined' && typeof globalThis.crypto.randomUUID === 'function') {
    return globalThis.crypto.randomUUID()
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function createTransactionCode() {
  return `TX-${Date.now().toString().slice(-8)}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`
}

export function getBookings() {
  return readStorage(BOOKING_STORAGE_KEY)
}

function writeBookings(bookings) {
  writeStorage(BOOKING_STORAGE_KEY, bookings)
}

export function saveBooking(payload) {
  const existing = getBookings()
  const booking = {
    id: createId('qla-booking'),
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

export function getCustomServices() {
  return readStorage(SERVICE_STORAGE_KEY)
}

function writeCustomServices(services) {
  writeStorage(SERVICE_STORAGE_KEY, services)
}

export function saveCustomService(payload) {
  const existing = getCustomServices()
  const service = {
    id: createId('qla-service'),
    createdAt: new Date().toISOString(),
    ...payload,
  }

  const updated = [service, ...existing]
  writeCustomServices(updated)
  return service
}

export function updateCustomService(id, updates) {
  const existing = getCustomServices()
  let updatedService = null

  const updated = existing.map((service) => {
    if (service.id !== id) return service

    updatedService = {
      ...service,
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    return updatedService
  })

  writeCustomServices(updated)
  return updatedService
}

export function deleteCustomService(id) {
  const existing = getCustomServices()
  const updated = existing.filter((service) => service.id !== id)
  writeCustomServices(updated)
  return updated
}
