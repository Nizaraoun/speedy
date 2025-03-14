package com.ski.speedygobackend.Service.OfferManagement;

import com.ski.speedygobackend.Entity.OfferManagement.Offres;
import com.ski.speedygobackend.Entity.OfferManagement.Store;
import com.ski.speedygobackend.Repository.IOffresRepository;
import com.ski.speedygobackend.Repository.IStoreRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.ski.speedygobackend.DTO.offresDetailsDTO;


import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class OffresServicesImpl implements IOffresServices {

    private final IOffresRepository offresRepository;
    private final IStoreRepository storeRepository;
    
    @Override
    @Transactional
    public Offres addOffre(Offres offre,Long idStore) {
        // Basic validations
        if (offre.getTitle() == null || offre.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Offer title cannot be empty");
        }
        
        // Validate store relationship if required
        if (idStore != null) {
            Store store = storeRepository.findById(idStore)
                    .orElseThrow(() -> new IllegalArgumentException("Store with ID " + idStore + " does not exist"));
            offre.setStore(store);
        }
        
        // Additional validations as needed
        if (offre.getDiscount() < 0 || offre.getDiscount() > 100) {
            throw new IllegalArgumentException("Discount must be between 0 and 100");
        }
        
        // Ensure the store is managed by the current session
        Store store = offre.getStore();
        if (!storeRepository.existsById(store.getStoreID())) {
            throw new IllegalArgumentException("Store with ID " + store.getStoreID() + " does not exist");
        }
        
        return offresRepository.save(offre);
    }

    @Override
    public List<offresDetailsDTO> retrieveAllOffres() {
        return offresRepository.findAll().stream().map(offre -> new offresDetailsDTO(
            offre.getOffreId(),
            offre.getTitle(),
            offre.getDescription(),
            offre.getDiscount(),
            offre.getImage(),
            offre.getPrice(),
            offre.isAvailable(),
            offre.getCategory(),
            offre.getDateStart(),
            offre.getStore().getName()
        )).collect(Collectors.toList());
    }

    @Override
    public Offres retrieveOffre(Long offreId) {
        return offresRepository.findById(offreId)
                .orElseThrow(() -> new RuntimeException("Offer not found with id: " + offreId));
    }

    @Override
    @Transactional
    public void removeOffre(Long offreId) {
        if (!offresRepository.existsById(offreId)) {
            throw new RuntimeException("Cannot delete non-existent offer with id: " + offreId);
        }
        offresRepository.deleteById(offreId);
    }

    @Override
    @Transactional
    public Offres updateOffre(Offres offre) {
        if (offre.getOffreId() == null) {
            throw new IllegalArgumentException("Offer ID must not be null for update operation");
        }
        
        if (!offresRepository.existsById(offre.getOffreId())) {
            throw new RuntimeException("Cannot update non-existent offer with id: " + offre.getOffreId());
        }
        
        return offresRepository.save(offre);
    }

    @Override
    public List<offresDetailsDTO> retrieveAllOffresByStoreID(Long idStore) {
        return offresRepository.findByStore_StoreID(idStore).stream().map(offre -> new offresDetailsDTO(
            offre.getOffreId(),
            offre.getTitle(),
            offre.getDescription(),
            offre.getDiscount(),
            offre.getImage(),
            offre.getPrice(),
            offre.isAvailable(),
            offre.getCategory(),
            offre.getDateStart(),
            offre.getStore().getName()
        )).collect(Collectors.toList());
    }
}