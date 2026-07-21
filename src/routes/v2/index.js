const express=require("express")

const router=express.Router()

router.get('/info',(req,res)=>{
    return res.json({
        message:"V2 request incoming..."
    })
})

module.exports=router