import { NavLink } from 'react-router-dom'

const links = [
  { to: '/home', label: 'Home', icon: 'HM' },
  { to: '/services', label: 'Services', icon: 'SV' },
  { to: '/booking', label: 'Booking', icon: 'BK' },
  { to: '/history', label: 'History', icon: 'HS' },
  { to: '/profile', label: 'Profile', icon: 'PR' },
]

function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Primary">
      {links.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <span className="nav-icon" aria-hidden>
            {item.icon}
          </span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export default BottomNav
