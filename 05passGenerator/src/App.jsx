import { useState , useCallback , useEffect , useRef } from 'react'
import './App.css'

function App() {
   
  const [length , setLength] = useState(8);
  //basically password me ya toh number loge ya nhi so true or false case banega isme and useState isme bhi use krna padega as number le rhe ho ya nhi toh password generate hoga dubara aur UI me change horha ha   
  const [numberAllowed , setNumberAllowed] = useState(false)
  const [charAllowed , setCharAllowed] = useState(false)
  //Hum password generate krvayenge isliye default me kuch nhi diya hum kisi method ya Api call se data add krvadenge aur UI m change hojayega 
  const [password , setPassword] = useState("")
  
  //useRef hook agar default value ha toh parameter m paas krskte ha abhi nhi ha isliye default  abhi isme koi reference nhi ha 
  const passwordRef = useRef(null)

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
     for(let i=1; i<=length; i++) {
      //iss se character aya ha mtlb array ke index ki koi random value ayi h iss se hume array ki koi index value mil rhi ha but hume index nhi uski value chaiye  toh hum use krenge str.charAt(char) isse kya milega ki uss index pe kya value ha 
        let char = Math.floor(Math.random() * str.length + 1);
        //hum yaha har character ko concatenate krenge pass variable me 
        pass += str.charAt(char)
     }

     setPassword(pass)

     // setPassword optimization ke liye dala ha iske bina bhi chal rha ha koi dikkat nhi ha but yaha pe memoization ka concept ha toh general concept ha ki uska ek method esa bhi de do jaha pr values set horhi ha  agar me password likhdu setPassword ki jagah toh tum infinite loop m faas jaoge bcuz password har instance pe update ho rha ha  yeh dependecies apke function ko run krne ke responsible nhi ha memoize krne ke responsible ha  usko optimize krta h usko cache me rkhta h yeh useCallback aur uski joh dependecie array ha voh useEffect se alag ha hum useCallback m dependencies me esi cheeze dete ha jiss se uss method ko optimize krlo but useEffect me hum yeh baat kr rhe ha ki inh method me agar kuch dikkat ho toh dubara se run krdo setPassword se optimize horha ha tum cache me rkh rhe ho run nhi kr rhe run tumara useEffect se hoga 
  } , [length , numberAllowed , charAllowed , setPassword])

  //dependency callback me sirf ek hi ayegi as hum sirf copy hi kr rhe ha nhi bhi doge toh chal jayega 
  const copyPasswordToClipboard = useCallback(()=> {
   // hum passwordRef isliye le rhe ha as kuch transition ya effect aske idhar hum select kr parhe ha bcuz of ref uske bina bhi chal jayega but copied show nhi hoga 
    passwordRef.current?.select() // passwordRef ki current value se select kr rhe ha optional select krenge ki manlo agar current value 0  ho toh 

    //slight optimization u can also tell how much to select 
    passwordRef.current?.setSelectionRange(0,3) // yeh sirf phele 3 characters ko select krega

    //hum react me kaam kr rhe ha isliye m window likh pa rha hun 
    window.navigator.clipboard.writeText(password)

  } , [password])


  // password generator ese run nhi horha tha passwordGenerator() isliye abh uske baad hum new hook padh rhe ha 
  //useEffect hook  isko abhi ham directly use kr rhe ha explanation baad me isko koi variable me store krne ki jurat ni ha 2 cheeze chaiye isme ek apka callback ek apka dependency array 


  useEffect(()=>{
     passwordGenerator()
  } , [length , numberAllowed , charAllowed , passwordGenerator])

  
  return (
       <div className="outerdiv">
        <h1 className="passHeading">Password Generator</h1>
         <div className="innerdiv">
          <input className="passBar" 
          type="text"
          value = {password} // as in the end uss input tag me tumhe voh password lana ha joh generate kiya ha 
          placeholder="Password"
          //koi bhi reference lena ha toh har ek input ya argument me ek ref={} pass krskte ho ref me denge joh variable banaya
          ref={passwordRef}
          />

       {/* //useRef hook yeh ek reference hook h kisi bhi cheez ka jabh mujhe reference lena hota ha toh useRef ko use krte ha useRef ko use krne ke kiye apko usko ek variable banana padta ha  */}

          <button onClick = {copyPasswordToClipboard} className="copybutton">copy</button>
         </div>
         <div className="">
          <div className="innerdiv2">
            <input 
            //slider banane ke liye type range lenge 
            type="range"
            //as range ha toh min aur max dena padega 
            min={6} 
            max={100}
            value={length} // as slider move krenge toh length change hogi isliye yeh value length se link hogi 
            className="cursor-pointer"
            //onchange event ha yeh directly nhi deskte event pass krte ha as jabh tk event pass nhi krunga tab tk setlength call nhi krpayega 
            onChange = {(e)=> setLength(e.target.value) }
             />
             {/* <p>Length: {length}</p> yeh dekhenge ki yeh use krenge ya nhi*/}
             <label className="label1">Length: {length}</label>
          </div>
          <div className="innerdiv3">
            <input
              type="checkbox" 
              defaultChecked={numberAllowed}
              id="numberInput"
              // onChange={(prev)=> setNumberAllowed(!prev) }
  //Basically jabh hume default value milegi means false aur jabh change hoga onchange onclick mtlb same ha toh basically jabh change hoga toh value true hogi toh iss method se hum reverse value ko method me de denge easy
              onChange={()=> {
                setNumberAllowed((prev)=>!prev)}
              }
            />
            <label className="label2">Numbers</label>
          </div>
          <div>
            <div className="innerdiv4">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                // onChange={()=> {setCharAllowed(true)}} yeh hum nhi likhenge as voh fir true hi rehga tumhara checkbox check uncheck hota rhega but yeh true hi rhega ese nhi krskte 
                onChange={()=> {
                    setCharAllowed((prev)=>!prev)}
                }
              />
              <label className="label3">Characters</label>
            </div>
          </div>
         </div>
      </div> 
  )
}

export default App
