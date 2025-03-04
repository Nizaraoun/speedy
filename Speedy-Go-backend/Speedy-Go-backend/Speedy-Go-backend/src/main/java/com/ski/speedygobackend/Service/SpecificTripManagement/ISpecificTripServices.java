package com.ski.speedygobackend.Service.SpecificTripManagement;

import com.ski.speedygobackend.Entity.SpecificTripManagement.SpecifiqueTrip;
import com.ski.speedygobackend.Enum.VehicleType;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ISpecificTripServices {

    List<SpecifiqueTrip> getAllTrips();
    Optional<SpecifiqueTrip> getTripById(Long id);
    SpecifiqueTrip createTrip(SpecifiqueTrip trip);
    SpecifiqueTrip updateTrip(Long id, SpecifiqueTrip trip);
    void deleteTrip(Long id);



    // Méthodes de recherche avancées
    List<SpecifiqueTrip> findTripsByDestination(String destination);
    List<SpecifiqueTrip> findTripsByVehicleType(VehicleType vehicleType);
    List<SpecifiqueTrip> findTripsByPriceLessThan(double price);
    List<SpecifiqueTrip> findTripsByDepartureDate(LocalDate departureDate);

}
