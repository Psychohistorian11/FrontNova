import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";
import { NavbarHome } from "./NavbarHome";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <main className="flex flex-col flex-1 bg-fixed bg-gradient-to-b from-white via-teal-50 via-70% to-teal-100">
        <Outlet />
      </main>
    </div>
  )
}
