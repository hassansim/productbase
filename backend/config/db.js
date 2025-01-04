import mongoose from "mongoose";
import dns from "node:dns";

// Ensure SRV records resolve properly on Windows environments
try {
	dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (e) {
	// ignore if already configured
}

export const connectDB = async () => {
	try {
		let uri = process.env.MONGO_URI || process.env.MONGODB_URI;

		if (!uri) {
			console.log("No MONGO_URI provided in .env. Starting in-memory MongoDB instance...");
			const { MongoMemoryServer } = await import("mongodb-memory-server");
			const mongoServer = await MongoMemoryServer.create();
			uri = mongoServer.getUri();
		}

		const conn = await mongoose.connect(uri);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error: ${error.message}`);
		process.exit(1); // process code 1 code means exit with failure, 0 means success
	}
};
