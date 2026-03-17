"use client";

import { useState } from "react";
import Link from "next/link";
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
    }, 600);
  };

  const toggleTask = (taskId: number) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task && !task.completed) {
      setCompletingId(taskId);
      setTimeout(() => setCompletingId(null), 900);
    }
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (taskId: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const pendingTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);
  const completionRatio =
    tasks.length > 0 ? completedTasks.length / tasks.length : 0;

  return (
    <div className={styles.container}>
      {/* Tactile noise overlay */}
      <div className={styles.noiseOverlay} aria-hidden="true" />

      {/* Aurora gradient blobs */}
      <div className={styles.aurora} aria-hidden="true" />
      <div className={styles.aurora2} aria-hidden="true" />

      {/* Glassmorphism sticky header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.headerLeft}>
            <Link href="/" className={styles.backLink} aria-label="Back to home">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M10 12L6 8l4-4"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <h1 className={styles.title}>Tasks</h1>
          </div>

          {tasks.length > 0 && (
            <div className={styles.progressWrap}>
              <span className={styles.progressLabel}>
                {completedTasks.length}&thinsp;/&thinsp;{tasks.length}
              </span>
              <div
                className={styles.progressTrack}
                role="progressbar"
                aria-valuenow={Math.round(completionRatio * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Task completion progress"
              >
                <div
                  className={styles.progressFill}
                  style={{ width: `${completionRatio * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </header>

      <main className={styles.main}>
        {/* Add task form */}
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
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
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

        {/* Empty state */}
        {tasks.length === 0 && (
          <div className={styles.emptyState}>
            <p className={styles.emptyHeading}>A clear mind starts here.</p>
            <p className={styles.emptySubtext}>
              Add your first task above to begin.
            </p>
          </div>
        )}

        {/* Pending tasks */}
        {pendingTasks.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionLabel}>To do</h2>
            <div className={styles.taskList}>
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className={[
                    styles.taskItem,
                    task.isNew ? styles.taskNew : "",
                    completingId === task.id ? styles.taskCompleting : "",
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
                      aria-label={`Mark "${task.title}" as complete`}
                    />
                    <span className={styles.checkboxCustom} aria-hidden="true">
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
                    <span className={styles.taskTitle}>{task.title}</span>
                  </label>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className={styles.deleteButton}
                    aria-label={`Delete "${task.title}"`}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                    >
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
          </section>
        )}

        {/* Completed tasks */}
        {completedTasks.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionLabel}>Done</h2>
            <div className={styles.taskList}>
              {completedTasks.map((task) => (
                <div
                  key={task.id}
                  className={`${styles.taskItem} ${styles.taskDone}`}
                >
                  <label className={styles.taskLabel}>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className={styles.checkboxInput}
                      aria-label={`Mark "${task.title}" as incomplete`}
                    />
                    <span
                      className={`${styles.checkboxCustom} ${styles.checkboxChecked}`}
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
                      className={`${styles.taskTitle} ${styles.taskTitleDone}`}
                    >
                      {task.title}
                    </span>
                  </label>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className={styles.deleteButton}
                    aria-label={`Delete "${task.title}"`}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                    >
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
          </section>
        )}
      </main>
    </div>
  );
}
