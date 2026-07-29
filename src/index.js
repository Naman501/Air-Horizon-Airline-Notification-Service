const express=require("express")
const {transporter}=require("./config/email.config")

// const {serverConfig}=require('./config')
const {serverConfig,logger}=require('./config')
const apiRoutes=require('./routes')
const app=express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api',apiRoutes)

app.listen(serverConfig.PORT,async ()=>{
    console.log(`Server running on PORT:${serverConfig.PORT}`);
    logger.info("Successfully started the server","root",{});
})