const { StatusCodes } = require("http-status-codes");
const {emailService}=require("../services")


async function create(req,res) {
    const {subject,content,recepientEmail}=req.body
    try {
        const response=await emailService.createTicket({
            subject,content,recepientEmail
        })
        return res.status(StatusCodes.CREATED).json(response)
    } catch (error) {
        console.error(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
}

module.exports={create}