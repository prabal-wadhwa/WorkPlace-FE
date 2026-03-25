import { FaTrash, FaTimes } from "react-icons/fa";
import Modal from "../common/Modal";

const DeleteModal = ({
  isOpen,
  onConfirm,
  onCancel,
  isBulk,
  count,
  taskName,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className="modal-box">
        <div className="modal-icon-wrap">
          <div className="modal-icon">
            <FaTrash />
          </div>
        </div>

        <h2 className="modal-title">
          Delete {isBulk ? "Tasks" : "Task"}?
        </h2>

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
          <button className="btn btn-ghost" onClick={onCancel}>
            <FaTimes /> Cancel
          </button>

          <button className="btn btn-danger" onClick={onConfirm}>
            <FaTrash />{" "}
            {isBulk ? `Delete ${count} Tasks` : "Delete Task"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export {DeleteModal};