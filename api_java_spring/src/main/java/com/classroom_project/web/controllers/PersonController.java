package com.classroom_project.web.controllers;

import com.classroom_project.domain.dto.StudentDTO;
import com.classroom_project.domain.dto.TeacherDTO;
import com.classroom_project.domain.services.PersonService;
import com.classroom_project.persistence.entities.Student;
import com.classroom_project.persistence.entities.Teacher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/people")
@CrossOrigin(origins = "http://localhost:3000")
public class PersonController {
    @Autowired
    private PersonService service;

    //-----Students-----
    @GetMapping("/students")
    public ResponseEntity<?> getAllStudents() {
        return new ResponseEntity<>(service.getAllStudents(), HttpStatus.OK);
    }

    @GetMapping("/students/{id}")
    public ResponseEntity<?> getStudent(@PathVariable("id") long id) {
        StudentDTO dto = service.getStudent(id);
        return dto != null ? new ResponseEntity<>(dto, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/students")
    public ResponseEntity<?> save(@RequestBody Student s) {
        return new ResponseEntity<>(service.saveStudent(s), HttpStatus.CREATED);
    }

    //-----Teachers-----
    @GetMapping("/teachers")
    public ResponseEntity<?> getAllTeachers() {
        return new ResponseEntity<>(service.getAllTeachers(), HttpStatus.OK);
    }

    @GetMapping("/teachers/program/{id}")
    public ResponseEntity<?> getAllTeachersByProgram(@PathVariable("id") Long id) {
        return new ResponseEntity<>(service.getTeachersByProgram(id), HttpStatus.OK);
    }

    @GetMapping("/teachers/{id}")
    public ResponseEntity<?> getTeacher(@PathVariable("id") long id) {
        TeacherDTO dto = service.getTeacher(id);
        return dto != null ? new ResponseEntity<>(dto, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/teachers")
    public ResponseEntity<?> save(@RequestBody Teacher t) {
        return new ResponseEntity<>(service.saveTeacher(t), HttpStatus.CREATED);
    }

    //-----AUTH-----
    @PostMapping("/auth")
    public Object login(@RequestParam("email") String email, @RequestParam("password") String password) {
        Object obj = service.login(email, password);
        return obj != null ? new ResponseEntity<>(obj, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
