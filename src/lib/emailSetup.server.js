import nodemailer from "nodemailer";
import { GOOGLE_EMAIL, GOOGLE_EMAIL_PASSWORD } from "$env/static/private";

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    // user: GOOGLE_EMAIL,
    // pass: GOOGLE_EMAIL_PASSWORD,
    user: "app.miguard@gmail.com",
    pass: "frdw dkvv awtv dpmb",
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.error(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

export default transporter;