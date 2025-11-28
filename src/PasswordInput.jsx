import {useState} from 'react';

const PasswordInput =()=> {

   const[showPassword,setshowPassword]=useState(false)
   console.log(showPassword);

//   ternary operator:  {condition ? "true":"false"}   

    return(
       <>
         <input type ={showPassword ?"text":"password"}
          placeholder="Enter Password"/> 
         <button onClick={()=>setshowPassword(!showPassword)}>      
            {showPassword?"hide":"Show"}</button>   

        </>
    )
}

export default PasswordInput;