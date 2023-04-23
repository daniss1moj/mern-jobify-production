import { StatusCodes } from "http-status-codes";
import CustomAPIError from "../errors/custom-api.js";
import { UserRequest } from "../interfaces.js";
import { NextFunction, Response } from "express";

const errorHandlerMiddleware = (err: any, req: UserRequest, res: Response, next: NextFunction) => {
	const defaultError = {
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || "Something went wrong, try again later",
	};

	if (err.name === "ValidationError") {
		defaultError.statusCode = StatusCodes.BAD_REQUEST;
		defaultError.msg = err.message;
		// defaultError.msg = Object.values(err.errors)
		// 	.map((item) => item.message)
		// 	.join(", ");
	}
	if (err.code && err.code === 11000) {
		defaultError.statusCode = StatusCodes.BAD_REQUEST;
		defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`;
	}
	res.status(defaultError.statusCode).json({
		msg: defaultError.msg,
	});
};

export default errorHandlerMiddleware;
