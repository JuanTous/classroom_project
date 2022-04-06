package com.classroom_project.web.controllers;

import java.util.List;
import com.classroom_project.domain.dto.StudentDTO;
import com.classroom_project.domain.services.PersonService;
import com.classroom_project.persistence.entities.Student;
import com.classroom_project.persistence.entities.Teacher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/people")
public class PersonController {
    @Autowired
    private PersonService service;

    //-----Students-----
    @GetMapping("/students")
    public List<Student> getAllStudents() {
        return service.getAllStudents();
    }

    @GetMapping("/students/{id}")
    public ResponseEntity<?> getStudent(@PathVariable("id") long id) {
        StudentDTO dto = service.getStudent(id);
        return dto != null ? new ResponseEntity<>(dto, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/students")
    public Student save(@RequestBody Student s) {
        return service.saveStudent(s);
    }

    //-----Teachers-----
    @GetMapping("/teachers")
    public List<Teacher> getAllTeachers() {
        return service.getAllTeachers();
    }

    @GetMapping("/teachers/{id}")
    public Teacher getTeacher(@PathVariable("id") long id) {
        return service.getTeacher(id);
    }

    @PostMapping("/teachers")
    public Teacher save(@RequestBody Teacher t) {
        return service.saveTeacher(t);
    }

    //-----AUTH-----
    @PostMapping("/auth/students")
    public Object loginStudent(@RequestParam("email") String email, @RequestParam("password") String password) {
        return service.loginStudent(email, password);
    }

    @PostMapping("/auth/teachers")
    public Object loginTeacher(@RequestParam("email") String email, @RequestParam("password") String password) {
        return service.loginTeacher(email, password);
    }
}
