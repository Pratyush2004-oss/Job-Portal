export const postJob = async (req,res) =>{
    try {
        const {title,description,requirements, salary, location, jobType, experience, position, companyId} = req.body;
    } catch (error) {
        console.log('Error in JobPost Controller ' + error.message)
        return res.status(500).json({
            message: "Internal server Error",
            success: false
        })
    }
}