package com.gouriny.portfolio_be.professionalsubdomain.businesslayer;

import com.gouriny.portfolio_be.professionalsubdomain.datalayer.Professional;
import com.gouriny.portfolio_be.professionalsubdomain.presentationlayer.ProfessionalRequestModel;

import java.util.List;

public interface ProfessionalService {

    List<Professional> getAllProfessionalRecords();

    Professional getProfessionalById(String id);

    Professional createProfessionalRecord(Professional professional);

    Professional editProfessionalRecord(String id, ProfessionalRequestModel professionalRequestModel);

    void deleteProfessionalRecord(String id);
}
