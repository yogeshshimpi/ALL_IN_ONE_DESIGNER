import mongoose  from "mongoose";


const connectionUrl = 'mongodb://localhost:27017/all-in-one-designer'


export const connection = async() =>{
        try {
            await mongoose.connect(connectionUrl)
            console.log('database connected ')
        } catch (error) {
            console.error('MongoDB connection error:', error);
            return 0
        }
}
