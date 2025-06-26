require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes/routes')

app.use(express.json())
app.use('/v1',routes)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
})