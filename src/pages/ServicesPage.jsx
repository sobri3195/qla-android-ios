import { useEffect, useMemo, useState } from 'react'
import ServiceCard from '../components/ServiceCard'
import { serviceCategories } from '../data/mockData'
import {
  deleteCustomService,
  getCustomServices,
  saveCustomService,
  updateCustomService,
} from '../utils/storage'

const initialForm = {
  title: '',
  description: '',
  price: '',
}

function ServicesPage() {
  const [customServices, setCustomServices] = useState([])
  const [editingId, setEditingId] = useState('')
  const [form, setForm] = useState(initialForm)
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    setCustomServices(getCustomServices())
  }, [])

  const isEditing = useMemo(() => Boolean(editingId), [editingId])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setForm(initialForm)
    setEditingId('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      price: form.price.trim(),
    }

    if (!payload.title || !payload.description || !payload.price) {
      setFeedback('Semua field custom service wajib diisi.')
      return
    }

    if (isEditing) {
      const updated = updateCustomService(editingId, payload)
      if (updated) {
        setCustomServices((prev) => prev.map((service) => (service.id === updated.id ? updated : service)))
        setFeedback('Custom service berhasil di-update di local storage.')
      }
      resetForm()
      return
    }

    const created = saveCustomService(payload)
    setCustomServices((prev) => [created, ...prev])
    setFeedback('Custom service baru berhasil disimpan di local storage.')
    resetForm()
  }

  const handleEdit = (service) => {
    setEditingId(service.id)
    setForm({
      title: service.title,
      description: service.description,
      price: service.price,
    })
    setFeedback('Mode edit aktif. Ubah data lalu klik Update Service.')
  }

  const handleDelete = (id) => {
    setCustomServices(deleteCustomService(id))
    if (editingId === id) {
      resetForm()
    }
    setFeedback('Custom service dihapus dari local storage.')
  }

  return (
    <section className="page stack-md">
      <header className="hero-panel">
        <p className="eyebrow">Clinical Expertise</p>
        <h2>Service Portfolio</h2>
        <p className="muted">Pilih layanan premium dan kelola custom service langsung di perangkat Anda.</p>
      </header>

      {serviceCategories.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}

      <section className="card stack-sm">
        <div className="row-between">
          <h3>Custom Service (CRUD Local)</h3>
          {isEditing ? (
            <button className="text-button" type="button" onClick={resetForm}>
              Batal Edit
            </button>
          ) : null}
        </div>

        <form className="booking-form" onSubmit={handleSubmit}>
          <label htmlFor="title">
            Nama Layanan
            <input
              id="title"
              name="title"
              placeholder="contoh: Executive Nutrition Audit"
              value={form.title}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="description">
            Deskripsi
            <textarea
              id="description"
              name="description"
              placeholder="jelaskan benefit layanan"
              rows={3}
              value={form.description}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="price">
            Harga
            <input
              id="price"
              name="price"
              placeholder="contoh: Rp 1.250.000"
              value={form.price}
              onChange={handleChange}
            />
          </label>

          <button className="premium-button" type="submit">
            {isEditing ? 'Update Service' : 'Tambah Service'}
          </button>
        </form>

        {feedback ? <p className="feedback">{feedback}</p> : null}

        <div className="stack-sm">
          {customServices.length ? (
            customServices.map((service) => (
              <article key={service.id} className="card custom-service-card">
                <div className="booking-head">
                  <h3>{service.title}</h3>
                  <span className="service-price">{service.price}</span>
                </div>
                <p className="muted">{service.description}</p>
                <div className="booking-actions">
                  <button className="text-button" type="button" onClick={() => handleEdit(service)}>
                    Edit
                  </button>
                  <button className="text-button text-danger" type="button" onClick={() => handleDelete(service.id)}>
                    Hapus
                  </button>
                </div>
              </article>
            ))
          ) : (
            <p className="empty-state">Belum ada custom service.</p>
          )}
        </div>
      </section>
    </section>
  )
}

export default ServicesPage
