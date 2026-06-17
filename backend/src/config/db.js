import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

let dbConnectionPromise = null;

const connectDB = async () => {
    if (dbConnectionPromise) return dbConnectionPromise;

    if (!MONGO_URI) {
        console.error('Error: MONGO_URI is not defined in environment variables');
        process.exit(1);
    }

    try {
        dbConnectionPromise = mongoose.connect(MONGO_URI);
        const conn = await dbConnectionPromise;
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log(`Database Name: ${conn.connection.name}`);
        return conn;
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        if (error.message.includes('ECONNREFUSED')) {
            console.error('Tip: This often indicates a DNS issue or that your IP is not whitelisted in MongoDB Atlas.');
        }
        process.exit(1);
    }
};

export { dbConnectionPromise };
export default connectDB;
