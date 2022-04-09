package com.classroom_project.web.controllers;

import java.util.List;

import com.classroom_project.domain.dto.ProgramDTO;
import com.classroom_project.domain.services.ProgramService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/programs")
@CrossOrigin(origins = "http://localhost:3000")
public class ProgramController {
    @Autowired
    private ProgramService service;

    @GetMapping
    public ResponseEntity<List<ProgramDTO>> getAll() {
        return new ResponseEntity<>(service.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProgramDTO> getProram(@PathVariable("id") Long id) {
        ProgramDTO dto = service.getProgram(id);
        return dto != null ? new ResponseEntity<>(dto, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Boolean> save(@RequestBody ProgramDTO dto) {
        boolean result = service.save(dto);
        return result ? new ResponseEntity<>(result, HttpStatus.CREATED) : new ResponseEntity<>(result, HttpStatus.NOT_MODIFIED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Boolean> edit(@RequestBody ProgramDTO dto, @PathVariable("id") Long id) {
        dto.setId(id);
        boolean result = service.save(dto);
        return result ? new ResponseEntity<>(result, HttpStatus.CREATED) : new ResponseEntity<>(result, HttpStatus.NOT_MODIFIED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ProgramDTO> delete(@PathVariable("id") Long id) {
        ProgramDTO dto = service.delete(id);
        return dto != null ? new ResponseEntity<ProgramDTO>(dto, HttpStatus.OK) : new ResponseEntity<ProgramDTO>(HttpStatus.NOT_FOUND);
    }
}
