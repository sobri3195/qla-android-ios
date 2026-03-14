import { NavLink } from 'react-router-dom'

const links = [
  { to: '/home', label: 'Home', icon: '⌂' },
  { to: '/services', label: 'Services', icon: '◈' },
  { to: '/booking', label: 'Booking', icon: '＋' },
  { to: '/history', label: 'History', icon: '◷' },
  { to: '/profile', label: 'Profile', icon: '◎' },
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
          <span aria-hidden>{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export default BottomNav
