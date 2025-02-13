package com.gouriny.portfolio_be.informationsubdomain.presentationlayer;

import com.gouriny.portfolio_be.informationsubdomain.businesslayer.AboutService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "https://portfolio-git-main-igourinys-projects.vercel.app")
@RequestMapping("/api/v1/about")
@RequiredArgsConstructor
public class AboutController {

    private final AboutService aboutService;

    @GetMapping("/{id}")
    public AboutResponseModel getAboutById(@PathVariable String id) {
        return aboutService.getAboutById(id);
    }

    @PutMapping("/{id}")
    public AboutResponseModel updateAbout(@PathVariable String id, @RequestBody AboutRequestModel aboutRequestModel) {
        return aboutService.updateAbout(id, aboutRequestModel);
    }


}
