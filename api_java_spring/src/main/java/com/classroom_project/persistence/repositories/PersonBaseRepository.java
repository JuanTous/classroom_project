package com.classroom_project.persistence.repositories;

import java.util.List;

import com.classroom_project.persistence.entities.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface PersonBaseRepository<T extends Person> extends JpaRepository<T, Long>{

    List<T> findByEmail(String email); 

    default T login (String email, String password) {
        List<T> people = findByEmail(email.toLowerCase());
        if (!people.isEmpty()) {
            for (T person : people) {
                if (person.getEmail().toLowerCase().equals(email.toLowerCase()) && person.getPassword().equals(password)) {
                    return person;
                }
            }
        }
        return null;
    }

}
