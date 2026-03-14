import { useEffect, useState } from 'react'
import BookingForm from '../components/BookingForm'
import BookingList from '../components/BookingList'
import { deleteBooking, getBookings, saveBooking, updateBooking } from '../utils/storage'

function BookingPage() {
  const [bookings, setBookings] = useState([])
  const [feedback, setFeedback] = useState('')
  const [editingBooking, setEditingBooking] = useState(null)

  useEffect(() => {
    setBookings(getBookings())
  }, [])

  const handleCreateBooking = (payload) => {
    if (editingBooking) {
      const updated = updateBooking(editingBooking.id, payload)
      if (updated) {
        setBookings((prev) => prev.map((booking) => (booking.id === updated.id ? updated : booking)))
        setFeedback('Session updated and transaction record refreshed.')
      }
      setEditingBooking(null)
      return
    }

    const booking = saveBooking(payload)
    setBookings((prev) => [booking, ...prev])
    setFeedback(`Session confirmed. Simulated transaction ${booking.transactionCode} completed.`)
  }

  const handleDelete = (id) => {
    const updated = deleteBooking(id)
    setBookings(updated)
    setFeedback('Session deleted from local storage.')
    if (editingBooking?.id === id) {
      setEditingBooking(null)
    }
  }

  return (
    <section className="page stack-md">
      <header>
        <p className="eyebrow">Scheduling</p>
        <h2>Booking & Transactions</h2>
      </header>
      <BookingForm
        onSubmit={handleCreateBooking}
        editingBooking={editingBooking}
        onCancelEdit={() => setEditingBooking(null)}
      />
      {feedback ? <p className="feedback">{feedback}</p> : null}
      <section className="stack-sm">
        <h3>Patient Sessions</h3>
        <BookingList
          bookings={bookings}
          emptyMessage="No session records yet."
          onEdit={setEditingBooking}
          onDelete={handleDelete}
        />
      </section>
    </section>
  )
}

export default BookingPage
