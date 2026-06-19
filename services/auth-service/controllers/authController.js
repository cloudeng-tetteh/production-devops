const db =
require("../config/db")

const bcrypt =
require("bcryptjs")

const jwt =
require("jsonwebtoken")

exports.register=
async(req,res)=>{

try{

const {
email,
password
}=req.body

const hash=
await bcrypt.hash(
password,
10
)

await db.query(

`
INSERT INTO users
(email,password)

VALUES
($1,$2)
`,

[
email,
hash
]

)

res.send({

message:
"registered"

})

}

catch(e){

res.status(500)

.send({

error:
e.message

})

}

}



exports.login=
async(req,res)=>{

const {
email,
password
}=req.body

const result=
await db.query(

`
SELECT *
FROM users
WHERE email=$1
`,

[
email
]

)

if(
result.rows.length===0
){

return res
.status(401)
.send()

}

const user=
result.rows[0]

const ok=
await bcrypt.compare(
password,
user.password
)

if(
!ok
){

return res
.status(401)
.send()

}

const token=
jwt.sign(

{
id:
user.id
},

"secret",

{
expiresIn:
"1d"
}

)

res.send({

token

})

}
