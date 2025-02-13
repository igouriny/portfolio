//package com.gouriny.portfolio_be.utils.dataloaders;
//
//import com.gouriny.portfolio_be.informationsubdomain.datalayer.About;
//import com.gouriny.portfolio_be.informationsubdomain.datalayer.AboutRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Service;
//
//@Service
//public class AboutDataLoaderService implements CommandLineRunner {
//
//    @Autowired
//    public AboutRepository aboutRepository;
//
//    @Override
//    public void run(String... args) throws Exception {
//
//        About about = About.builder()
//                .id("1")
//                .name("ILYASS GOURINY")
//                .subtitle("COMPUTER SCIENCE STUDENT & SOFTWARE DEVELOPER")
//                .content("Hello ! I am Ilyass Gouriny, a recent computer science graduate from Champlain College St-Lambert. I have been passionate about new technologies since" +
//                        " my childhood and I am always looking for new challenges to keep me busy. I have a strong interest in software development and data analysis, which is why" +
//                        " I am choosing to continue my education in software engineering at École de technologie supérieure.")
//                .leftContent("My journey as a software developer started 4 years ago when I enrolled in the computer science program at Champlain College St-Lambert. I have learned" +
//                        " a lot about software development, data analysis, and computer networks. I have also had the opportunity to work on several projects that have allowed me to" +
//                        " develop my skills in programming, problem-solving, and teamwork. Among those projects, I have developed a web application for article management for a" +
//                        " media company called League Alerts, which taught me lots about full-stack development.")
//                .rightContent("I am soon starting a bachelor's degree in software engineering at École de technologie supérieure. I am excited to learn more about software" +
//                        " development, artificial intelligence, and data analysis. I am also looking forward to working on new projects that will allow me to apply my knowledge and" +
//                        " develop my skills further. I am always looking for new opportunities to learn and grow as a software developer, and I am confident that my education and" +
//                        " experience will help me achieve my goals.")
//                .build();
//
//        aboutRepository.save(about);
//
//    }
//
//
//}
