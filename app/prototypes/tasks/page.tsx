"use client";

import { useState } from "react";
import styles from "./styles.module.css";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  isNew: boolean;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [completingId, setCompletingId] = useState<number | null>(null);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const task: Task = {
      id: Date.now(),
      title: newTaskTitle.trim(),
      completed: false,
      isNew: true,
    };

    setTasks((prev) => [...prev, task]);
    setNewTaskTitle("");

    setTimeout(() => {
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, isNew: false } : t))
      );
    }, 400);
  };

  const toggleTask = (taskId: number) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task && !task.completed) {
      setCompletingId(taskId);
      setTimeout(() => setCompletingId(null), 320);
    }
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (taskId: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const pendingCount = tasks.filter((t) => !t.completed).length;
  const hasTasks = tasks.length > 0;

  return (
    <div className={styles.container}>
      <div className={styles.noiseOverlay} aria-hidden="true" />
      <div className={styles.aurora} aria-hidden="true" />
      <div className={styles.aurora2} aria-hidden="true" />

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.title}>Tasks</h1>
          {/* Always rendered — opacity transition prevents layout jump */}
          <p
            className={styles.taskCount}
            style={{ opacity: pendingCount > 0 ? 1 : 0 }}
            aria-live="polite"
            aria-atomic="true"
          >
            {pendingCount} remaining
          </p>
        </div>
      </header>

      <main className={styles.main}>
        <form onSubmit={addTask} className={styles.form}>
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="What needs to get done?"
            className={styles.input}
            aria-label="New task title"
          />
          <button
            type="submit"
            className={styles.addButton}
            disabled={!newTaskTitle.trim()}
            aria-label="Add task"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M7 1v12M1 7h12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span>Add</span>
          </button>
        </form>

        {/*
          Always in the DOM. max-height + opacity transition animates the
          collapse when the first task is added — no layout jump.
        */}
        <div
          className={styles.emptyState}
          data-hidden={hasTasks ? "true" : "false"}
          aria-hidden={hasTasks}
        >
          <p className={styles.emptyHeading}>A clear mind starts here.</p>
          <p className={styles.emptySubtext}>Add your first task above to begin.</p>
        </div>

        <div className={styles.taskList} role="list">
          {tasks.map((task) => (
            <div
              key={task.id}
              role="listitem"
              className={[
                styles.taskItem,
                task.isNew ? styles.taskNew : "",
                completingId === task.id ? styles.taskCompleting : "",
                task.completed ? styles.taskDone : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <label className={styles.taskLabel}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className={styles.checkboxInput}
                  aria-label={
                    task.completed
                      ? `Mark "${task.title}" as incomplete`
                      : `Mark "${task.title}" as complete`
                  }
                />
                <span
                  className={[
                    styles.checkboxCustom,
                    task.completed ? styles.checkboxChecked : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-hidden="true"
                >
                  <svg
                    className={styles.checkmark}
                    width="10"
                    height="8"
                    viewBox="0 0 10 8"
                    fill="none"
                  >
                    <path
                      d="M1 3.5L3.8 6.5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span
                  className={[
                    styles.taskTitle,
                    task.completed ? styles.taskTitleDone : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {task.title}
                </span>
              </label>

              <button
                onClick={() => deleteTask(task.id)}
                className={styles.deleteButton}
                aria-label={`Delete "${task.title}"`}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path
                    d="M1 1l10 10M11 1L1 11"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
