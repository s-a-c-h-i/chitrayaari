import React from "react"
import "./index.css"
import Createroom from "./Createroom/index"
import Joinroom from "./Joinroom/index"
 const Forms=({uuid,socket,setUser})=>{
return(
    <div className="container h-100 pt-5">
    <div className="row">
      <div className="col-12 text-center">
        <h1 className="text-primary fw-bold">Chitrayaari</h1>
      </div>
    </div>
    <div className="row h-100 pt-5">
      <div className="form-box p- col-md-4 mx-auto border border-2 border-primary rounded-2 mt-5 d-flex align-items-center flex-column">
        <h1 className="text-primary fw-bold mt-4">Join</h1>
        <Joinroom uuid={uuid} socket={socket} setUser={setUser} />
      </div>
      <div className="form-box p-4 col-md-4 mx-auto border border-2 rounded-2 border-primary mt-5 d-flex align-items-center flex-column">
        <h1 className="text-primary fw-bold mt-1">Create</h1>
        <Createroom uuid={uuid} socket={socket} setUser={setUser} />
      </div>
    </div>
  </div>
  
)
}

export default Forms;