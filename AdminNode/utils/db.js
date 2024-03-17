const mongoose = require('mongoose')
const env = require('dotenv')

env.config()
const mongo_db = process.env.MONGO_DB_KEY

const connectDatabase = async () => {
    await mongoose.connect(mongo_db).then(()=>{
        console.log("Database connected")
    }).catch((error)=>{
        console.log("Erorr connecting database "+error)
    })
}

connectDatabase()

module.exports = connectDatabase