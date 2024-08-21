import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: 'job id is required',
                success: false
            })
        };
        // check whether user already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId })
        if (existingApplication) {
            return res.status(400).json({
                message: 'You have already applied for this job',
                success: false
            })
        }
        // check if the job exists
        const job = await Job.findById(jobId)
        if (!job) {
            return res.status(404).json({
                message: 'Job not found',
                success: false
            })
        }
        // Create new application
        const newApplication = await Application.create({
            job:jobId,
            applicant: userId
        })
        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message: 'Job applied successfully.',
            success: true
        })
    } catch (error) {
        console.log("Error in applyJob controller : ", error.message)
        return res.status(500).json({
            message: 'Internal Server Error',
            success: false
        })
    }
};

// get applied jobs 
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'companyId',
                options: { sort: { createdAt: -1 } },
            }
        });
        if (!application) {
            return res.status(404).json({
                message: "No Applications",
                success: false
            })
        }
        res.status(201).json({
            application,
            success: true
        })
    } catch (error) {
        console.log("Error in getAppliedJobs controller : ", error.message)
        return res.status(500).json({
            message: 'Internal Server Error',
            success: false
        })
    }
}

// get Applicants
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant',
            }
        })
        if (!job) {
            return res.status(404).json({
                message: "No job gfound",
                success: false
            })
        }
        res.status(201).json({
            job,
            success: true
        })
    } catch (error) {
        console.log("Error in getApplicants controller : ", error.message)
        return res.status(500).json({
            message: 'Internal Server Error',
            success: false
        })
        
    }
}

// update Application Status 
export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message: "Status is required",
                success: false
            })
        }
        // find the application by applicant Id
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message: "No Application found",
                success: false
            })
        }
        // update status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"Status updated successfully.",
            success:true
        })

    } catch (error) {
        console.log("Error in updateStatus controller : ", error.message)
        return res.status(500).json({
            message: 'Internal Server Error',
            success: false
        })
    }
}