package com.gouriny.portfolio_be.academicsubdomain.businesslayer;

import com.gouriny.portfolio_be.academicsubdomain.datalayer.Academic;
import com.gouriny.portfolio_be.academicsubdomain.datalayer.AcademicRepository;
import com.gouriny.portfolio_be.academicsubdomain.presentationlayer.AcademicRequestModel;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AcademicServiceImpl implements AcademicService {
    private final AcademicRepository academicRepository;

    @Override
    public List<Academic> getAllAcademicRecords() {
        return academicRepository.findAll();
    }

    @Override
    public Academic getAcademicById(String id) {
        return academicRepository.findById(id).orElse(null);
    }

    @Override
    public Academic createAcademicRecord(Academic academic) {
        return academicRepository.save(academic);
    }

    @Override
    public Academic editAcademicRecord(String id, AcademicRequestModel academicRequestModel) {
        return academicRepository.findById(id)
                .map(academic -> {
                    academic.setTitle(academicRequestModel.getTitle());
                    academic.setYears(academicRequestModel.getYears());
                    academic.setDescription(academicRequestModel.getDescription());
                    return academicRepository.save(academic);
                })
                .orElse(null);
    }

    @Override
    public void deleteAcademicRecord(String id) {
        academicRepository.deleteById(id);
    }
}

