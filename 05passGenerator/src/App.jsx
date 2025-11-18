import { useState , useCallback } from 'react'
import './App.css'

function App() {
   
  const [length , setLength] = useState(8);
  //basically password me ya toh number loge ya nhi so true or false case banega isme and useState isme bhi use krna padega as number le rhe ho ya nhi toh password generate hoga dubara aur UI me change horha ha   
  const [numberAllowed , setNumberAllowed] = useState(false)
  const [charAllowed , setCharAllowed] = useState(false)
  //Hum password generate krvayenge isliye default me kuch nhi diya hum kisi method ya Api call se data add krvadenge aur UI m change hojayega 
  const [password , setPassword] = useState("")

  //useCallback hook is a react hook that lets you cache a func definition between re renders mtlb merepe ek func ha usko tum jitna hoske cache me rkhlo mtlb memory me rkhlo aur agar me usko dubara se run kru toh jitna part phela ka use hota ha usse use krlo aur joh nhi hota voh nhi ho parha use 
  // isme hum 2 parameters pass krte ha phela function second dependencies array ki form me dete ho  basically tumhara voh kispe depend kr rha aur kis se change ho rha voh dalte ha isme idhar hum length , numberAllowed , charAllowed and setPassword ko dalenge dependencies me setPassword ko bhi derhe as iske basis pe hum cheeze change krenge 
  //useCallback(fn , dependencies)
  const passwordGenerator = useCallback(()=> {
     let pass = "" // basically yeh toh theek ki hum password isme generate krvadegne aur isse hum setPassword me paas krdenge toh set hojayega 

     //string me data ayega jiske through m password banunga 
     let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
     if(numberAllowed) str+="0123456789"
     if(charAllowed) str+="!@#$%^&*()_+-={}[]"

     //Loop to generate random password and till our length as that only we need
     //array is a variable name and Array this is object/function in JS just like Math function String Object like that
     for(let i=1; i<=array.length; i++) {
      //iss se character aya ha mtlb array ke index ki koi random value ayi h iss se hume array ki koi index value mil rhi ha but hume index nhi uski value chaiye  toh hum use krenge str.charAt(char) isse kya milega ki uss index pe kya value ha 
        let char = Math.floor(Math.random * str.length + 1);
        pass = str.charAt(char)
     }

     setPassword(pass)

  } , [length , numberAllowed , charAllowed , setPassword])

  
  return (
    <>
     <h1 className="passheader">Password Generator</h1>
    </>
  )
}

export default App
