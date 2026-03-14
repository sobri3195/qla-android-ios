function ServiceCard({ service }) {
  return (
    <article className="card service-card">
      <span className="service-icon" aria-hidden>
        {service.icon}
      </span>
      <div className="stack-sm service-content">
        <div className="row-between">
          <h3>{service.title}</h3>
          <p className="service-price">{service.price}</p>
        </div>
        <p>{service.description}</p>
        <p className="muted">Typical duration: {service.duration}</p>
      </div>
    </article>
  )
}

export default ServiceCard
