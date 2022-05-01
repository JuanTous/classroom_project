package com.classroom_project.domain.services;

import java.util.List;
import java.util.Optional;

import com.classroom_project.domain.dto.AdminDTO;
import com.classroom_project.domain.dto.StudentDTO;
import com.classroom_project.domain.dto.TeacherDTO;
import com.classroom_project.persistence.entities.Admin;
import com.classroom_project.persistence.entities.Student;
import com.classroom_project.persistence.entities.Teacher;
import com.classroom_project.persistence.mapper.AdminMapper;
import com.classroom_project.persistence.mapper.StudentMapper;
import com.classroom_project.persistence.mapper.TeacherMapper;
import com.classroom_project.persistence.repositories.AdminRepository;
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
    private AdminMapper mapperAdmin;
    @Autowired
    private StudentRepository repoStudent;
    @Autowired
    private TeacherRepository repoTeacher;
    @Autowired
    private AdminRepository repoAdmin;

    //-----Students-----
    public List<StudentDTO> getAllStudents() {
        return mapperStudent.toDTOList(repoStudent.findAll());
    }

    public StudentDTO getStudent(long id) {
        Optional<Student> student = repoStudent.findById(id);
        return student.isPresent() ? mapperStudent.toDTO(student.get()) : null;
    }

    public StudentDTO saveStudent(Student s) {
        Student student = repoStudent.save(s);
        return mapperStudent.toDTO(student);
    }

    public Student deleteStudent(Long id) {
        return repoStudent.findById(id).map(s -> {
            repoStudent.deleteById(id);
            return s;
        }).orElse(null);
    }

    //-----Teachers-----
    public List<TeacherDTO> getAllTeachers() {
        return mapperTeacher.toDTOList(repoTeacher.findAll());
    }

    public TeacherDTO getTeacher(long id) {
        Optional<Teacher> teacher = repoTeacher.findById(id);
        return teacher.isPresent() ? mapperTeacher.toDTO(teacher.get()) : null;
    }

    public List<TeacherDTO> getTeachersByProgram(long id) {
        return mapperTeacher.toDTOList(repoTeacher.findByProgramId(id));
    }

    public TeacherDTO saveTeacher(Teacher t) {
        Teacher teacher = repoTeacher.save(t);
        return mapperTeacher.toDTO(teacher);
    }

    public Teacher deleteTeacher(Long id) {
        return repoTeacher.findById(id).map(t -> {
            repoTeacher.deleteById(id);
            return t;
        }).orElse(null);
    }

        //-----Admin-----
        public List<AdminDTO> getAllAdmin() {
            return mapperAdmin.toDTOList(repoAdmin.findAll());
        }
    
        public AdminDTO getAdmin(long id) {
            Optional<Admin> admin = repoAdmin.findById(id);
            return admin.isPresent() ? mapperAdmin.toDTO(admin.get()) : null;
        }
    
        public AdminDTO saveAdmin(Admin a) {
            Admin admin = repoAdmin.save(a);
            return mapperAdmin.toDTO(admin);
        }
    
        public Admin deleteAdmin(Long id) {
            return repoAdmin.findById(id).map(a -> {
                repoAdmin.deleteById(id);
                return a;
            }).orElse(null);
        }

    //-----AUTH-----
    public Object login(String email, String password) {
        Student s = repoStudent.login(email, password);
        if (s == null) {
            Teacher t = repoTeacher.login(email, password);
            if (t == null) {
                Admin a = repoAdmin.login(email, password);
                return a != null ? mapperAdmin.toDTO(a) : null;
            } else {
                return mapperTeacher.toDTO(t);
            }
        } else {
            return mapperStudent.toDTO(s);
        }
        
    }
}
