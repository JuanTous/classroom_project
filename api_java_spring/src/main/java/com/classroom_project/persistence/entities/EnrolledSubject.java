package com.classroom_project.persistence.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "enrolled_subjects")
public class EnrolledSubject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "id_student")
    private Student student;
    @ManyToOne
    @JoinColumn(name = "id_subject")
    private Subject subject;
    @ManyToOne
    @JoinColumn(name = "id_teacher")
    private Teacher teacher;
    private Float firstScore;
    private Float secondScore;
    private Float thirdScore;
    
    public EnrolledSubject() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public Float getFirstScore() {
        return firstScore;
    }

    public void setFirstScore(Float firstScore) {
        this.firstScore = firstScore;
    }

    public Float getSecondScore() {
        return secondScore;
    }

    public void setSecondScore(Float secondScore) {
        this.secondScore = secondScore;
    }

    public Float getThirdScore() {
        return thirdScore;
    }

    public void setThirdScore(Float thirdScore) {
        this.thirdScore = thirdScore;
    }


}
