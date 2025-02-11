package com.gouriny.portfolio_be.testimonialsubdomain.businesslayer;


import com.gouriny.portfolio_be.testimonialsubdomain.datalayer.Testimonial;

import java.util.List;

public interface TestimonialService {
    List<Testimonial> getAllApprovedTestimonials();
    List<Testimonial> getAllPendingTestimonials();
    Testimonial submitTestimonial(Testimonial testimonial);
    Testimonial approveTestimonial(String id);
    void rejectTestimonial(String id);
}
