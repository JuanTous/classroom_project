package com.classroom_project.domain.dto;

import java.util.Date;

public class CourseSubjectDTO {
    private Long id;
    private SubjectDTO subject;
    private TeacherDTO teacher;
    private Date startDate;
    private Date endDate;

    public CourseSubjectDTO() {
    }
    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public SubjectDTO getSubject() {
        return subject;
    }
    public void setSubject(SubjectDTO subject) {
        this.subject = subject;
    }
    public TeacherDTO getTeacher() {
        return teacher;
    }
    public void setTeacher(TeacherDTO teacher) {
        this.teacher = teacher;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}
