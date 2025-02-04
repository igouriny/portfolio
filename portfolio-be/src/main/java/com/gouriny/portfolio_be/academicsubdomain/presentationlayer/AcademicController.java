package com.gouriny.portfolio_be.academicsubdomain.presentationlayer;

import com.gouriny.portfolio_be.academicsubdomain.businesslayer.AcademicService;
import com.gouriny.portfolio_be.academicsubdomain.datalayer.Academic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/academics")
public class AcademicController {
    private final AcademicService academicService;

    @Autowired
    public AcademicController(AcademicService academicService) {
        this.academicService = academicService;
    }

    @GetMapping
    public List<Academic> getAllAcademics() {
        return academicService.getAllAcademicRecords();
    }

    @GetMapping("/{id}")
    public Academic getAcademicById(@PathVariable String id) {
        return academicService.getAcademicById(id);
    }

    @PostMapping
    public Academic createAcademic(@RequestBody Academic academic) {
        return academicService.createAcademicRecord(academic);
    }

    @PutMapping("/{id}")
    public Academic updateAcademic(@PathVariable String id, @RequestBody AcademicRequestModel academicRequestModel) {
        return academicService.editAcademicRecord(id, academicRequestModel);
    }

    @DeleteMapping("/{id}")
    public void deleteAcademic(@PathVariable String id) {
        academicService.deleteAcademicRecord(id);
    }
}

