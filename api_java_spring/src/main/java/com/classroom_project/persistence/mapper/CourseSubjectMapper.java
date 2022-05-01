package com.classroom_project.persistence.mapper;

import java.util.List;
import com.classroom_project.domain.dto.CourseSubjectDTO;
import com.classroom_project.persistence.entities.CourseSubject;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {SubjectMapper.class, TeacherMapper.class})
public interface CourseSubjectMapper {
    CourseSubjectDTO toDTO(CourseSubject e);
    @InheritInverseConfiguration
    CourseSubject toEntity(CourseSubjectDTO dto);
    List<CourseSubjectDTO> toDTOList(List<CourseSubject> ls);    
    @InheritInverseConfiguration
    List<CourseSubject> toEntityList(List<CourseSubjectDTO> ls);
}
