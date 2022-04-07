package com.classroom_project.persistence.mapper;

import java.util.List;

import com.classroom_project.domain.dto.ProgramDTO;
import com.classroom_project.persistence.entities.Program;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProgramMapper {

    ProgramDTO toDTO(Program p);
    @InheritInverseConfiguration
    Program toEntity(ProgramDTO dto);
    List<ProgramDTO> toDTOList(List<Program> ls);
    @InheritInverseConfiguration
    List<Program> toList(List<ProgramDTO> lsDTO);
}
