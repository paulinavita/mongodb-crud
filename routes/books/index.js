const router = require("express").Router()
const BookController = require('../../controllers/BookController')

router.get("/", BookController.findAll)
router.post("/", BookController.createBook)
router.get("/:isbn", BookController.findOne)
router.put("/:isbn", BookController.updateOne)
router.delete("/:isbn",BookController.deleteOne)
router.delete("/", BookController.bulkDelete)
router.patch("/:isbn", BookController.updateField)

module.exports = router