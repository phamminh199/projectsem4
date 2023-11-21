package fpt.aptech.spring_project_sem4_api.repositories;

import fpt.aptech.spring_project_sem4_api.entities.Candidate;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;

public interface CandidateRepository extends JpaRepository<Candidate, Integer> {
    // checkSignIn
//    @Query("SELECT c FROM Candidate c WHERE c.email = :email and c.password = :password and c.status = 'active'")
//    Candidate checkSignIn(@PathVariable("email") String email, @PathVariable("password") String password);
    
    @Query("SELECT c FROM Candidate c WHERE c.email = :email and c.password = :password and c.status = 'active'")
    Candidate checkSignIn(@Param("email") String email, @Param("password") String password);
    
    Optional<Candidate> findByEmail(String email);
}
