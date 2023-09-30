import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Debugging: Print the resolved path to the .env file
const envPath = path.join(fileURLToPath(import.meta.url), '../', '.env');

dotenv.config({
    path: envPath
});

console.log('MONGO_URI from environment variables:', process.env.MONGO_URI);

mongoose.set('strictQuery', false);

const connectionToDB = async () => {
    try {
        const { connection } = await mongoose.connect("mongodb+srv://deepakkumarbansal:ctHjNuDYaXV0cuzY@cluster0.pxicugw.mongodb.net/LMS_System");
        if (connection) {
            console.log(`Connected to DB: ${connection.host}`);
        }
    } catch (e) {
        console.error(e.message);
        process.exit(1);
    }
};

export default connectionToDB;
