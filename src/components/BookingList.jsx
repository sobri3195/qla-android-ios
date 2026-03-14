function BookingList({ bookings, emptyMessage = 'No bookings yet.', onEdit, onDelete }) {
  if (!bookings.length) {
    return <p className="empty-state">{emptyMessage}</p>
  }

  return (
    <section className="booking-list stack-sm">
      {bookings.map((booking) => (
        <article key={booking.id} className="card booking-card">
          <div className="booking-head">
            <strong>{booking.service}</strong>
            <span className="booking-status">{booking.status}</span>
          </div>
          <p>{booking.fullName}</p>
          <p className="muted">
            {booking.date} • {booking.time}
          </p>
          <p className="muted">{booking.amount} • {booking.paymentMethod}</p>
          <p className="muted">Transaction: {booking.transactionCode}</p>
          <p className="muted">Payment: {booking.paymentStatus}</p>
          {booking.note ? <p className="muted">{booking.note}</p> : null}
          {booking.attachment ? (
            <img className="attachment-preview" src={booking.attachment} alt={`Attachment for ${booking.fullName}`} />
          ) : null}

          {onEdit || onDelete ? (
            <div className="booking-actions">
              {onEdit ? (
                <button type="button" className="text-button" onClick={() => onEdit(booking)}>
                  Edit
                </button>
              ) : null}
              {onDelete ? (
                <button type="button" className="text-button text-danger" onClick={() => onDelete(booking.id)}>
                  Delete
                </button>
              ) : null}
            </div>
          ) : null}
        </article>
      ))}
    </section>
  )
}

export default BookingList
