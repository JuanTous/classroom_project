package com.classroom_project.domain.services;

import java.util.List;

import com.classroom_project.persistence.entities.EnrolledSubject;
import com.classroom_project.persistence.repositories.EnrolledSubjectRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnrolledSubjectService {
    @Autowired
    private EnrolledSubjectRepository repository;

    public List<EnrolledSubject> getAll() {
        return repository.findAll();
    }

    public List<EnrolledSubject> getByStudentId(long id) {
        return repository.findByStudentId(id);
    }

    public List<EnrolledSubject> getByTeacherId(long id) {
        return repository.findByTeacherId(id);
    }
}
