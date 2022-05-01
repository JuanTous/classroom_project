package com.classroom_project.persistence.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "enrolled_subjects")
public class EnrolledSubject implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "id_student")
    private Student student;
    @ManyToOne
    @JoinColumn(name = "id_course_subject")
    private CourseSubject courseSubject;
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

    public CourseSubject getCourseSubject() {
        return courseSubject;
    }

    public void setCourseSubject(CourseSubject courseSubject) {
        this.courseSubject = courseSubject;
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
