/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Repository.java to edit this template
 */
package fpt.aptech.spring_project_sem4_api.repositories;

import fpt.aptech.spring_project_sem4_api.entities.Question;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author vuna
 */
public interface QuestionRepository extends JpaRepository<Question, Integer> {
    
}
