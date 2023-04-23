import { UnauthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { UserRequest } from "../interfaces.js";
const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
	// const token = req.cookies.token;
	// if (!token) {
	// 	throw new UnauthenticatedError("Authentication invalid!");
	// }
	// try {
	// 	const payload = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret);
	// 	const testUser = payload.userId === "63b8716cca56cd072f02a514";
	// 	req.user = { userId: payload.userId, testUser };
	// 	next();
	// } catch (err) {
	// 	throw new UnauthenticatedError(err.message);
	// }
};

export default authMiddleware;
