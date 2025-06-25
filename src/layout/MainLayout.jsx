import { Outlet } from "react-router"
import NavBar from "../components/NavBar"

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
