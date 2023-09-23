const express = require('express');
const bookController = require('../Controller/bookController');

const bookRouter = express.Router();

bookRouter.route('/').get(bookController.getBooks).post(bookController.addBook);
bookRouter.route('/:id').delete(bookController.deleteBook);

module.exports = {bookRouter};
