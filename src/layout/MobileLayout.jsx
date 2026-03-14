import { Outlet } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

function MobileLayout() {
  return (
    <div className="app-shell">
      <main className="page-content">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}

export default MobileLayout
