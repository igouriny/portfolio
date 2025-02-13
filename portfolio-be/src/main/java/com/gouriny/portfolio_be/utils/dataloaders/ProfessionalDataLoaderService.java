//package com.gouriny.portfolio_be.utils.dataloaders;
//
//import com.gouriny.portfolio_be.professionalsubdomain.datalayer.Professional;
//import com.gouriny.portfolio_be.professionalsubdomain.datalayer.ProfessionalRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Service;
//
//@Service
//public class ProfessionalDataLoaderService implements CommandLineRunner {
//
//    @Autowired
//    ProfessionalRepository professionalRepository;
//
//    @Override
//    public void run(String... args) throws Exception {
//
//        Professional professional1 = Professional.builder()
//                .id("1")
//                .title("Intact Insurance - Software Developer Intern")
//                .years("February 2025 - May 2025")
//                .description("I will be working as a software developer intern at Intact Insurance as part of my college program.")
//                .build();
//
//        professionalRepository.save(professional1);
//    }
//
//}
