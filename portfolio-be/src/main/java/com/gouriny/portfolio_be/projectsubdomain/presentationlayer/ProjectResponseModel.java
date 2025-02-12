package com.gouriny.portfolio_be.projectsubdomain.presentationlayer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectResponseModel {

    private String id;
    private String title;
    private String description;
    private String technologiesUsed;
    private String projectUrl;

}
