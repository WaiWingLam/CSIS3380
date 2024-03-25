const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// Connect to a database bookDB
mongoose.connect('mongodb://localhost:27017/bookDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to Mongoose bookDB')
        app.listen(port, () => {
            console.log('Server is running in port ' + port)
    })
})

// Define a Schema and save as bookSchema
const Schema = mongoose.Schema

const bookSchema = new Schema({
    book: {type: String, required: true},
    author: {type: String, required: true},
    year: {type: Number, required: true}
})

// Create new Book document object
const Book = mongoose.model("Book", bookSchema)

const router = express.Router()

app.use('/api', router)

// Add new Book document objects to bookDB
router.route('/add')
    .post((req, res) => {
        const book = req.body.book
        const author = req.body.author
        const year = req.body.year

        const newBook = new Book({
            book,
            author,
            year
        })
    newBook
        .save()
        .then(() => res.json('Books added'))
})

// bookCollections.js

//reads and logs books from bookDB

router.route('/')
    .get((req, res) => {
    Book.find()
    .then((books) => res.json(books))
})

router.route('/:id')
    .get((req, res) => {
        Book.findById(req.params.id)
        .then((book) => res.json(book))
})

// updateBookDB.js

// Update bookDB with id

router.route('/update/:id')
    .put((req, res) => {
        Book.findById(req.params.id)
        .then((book) => {
            book.book = req.body.book
            book.author = req.body.author
            book.year = req.body.year

            book.save()
            .then(() => res.json('Book updated'))
        })
})

router.route('/updatebytitle/:book')
    .put((req, res) => {
        Book.updateOne(
            { book: req.params.book },
            {
              $set: { 'year': req.body.year},
            })
        .then(() => res.json('Book updated by title'))

})

// deleteBookCollections.js

// Delete items from bookDB

// Delete by ID
router.route('/delete/:id')
    .delete((req, res) => {
        Book.findByIdAndDelete(req.params.id)
        .then(() => res.json('Book deleted'))
})
// Delete by author
router.route('/deletebyauthor/:author')
    .delete((req, res) => {
        Book.deleteMany({ "author" : req.params.author })
        .then(() => res.json('Book deleted by author'))
})