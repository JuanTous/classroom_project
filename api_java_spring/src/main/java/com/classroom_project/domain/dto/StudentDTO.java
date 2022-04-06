package com.classroom_project.domain.dto;

public class StudentDTO{
    private Long id;
    private String names;
    private String surnames;
    private String email;
    private ProgramDTO program;
    private Integer semester;

    public StudentDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNames() {
        return names;
    }

    public void setNames(String names) {
        this.names = names;
    }

    public String getSurnames() {
        return surnames;
    }

    public void setSurnames(String surnames) {
        this.surnames = surnames;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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
