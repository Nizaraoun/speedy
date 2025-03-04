package com.ski.speedygobackend.Controller.OfferManagement;

import com.ski.speedygobackend.DTO.StoreDetailsDTO;
import com.ski.speedygobackend.Entity.OfferManagement.Store;
import com.ski.speedygobackend.Entity.UserManagement.User;
import com.ski.speedygobackend.Service.OfferManagement.IStoreServices;
import com.ski.speedygobackend.Service.UserManagement.IUserServices;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/stores")
public class StoreRestController {
    private final IStoreServices storeServices;
    private final IUserServices userServices;
@PostMapping("/add")
    public ResponseEntity<Store> addStore(@RequestBody Store store) {
        // Ensure the user is saved before saving the store
        User user = store.getUser();
        if (user != null && user.getUserId() == null) {
            user = userServices.saveUser(user);
            store.setUser(user);
        }
        return ResponseEntity.ok(storeServices.addStore(store));
    }

    @GetMapping("/all")  
    public ResponseEntity<List<StoreDetailsDTO>> getAllStores() {
        return ResponseEntity.ok(storeServices.retrieveAllStores());
    }

    @GetMapping("/get/{id-store}")
    public ResponseEntity<Store> getById(@PathVariable("id-store") Long idStore) {
        Store store = storeServices.retrieveStore(idStore);
        if (store == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(store);
    }

    @PutMapping("/update/{id-store}")
    public ResponseEntity<Store> updateStore(@RequestBody Store store , @PathVariable("id-store") Long idStore) {
        System.out.println("************************** ");
        
        return ResponseEntity.ok(storeServices.updateStore(store , idStore));
    }

    @DeleteMapping("/delete/{id-store}")
    public ResponseEntity<Void> deleteById(@PathVariable("id-store") Long idStore) {
        storeServices.removeStore(idStore);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<?> getStoresByType(@PathVariable("type") String type) {
        try {
            List<Store> stores = storeServices.getStoresByType(type);
            return ResponseEntity.ok(stores);
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(e.getMessage());
        }
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException e) {
        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(e.getMessage());
    }
}