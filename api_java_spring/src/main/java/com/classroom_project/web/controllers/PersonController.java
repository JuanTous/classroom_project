package com.classroom_project.web.controllers;

import com.classroom_project.domain.dto.AdminDTO;
import com.classroom_project.domain.dto.StudentDTO;
import com.classroom_project.domain.dto.TeacherDTO;
import com.classroom_project.domain.services.PersonService;
import com.classroom_project.persistence.entities.Admin;
import com.classroom_project.persistence.entities.Student;
import com.classroom_project.persistence.entities.Teacher;
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
    public ResponseEntity<?> saveStudent(@RequestBody Student s) {
        return new ResponseEntity<>(service.saveStudent(s), HttpStatus.CREATED);
    }

    @DeleteMapping("/students/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable("id") Long id) {
        Student s = service.deleteStudent(id);
        return s != null ? new ResponseEntity<Student>(s, HttpStatus.OK) : new ResponseEntity<Student>(HttpStatus.NOT_FOUND);
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
    public ResponseEntity<?> getTeacher(@PathVariable("id") Long id) {
        TeacherDTO dto = service.getTeacher(id);
        return dto != null ? new ResponseEntity<>(dto, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/teachers/{id}")
    public ResponseEntity<?> editTeacher(@PathVariable("id") Long id, @RequestBody TeacherDTO dto) {
        dto.setId(id);
        return new ResponseEntity<>(service.editTeacher(dto), HttpStatus.CREATED);
    }
    
    @PostMapping("/teachers")
    public ResponseEntity<?> saveTeacher(@RequestBody Teacher t) {
        return new ResponseEntity<>(service.saveTeacher(t), HttpStatus.CREATED);
    }

    @DeleteMapping("/teachers/{id}")
    public ResponseEntity<?> deleteTeacher(@PathVariable("id") Long id) {
        Teacher t = service.deleteTeacher(id);
        return t != null ? new ResponseEntity<Teacher>(t, HttpStatus.OK) : new ResponseEntity<Teacher>(HttpStatus.NOT_FOUND);
    }

    //-----Admin-----
    @GetMapping("/admin")
    public ResponseEntity<?> getAllAdmin() {
        return new ResponseEntity<>(service.getAllAdmin(), HttpStatus.OK);
    }

    @GetMapping("/admin/{id}")
    public ResponseEntity<?> getAdmin(@PathVariable("id") long id) {
        AdminDTO dto = service.getAdmin(id);
        return dto != null ? new ResponseEntity<>(dto, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/admin")
    public ResponseEntity<?> saveAdmin(@RequestBody Admin a) {
        return new ResponseEntity<>(service.saveAdmin(a), HttpStatus.CREATED);
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<?> deleteAdmin(@PathVariable("id") Long id) {
        Admin a = service.deleteAdmin(id);
        return a != null ? new ResponseEntity<Admin>(a, HttpStatus.OK) : new ResponseEntity<Admin>(HttpStatus.NOT_FOUND);
    }

    //-----AUTH-----
    @PostMapping("/auth")
    public Object login(@RequestParam("email") String email, @RequestParam("password") String password) {
        Object obj = service.login(email, password);
        return obj != null ? new ResponseEntity<>(obj, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
