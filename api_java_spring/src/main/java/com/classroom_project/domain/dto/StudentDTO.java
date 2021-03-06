package com.classroom_project.domain.dto;

public class StudentDTO extends PersonDTO{

    private ProgramDTO program;
    private Integer semester;

    public StudentDTO() {
        super();
    }

    public ProgramDTO getProgram() {
        return program;
    }

    public void setProgram(ProgramDTO program) {
        this.program = program;
    }

    public Integer getSemester() {
        return semester;
    }

    public void setSemester(Integer semester) {
        this.semester = semester;
    }
}
