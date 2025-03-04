package com.ski.speedygobackend.Repository;


import com.ski.speedygobackend.Entity.SpecificTripManagement.SpecifiqueTrip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ISpecificTripRepository extends JpaRepository<SpecifiqueTrip, Long> {

    // Recherche par destination
    List<SpecifiqueTrip> findByDestination(String destination);

    // Recherche par type de véhicule
    List<SpecifiqueTrip> findByVehicleType(com.ski.speedygobackend.Enum.VehicleType vehicleType);

    // Recherche par prix inférieur à une valeur donnée
    List<SpecifiqueTrip> findByPriceLessThan(double price);

    // Recherche par date de départ
    List<SpecifiqueTrip> findByDepartureDate(java.time.LocalDate departureDate);
}
