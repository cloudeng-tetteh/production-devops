import { useState } from "react"
import axios from "axios"

export default function App() {

const [message,setMessage]=useState("")

async function connect(){

const response=
await axios.get(
"http://localhost:5000/health"
)

setMessage(response.data.message)

}

return(

<div
style={{
padding:40
}}
>

<h1>
DevOps Platform
</h1>

<button
onClick={connect}
>
Test API
</button>

<h2>
{message}
</h2>

</div>

)

}
