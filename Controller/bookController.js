const {Book} = require('../Model/booksModel');

// GET BOOK FEATURES
class bookFeatures {
    constructor(Query, userQuery) {
        this.Query = Query;
        this.userQuery = userQuery;
    }

    filter() {
        // Filter
        let userQueryObj = {...this.userQuery};
        // Delete Unnessery Fields
        ['page', 'sort', 'limit', 'fields'].forEach(function (item) {
            delete userQueryObj[item];
        });
        this.Query = this.Query.find(userQueryObj);
        return this;
    }

    sort() {
        if (this.userQuery.sort) {
            const sortBy = this.userQuery.sort.split(',').join(' ');
            this.Query = this.Query.sort(sortBy);
        }
        return this;
    }
}

const getBooks = async function (req, res) {
    try {
        let books = new bookFeatures(Book.find(), req.query);
        // Filter, Sort
        books = books.filter().sort();
        const docs = await books.Query;

        return res.status(200).json({
            status: 'success',
            data: {
                data: docs,
            },
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

const addBook = async function (req, res) {
    try {
        const newBook = await Book.create(req.body);

        return res.status(201).json({
            status: 'success',
            data: {
                data: newBook,
            },
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

const deleteBook = async function (req, res) {
    try {
        const id = req.params.id;
        await Book.findByIdAndDelete(id);
        return res.status(200).json({
            status: 'success',
            message: 'Book Deleted Successfully',
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};

module.exports = {getBooks, addBook, deleteBook};
