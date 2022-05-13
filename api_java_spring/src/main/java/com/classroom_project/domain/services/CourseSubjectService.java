package com.classroom_project.domain.services;

import java.util.List;
import com.classroom_project.domain.dto.CourseSubjectDTO;
import com.classroom_project.persistence.entities.CourseSubject;
import com.classroom_project.persistence.mapper.CourseSubjectMapper;
import com.classroom_project.persistence.repositories.CourseSubjectRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourseSubjectService {
    @Autowired
    private CourseSubjectRepository repository;
    @Autowired
    private CourseSubjectMapper mapper;

    public List<CourseSubjectDTO> getAll() {
        return mapper.toDTOList(repository.findAll());
    }

    public boolean save(CourseSubject c) {
        CourseSubject cs = repository.save(c);
        return cs != null ? true : false;
    }

    public List<CourseSubjectDTO> getBySubjectProgramId(long id) {
        return mapper.toDTOList(repository.findBySubjectProgramId(id));
    }

    public List<CourseSubjectDTO> getByTeacherId(long id) {
        return mapper.toDTOList(repository.findByTeacherId(id));
    }

    public CourseSubjectDTO delete(Long id) {
        return repository.findById(id).map(c -> {
               repository.deleteById(id);
               return mapper.toDTO(c);
               })
               .orElse(null);
    }
}
