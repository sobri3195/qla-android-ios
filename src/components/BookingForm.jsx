import { useEffect, useMemo, useState } from 'react'
import { serviceCategories } from '../data/mockData'
import PremiumButton from './PremiumButton'

const initialForm = {
  fullName: '',
  service: serviceCategories[0].title,
  date: '',
  time: '',
  paymentMethod: 'Credit Card',
  amount: serviceCategories[0].price,
  note: '',
  attachment: '',
}

function BookingForm({ onSubmit, editingBooking, onCancelEdit }) {
  const [form, setForm] = useState(initialForm)

  useEffect(() => {
    if (!editingBooking) {
      setForm(initialForm)
      return
    }

    setForm({
      fullName: editingBooking.fullName ?? '',
      service: editingBooking.service ?? serviceCategories[0].title,
      date: editingBooking.date ?? '',
      time: editingBooking.time ?? '',
      paymentMethod: editingBooking.paymentMethod ?? 'Credit Card',
      amount: editingBooking.amount ?? serviceCategories[0].price,
      note: editingBooking.note ?? '',
      attachment: editingBooking.attachment ?? '',
    })
  }, [editingBooking])

  const canSubmit = useMemo(
    () => form.fullName.trim() && form.service && form.date && form.time && form.amount,
    [form],
  )

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setForm((prev) => ({ ...prev, attachment: reader.result }))
      }
    }

    reader.readAsDataURL(file)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!canSubmit) return

    onSubmit(form)
    if (!editingBooking) {
      setForm(initialForm)
    }
  }

  return (
    <form className="card booking-form" onSubmit={handleSubmit}>
      <div className="row-between">
        <h2>{editingBooking ? 'Update Session' : 'Create Session'}</h2>
        {editingBooking ? (
          <button type="button" className="text-button" onClick={onCancelEdit}>
            Cancel
          </button>
        ) : null}
      </div>

      <label>
        Full Name
        <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Enter patient name" />
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

      <div className="split">
        <label>
          Payment Method
          <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
            <option>Credit Card</option>
            <option>Bank Transfer</option>
            <option>Corporate Billing</option>
          </select>
        </label>
        <label>
          Charge Amount
          <input name="amount" value={form.amount} onChange={handleChange} placeholder="IDR 1,000,000" />
        </label>
      </div>

      <label>
        Medical Note
        <textarea
          name="note"
          value={form.note}
          onChange={handleChange}
          rows={3}
          placeholder="Optional clinical preference or context"
        />
      </label>

      <label>
        Supporting Image (stored locally)
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </label>

      {form.attachment ? <img className="attachment-preview" src={form.attachment} alt="Uploaded reference" /> : null}

      <PremiumButton type="submit" fullWidth disabled={!canSubmit}>
        {editingBooking ? 'Save Changes' : 'Confirm & Simulate Transaction'}
      </PremiumButton>
    </form>
  )
}

export default BookingForm
