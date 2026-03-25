import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/addTask.css";
import { addTaskApi, updateTaskApi } from "../../../api/taskApi";

const AddTask = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const editData = location.state?.taskData;

  const [formData, setFormData] = useState({
    task: "",
    description: "",
    priority: "Low",
    dueDate: "",
    category: "",
    status: "Pending",
    time: "",
    repeat: "none",
  });

  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setFormData({
        task: editData.task || "",
        description: editData.description || "",
        priority: editData.priority || "Low",
        dueDate: editData.dueDate?.split("T")[0] || "",
        category: editData.category || "",
        status: editData.status || "Pending",
        time: editData.time || "",
        repeat: editData.repeat || "none",
      });
      setIsEdit(true);
    }
  }, [editData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.task.trim() || !formData.description.trim()) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      let response;

      if (isEdit) {
        response = await updateTaskApi(editData._id, formData);
      } else {
        response = await addTaskApi(formData);
      }

      if (response.Status === "Success") {
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-task-container">
      <h2 className="add-task-title">
        {isEdit ? "Update Task ✏️" : "Add New Task"}
      </h2>

      <form className="add-task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          placeholder="Enter your task..."
          value={formData.task}
          onChange={handleChange}
          className="task-input"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="task-input"
        />

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="task-input"
        >
          <option value="High">High 🔴</option>
          <option value="Medium">Medium 🟡</option>
          <option value="Low">Low 🟢</option>
        </select>

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="task-input"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="task-input"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="task-input"
        >
          <option value="Pending">Pending ⏳</option>
          <option value="In Progress">In Progress 🚧</option>
          <option value="Completed">Completed ✅</option>
        </select>

        <input
          type="number"
          name="time"
          placeholder="Estimated Time (hours)"
          value={formData.time}
          onChange={handleChange}
          className="task-input"
        />

        <select
          name="repeat"
          value={formData.repeat}
          onChange={handleChange}
          className="task-input"
        >
          <option value="none">No Repeat</option>
          <option value="daily">Daily 🔁</option>
          <option value="weekly">Weekly 🔁</option>
        </select>

        <button type="submit" className="task-btn" disabled={loading}>
          {loading ? "Saving..." : isEdit ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export { AddTask };
