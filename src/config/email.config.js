const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const {GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,GOOGLE_EMAIL,GOOGLE_REFRESH_TOKEN}=require("./server-config")
require("dotenv").config();

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

oauth2Client.setCredentials({
  refreshToken: GOOGLE_REFRESH_TOKEN,
});
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: GOOGLE_EMAIL,
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    refreshToken: GOOGLE_REFRESH_TOKEN,
  },
});

module.exports = { transporter };
