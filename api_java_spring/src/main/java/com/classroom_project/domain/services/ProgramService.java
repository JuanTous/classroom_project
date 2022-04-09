package com.classroom_project.domain.services;

import java.util.List;
import java.util.Optional;

import com.classroom_project.domain.dto.ProgramDTO;
import com.classroom_project.persistence.entities.Program;
import com.classroom_project.persistence.mapper.ProgramMapper;
import com.classroom_project.persistence.repositories.ProgramRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProgramService {
    @Autowired
    private ProgramRepository repository;
    @Autowired
    private ProgramMapper mapper;

    public List<ProgramDTO> getAll() {
        return mapper.toDTOList(repository.findAll());
    }

    public ProgramDTO getProgram(Long id) {
        Optional<Program> p = repository.findById(id);
        return p.isPresent() ? mapper.toDTO(p.get()) : null;
    }

    public boolean save(ProgramDTO dto) {
        Program p = repository.save(mapper.toEntity(dto));
        return p != null ? true : false;
        
    }

    public ProgramDTO delete(Long id) {
        return repository.findById(id).map(p -> {
            repository.deleteById(id);
            return mapper.toDTO(p);
            })
            .orElse(null);
    }
}
