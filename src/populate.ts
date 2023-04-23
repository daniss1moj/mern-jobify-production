import dotenv from "dotenv";
dotenv.config();
import { readFile } from "fs/promises";
import Job from "./models/Job.js";
import connectDB from "./db/connect.js";
import { promises as fsPromises } from "fs";

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URL as string);
		await Job.deleteMany();
		const jsonProducts = JSON.parse(
			await fsPromises.readFile(new URL("./mock-data.json", import.meta.url), "utf8"),
		);
		await Job.create(jsonProducts);
		console.log("Success");
		process.exit(0);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

start();
