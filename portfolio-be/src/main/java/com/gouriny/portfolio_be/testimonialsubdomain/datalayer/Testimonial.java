package com.gouriny.portfolio_be.testimonialsubdomain.datalayer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "testimonials")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Testimonial {
    @Id
    private String id;
    private String name;          // Person's name
    private String affiliation;   // Their connection to you (e.g., "Former Classmate", "Professor")
    private String comment;       // Their message
    private String status;        // "PENDING", "APPROVED", "REJECTED"
}
