
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-[#111827]">
      <Sidebar />

      <main className="min-h-screen px-5 py-7 md:ml-64 md:px-8">
        <Header />
        <Dashboard />
      </main>
    </div>
  );
}
