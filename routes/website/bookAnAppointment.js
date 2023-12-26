const express = require("express");
const router = express.Router();
const Appointment = require("../../models/website/appointment");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

const emailTemplatePath = path.join(
  __dirname,
  "../../emails/website/bookAnAppointment.html"
);
const emailTemplate = fs.readFileSync(emailTemplatePath, "utf8");

// Configure the Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "fitwin.co",
  port: 465, // Use the appropriate port (e.g., 465 for secure SSL)
  secure: true, // Use SSL
  auth: {
    user: process.env.SENDING_EMAIL, // Your email address
    pass: "Y,g`{X8ZharUH!&9Ju>X@.tzLE[/6e", // Your email password
  },
});

// Define ANSI escape codes for green text color
const greenColor = "\x1b[32m";
const resetColor = "\x1b[0m";

router.post("/", async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      company,
      country,
      email,
      date,
      time,
      number,
      message,
      service,
    } = req.body;

    const emailContent = emailTemplate
      .replace("{{firstName}}", firstname)
      .replace("{{lastName}}", lastname)
      .replace("{{date}}", date)
      .replace("{{time}}", time)
      .replace("{{email}}", email);

    const newAppointment = new Appointment({
      firstname,
      lastname,
      company,
      country,
      email,
      date,
      time,
      number,
      message,
      service,
    });

    // Create the password reset email
    const sendEmail = {
      from: {
        name: process.env.COMPANY_NAME,
        address: process.env.SENDING_EMAIL,
      },
      to: email, // Recipient's email address
      subject: "Your appointment booked successfully",
      html: emailContent,
    };

    // Send the email using Nodemailer
    transporter.sendMail(sendEmail, (error, info) => {
      if (error) {
        console.error("Error sending the email:", error);
        res.status(500).json({ error: "Internal server error" });
      } else {
        const currentTime = new Date(); // Get the current timestamp
        console.log(
          `${resetColor}Email sent at${greenColor} ${currentTime}:${resetColor} ${info.response}`
        );
        newAppointment.save();
        res.status(200).json({
          success: "true",
          message: "Appointment places successfuly",
          mail: "Appointment Mail Has Been Sent",
          firstname,
          lastname,
          company,
          country,
          email,
          date,
          time,
          number,
          message,
          service,
        });
      }
    });
  } catch (error) {
    console.error("Error placing an appointment up:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
