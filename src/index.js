const express=require("express")

// const {serverConfig}=require('./config')
const {serverConfig,logger}=require('./config/index')
const apiRoutes=require('./routes')
const app=express();

app.use('/api',apiRoutes)

app.listen(serverConfig.PORT,()=>{
    console.log(`Server running on PORT:${serverConfig.PORT}`);
    logger.info("Successfully started the server","root",{});
})