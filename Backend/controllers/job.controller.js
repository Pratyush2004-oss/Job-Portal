import { Job } from "../models/job.model.js";

// Post jobs
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Someting is missing",
                success: false
            })
        }
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(','),
            salary: Number(salary),
            location,
            jobType,
            experience,
            position,
            companyId,
            createdBy: userId
        });
        return res.status(201).json({
            message: "New job created",
            job,
            success: true
        })
    } catch (error) {
        console.log('Error in JobPost Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}

// get all jobs for job seekers
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || '';
        const query = {
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } }]
        };
        const jobs = await Job.find(query).populate({
            path:"companyId"
        }).sort({createdAt:-1});
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log('Error in getAllJob Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}

// get job by id for job seekers
export const getJobbyId = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        return res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        console.log('Error in getJobbyId Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}

// get jobs which are created by the admin
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ createdBy: adminId })
        if (!jobs) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log('Error in getAdminJobs Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}