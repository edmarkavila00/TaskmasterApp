
import {
  CheckCircle2,
  Clock3,
  ListTodo,
  AlertCircle,
  Plus,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import StatCard from "../components/StatCard";

const weeklyData = [
  { day: "Mon", completed: 4 },
  { day: "Tue", completed: 6 },
  { day: "Wed", completed: 3 },
  { day: "Thu", completed: 8 },
  { day: "Fri", completed: 5 },
  { day: "Sat", completed: 9 },
  { day: "Sun", completed: 7 },
];

const upcomingTasks = [
  {
    title: "Finish React dashboard",
    category: "School",
    date: "Today",
    priority: "High",
  },
  {
    title: "Database project",
    category: "Work",
    date: "Tomorrow",
    priority: "Medium",
  },
  {
    title: "Review documentation",
    category: "Personal",
    date: "Nov 21",
    priority: "Low",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">

      {/* Statistics */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Tasks"
          value="24"
          description="All created tasks"
          icon={ListTodo}
          color="bg-violet-500/15 text-violet-400"
        />

        <StatCard
          title="Completed"
          value="16"
          description="Tasks successfully finished"
          icon={CheckCircle2}
          color="bg-emerald-500/15 text-emerald-400"
        />

        <StatCard
          title="In Progress"
          value="5"
          description="Currently being worked on"
          icon={Clock3}
          color="bg-blue-500/15 text-blue-400"
        />

        <StatCard
          title="Overdue"
          value="3"
          description="Tasks past their deadlines"
          icon={AlertCircle}
          color="bg-red-500/15 text-red-400"
        />

      </section>

      {/* Progress */}
      <section className="rounded-2xl border border-white/10 bg-[#1f2937] p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-white">
              Overall Progress
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              Keep up your productivity!
            </p>
          </div>

          <span className="text-2xl font-bold text-emerald-400">
            67%
          </span>
        </div>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-emerald-400"
            style={{ width: "67%" }}
          />
        </div>

        <p className="mt-3 text-xs text-gray-400">
          16 of 24 tasks completed
        </p>
      </section>

      {/* Chart and Tasks */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        <div className="rounded-2xl border border-white/10 bg-[#1f2937] p-6 xl:col-span-2">
          <h3 className="font-semibold text-white">
            Weekly Productivity
          </h3>

          <p className="mt-1 text-sm text-gray-400">
            Tasks completed this week
          </p>

          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient
                    id="completedGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#8b5cf6"
                      stopOpacity={0.4}
                    />
                    <stop
                      offset="95%"
                      stopColor="#8b5cf6"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  vertical={false}
                />

                <XAxis
                  dataKey="day"
                  stroke="#9ca3af"
                  tickLine={false}
                />

                <YAxis
                  stroke="#9ca3af"
                  tickLine={false}
                  allowDecimals={false}
                />

                <Tooltip
                  contentStyle={{
                    background: "#111827",
                    border: "1px solid #374151",
                    borderRadius: "12px",
                    color: "#fff",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="completed"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  fill="url(#completedGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#1f2937] p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">
              Upcoming Tasks
            </h3>

            <button className="text-xs text-violet-400 hover:text-violet-300">
              View all
            </button>
          </div>

          <div className="mt-5 space-y-5">
            {upcomingTasks.map((task) => (
              <div
                key={task.title}
                className="border-b border-white/5 pb-4 last:border-0"
              >
                <h4 className="text-sm font-medium text-white">
                  {task.title}
                </h4>

                <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs text-gray-400">
                    {task.category}
                  </span>

                  <span className="text-xs text-gray-400">
                    {task.date}
                  </span>
                </div>

                <span className={`mt-3 inline-block rounded-full px-3 py-1 text-xs ${
                  task.priority === "High"
                    ? "bg-red-500/15 text-red-400"
                    : task.priority === "Medium"
                    ? "bg-yellow-500/15 text-yellow-400"
                    : "bg-emerald-500/15 text-emerald-400"
                }`}>
                  {task.priority} Priority
                </span>
              </div>
            ))}
          </div>

          <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white transition hover:bg-violet-500">
            <Plus size={17} />
            Add New Task
          </button>
        </div>
      </section>
    </div>
  );
}
