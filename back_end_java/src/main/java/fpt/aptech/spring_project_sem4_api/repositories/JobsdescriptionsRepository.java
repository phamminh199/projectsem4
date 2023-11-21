/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Repository.java to edit this template
 */
package fpt.aptech.spring_project_sem4_api.repositories;

import fpt.aptech.spring_project_sem4_api.entities.Job;
import fpt.aptech.spring_project_sem4_api.entities.Jobsdescriptions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.List;

/**
 *
 * @author vuna
 */
public interface JobsdescriptionsRepository extends JpaRepository<Jobsdescriptions, Integer> {
    @Query("SELECT j FROM Jobsdescriptions j WHERE j.idjob = :idjob")
    List<Jobsdescriptions> findJobsdescriptionsByIdJob(@PathVariable("idjob") int idjob);
    // Job idJob : tại sao lại là kiểu Job vì idjob là integer mà, => là vì bảng jobDescription này là khóa ngoại tới bảng chính job, một idjob của bảng job có thể xuất hiện nhiều lần trong bảng jobdescription
}
