import React, { useState, useEffect } from "react";
import BackspaceIcon from "@mui/icons-material/Backspace";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SaveIcon from "@mui/icons-material/Save";
import InputField from "./InputField";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./Item.module.css";

export default function Item(props) {
  const [newInputText, setNewInputText] = useState(props.content);

  useEffect(() => {
    setNewInputText(props.content);
  }, [props.content]);

  const writingText = (event) => setNewInputText(event.target.value);

  const handleDelete = (event) => {
    props.onDelete(props.id);
    props.setEditMode(null);
    event.preventDefault();
  }

  const handleEdit = (event) => {
    props.setEditMode(props.id);
    event.preventDefault();
  }

  const handleSave = (event) => {
    props.onSave(props.id, newInputText);
    props.setEditMode(null);
    event.preventDefault();
  }
  const handleCancel = (event) => {
    setNewInputText(props.content);
    props.setEditMode(null);
    event.preventDefault();
  }

  const renderEditButtons = () => (
    <>
      <button
        onClick={handleDelete}
        className={`${styles.deleteButton} ${styles.buttonStyle}`}
        aria-label="Delete Item"
      >
        <BackspaceIcon style={{ verticalAlign: "middle" }} />
      </button>
      <button
        onClick={handleSave}
        className={`${styles.saveButton} ${styles.buttonStyle}`}
        aria-label="Save Item"
      >
        <SaveIcon style={{ fontSize: "25px", verticalAlign: "middle" }} />
      </button>
      <button
        onClick={handleCancel}
        className={`${styles.cancelButton} ${styles.buttonStyle}`}
        aria-label="Cancel Edit"
      >
        <CloseIcon style={{ fontSize: "25px", verticalAlign: "middle" }} />
      </button>
    </>
  );

  const renderViewButtons = () => (
    <>
      <span>{props.content}</span>
      <button
        onClick={handleDelete}
        className={`${styles.deleteButton} ${styles.buttonStyle}`}
        aria-label="Delete Item"
      >
        <BackspaceIcon style={{ verticalAlign: "middle" }} />
      </button>
      <button
        onClick={handleEdit}
        className={`${styles.editButton} ${styles.buttonStyle}`}
        aria-label="Edit Item"
      >
        <EditNoteIcon style={{ fontSize: "25px", verticalAlign: "middle" }} />
      </button>
    </>
  );

  return (
    <div>
      <li className={styles.li}>
      {props.isEditMode ? (
        <>
          <InputField
            type="text"
            name="inputText"
            value={newInputText}
            writingText={writingText}
          />
          {renderEditButtons()}
        </>
      ) : (
        renderViewButtons()
      )}
      </li>
    </div>
  );
}
