package com.ski.speedygobackend.Entity.SpecificTripManagement;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.ski.speedygobackend.Enum.VehicleType;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.time.LocalDate;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
public class SpecifiqueTrip implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("tripDetails")
    private String tripDetails;

    @JsonProperty("departureLocation")
    private String departureLocation;
    @JsonProperty("arrivalLocation")
    private String arrivalLocation;
    @JsonProperty("price")
    private double price;


    @JsonProperty("destination")
    private String destination;


    @JsonProperty("departureDate")
    private LocalDate departureDate;
    @JsonProperty("arrivalDate")
    private LocalDate arrivalDate;

    @JsonProperty("departureTime")
    private String departureTime;

    @JsonProperty("arrivalTime")
    private String arrivalTime;


    @Enumerated(EnumType.STRING)
    @JsonProperty("vehicleType")
    private VehicleType vehicleType;




    @OneToOne
    private Reservation reservation;
}
