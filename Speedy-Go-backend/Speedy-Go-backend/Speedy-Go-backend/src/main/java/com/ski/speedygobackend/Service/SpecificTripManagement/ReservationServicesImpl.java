package com.ski.speedygobackend.Service.SpecificTripManagement;

import com.ski.speedygobackend.Entity.SpecificTripManagement.Reservation;
import com.ski.speedygobackend.Repository.IReservationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor

public class ReservationServicesImpl implements IReservationServices {

    private final IReservationRepository reservationRepository;


    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Optional<Reservation> getReservationById(Long id) {
        return reservationRepository.findById(id);
    }


    public Reservation createReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }


    public Reservation updateReservation(Long id, Reservation newReservation) {
        return reservationRepository.findById(id).map(reservation -> {
            reservation.setReservationDate(newReservation.getReservationDate());
            reservation.setReservationStatus(newReservation.getReservationStatus());
            reservation.setUser(newReservation.getUser());
            reservation.setSpecifiqueTrip(newReservation.getSpecifiqueTrip());
            return reservationRepository.save(reservation);
        }).orElseThrow(() -> new RuntimeException("Reservation not found"));
    }


    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }



}
