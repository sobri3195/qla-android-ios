import TopBrandHeader from '../components/TopBrandHeader'
import { featuredPrograms, serviceCategories } from '../data/mockData'
import PremiumButton from '../components/PremiumButton'
import ServiceCard from '../components/ServiceCard'

function HomePage() {
  return (
    <section className="page stack-lg">
      <TopBrandHeader />

      <section className="stack-md">
        <div className="row-between section-head">
          <div>
            <p className="eyebrow">Curated Care Plans</p>
            <h2>Featured Programs</h2>
          </div>
          <PremiumButton>View All</PremiumButton>
        </div>

        {featuredPrograms.map((program) => (
          <article key={program.id} className="card premium-card program-card">
            <div className="row-between">
              <p className="program-badge">{program.badge}</p>
              <p className="muted">Program</p>
            </div>
            <h3>{program.name}</h3>
            <p className="muted">{program.subtitle}</p>
            <ul className="program-highlights">
              {program.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="price-row">
              <strong>{program.price}</strong>
              <span>{program.oldPrice}</span>
            </div>
          </article>
        ))}
      </section>

      <section className="stack-md">
        <div className="row-between section-head">
          <div>
            <p className="eyebrow">Clinical Services</p>
            <h2>Services</h2>
          </div>
          <p className="muted">Trusted by QLA members</p>
        </div>
        {serviceCategories.slice(0, 3).map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </section>
    </section>
  )
}

export default HomePage
