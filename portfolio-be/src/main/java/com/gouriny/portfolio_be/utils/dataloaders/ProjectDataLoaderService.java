package com.gouriny.portfolio_be.utils.dataloaders;

import com.gouriny.portfolio_be.projectsubdomain.datalayer.Project;
import com.gouriny.portfolio_be.projectsubdomain.datalayer.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

@Service
public class ProjectDataLoaderService implements CommandLineRunner {

    @Autowired
    ProjectRepository projectRepository;

    @Override
    public void run(String... args) throws Exception {

        Project project1 = Project.builder()
                .id("1")
                .title("League Alerts, Articles Web Application")
                .description("In a team of 4, designing and developing a full-stack articles web application for League Alerts Inc.")
                .technologiesUsed("Java, Typescript, React, Spring Boot, Scrum & Agile, VCS, Jira, Mongo, Postgres, MySQL, Figma")
                .projectUrl("https://github.com/Valthefirst/league_alerts-ChamplainECP")
                .build();

        projectRepository.save(project1);

    }
}
