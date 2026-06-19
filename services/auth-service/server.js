require("dotenv").config()

const express=
require("express")

const cors=
require("cors")

const db=
require("./config/db")

const auth=
require(
"./routes/authRoutes"
)

const app=
express()

app.use(cors())

app.use(
express.json()
)

app.use(
"/auth",
auth
)

app.get(
"/health",
async(
req,
res
)=>{

try{

await db.query(
"SELECT 1"
)

res.send({

status:
"healthy"

})

}

catch{

res
.status(500)

.send()

}

}

)

app.listen(

5000,

()=>{

console.log(
"started"
)

}
)
