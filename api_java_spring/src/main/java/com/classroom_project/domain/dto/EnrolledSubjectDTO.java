package com.classroom_project.domain.dto;

public class EnrolledSubjectDTO {
    private Long id;
    private StudentDTO student;
    private CourseSubjectDTO courseSubject;
    private Float firstScore;
    private Float secondScore;
    private Float thirdScore;
    
    public EnrolledSubjectDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public StudentDTO getStudent() {
        return student;
    }

    public void setStudent(StudentDTO student) {
        this.student = student;
    }

    public CourseSubjectDTO getCourseSubject() {
        return courseSubject;
    }

    public void setCourseSubject(CourseSubjectDTO courseSubject) {
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
