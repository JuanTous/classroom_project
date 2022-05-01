package com.classroom_project.web.controllers;

import java.util.List;

import com.classroom_project.domain.dto.CourseSubjectDTO;
import com.classroom_project.domain.services.CourseSubjectService;
import com.classroom_project.persistence.entities.CourseSubject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/course-subjects")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseSubjectController {
    @Autowired
    private CourseSubjectService service;

    @GetMapping
    public ResponseEntity<List<CourseSubjectDTO>> getAll() {
        return new ResponseEntity<List<CourseSubjectDTO>>(service.getAll(), HttpStatus.OK);
    }

    @GetMapping("/program/{id}")
    public ResponseEntity<List<CourseSubjectDTO>> getByProgram(@PathVariable("id") Long id) {
        return new ResponseEntity<List<CourseSubjectDTO>>(service.getBySubjectProgramId(id), HttpStatus.OK);
    }
    
    @PostMapping
    public ResponseEntity<Boolean> save(@RequestBody CourseSubject e) {
        boolean result = service.save(e);
        return result ? new ResponseEntity<>(result, HttpStatus.CREATED) : new ResponseEntity<>(result, HttpStatus.NOT_MODIFIED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CourseSubjectDTO> delete(@PathVariable("id") Long id) {
        CourseSubjectDTO dto = service.delete(id);
        return dto != null ? new ResponseEntity<CourseSubjectDTO>(dto, HttpStatus.OK) : new ResponseEntity<CourseSubjectDTO>(HttpStatus.NOT_FOUND);
    }
}
