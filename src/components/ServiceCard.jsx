function ServiceCard({ service }) {
  return (
    <article className="card service-card">
      <span className="service-icon" aria-hidden>
        {service.icon}
      </span>
      <div>
        <h3>{service.title}</h3>
        <p>{service.description}</p>
      </div>
    </article>
  )
}

export default ServiceCard
