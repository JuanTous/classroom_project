package com.classroom_project.persistence.mapper;

import java.util.List;

import com.classroom_project.domain.dto.AdminDTO;
import com.classroom_project.persistence.entities.Admin;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AdminMapper {
    AdminDTO toDTO(Admin e);
    @InheritInverseConfiguration
    Admin toEntity(AdminDTO dto);
    List<AdminDTO> toDTOList(List<Admin> ls);
    @InheritInverseConfiguration
    List<Admin> toEntityList(List<AdminDTO> ls);
}
