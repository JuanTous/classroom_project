package com.classroom_project.persistence.mapper;

import com.classroom_project.domain.dto.ProgramDTO;
import com.classroom_project.persistence.entities.Program;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProgramMapper {

    ProgramDTO toDTO(Program p);
    @InheritInverseConfiguration
    Program toProgram(ProgramDTO dto);
}
