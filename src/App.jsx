import { useCallback, useEffect, useState,useRef } from 'react'
import './App.css'

function App() {
  const [length,setLength]=useState(8);
  const [numAllowed, setNumAllowed]=useState(false);
  const [charAllowed, setCharAllowed]=useState(false);
  const [password, setPassword]=useState("");


  // useRef Hook
  const passwordRef=useRef(null);



  const passwordGenarator= useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numAllowed){
      str+='0123456789'
    }
    if(charAllowed){
      str+="~!@#$%^&*(){}+-[]_<>|?";
    }

    for(let i=1;i<=length;i++){
      const char = Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(char);
    }
    setPassword(pass)

  },[length, numAllowed, charAllowed,setPassword])


  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,3);
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(()=>{
    passwordGenarator();
  },[length,numAllowed, charAllowed,passwordGenarator])


  return (
    <>
      <div className='w-full h-60 flex flex-col justify-evenly max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-center text-2xl text-white'>Password Generator</h1>
        <div className='flex shadow rounded-lg  overflow-hidden mb-4'>
          <input 
            type='text'
            value={password}
            className='outline w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
        </div>

        <div className='flex items-center  text-sm gap-x-2'>

          <div className='flex items-center gap-x-1'>
            <input
              type='range'
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e)=>{ setLength(e.target.value)}}
            />
            <label htmlFor='length'>length: {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={numAllowed}
              id='numberInput'
              onChange={()=>{ setNumAllowed((prev)=> !prev) }}
            />
            <label htmlFor='numbers'>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={charAllowed}
              id='charInput'
              onChange={()=>{ setCharAllowed((prev)=> !prev) }}
            />
            <label htmlFor='character'>Character</label>
          </div>


          </div>

      </div>
    </>
  )
}


export default App
