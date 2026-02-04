import React from 'react'
import { useState } from 'react';
import { Link } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!content || !title)
    {
      toast.error("All feilds are mandatory")
      return
    }
     setLoading(true);
     const newNote={
      title: title,
      content: content
     }
     try {
      const res = await axios.post("http://localhost:5001/api/notes",newNote)
      toast.success("Note created successfully!");
        navigate("/");

     } catch (error) {
      console.log("Error creating note:", error);
      toast.error("Failed to create note")
     }
     finally{
     setLoading(false)
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
          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>
                Create New Notes
              </h2>
              <form onSubmit={handleSubmit}>
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'> Title</span>
                  </label>
                  <input type='text'
                    placeholder='Note Title'
                    className='input input-bordered'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'> Content</span>
                  </label>
                  <textarea
                    placeholder='Write your notes here..'
                    className='textarea textarea-bordered w-full resize-none'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="flex justify-end gap-3 mt-6">

                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => navigate('/')}
                  >
                    Cancel
                  </button>


                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating Note.." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CreatePage
