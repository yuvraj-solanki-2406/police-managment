const express = require('express')
const dotenv = require('dotenv')
require('./utils/db.js')
const bodyParser = require('body-parser')
const routes = require('./routes/adminroutes')
const jawanroutes = require('./routes/jawanroutes')
const user_router = require('./routes/userroutes.js')
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
// Normal User Routes
app.use('/api/user', user_router)

app.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
});
