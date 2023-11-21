
package fpt.aptech.spring_project_sem4_api.repositories;

import fpt.aptech.spring_project_sem4_api.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface ReviewRepository extends JpaRepository<Review, Integer> {
    
    @Modifying
    @Query("DELETE FROM Review r WHERE r.id = :id")
    void removeReview(@Param("id") int id);
    
    @Modifying
    @Query("UPDATE Review r SET r.status = :status WHERE r.id = :id")
    void updateReviewStatus(@Param("id") int id, @Param("status") String status);
}
