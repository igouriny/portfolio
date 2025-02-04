package com.gouriny.portfolio_be.informationsubdomain.businesslayer;


import com.gouriny.portfolio_be.informationsubdomain.presentationlayer.AboutRequestModel;
import com.gouriny.portfolio_be.informationsubdomain.presentationlayer.AboutResponseModel;

import java.util.List;

public interface AboutService {
    AboutResponseModel getAboutById(String id);
    AboutResponseModel updateAbout(String id, AboutRequestModel aboutRequestModel);
}

