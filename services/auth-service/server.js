require("dotenv").config()

const express=
require("express")

const cors=
require("cors")

const {Pool}=
require("pg")

const app=
express()

app.use(cors())

const db=
new Pool({

host:
process.env.DB_HOST,

port:
process.env.DB_PORT,

user:
process.env.DB_USER,

password:
process.env.DB_PASSWORD,

database:
process.env.DB_NAME

})

app.get(
"/health",
async(req,res)=>{

try{

await db.query(
"SELECT NOW()"
)

res.send({

status:
"OK",

message:
"Auth Service Connected"

})

}

catch{

res.status(500)

.send({

status:
"ERROR"

})

}

}

)

app.listen(

5000, '0.0.0.0',

()=>{

console.log(
"running"
)

}

)
