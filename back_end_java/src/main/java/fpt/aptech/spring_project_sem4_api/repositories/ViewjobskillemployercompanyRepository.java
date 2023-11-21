/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Repository.java to edit this template
 */
package fpt.aptech.spring_project_sem4_api.repositories;

import fpt.aptech.spring_project_sem4_api.entities.Viewjobskillemployercompany;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.PathVariable;

/**
 *
 * @author vuna
 */
public interface ViewjobskillemployercompanyRepository extends JpaRepository<Viewjobskillemployercompany, Integer> {
    
    @Query("SELECT v FROM Viewjobskillemployercompany v WHERE v.jobtitle LIKE CONCAT('%', :jobtitle, '%')")
    List<Viewjobskillemployercompany> FindJobsByJobsTitle(@PathVariable("jobtitle") String jobtitle);
    
    @Query("SELECT v FROM Viewjobskillemployercompany v WHERE v.idjob = :idjob")
    List<Viewjobskillemployercompany> findJobByIdjob(@PathVariable("idjob") int idjob);
}
