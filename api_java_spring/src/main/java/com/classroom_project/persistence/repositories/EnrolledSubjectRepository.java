package com.classroom_project.persistence.repositories;

import java.util.List;
import com.classroom_project.persistence.entities.EnrolledSubject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnrolledSubjectRepository extends JpaRepository<EnrolledSubject, Long> {
    List<EnrolledSubject> findByStudentId(long id);
    List<EnrolledSubject> findByTeacherId(long id);
}
