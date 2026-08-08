const express = require("express");
const { serverConfig, logger } = require("./config");
const apiRoutes = require("./routes");
const app = express();
const amqplib = require("amqplib");
const {emailService}=require("./services/index")

async function connectQueue() {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel =await connection.createChannel();
    channel.assertQueue("notification-queue");
    channel.consume("notification-queue",async (data) => {
      // console.log(`${Buffer.from(data.content)}`);
      const parsedData = data.content.toString();
      const obj=JSON.parse(parsedData);
      const email = obj.receiptEmail.match(/[\w.-]+@[\w.-]+\.\w+/)[0];
      await emailService.sendEMail("air.horizon.airline@gmail.com",email,obj.subject,obj.text)
      channel.ack(data)
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRoutes);

app.listen(serverConfig.PORT, async () => {
  console.log(`Server running on PORT:${serverConfig.PORT}`);
  logger.info("Successfully started the server", "root", {});
  await connectQueue();
});
