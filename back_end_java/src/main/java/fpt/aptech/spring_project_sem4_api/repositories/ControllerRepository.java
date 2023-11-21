package fpt.aptech.spring_project_sem4_api.repositories;

import fpt.aptech.spring_project_sem4_api.entities.Controller;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.PathVariable;

public interface ControllerRepository extends JpaRepository<Controller, Integer> {
        // checkSignIn
    @Query("SELECT c FROM Controller c WHERE c.email = :email and c.password = :password and c.status = 'active'")
    Controller checkSignIn(@PathVariable("email") String email, @PathVariable("password") String password);

    Optional<Controller> findByEmail(String email);
}
