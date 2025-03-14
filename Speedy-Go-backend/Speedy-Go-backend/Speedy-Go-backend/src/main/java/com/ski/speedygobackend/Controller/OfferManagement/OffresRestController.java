package com.ski.speedygobackend.Controller.OfferManagement;


import com.ski.speedygobackend.Entity.OfferManagement.Offres;
import com.ski.speedygobackend.Service.OfferManagement.IOffresServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
 import com.ski.speedygobackend.DTO.offresDetailsDTO;


@RequiredArgsConstructor
@RestController
@RequestMapping("/offres")

public class OffresRestController {
   
    private final IOffresServices offresServices;
    
    @PostMapping("/add/{id-store}")
    public ResponseEntity<?> addOffre(@RequestBody Offres offre , @PathVariable("id-store") Long idStore) {
        System.out.println(idStore);    

        try {
            // Ensure the store is set before saving the offer
            if (idStore != null) {
            
            Offres savedOffre = offresServices.addOffre(offre,idStore);
            return new ResponseEntity<>(savedOffre, HttpStatus.OK);
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Store ID is required");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    
    // You might want to add other endpoints for the rest of your service methods
    @GetMapping("/all/{id-store}")
    public ResponseEntity<List<offresDetailsDTO>> getAllOffresByStoreId (@PathVariable("id-store") Long idStore) {
        List<offresDetailsDTO> offres = offresServices.retrieveAllOffresByStoreID(idStore);
        // List<offresDetailsDTO> offres = offresServices.retrieveAllOffres();
        return ResponseEntity.ok(offres);
    }
    
    @GetMapping("getby/{id}")
    public ResponseEntity<Offres> getOffreById(@PathVariable("id") Long idOffre) {
        Offres offre = offresServices.retrieveOffre(idOffre);
        return offre != null ? ResponseEntity.ok(offre) : ResponseEntity.notFound().build();
    }
    
    @PutMapping("/update")
    public ResponseEntity<Offres> updateOffre(@RequestBody Offres offre) {
        Offres updatedOffre = offresServices.updateOffre(offre);
        return ResponseEntity.ok(updatedOffre);
    }
    
    @DeleteMapping("delete/{id}")
    public ResponseEntity<Void> deleteOffre(@PathVariable("id") Long idOffre) {
        offresServices.removeOffre(idOffre);
        return ResponseEntity.noContent().build();
    }
}