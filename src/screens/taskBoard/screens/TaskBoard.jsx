/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/refs */
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ReactDOM from "react-dom";
import "./styles/taskBoard.css";
import { mapStatus, reverseMapStatus } from "../../../common/utils";
import { COLUMN_CONFIG, PRIORITY_CONFIG } from "../config";
import { getTasksApi, updateTaskStatusApi } from "../../../api/taskApi";

const PortalAwareItem = ({ provided, snapshot, children }) => {
  const child = (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={{
        ...provided.draggableProps.style,
        opacity: 1,
        visibility: "visible",
      }}
    >
      {children}
    </div>
  );

  if (!snapshot.isDragging) return child;
  return ReactDOM.createPortal(child, document.body);
};

const initialColumns = {
  todo: { ...COLUMN_CONFIG.todo, items: [] },
  progress: { ...COLUMN_CONFIG.progress, items: [] },
  done: { ...COLUMN_CONFIG.done, items: [] },
};

const TaskBoard = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [draggingId, setDraggingId] = useState(null);
  const [dragOverCol, setDragOverCol] = useState(null);

  const fetchTasks = async () => {
    try {
      const result = await getTasksApi();

      if (result.Status === "Success") {
        const newColumns = {
          todo: { ...COLUMN_CONFIG.todo, items: [] },
          progress: { ...COLUMN_CONFIG.progress, items: [] },
          done: { ...COLUMN_CONFIG.done, items: [] },
        };

        result.data.forEach((task) => {
          const col = mapStatus(task.status);
          if (newColumns[col]) newColumns[col].items.push(task);
        });

        setColumns(newColumns);
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onDragStart = (start) => {
    setDraggingId(start.draggableId);
  };

  const onDragUpdate = (update) => {
    setDragOverCol(update.destination?.droppableId || null);
  };

  const onDragEnd = async (result) => {
    setDraggingId(null);
    setDragOverCol(null);

    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const col = columns[source.droppableId];
      const items = [...col.items];
      const [removed] = items.splice(source.index, 1);
      items.splice(destination.index, 0, removed);
      setColumns({ ...columns, [source.droppableId]: { ...col, items } });
    } else {
      const srcCol = columns[source.droppableId];
      const dstCol = columns[destination.droppableId];
      const srcItems = [...srcCol.items];
      const dstItems = [...dstCol.items];

      const [movedTask] = srcItems.splice(source.index, 1);
      const newStatus = reverseMapStatus(destination.droppableId);
      const updatedTask = { ...movedTask, status: newStatus };

      dstItems.splice(destination.index, 0, updatedTask);

      setColumns({
        ...columns,
        [source.droppableId]: { ...srcCol, items: srcItems },
        [destination.droppableId]: { ...dstCol, items: dstItems },
      });

      try {
        await updateTaskStatusApi(movedTask._id, newStatus);
      } catch (err) {
        console.log("Update failed:", err);
      }
    }
  };

  const totalTasks = Object.values(columns).reduce(
    (sum, col) => sum + col.items.length,
    0,
  );

  return (
    <div className="board-container">
      <div className="board-orb orb-a" />
      <div className="board-orb orb-b" />

      <div className="board-header">
        <div className="board-header-left">
          <div className="board-icon">⚡</div>
          <div>
            <h2 className="board-title">Task Board</h2>
            <p className="board-sub">
              Drag tasks across columns to update their status
            </p>
          </div>
        </div>
        <div className="board-total-badge">{totalTasks} tasks</div>
      </div>

      <div className="drag-hint">
        <span className="drag-hint-icon">↔</span>
        Drag any card to move it between columns — status updates automatically
      </div>

      <DragDropContext
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        <div className="board-columns">
          {Object.entries(columns).map(([columnId, column]) => {
            const isOver = dragOverCol === columnId;
            const cfg = COLUMN_CONFIG[columnId];

            return (
              <div
                className={`column-wrapper ${isOver ? "drag-over" : ""}`}
                key={columnId}
                style={{
                  "--col-accent": cfg.accent,
                  "--col-glow": cfg.glow,
                  "--col-border": cfg.border,
                  "--col-header": cfg.headerBg,
                }}
              >
                <div className="column-header">
                  <div className="col-header-left">
                    <span className="col-emoji">{cfg.emoji}</span>
                    <span className="col-title">{column.title}</span>
                  </div>
                  <span className="col-count">{column.items.length}</span>
                </div>

                <Droppable droppableId={columnId}>
                  {(provided, snapshot) => (
                    <div
                      className={`column-body ${snapshot.isDraggingOver ? "is-dragging-over" : ""}`}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {column.items.length === 0 &&
                        !snapshot.isDraggingOver && (
                          <div className="empty-col">
                            <span className="empty-col-icon">📭</span>
                            <p>Drop tasks here</p>
                          </div>
                        )}

                      {column.items.map((item, index) => {
                        const priority =
                          PRIORITY_CONFIG[item.priority] || PRIORITY_CONFIG.Low;
                        const isDragging = draggingId === item._id;
                        console.log("isDragging___", isDragging);

                        const isOverdue =
                          item.dueDate &&
                          new Date(item.dueDate) < new Date() &&
                          item.status !== "Completed";

                        return (
                          <Draggable
                            key={item._id}
                            draggableId={item._id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <PortalAwareItem
                                provided={provided}
                                snapshot={snapshot}
                              >
                                <div
                                  className={`task-card ${snapshot.isDragging ? "dragging" : ""} ${isOverdue ? "overdue-card" : ""}`}
                                >
                                  <div className="drag-handle-dots">
                                    <span />
                                    <span />
                                    <span />
                                    <span />
                                    <span />
                                    <span />
                                  </div>

                                  <div className="card-top-row">
                                    <span
                                      className="priority-badge"
                                      style={{
                                        color: priority.color,
                                        background: priority.bg,
                                      }}
                                    >
                                      <span
                                        className="priority-dot"
                                        style={{ background: priority.dot }}
                                      />
                                      {item.priority || "Low"}
                                    </span>

                                    {isOverdue && (
                                      <span className="overdue-badge">
                                        ⚠ Overdue
                                      </span>
                                    )}
                                  </div>
                                  <p className="task-name">{item.task}</p>

                                  {item.description && (
                                    <p className="task-desc">
                                      {item.description}
                                    </p>
                                  )}

                                  <div className="card-meta-row">
                                    {item.category && (
                                      <span className="meta-chip">
                                        🏷 {item.category}
                                      </span>
                                    )}
                                    {item.time && (
                                      <span className="meta-chip">
                                        ⏱ {item.time}h
                                      </span>
                                    )}
                                    {item.repeat && item.repeat !== "none" && (
                                      <span className="meta-chip">
                                        🔁 {item.repeat}
                                      </span>
                                    )}
                                  </div>

                                  <div className="card-footer-row">
                                    {item.dueDate && (
                                      <span
                                        className={`due-chip ${isOverdue ? "due-overdue" : ""}`}
                                      >
                                        📅{" "}
                                        {new Date(
                                          item.dueDate,
                                        ).toLocaleDateString("en-IN", {
                                          day: "numeric",
                                          month: "short",
                                        })}
                                      </span>
                                    )}
                                    <span className="card-id">
                                      #{item._id?.slice(-4)}
                                    </span>
                                  </div>
                                </div>
                              </PortalAwareItem>
                            )}
                          </Draggable>
                        );
                      })}

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export { TaskBoard };
