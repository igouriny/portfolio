package com.gouriny.portfolio_be.informationsubdomain.businesslayer;


import com.gouriny.portfolio_be.informationsubdomain.datalayer.About;
import com.gouriny.portfolio_be.informationsubdomain.datalayer.AboutRepository;
import com.gouriny.portfolio_be.informationsubdomain.presentationlayer.AboutRequestModel;
import com.gouriny.portfolio_be.informationsubdomain.presentationlayer.AboutResponseModel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AboutServiceImpl implements AboutService {

    private final AboutRepository aboutRepository;


    @Override
    public AboutResponseModel getAboutById(String id) {
        return aboutRepository.findById(id)
                .map(this::toResponseModel)
                .orElseThrow(() -> new RuntimeException("About not found"));
    }

    @Override
    public AboutResponseModel updateAbout(String id, AboutRequestModel aboutRequestModel) {
        About about = aboutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("About not found"));

        about.setName(aboutRequestModel.getName());
        about.setSubtitle(aboutRequestModel.getSubtitle());
        about.setContent(aboutRequestModel.getContent());
        about.setLeftContent(aboutRequestModel.getLeftContent());
        about.setRightContent(aboutRequestModel.getRightContent());

        About updatedAbout = aboutRepository.save(about);
        return toResponseModel(updatedAbout);
    }


    private AboutResponseModel toResponseModel(About about) {
        return AboutResponseModel.builder()
                .id(about.getId())
                .name(about.getName())
                .subtitle(about.getSubtitle())
                .content(about.getContent())
                .leftContent(about.getLeftContent())
                .rightContent(about.getRightContent())
                .build();
    }
}

