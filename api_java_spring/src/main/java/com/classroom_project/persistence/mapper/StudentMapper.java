package com.classroom_project.persistence.mapper;

import com.classroom_project.domain.dto.StudentDTO;
import com.classroom_project.persistence.entities.Student;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {ProgramMapper.class})
public interface StudentMapper {

    StudentDTO toDto(Student s);
    @InheritInverseConfiguration
    Student toStudent(StudentDTO dto);
}
