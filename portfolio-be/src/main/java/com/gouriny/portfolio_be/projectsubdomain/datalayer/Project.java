package com.gouriny.portfolio_be.projectsubdomain.datalayer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "project")
@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Project {

    @Id
    private String id;

    private String title;
    private String description;
    private String technologiesUsed;
    private String projectUrl;
}
