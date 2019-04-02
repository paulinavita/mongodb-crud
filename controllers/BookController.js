const {MongoClient} = require('mongodb')
const url = 'mongodb://localhost:27017'
const dbName = 'book-collection'

class BookController {

    static findAll (req,res) {
        let client = new MongoClient(url, { useNewUrlParser: true })
        client.connect()
        .then(() => {
            console.log('find all')
            let db = client.db(dbName)
            const books = db.collection('books')
            return books.find({}).toArray()  
        })
        .then(books => {
            res.status(200).json({books})
            client.close()
        })
        .catch(err => {
            console.log(err, "masuk kesini")
            res.status(400).json({msg : err.message})
        })
    }

    static createBook(req,res) {
        let client = new MongoClient(url, { useNewUrlParser: true })
        client.connect()
        .then(() => {
            console.log('inserting data')
            let db = client.db(dbName)
            const books = db.collection('books')
            return books.insertOne({
                "isbn": req.body.isbn,
                "title" : req.body.title,
                "author" : req.body.author,
                "category" : req.body.category,
                "stock" : req.body.stock
            })    
        })
        .then(createdBook => {
            res.status(200).json({
                msg : `Success inserting new document`,
                data : createdBook
            })
            client.close()
        })
        .catch(err => {
            res.status(400).json({msg : err.message})
        })
    }

    static findOne (req,res) {
        let client = new MongoClient(url, { useNewUrlParser: true })
        client.connect()
        .then(() => {
            console.log('finding one data')
            let db = client.db(dbName)
            const books = db.collection('books')
            return books.findOne(
                {"isbn" : req.params.isbn}
            )
        })
        .then(foundBook => {
            if (foundBook) res.status(200).json({msg : 'Found data', data : foundBook})
            else res.status(404).json({msg : 'No such ISBN'})
            client.close()
        })
        .catch(err => {
            res.status(400).json({msg : err.message})
        })
    }

    static updateOne (req,res) {
        let client = new MongoClient(url, { useNewUrlParser: true })
        let {title, author, category, stock} = req.body
        client.connect()
        .then(() => {
            console.log('updating one data')
            let db = client.db(dbName)
            const books = db.collection('books')
            return books.updateOne({
                "isbn" : req.params.isbn
            }, { 
                $set : {"isbn" : req.params.isbn, title, author, category, stock}
            })
            
        })
        .then(updated => {
            res.status(200).json({msg : 'Updated data', data : updated})
            client.close()
        })
        .catch(err => {
            res.status(400).json({msg : err.message})
        })
    }

    static deleteOne(req, res) {
        let client = new MongoClient(url, { useNewUrlParser: true })
        client.connect()
        .then(() => {
            let db = client.db(dbName)
            const books = db.collection('books')

            return books.deleteOne({"isbn" : req.params.isbn})
        })
        .then(deleted => {
            res.status(200).json(deleted)
        })
        .catch((err) => {
            res.status(400).json({msg : err.message})
        })
    }

    static bulkDelete (req,res) {
        let client = new MongoClient(url, { useNewUrlParser: true })
        client.connect() 
        .then(() => {
            let db = client.db(dbName)
            const books = db.collection('books')
            return books.deleteMany({"author" : req.body.author})
            
        })
        .then(deleted => {
            res.status(200).json(deleted)
        })
        .catch(err => {
            res.status(400).json({msg : err.message})
        })
    }

    static updateField (req, res) {
        let client = new MongoClient(url, { useNewUrlParser: true })
        client.connect()
        .then(() => {
            console.log('updating one field')
            let db = client.db(dbName)
            const books = db.collection('books')

            return books.update({
                "isbn" : req.params.isbn
            }, { 
                $set : {"title" : req.body.title},
            })
        })
        .then(updated => {
            res.status(200).json({msg : 'Updated data', data : updated})
            client.close()
        })
        .catch(err => {
            res.status(400).json({msg : err.message})
        })
    }

}

module.exports = BookController

