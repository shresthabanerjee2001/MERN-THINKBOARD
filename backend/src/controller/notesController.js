import Note from '../models/Note.js'
export async function getAllNotes(_,res)
{ 
  try{
const notes= await Note.find({}).sort({createdAt:-1});
    res.status(200).json(notes);
}
catch(error)
{
  res.status(500).json({message: "error.message"})
}

}
export async function getNotesById(req,res)
{ try{
    const notes= await Note.findById(req.params.id);
    if(!notes) res.status(404).json({message: "Note not found"})
    res.status(200).json(notes);
}
  catch(error)
  {
  res.status(500).json({message: "error.message"})
  }
}
export async function createNotes(req,res)
{
  try{ 
    const {title, content} = req.body;
    const notes = await Note.create({
     title,
     content
    })
     res.status(201).json(notes);
  }
  catch(error)
  {
      res.status(500).json({message: error.message})
  }
  
}
export async function updateNotes(req,res)
{
  try{
    const notes= await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true}
    );
    if(!notes) res.status(404).json({message: "No notes found"})
    else 
  res.status(200).json(notes);
  }
  catch(error)
  {
       res.status(500).json({message: error.message});
  }
  
}
export async function deleteNotes(req,res)
{
  try{
    const notes= await Note.findByIdAndDelete(req.params.id);
    if(!notes) 
{
  res.status(404).json({message: "No notes found"})
}
    else
      {
      res.status(200).json({
    message:" notes deleted"
  });
    }
       
  }
  catch(error)
  {
    res.status(500).json({message: error.mesage});
  }
 
}