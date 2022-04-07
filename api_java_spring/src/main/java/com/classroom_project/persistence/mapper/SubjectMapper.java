package com.classroom_project.persistence.mapper;

import java.util.List;
import com.classroom_project.domain.dto.SubjectDTO;
import com.classroom_project.persistence.entities.Subject;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SubjectMapper {
    SubjectDTO toDTO(Subject s);
    @InheritInverseConfiguration
    Subject toEntity(SubjectDTO dto);
    List<SubjectDTO> toDTOList(List<Subject> ls);
    @InheritInverseConfiguration
    List<Subject> toList(List<SubjectDTO> lsDTO);
}
