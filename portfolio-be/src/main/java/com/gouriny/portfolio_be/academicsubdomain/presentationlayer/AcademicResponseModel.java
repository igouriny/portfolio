package com.gouriny.portfolio_be.academicsubdomain.presentationlayer;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class AcademicResponseModel {
    private String id;
    private String title;
    private String years;
    private String description;
}

