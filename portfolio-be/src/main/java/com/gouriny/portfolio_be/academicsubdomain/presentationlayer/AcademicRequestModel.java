package com.gouriny.portfolio_be.academicsubdomain.presentationlayer;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AcademicRequestModel {
    private String title;
    private String years;
    private String description;
}

