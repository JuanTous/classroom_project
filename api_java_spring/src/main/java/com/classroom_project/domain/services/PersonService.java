package com.classroom_project.domain.services;

import java.util.List;
import java.util.Optional;
import com.classroom_project.domain.dto.StudentDTO;
import com.classroom_project.persistence.entities.Student;
import com.classroom_project.persistence.entities.Teacher;
import com.classroom_project.persistence.mapper.StudentMapper;
import com.classroom_project.persistence.mapper.TeacherMapper;
import com.classroom_project.persistence.repositories.StudentRepository;
import com.classroom_project.persistence.repositories.TeacherRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonService {
    @Autowired
    private StudentMapper mapperStudent;
    @Autowired
    private TeacherMapper mapperTeacher;
    @Autowired
    private StudentRepository repoStudent;
    @Autowired
    private TeacherRepository repoTeacher;

    //-----Students-----
    public List<Student> getAllStudents() {
        return repoStudent.findAll();
    }

    public StudentDTO getStudent(long id) {
        Optional<Student> s = repoStudent.findById(id);
        return s.isPresent() ? mapperStudent.toDto(s.get()) : null;
    }

    public Student saveStudent(Student s) {
        return repoStudent.save(s);
    }

    //-----Teachers-----
    public List<Teacher> getAllTeachers() {
        return repoTeacher.findAll();
    }

    public Teacher getTeacher(long id) {
        return repoTeacher.findById(id).map(t -> t).orElse(null);
    }

    public Teacher saveTeacher(Teacher t) {
        return repoTeacher.save(t);
    }

    //-----AUTH-----
    public Object login(String email, String password) {
        Student s = repoStudent.login(email, password);
        if (s == null) {
            Teacher t = repoTeacher.login(email, password);
            return t != null ? mapperTeacher.toDto(t) : null;
        } else {
            return s != null ? mapperStudent.toDto(s) : null;
        }
        
    }
}
