import { useState } from "react"
import { useNavigate } from "react-router-dom"
const Joinform=({uuid,socket,setUser})=>{
const [roomid,setRoomid]=useState("")
const [name,setName]=useState("")
const navigate=useNavigate()    //room joining ke liye


const handleroomjoin=(e)=>{
    e.preventDefault()
     
    const roomdata={
        name,roomid,userid:uuid(),host:false,presenter:false    }
       
    setUser(roomdata)
    navigate(`/${roomid}`)
    socket.emit("userjoined",roomdata)    
    // console.log("room me join hu ")
    
}

    return(
        <form className="form col-md-12 mt-5">
            <div className="form-group">
                <input type="text" placeholder="enter you name" className="form-control my-2" value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
         <div className="form-group">
         <input type="text" placeholder="enter room code" className="form-control my-2 border-2" onChange={(e)=>setRoomid(e.target.value)}/>
         </div>
         <div className="d-flex justify-content-center">
         <button type="button" onClick={handleroomjoin}
         
         className="btn btn-primary">Enter the room </button>
         </div>

        </form>
    )
}

export default Joinform;