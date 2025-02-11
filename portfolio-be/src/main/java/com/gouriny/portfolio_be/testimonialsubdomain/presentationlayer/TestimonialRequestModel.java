package com.gouriny.portfolio_be.testimonialsubdomain.presentationlayer;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestimonialRequestModel {
    private String name;
    private String affiliation;
    private String comment;
}

