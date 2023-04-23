import { NextFunction, Request, RequestHandler, Response } from "express";
import { UnauthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";
import { UserRequest } from "../interfaces.js";
import { JwtPayload } from "jsonwebtoken";
import { ParsedQs } from "qs";
const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer")) {
		throw new UnauthenticatedError("Authentication invalid");
	}

	try {
		const token = authHeader.split(" ")[1];
		const payload = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret) as JwtPayload;
		const testUser = payload.userId === "63b8716cca56cd072f02a514";
		req.user = { userId: payload.userId, testUser };
		next();
	} catch (err: any) {
		throw new UnauthenticatedError(err.message);
	}
};

export default authMiddleware;
