const express = require('express');
const app = express();
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose');

dotenv.config()

app.use(express.json())

const port = process.env.PORT;
mongoose.connect(process.env.MONGO_URL)

app.use('/api/auth', require('./Routes/auth'));
app.use('/api/blog', require('./Routes/blog'))


app.use('/', (req, res) => {
    res.send('Server is running')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
