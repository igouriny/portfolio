package com.gouriny.portfolio_be.professionalsubdomain.businesslayer;

import com.gouriny.portfolio_be.professionalsubdomain.datalayer.Professional;
import com.gouriny.portfolio_be.professionalsubdomain.datalayer.ProfessionalRepository;
import com.gouriny.portfolio_be.professionalsubdomain.presentationlayer.ProfessionalRequestModel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfessionalServiceImpl implements ProfessionalService{

    private final ProfessionalRepository professionalRepository;

    @Override
    public List<Professional> getAllProfessionalRecords() {
        return professionalRepository.findAll();
    }

    @Override
    public Professional getProfessionalById(String id) {
        return professionalRepository.findById(id).orElse(null);
    }

    @Override
    public Professional createProfessionalRecord(Professional professional) {
        return professionalRepository.save(professional);
    }

    @Override
    public Professional editProfessionalRecord(String id, ProfessionalRequestModel professionalRequestModel) {
        return professionalRepository.findById(id)
                .map(professional -> {
                    professional.setTitle(professionalRequestModel.getTitle());
                    professional.setYears(professionalRequestModel.getYears());
                    professional.setDescription(professionalRequestModel.getDescription());
                    return professionalRepository.save(professional);
                })
                .orElse(null);
    }

    @Override
    public void deleteProfessionalRecord(String id) {
        professionalRepository.deleteById(id);
    }
}
