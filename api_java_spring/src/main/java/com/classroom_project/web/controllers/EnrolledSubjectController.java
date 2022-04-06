package com.classroom_project.web.controllers;

import java.util.List;
import com.classroom_project.domain.services.EnrolledSubjectService;
import com.classroom_project.persistence.entities.EnrolledSubject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/enrolled")
@CrossOrigin(origins = "http://localhost:3000")
public class EnrolledSubjectController {
    @Autowired
    private EnrolledSubjectService service;

    @GetMapping
    public ResponseEntity<List<EnrolledSubject>> getAll() {
        List<EnrolledSubject> subjects = service.getAll();
        return !subjects.isEmpty() ? new ResponseEntity<>(subjects, HttpStatus.OK) 
        : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/student/{id}")
    public ResponseEntity<List<EnrolledSubject>> getEnrolledByStudent(@PathVariable("id") long id) {
        List<EnrolledSubject> subjects = service.getByStudentId(id);
        return !subjects.isEmpty() ? new ResponseEntity<>(subjects, HttpStatus.OK) 
        : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/teacher/{id}")
    public ResponseEntity<List<EnrolledSubject>> getEnrolledByTeacher(@PathVariable("id") long id) {
        List<EnrolledSubject> subjects = service.getByTeacherId(id);
        return !subjects.isEmpty() ? new ResponseEntity<>(subjects, HttpStatus.OK) 
        : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
