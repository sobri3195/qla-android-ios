import { useEffect, useState } from 'react'
import BookingList from '../components/BookingList'
import { getBookings } from '../utils/storage'

function HistoryPage() {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    setBookings(getBookings())
  }, [])

  return (
    <section className="page stack-md">
      <header>
        <p className="eyebrow">Records</p>
        <h2>Session History</h2>
        <p className="muted">All simulated booking and transaction records are stored in local storage.</p>
      </header>
      <BookingList bookings={bookings} emptyMessage="No records yet." />
    </section>
  )
}

export default HistoryPage
