package com.classroom_project.persistence.repositories;

import java.util.List;

import com.classroom_project.persistence.entities.Teacher;

import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepository extends PersonBaseRepository<Teacher> {
    List<Teacher> findByProgramId(Long id);
}
