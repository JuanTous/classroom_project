package com.classroom_project.web.controllers;

import java.util.List;

import com.classroom_project.domain.dto.SubjectDTO;
import com.classroom_project.domain.services.SubjectService;
import com.classroom_project.persistence.entities.Subject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/subjects")
@CrossOrigin(origins = "http://localhost:3000")
public class SubjectController {
    @Autowired
    private SubjectService service;

    //-----Students-----
    @GetMapping
    public ResponseEntity<List<SubjectDTO>> getAll() {
        return new ResponseEntity<>(service.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSubject(@PathVariable("id") long id) {
        SubjectDTO dto = service.getById(id);
        return dto != null ? new ResponseEntity<>(dto, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/program/{id}")
    public ResponseEntity<List<SubjectDTO>> getSubjectByProgram(@PathVariable("id") long id) {
        return new ResponseEntity<>(service.getByProgram(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<SubjectDTO> save(@RequestBody Subject s) {
        SubjectDTO result = service.save(s);
        return result != null ? new ResponseEntity<>(result, HttpStatus.CREATED) : new ResponseEntity<>(result, HttpStatus.NOT_MODIFIED);
    }
}
