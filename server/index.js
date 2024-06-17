const express = require('express')
const app = express()
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser')



app.use(cors());
app.use(express.json());
app.use(bodyParser.text({limit: '50mb'}));

const bookRouter = require('./routes/book');
const genreRouter = require('./routes/genre');

app.use('/books', bookRouter);
app.use('/genres', genreRouter);

mongoose.connect('mongodb://localhost:27017/bookapp');

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

const PORT = 3000;
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
