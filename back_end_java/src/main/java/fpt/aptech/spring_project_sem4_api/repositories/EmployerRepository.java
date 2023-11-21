package fpt.aptech.spring_project_sem4_api.repositories;

import fpt.aptech.spring_project_sem4_api.entities.Employer;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EmployerRepository extends JpaRepository<Employer, Integer> {
    // checkSignIn
    @Query("SELECT e FROM Employer e WHERE e.email = :email and e.password = :password and e.status = 'enable'")
    Employer checkSignIn(@Param("email") String email, @Param("password") String password);
    
    Optional<Employer> findByEmail(String email);
    
}
