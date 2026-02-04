import React, { useEffect } from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import RateLimit from '../components/RateLimit'
import toast from 'react-hot-toast'
import NoteCard from '../components/NoteCard'

const HomePage = () => {
  const [isRateLimit, setRateLimit]=useState(false)
  const [notes,setNotes]= useState([])
  const [loading,setLoading]= useState(false);

 useEffect(()=>{
    const fetchNotes= async () => {
      try {
         const res= await axios.get("http://localhost:5001/api/notes");
         console.log(res.data);
         setNotes(res.data);
         setRateLimit(false)
      } catch (error) {
        console.log("error",error);
        if(error.response.status==429){
          setRateLimit(true)
        }
        else{
          toast.error("Failed to load notes")
        }
      } finally{
        setLoading(false);
      }
    }
    fetchNotes();
 },[])


  return (
    <div className='min-h-screen'>
      <Navbar/>
      {isRateLimit && (
      <RateLimit/>
    )}
      <div className ="max-w-7xl mx-autop-4 mt-6">
        {loading && <div className='text-center text-primary'> Loading Notes...</div>}
        {notes.length>0 && !isRateLimit && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'> 
          { notes.map(note=>(
            <NoteCard key={note._id} note={note} setNotes={setNotes}/>
          ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
