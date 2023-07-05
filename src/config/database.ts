import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();
mongoose.set('strictQuery', false);

let databaseUrl = process.env.DEV_DATABASE_URL || "mongodb://127.0.0.1:27017/carStoreDb";

if (process.env.NODE_ENV === "production") {
    databaseUrl = process.env.PRD_DATABASE_URL!;
}

export default mongoose.connect(databaseUrl);
