'use client'

import styles from "@/notekeeper/notekeeper.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CreateArea from "@/components/CreateArea";
import Link from "next/link";
import { useState,useEffect } from "react";
import Note from "@/components/Note";
import axios from "axios";
import Navbar from "@/components/Navbar";



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
    try {
      await axios.post("http://localhost:3000/api/note", note);
    } catch (error) {
      alert(error.response.data.message); //create pop-up
      console.log(error);
    }
    fetchNotes(); // fetches data after a note is added, still fetches data if there's an error with adding the note
  }

  async function deleteNote(id) {
    try {
      await axios.delete(`http://localhost:3000/api/note/${id}`);
    } catch (error) {
      alert("Error Deleting Note");
      console.log(error);
    }
    fetchNotes();
  }

  async function editNote(id, newNote) {

    const updatedNote = {
      title: newNote.title === "" ? null : newNote.title,
      content: newNote.content === "" ? null : newNote.content,
    };

    const updatedNotesList = noteList.map((prevNotes) =>
      prevNotes.id === id
        ? { ...prevNotes, ...updatedNote }
        : prevNotes
    );
    setNoteList(updatedNotesList);
    try {
      await axios.patch(`http://localhost:3000/api/note/${id}`, updatedNote);
    } catch (error) {
      alert(error.response.data.message);
    }
    fetchNotes();
  }

  
  return (
    <div className={styles.wrapper}>
      <Header />
      <Navbar />
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
