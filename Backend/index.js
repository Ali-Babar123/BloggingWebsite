const express = require('express');
const app = express();
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose');

dotenv.config()

app.use(cors({
    origin: 'https://blogging-website-weld.vercel.app/' // middleware cors to connect with frontend
}))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://blogging-website-weld.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use(express.json()) // middleware 

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
