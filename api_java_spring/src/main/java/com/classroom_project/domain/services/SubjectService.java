package com.classroom_project.domain.services;

import java.util.List;
import java.util.Optional;

import com.classroom_project.domain.dto.SubjectDTO;
import com.classroom_project.persistence.entities.Subject;
import com.classroom_project.persistence.mapper.SubjectMapper;
import com.classroom_project.persistence.repositories.SubjectRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SubjectService {
    @Autowired
    private SubjectRepository repository;
    @Autowired
    private SubjectMapper mapper;

    public List<SubjectDTO> getAll() {
        return mapper.toDTOList(repository.findAll());
    }

    public SubjectDTO getById(Long id) {
        Optional<Subject> subject = repository.findById(id);
        return subject.isPresent() ? mapper.toDTO(subject.get()) : null;
    }

    public List<SubjectDTO> getByProgram(Long id) {
        return mapper.toDTOList(repository.findByProgramId(id));
    }
}
