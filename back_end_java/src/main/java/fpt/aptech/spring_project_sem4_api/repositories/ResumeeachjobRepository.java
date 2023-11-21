package fpt.aptech.spring_project_sem4_api.repositories;

import fpt.aptech.spring_project_sem4_api.entities.Resumeeachjob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ResumeeachjobRepository extends JpaRepository<Resumeeachjob, Integer> {
    
     // findByIdresume, hàm này phải tự build , hàm của jpa ko dùng đc
    @Query("SELECT r FROM Resumeeachjob r WHERE r.idcandidate = :idcandidate")
    Resumeeachjob findByIdcandidate(@Param("idcandidate") int idcandidate);

}
