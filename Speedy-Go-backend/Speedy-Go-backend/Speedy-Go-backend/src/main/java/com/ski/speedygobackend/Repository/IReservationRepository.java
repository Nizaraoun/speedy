package com.ski.speedygobackend.Repository;

import com.ski.speedygobackend.Entity.SpecificTripManagement.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IReservationRepository extends JpaRepository<Reservation, Long> {


}
