const express = require('express')
const dotenv = require('dotenv')
require('./utils/db.js')
const bodyParser = require('body-parser')
const routes = require('./routes/adminroutes')
const jawanroutes = require('./routes/jawanroutes')
const cors = require('cors')

dotenv.config()
port = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(bodyParser.json())
// Admin Routes
app.use('/api/admin', routes)
// Jawan Routes
app.use('/api/jawan', jawanroutes)

app.listen(port, () => {
    console.log(`Server up as running on port ${port}`);
});