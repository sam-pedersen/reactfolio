import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTwitter,
	faGithub,
	faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import Logo from "../components/UI/logo";
import Footer from "../components/UI/footer";
import NavBar from "../components/UI/navBar";
import HomepageProject from "../components/projects/HomepageProject";

import INFO from "../data/user";
import SEO from "../data/seo";

import "./styles/homepage.css";

const Homepage = () => {
	const [stayLogo, setStayLogo] = useState(false);
	const [logoSize, setLogoSize] = useState(80);
	const [oldLogoSize, setOldLogoSize] = useState(80);
	const [isLogoVisible, setIsLogoVisible] = useState(false);
	const [isSocialIconsVisible, setIsSocialIconsVisible] = useState(false);
	const [isImageVisible, setIsImageVisible] = useState(false); // New state for image visibility

	useEffect(() => {
		window.scrollTo(0, 0);
		setIsLogoVisible(true);
		setIsSocialIconsVisible(true);
		setIsImageVisible(true); // Make image visible on initial load
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			let scroll = Math.round(window.pageYOffset, 2);
			let newLogoSize = 80 - (scroll * 4) / 10;

			if (newLogoSize < oldLogoSize) {
				if (newLogoSize > 40) {
					setLogoSize(newLogoSize);
					setOldLogoSize(newLogoSize);
					setStayLogo(false);
				} else {
					setStayLogo(true);
				}
			} else {
				setLogoSize(newLogoSize);
				setStayLogo(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [logoSize, oldLogoSize]);

	const currentSEO = SEO.find((item) => item.page === "home");

	const logoStyle = {
		display: "flex",
		position: stayLogo ? "fixed" : "relative",
		top: stayLogo ? "3vh" : "auto",
		zIndex: 999,
		border: stayLogo ? "1px solid white" : "none",
		borderRadius: stayLogo ? "50%" : "none",
		boxShadow: stayLogo ? "0px 4px 10px rgba(0, 0, 0, 0.25)" : "none",
	};

	return (
		<React.Fragment>
			<Helmet>
				<title>{INFO.main.title}</title>
				<meta name="description" content={currentSEO.description} />
				<meta
					name="keywords"
					content={currentSEO.keywords.join(", ")}
				/>
			</Helmet>

			<div className="page-content">
				<NavBar active="home" />
				<div className="content-wrapper">
					<div className="homepage-logo-container">
						<div
							style={logoStyle}
							className={isLogoVisible ? "slide-in" : ""}
						>
							<Logo width={logoSize} link={false} />
						</div>
					</div>

					<div className="homepage-container">
						<div className="homepage-first-area">
							<div className="homepage-first-area-left-side">
								<div className="title homepage-title fade-in">
									{INFO.homepage.title}
								</div>

								<div className="subtitle homepage-subtitle fade-in">
									{INFO.homepage.description}
								</div>
							</div>

							<div className="homepage-first-area-right-side">
								<div className="homepage-image-container">
									<div className="homepage-image-wrapper">
										<img
											src="homepage.jpg"
											alt="about"
											className={`homepage-image ${
												isImageVisible
													? "image-fade-in-slide-up"
													: ""
											}`}
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="homepage-socials">
							{isSocialIconsVisible &&
								Object.entries(INFO.socials).map(
									([key, url]) => (
										<a
											href={url}
											target="_blank"
											rel="noreferrer"
											className="social-icon-zoom"
											key={key}
										>
											<FontAwesomeIcon
												icon={
													key === "twitter"
														? faTwitter
														: key === "github"
														? faGithub
														: faInstagram
												}
												className="homepage-social-icon"
											/>
										</a>
									)
								)}
						</div>

						<div className="homepage-projects">
							<HomepageProject />
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

export default Homepage;
