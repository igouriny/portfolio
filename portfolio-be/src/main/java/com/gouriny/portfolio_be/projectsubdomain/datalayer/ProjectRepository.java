package com.gouriny.portfolio_be.projectsubdomain.datalayer;


import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProjectRepository extends MongoRepository<Project, String> {

}
