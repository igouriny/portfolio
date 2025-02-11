package com.gouriny.portfolio_be.testimonialsubdomain.presentationlayer;


import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class TestimonialResponseModel {
    private String id;
    private String name;
    private String affiliation;
    private String comment;
    private String status;
}
