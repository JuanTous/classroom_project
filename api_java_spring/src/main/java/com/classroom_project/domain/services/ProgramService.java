package com.classroom_project.domain.services;

import java.util.List;

import com.classroom_project.domain.dto.ProgramDTO;
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
}
