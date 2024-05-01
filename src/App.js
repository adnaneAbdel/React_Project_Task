import "./App.css";
import React, { useEffect, useState } from "react";
import "./AddNote.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
      const [notes, setNotes] = useState([]);
      const [title, setTitle] = useState('');
      const [content, setContent] = useState('');
      const [selecteNote, setSelecteNote] = useState(null);
      const [creating, setCreating] = useState(false);
      const [editing, setEditing] = useState(false);

      useEffect(() => {
        if(localStorage.getItem('notes')){
          setNotes(JSON.parse(localStorage.getItem('notes')));
        }else{
          localStorage.setItem('notes', JSON.stringify([]));
        }
       },[]);

       const updateEdting = () => {
        const updateNotes = [...notes];
        const noteIndex = notes.findIndex(note => note.id === selecteNote);
        updateNotes[noteIndex] = {
          id: selecteNote,
          title: title,
          content: content
        };
        setNotes(updateNotes);
        setEditing(false)
        setTitle('');
        setContent('');
       }
  const getAddNote = () => {
    return (
      <div className="form">
         <label className="mb-3">Your task title</label><br/>
           <input type="text" className="form-control" name="title" placeholder="Tital for tast ..." onChange={changeTilte}></input><br/>
           <label className="mb-3">text for task </label><br/>
           <textarea type="text" rows="10" name="content" className="form-control" placeholder="Description for your task ..." onChange={changeContent}></textarea><br/>
           <input type="submit" className="btnSave"  value="Save" onClick={testing}/>
      </div>
      
    );
  };


  const testing = () =>{
    let firstInput = document.querySelector(".firstInput");
    let firstTextarea = document.querySelector(".firstTextarea");
   firstInput.value = '';
   firstTextarea.value = '';
   const note = {
    id: new Date(),
    title: title ,
    content: content
   }
   const updateNotes = [...notes, note ]

   setNotes(updateNotes);
   setCreating(false);
   setSelecteNote(note.id);

   }
  const getPreview = () => {
    if(notes.length === 0 ){
      return <div>
        <h1>here you can write your task</h1>
      <p>for add new task click the button up</p>
        </div>
    }

    if(!selecteNote){
      return <h2>please choose a task</h2>
    }
    const note = notes.find(note => {
      return note.id === selecteNote ;
    });
    
let noteDisplay = (
  <div>
    {/* <h2>{note.title}</h2>
    <h2>{note.content}</h2> */}
  </div>
)

if(editing){
  noteDisplay = (
    <div>
      <h2>edit your task</h2>
      <form>
      <div className="form">
         <label className="mb-3">Your task title</label><br/>
           <input type="text" className="form-control" name="title" placeholder="Tital for tast ..." onChange={changeTilte}></input><br/>
           <label className="mb-3">text for task </label><br/>
           <textarea type="text" rows="10" name="content" className="form-control" placeholder="Description for your task ..." onChange={changeContent}></textarea><br/>
           <input type="submit" className="btnSave"  value="save edit" onClick={updateEdting}/>
      </div>
      </form>
    </div>
  );
}
   

 
  

   return (
     <div>
    
      {!editing && 
         <div className="divTitleStyle">
         <h2 className="forTitleStyle">{note.title}</h2>  
         <p className="forContentStyle">{note.content}</p> 
        <div className="icons">
        <span className="iconsDelete">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" onClick={DeleteElement}>
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
  </svg>  
        </span>
          <span className="iconsEdit">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16" onClick={EditElement}>
    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
  </svg>
          </span>
        </div>
         </div>
      }
    {noteDisplay}
     </div>
   );
 };
   //show the task clicked :
   const showeTheTask = showId =>{
    setSelecteNote(showId);
    setCreating(false);
    setEditing(false);
  }
  //here update for input title 
  const changeTilte = (e) => {
   setTitle(e.target.value);
  } //here update for input content 
  const changeContent = (e) => {
   setContent(e.target.value);
  }

  const getAll = () =>{
      setCreating(true);
      setEditing(false)
      setTitle('');
      setContent('');

   }

   const DeleteElement = () => {
     const updateNotes = [...notes];
     const noteIndex = updateNotes.findIndex(note => note.id === selecteNote);
     notes.splice(noteIndex, 1);
     setNotes(notes);
     setSelecteNote(null);
   }
   const EditElement = () => {
    const note = notes.find(note => note.id === selecteNote);
    setEditing(true)
    setTitle(note.title)
    setContent(note.content)
   }

 
    return (
      <div className="container">
        <div className="towCol">
          <div className="fristSection">
            {/* <h1>here we can write your note</h1>
            <p>for add new note click here</p> */}
       
            <button onClick={getAll}>+</button>
            <div className="containerForForm">{creating ? getAddNote() : getPreview() }</div>
          </div>
          <div className="secondSection">
            {notes.map(note => {
              return <li className="title " key={note.id} onClick={() => showeTheTask(note.id)}>{note.title}</li>
            })}
          </div>
        </div>
      </div>
    );
  
}

export default App;
