package com.classroom_project.persistence.mapper;

import java.util.List;

import com.classroom_project.domain.dto.TeacherDTO;
import com.classroom_project.persistence.entities.Teacher;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {ProgramMapper.class})
public interface TeacherMapper {

    TeacherDTO toDto(Teacher e);
    @InheritInverseConfiguration
    Teacher toEntity(TeacherDTO dto);
    List<TeacherDTO> toDTOList(List<Teacher> ls);
    @InheritInverseConfiguration
    List<Teacher> toEntityList(List<TeacherDTO> ls);
}

