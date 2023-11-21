/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Repository.java to edit this template
 */
package fpt.aptech.spring_project_sem4_api.repositories;

import fpt.aptech.spring_project_sem4_api.entities.Job;
import fpt.aptech.spring_project_sem4_api.entities.Whyyouloveworkinghere;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.PathVariable;
/**
 *
 * @author vuna
 */
public interface WhyyouloveworkinghereRepository extends JpaRepository<Whyyouloveworkinghere, Integer> {
    @Query("SELECT w FROM Whyyouloveworkinghere w WHERE w.idjob = :idjob")
    List<Whyyouloveworkinghere> findWhyyouloveworkinghereByIdJob(@PathVariable("idjob") int idjob);
}
