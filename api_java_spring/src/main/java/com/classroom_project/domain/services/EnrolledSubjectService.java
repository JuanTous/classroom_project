package com.classroom_project.domain.services;

import java.util.List;
import com.classroom_project.domain.dto.EnrolledSubjectDTO;
import com.classroom_project.persistence.entities.EnrolledSubject;
import com.classroom_project.persistence.mapper.EnrolledSubjectMapper;
import com.classroom_project.persistence.repositories.EnrolledSubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnrolledSubjectService {
    @Autowired
    private EnrolledSubjectRepository repository;
    @Autowired
    private EnrolledSubjectMapper mapper;

    public List<EnrolledSubjectDTO> getAll() {
        return mapper.toDTOList(repository.findAll());
    }

    public List<EnrolledSubjectDTO> getByStudentId(long id) {
        return mapper.toDTOList(repository.findByStudentId(id));
    }

    public List<EnrolledSubjectDTO> getByCourseSubjectTeacherId(long id) {
        return mapper.toDTOList(repository.findByCourseSubjectTeacherId(id));
    }

    public boolean save(EnrolledSubjectDTO dto) {
        EnrolledSubject e = repository.save(mapper.toEntity(dto));
        return e != null ? true : false;
    }

    public EnrolledSubjectDTO delete(Long id) {
        return repository.findById(id).map(e -> {
               repository.deleteById(id);
               return mapper.toDTO(e);
               })
               .orElse(null);
    }
    
}
