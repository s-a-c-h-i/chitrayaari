import { useState,useRef} from 'react'
import './index.css'
import { Whiteboard } from '../../components/Whiteboard'
import Chat from '../../components/Chatbar'
export const Roompage = ({user,socket,users}) => {
    // console.log(users);

    const [tool,setTool]=useState("pencil")
    const [color,setcolor]=useState("black")
    
    const [elements,setElements]=useState([])
    const [history,setHistory]=useState([])
    const [openuser,setopenuser]=useState(true)
    const [openchat,setopenchat]=useState(true)

    const canvasref=useRef(null);
    const ctxref=useRef(null);
 

  

    const handleClearCanvas=()=>{
    const canvas=canvasref.current
    const ctx=canvas.getContext("2d")
   // ctx.fillRect="white"
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setElements([])
    }

    
const undo=()=>{

if(elements.length===1){
  handleClearCanvas()
}setHistory((prevhistory)=>
[
...prevhistory,elements[elements.length-1]
])
//histry me element ka last wala dalo
setElements((prevElements)=>
prevElements.slice(0,prevElements.length-1)
//elements array me se last wala hata do

)}


const redo=()=>{
  setElements((prevElements)=>
  [
  ...prevElements,history[history.length-1]
  ])
  //elements me history array ka last element dalo
  setHistory((prevhistory)=>
  prevhistory.slice(0,prevhistory.length-1)
  )
//histroy ka last wala hatao
}

  return (
    <div className="row">
       

{    openuser && ( 
  <div className='position-fixed top-0 left-0 h-100 w-20  bg-dark p-5' style={{width:"12%",color:"white",left:"0%"}} > 
    <h6 className="text-center mt-10 ">Users</h6>
   <div className='w-100 mt-5 pt-5'>
  {users.map((usr, index) => (
          <p key={index*999} className='text-center w-100'>{usr.name} {user && user.userid===usr.userid && "(you)"}</p>
        ))}</div>
  </div>
)}
  {(openchat && (<Chat setOpenedChatTab={setopenchat} socket={socket}/>))}



        <h1 className="text-center py-5 text-primary">Chitrayaari<span className='text-secondary'>[users online:{users.length}]</span></h1>
{
  user &&
  user.presenter &&(
  <>
  <div className="col md-12 mt-4 mb-5 d-flex align-items-center justify-content-around mx-auto">
  <div className="d-flex col-md-4 justify-content-between gap-1 mx-auto">
   <input type="radio" id="pencil" name="tool" value="pencil"  
   // checked={tool === "pencil"}
     onClick={() => setTool("pencil")}/>
   <label htmlFor="pencil">Pencil</label>
   <input type="radio" id="line" name="tool" value="line" 
   // checked={tool === "line"}
     onClick={() => setTool("line")}/>
    
   <label htmlFor="line">Line</label>
   <input type="radio" id="rect" name="tool" value="rect"  
   // checked={tool === "rect"}
     onClick={() => setTool("rect")}/> 
 
   <label htmlFor="rect">Rectangle</label>
   </div>
 
</div>
<div className="col-md-7">
   <div className='d-flex flex-column align-items-center border-blue'><label for="colorPicker">Pick a color:</label>
<input className="" type="color" id="colorPicker" name="colorPicker"   onChange={(e) => setcolor(e.target.value)}/>
</div> 
<div className='col-md-7 d-flex  gap-5'>
<button className='btn btn-primary mt-1'
disabled={elements.length===0}
onClick={()=>undo()}

>undo</button>
<button className='btn btn-primary mt-1'
 onClick={()=>redo()}
disabled={history.length<1}
>redo</button>
</div>
<div className='col-md-7 d-flex  pt-2  '>
<button className='btn btn-danger' onClick={handleClearCanvas}>clear</button>
</div>
</div>
</>

 )   ///user presenter yaha tk 

}
<div className='col-md-8 border mx-auto mt-4 my-2 border canvas-box'>
<Whiteboard canvasref={canvasref} ctxref={ctxref} elements={elements} setElements={setElements}
tool={tool} color={color} user={user} socket={socket} 

/>   
</div>
    </div>
  )
}
