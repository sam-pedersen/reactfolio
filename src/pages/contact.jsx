import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import NavBar from "../components/UI/navBar";
import Footer from "../components/UI/footer";
import Logo from "../components/UI/logo";
import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/contact.css";

const Contact = () => {
	// Manage form state
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(null); // To handle any errors

	// Scroll to the top of the page on load
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const currentSEO = SEO.find((item) => item.page === "contact");

	// Update form state when the user types
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent page reload

		// Send form data to the backend
		try {
			const response = await fetch("http://localhost:3001/send-email", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				setSubmitted(true);
				setFormData({ name: "", email: "", message: "" }); // Reset form
			} else {
				throw new Error("Something went wrong. Please try again.");
			}
		} catch (err) {
			setError(err.message); // Handle errors
		}
	};

	return (
		<React.Fragment>
			<Helmet>
				<title>{`Contact | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet>

			<div className="page-content">
				<NavBar active="contact" />
				<div className="content-wrapper">
					<div className="contact-logo-container">
						<div className="contact-logo">
							<Logo width={46} />
						</div>
					</div>

					<div className="contact-container">
						<div className="title contact-title">
							Let's Get in Touch: Ways to Connect with Me
						</div>

						<div className="subtitle contact-subtitle">
							Thank you for your interest in getting in touch with
							me. You can use the form below to contact me
							directly.
						</div>

						{/* If form is submitted, show success message */}
						{!submitted ? (
							<form
								className="contact-form"
								onSubmit={handleSubmit}
							>
								<div className="form-group">
									<label htmlFor="name">Name</label>
									<input
										type="text"
										id="name"
										name="name"
										value={formData.name}
										onChange={handleChange}
										required
									/>
								</div>

								<div className="form-group">
									<label htmlFor="email">Email</label>
									<input
										type="email"
										id="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										required
									/>
								</div>

								<div className="form-group">
									<label htmlFor="message">Message</label>
									<textarea
										id="message"
										name="message"
										value={formData.message}
										onChange={handleChange}
										required
									></textarea>
								</div>

								{/* Display error if any */}
								{error && (
									<div className="error-message">{error}</div>
								)}

								<button type="submit" className="submit-button">
									Send Message
								</button>
							</form>
						) : (
							<div className="thank-you-message">
								Thank you for your message! I'll get back to you
								shortly.
							</div>
						)}
					</div>

					<div className="logo-container">
						<img
							src="Portfolio.png"
							alt="logocontact"
							className="logo-image"
						/>
					</div>

					<div className="page-footer">
						<Footer />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Contact;
