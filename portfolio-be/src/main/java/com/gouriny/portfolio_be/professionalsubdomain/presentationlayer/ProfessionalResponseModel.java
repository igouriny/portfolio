package com.gouriny.portfolio_be.professionalsubdomain.presentationlayer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfessionalResponseModel {

    private String id;
    private String title;
    private String years;
    private String description;


}
