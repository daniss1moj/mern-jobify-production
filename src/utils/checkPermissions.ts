import UnauthenticatedError from "../errors/unauth.js";
import { RequestUserInterface } from "../interfaces.js";

const checkPermissions = (requestUser: RequestUserInterface, resourceUserId: any) => {
	if (requestUser.userId === resourceUserId.toString()) return;
	throw new UnauthenticatedError("Not authorized to access this route");
};

export default checkPermissions;
