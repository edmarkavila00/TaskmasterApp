
import {
  LayoutDashboard,
  CheckSquare,
  CalendarDays,
  KanbanSquare,
  ChartNoAxesCombined,
  Settings,
  LogOut,
  Zap,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "My Tasks", icon: CheckSquare },
  { name: "Calendar", icon: CalendarDays },
  { name: "Kanban Board", icon: KanbanSquare },
  { name: "Analytics", icon: ChartNoAxesCombined },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-20 flex h-screen w-64 flex-col border-r border-white/10 bg-[#111827] p-5 text-white">
      <div className="mb-10 flex items-center gap-3">
        <div className="rounded-xl bg-violet-600 p-2">
          <Zap size={24} />
        </div>

        <div>
          <h1 className="text-lg font-bold">
            TaskMaster
          </h1>
          <p className="text-xs text-gray-400">
            Productivity Pro
          </p>
        </div>
      </div>

      <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
        Workspace
      </p>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                index === 0
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={19} />
              {item.name}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-white/10 pt-4">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-400 hover:bg-white/5 hover:text-white">
          <Settings size={19} />
          Settings
        </button>

        <button className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-400 hover:bg-red-500/10">
          <LogOut size={19} />
          Logout
        </button>
      </div>
    </aside>
  );
}
