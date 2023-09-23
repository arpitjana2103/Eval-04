/**
- Title
- Author
- Genre (a dropdown select tag with the following values: Fiction, Science, Comic)
- Description (a textarea input field)
- Price
*/

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A book must have a name'],
    },
    author: {
        type: String,
        required: [true, 'A book must have a author'],
    },
    genre: {
        type: String,
        required: [
            true,
            'A book must have a genre [ Fiction / Science / Comic ]',
        ],
        enum: ['Fiction', 'Science', 'Comic'],
    },
    price: {
        type: Number,
        required: [true, 'A book must have a price'],
    },
    description: {
        type: String,
    },
});

const Book = mongoose.model('book', bookSchema);
module.exports = {Book};
