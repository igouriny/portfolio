//package com.gouriny.portfolio_be.utils.dataloaders;
//
//import com.gouriny.portfolio_be.academicsubdomain.datalayer.Academic;
//import com.gouriny.portfolio_be.academicsubdomain.datalayer.AcademicRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Service;
//
//@Service
//public class AcademicDataLoaderService implements CommandLineRunner {
//
//    @Autowired
//    AcademicRepository academicRepository;
//
//    @Override
//    public void run(String... args) throws Exception {
//
//        Academic academic1 = Academic.builder()
//                .id("1")
//                .title("College Diploma - Champlain Regional College")
//                .years("2021-2025")
//                .description("I am currently pursuing a college diploma in Computer Science at Champlain Regional College.")
//                .build();
//
//        Academic academic2 = Academic.builder()
//                .id("2")
//                .title("High School Diploma - École Internationale Lucille-Teasdale")
//                .years("2016-2021")
//                .description("I graduated from École Internationale Lucille-Teasdale with a high school diploma.")
//                .build();
//
//        academicRepository.save(academic1);
//        academicRepository.save(academic2);
//    }
//}
