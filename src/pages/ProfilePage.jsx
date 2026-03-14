import PremiumButton from '../components/PremiumButton'

function ProfilePage() {
  return (
    <section className="page stack-md">
      <header className="card">
        <p className="eyebrow">Member Profile</p>
        <h2>Alya S.</h2>
        <p className="muted">QLA Prestige Member</p>
      </header>

      <article className="card">
        <h3>Membership Benefits</h3>
        <ul className="benefits-list">
          <li>Priority booking slots</li>
          <li>Personalized longevity consultation</li>
          <li>Exclusive package pricing</li>
        </ul>
      </article>

      <article className="card">
        <h3>Settings</h3>
        <p className="muted">This prototype uses local-only data and no real authentication.</p>
        <PremiumButton fullWidth>Edit Preferences</PremiumButton>
      </article>
    </section>
  )
}

export default ProfilePage
