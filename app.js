const express = require("express")
const app = express()
const routes = require("./routes")

app.use(express.json())
app.use(express.urlencoded({extends: true}))

app.use("/", routes)

console.log('listening on 4000')
app.listen(4000)
