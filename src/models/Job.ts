import mongoose from 'mongoose';
const JobSchema = new mongoose.Schema(
	{
		company: {
			type: String,
			required: [true, 'Please provide a company'],
			maxlength: 50,
		},
		position: {
			type: String,
			required: [true, 'Please provide a position'],
			maxlength: 100,
		},
		status: {
			type: String,
			enum: ['interview', 'declined', 'pending'],
			default: 'pending',
		},
		jobType: {
			type: String,
			enum: ['full-time', 'part-time', 'remote', 'intership'],
			default: 'full-time',
		},
		jobLocation: {
			type: String,
			default: 'my city',
			required: true,
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: [true, 'Please provide a user'],
		},
	},
	{ timestamps: true },
);

export default mongoose.model('Job', JobSchema);
