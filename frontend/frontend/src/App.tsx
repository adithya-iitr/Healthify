import { useState } from "react";
import { useSearchParams } from "react-router-dom"
function App() {
  const [response, setResponse]=useState('');
  const [searchParams] = useSearchParams(); // Destructure searchParams from the hook
  const token = searchParams.get('token');
  async function clickHandler(){
    const response=await fetch(`http://localhost:8000/auth/verify-link/?token=${token}`,
    {
      method:"POST",
      
    })
    const res=await response.text();
    setResponse(res)
  }

  return (
    <>
     <button onClick={clickHandler}>verify email</button>
     {response}
    </>
  )
}

export default App
