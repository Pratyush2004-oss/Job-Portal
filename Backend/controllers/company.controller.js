import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

// Register company
export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company Name is required",
                success: false
            })
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "Company with this name already exists",
                success: false
            })
        }
        company = await Company.create({
            name: companyName,
            userId: req.id
        })
        return res.status(201).json({
            message: "Company registered successfully",
            company,
            success: true
        })
    } catch (error) {
        console.log('Error in Company Register Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}

// get Companies
export const getCompany = async (req, res) => {
    try {
        const userId = req.id;  //logged in user Id
        const companies = await Company.find({ userId }).sort({createdAt:-1});
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found",
                success: false
            })
        }
        return res.status(201).json({
            companies,
            success: true
        })
    } catch (error) {
        console.log('Error in Company Login Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}

// get Companies by Id
export const getCompanybyId = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }
        return res.status(201).json({
            company,
            success: true
        })
    } catch (error) {
        console.log('Error in getCompanybyId Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}

// upsdate company details
export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        
        // cloudinary
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = cloudinary.uploader.upload(fileUri.content);
        const logo = (await cloudResponse).secure_url;

        const updateData = { name, description, website, location, logo };
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }
        return res.status(201).json({
            message: "Company info updated",
            success: true
        })

    } catch (error) {
        console.log('Error in updateCompany Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}