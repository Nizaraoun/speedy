package com.ski.speedygobackend.Repository;

import com.ski.speedygobackend.Entity.OfferManagement.Offres;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOffresRepository extends JpaRepository<Offres, Long> {
    boolean existsById(Long offreId);
}
