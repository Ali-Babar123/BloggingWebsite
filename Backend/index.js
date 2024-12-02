const connectToMongo = require('./db')
const express = require('express');
const app = express();
const cors = require('cors')


app.use(cors({
    origin: 'http://localhost:5173' // middleware cors to connect with frontend
}))

app.use(express.json()) // middleware 
app.use('/uploads', express.static('uploads'))

const port = 3000;
connectToMongo();

app.use('/api/auth', require('./Routes/auth'));
app.use('/api/blog', require('./Routes/blog'))


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
