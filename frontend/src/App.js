import Forms from './components/Form'
// import './App.css';
import { Routes,Route } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';

import { Roompage } from './pages/Room';
import io from "socket.io-client"
import { useEffect, useState } from 'react';


const server = "http://localhost:5000";
const connectionOptions = {
  "force new connection": true,  //always create a new connection
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};

const socket=io(server,connectionOptions)

function App() {
  
  const [user,setUser]=useState(null)
  const [users,setUsers]=useState([])  //(for no of users),users is array 
  
  useEffect(()=>{  
     //usedddddddd always for lsiteing
   socket.on("userisjoined",(data)=>{ 
    //listening
  if(data.success) {
    console.log(data);
      setUsers(data.users)
      // console.log(data.users.length)
      console.log("user aya")
      }
  else console.log("user join error") 

});
console.log(users);
console.log(users.length);
socket.on("allusers",data=>{
   setUsers(data)    /////user joineddikhane ke lie
 })


 ///toasstifyyyy
socket.on("userjoinedmsgbroadcast",(data)=>{
 
toast.info(`${data} joined the room`)
})
   

//back to front  (phle f to b then b to f)
socket.on("userdisconnected",(data)=>{
  //  console.log(user)
  //  console.log(user.length)
   toast.info(`${data} left the room`)
  })
 },[])

const uuid = () => {
var S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );}
 
  return (
   <div className='container'>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Forms uuid={uuid} socket={socket} setUser={setUser}/>}/>
      <Route path='/:roomid' element={<Roompage user={user} socket={socket} users={users}/>}/>
    </Routes>
   
    </div>
  );
}

export default App;
