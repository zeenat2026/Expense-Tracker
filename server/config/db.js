import mongoose from 'mongoose';


const connectDb= async() => {
try {
    if(mongoose.connection.readyState===1) return
const connectionInstance= await mongoose.connect(process.env.MONGO_URI);
console.log('Mongodb connected successfully',connectionInstance.connection.host);

} catch (error) {
    console.log(error.message);
    throw error
}
}

export default connectDb