/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/Repository.java to edit this template
 */
package fpt.aptech.spring_project_sem4_api.repositories;

import fpt.aptech.spring_project_sem4_api.entities.Favorite;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;

/**
 *
 * @author vuna
 */
public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {
    // findAllByIdCandidate
    @Query("SELECT f FROM Favorite f WHERE f.idcandidate = idcandidate")
    List<Favorite> findAllByIdCandidate(@PathVariable int idcandidate);

    @Modifying
    @Query("DELETE FROM Favorite f WHERE f.idfavorite = :idfavorite")
    void removefavoritejob(@Param("idfavorite") int idfavorite);
}
