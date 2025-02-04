package com.gouriny.portfolio_be.academicsubdomain.datalayer;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface AcademicRepository extends MongoRepository<Academic, String> {
}

