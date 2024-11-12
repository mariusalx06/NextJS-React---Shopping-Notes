import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import styles from "@/components/Note.module.css"

export default function Note(props) {
    const [newNote, setNewNote] = useState({
      title: props.title,
      content: props.content,
    });

    useEffect(() => {
      setNewNote({
        title: props.title,
        content: props.content,
      });
    }, [props.title, props.content]);
  
    function handleChange(event) {
      const { name, value } = event.target;
      setNewNote((prevNote) => {
        return {
          ...prevNote,
          [name]: value,
        };
      });
    }
  
    function handleEdit(event) {
      props.setEditMode(props.id);
      event.preventDefault();
    }
  
    function handleSave(event) {
      props.onEdit(props.id, newNote.title, newNote.content);
      props.setEditMode(null);
      event.preventDefault();
    }
  
    function handleDelete(event) {
      props.onDelete(props.id);
      props.setEditMode(null);
      event.preventDefault();
    }
  
    function handleCancelEdit(event) {
      setNewNote({
        title: props.title,
        content: props.content,
      });
      props.setEditMode(null);
      event.preventDefault();
    }
  
    return (
      <div className={styles.note}>
        {props.isEditMode ? (
          <div>
            <input
              name="title"
              onChange={handleChange} // Update title
              placeholder="Edit Title"
              style={{ width: "100%", marginBottom: "10px" }}
              value={newNote.title}
            />
            <textarea
              name="content"
              onChange={handleChange} // Update content
              placeholder="Edit Content"
              rows="4"
              style={{ width: "100%", marginBottom: "10px" }}
              value={newNote.content}
            />
            <button onClick={handleSave} className={styles.saveButton}>
              <SaveIcon style={{ verticalAlign: "middle" }} />
            </button>
            <button>
              <ClearIcon
                onClick={handleCancelEdit}
                style={{
                  verticalAlign: "middle",
                  color: "#D50000",
                  fontSize: "1.9rem",
                }}
              />
            </button>
            <button className={styles.rightbutton} onClick={handleDelete}>
              <DeleteIcon style={{ verticalAlign: "middle", color: "#D50000" }} />
            </button>
          </div>
        ) : (
          <div>
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <button className={styles.rightbutton} onClick={handleDelete}>
              <DeleteIcon style={{ verticalAlign: "middle", color: "#D50000" }} />
            </button>
  
            <button className={styles.leftbutton} onClick={handleEdit}>
              <EditIcon style={{ verticalAlign: "middle", color: "#FF9800" }} />
            </button>
          </div>
        )}
      </div>
    );
  }