package com.gouriny.portfolio_be.academicsubdomain.businesslayer;


import com.gouriny.portfolio_be.academicsubdomain.datalayer.Academic;
import com.gouriny.portfolio_be.academicsubdomain.presentationlayer.AcademicRequestModel;

import java.util.List;

public interface AcademicService {
    List<Academic> getAllAcademicRecords();
    Academic getAcademicById(String id);
    Academic createAcademicRecord(Academic academic);
    Academic editAcademicRecord(String id, AcademicRequestModel academicRequestModel);
    void deleteAcademicRecord(String id);
}

