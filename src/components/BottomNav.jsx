import { NavLink } from 'react-router-dom'

const links = [
  {
    to: '/home',
    label: 'Home',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M3 10.4 12 3l9 7.4v9.6a1 1 0 0 1-1 1h-5.5v-6h-5v6H4a1 1 0 0 1-1-1z" />
      </svg>
    ),
  },
  {
    to: '/services',
    label: 'Services',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M10.6 4.2a2 2 0 0 1 2.8 0l6.4 6.4a2 2 0 0 1 0 2.8l-6.4 6.4a2 2 0 0 1-2.8 0l-6.4-6.4a2 2 0 0 1 0-2.8z" />
      </svg>
    ),
  },
  {
    to: '/booking',
    label: 'Booking',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M7 2v2H5a2 2 0 0 0-2 2v13a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2zM5 10h14v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" />
      </svg>
    ),
  },
  {
    to: '/history',
    label: 'History',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M12 4a8 8 0 1 1-7.7 10.4h2.2A6 6 0 1 0 12 6v2l4-3.5L12 1z" />
        <path d="M11 8h2v5h4v2h-6z" />
      </svg>
    ),
  },
  {
    to: '/profile',
    label: 'Profile',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5z" />
      </svg>
    ),
  },
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
