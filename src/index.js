const express = require('express')
const cors = require('cors')
require('./db/mongoose')
const userRouter = require('./routers/user')
const dreamRouter = require('./routers/dream')

const app = express()
const port = process.env.PORT || 8080

app.use(cors())

// Parses incoming JSON to an object to be accessed by the Request Handlers
app.use(express.json())

// Plug modulised routes into app
app.use(userRouter)
app.use(dreamRouter)

app.get('/', (req, res) => {
    res.json({ message: 'Docker is easy!' })
})

app.listen(port, () => {
    console.log('Server is on port',  port)
})

// To start database
// /users/gabbs/mongodb/bin/mongod.exe --dbpath=/users/gabbs/mongodb-data 

// To start server
// npm run dev 