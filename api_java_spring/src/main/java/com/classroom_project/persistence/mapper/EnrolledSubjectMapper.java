package com.classroom_project.persistence.mapper;

import java.util.List;
import com.classroom_project.domain.dto.EnrolledSubjectDTO;
import com.classroom_project.persistence.entities.EnrolledSubject;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {ProgramMapper.class})
public interface EnrolledSubjectMapper {
    EnrolledSubjectDTO toDTO(EnrolledSubject e);
    @InheritInverseConfiguration
    EnrolledSubject toEntity(EnrolledSubjectDTO dto);
    List<EnrolledSubjectDTO> toDTOList(List<EnrolledSubject> ls);    
    @InheritInverseConfiguration
    List<EnrolledSubject> toEntityList(List<EnrolledSubjectDTO> ls);
}
