
package fpt.aptech.spring_project_sem4_api.repositories;

import fpt.aptech.spring_project_sem4_api.entities.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;


public interface JobRepository extends JpaRepository<Job, Integer> {
    @Modifying
    @Query("UPDATE Job j SET j.status = :status WHERE j.idjob = :idjob")
    void updateJobStatus(@Param("idjob") int idjob, @Param("status") String status);
    
    @Query("SELECT j FROM Job j WHERE j.idjob = :idjob")
    Job findByIdjob(@PathVariable("idjob") int idjob);
}
