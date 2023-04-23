import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError, UnauthenticatedError } from "../errors/index.js";
import attachCookies from "../utils/attachCookies.js";
import { Request, Response } from "express";
import { UserRequest } from "../interfaces.js";

const register = async (req: Request, res: Response) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		throw new BadRequestError("Please provide all values");
	}
	const userAlreadyExists = await User.findOne({ email });
	if (userAlreadyExists) {
		throw new BadRequestError("You have already registred");
	}

	const user = await User.create({
		name,
		email,
		password,
	});
	const token = user.createJWT();
	attachCookies({ res, token });
	res.status(StatusCodes.CREATED).json({
		user: {
			name: user.name,
			email: user.email,
			lastName: user.lastName,
			location: user.location,
		},
		token,
		location: user.location,
	});
};

const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw new BadRequestError("Please provide all values");
	}
	const user = await User.findOne({ email }).select("+password");
	if (!user) {
		throw new UnauthenticatedError("Invalid email or password");
	}
	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) {
		throw new UnauthenticatedError("Invalid email or password");
	}
	const token = user.createJWT();
	attachCookies({ res, token });
	user.password = undefined;

	res.status(StatusCodes.OK).json({
		user,
		token,
		location: user.location,
	});
};

const updateUser = async (req: UserRequest, res: Response) => {
	const { email, name, lastName, location } = req.body;
	if (!email || !name || !lastName || !location) {
		throw new BadRequestError("Please provide all values");
	}
	const user = req.user && (await User.findOne({ _id: req.user.userId }));
	if (!user) {
		throw new NotFoundError("User does not exist");
	}

	user.email = email;
	user.name = name;
	user.lastName = lastName;
	user.location = location;
	await user.save();

	const token = user.createJWT();
	attachCookies({ res, token });
	res.status(StatusCodes.OK).json({
		user,
		token,
		location: user.location,
	});
};

export { register, login, updateUser };
