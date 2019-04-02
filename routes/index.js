const router = require("express").Router()
const books = require("./books")

router.get("/", (req, res) => {
    res.status(200).json({message : 'connected'})
})

router.use("/books", books)


module.exports = router