import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import NavBar from "../components/UI/navBar";
import Footer from "../components/UI/footer";
import Logo from "../components/UI/logo";
import Socials from "../components/about/socials";

import INFO from "../data/user";
import SEO from "../data/seo";
import "./styles/about.css";

const About = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const currentSEO = SEO.find((item) => item.page === "about");

	return (
		<React.Fragment>
			<Helmet>
				<title>{`About | ${INFO.main.title}`}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet>

			<div className="page-content">
				<NavBar active="about" />
				<div className="content-wrapper">
					<div className="about-logo-container">
						<div className="about-logo logo-funky-animation">
							<Logo width={46} />
						</div>
					</div>

					<div className="about-container">
						<div className="about-main">
							<div className="about-right-side">
								<div className="title about-title title-bounce">
									{INFO.about.title}
								</div>

								<div className="subtitle about-subtitle">
									{INFO.about.description}
								</div>

								{/* Add the "Download My CV" button here */}
								<div className="download-cv-container">
									<a
										href="/sampedersencv.pdf"
										className="download-cv-button"
										download="Sam_Pedersen_CV.pdf"
									>
										Download My CV
									</a>
								</div>
							</div>

							<div className="about-left-side">
								<div className="about-image-container">
									<div className="about-image-wrapper">
										<img
											src="about.jpg"
											alt="about"
											className="about-image image-slide-in"
										/>
									</div>
									<div className="socials-container socials-fade-in">
										<div className="contact-socials">
											<Socials />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="page-footer">
						<Footer />
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default About;
