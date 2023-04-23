import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserDocument, UserModel } from "../interfaces.js";
const UserSchema = new mongoose.Schema<UserDocument, UserModel>({
	name: {
		type: String,
		required: [true, "Please provide a name"],
		minlength: 3,
		maxlength: 30,
		trim: true,
	},
	email: {
		type: String,
		required: [true, "Please provide an email"],
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: "Please provde a valid email",
		},
	},
	password: {
		type: String,
		required: [true, "Please provide a password"],
		minlength: 6,
		select: false,
	},
	lastName: {
		type: String,
		default: "lasName",
		maxlength: 30,
		trim: true,
	},
	location: {
		type: String,
		maxlength: 30,
		trim: true,
		default: "my city",
	},
});

// triggers on create and save
UserSchema.pre("save", async function () {
	if (this.modifiedPaths().includes("password")) {
		const salt = await bcrypt.genSalt(10);
		if (this.password) {
			this.password = await bcrypt.hash(this.password, salt);
		}
	} // return array of updated values
});

UserSchema.methods.createJWT = function () {
	return jwt.sign({ userId: this._id }, process.env.JWT_SECRET as jwt.Secret, {
		expiresIn: "10d",
	});
};

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
	const isMatch = await bcrypt.compare(candidatePassword, this.password);
	return isMatch;
};
export default mongoose.model<UserDocument, UserModel>("User", UserSchema);
