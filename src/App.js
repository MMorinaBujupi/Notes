import { useEffect, useState } from 'react';
import {nanoid} from 'nanoid';
import NoteList  from './componentes/NotesList'
import AddNote from './componentes/AddNote';
import Search from './componentes/Search';
import Header from './componentes/Header';
function App() {
  const [notes, setNotes] = useState(
    !localStorage.getItem('react-my-app1-data')
     ?[
     {
     id :nanoid(),
     text :"This is my first  NOTE!",
     date :"12/09/2022",
     
   },
   {
     id :nanoid(),
     text :"This is  my second NOTE!",
     date :"13/09/2022",
     
   },{
     id :nanoid(),
     text :"This is my  third  NOTE!",
     date: "1/09/2022",
     
   },
 ]
 :JSON.parse(
   localStorage.getItem('react-my-app1-data')
 )
 );
const [searchText, setsearchText] =useState('');
const [darkMode, setDarkMode] = useState(false);


useEffect(() => {
  const savedNotes = JSON.parse(
    localStorage.getItem('react-my-app1-data')
  );

  if (savedNotes) {
    setNotes(savedNotes);
  }
}, []);

useEffect(() => {
  localStorage.setItem(
    'react-my-app1-data',
    JSON.stringify(notes)
  );
}, [notes]);

const addNote = (text) => {
  // console.log(text);
  const date = new Date ();
  const newNote = {
    id :nanoid(),
    text :text,
    date :date.toLocaleDateString(),
  }
  const newNotes = [...notes, newNote];
		setNotes(newNotes);
}
const deleteNote = (id) => {
  const newNotes = notes.filter((note) => note.id !== id);
  setNotes(newNotes);
};

   return (
    <div className={`${darkMode && 'dark-mode'}`}>
    <div className="contaniner">
      <Header handleToggleDarkMode={setDarkMode} />
    {/* <h2>Note</h2> */}
    <Search handelSearchNote = { setsearchText}/> 
      <NoteList
       notes ={notes.filter((note) =>
         note.text.toLowerCase().includes(searchText))}
        handleAddNote={addNote}
        handleDeleteNote={deleteNote}
        />
      
     
      
    </div>
    </div>
  );
}

export default App;
