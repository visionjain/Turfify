import mongoose from 'mongoose';

export async function connect() {
    try{
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;
        
        connection.on('connected',()=>{
            console.log('mongoDB connected Successfully');
        })

        connection.on('error',(err)=>{
            console.log('mongoDB connection error. please make sure mongo is running.' + err);
            process.exit();
        })

    } catch (error) {
        console.log('something is wrong!');
        console.log(error);
    }
}