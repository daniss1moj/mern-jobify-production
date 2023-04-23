import UnauthenticatedError from "../errors/unauth.js";
const checkPermissions = (requestUser, resourceUserId) => {
    if (requestUser.userId === resourceUserId.toString())
        return;
    throw new UnauthenticatedError("Not authorized to access this route");
};
export default checkPermissions;
