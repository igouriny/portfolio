package com.gouriny.portfolio_be.projectsubdomain.businesslayer;

import com.gouriny.portfolio_be.projectsubdomain.datalayer.Project;
import com.gouriny.portfolio_be.projectsubdomain.datalayer.ProjectRepository;
import com.gouriny.portfolio_be.projectsubdomain.presentationlayer.ProjectRequestModel;
import com.gouriny.portfolio_be.projectsubdomain.presentationlayer.ProjectResponseModel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    @Override
    public ProjectResponseModel createProject(ProjectRequestModel projectRequestModel) {
        // Map the request model to a Project entity
        Project project = Project.builder()
                .title(projectRequestModel.getTitle())
                .description(projectRequestModel.getDescription())
                .technologiesUsed(projectRequestModel.getTechnologiesUsed())
                .projectUrl(projectRequestModel.getProjectUrl())
                .build();
        // Save the project to MongoDB
        project = projectRepository.save(project);
        // Map the saved entity to a response model and return it
        return mapToResponse(project);
    }

    @Override
    public ProjectResponseModel getProjectById(String projectId) {
        Optional<Project> optionalProject = projectRepository.findById(projectId);
        if (optionalProject.isPresent()) {
            return mapToResponse(optionalProject.get());
        } else {
            throw new RuntimeException("Project not found with id: " + projectId);
        }
    }

    @Override
    public List<ProjectResponseModel> getAllProjects() {
        List<Project> projects = projectRepository.findAll();
        return projects.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ProjectResponseModel updateProject(String projectId, ProjectRequestModel projectRequestModel) {
        Optional<Project> optionalProject = projectRepository.findById(projectId);
        if (optionalProject.isPresent()) {
            Project project = optionalProject.get();
            project.setTitle(projectRequestModel.getTitle());
            project.setDescription(projectRequestModel.getDescription());
            project.setTechnologiesUsed(projectRequestModel.getTechnologiesUsed());
            project.setProjectUrl(projectRequestModel.getProjectUrl());
            project = projectRepository.save(project);
            return mapToResponse(project);
        } else {
            throw new RuntimeException("Project not found with id: " + projectId);
        }
    }

    @Override
    public void deleteProject(String projectId) {
        projectRepository.deleteById(projectId);
    }

    // Helper method to map a Project entity to a ProjectResponseModel
    private ProjectResponseModel mapToResponse(Project project) {
        return new ProjectResponseModel(
                project.getId(),
                project.getTitle(),
                project.getDescription(),
                project.getTechnologiesUsed(),
                project.getProjectUrl()
        );
    }
}
