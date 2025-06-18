require('dotenv').config()
const express = require('express')
const app = express()
const privateRoutes = require('./routes/privateRoutes')
const publicRoutes = require('./routes/publicRoutes')

app.use(express.json())
app.use('/v1',publicRoutes)
app.use('/v1',privateRoutes)

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
})