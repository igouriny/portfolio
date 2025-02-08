package com.gouriny.portfolio_be.professionalsubdomain.presentationlayer;

import com.gouriny.portfolio_be.professionalsubdomain.businesslayer.ProfessionalService;
import com.gouriny.portfolio_be.professionalsubdomain.datalayer.Professional;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/professional")
@RequiredArgsConstructor
public class ProfessionalController {

    private final ProfessionalService professionalService;

    @GetMapping
    public List<Professional> getAllProfessionalRecords() {
        return professionalService.getAllProfessionalRecords();
    }

    @GetMapping("/{id}")
    public Professional getProfessionalById(@PathVariable String id) {
        return professionalService.getProfessionalById(id);
    }

    @PutMapping("/{id}")
    public Professional updateProfessional(@PathVariable String id, @RequestBody ProfessionalRequestModel professionalRequestModel) {
        return professionalService.editProfessionalRecord(id, professionalRequestModel);
    }

    @PostMapping
    public Professional createProfessional(@RequestBody Professional professional) {
        return professionalService.createProfessionalRecord(professional);
    }

    @DeleteMapping("/{id}")
    public void deleteProfessional(@PathVariable String id) {
        professionalService.deleteProfessionalRecord(id);
    }
}
