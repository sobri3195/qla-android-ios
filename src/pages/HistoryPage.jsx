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
        <p className="eyebrow">Archive</p>
        <h2>History</h2>
        <p className="muted">All your dummy bookings stored in localStorage.</p>
      </header>
      <BookingList bookings={bookings} emptyMessage="No records yet." />
    </section>
  )
}

export default HistoryPage
