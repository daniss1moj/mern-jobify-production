import { UserRequest } from "../interfaces.js";
import BadRequestError from "../errors/bad-request.js";
import { Response, NextFunction } from "express";

const testUser = (req: UserRequest, res: Response, next: NextFunction) => {
	if (req.user && req.user.testUser) {
		throw new BadRequestError("Test User. Read only");
	}
	next();
};

export default testUser;
