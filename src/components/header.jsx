
import { Search, Bell, UserCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-white">
          Dashboard
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Welcome back! Here's your productivity overview.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
          <Search size={18} className="text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            className="w-32 bg-transparent text-sm text-white outline-none placeholder:text-gray-500 sm:w-44"
          />
        </div>

        <button className="rounded-xl border border-white/10 bg-white/5 p-3 text-gray-300 hover:bg-white/10">
          <Bell size={19} />
        </button>

        <button className="rounded-xl border border-white/10 bg-white/5 p-3 text-gray-300">
          <UserCircle size={20} />
        </button>
      </div>
    </header>
  );
}
