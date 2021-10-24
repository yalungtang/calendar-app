import React, { useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";

import ReminderForm from "./ReminderForm";
import DeleteConfirm from "./DeleteConfirm";
import Modal from "./Modal";

const ReminderFormContainer = ({ view }) => {
  const dispatch = useDispatch();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const savedValues = view.view === "edit" ? view.values : {};

  const handleOnClose = () => {
    dispatch({ type: "view/reset" });
  };

  const handleDeleteConfirm = (e) => {
    e.preventDefault();
    setShowConfirmDelete(true);
  };

  const handleOnDelete = (e) => {
    e.preventDefault();
    dispatch({
      type: "reminders/delete",
      payload: {
        id: `${moment(savedValues.date).format("MM/DD/YYYY")}`,
        value: savedValues,
      },
    });
    handleOnClose();
  };

  const headerLabels = {
    edit: "Edit reminder",
    add: "Add a reminder",
    delete: "Delete reminder",
  };

  return (
    <Modal onClose={handleOnClose} headerLabel={headerLabels[showConfirmDelete ? "delete" : view.view]}>
      {showConfirmDelete ? (
        <DeleteConfirm onDelete={handleOnDelete} onCancel={() => setShowConfirmDelete(false)} />
      ) : (
        <ReminderForm
          onDelete={handleDeleteConfirm}
          view={view}
          savedValues={savedValues}
        />
      )}
    </Modal>
  );
};

export default ReminderFormContainer;
