import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";
import moment from "moment";
import { QueryInterface, StatsInterface, UserRequest } from "../interfaces.js";
import { Response } from "express";

const createJob = async (req: UserRequest, res: Response) => {
	const { position, company } = req.body;

	if (!position || !company) {
		throw new BadRequestError("Please provide all values");
	}

	if (!req.user) {
		throw new UnauthenticatedError("Unauthenticated error");
	}

	req.body.createdBy = req.user.userId;
	const job = await Job.create(req.body);
	res.status(StatusCodes.CREATED).json({ job });
};

const deleteJob = async (req: UserRequest, res: Response) => {
	const { id: jobId } = req.params;

	if (!req.user) {
		throw new UnauthenticatedError("Unauthenticated error");
	}

	const job = await Job.findOne({
		_id: jobId,
	});
	if (!job) {
		throw new NotFoundError("No job with this id");
	}

	checkPermissions(req.user, job.createdBy);

	await job.remove();

	res.status(StatusCodes.OK).json({
		msg: "Job removed successfully!",
	});
};

const getAllJobs = async (req: UserRequest, res: Response) => {
	const { status, jobType, sort, search } = req.query;
	if (!req.user) {
		throw new UnauthenticatedError("Unauthenticated error");
	}

	const queryObj: QueryInterface = {
		createdBy: req.user.userId,
	};
	if (status && status !== "all") {
		queryObj.status = status as string;
	}
	if (jobType && jobType !== "all") {
		queryObj.jobType = jobType as string;
	}
	if (search) {
		queryObj.position = { $regex: search, $options: "i" };
	}

	let result = Job.find(queryObj);

	if (sort === "latest") {
		result.sort({ createdAt: -1 });
	}

	if (sort === "oldest") {
		result.sort({ createdAt: 1 });
	}

	if (sort === "a-z") {
		result.sort({ position: 1 });
	}

	if (sort === "z-a") {
		result.sort({ position: -1 });
	}

	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1) * limit;

	result = result.skip(skip).limit(limit);
	const jobs = await result;

	const totalJobs = await Job.countDocuments(queryObj);
	const numOfPages = Math.ceil(totalJobs / limit);
	res.status(StatusCodes.OK).json({
		jobs,
		totalJobs,
		numOfPages,
	});
};

const updateJob = async (req: UserRequest, res: Response) => {
	const { id: jobId } = req.params;
	const { company, position } = req.body;
	if (!req.user) {
		throw new UnauthenticatedError("Unauthenticated error");
	}

	if (!position || !company) {
		throw new BadRequestError("Please provide all values!");
	}
	const job = await Job.findOne({
		_id: jobId,
	});
	if (!job) {
		throw new NotFoundError("No job with this id");
	}

	checkPermissions(req.user, job.createdBy);

	const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(StatusCodes.OK).json({
		updatedJob,
	});
};

const showStats = async (req: UserRequest, res: Response) => {
	if (!req.user) {
		throw new UnauthenticatedError("Unauthenticated error");
	}

	let stats = await Job.aggregate([
		{
			$match: {
				createdBy: new mongoose.Types.ObjectId(req.user.userId),
			},
		},
		{
			$group: {
				_id: "$status",
				count: {
					$sum: 1,
				},
			},
		},
	]);
	const newStats: StatsInterface = stats.reduce((acc, curr) => {
		const { _id: title, count } = curr;
		acc[title] = count;
		return acc;
	}, {});

	const defaultStats = {
		pending: newStats.pending || 0,
		interview: newStats.interview || 0,
		declined: newStats.declined || 0,
	};
	let monthlyApplications = await Job.aggregate([
		{ $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
		{
			$group: {
				_id: {
					year: { $year: "$createdAt" },
					month: { $month: "$createdAt" },
				},
				count: { $sum: 1 },
			},
		},
		{ $sort: { "_id.year": -1, "_id.month": -1 } },
		{ $limit: 6 },
	]);
	monthlyApplications = monthlyApplications
		.map((item) => {
			const {
				_id: { year, month },
				count,
			} = item;
			const date = moment()
				.month(month - 1)
				.year(year)
				.format("MMM Y");

			return { date, count };
		})
		.reverse();
	res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
