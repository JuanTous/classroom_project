package com.classroom_project.persistence.mapper;

import java.util.List;

import com.classroom_project.domain.dto.StudentDTO;
import com.classroom_project.persistence.entities.Student;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {ProgramMapper.class})
public interface StudentMapper {

    StudentDTO toDTO(Student e);
    @InheritInverseConfiguration
    Student toEntity(StudentDTO dto);
    List<StudentDTO> toDTOList(List<Student> ls);
    @InheritInverseConfiguration
    List<Student> toList(List<StudentDTO> lsDTO);
}
