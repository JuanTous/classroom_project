package com.classroom_project.web.controllers;

import java.util.List;
import com.classroom_project.domain.dto.EnrolledSubjectDTO;
import com.classroom_project.domain.services.EnrolledSubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/enrolled")
@CrossOrigin(origins = "http://localhost:3000")
public class EnrolledSubjectController {
    @Autowired
    private EnrolledSubjectService service;

    @GetMapping
    public ResponseEntity<List<EnrolledSubjectDTO>> getAll() {
        List<EnrolledSubjectDTO> subjects = service.getAll();
        return new ResponseEntity<>(subjects, HttpStatus.OK);
    }

    @GetMapping("/student/{id}")
    public ResponseEntity<List<EnrolledSubjectDTO>> getEnrolledByStudent(@PathVariable("id") long id) {
        List<EnrolledSubjectDTO> subjects = service.getByStudentId(id);
        return new ResponseEntity<>(subjects, HttpStatus.OK);
    }

    @GetMapping("/teacher/{id}")
    public ResponseEntity<List<EnrolledSubjectDTO>> getEnrolledByTeacher(@PathVariable("id") long id) {
        List<EnrolledSubjectDTO> subjects = service.getByCourseSubjectTeacherId(id);
        return new ResponseEntity<>(subjects, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Boolean> save(@RequestBody EnrolledSubjectDTO dto) {
        boolean result = service.save(dto);
        return result ? new ResponseEntity<>(result, HttpStatus.CREATED) : new ResponseEntity<>(result, HttpStatus.NOT_MODIFIED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Boolean> edit(@RequestBody EnrolledSubjectDTO dto, @PathVariable("id") Long id) {
        dto.setId(id);
        boolean result = service.save(dto);
        return result ? new ResponseEntity<>(result, HttpStatus.CREATED) : new ResponseEntity<>(result, HttpStatus.NOT_MODIFIED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<EnrolledSubjectDTO> delete(@PathVariable("id") Long id) {
        EnrolledSubjectDTO dto = service.delete(id);
        return dto != null ? new ResponseEntity<EnrolledSubjectDTO>(dto, HttpStatus.OK) : new ResponseEntity<EnrolledSubjectDTO>(HttpStatus.NOT_FOUND);
    }
}
