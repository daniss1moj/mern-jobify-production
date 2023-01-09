import { UnauthenticatedError } from '../errors/index.js';
import jwt from 'jsonwebtoken';
const authMiddleware = async (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith('Bearer')) {
		throw new UnauthenticatedError('Authentication invalid');
	}

	try {
		const token = authHeader.split(' ')[1];
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		const testUser = payload.userId === '63b8716cca56cd072f02a514';
		req.user = { userId: payload.userId, testUser };
		next();
	} catch (err) {
		throw new UnauthenticatedError(err.message);
	}
};

export default authMiddleware;
