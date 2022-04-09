package com.classroom_project.web.controllers;

import java.util.List;

import com.classroom_project.domain.dto.ProgramDTO;
import com.classroom_project.domain.services.ProgramService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/programs")
@CrossOrigin(origins = "http://localhost:3000")
public class ProgramController {
    @Autowired
    private ProgramService service;

    @GetMapping
    public ResponseEntity<List<ProgramDTO>> getAllStudents() {
        return new ResponseEntity<>(service.getAll(), HttpStatus.OK);
    }
}
