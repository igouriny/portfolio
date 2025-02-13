//package com.gouriny.portfolio_be.utils.dataloaders;
//
//import com.gouriny.portfolio_be.testimonialsubdomain.datalayer.Testimonial;
//import com.gouriny.portfolio_be.testimonialsubdomain.datalayer.TestimonialRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Service;
//
//@Service
//public class TestimonialsDataLoaderService implements CommandLineRunner {
//
//    @Autowired
//    TestimonialRepository testimonialRepository;
//
//
//    @Override
//    public void run(String... args) throws Exception {
//
//        Testimonial testimonial1 = Testimonial.builder()
//                .id("1")
//                .name("Edouard Paiement")
//                .affiliation("CEO, League Alerts Inc.")
//                .comment("Ilyass is a very talented developer. He has been a great asset to our team.")
//                .status("APPROVED")
//                .build();
//
//        testimonialRepository.save(testimonial1);
//
//    }
//}
