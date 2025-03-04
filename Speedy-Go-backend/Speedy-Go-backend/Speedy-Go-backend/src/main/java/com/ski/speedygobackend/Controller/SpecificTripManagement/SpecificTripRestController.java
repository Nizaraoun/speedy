package com.ski.speedygobackend.Controller.SpecificTripManagement;

import com.ski.speedygobackend.Entity.SpecificTripManagement.SpecifiqueTrip;
import com.ski.speedygobackend.Enum.VehicleType;
import com.ski.speedygobackend.Service.SpecificTripManagement.ISpecificTripServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/specific-trips")
@RequiredArgsConstructor
public class SpecificTripRestController {

    private final ISpecificTripServices tripService;

    @GetMapping("/{id}")
    public ResponseEntity<SpecifiqueTrip> getTripById(@PathVariable Long id) {
        Optional<SpecifiqueTrip> trip = tripService.getTripById(id);
        return trip.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<SpecifiqueTrip> getAllTrips() {
        return tripService.getAllTrips();
    }

    // Main POST endpoint
    @PostMapping
    public SpecifiqueTrip createTrip(@RequestBody SpecifiqueTrip trip) {
        return tripService.createTrip(trip);
    }
    
    // Support for legacy endpoint
    @PostMapping("/create")
    public SpecifiqueTrip createTripLegacy(@RequestBody SpecifiqueTrip trip) {
        return tripService.createTrip(trip);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SpecifiqueTrip> updateTrip(@PathVariable Long id, @RequestBody SpecifiqueTrip trip) {
        try {
            return ResponseEntity.ok(tripService.updateTrip(id, trip));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrip(@PathVariable Long id) {
        tripService.deleteTrip(id);
        return ResponseEntity.noContent().build();
    }

    // Search endpoints
    @GetMapping("/search/destination/{destination}")
    public List<SpecifiqueTrip> getTripsByDestination(@PathVariable String destination) {
        return tripService.findTripsByDestination(destination);
    }

    @GetMapping("/search/vehicle-type/{vehicleType}")
    public List<SpecifiqueTrip> getTripsByVehicleType(@PathVariable VehicleType vehicleType) {
        return tripService.findTripsByVehicleType(vehicleType);
    }

    @GetMapping("/search/price/{price}")
    public List<SpecifiqueTrip> getTripsByPrice(@PathVariable double price) {
        return tripService.findTripsByPriceLessThan(price);
    }

    @GetMapping("/search/departure-date/{date}")
    public List<SpecifiqueTrip> getTripsByDepartureDate(@PathVariable String date) {
        return tripService.findTripsByDepartureDate(LocalDate.parse(date));
    }
}