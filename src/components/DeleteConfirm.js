import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ModalActions from "./ModalActions";

const DeleteConfirm = ({ onDelete, onCancel }) => {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col px-6 py-5 bg-gray-50 h-48">
        <p>Are you sure you want to delete this reminder?</p>
        <div className="text-center pt-6">
          <FontAwesomeIcon className="text-gray-300 fa-6x" icon={faTrash} />
        </div>
      </div>
      <ModalActions
        onCancel={onCancel}
        onConfirm={onDelete}
        primaryLabel="Delete reminder"
      />
    </div>
  );
};

export default DeleteConfirm;
