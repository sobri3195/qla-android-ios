import { useEffect, useState } from 'react'
import BookingForm from '../components/BookingForm'
import BookingList from '../components/BookingList'
import { getBookings, saveBooking } from '../utils/storage'

function BookingPage() {
  const [bookings, setBookings] = useState([])
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    setBookings(getBookings())
  }, [])

  const handleCreateBooking = (payload) => {
    const booking = saveBooking(payload)
    setBookings((prev) => [booking, ...prev])
    setFeedback('Your booking has been confirmed.')
  }

  return (
    <section className="page stack-md">
      <header>
        <p className="eyebrow">Schedule</p>
        <h2>Booking</h2>
      </header>
      <BookingForm onSubmit={handleCreateBooking} />
      {feedback ? <p className="feedback">{feedback}</p> : null}
      <section className="stack-sm">
        <h3>Upcoming Sessions</h3>
        <BookingList bookings={bookings.slice(0, 3)} emptyMessage="No upcoming booking yet." />
      </section>
    </section>
  )
}

export default BookingPage
