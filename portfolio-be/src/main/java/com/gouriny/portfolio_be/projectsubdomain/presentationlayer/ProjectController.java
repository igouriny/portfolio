package com.gouriny.portfolio_be.projectsubdomain.presentationlayer;

import com.gouriny.portfolio_be.projectsubdomain.businesslayer.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/projects")
public class ProjectController {

    private final ProjectService projectService;

    // Create a new project
    @PostMapping
    public ProjectResponseModel createProject(@RequestBody ProjectRequestModel projectRequestModel) {
        return projectService.createProject(projectRequestModel);
    }

    // Get a project by its ID
    @GetMapping("/{id}")
    public ProjectResponseModel getProjectById(@PathVariable("id") String id) {
        return projectService.getProjectById(id);
    }

    // Get all projects
    @GetMapping
    public List<ProjectResponseModel> getAllProjects() {
        return projectService.getAllProjects();
    }

    // Update a project
    @PutMapping("/{id}")
    public ProjectResponseModel updateProject(@PathVariable("id") String id,
                                              @RequestBody ProjectRequestModel projectRequestModel) {
        return projectService.updateProject(id, projectRequestModel);
    }

    // Delete a project
    @DeleteMapping("/{id}")
    public void deleteProject(@PathVariable("id") String id) {
        projectService.deleteProject(id);
    }
}
