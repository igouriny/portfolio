package com.gouriny.portfolio_be.professionalsubdomain.datalayer;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProfessionalRepository extends MongoRepository<Professional, String> {
}
