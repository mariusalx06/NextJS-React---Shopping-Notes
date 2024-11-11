import React, { useState } from "react";
import styles from "@/components/CreateArea.module.css";
import AddBoxIcon from "@mui/icons-material/AddBox";

export default function CreateArea(props) {
    const [note, setNote] = useState({
        title: "",
        content: "",
      });
    
      function handleChange(event) {
        const { name, value } = event.target;
        setNote((prevNote) => {
          return {
            ...prevNote,
            [name]: value,
          };
        });
      }
    
      function submitNote(event) {
        props.onAdd(note);
        setNote({
          title: "",
          content: "",
        });
        event.preventDefault();
    }

  return (
    <div className={styles.centeredBox}>
      <form className={styles.form}>
        <input
          name="title"
          onChange={handleChange}
          placeholder="Title"
          value={note.title}
        />
        <textarea
          name="content"
          onChange={handleChange}
          
          placeholder="Take a note..."
          value={note.content}
          rows="3"
        />
        <button onClick={submitNote} className={styles.button}>
            <AddBoxIcon style={{ verticalAlign: "middle" }} />
            </button>
      </form>
    </div>
  );
}
