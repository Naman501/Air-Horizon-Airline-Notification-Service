const express=require("express")
const {transporter}=require("./config/email.config")

// const {serverConfig}=require('./config')
const {serverConfig,logger}=require('./config/index')
const apiRoutes=require('./routes')
const app=express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api',apiRoutes)

app.listen(serverConfig.PORT,async ()=>{
    console.log(`Server running on PORT:${serverConfig.PORT}`);
    logger.info("Successfully started the server","root",{});
   const verifyConn= await transporter.verify()
    console.log("verifyConn",verifyConn)
    const res=await transporter.sendMail({
        to:"namanmitttal@gmail.com",
        subject:"Hello",
        text:"Service Working"
    })
    console.log(res)
})