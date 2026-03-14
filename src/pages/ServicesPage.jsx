import ServiceCard from '../components/ServiceCard'
import { serviceCategories } from '../data/mockData'

function ServicesPage() {
  return (
    <section className="page stack-md">
      <header>
        <p className="eyebrow">Clinical Expertise</p>
        <h2>Service Portfolio</h2>
        <p className="muted">Designed to support prevention, optimization, and graceful aging with medical rigor.</p>
      </header>
      {serviceCategories.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </section>
  )
}

export default ServicesPage
