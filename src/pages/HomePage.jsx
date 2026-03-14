import TopBrandHeader from '../components/TopBrandHeader'
import { featuredPrograms, serviceCategories } from '../data/mockData'
import PremiumButton from '../components/PremiumButton'
import ServiceCard from '../components/ServiceCard'

function HomePage() {
  return (
    <section className="page stack-lg">
      <TopBrandHeader />

      <section className="stack-md">
        <h2>Featured Programs</h2>
        {featuredPrograms.map((program) => (
          <article key={program.id} className="card premium-card">
            <p className="eyebrow">Signature Package</p>
            <h3>{program.name}</h3>
            <p>{program.subtitle}</p>
            <strong>{program.price}</strong>
          </article>
        ))}
      </section>

      <section className="stack-md">
        <div className="row-between">
          <h2>Top Services</h2>
          <PremiumButton>Explore</PremiumButton>
        </div>
        {serviceCategories.slice(0, 3).map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </section>
    </section>
  )
}

export default HomePage
