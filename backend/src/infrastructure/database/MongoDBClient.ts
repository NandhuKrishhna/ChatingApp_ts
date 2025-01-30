import mongoose from "mongoose"
import { MONGODB_URL } from "../../shared/utils/env"



const connectToDataBase = async () => {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log('Connected to Database')
    } catch (error) {
        console.log("Error in connecting to databse", error);
        process.exit(1)
    }
}

export default connectToDataBase