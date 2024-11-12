'use client'

import styles from "@/notekeeper/notekeeper.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CreateArea from "@/components/CreateArea";
import Link from "next/link";
import { useState,useEffect } from "react";
import Note from "@/components/Note";
import axios from "axios";



export default function NoteKeeper() {
  const [noteList, setNoteList] = useState([]);
  const [editMode, setEditMode] = useState(null);
  useEffect(() => {
    //fetches data only on initial load
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/note"
      );
      setNoteList(response.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  async function addNote(note) {
    await axios.post("http://localhost:3000/api/note", note);
    fetchNotes(); // fetches data after a note is added, still fetches data if there's an error with adding the note
  }

  async function deleteNote(id) {
    try {
      await axios.delete(`http://localhost:3000/api/note/${id}`);
      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  }

  async function editNote(id, newTitle, newContent) {
    const updatedNotesList = noteList.map((prevNotes) =>
      prevNotes.id === id
        ? { ...prevNotes, title: newTitle, content: newContent }
        : prevNotes
    );
    setNoteList(updatedNotesList);
    const newNote = {
      title: newTitle,
      content: newContent,
    };
    await axios.patch(`http://localhost:3000/api/note/${id}`, newNote);
  }
  
  return (
    <div className={styles.wrapper}>
      <Header />
      <CreateArea onAdd={addNote} />
      <div className={styles.noteList}>
        {noteList.map((noteItem, index) => (
          <Note
            key={index}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            onEdit={editNote}
            isEditMode={editMode === noteItem.id}
            setEditMode={setEditMode}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}
