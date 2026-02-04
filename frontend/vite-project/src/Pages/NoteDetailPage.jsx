import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Save, Trash2, Edit } from 'lucide-react';
import toast from 'react-hot-toast';
const NoteDetailPage = () => {
  const { id } = useParams();
  const [note, setNote] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchSingleNote = async () => {
      try {

        const res = await axios.get(`http://localhost:5001/api/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error fetching note:", error);
        toast.error("Note not found");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchSingleNote();
  }, [id, navigate]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!note) return null;
  const handleSave= async ()=>{
    if(!note.title || !note.content){
      toast.error("All feilds mandatory")
      return
    }
    try {
      await axios.put(`http://localhost:5001/api/notes/${id}`,note );
      toast.success("Updated Successfully")
    } catch (error) {
      console.log(error)
      toast.error("Failed to update")
    }
  
  
  }
  return (
    <div className='min-h-screen bg-base-200'>
     
      <div className='container mx-auto px-4 py-8 '>
        <div className='max-w-2xl mx-auto'>
          <Link to={"/"} className="btn btn-primary">
            <ArrowLeft className="w-4 h-4" />
            Back To Home
          </Link>
          <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'> Title</span>
                  </label>
                  <input type='text'
                    
                    className='input input-bordered'
                    value={note.title}
                    onChange={(e) => setNote({...note,title: e.target.value})}
                  />
                </div>
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'> Content</span>
                  </label>
                  <textarea
                    
                    className='textarea textarea-bordered w-full resize-none'
                    value={note.content}
                    onChange={(e) => setNote({...note,content: e.target.value})}
                  />
                </div>
        </div>
        <div className='flex justify-end gap-3 mt-6'>
          <button onClick={handleSave} className="btn btn-primary gap-2">
                  <Save className="size-4" /> Save Changes
                </button>
        </div>
          
      </div>
    </div>
  )
}

export default NoteDetailPage
