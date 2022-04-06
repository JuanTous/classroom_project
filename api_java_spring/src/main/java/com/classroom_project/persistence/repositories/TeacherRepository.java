package com.classroom_project.persistence.repositories;

import com.classroom_project.persistence.entities.Teacher;

import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepository extends PersonBaseRepository<Teacher> {
    
}
