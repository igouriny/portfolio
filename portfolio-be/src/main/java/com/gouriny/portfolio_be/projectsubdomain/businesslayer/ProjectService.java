package com.gouriny.portfolio_be.projectsubdomain.businesslayer;

import com.gouriny.portfolio_be.projectsubdomain.presentationlayer.ProjectRequestModel;
import com.gouriny.portfolio_be.projectsubdomain.presentationlayer.ProjectResponseModel;
import java.util.List;

public interface ProjectService {

    ProjectResponseModel createProject(ProjectRequestModel projectRequestModel);
    ProjectResponseModel getProjectById(String projectId);
    List<ProjectResponseModel> getAllProjects();
    ProjectResponseModel updateProject(String projectId, ProjectRequestModel projectRequestModel);
    void deleteProject(String projectId);
}
