const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001; // Backend will run on this port

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Nodemailer setup
const transporter = nodemailer.createTransport({
	service: "gmail", // You can use your email provider, this is for Gmail
	auth: {
		user: "your-email@gmail.com", // Replace with your email
		pass: "your-email-password", // Replace with your password
	},
});

app.post("/send-email", (req, res) => {
	const { name, email, message } = req.body;

	const mailOptions = {
		from: email,
		to: "your-email@gmail.com", // Your email to receive the message
		subject: `Message from ${name}`,
		text: message,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return res.status(500).json({ error: "Failed to send email" });
		} else {
			return res.status(200).json({ message: "Email sent successfully" });
		}
	});
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
