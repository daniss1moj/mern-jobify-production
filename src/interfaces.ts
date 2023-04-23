import { Model } from "mongoose";
import { Request } from "express";

export interface UserProps {
	name: string;
	email: string;
	password: string | undefined;
	lastName?: string;
	location?: string;
}

export interface UserDocument extends UserProps {
	createJWT: () => string;
	comparePassword: (candidatePassword: string) => Promise<boolean>;
}

export interface UserModel extends Model<UserDocument> {}

export interface UserRequest extends Request {
	user?: {
		userId: string;
		testUser: boolean;
	};
}

export interface RequestUserInterface {
	userId: string;
	testUser: boolean;
}

export interface QueryInterface {
	createdBy: string;
	status?: string;
	jobType?: string;
	position?: any;
}

export interface StatsInterface {
	pending: number;
	interview: number;
	declined: number;
}
