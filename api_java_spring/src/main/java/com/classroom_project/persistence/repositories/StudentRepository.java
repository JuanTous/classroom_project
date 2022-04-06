package com.classroom_project.persistence.repositories;

import com.classroom_project.persistence.entities.Student;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends PersonBaseRepository<Student>{
    
}
