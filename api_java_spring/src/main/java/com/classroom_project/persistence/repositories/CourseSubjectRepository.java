package com.classroom_project.persistence.repositories;

import com.classroom_project.persistence.entities.CourseSubject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseSubjectRepository extends JpaRepository<CourseSubject, Long>{
    
}
