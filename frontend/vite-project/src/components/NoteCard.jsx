import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import axios from 'axios'
import toast from 'react-hot-toast'

const NoteCard = ({note,setNotes}) => {
    
const handleDelete= async (e,noteId)=>{
 e.preventDefault();
  if (!window.confirm("Are you sure you want to delete this note?")) return;
  try {
    await axios.delete(`http://localhost:5001/api/notes/${noteId}`)
    setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
    toast.success("Notes Deleted Successfully")
  } catch (error) {

    console.log("error in deletion", error)
    toast.error("Deletion failed")
  }
}
  return (
    <Link to ={`/note/${note._id}`}
    className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#eef1ef] m-4" > 
     <div className='card-body rounded-xl bg-stone-900 '>
        <h3 className='card-title text-base-content'>{note.title}</h3>
        <p className='text-based-content/70 line-clamp-3 '>{note.content}</p>
        <div> 
            <span className='text-sm text-base-content/60'>
  {new Date(note.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}
</span>
            <div className='flex items-center'>
                <PenSquareIcon className='size-4'/>
                <button className='btn btn-ghost btn-xs text-red-600'
                onClick={(e) => handleDelete(e,note._id)}>
                    <Trash2Icon className='size-4'></Trash2Icon>
                </button>
            </div>
        </div>
     </div>
    </Link>
  )
}

export default NoteCard
