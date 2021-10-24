const ModalActions = ({ onConfirm, onCancel, primaryLabel }) => {
  return (
    <div className="flex flex-row items-center justify-between p-5 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg">
      <button
        onClick={onCancel}
        className="font-semibold text-gray-600 bg-none border-none"
      >
        Cancel
      </button>
      <button
        data-testid="modal-confirm-button"
        onClick={onConfirm}
        className="px-4 py-2 text-white font-semibold bg-blue-500 rounded"
      >
        {primaryLabel}
      </button>
    </div>
  );
};

export default ModalActions;
