/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Repository.java to edit this template
 */
package fpt.aptech.spring_project_sem4_api.repositories;

import fpt.aptech.spring_project_sem4_api.entities.Job;
import fpt.aptech.spring_project_sem4_api.entities.Reasonstojoin;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.PathVariable;

/**
 *
 * @author vuna
 */
public interface ReasonstojoinRepository extends JpaRepository<Reasonstojoin, Integer> {
    @Query("SELECT r FROM Reasonstojoin r WHERE r.idjob = :idjob")
    List<Reasonstojoin> findReasonstojoinByIdJob(@PathVariable("idjob") int idjob);
}
