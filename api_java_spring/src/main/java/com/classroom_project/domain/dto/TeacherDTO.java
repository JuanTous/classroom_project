package com.classroom_project.domain.dto;

public class TeacherDTO extends PersonDTO {
    private ProgramDTO program;

    public TeacherDTO() {
        super();
    }

    public ProgramDTO getProgram() {
        return program;
    }

    public void setProgram(ProgramDTO program) {
        this.program = program;
    }
}
