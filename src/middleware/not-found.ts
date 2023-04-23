import { NextFunction, Response, Request } from "express";

const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
	res.status(404).send("Route does not exist");
};

export default notFoundMiddleware;
