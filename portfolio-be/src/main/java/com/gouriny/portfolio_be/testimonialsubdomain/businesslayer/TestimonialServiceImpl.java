package com.gouriny.portfolio_be.testimonialsubdomain.businesslayer;

import com.gouriny.portfolio_be.testimonialsubdomain.datalayer.Testimonial;

import java.util.List;
import com.gouriny.portfolio_be.testimonialsubdomain.datalayer.TestimonialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TestimonialServiceImpl implements TestimonialService {
    private final TestimonialRepository testimonialRepository;

    @Autowired
    public TestimonialServiceImpl(TestimonialRepository testimonialRepository) {
        this.testimonialRepository = testimonialRepository;
    }

    @Override
    public List<Testimonial> getAllApprovedTestimonials() {
        return testimonialRepository.findByStatus("APPROVED");
    }

    @Override
    public List<Testimonial> getAllPendingTestimonials() {
        return testimonialRepository.findByStatus("PENDING");
    }

    @Override
    public Testimonial submitTestimonial(Testimonial testimonial) {
        testimonial.setStatus("PENDING"); // Default status
        return testimonialRepository.save(testimonial);
    }

    @Override
    public Testimonial approveTestimonial(String id) {
        Optional<Testimonial> optionalTestimonial = testimonialRepository.findById(id);
        if (optionalTestimonial.isPresent()) {
            Testimonial testimonial = optionalTestimonial.get();
            testimonial.setStatus("APPROVED");
            return testimonialRepository.save(testimonial);
        }
        return null;
    }

    @Override
    public void rejectTestimonial(String id) {
        testimonialRepository.deleteById(id);
    }

    @Override
    public void deleteApprovedTestimonial(String id) {
        Optional<Testimonial> optionalTestimonial = testimonialRepository.findById(id);
        if (optionalTestimonial.isPresent() && "APPROVED".equals(optionalTestimonial.get().getStatus())) {
            testimonialRepository.deleteById(id);
        } else {
            throw new RuntimeException("Approved testimonial not found with id: " + id);
        }
    }
}

