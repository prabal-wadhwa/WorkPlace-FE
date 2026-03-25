import { FaCheckCircle } from "react-icons/fa";
import Modal from "../common/Modal";

const SuccessModal = ({
  isOpen,
  onClose,
  title = "Success!",
  message = "Operation completed successfully",
  buttonText = "OK",
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-box success-modal">
        <div className="modal-icon-wrap success">
          <FaCheckCircle className="success-icon" />
        </div>

        <h2 className="modal-title">{title}</h2>

        <p className="modal-desc">{message}</p>

        <div className="modal-actions">
          <button className="btn btn-primary" onClick={onClose}>
            {buttonText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;