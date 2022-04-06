package com.classroom_project.persistence.entities;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Teacher extends Person{

    @ManyToOne
    @JoinColumn(name = "id_program")
    private Program program;

    public Teacher() {
        super();
    }

    public Program getProgram() {
        return program;
    }

    public void setProgram(Program program) {
        this.program = program;
    }


}
