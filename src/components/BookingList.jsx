function BookingList({ bookings, emptyMessage = 'No bookings yet.' }) {
  if (!bookings.length) {
    return <p className="empty-state">{emptyMessage}</p>
  }

  return (
    <section className="booking-list">
      {bookings.map((booking) => (
        <article key={booking.id} className="card booking-card">
          <div className="booking-head">
            <strong>{booking.service}</strong>
            <span>{booking.status}</span>
          </div>
          <p>{booking.fullName}</p>
          <p>
            {booking.date} • {booking.time}
          </p>
          {booking.note ? <p className="muted">{booking.note}</p> : null}
        </article>
      ))}
    </section>
  )
}

export default BookingList
