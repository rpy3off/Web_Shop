import mongoose from 'mongoose'

const connectToDatabse = async() => {
    try {
        mongoose.set('strictQuery', false)
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        console.log(`MonogoDB Connected: ${connect.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
    }
}

export default connectToDatabse