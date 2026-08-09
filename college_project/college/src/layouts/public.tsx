import { Outlet } from "react-router";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";
import '../../assets/index.css'

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-800">
      
      <Navbar />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />

    </div>
  );
}