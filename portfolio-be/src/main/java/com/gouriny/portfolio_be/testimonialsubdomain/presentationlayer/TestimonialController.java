package com.gouriny.portfolio_be.testimonialsubdomain.presentationlayer;

import com.gouriny.portfolio_be.testimonialsubdomain.businesslayer.TestimonialService;
import com.gouriny.portfolio_be.testimonialsubdomain.datalayer.Testimonial;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/testimonials")
public class TestimonialController {
    private final TestimonialService testimonialService;

    @Autowired
    public TestimonialController(TestimonialService testimonialService) {
        this.testimonialService = testimonialService;
    }

    @GetMapping("/approved")
    public List<Testimonial> getApprovedTestimonials() {
        return testimonialService.getAllApprovedTestimonials();
    }

    @GetMapping("/pending")
    public List<Testimonial> getPendingTestimonials() {
        return testimonialService.getAllPendingTestimonials();
    }

    @PostMapping
    public Testimonial submitTestimonial(@RequestBody TestimonialRequestModel request) {
        Testimonial testimonial = new Testimonial(null, request.getName(), request.getAffiliation(), request.getComment(), "PENDING");
        return testimonialService.submitTestimonial(testimonial);
    }

    @PutMapping("/{id}/approve")
    public Testimonial approveTestimonial(@PathVariable String id) {
        return testimonialService.approveTestimonial(id);
    }

    @DeleteMapping("/{id}/reject")
    public void rejectTestimonial(@PathVariable String id) {
        testimonialService.rejectTestimonial(id);
    }

    @DeleteMapping("/{id}/delete-approved")
    public void deleteApprovedTestimonial(@PathVariable String id) {
        testimonialService.deleteApprovedTestimonial(id);
    }

}

