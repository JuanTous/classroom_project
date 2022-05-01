package com.classroom_project.persistence.repositories;

import com.classroom_project.persistence.entities.Admin;

import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends PersonBaseRepository<Admin> {
    
}
