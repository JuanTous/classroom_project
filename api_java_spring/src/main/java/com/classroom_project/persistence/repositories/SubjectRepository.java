package com.classroom_project.persistence.repositories;

import java.util.List;

import com.classroom_project.persistence.entities.Subject;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long>{
    List<Subject> findByProgramId(Long id);
    List<Subject> findByCredits(int n);
}
