package com.ski.speedygobackend.Service.OfferManagement;

import com.ski.speedygobackend.Entity.OfferManagement.Store;
import com.ski.speedygobackend.Enum.StoreType;
import com.ski.speedygobackend.Repository.IStoreRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import com.ski.speedygobackend.DTO.StoreDetailsDTO;

@RequiredArgsConstructor
@Service
public class StoreServicesImpl implements IStoreServices {
    private static final Logger logger = LoggerFactory.getLogger(StoreServicesImpl.class);
    private final IStoreRepository storeRepository;

    @Override
    public Store addStore(Store store) {
        return storeRepository.save(store);
    }

    @Override
    public List<StoreDetailsDTO> retrieveAllStores() {
        return storeRepository.findAll().stream().map(store -> new StoreDetailsDTO(
            store.getStoreID(),
            store.getName(),
            store.getOpening(),
            store.getClosing(),
            store.getLogo(),
            store.getWebsite(),
            store.getImage(),
            store.getAddress(),
            store.getCity(),
            store.getLocation(),
            store.getDescription(),
            store.getPhone(),
            store.getEmail(),
            store.getStoreType(),
            store.getStoreStatus()
        )).collect(Collectors.toList());
    }

    @Override
    public Store retrieveStore(Long idStore) {
        return storeRepository.findById(idStore).orElse(null);
    }

    @Override
    public void removeStore(Long idStore) {
        storeRepository.deleteById(idStore);
    }

    @Override
    public Store updateStore(Store store, Long idStore) {
        if (idStore == null) {
            throw new IllegalArgumentException("Store ID cannot be null.");
        }
        // Fetch the existing store from the database
        Store existingStore = storeRepository.findById(idStore)
                .orElseThrow(() -> new IllegalArgumentException("Store with ID " + idStore + " does not exist."));
    System.out.println("existingStore: " + existingStore);
    System.out.println("");
        // Update the existing store with the new values
        existingStore.setName(store.getName());
        existingStore.setAddress(store.getAddress());
        existingStore.setCity(store.getCity());
        existingStore.setLocation(store.getLocation());
        existingStore.setDescription(store.getDescription());
        existingStore.setPhone(store.getPhone());
        existingStore.setEmail(store.getEmail());
        existingStore.setOpening(store.getOpening());
        existingStore.setClosing(store.getClosing());
        existingStore.setLogo(store.getLogo());
        existingStore.setWebsite(store.getWebsite());
        existingStore.setImage(store.getImage());
        existingStore.setStoreType(store.getStoreType());
        existingStore.setStoreStatus(store.getStoreStatus()); // This matches your field name
        
        return storeRepository.save(existingStore);
    }
    @Override
    public List<Store> getStoresByType(String type) {
        // Add null check and validation
        if (type == null || type.trim().isEmpty()) {
            throw new IllegalArgumentException("Store type cannot be null or empty");
        }
        
        try {
            StoreType storeType = StoreType.valueOf(type.toUpperCase());
            return storeRepository.findByStoreType(storeType);
        } catch (IllegalArgumentException e) {
            // Log the error and throw a more descriptive exception
            logger.error("Invalid store type: {}", type, e);
            throw new IllegalArgumentException("Invalid store type: " + type + 
                ". Valid types are: " + String.join(", ", getValidStoreTypes()));
        }
    }
    
    // Helper method to get all valid store types
    private String[] getValidStoreTypes() {
        return java.util.Arrays.stream(StoreType.values())
            .map(StoreType::name)
            .toArray(String[]::new);
    }
}