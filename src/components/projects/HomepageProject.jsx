import React from "react";
import Project from "./project";
import INFO from "../../data/user";
import "./styles/allProjects.css";

const HomepageProjects = () => {
	return (
		<div className="all-projects-container">
			{INFO.projects.slice(0, 3).map((project, index) => (
				<div className="all-projects-project" key={index}>
					<Project
						logo={project.logo}
						title={project.title}
						description={project.description}
						linkText={project.linkText}
						link={project.link}
					/>
				</div>
			))}
			<a href="/projects" className="more-projects-button">
				More Projects Here <span className="arrow">→</span>
			</a>
		</div>
	);
};

export default HomepageProjects;
