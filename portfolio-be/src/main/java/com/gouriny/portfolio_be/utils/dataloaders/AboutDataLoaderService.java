package com.gouriny.portfolio_be.utils.dataloaders;

import com.gouriny.portfolio_be.informationsubdomain.datalayer.About;
import com.gouriny.portfolio_be.informationsubdomain.datalayer.AboutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

@Service
public class AboutDataLoaderService implements CommandLineRunner {

    @Autowired
    public AboutRepository aboutRepository;

    @Override
    public void run(String... args) throws Exception {

        About about = About.builder()
                .id("1")
                .name("ILYASS GOURINY")
                .subtitle("COMPUTER SCIENCE STUDENT & SOFTWARE DEVELOPER")
                .content("I am a computer science student at the University of Ottawa. I am passionate about software development and I am always looking for new challenges.")
                .leftContent("I am a computer science student at the University of Ottawa. I am passionate about software development and I am always looking for new challenges.")
                .rightContent("I am a computer science student at the University of Ottawa. I am passionate about software development and I am always looking for new challenges.")
                .build();

        aboutRepository.save(about);

    }


}
