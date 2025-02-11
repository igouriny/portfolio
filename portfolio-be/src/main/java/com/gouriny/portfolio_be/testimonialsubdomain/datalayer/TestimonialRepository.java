package com.gouriny.portfolio_be.testimonialsubdomain.datalayer;


import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface TestimonialRepository extends MongoRepository<Testimonial, String> {
    List<Testimonial> findByStatus(String status);
}

