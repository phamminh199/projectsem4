
package fpt.aptech.spring_project_sem4_api.repositories;

import fpt.aptech.spring_project_sem4_api.entities.Resumetemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ResumetemplateRepository extends JpaRepository<Resumetemplate, Integer> {
    
    // findByIdresume
    @Query("SELECT r FROM Resumetemplate r WHERE r.idresume = :idresume")
    Resumetemplate findByIdresume(@Param("idresume") int idresume);
}
