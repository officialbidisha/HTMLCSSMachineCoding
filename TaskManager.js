import React, { useState, useEffect } from "react";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [timerValue, setTimerValue] = useState(5); // Default timer value in seconds

  const handleAddTask = () => {
    if (taskText.trim() === "") return;
    const newTask = {
      text: taskText,
      isCompleted: false,
      timer: timerValue,
    };
    setTasks([...tasks, newTask]);
    setTaskText("");
    setTimerValue(5);
  };

  useEffect(() => {
    const timers = tasks.map((task, index) => {
      if (!task.isCompleted && task.timer > 0) {
        const intervalId = setInterval(() => {
          setTasks((prevTasks) =>
            prevTasks.map((t, i) =>
              i === index
                ? {
                    ...t,
                    timer: t.timer - 1,
                    isCompleted: t.timer - 1 === 0 ? true : t.isCompleted,
                  }
                : t
            )
          );
        }, 1000);

        return intervalId;
      }
      return null;
    });

    return () => {
      timers.forEach((id) => id && clearInterval(id));
    };
  }, [tasks]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Task Manager with Timer</h1>
      <div>
        <input
          type="text"
          value={taskText}
          placeholder="Enter task"
          onChange={(e) => setTaskText(e.target.value)}
        />
        <input
          type="number"
          value={timerValue}
          placeholder="Timer (seconds)"
          onChange={(e) => setTimerValue(Number(e.target.value))}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <ul style={{ marginTop: "20px", listStyle: "none", padding: 0 }}>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{
              textDecoration: task.isCompleted ? "line-through" : "none",
              margin: "10px 0",
            }}
          >
            <span>{task.text}</span>
            <span style={{ marginLeft: "10px", color: "gray" }}>
              {task.timer > 0
                ? ` - Time left: ${task.timer} seconds`
                : " - Completed"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
