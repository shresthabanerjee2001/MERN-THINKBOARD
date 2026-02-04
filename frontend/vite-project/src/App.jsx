import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import CreatePage from './Pages/CreatePage'
import NoteDetailPage from './Pages/NoteDetailPage'
import { Toaster } from 'react-hot-toast';
const App = () => {
  return (
    <div>
      <Toaster/>
      
      <input type="checkbox" value="coffee" className="toggle theme-controller" />
      

   
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/create" element={<CreatePage />}/>
        <Route path="/note/:id" element={<NoteDetailPage />}/>
      </Routes>

    </div>
  )
}

export default App
