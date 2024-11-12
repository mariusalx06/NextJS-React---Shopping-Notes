'use client'

import styles from "@/shoppinglist/shoppinglist.module.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import InputField from "@/components/InputField";
import { useState,useEffect } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import Item from "@/components/Item";
import axios from "axios";
import Navbar from "@/components/Navbar";

export default function ShoppingList() {
  const [items, setItem] = useState([]);
  const [inputText, setInputText] = useState("");
  const [editMode, setEditMode] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async ()=>{
    try {
      const response = await axios.get("http://localhost:3000/api/list");
      console.log(response.data);
      setItem(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const writingText = (event) => setInputText(event.target.value);

  const addItem = async (event) => {
    event.preventDefault();
    const newItem = { content: inputText };
    try {
      const response = await axios.post(
        "http://localhost:3000/api/list",
        newItem
      );
      setInputText("");
      fetchData();
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  const deleteItem = async(id)=> {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/list/${id}`
      );
      setItem((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  }
  const completeAll = async (event) => {
    event.preventDefault();
    try {
      await axios.delete("http://localhost:3000/api/list");
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }

  const handleSaveEdit = async(id, updatedText) =>{
    setItem(
      items.map((item) =>
        item.id === id ? { ...item, inputText: updatedText } : item
      )
    );
    const newItem = { content: updatedText };
    try {
      await axios.put(
        `http://localhost:3000/api/list/${id}`,
        newItem
      );
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className={styles.wrapper}>
      <Header />
      <Navbar />
        <div className={styles.container}>
          <div className={styles.heading}>
            <h1>Shopping List</h1>
          </div>
          <div className={styles.formdiv}>
            <InputField
              type="text"
              name="inputText"
              value={inputText}
              writingText={writingText}
            />
            <button className={styles.buttonStyle} onClick={addItem} type="submit">
              <AddShoppingCartIcon style={{ verticalAlign: "middle" }} />
            </button>
            <button className={`${styles.completeButton} ${styles.buttonStyle}`} onClick={completeAll} type="button">
              <DoneAllIcon style={{ verticalAlign: "middle" }} />
            </button>
          </div>
          <div>
            <ul className={styles.ul}>
              {items.map((item, index) => (
                <Item
                  key={index}
                  id={item.id}
                  content={item.content}
                  onDelete={deleteItem}
                  onSave={handleSaveEdit}
                  isEditMode={editMode === item.id}
                  setEditMode={setEditMode}
                />
              ))}
            </ul>
          </div>
        </div>
      <Footer />
    </div>
  );
}
