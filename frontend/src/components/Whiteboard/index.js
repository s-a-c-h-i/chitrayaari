import React,{useEffect, useState,useLayoutEffect} from 'react'
import rough from "roughjs"
// eslint-disable-next-line
const generator=rough.generator();  //for lines and shapes
export const Whiteboard = ({canvasref,ctxref,elements,setElements,tool,color,user,socket}) => {
 
  const [img,setimg]=useState(null)
   useEffect(()=>{
   socket.on("whiteBoardDataResponse",(data)=>{
  setimg(data.imgURL);  
            //we r getting this from server  
 })

  },[socket])

  const [Draw,setDraw]=useState(false)
  useEffect(() => {
    const canvas = canvasref.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctxref.current = ctx;
      } else {
        console.error('Failed to get canvas context');
      }
    } else {
      console.error('Canvas element not found');
    }
    if(canvasref.current)
      ctxref.current.strokeStyle=color
  }, [canvasref, ctxref, color]);
  
  


//   useEffect(()=>{
//     if(canvasref.current)
//     ctxref.current.strokeStyle=color
// },[color,canvasref,ctxref])


useLayoutEffect(()=>{

  if(canvasref?.current){
  const roughcanvas = rough.canvas(canvasref.current);

  if(elements.length>0){
  ctxref.current.clearRect(0,0,canvasref.current.width,canvasref.current.height)  //taki elementt baar baar na draw ho
   }


  elements.forEach(e => {


    if(e.type==="rect"){
      roughcanvas.draw(
        generator.rectangle(e.offsetX,e.offsetY,e.width,e.height,
          {stroke: e.stroke,
          strokeWidth: 2,
          roughness:0}
        ))
    }
  else if(e.type==="pencil"){
roughcanvas.linearPath(e.path,  
  {stroke: e.stroke,
    strokeWidth: 2,
    roughness:0}

);}
    //for linear path rough.camvas can be used
else if(e.type==="line"){
  roughcanvas.draw(
  generator.line(e.offsetX,e.offsetY,e.width,e.height,{stroke: e.stroke,
    strokeWidth: 2,
    roughness:0}
 ))}

})
                  const canvasimg=canvasref.current.toDataURL();
                  socket.emit('whiteboarddata',canvasimg)
  }
  
},[elements,canvasref,ctxref,socket]);


 const handleMousedown=(e)=>{
// console.log("down",e);
const {offsetX,offsetY}=e.nativeEvent


if(tool==="pencil"){
 setElements((prevElements)=>[
 ...prevElements,{
 type:"pencil",
 offsetX,
 offsetY,
 path:[[offsetX,offsetY]],
 stroke:color,
 element:tool,
 }
,
 ])}

 else if(tool==="line"){
  setElements((prevElements)=>[
   ...prevElements,{
    type:"line",
    offsetX,
    offsetY, 
   width:offsetX, //iniitailly nna bane rectangle 
   height:offsetY,
    stroke:color,
 
   },])}


   else if(tool==="rect"){
    setElements((prevElements)=>[
     ...prevElements,{
      type:"rect",
      offsetX, 
      offsetY, 
     width:0, //so that reactngle starts from zero 
     height:0,
      stroke:color,
   
     }

  ])
 }


setDraw(true)
}

 const handleMousemove=(e)=>{
 // console.log("move",e);
 const {offsetX,offsetY}=e.nativeEvent 
 if(Draw){
 
//   pencil ke liye


            if(tool==="pencil"){
              
 const {path}=elements[elements.length-1]
 const newpath=[...path,[offsetX,offsetY]] 
            setElements((prevElements)=>
              prevElements.map((el,index)=>{
                if(index === elements.length-1){  //update the element
            return{
              ...el,
              path:newpath
            }
                }
                else return el
              })
            )}

 else if(tool==="line"){
  setElements((prevElements)=>
              prevElements.map((el,index)=>{
                if(index === elements.length-1){  //update the element
            return{
              ...el,
             width:offsetX,
             height:offsetY
            }
                }
                else return el
              }))
 }
else if(tool==="rect"){

  setElements((prevElements)=>
  prevElements.map((el,index)=>{
    if(index === elements.length-1){  //update the element
return{
  ...el,
 width:offsetX-el.offsetX,
 height:offsetY-el.offsetY,
}
    }
    else return el
  }))
}




}}

   const handleMouseup=(e)=>{
   setDraw(false);
  }

 
  // // Render the component conditionally based on user role
   if (!user?.presenter) {
    return (
      <div className='border border-dark border-3 h-100 w-100 overflow hidden'> 
     
     <img src={img} alt="whiteboard" style={{
      height:window.innerHeight,
      width:window.innerWidth,
     }} />
      </div>
    )
  } 


//////////////////////////////////////////////////////
  
 
//  else{
  return (
   <div onMouseDown={handleMousedown}
   onMouseMove={handleMousemove}
   onMouseUp={handleMouseup}
   className='border border-dark border-3 h-100 w-100 overflow-hidden'>
  <canvas height={window.innerHeight} width={window.innerWidth}
    ref={canvasref}
    ></canvas>
    </div>
  
  )}

