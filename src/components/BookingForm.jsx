import { useMemo, useState } from 'react'
import { serviceCategories } from '../data/mockData'
import PremiumButton from './PremiumButton'

const initialForm = {
  fullName: '',
  service: serviceCategories[0].title,
  date: '',
  time: '',
  note: '',
}

function BookingForm({ onSubmit }) {
  const [form, setForm] = useState(initialForm)

  const canSubmit = useMemo(
    () => form.fullName.trim() && form.service && form.date && form.time,
    [form],
  )

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!canSubmit) return

    onSubmit(form)
    setForm(initialForm)
  }

  return (
    <form className="card booking-form" onSubmit={handleSubmit}>
      <h2>Book Your Session</h2>
      <label>
        Full Name
        <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Enter your name" />
      </label>
      <label>
        Service Category
        <select name="service" value={form.service} onChange={handleChange}>
          {serviceCategories.map((item) => (
            <option key={item.id} value={item.title}>
              {item.title}
            </option>
          ))}
        </select>
      </label>
      <div className="split">
        <label>
          Date
          <input type="date" name="date" value={form.date} onChange={handleChange} />
        </label>
        <label>
          Time
          <input type="time" name="time" value={form.time} onChange={handleChange} />
        </label>
      </div>
      <label>
        Notes
        <textarea
          name="note"
          value={form.note}
          onChange={handleChange}
          rows={3}
          placeholder="Optional treatment preferences"
        />
      </label>
      <PremiumButton type="submit" fullWidth disabled={!canSubmit}>
        Confirm Booking
      </PremiumButton>
    </form>
  )
}

export default BookingForm
