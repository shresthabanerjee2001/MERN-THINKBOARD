import React from 'react'
import { Link } from "react-router-dom";
import { Plus} from "lucide-react";
const Navbar = () => {
  return (
    <header className=" bg-base-300 border-b border-x-base-content/10">
      <div className="mx-auto max-w-6xl p-4" >
       <div className="flex items-center justify-between">
        <h1 className ="text-3xl font-bold text-primary font-mono tracking-tighter">ThinkBoard</h1>
         <div className="flex items-center gap-4">
        <Link to={"/create"} className="btn btn-primary">
          <Plus className="w-4 h-4" />
          Add New Note
        </Link>
      </div>
       </div>
      </div>
    </header>
  )
}

export default Navbar
