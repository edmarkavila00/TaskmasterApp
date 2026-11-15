import { useState, useEffect } from "react";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [taskText, setTaskText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("Personal");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!taskText.trim()) return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      dueDate,
      category,
    };

    setTasks([...tasks, newTask]);
    setTaskText("");
    setDueDate("");
    setCategory("Personal");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks
    .filter((task) =>
      task.text.toLowerCase().includes(search.toLowerCase())
    )
    .filter((task) => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    });

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const progress =
    tasks.length === 0
      ? 0
      : (completedTasks / tasks.length) * 100;

  const colors = {
    Work: "#3b82f6",
    School: "#10b981",
    Personal: "#f59e0b",
    Shopping: "#ef4444",
  };

  const styles = {
    app: {
      minHeight: "100vh",
      padding: "20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: darkMode
        ? "linear-gradient(135deg,#141e30,#243b55)"
        : "linear-gradient(135deg,#667eea,#764ba2)",
      transition: "0.4s",
      fontFamily: "Segoe UI, sans-serif",
    },

    container: {
      width: "100%",
      maxWidth: "900px",
      background: darkMode
        ? "rgba(0,0,0,0.3)"
        : "rgba(255,255,255,0.15)",
      backdropFilter: "blur(15px)",
      borderRadius: "20px",
      padding: "25px",
      color: "white",
      boxShadow: "0 10px 30px rgba(0,0,0,.2)",
      animation: "fadeIn .5s ease",
    },

    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "10px",
    },

    button: {
      padding: "12px",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      background: "#4f46e5",
      color: "white",
      fontWeight: "bold",
    },

    input: {
      padding: "12px",
      borderRadius: "10px",
      border: "none",
      width: "100%",
    },

    taskCard: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px",
      marginTop: "12px",
      borderRadius: "12px",
      background: "rgba(255,255,255,.15)",
      gap: "10px",
      flexWrap: "wrap",
    },
  };

  return (
    <div style={styles.app}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1>🚀 TaskMaster Pro</h1>

          <button
            style={styles.button}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>
        </div>

        <p>
          Portfolio Task Manager with Categories,
          Search, Progress Tracking & Local Storage
        </p>

        <div style={{ marginTop: "20px" }}>
          <h4>Progress</h4>

          <div
            style={{
              height: "12px",
              background: "#ddd",
              borderRadius: "999px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "#22c55e",
                transition: ".4s",
              }}
            />
          </div>

          <p style={{ marginTop: "5px" }}>
            {completedTasks}/{tasks.length} Completed
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <input
            style={styles.input}
            type="text"
            placeholder="Enter task"
            value={taskText}
            onChange={(e) =>
              setTaskText(e.target.value)
            }
          />

          <input
            style={styles.input}
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(e.target.value)
            }
          />

          <select
            style={styles.input}
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option>Work</option>
            <option>School</option>
            <option>Personal</option>
            <option>Shopping</option>
          </select>

          <button
            style={styles.button}
            onClick={addTask}
          >
            Add Task
          </button>
        </div>

        <div style={{ marginTop: "20px" }}>
          <input
            style={styles.input}
            type="text"
            placeholder="🔍 Search..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginTop: "15px",
          }}
        >
          <button
            style={styles.button}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            style={styles.button}
            onClick={() => setFilter("active")}
          >
            Active
          </button>

          <button
            style={styles.button}
            onClick={() =>
              setFilter("completed")
            }
          >
            Completed
          </button>
        </div>

        <h3 style={{ marginTop: "20px" }}>
          📋 Total Tasks: {tasks.length}
        </h3>

        {filteredTasks.map((task) => (
          <div
            key={task.id}
            style={styles.taskCard}
          >
            <div style={{ flex: 1 }}>
              <h4
                onClick={() =>
                  toggleTask(task.id)
                }
                style={{
                  cursor: "pointer",
                  textDecoration:
                    task.completed
                      ? "line-through"
                      : "none",
                }}
              >
                {task.text}
              </h4>

              <p>
                📅{" "}
                {task.dueDate || "No Due Date"}
              </p>

              <span
                style={{
                  background:
                    colors[task.category],
                  color: "white",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontSize: "12px",
                }}
              >
                {task.category}
              </span>
            </div>

            <button
              onClick={() =>
                deleteTask(task.id)
              }
              style={{
                ...styles.button,
                background: "#dc2626",
              }}
            >
              Delete
            </button>
          </div>
        ))}

        {tasks.length > 0 &&
          completedTasks === tasks.length && (
            <div
              style={{
                marginTop: "20px",
                textAlign: "center",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              🎉 All Tasks Completed!
            </div>
          )}
      </div>
    </div>
  );
}