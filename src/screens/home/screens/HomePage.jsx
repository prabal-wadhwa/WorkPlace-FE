/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import "./styles/homePage.css";
import {
  FaEdit,
  FaTrash,
  FaCheckSquare,
  FaSquare,
  FaTimes,
  FaCheck,
  FaUndo,
} from "react-icons/fa";
import { MdSelectAll } from "react-icons/md";
import {
  PRIORITY_CONFIG,
  REPEAT_ICONS,
  STATUS_BAR_CONFIG,
  STATUS_CONFIG,
} from "../config";
import {
  deleteMultipleTasksApi,
  deleteTaskApi,
  getTasksApi,
  updateTaskStatusApi,
} from "../../../api/taskApi";
import { useNavigate } from "react-router-dom";

const DeleteModal = ({
  isOpen,
  onConfirm,
  onCancel,
  isBulk,
  count,
  taskName,
}) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon-wrap">
          <div className="modal-icon">
            <FaTrash />
          </div>
        </div>
        <h2 className="modal-title">Delete {isBulk ? "Tasks" : "Task"}?</h2>
        <p className="modal-desc">
          {isBulk ? (
            <>
              You're about to delete <strong>{count} tasks</strong>. This action
              cannot be undone.
            </>
          ) : (
            <>
              You're about to delete <strong>"{taskName}"</strong>. This action
              cannot be undone.
            </>
          )}
        </p>
        <div className="modal-actions">
          <button className="btn btn-ghost modal-cancel" onClick={onCancel}>
            <FaTimes /> Cancel
          </button>
          <button className="btn btn-danger modal-confirm" onClick={onConfirm}>
            <FaTrash /> {isBulk ? `Delete ${count} Tasks` : "Delete Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [selectMode, setSelectMode] = useState(false);
  const [filter, setFilter] = useState("All");

  const navigate = useNavigate();

  const [modal, setModal] = useState({
    open: false,
    isBulk: false,
    targetId: null,
    taskName: "",
  });

  const fetchTasks = async () => {
    try {
      const res = await getTasksApi();
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = (id, taskName) => {
    setModal({ open: true, isBulk: false, targetId: id, taskName });
  };

  const handleBulkDeletePrompt = () => {
    setModal({ open: true, isBulk: true, targetId: null, taskName: "" });
  };

  const closeModal = () =>
    setModal({ open: false, isBulk: false, targetId: null, taskName: "" });

  const confirmDelete = async () => {
    closeModal();

    try {
      if (modal.isBulk) {
        await deleteMultipleTasksApi(selectedTasks);

        setTasks((prev) => prev.filter((t) => !selectedTasks.includes(t._id)));

        setSelectedTasks([]);
        setSelectMode(false);
      } else {
        const res = await deleteTaskApi(modal.targetId);     

        if (res.Status === "Success") {
          setTasks((prev) => prev.filter((t) => t._id !== modal.targetId));
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleEdit = (task) => {
    navigate("/add-task", {
      state: {
        taskData: task,
      },
    });
  };

  const handleBulkDelete = () => handleBulkDeletePrompt();

  const handleStatusToggle = async (task) => {
    try {
      const newStatus = task.status === "Completed" ? "Pending" : "Completed";
      const result = await updateTaskStatusApi(task._id, newStatus);
      if (result.Status === "Success") {
        setTasks((prev) =>
          prev.map((t) =>
            t._id === task._id ? { ...t, status: newStatus } : t,
          ),
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toggleSelect = (id) => {
    setSelectedTasks((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((t) => t.status === filter);

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "Completed").length,
    pending: tasks.filter((t) => t.status === "Pending").length,
    inProgress: tasks.filter((t) => t.status === "In Progress").length,
    overdue: tasks.filter(
      (t) =>
        t.dueDate &&
        new Date(t.dueDate) < new Date() &&
        t.status !== "Completed",
    ).length,
  };

  return (
    <div className="home-container">
      <DeleteModal
        isOpen={modal.open}
        isBulk={modal.isBulk}
        count={selectedTasks.length}
        taskName={modal.taskName}
        onConfirm={confirmDelete}
        onCancel={closeModal}
      />

      <div className="bg-orb orb-1" />
      <div className="bg-orb orb-2" />
      <div className="bg-orb orb-3" />

      <header className="header">
        <div className="header-left">
          <div className="logo-badge">✦</div>
          <div>
            <h1 className="header-title">My Workspace</h1>
            <p className="header-sub">Track · Organize · Accomplish</p>
          </div>
        </div>

        <div className="header-actions">
          {selectMode && selectedTasks.length > 0 && (
            <button className="btn btn-danger" onClick={handleBulkDelete}>
              <FaTrash /> Delete ({selectedTasks.length})
            </button>
          )}
          {selectMode && (
            <button
              className="btn btn-ghost"
              onClick={() =>
                setSelectedTasks(
                  selectedTasks.length === tasks.length
                    ? []
                    : tasks.map((t) => t._id),
                )
              }
            >
              <MdSelectAll />
              {selectedTasks.length === tasks.length
                ? "Deselect All"
                : "Select All"}
            </button>
          )}
          <button
            className={`btn ${selectMode ? "btn-outline" : "btn-primary"}`}
            onClick={() => {
              setSelectMode(!selectMode);
              setSelectedTasks([]);
            }}
          >
            {selectMode ? (
              <>
                <FaTimes /> Cancel
              </>
            ) : (
              <>
                <FaCheckSquare /> Select
              </>
            )}
          </button>
        </div>
      </header>

      <div className="stats-bar">
        {STATUS_BAR_CONFIG(stats).map((s) => (
          <div
            className="stat-card"
            key={s.label}
            style={{ "--accent": s.accent }}
          >
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="filter-tabs">
        {["All", "Pending", "In Progress", "Completed"].map((f) => (
          <button
            key={f}
            className={`filter-tab ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
            <span className="tab-count">
              {f === "All"
                ? tasks.length
                : tasks.filter((t) => t.status === f).length}
            </span>
          </button>
        ))}
      </div>

      <div className="task-grid">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🗂</div>
            <h3>No tasks here</h3>
            <p>Add some tasks to get started!</p>
          </div>
        ) : (
          filteredTasks.map((item, idx) => {
            const isOverdue =
              item.dueDate &&
              new Date(item.dueDate) < new Date() &&
              item.status !== "Completed";
            const isSelected = selectedTasks.includes(item._id);
            const priority =
              PRIORITY_CONFIG[item.priority] || PRIORITY_CONFIG.Low;
            const status = STATUS_CONFIG[item.status] || STATUS_CONFIG.Pending;

            return (
              <div
                className={`task-card ${isSelected ? "selected" : ""} ${isOverdue ? "overdue" : ""} ${item.status === "Completed" ? "done" : ""}`}
                key={item._id}
                style={{ "--card-delay": `${idx * 0.05}s` }}
                onClick={() => selectMode && toggleSelect(item._id)}
              >
                {selectMode && (
                  <div className="card-checkbox">
                    {isSelected ? (
                      <FaCheckSquare className="checkbox-icon checked" />
                    ) : (
                      <FaSquare className="checkbox-icon" />
                    )}
                  </div>
                )}

                <div className="card-top">
                  <div
                    className="card-priority"
                    style={{ color: priority.color, background: priority.bg }}
                  >
                    {priority.icon} {item.priority}
                  </div>
                  {!selectMode && (
                    <div className="card-actions">
                      <button
                        className="icon-btn edit"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(item);
                        }}
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="icon-btn delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item._id, item.task);
                        }}
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </div>

                <div className="card-body">
                  <h3 className="card-title">{item.task}</h3>
                  {item.description && (
                    <p className="card-desc">{item.description}</p>
                  )}
                </div>

                <div className="card-meta">
                  {item.status && (
                    <span
                      className="meta-pill"
                      style={{ color: status.color, background: status.bg }}
                    >
                      {item.status}
                    </span>
                  )}
                  {item.category && (
                    <span className="meta-pill cat-pill">
                      🏷 {item.category}
                    </span>
                  )}
                  {item.repeat && item.repeat !== "none" && (
                    <span className="meta-pill repeat-pill">
                      {REPEAT_ICONS[item.repeat] || `🔁 ${item.repeat}`}
                    </span>
                  )}
                </div>

                <div className="card-footer">
                  <div className="footer-left">
                    {item.dueDate && (
                      <span
                        className={`due-date ${isOverdue ? "overdue-text" : ""}`}
                      >
                        {isOverdue ? "⚠️" : "📅"}{" "}
                        {new Date(item.dueDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    )}
                    {item.time && (
                      <span className="time-estimate">⏱ {item.time}h</span>
                    )}
                  </div>
                  <span className="task-id">#{item._id.slice(-4)}</span>
                </div>

                {!selectMode && (
                  <button
                    className={`status-toggle-btn ${item.status === "Completed" ? "undo" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusToggle(item);
                    }}
                  >
                    {item.status === "Completed" ? (
                      <>
                        <FaUndo /> Mark as Pending
                      </>
                    ) : (
                      <>
                        <FaCheck /> Mark as Done
                      </>
                    )}
                  </button>
                )}

                {item.status === "Completed" && (
                  <div className="completion-bar">
                    <div className="completion-fill" />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export { HomePage };
